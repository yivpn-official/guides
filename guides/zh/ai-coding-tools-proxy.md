# Cursor、Claude Code 与 Codex 终端分流及 MCP 代理配置完整指南

> **Canonical 完整原文**：本文为 GitHub 速查版（含核心结论、章节直达目录、命令片段与 FAQ），完整对比表格、图文步骤与最新更新请访问官网原文：**[https://yivpn.net/guides/ai-coding-tools-proxy/](https://yivpn.net/guides/ai-coding-tools-proxy/)**

- **Language**: `zh` (简体中文) · **Cluster**: `dev` · **Updated**: `2026-11-15`
- **Tested Environment**: Windows 11 / macOS 15 · Cursor / Claude Code / yivpn-agent-cli v2.1
- **Keywords**: Cursor代理设置, Claude Code分流配置, Codex CLI网络超时, GitHub Copilot代理, MCP VPN分流, yivpn-agent-cli

## 核心结论速览（TL;DR）

- 命令行 AI 工具（Claude Code、Codex CLI、Git、npm）默认不读取图形桌面系统代理，开启三层 Global TUN 虚拟网卡是最省心的零环境变量接管方案。
- 在 Cursor 中启用 HTTP/2 偶发连接重置时，可在设置中将 HTTP Compatibility Mode 调整为 HTTP/1.1 或启用 Global TUN 智能分流。
- 国内代码仓（Gitee、私有 GitLab、企业内网镜像）与海外大模型 API 并存时，利用易VPN 桌面端本地 MCP 服务（127.0.0.1:38410）可让 AI Agent 按域名热更新直连/代理规则。
- 无 root 权限的云服务器或远程开发容器，可直接运行零依赖开源 CLI（yivpn-agent-cli）拉起本地 HTTP/SOCKS5 分流守护进程。

## 摘要

许多开发者在把浏览器代理配好后，一打开 **Cursor**、**Claude Code**、**OpenAI Codex CLI** 或 **GitHub Copilot** 仍然频繁遭遇连接超时、`ETIMEDOUT`、流式补全卡顿，或者一开代理就导致公司内网 GitLab 与国内镜像站断联。根源在于：**IDE 扩展宿主进程与命令行 CLI 的网络栈，和浏览器根本不是同一套代理读取逻辑。** 本文将给出三套经过实测的标准化配置方案。

## 完整正文目录（直达官网对应章节）

- [一、为什么终端 CLI 与 AI IDE 经常无视系统代理](https://yivpn.net/guides/ai-coding-tools-proxy/#why-cli-ignores-system-proxy)
- [二、方案 A（最推荐）：开启桌面端三层 Global TUN 智能分流](https://yivpn.net/guides/ai-coding-tools-proxy/#option-a-global-tun)
- [三、方案 B：终端显式代理环境变量与一键开关函数](https://yivpn.net/guides/ai-coding-tools-proxy/#option-b-shell-env)
- [四、方案 C：接入 YiVPN 本地 MCP，让 AI Agent 自主管理分流规则](https://yivpn.net/guides/ai-coding-tools-proxy/#option-c-local-mcp)
- [五、云服务器 / 无桌面 Linux 容器零账号代理方案](https://yivpn.net/guides/ai-coding-tools-proxy/#headless-linux-daemon)

## 可直接复制的排查 / 配置命令

```bash
# 写入 ~/.zshrc 或 ~/.bashrc：按需开启/关闭当前终端 AI 代理，同时保护内网直连
proxy_on() {
  export HTTP_PROXY="http://127.0.0.1:10808"
  export HTTPS_PROXY="http://127.0.0.1:10808"
  export ALL_PROXY="socks5h://127.0.0.1:10809"
  export NO_PROXY="localhost,127.0.0.1,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.local,.internal,.cn"
  echo "Terminal proxy enabled -> 127.0.0.1:10808 (LAN & .cn bypassed)"
}

proxy_off() {
  unset HTTP_PROXY HTTPS_PROXY ALL_PROXY http_proxy https_proxy all_proxy
  echo "Terminal proxy cleared"
}
```

```powershell
$env:HTTPS_PROXY = "http://127.0.0.1:10808"
$env:NO_PROXY = "localhost,127.0.0.1,192.168.*,10.*,.cn"
curl.exe -I https://api.anthropic.com
```

```json
{
  "mcpServers": {
    "yivpn": {
      "command": "npx",
      "args": ["-y", "yivpn-agent-cli@latest", "mcp"]
    }
  }
}
```

```bash
# 国内/海外服务器通用：一键下载零依赖单文件 CLI 并启动本地分流代理
curl -fsSL https://yivpn.net/vpn-api/yivpn-agent.mjs -o yivpn-agent.mjs
node yivpn-agent.mjs up --port 10808
```

## 常见问题速答（FAQ）

**Q: 浏览器能正常打开 Claude 和 GitHub，为什么终端里运行 claude 或 git push 依然超时？**

这是因为操作系统的「系统代理（System Proxy）」仅对主动读取系统代理注册表的浏览器生效，而基于 Node.js、Rust 或 Go 编写的 CLI 默认直连物理网卡。开启易VPN 桌面端的 Global TUN 模式，或显式注入 HTTPS_PROXY 环境变量即可立即打通。

**Q: 开了代理之后访问公司内网数据库或国内 npm 镜像变慢怎么解决？**

确保智能分流开启，并在 NO_PROXY 中保留 localhost、127.0.0.1、10.0.0.0/8、192.168.0.0/16 与企业内网后缀，或者直接通过易VPN 本地 MCP 工具将该内网域名加入直连白名单。

**Q: 本地 MCP 分流服务需要把我的代码上传到云端吗？**

完全不需要。易VPN 桌面版 MCP 服务仅绑定本机回环地址 127.0.0.1:38410，仅用于查询连接状态与预览/回滚本地 sing-box 分流规则，不会读取任何项目源码。

---

### 官方入口与延伸资源

- **完整原文**：[Cursor、Claude Code 与 Codex 终端分流及 MCP 代理配置完整指南](https://yivpn.net/guides/ai-coding-tools-proxy/)
- **中文教程中心**：[https://yivpn.net/guides/](https://yivpn.net/guides/) · [RSS 订阅](https://yivpn.net/guides/rss.xml)
- **下载客户端（每天免费 90 分钟，免注册）**：[https://yivpn.net/download/?ref=github-guides](https://yivpn.net/download/?ref=github-guides)
- **官方 Release 与 SHA-256 校验仓**：[yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **开源智能分流规则生成器**：[yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & 本地 MCP**：[yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
