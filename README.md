# YiVPN Official Multilingual Guides (20 Languages)

<p align="center">[English](./README.md) · [简体中文](./README.zh-CN.md) · [Official Guides Hub](https://yivpn.net/en/guides/) · [Download YiVPN](https://yivpn.net/en/download/?ref=github-guides) · [Releases](https://github.com/yivpn-official/yivpn)</p>

Official quick-reference playbooks, diagnostic commands, and FAQ summaries for **[YiVPN (易VPN)](https://yivpn.net/en/)** across **20 languages** (**45 published guides**, last synced `2026-11-23`).

> **Note on Canonical Articles**: Each Markdown file in `guides/<lang>/` is a concise GitHub quick-reference playbook (TL;DR, deep-linked section outline, copyable CLI/PowerShell commands, and FAQ) pointing to its canonical full guide on **[yivpn.net](https://yivpn.net/en/guides/)**.

## Core Technical Coverage

- **Smart Split Tunneling (`sing-box 1.14.3`)**: Keep local banking, e-government IDs (`UAE Pass`, `iDEAL`/`DigiD`, `Mobilt BankID`/`Swish`, `Vipps`, `MitID`, `SPID`, `e-Devlet`, `PayPay`, `Pix`, `Birbank`, domestic China/HK/TW apps) and LAN/NAS direct while encrypting external traffic.
- **AI Tools & Developer Proxy / MCP**: Reliable routing for ChatGPT, Claude, Gemini, Cursor, Claude Code, Codex, Docker, and headless Linux via `Global TUN` and [yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli).
- **High-Loss & Public Wi-Fi Engineering**: `Hysteria2` (QUIC/UDP with `disablePathMTUDiscovery`) and `VLESS+REALITY` (TLS 1.3/TCP) for evening ISP peering congestion, trains, airports, and strict middleboxes.
- **Transparent Privacy & Free Tier**: Offline bundled core, anonymous 16-char activation code (no email required), **90 active minutes free daily** (no sign-up or card), and YiPro plans covering up to **3 concurrent devices**.

## 20-Language Directory

| Code | Language | Playbooks | Latest Guide | Official Hub & RSS |
| :---: | --- | :---: | --- | --- |
| `zh` | [简体中文](./guides/zh/README.md) | **5** | [外贸人必备：Gmail、WhatsApp、LinkedIn 全天在线与国内办公直连分流方案](./guides/zh/foreign-trade-gmail-whatsapp-linkedin.md) | [Hub](https://yivpn.net/guides/) · [RSS](https://yivpn.net/guides/rss.xml) |
| `zh-tw` | [繁體中文](./guides/zh-tw/README.md) | **2** | [免費電腦 VPN 推薦：免註冊、免綁卡每日 90 分鐘 Windows / Mac 台灣與香港實測（2026）](./guides/zh-tw/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/zh-tw/guides/) · [RSS](https://yivpn.net/zh-tw/guides/rss.xml) |
| `en` | [English](./guides/en/README.md) | **4** | [UK Online Safety Act & ISP Filtering (BT, Virgin Media, Sky): Privacy-First VPN Guide](./guides/en/uk-online-safety-act-isp-privacy-guide.md) | [Hub](https://yivpn.net/en/guides/) · [RSS](https://yivpn.net/en/guides/rss.xml) |
| `ru` | [Русский](./guides/ru/README.md) | **2** | [Голосовые каналы Discord и WebRTC без обрывов: зачем нужен режим Global TUN вместо обычного прокси](./guides/ru/discord-golosovoi-chat-global-tun-nastroika.md) | [Hub](https://yivpn.net/ru/guides/) · [RSS](https://yivpn.net/ru/guides/rss.xml) |
| `ja` | [日本語](./guides/ja/README.md) | **2** | [登録不要・クレカ不要の無料PC/スマホVPN：毎日90分リセットされる仕組みと制限を徹底検証](./guides/ja/free-pc-vpn-no-signup.md) | [Hub](https://yivpn.net/ja/guides/) · [RSS](https://yivpn.net/ja/guides/rss.xml) |
| `ko` | [한국어](./guides/ko/README.md) | **2** | [VPN 켜둔 채로 네이버·카카오톡·토스·국내 인터넷뱅킹 끊김 없이 쓰는 Smart Split 설정법](./guides/ko/naver-kakao-toss-banking-smart-split.md) | [Hub](https://yivpn.net/ko/guides/) · [RSS](https://yivpn.net/ko/guides/rss.xml) |
| `es` | [Español](./guides/es/README.md) | **2** | [Bloqueos accidentales de IPs de Cloudflare en Movistar, O2 y Digi en España: diagnóstico y acceso seguro](./guides/es/bloqueos-ip-cloudflare-movistar-digi-espana.md) | [Hub](https://yivpn.net/es/guides/) · [RSS](https://yivpn.net/es/guides/rss.xml) |
| `fr` | [Français](./guides/fr/README.md) | **2** | [Ralentissements Orange, Free, SFR & Bouygues le soir : comment Hysteria2 stabilise le débit international](./guides/fr/ralentissement-orange-free-sfr-hysteria2.md) | [Hub](https://yivpn.net/fr/guides/) · [RSS](https://yivpn.net/fr/guides/rss.xml) |
| `de` | [Deutsch](./guides/de/README.md) | **2** | [IP-Schutz im Heimnetz & WG-WLAN in Deutschland: Rechtssichere Privatsphäre & DNS-Leak-Schutz](./guides/de/ip-schutz-wg-wlan-dns-leak-deutschland.md) | [Hub](https://yivpn.net/de/guides/) · [RSS](https://yivpn.net/de/guides/rss.xml) |
| `pt` | [Português](./guides/pt/README.md) | **2** | [Como usar VPN no Brasil sem bloquear Pix, Gov.br e apps de bancos (Nubank, Itaú, Bradesco) via Smart Split](./guides/pt/vpn-sem-bloquear-pix-govbr-bancos-smart-split.md) | [Hub](https://yivpn.net/pt/guides/) · [RSS](https://yivpn.net/pt/guides/rss.xml) |
| `it` | [Italiano](./guides/it/README.md) | **2** | [Siti di lavoro e CDN irraggiungibili per blocchi IP su TIM, Fastweb e Vodafone: diagnosi DNS e tunnel sicuro](./guides/it/blocchi-ip-cdn-tim-fastweb-diagnosi-vpn.md) | [Hub](https://yivpn.net/it/guides/) · [RSS](https://yivpn.net/it/guides/rss.xml) |
| `tr` | [Türkçe](./guides/tr/README.md) | **2** | [Roblox açılmıyor veya yüksek ping veriyor? PC ve Android için düşük gecikmeli bağlantı ayarları](./guides/tr/roblox-acilmiyor-dusuk-ping-cozumu.md) | [Hub](https://yivpn.net/tr/guides/) · [RSS](https://yivpn.net/tr/guides/rss.xml) |
| `ar` | [العربية](./guides/ar/README.md) | **2** | [كيفية تشغيل VPN في السعودية دون تعطيل أبشر ونفاذ وتطبيقات البنوك (STC و Mobily و Zain)](./guides/ar/saudi-absher-nafath-smart-split-vpn.md) | [Hub](https://yivpn.net/ar/guides/) · [RSS](https://yivpn.net/ar/guides/rss.xml) |
| `nl` | [Nederlands](./guides/nl/README.md) | **2** | [Avonddrukte en peering op Ziggo, KPN en Odido: waarom Hysteria2 stabieler blijft bij pakketverlies](./guides/nl/ziggo-kpn-odido-pakketverlies-hysteria2.md) | [Hub](https://yivpn.net/nl/guides/) · [RSS](https://yivpn.net/nl/guides/rss.xml) |
| `sv` | [Svenska](./guides/sv/README.md) | **2** | [Integritet på Telia, Tele2, Telenor och Bahnhof: skydda din IP-adress mot datalagring och spårning (2026)](./guides/sv/integritet-svenska-operatoerer-dns-skydd.md) | [Hub](https://yivpn.net/sv/guides/) · [RSS](https://yivpn.net/sv/guides/rss.xml) |
| `no` | [Norsk](./guides/no/README.md) | **2** | [Personvern på Telenor, Telia og Altibox: beskytt IP-adressen din mot sporing og DNS-lekkasjer (2026)](./guides/no/personvern-telenor-telia-altibox-dns-vern.md) | [Hub](https://yivpn.net/no/guides/) · [RSS](https://yivpn.net/no/guides/rss.xml) |
| `da` | [Dansk](./guides/da/README.md) | **2** | [Privatliv på YouSee (TDC), Norlys, Telenor og Hiper: beskyt din forbindelse mod logning og sporing](./guides/da/privatliv-yousee-norlys-hiper-dns-beskyttelse.md) | [Hub](https://yivpn.net/da/guides/) · [RSS](https://yivpn.net/da/guides/rss.xml) |
| `el` | [Ελληνικά](./guides/el/README.md) | **2** | [Χρήση VPN χωρίς μπλοκάρισμα σε Gov.gr, Taxisnet (ΑΑΔΕ), Αριάδνη Κύπρου και e-Banking μέσω Smart Split](./guides/el/govgr-taxisnet-ebanking-smart-split-vpn.md) | [Hub](https://yivpn.net/el/guides/) · [RSS](https://yivpn.net/el/guides/rss.xml) |
| `fa` | [فارسی](./guides/fa/README.md) | **2** | [تنظیم تفکیک هوشمند ترافیک (Smart Split): اتصال مستقیم به شاپرک، همراه بانک‌ها، اسنپ و سایت‌های .ir](./guides/fa/smart-split-shaparak-hamrah-bank-ir-direct.md) | [Hub](https://yivpn.net/fa/guides/) · [RSS](https://yivpn.net/fa/guides/rss.xml) |
| `az` | [Azərbaycan](./guides/az/README.md) | **2** | [Aztelekom, Baktelecom və CityNet fiber şəbəkələrində axşam sürət düşməsi: Hysteria2 ilə stabil bağlantı](./guides/az/aztelekom-citynet-paket-itkisi-hysteria2.md) | [Hub](https://yivpn.net/az/guides/) · [RSS](https://yivpn.net/az/guides/rss.xml) |

## Official YiVPN Repositories

- 📦 **[yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)** — Multi-platform releases (Windows, macOS Universal, Android), Ed25519 updater manifests & SHA-256 checksums.
- 📚 **[yivpn-official/guides](https://github.com/yivpn-official/guides)** — This repository: 20-language networking, AI proxy & split-tunneling playbooks.
- 🤖 **[yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)** — Unified Desktop Local MCP bridge & rootless AI Agent VPN proxy daemon (MIT).
- 🔀 **[yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)** — Open-source `sing-box` Smart Split-Tunneling rule generator (MIT).
- 🤖 **[llms.txt](./llms.txt)** — Machine-readable index for AI assistants & search agents.
