# Säkert Wi-Fi på SJ-tåg, Arlanda och caféer: varför QUIC och Hysteria2 håller anslutningen uppe i rörelse

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/sv/guides/saekert-wifi-sj-taag-arlanda-hysteria2/)**.

- **Language**: `sv` (Svenska) · **Cluster**: `crossborder` · **Updated**: `2026-11-27`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: säkert Wi-Fi SJ-tåg, Arlanda Wi-Fi VPN, Hysteria2 QUIC VPN, Mobilt BankID Smart Split, offentligt Wi-Fi VPN Sverige, YiVPN Sverige

## Key Takeaways (TL;DR)

- På SJ-tåg längs Stockholm–Göteborg och i öppna nät på Arlanda och caféer bryts klassiska TCP-baserade VPN-tunnlar ofta vid basstationsbyten och paketförlust.
- YiVPN v1.0.14 kombinerar Hysteria2 (QUIC/UDP med disablePathMTUDiscovery och kort ISRG Root X2-kedja) för mobil rörelse med VLESS+REALITY (TCP/443) när hotell eller lounger spärrar UDP.
- Slutför alltid inloggningen i Arlanda-WiFi eller SJ:s ombordportal innan du aktiverar Global TUN, så att captive portal-omdirigeringen släpps igenom utan fördröjning.
- Smart Split i sing-box 1.14.3 håller Mobilt BankID, Swish och Skatteverket direkt på Telia, Tele2 eller Bahnhof — testa 90 min/dag gratis (återställs 17:00 CET) eller YiPro från $2.99/mån för upp till 3 enheter.

## Overview

På **SJ-tåg** mellan Stockholm och Göteborg, i **Arlanda Airports** öppna Wi-Fi och på svenska caféer utsätts din uppkoppling för två helt olika påfrestningar samtidigt: oskyddade delade nätverk och täta radioöverlämningar när tåget passerar skogsområden. Med **YiVPN v1.0.14** håller **Hysteria2** (QUIC) sessionen vid liv i rörelse, **VLESS+REALITY** tar vid bakom stängda hotellbrandväggar och **Smart Split** låter **Mobilt BankID**, **Swish** och **Skatteverket** gå direkt utan IP-krockar.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Varför SJ-tåg, Arlanda och caféer knäcker traditionella VPN-tunnlar](https://yivpn.net/sv/guides/saekert-wifi-sj-taag-arlanda-hysteria2/#varfor-offentligt-wifi-bryts)
- [2. Hysteria2 (QUIC) vs VLESS+REALITY i rörelse och på restriktiva nät](https://yivpn.net/sv/guides/saekert-wifi-sj-taag-arlanda-hysteria2/#hysteria2-vs-vless-reality)
- [3. Steg-för-steg: verifiera klienten och håll BankID igång med Smart Split](https://yivpn.net/sv/guides/saekert-wifi-sj-taag-arlanda-hysteria2/#smart-split-och-verifiering)
- [4. Integritet, gratisnivå och priser för pendlare i Sverige](https://yivpn.net/sv/guides/saekert-wifi-sj-taag-arlanda-hysteria2/#integritet-och-priser)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Kontrollera SHA-256 på nedladdat installationspaket (v1.0.14)
Get-FileHash "$env:USERPROFILE\Downloads\YIVPN_1.0.14_x64.msi" -Algorithm SHA256

# 2. Kontrollera lokal proxy-port efter anslutning på SJ eller Arlanda
Test-NetConnection -ComputerName 127.0.0.1 -Port 10808
```

## Quick FAQ

**Q: Varför fryser min vanliga VPN på SJ-tåget mellan Stockholm och Göteborg?**

Längs skogssträckor som Kolmården och Tiveden växlar tågets router snabbt mellan olika 4G/5G-master. En traditionell TCP-tunnel fastnar i omsändningar och ny handskakning vid varje IP- eller mastbyte, medan Hysteria2 ovanpå QUIC behåller sessionen levande trots kortvarig paketförlust.

**Q: I vilken ordning ska jag ansluta på Arlanda Airport eller caféer med inloggningssida?**

Anslut först till Wi-Fi-nätet (till exempel Arlanda-WiFi), godkänn villkoren i webbläsarens captive portal och vänta tills internet svarar. Aktivera därefter YiVPN:s Layer-3 Global TUN eller Smart Split så att all efterföljande trafik krypteras direkt.

**Q: Fungerar Mobilt BankID och Swish när jag sitter på offentligt Wi-Fi med YiVPN?**

Ja. Med Smart Split påslaget går trafik till Mobilt BankID, Swish, Skatteverket och svenska banker direkt via din anslutning på Telia, Tele2 eller Bahnhof, medan övrig trafik som SSH, molntjänster och webbsurf skyddas i tunneln.

**Q: Hur räknas de 90 gratisminuterna under en längre tågresa?**

Gratismätaren tickar bara när tunneln är aktivt ansluten och pausas automatiskt när du kopplar ifrån eller stänger locket. Kvoten på 90 minuter per dag kräver inget konto eller kort och återställs dagligen kl. 17:00 CET i Stockholm (16:00 UTC).

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Säkert Wi-Fi på SJ-tåg, Arlanda och caféer: varför QUIC och Hysteria2 håller anslutningen uppe i rörelse](https://yivpn.net/sv/guides/saekert-wifi-sj-taag-arlanda-hysteria2/)
- **Svenska Guides Hub**: [https://yivpn.net/sv/guides/](https://yivpn.net/sv/guides/) · [RSS Feed](https://yivpn.net/sv/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/sv/download/?ref=github-guides](https://yivpn.net/sv/download/?ref=github-guides)
- **Official Website (Svenska)**: [https://yivpn.net/sv/](https://yivpn.net/sv/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
