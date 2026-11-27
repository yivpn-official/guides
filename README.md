# YiVPN Official Multilingual Guides (20 Languages)

<p align="center">[English](./README.md) · [简体中文](./README.zh-CN.md) · [Official Guides Hub](https://yivpn.net/en/guides/) · [Download YiVPN](https://yivpn.net/en/download/?ref=github-guides) · [Releases](https://github.com/yivpn-official/yivpn)</p>

Official quick-reference playbooks, diagnostic commands, and FAQ summaries for **[YiVPN (易VPN)](https://yivpn.net/en/)** across **20 languages** (**85 published guides**, last synced `2026-11-27`).

> **Note on Canonical Articles**: Each Markdown file in `guides/<lang>/` is a concise GitHub quick-reference playbook (TL;DR, deep-linked section outline, copyable CLI/PowerShell commands, and FAQ) pointing to its canonical full guide on **[yivpn.net](https://yivpn.net/en/guides/)**.

## Core Technical Coverage

- **Smart Split Tunneling (`sing-box 1.14.3`)**: Keep local banking, e-government IDs (`UAE Pass`, `iDEAL`/`DigiD`, `Mobilt BankID`/`Swish`, `Vipps`, `MitID`, `SPID`, `e-Devlet`, `PayPay`, `Pix`, `Birbank`, domestic China/HK/TW apps) and LAN/NAS direct while encrypting external traffic.
- **AI Tools & Developer Proxy / MCP**: Reliable routing for ChatGPT, Claude, Gemini, Cursor, Claude Code, Codex, Docker, and headless Linux via `Global TUN` and [yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli).
- **High-Loss & Public Wi-Fi Engineering**: `Hysteria2` (QUIC/UDP with `disablePathMTUDiscovery`) and `VLESS+REALITY` (TLS 1.3/TCP) for evening ISP peering congestion, trains, airports, and strict middleboxes.
- **Transparent Privacy & Free Tier**: Offline bundled core, anonymous 16-char activation code (no email required), **90 active minutes free daily** (no sign-up or card), and YiPro plans covering up to **3 concurrent devices**.

## 20-Language Directory

| Code | Language | Playbooks | Latest Guide | Official Hub & RSS |
| :---: | --- | :---: | --- | --- |
| `zh` | [简体中文](./guides/zh/README.md) | **7** | [Midjourney + Discord 国内稳定出图与高清原图秒加载完整指南（2026 设计师版）](./guides/zh/midjourney-discord-network-guide.md) | [Hub](https://yivpn.net/guides/) · [RSS](https://yivpn.net/guides/rss.xml) |
| `zh-tw` | [繁體中文](./guides/zh-tw/README.md) | **4** | [開 VPN 點樣唔影響 PayMe、轉數快 FPS、八達通同台灣網銀／LINE Pay？Smart Split 設定教學](./guides/zh-tw/hk-tw-banking-payme-linepay-smart-split.md) | [Hub](https://yivpn.net/zh-tw/guides/) · [RSS](https://yivpn.net/zh-tw/guides/rss.xml) |
| `en` | [English](./guides/en/README.md) | **6** | [Doha & Manama Remote Work VPN: Low-Jitter QUIC Setup on Ooredoo, Vodafone Qatar & Batelco](./guides/en/qatar-bahrain-remote-work-quic-vpn.md) | [Hub](https://yivpn.net/en/guides/) · [RSS](https://yivpn.net/en/guides/rss.xml) |
| `ru` | [Русский](./guides/ru/README.md) | **4** | [Hysteria2, VLESS+REALITY (TLS 1.3) и WireGuard: какой протокол устойчивее на сложных сетях и при потере пакетов?](./guides/ru/hysteria2-vs-wireguard-vs-reality.md) | [Hub](https://yivpn.net/ru/guides/) · [RSS](https://yivpn.net/ru/guides/rss.xml) |
| `ja` | [日本語](./guides/ja/README.md) | **4** | [VPN接続中でもPayPay・マイナポータル・国内ネット銀行をそのまま使う「Smart Split」設定術](./guides/ja/paypay-mynaportal-banking-smart-split.md) | [Hub](https://yivpn.net/ja/guides/) · [RSS](https://yivpn.net/ja/guides/rss.xml) |
| `ko` | [한국어](./guides/ko/README.md) | **4** | [Claude Code·Cursor·Codex 터미널 프록시 및 로컬 MCP 자동 라우팅 설정 완벽 가이드](./guides/ko/ai-coding-tools-proxy.md) | [Hub](https://yivpn.net/ko/guides/) · [RSS](https://yivpn.net/ko/guides/rss.xml) |
| `es` | [Español](./guides/es/README.md) | **4** | [Wi-Fi pública segura en cafeterías, aeropuertos (Madrid-Barajas, CDMX, Bogotá) y hoteles: guía práctica](./guides/es/wifi-publica-segura-aeropuertos-cafeterias.md) | [Hub](https://yivpn.net/es/guides/) · [RSS](https://yivpn.net/es/guides/rss.xml) |
| `fr` | [Français](./guides/fr/README.md) | **4** | [Banques françaises (Crédit Agricole, BNP, BoursoBank) & Impots.gouv : garder l’accès direct via Smart Split](./guides/fr/banques-francaises-impots-smart-split-vpn.md) | [Hub](https://yivpn.net/fr/guides/) · [RSS](https://yivpn.net/fr/guides/rss.xml) |
| `de` | [Deutsch](./guides/de/README.md) | **4** | [DSGVO-konformes VPN ohne Konto-Zwang: Warum ein anonymer Aktivierungscode sicherer als ein E-Mail-Login ist](./guides/de/dsgvo-vpn-ohne-registrierung-aktivierungscode.md) | [Hub](https://yivpn.net/de/guides/) · [RSS](https://yivpn.net/de/guides/rss.xml) |
| `pt` | [Português](./guides/pt/README.md) | **4** | [VPN em Portugal (MEO, NOS, Vodafone PT): como proteger a privacidade sem bloquear o MB WAY nem o Portal das Finanças](./guides/pt/vpn-portugal-mbway-meo-nos-smart-split.md) | [Hub](https://yivpn.net/pt/guides/) · [RSS](https://yivpn.net/pt/guides/rss.xml) |
| `it` | [Italiano](./guides/it/README.md) | **4** | [VPN in Canton Ticino e Svizzera italiana (Lugano, Bellinzona): privacy anti-tracking IA e RSI in accesso diretto](./guides/it/svizzera-italiana-ticino-privacy-smart-split.md) | [Hub](https://yivpn.net/it/guides/) · [RSS](https://yivpn.net/it/guides/rss.xml) |
| `tr` | [Türkçe](./guides/tr/README.md) | **4** | [Turkcell Superonline ve Türk Telekom fiberde VPN neden kopar? VLESS+REALITY ve Hysteria2 çözümü](./guides/tr/superonline-turk-telekom-vpn-kopma-hysteria2.md) | [Hub](https://yivpn.net/tr/guides/) · [RSS](https://yivpn.net/tr/guides/rss.xml) |
| `ar` | [العربية](./guides/ar/README.md) | **4** | [استقرار الاجتماعات السحابية والعمل عن بُعد في قطر على شبكات Ooredoo وVodafone ببروتوكول Hysteria2](./guides/ar/qatar-ooredoo-remote-work-hysteria2.md) | [Hub](https://yivpn.net/ar/guides/) · [RSS](https://yivpn.net/ar/guides/rss.xml) |
| `nl` | [Nederlands](./guides/nl/README.md) | **4** | [Veilig werken op NS-trein Wi-Fi, Schiphol en in cafés: versleuteling met TLS 1.3 en QUIC uitgelegd](./guides/nl/veilig-openbaar-wifi-ns-trein-schiphol.md) | [Hub](https://yivpn.net/nl/guides/) · [RSS](https://yivpn.net/nl/guides/rss.xml) |
| `sv` | [Svenska](./guides/sv/README.md) | **4** | [Säkert Wi-Fi på SJ-tåg, Arlanda och caféer: varför QUIC och Hysteria2 håller anslutningen uppe i rörelse](./guides/sv/saekert-wifi-sj-taag-arlanda-hysteria2.md) | [Hub](https://yivpn.net/sv/guides/) · [RSS](https://yivpn.net/sv/guides/rss.xml) |
| `no` | [Norsk](./guides/no/README.md) | **4** | [Stabilt VPN på Vy-tog, Oslo Lufthavn Gardermoen og på hytta (4G/5G): hvorfor Hysteria2 tåler pakketap](./guides/no/stabilt-vpn-vy-tog-gardermoen-hytta-5g.md) | [Hub](https://yivpn.net/no/guides/) · [RSS](https://yivpn.net/no/guides/rss.xml) |
| `da` | [Dansk](./guides/da/README.md) | **4** | [Sikker Wi-Fi i DSB-tog, Københavns Lufthavn (CPH) og på caféer: undgå afbrydelser med QUIC og Hysteria2](./guides/da/sikker-wifi-dsb-tog-koebenhavns-lufthavn.md) | [Hub](https://yivpn.net/da/guides/) · [RSS](https://yivpn.net/da/guides/rss.xml) |
| `el` | [Ελληνικά](./guides/el/README.md) | **4** | [Αργό διεθνές ίντερνετ το βράδυ σε Cosmote, Nova και Vodafone; Πώς το Hysteria2 μειώνει το packet loss](./guides/el/cosmote-nova-vodafone-packet-loss-hysteria2.md) | [Hub](https://yivpn.net/el/guides/) · [RSS](https://yivpn.net/el/guides/rss.xml) |
| `fa` | [فارسی](./guides/fa/README.md) | **4** | [VPN رایگان بدون ثبت‌نام و کارت بانکی برای کامپیوتر و اندروید: روزانه ۹۰ دقیقه با ریست خودکار (2026)](./guides/fa/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/fa/guides/) · [RSS](https://yivpn.net/fa/guides/rss.xml) |
| `az` | [Azərbaycan](./guides/az/README.md) | **4** | [Azercell, Bakcell və Nar 4G/5G şəbəkələrində aşağı ping və oyun/Discord səs sabitliyi: Global TUN bələdçisi](./guides/az/azercell-bakcell-oyun-discord-global-tun.md) | [Hub](https://yivpn.net/az/guides/) · [RSS](https://yivpn.net/az/guides/rss.xml) |

## Official YiVPN Repositories

- 📦 **[yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)** — Multi-platform releases (Windows, macOS Universal, Android), Ed25519 updater manifests & SHA-256 checksums.
- 📚 **[yivpn-official/guides](https://github.com/yivpn-official/guides)** — This repository: 20-language networking, AI proxy & split-tunneling playbooks.
- 🤖 **[yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)** — Unified Desktop Local MCP bridge & rootless AI Agent VPN proxy daemon (MIT).
- 🔀 **[yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)** — Open-source `sing-box` Smart Split-Tunneling rule generator (MIT).
- 🤖 **[llms.txt](./llms.txt)** — Machine-readable index for AI assistants & search agents.
