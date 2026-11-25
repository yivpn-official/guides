# 香港與台灣開發者必備：Cursor、Claude Code、Codex 終端機代理與本地 MCP 自動分流教學

> **Canonical 完整原文**：本頁為 GitHub 速查版（含核心重點、章節直達目錄、指令範例與 FAQ），完整對比表格與最新更新請瀏覽官網原文：**[https://yivpn.net/zh-tw/guides/ai-coding-tools-proxy/](https://yivpn.net/zh-tw/guides/ai-coding-tools-proxy/)**

- **Language**: `zh-tw` (繁體中文) · **Cluster**: `dev` · **Updated**: `2026-11-25`
- **Tested Environment**: Windows 11 / macOS 15 · YiVPN v1.0.14 (sing-box 1.14.3) · yivpn-agent-cli v2.2.1
- **Keywords**: Cursor代理設定, Claude Code香港封鎖, OpenAI Codex終端機代理, 本地MCP自動分流, singbox-smart-split, YiVPN

## 核心结论速览（TL;DR）

- 香港與台灣開發者面對兩類典型問題：香港 IP 直連 Claude Code、Cursor 企業模型與 OpenAI Codex 會觸發地區封鎖（403/Region Not Supported），而台灣中華電信 HiNet 與香港寬頻 HKBN 在高峰時段直連海外終端常出現 TLS 超時與 HTTP/2 斷流。
- 桌面端開啟基於 sing-box 1.14.3 的 Global TUN（Wintun/utun）並結合開源 singbox-smart-split，能零環境變數接管 CLI，同時確保 PayMe、轉數快 FPS、LINE Pay 及台港網銀原生直連。
- 針對受限電腦或按需除錯，可使用 yivpn-agent.mjs v2.2.1 監聽 127.0.0.1:10808 搭配 NO_PROXY 繞行 .hk、.tw 與區網；進階團隊更可透過 YiVPN 桌面端本地 MCP（127.0.0.1:38419）執行 preview_routing_rules、apply_routing_rules 與 rollback_routing_rules 安全熱更新分流規則。
- YiVPN 每日免費額度提供 90 分鐘免註冊連線（台港時間 00:00 重置、斷線停表），升級 YiPro 僅 $2.99/月（季付 $6.99、年付 $21.99）即可支援 3 部裝置同時在線。

## 摘要

對香港與台灣的工程師而言，使用 **Cursor**、**Claude Code** 與 **OpenAI Codex CLI** 的網路痛點截然不同卻同樣惱人：香港開發者面對的是 Anthropic、OpenAI 與部分 AI IDE 後端對香港 IP 的嚴格地區封鎖；台灣開發者雖然沒有區域限制，但在 **中華電信 HiNet** 或 **香港寬頻 HKBN** 晚間跨海頻寬擁塞時，終端機拉取海外 API、GitHub Actions 除錯與 npm/Cargo 套件經常遭遇 `ETIMEDOUT` 或 HTTP/2 流重置。更棘手的是，若隨便開一套傳統全域 VPN，又會令 **PayMe、轉數快 FPS、LINE Pay** 與公司內網 GitLab 一起斷線。本文完整拆解桌面端 Global TUN、終端機 `127.0.0.1:10808` 與本地 MCP 自動分流三種實戰方案。

## 完整正文目录（直达官网对应章节）

- [一、為何瀏覽器通了，終端機 AI 工具卻依然被擋或超時？](https://yivpn.net/zh-tw/guides/ai-coding-tools-proxy/#why-hk-tw-ai-cli-fails)
- [二、Global TUN 智能分流與 Shell 環境變數實戰設定](https://yivpn.net/zh-tw/guides/ai-coding-tools-proxy/#global-tun-vs-shell-env)
- [三、進階工作流：透過桌面端本地 MCP (127.0.0.1:38419) 自動管理分流規則](https://yivpn.net/zh-tw/guides/ai-coding-tools-proxy/#desktop-local-mcp-routing)
- [四、台港免費額度重置時間與 YiPro 3 部裝置方案](https://yivpn.net/zh-tw/guides/ai-coding-tools-proxy/#free-quota-and-yipro-plans)

## 可直接复制的排查 / 配置命令

```bash
# 1. 下載並啟動本地無頭代理閘道（僅監聽 127.0.0.1:10808，不改動系統網路）
mkdir -p ~/.yivpn-agent
curl -fsSL https://yivpn.net/vpn-api/yivpn-agent.mjs -o ~/.yivpn-agent/yivpn-agent.mjs
node ~/.yivpn-agent/yivpn-agent.mjs connect

# 2. 在目前終端機啟用 Claude Code / Codex / Git 代理，同時保持台港網域與區網直連
export HTTP_PROXY="http://127.0.0.1:10808"
export HTTPS_PROXY="http://127.0.0.1:10808"
export NO_PROXY="localhost,127.0.0.1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.hk,.tw,.local,internal.corp"

claude --version && codex --help
```

```json
{
  "mcpServers": {
    "yivpn-desktop-routing": {
      "url": "http://127.0.0.1:38419/mcp",
      "description": "YiVPN 本地 sing-box 分流規則安全預覽、熱套用與回滾"
    }
  }
}
```

## 常见问题速答（FAQ）

**Q: 在香港使用 Cursor 與 Claude Code，為什麼只開瀏覽器插件依然會遇到「Country, region, or territory not supported」？**

瀏覽器插件只會代理網頁分頁，Cursor 的語言伺服器宿主程序與終端機執行的 Claude Code、Codex CLI 均為獨立 Node.js/Rust 程序，預設直接經由香港寬頻 HKBN 或網上行原生出口連線，因而被 Anthropic 與 OpenAI API 偵測為香港 IP。開啟 YiVPN 的 Global TUN 模式或為終端機注入 127.0.0.1:10808 代理即可解決。

**Q: 開啟 Global TUN 之後，香港的 PayMe、FPS 轉數快或台灣的 LINE Pay、國泰/中信網銀會被影響嗎？**

不會。YiVPN 預設內建開源 singbox-smart-split 智能分流引擎，香港與台灣本地銀行、PayMe、轉數快 FPS、八達通、LINE Pay、街口支付及常見本地服務都會維持直連當地寬頻，只有需要跨區或走美國/日本節點的 AI API 與開發套件會進入加密隧道。

**Q: YiVPN 桌面端本地 MCP（127.0.0.1:38419）安全嗎？會不會把我的專案原始碼上傳出去？**

完全不會。桌面端 MCP 僅監聽本機迴環介面 127.0.0.1:38419，功能嚴格限制在查詢連線狀態與管理本地 sing-box 分流規則（preview_routing_rules、apply_routing_rules、rollback_routing_rules），不會讀取、索引或上傳任何工作區原始碼。

**Q: 每日 90 分鐘免費版幾點重置？付費 YiPro 支援幾部裝置？**

免費版無須註冊電郵或綁定信用卡，每日於香港／台北時間 00:00（16:00 UTC）自動重置 90 分鐘有效連線額度，中斷連線即暫停計時。需要全天候 coding 的開發者可選擇 YiPro（$2.99/月、$6.99/季、$21.99/年），單一帳號可同時在 3 部裝置（例如主力筆電、桌機與手機）穩定在線。

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [香港與台灣開發者必備：Cursor、Claude Code、Codex 終端機代理與本地 MCP 自動分流教學](https://yivpn.net/zh-tw/guides/ai-coding-tools-proxy/)
- **繁體中文 Guides Hub**: [https://yivpn.net/zh-tw/guides/](https://yivpn.net/zh-tw/guides/) · [RSS Feed](https://yivpn.net/zh-tw/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/zh-tw/download/?ref=github-guides](https://yivpn.net/zh-tw/download/?ref=github-guides)
- **Official Website (繁體中文)**: [https://yivpn.net/zh-tw/](https://yivpn.net/zh-tw/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
