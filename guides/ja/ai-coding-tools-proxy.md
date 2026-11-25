# Claude Code・Cursor・Codexのターミナルプロキシ設定とローカルMCP自動ルーティング完全ガイド

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/ja/guides/ai-coding-tools-proxy/)**.

- **Language**: `ja` (日本語) · **Cluster**: `dev` · **Updated**: `2026-11-25`
- **Tested Environment**: Windows 11 / macOS 15 / WSL2 · YiVPN v1.0.14 (sing-box 1.14.3) · yivpn-agent-cli v2.2.1
- **Keywords**: Claude Code プロキシ設定, Cursor HTTP2 エラー, Codex CLI タイムアウト, WSL2 プロキシ, ローカルMCP ルーティング, YiVPN

## Key Takeaways (TL;DR)

- 夜間のPPPoE輻輳（パケ詰まり）や厳格な企業プロキシ・WSL2環境下では、ブラウザが正常でもClaude CodeやCodex CLI、Cursorの拡張プロセスだけがTLSハンドシェイクタイムアウトやHTTP/2切断を起こすことが頻発します。
- 100%オフライン内蔵の sing-box 1.14.3 による Global TUN と Smart Split を有効化すれば、環境変数なしで全CLIを安全にトンネル化しつつ、PayPay・マイナポータル・国内社内Git/npmミラーはローカル直結を維持できます。
- 社内規定等で仮想NICを使わない場合は 127.0.0.1:10808 へ HTTP_PROXY / HTTPS_PROXY と .jp を含む NO_PROXY を明示設定し、さらに YiVPN デスクトップ版ローカル MCP（127.0.0.1:38419）または npx -y yivpn-agent-cli@latest mcp から preview_routing_rules や rollback_routing_rules で安全に分流ルールを更新できます。
- クレカ・メール登録不要で毎日90分（毎日 01:00 JST / 00:00 UTC+8 リセット）無料で検証でき、常時接続向けの YiPro は $2.99/月（$6.99/四半期・$21.99/年）で最大3台同時接続に対応します。

## Overview

東京や大阪のエンジニアが **Claude Code**、**Cursor**、**OpenAI Codex CLI** を実務導入する際、意外とつまずきやすいのが「ブラウザは問題ないのにターミナルのAIツールだけ詰まる」現象です。原因は大きく分けて、**夜間PPPoE回線特有のパケ詰まり（海外APIへのUDP/TLS再送遅延）**、**企業の認証付きプロキシやSSLインスペクションによるHTTP/2リセット**、そして **WSL2の仮想ネットワークがWindows側のシステムプロキシを継承しない構造** にあります。本記事では、日本の開発現場でそのまま運用できる「Global TUN＋Smart Split」「明示的 `NO_PROXY` 環境変数」「ローカルMCPによる自動分流制御」の3アプローチを解説します。

## Full Guide Outline (Deep Links to yivpn.net)

- [1. なぜターミナルAIツールはブラウザと同じ設定で動かないのか](https://yivpn.net/ja/guides/ai-coding-tools-proxy/#why-cli-fails-behind-proxy)
- [2. Global TUN＋Smart Split と明示的 NO_PROXY の実践設定](https://yivpn.net/ja/guides/ai-coding-tools-proxy/#global-tun-and-shell-env)
- [3. YiVPNローカルMCP（127.0.0.1:38419）による安全な分流ルール自動更新](https://yivpn.net/ja/guides/ai-coding-tools-proxy/#desktop-local-mcp-automation)
- [4. 毎日01:00 JSTリセットの無料枠とYiPro（3台同時接続）プラン](https://yivpn.net/ja/guides/ai-coding-tools-proxy/#free-tier-and-yipro-pricing)

## Copyable Diagnostic & Config Snippets

```bash
# ~/.zshrc や WSL2 の ~/.bashrc に追記して必要なときだけ有効化
ai_proxy_on() {
  export HTTP_PROXY="http://127.0.0.1:10808"
  export HTTPS_PROXY="http://127.0.0.1:10808"
  export NO_PROXY="localhost,127.0.0.1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.jp,.local,git.internal.co.jp,npm.internal.co.jp"
  echo "AI CLI Proxy enabled -> 127.0.0.1:10808"
}

ai_proxy_off() {
  unset HTTP_PROXY HTTPS_PROXY NO_PROXY
  echo "AI CLI Proxy disabled"
}
```

```json
{
  "mcpServers": {
    "yivpn-routing": {
      "command": "npx",
      "args": ["-y", "yivpn-agent-cli@latest", "mcp"],
      "env": {
        "YIVPN_DESKTOP_MCP_URL": "http://127.0.0.1:38419/mcp"
      }
    }
  }
}
```

## Quick FAQ

**Q: ブラウザではClaudeやGitHubを開けるのに、WSL2やmacOSターミナルの claude コマンドだけタイムアウトするのはなぜですか？**

OSの「システムプロキシ」設定は主にブラウザが参照するものであり、Node.js（Claude Code）やRust/Python製CLI、およびWSL2のNATネットワークは環境変数未設定だと物理NICや企業FWへ直接パケットを送出するためです。Global TUNを有効化するか、127.0.0.1:10808 のHTTPS_PROXYを明示指定すると解消します。

**Q: VPNをオンにした状態でPayPay、マイナポータル、社内のGitLabやプライベートnpmレジストリが動かなくなりませんか？**

いいえ。YiVPNのSmart Split機能は国内金融・行政サービス（PayPay・マイナポータル・主要ネット銀行）およびローカルLAN・社内指定ドメインを直結に保ちます。また、環境変数運用時も NO_PROXY に .jp や社内ドメインを含めることで国内アクセスへの干渉を防げます。

**Q: ローカルMCP（127.0.0.1:38419）でAIにルーティングを変更させても、誤設定でネットワークが壊れませんか？**

安全設計になっています。preview_routing_rules で適用前のルーティング影響を事前確認でき、万一意図しない挙動になった場合も rollback_routing_rules で即座に直前のルール状態へ復元できます。通信先も127.0.0.1に限定されます。

**Q: 無料枠の90分は日本時間の何時にリセットされますか？複数端末で使えますか？**

無料枠は毎日日本時間 01:00 JST（00:00 UTC+8 / 16:00 UTC）に90分へ自動リセットされ、切断中はカウントが停止します。PC・ノート・スマホなど複数台で常時利用する場合は、YiPro（$2.99/月・$6.99/四半期・$21.99/年）で最大3台同時接続が可能です。

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Claude Code・Cursor・Codexのターミナルプロキシ設定とローカルMCP自動ルーティング完全ガイド](https://yivpn.net/ja/guides/ai-coding-tools-proxy/)
- **日本語 Guides Hub**: [https://yivpn.net/ja/guides/](https://yivpn.net/ja/guides/) · [RSS Feed](https://yivpn.net/ja/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/ja/download/?ref=github-guides](https://yivpn.net/ja/download/?ref=github-guides)
- **Official Website (日本語)**: [https://yivpn.net/ja/](https://yivpn.net/ja/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
