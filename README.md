# YiVPN Official Multilingual Guides (20 Languages)

<p align="center">[English](./README.md) · [简体中文](./README.zh-CN.md) · [Official Guides Hub](https://yivpn.net/en/guides/) · [Download YiVPN](https://yivpn.net/en/download/?ref=github-guides) · [Releases](https://github.com/yivpn-official/yivpn)</p>

Official quick-reference playbooks, diagnostic commands, and FAQ summaries for **[YiVPN (易VPN)](https://yivpn.net/en/)** across **20 languages** (**65 published guides**, last synced `2026-11-25`).

> **Note on Canonical Articles**: Each Markdown file in `guides/<lang>/` is a concise GitHub quick-reference playbook (TL;DR, deep-linked section outline, copyable CLI/PowerShell commands, and FAQ) pointing to its canonical full guide on **[yivpn.net](https://yivpn.net/en/guides/)**.

## Core Technical Coverage

- **Smart Split Tunneling (`sing-box 1.14.3`)**: Keep local banking, e-government IDs (`UAE Pass`, `iDEAL`/`DigiD`, `Mobilt BankID`/`Swish`, `Vipps`, `MitID`, `SPID`, `e-Devlet`, `PayPay`, `Pix`, `Birbank`, domestic China/HK/TW apps) and LAN/NAS direct while encrypting external traffic.
- **AI Tools & Developer Proxy / MCP**: Reliable routing for ChatGPT, Claude, Gemini, Cursor, Claude Code, Codex, Docker, and headless Linux via `Global TUN` and [yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli).
- **High-Loss & Public Wi-Fi Engineering**: `Hysteria2` (QUIC/UDP with `disablePathMTUDiscovery`) and `VLESS+REALITY` (TLS 1.3/TCP) for evening ISP peering congestion, trains, airports, and strict middleboxes.
- **Transparent Privacy & Free Tier**: Offline bundled core, anonymous 16-char activation code (no email required), **90 active minutes free daily** (no sign-up or card), and YiPro plans covering up to **3 concurrent devices**.

## 20-Language Directory

| Code | Language | Playbooks | Latest Guide | Official Hub & RSS |
| :---: | --- | :---: | --- | --- |
| `zh` | [简体中文](./guides/zh/README.md) | **6** | [云服务器与 Docker 拉不动 GitHub、Docker Hub、HuggingFace？一条命令不断 SSH 接入代理](./guides/zh/linux-server-docker-github-proxy.md) | [Hub](https://yivpn.net/guides/) · [RSS](https://yivpn.net/guides/rss.xml) |
| `zh-tw` | [繁體中文](./guides/zh-tw/README.md) | **3** | [香港與台灣開發者必備：Cursor、Claude Code、Codex 終端機代理與本地 MCP 自動分流教學](./guides/zh-tw/ai-coding-tools-proxy.md) | [Hub](https://yivpn.net/zh-tw/guides/) · [RSS](https://yivpn.net/zh-tw/guides/rss.xml) |
| `en` | [English](./guides/en/README.md) | **5** | [Singapore Fiber Routing & Cross-Border AI Access: Low-Latency Split Tunneling on Singtel & StarHub](./guides/en/singapore-low-latency-ai-split-tunneling.md) | [Hub](https://yivpn.net/en/guides/) · [RSS](https://yivpn.net/en/guides/rss.xml) |
| `ru` | [Русский](./guides/ru/README.md) | **3** | [Как стабильно работать с ChatGPT, Claude и Gemini без ошибки региона: чистый маршрут и Smart Split](./guides/ru/kak-polzovatsya-chatgpt-claude-gemini-nastroika.md) | [Hub](https://yivpn.net/ru/guides/) · [RSS](https://yivpn.net/ru/guides/rss.xml) |
| `ja` | [日本語](./guides/ja/README.md) | **3** | [Claude Code・Cursor・Codexのターミナルプロキシ設定とローカルMCP自動ルーティング完全ガイド](./guides/ja/ai-coding-tools-proxy.md) | [Hub](https://yivpn.net/ja/guides/) · [RSS](https://yivpn.net/ja/guides/rss.xml) |
| `ko` | [한국어](./guides/ko/README.md) | **3** | [회원가입·카드 등록 없는 무료 PC & 안드로이드 VPN: 매일 90분 자동 리셋 사용법과 한계 (2026)](./guides/ko/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/ko/guides/) · [RSS](https://yivpn.net/ko/guides/rss.xml) |
| `es` | [Español](./guides/es/README.md) | **3** | [Cómo usar VPN sin bloquear Bizum, Cl@ve, BBVA, Santander, Nequi ni Mercado Pago con Smart Split](./guides/es/banca-online-bizum-mercadopago-smart-split-vpn.md) | [Hub](https://yivpn.net/es/guides/) · [RSS](https://yivpn.net/es/guides/rss.xml) |
| `fr` | [Français](./guides/fr/README.md) | **3** | [VPN gratuit sur PC et Mac sans inscription : 90 minutes par jour sans carte bancaire (Test 2026)](./guides/fr/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/fr/guides/) · [RSS](https://yivpn.net/fr/guides/rss.xml) |
| `de` | [Deutsch](./guides/de/README.md) | **3** | [Online-Banking (Sparkasse, ING, DKB) & Fritz!Box-Heimnetz trotz VPN direkt nutzen: Smart-Split-Anleitung](./guides/de/online-banking-fritzbox-smart-split-vpn.md) | [Hub](https://yivpn.net/de/guides/) · [RSS](https://yivpn.net/de/guides/rss.xml) |
| `pt` | [Português](./guides/pt/README.md) | **3** | [Internet lenta à noite na Claro, Vivo e Oi Fibra para sites internacionais? Como o Hysteria2 reduz perda de pacotes](./guides/pt/perda-de-pacotes-claro-vivo-fibra-hysteria2.md) | [Hub](https://yivpn.net/pt/guides/) · [RSS](https://yivpn.net/pt/guides/rss.xml) |
| `it` | [Italiano](./guides/it/README.md) | **3** | [VPN gratis per PC e Mac senza registrazione: 90 minuti al giorno senza email o carta di credito (2026)](./guides/it/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/it/guides/) · [RSS](https://yivpn.net/it/guides/rss.xml) |
| `tr` | [Türkçe](./guides/tr/README.md) | **3** | [Kayıt olmadan ücretsiz VPN: Windows, macOS ve Android için günlük 90 dakika rehberi (2026)](./guides/tr/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/tr/guides/) · [RSS](https://yivpn.net/tr/guides/rss.xml) |
| `ar` | [العربية](./guides/ar/README.md) | **3** | [VPN مجاني للكمبيوتر والأندرويد بدون تسجيل أو بطاقة ائتمان: 90 دقيقة يومياً (2026)](./guides/ar/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/ar/guides/) · [RSS](https://yivpn.net/ar/guides/rss.xml) |
| `nl` | [Nederlands](./guides/nl/README.md) | **3** | [Gratis VPN voor Windows en Mac zonder registratie: dagelijks 90 minuten zonder e-mail of creditcard (2026)](./guides/nl/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/nl/guides/) · [RSS](https://yivpn.net/nl/guides/rss.xml) |
| `sv` | [Svenska](./guides/sv/README.md) | **3** | [Gratis VPN för PC och Mac utan registrering: 90 minuter per dag utan e-post eller betalkort](./guides/sv/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/sv/guides/) · [RSS](https://yivpn.net/sv/guides/rss.xml) |
| `no` | [Norsk](./guides/no/README.md) | **3** | [Gratis VPN for PC og Mac uten registrering: 90 minutter daglig uten e-post eller bankkort](./guides/no/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/no/guides/) · [RSS](https://yivpn.net/no/guides/rss.xml) |
| `da` | [Dansk](./guides/da/README.md) | **3** | [Gratis VPN til PC og Mac uden registrering: 90 minutter dagligt uden e-mail eller betalingskort (2026)](./guides/da/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/da/guides/) · [RSS](https://yivpn.net/da/guides/rss.xml) |
| `el` | [Ελληνικά](./guides/el/README.md) | **3** | [Δωρεάν VPN για PC και Android χωρίς εγγραφή: 90 λεπτά κάθε μέρα χωρίς κάρτα ή email (Οδηγός 2026)](./guides/el/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/el/guides/) · [RSS](https://yivpn.net/el/guides/rss.xml) |
| `fa` | [فارسی](./guides/fa/README.md) | **3** | [نصب آفلاین VPN در ویندوز، مک و اندروید بدون نیاز به دانلود هسته خارجی: دریافت امن از GitHub Releases](./guides/fa/offline-installer-singbox-github-releases-sha256.md) | [Hub](https://yivpn.net/fa/guides/) · [RSS](https://yivpn.net/fa/guides/rss.xml) |
| `az` | [Azərbaycan](./guides/az/README.md) | **3** | [Qeydiyyatsız və kartsız pulsuz VPN (PC və Android): hər gün yenilənən 90 dəqiqəlik limit (2026)](./guides/az/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/az/guides/) · [RSS](https://yivpn.net/az/guides/rss.xml) |

## Official YiVPN Repositories

- 📦 **[yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)** — Multi-platform releases (Windows, macOS Universal, Android), Ed25519 updater manifests & SHA-256 checksums.
- 📚 **[yivpn-official/guides](https://github.com/yivpn-official/guides)** — This repository: 20-language networking, AI proxy & split-tunneling playbooks.
- 🤖 **[yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)** — Unified Desktop Local MCP bridge & rootless AI Agent VPN proxy daemon (MIT).
- 🔀 **[yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)** — Open-source `sing-box` Smart Split-Tunneling rule generator (MIT).
- 🤖 **[llms.txt](./llms.txt)** — Machine-readable index for AI assistants & search agents.
