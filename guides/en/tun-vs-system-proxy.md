# Layer-3 Global TUN vs OS System Proxy: Technical Architecture Compared

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/en/vs/tun-vs-system-proxy/)**.

- **Language**: `en` (English) · **Cluster**: `comparison` · **Updated**: `2026-11-15`
- **Tested Environment**: Windows 11 (Wintun) & macOS 15 (utun) · YiVPN v1.0.4 (sing-box 1.14.3)
- **Keywords**: Global TUN vs system proxy, what is TUN mode VPN, Wintun vs HTTP proxy, sing-box TUN split tunneling, UDP proxy vs TUN, CLI proxy bypass

## Key Takeaways (TL;DR)

- An OS System Proxy operates at the application layer and relies on voluntary app cooperation—browsers honor it, while most CLI tools, SSH clients, and UDP apps ignore it.
- Layer-3 Global TUN creates a virtual network interface (Wintun on Windows, utun on macOS, VpnService on Android) that captures TCP, UDP, and QUIC across all processes automatically.
- Global TUN does NOT mean routing local traffic overseas: pairing Global TUN with Smart Split keeps LAN subnets, local banking, and regional CDNs on direct ISP routing.
- Use Global TUN + Smart Split as your everyday default; fall back to System Proxy only on locked-down workstations without administrator privileges.

## Overview

Every modern proxy and VPN client offers two fundamentally different ways to intercept traffic on your computer: **OS System Proxy (`HTTP / SOCKS5`)** and **Layer-3 Global TUN (`Virtual Network Adapter`)**. Understanding where each operates in the networking stack explains why web browsers might load instantly while terminal CLIs, desktop apps, or real-time voice calls fail to connect.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Side-by-Side Comparison: Global TUN vs OS System Proxy](https://yivpn.net/en/vs/tun-vs-system-proxy/#comparison-matrix)
- [2. How OS System Proxies Work—and Why Apps Bypass Them](https://yivpn.net/en/vs/tun-vs-system-proxy/#system-proxy-limitations)
- [3. How Layer-3 Global TUN Achieves Zero-Config Process Coverage](https://yivpn.net/en/vs/tun-vs-system-proxy/#global-tun-architecture)
- [4. Which Mode Should You Use?](https://yivpn.net/en/vs/tun-vs-system-proxy/#decision-guide)

## Quick FAQ

**Q: Does Layer-3 Global TUN add noticeable CPU overhead or latency compared to a system proxy?**

On modern operating systems, user-space Wintun and macOS utun add less than 0.3 ms of local packet forwarding overhead while supporting full hardware UDP/QUIC throughput.

**Q: If Global TUN captures all system traffic, why do my local NAS and domestic apps still run at native speed?**

Because packet capture and routing policy are decoupled in sing-box 1.14.3. Global TUN inspects outbound flows locally and sends domestic domains and private RFC1918 subnets straight out your physical NIC.

**Q: What happens if I run YiVPN on a corporate PC without admin rights to create a TUN adapter?**

YiVPN automatically detects missing privilege elevation and falls back cleanly to local HTTP/SOCKS5 system proxy mode so your browser and proxy-aware apps continue working.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Layer-3 Global TUN vs OS System Proxy: Technical Architecture Compared](https://yivpn.net/en/vs/tun-vs-system-proxy/)
- **English Guides Hub**: [https://yivpn.net/en/guides/](https://yivpn.net/en/guides/) · [RSS Feed](https://yivpn.net/en/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/en/download/?ref=github-guides](https://yivpn.net/en/download/?ref=github-guides)
- **Official Website (English)**: [https://yivpn.net/en/](https://yivpn.net/en/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
