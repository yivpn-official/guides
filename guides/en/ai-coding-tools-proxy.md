# Proxy & Split-Tunnel Setup for Cursor, Claude Code, Codex & MCP

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/en/guides/ai-coding-tools-proxy/)**.

- **Language**: `en` (English) · **Cluster**: `dev` · **Updated**: `2026-11-15`
- **Tested Environment**: Windows 11 / macOS 15 · Cursor / Claude Code / yivpn-agent-cli v2.1
- **Keywords**: Cursor proxy setup, Claude Code proxy timeout, OpenAI Codex CLI proxy, GitHub Copilot split tunnel, VPN MCP server, sing-box developer routing

## Key Takeaways (TL;DR)

- CLI coding agents (Claude Code, OpenAI Codex CLI, Git, Cargo, npm) frequently ignore OS desktop proxy settings; Layer-3 Global TUN captures them transparently without per-shell env vars.
- Smart split-tunneling keeps localhost, Docker bridges, corporate intranet hosts, and domestic package mirrors on direct ISP routing at zero added latency.
- If Cursor streaming completions stall behind strict firewalls or middleboxes, pairing HTTP/1.1 compatibility mode with smart split routing eliminates mid-stream resets.
- With YiVPN's open-source MCP server (yivpn-agent-cli), coding agents can inspect tunnel health, preview split-route diffs, and roll back routing rules autonomously.

## Overview

Configuring a network proxy for a web browser takes seconds, yet developers routinely hit `ETIMEDOUT`, stalled SSE token streams, or broken intranet Git remotes the moment they launch **Cursor**, **Claude Code**, **OpenAI Codex CLI**, or **GitHub Copilot**. The root cause is architectural: **IDE extension hosts, language servers, and CLI subprocesses do not share the browser's proxy stack.** This guide walks through three clean, battle-tested setups on Windows, macOS, and headless Linux.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Why AI IDEs and Terminal Agents Ignore OS System Proxies](https://yivpn.net/en/guides/ai-coding-tools-proxy/#why-cli-ignores-proxy)
- [2. Method A (Recommended): Zero-Config Layer-3 Global TUN + Smart Split](https://yivpn.net/en/guides/ai-coding-tools-proxy/#method-a-global-tun)
- [3. Method B: Scoped Per-Shell Proxy Functions with NO_PROXY Hygiene](https://yivpn.net/en/guides/ai-coding-tools-proxy/#method-b-shell-env)
- [4. Method C: Autonomous Split-Tunnel Control via YiVPN Local MCP](https://yivpn.net/en/guides/ai-coding-tools-proxy/#method-c-mcp-server)
- [5. Rootless Daemon Mode for Headless Linux, WSL2 & Remote Containers](https://yivpn.net/en/guides/ai-coding-tools-proxy/#headless-daemon)

## Copyable Diagnostic & Config Snippets

```bash
# Add to ~/.zshrc or ~/.bashrc for clean on-demand CLI proxy toggling
proxy_on() {
  export HTTP_PROXY="http://127.0.0.1:10808"
  export HTTPS_PROXY="http://127.0.0.1:10808"
  export ALL_PROXY="socks5h://127.0.0.1:10809"
  export NO_PROXY="localhost,127.0.0.1,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.local,.internal"
  echo "AI CLI proxy active on 127.0.0.1:10808 (LAN & localhost bypassed)"
}

proxy_off() {
  unset HTTP_PROXY HTTPS_PROXY ALL_PROXY http_proxy https_proxy all_proxy
  echo "AI CLI proxy disabled"
}
```

```powershell
$env:HTTPS_PROXY = "http://127.0.0.1:10808"
$env:NO_PROXY = "localhost,127.0.0.1,192.168.*,10.*"
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
# Fetch the zero-dependency ESM CLI and start a local rootless proxy daemon
curl -fsSL https://yivpn.net/vpn-api/yivpn-agent.mjs -o yivpn-agent.mjs
node yivpn-agent.mjs up --port 10808
```

## Quick FAQ

**Q: Why does my browser reach Anthropic and GitHub fine while Claude Code or git push times out in the terminal?**

Standard OS 'System Proxy' settings only inform GUI apps that explicitly query WinINet or macOS Network Proxy APIs. Most Node.js, Go, Rust, and OpenSSH binaries connect directly to the network interface unless Layer-3 Global TUN is active or HTTPS_PROXY is exported.

**Q: Will Global TUN break my local Docker containers, Postgres port forwards, or LAN devices?**

No. YiVPN's bundled sing-box 1.14.3 engine automatically bypasses loopback (127.0.0.0/8, ::1) and RFC1918 private subnets (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) so local dev servers and LAN resources remain 100% direct.

**Q: Does the YiVPN Desktop MCP server access my source code or workspace files?**

Never. The local MCP server binds strictly to 127.0.0.1:38410 and exposes only network status, node selection, and split-tunnel rule preview/rollback commands.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Proxy & Split-Tunnel Setup for Cursor, Claude Code, Codex & MCP](https://yivpn.net/en/guides/ai-coding-tools-proxy/)
- **English Guides Hub**: [https://yivpn.net/en/guides/](https://yivpn.net/en/guides/) · [RSS Feed](https://yivpn.net/en/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/en/download/?ref=github-guides](https://yivpn.net/en/download/?ref=github-guides)
- **Official Website (English)**: [https://yivpn.net/en/](https://yivpn.net/en/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
