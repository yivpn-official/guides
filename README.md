# YiVPN Official Multilingual Guides (20 Languages)

<p align="center">[English](./README.md) · [简体中文](./README.zh-CN.md) · [Official Guides Hub](https://yivpn.net/en/guides/) · [Download YiVPN](https://yivpn.net/en/download/?ref=github-guides) · [Releases](https://github.com/yivpn-official/yivpn)</p>

Official quick-reference playbooks, diagnostic commands, and FAQ summaries for **[YiVPN (易VPN)](https://yivpn.net/en/)** across **20 languages** (**25 published guides**, last synced `2026-11-21`).

> **Note on Canonical Articles**: Each Markdown file in `guides/<lang>/` is a concise GitHub quick-reference playbook (TL;DR, deep-linked section outline, copyable CLI/PowerShell commands, and FAQ) pointing to its canonical full guide on **[yivpn.net](https://yivpn.net/en/guides/)**.

## Core Technical Coverage

- **Smart Split Tunneling (`sing-box 1.14.3`)**: Keep local banking, e-government IDs (`UAE Pass`, `iDEAL`/`DigiD`, `Mobilt BankID`/`Swish`, `Vipps`, `MitID`, `SPID`, `e-Devlet`, `PayPay`, `Pix`, `Birbank`, domestic China/HK/TW apps) and LAN/NAS direct while encrypting external traffic.
- **AI Tools & Developer Proxy / MCP**: Reliable routing for ChatGPT, Claude, Gemini, Cursor, Claude Code, Codex, Docker, and headless Linux via `Global TUN` and [yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli).
- **High-Loss & Public Wi-Fi Engineering**: `Hysteria2` (QUIC/UDP with `disablePathMTUDiscovery`) and `VLESS+REALITY` (TLS 1.3/TCP) for evening ISP peering congestion, trains, airports, and strict middleboxes.
- **Transparent Privacy & Free Tier**: Offline bundled core, anonymous 16-char activation code (no email required), **90 active minutes free daily** (no sign-up or card), and YiPro plans covering up to **3 concurrent devices**.

## 20-Language Directory

| Code | Language | Playbooks | Latest Guide | Official Hub & RSS |
| :---: | --- | :---: | --- | --- |
| `zh` | [简体中文](./guides/zh/README.md) | **4** | [Claude 为什么总封号？7 个常见原因与网络环境自查清单](./guides/zh/claude-account-ban-checklist.md) | [Hub](https://yivpn.net/guides/) · [RSS](https://yivpn.net/guides/rss.xml) |
| `zh-tw` | [繁體中文](./guides/zh-tw/README.md) | **1** | [香港點樣穩定用 Claude、ChatGPT、Gemini？2026 網路設定與智能分流指南](./guides/zh-tw/hong-kong-chatgpt-claude-gemini-guide.md) | [Hub](https://yivpn.net/zh-tw/guides/) · [RSS](https://yivpn.net/zh-tw/guides/rss.xml) |
| `en` | [English](./guides/en/README.md) | **3** | [Best VPN Setup for Dubai & Abu Dhabi Expats: Safe Mall/DXB Wi-Fi & UAE Pass Direct Split](./guides/en/uae-dubai-expat-wifi-smart-split.md) | [Hub](https://yivpn.net/en/guides/) · [RSS](https://yivpn.net/en/guides/rss.xml) |
| `ru` | [Русский](./guides/ru/README.md) | **1** | [Почему тормозит видео в 4K и обрывается QUIC: как работает протокол Hysteria2 при потере пакетов](./guides/ru/pochemu-tormozit-4k-video-quic-hysteria2.md) | [Hub](https://yivpn.net/ru/guides/) · [RSS](https://yivpn.net/ru/guides/rss.xml) |
| `ja` | [日本語](./guides/ja/README.md) | **1** | [新幹線・カフェ・空港・ホテルのフリーWi-Fiを安全に使う方法（2026）](./guides/ja/shinkansen-cafe-free-wifi-security-guide.md) | [Hub](https://yivpn.net/ja/guides/) · [RSS](https://yivpn.net/ja/guides/rss.xml) |
| `ko` | [한국어](./guides/ko/README.md) | **1** | [KT·SK브로드밴드·LG U+ 저녁 해외망 속도 저하 및 트위치·유튜브 4K 버퍼링 해결 가이드](./guides/ko/kt-skb-lgu-overseas-buffering-hysteria2.md) | [Hub](https://yivpn.net/ko/guides/) · [RSS](https://yivpn.net/ko/guides/rss.xml) |
| `es` | [Español](./guides/es/README.md) | **1** | [VPN gratis para PC y Android sin registro: 90 minutos diarios sin tarjeta de crédito (Guía 2026)](./guides/es/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/es/guides/) · [RSS](https://yivpn.net/es/guides/rss.xml) |
| `fr` | [Français](./guides/fr/README.md) | **1** | [Vérification d'âge, blocages DNS et vie privée en France (2026) : protéger ses données personnelles](./guides/fr/confidentialite-filtrage-dns-france-guide.md) | [Hub](https://yivpn.net/fr/guides/) · [RSS](https://yivpn.net/fr/guides/rss.xml) |
| `de` | [Deutsch](./guides/de/README.md) | **1** | [Telekom & Vodafone Peering-Probleme am Abend lösen: Warum Hysteria2 bei Paketverlust schneller als WireGuard ist](./guides/de/telekom-vodafone-peering-paketverlust-hysteria2.md) | [Hub](https://yivpn.net/de/guides/) · [RSS](https://yivpn.net/de/guides/rss.xml) |
| `pt` | [Português](./guides/pt/README.md) | **1** | [VPN grátis para PC e Android sem cadastro: 90 minutos por dia sem cartão de crédito (Guia 2026)](./guides/pt/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/pt/guides/) · [RSS](https://yivpn.net/pt/guides/rss.xml) |
| `it` | [Italiano](./guides/it/README.md) | **1** | [Usare la VPN in Italia senza bloccare SPID, CIE, PosteID, PagoPA e Home Banking con Smart Split](./guides/it/spid-cie-home-banking-smart-split-vpn.md) | [Hub](https://yivpn.net/it/guides/) · [RSS](https://yivpn.net/it/guides/rss.xml) |
| `tr` | [Türkçe](./guides/tr/README.md) | **1** | [Discord Bağlantı ve Sesli Sohbet (RTC Connecting) Sorunu: 2026 Global TUN ile Kapsamlı Çözüm Rehberi](./guides/tr/discord-baglanti-ve-sesli-sohbet-sorunu.md) | [Hub](https://yivpn.net/tr/guides/) · [RSS](https://yivpn.net/tr/guides/rss.xml) |
| `ar` | [العربية](./guides/ar/README.md) | **1** | [أفضل إعداد VPN في الإمارات: حماية واي فاي دبي مول والمطار مع استثناء UAE Pass والبنوك عبر Smart Split](./guides/ar/uae-dubai-wifi-uae-pass-smart-split.md) | [Hub](https://yivpn.net/ar/guides/) · [RSS](https://yivpn.net/ar/guides/rss.xml) |
| `nl` | [Nederlands](./guides/nl/README.md) | **1** | [iDEAL, DigiD en Nederlandse bank-apps (ING, Rabobank, ABN AMRO) direct gebruiken met VPN aan via Smart Split](./guides/nl/ideal-digid-bankieren-smart-split-vpn.md) | [Hub](https://yivpn.net/nl/guides/) · [RSS](https://yivpn.net/nl/guides/rss.xml) |
| `sv` | [Svenska](./guides/sv/README.md) | **1** | [Använd VPN i Sverige utan att blockera Mobilt BankID, Swish och Skatteverket: guide till Smart Split](./guides/sv/bankid-swish-skatteverket-smart-split-vpn.md) | [Hub](https://yivpn.net/sv/guides/) · [RSS](https://yivpn.net/sv/guides/rss.xml) |
| `no` | [Norsk](./guides/no/README.md) | **1** | [Bruk VPN i Norge uten å blokkere Vipps, BankID, Altinn og Helsenorge: slik fungerer Smart Split](./guides/no/vipps-bankid-altinn-smart-split-vpn.md) | [Hub](https://yivpn.net/no/guides/) · [RSS](https://yivpn.net/no/guides/rss.xml) |
| `da` | [Dansk](./guides/da/README.md) | **1** | [Brug VPN i Danmark uden at blokere MitID, MobilePay, e-Boks og Borger.dk: guide til Smart Split](./guides/da/mitid-mobilepay-eboks-smart-split-vpn.md) | [Hub](https://yivpn.net/da/guides/) · [RSS](https://yivpn.net/da/guides/rss.xml) |
| `el` | [Ελληνικά](./guides/el/README.md) | **1** | [VPN στην Κύπρο (Λεμεσός, Λευκωσία): Χαμηλό Latency σε Cyta, Epic & Cablenet για Εξ Αποστάσεως Εργασία](./guides/el/kypros-vpn-cyta-cablenet-remote-work.md) | [Hub](https://yivpn.net/el/guides/) · [RSS](https://yivpn.net/el/guides/rss.xml) |
| `fa` | [فارسی](./guides/fa/README.md) | **1** | [مقایسه فنی Hysteria2، VLESS+REALITY و WireGuard روی اینترنت همراه و فیبر با Packet Loss بالا](./guides/fa/hysteria2-vs-wireguard-vs-reality.md) | [Hub](https://yivpn.net/fa/guides/) · [RSS](https://yivpn.net/fa/guides/rss.xml) |
| `az` | [Azərbaycan](./guides/az/README.md) | **1** | [Azərbaycanda VPN açıqkən ABB Mobile, Birbank, m10 və myGov-un birbaşa işləməsi: Smart Split təlimatı](./guides/az/abb-birbank-mygov-smart-split-vpn.md) | [Hub](https://yivpn.net/az/guides/) · [RSS](https://yivpn.net/az/guides/rss.xml) |

## Official YiVPN Repositories

- 📦 **[yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)** — Multi-platform releases (Windows, macOS Universal, Android), Ed25519 updater manifests & SHA-256 checksums.
- 📚 **[yivpn-official/guides](https://github.com/yivpn-official/guides)** — This repository: 20-language networking, AI proxy & split-tunneling playbooks.
- 🤖 **[yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)** — Unified Desktop Local MCP bridge & rootless AI Agent VPN proxy daemon (MIT).
- 🔀 **[yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)** — Open-source `sing-box` Smart Split-Tunneling rule generator (MIT).
- 🤖 **[llms.txt](./llms.txt)** — Machine-readable index for AI assistants & search agents.
