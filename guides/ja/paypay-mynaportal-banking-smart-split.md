# VPN接続中でもPayPay・マイナポータル・国内ネット銀行をそのまま使う「Smart Split」設定術

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/ja/guides/paypay-mynaportal-banking-smart-split/)**.

- **Language**: `ja` (日本語) · **Cluster**: `crossborder` · **Updated**: `2026-11-27`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: VPN PayPay エラー, マイナポータル VPN 接続できない, 国内ネット銀行 VPN 分流, Smart Split 設定, Global TUN ルーティング, YiVPN

## Key Takeaways (TL;DR)

- 従来の全通信トンネル型VPNでは、PayPayの決済制限、マイナポータルの国外IP遮断、三菱UFJ銀行・楽天銀行・住信SBIネット銀行のセキュリティ警告、Radiko・TVerのエリア判定エラーが発生します。
- YiVPN v1.0.14は100%オフライン内蔵の sing-box 1.14.3 コアと Layer-3 Global TUN（Wintun / utun / VpnService）により、ブラウザ以外のネイティブアプリ通信も漏れなく制御します。
- オープンソースの singbox-smart-split により、.jp ドメイン・国内金融・行政・配信および家庭内LANはNTTフレッツ光／auひかり／ソフトバンク光へ直結（DIRECT）し、海外開発・AI通信のみ Hysteria2 / VLESS+REALITY で暗号化します。
- 登録・クレカ不要で毎日90分間無料（日本時間 01:00 JST リセット）で検証でき、YiProは $2.99/月（$6.99/3ヶ月・$21.99/年）で最大3台同時接続、専用静的住宅IP（$4.29/月〜）にも対応します。

## Overview

テレワークや海外AI・開発ツールの利用、あるいは公衆Wi-Fi対策のためにVPNを常時オンにしたいものの、**「PayPayのバーコード決済が通らない」「マイナポータルにログインできない」「三菱UFJ銀行や楽天銀行で海外アクセス警告が出る」「RadikoやTVerが地域外エラーになる」**ため、毎回手動でオン・オフを繰り返している方は多いはずです。この面倒を一掃するのが、**Layer-3 Global TUN と Smart Split（スマートスプリット）による自動分流**です。

## Full Guide Outline (Deep Links to yivpn.net)

- [1. 全通信トンネル型VPNが日本の日常サービスを止める理由](https://yivpn.net/ja/guides/paypay-mynaportal-banking-smart-split/#why-full-tunnel-breaks-japan-apps)
- [2. Smart Splitによる経路比較：国内サービス直結 vs 海外暗号化](https://yivpn.net/ja/guides/paypay-mynaportal-banking-smart-split/#smart-split-japan-routing)
- [3. 3ステップで完了：Global TUN とデュアルプロトコル最適化](https://yivpn.net/ja/guides/paypay-mynaportal-banking-smart-split/#setup-smart-split-japan)
- [4. 毎日90分無料トライアルとYiPro（最大3台同時接続）](https://yivpn.net/ja/guides/paypay-mynaportal-banking-smart-split/#free-tier-and-yipro-japan)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Windows版 MSI (v1.0.14) の公式 SHA-256 ハッシュ検証
Get-FileHash "$env:USERPROFILE\Downloads\YIVPN_1.0.14_x64.msi" -Algorithm SHA256
# 期待値: 412B78AA4AFFEA582E04DC0CE0CB88BFF765E0496E5BE47E7479EDFCE9BBBDD2

# 2. Smart Split稼働中に国内ドメインがローカル回線へ直結（低遅延）しているか確認
curl.exe -o NUL -s -w "JP Direct Latency: %{time_total}s\n" https://www.bk.mufg.jp/
```

```bash
# macOS / Linux：ローカルプロキシ利用時も国内・社内ドメインを確実に対象外へ
export NO_PROXY="localhost,127.0.0.1,192.168.0.0/16,10.0.0.0/8,.jp,.local"
```

## Quick FAQ

**Q: VPNをオンにした状態でPayPayやマイナポータル、楽天銀行がエラーになるのはなぜですか？**

国内の決済アプリや行政サービス、メガバンク・ネット銀行は、不正アクセス防止（FDS）や法令順守のため接続元IPの国籍をリアルタイムでチェックしています。全通信を海外サーバー経由にする従来型VPNでは国外アクセスと判定され、ログイン制限や追加認証、タイムアウトが発生します。

**Q: ブラウザの拡張機能（プロキシ）ではなく、Global TUN + Smart Splitを使うメリットは何ですか？**

ブラウザ拡張機能はChromeやEdgeの通信しか制御できないため、スマホのPayPayアプリ、マイナポータル連携アプリ、Windows/macOSの銀行セキュリティソフトや開発用ターミナルCLIには適用されません。Global TUNはOSのL3仮想ネットワーク層で全通信を捕捉し、Smart Splitで正確に仕分けます。

**Q: Smart Splitを有効にすると、自宅のNASやプリンター、国内サイトの速度に影響は出ませんか？**

影響ありません。.jp ドメインや主要国内サービス、さらにプライベートIP（192.168.0.0/16・10.0.0.0/8）は暗号化トンネルを通らず、ご契約中のNTTフレッツ光・auひかり・ソフトバンク光のローカル回線へ直結（DIRECT）されるため、本来の低遅延・高速通信が維持されます。

**Q: 毎日90分間の無料枠はいつリセットされますか？家族や複数端末で使えますか？**

無料枠は会員登録やクレジットカードなしで即利用でき、切断中はタイマーが停止します。毎日日本時間 01:00 JST（16:00 UTC）に90分へリセットされます。複数端末での常時接続には YiPro（$2.99/月・$6.99/3ヶ月・$21.99/年）が最適で、1つの匿名アクティベーションコードで最大3台まで同時接続できます。

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [VPN接続中でもPayPay・マイナポータル・国内ネット銀行をそのまま使う「Smart Split」設定術](https://yivpn.net/ja/guides/paypay-mynaportal-banking-smart-split/)
- **日本語 Guides Hub**: [https://yivpn.net/ja/guides/](https://yivpn.net/ja/guides/) · [RSS Feed](https://yivpn.net/ja/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/ja/download/?ref=github-guides](https://yivpn.net/ja/download/?ref=github-guides)
- **Official Website (日本語)**: [https://yivpn.net/ja/](https://yivpn.net/ja/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
