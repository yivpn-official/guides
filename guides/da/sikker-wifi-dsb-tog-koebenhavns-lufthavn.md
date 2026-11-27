# Sikker Wi-Fi i DSB-tog, Københavns Lufthavn (CPH) og på caféer: undgå afbrydelser med QUIC og Hysteria2

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/da/guides/sikker-wifi-dsb-tog-koebenhavns-lufthavn/)**.

- **Language**: `da` (Dansk) · **Cluster**: `crossborder` · **Updated**: `2026-11-27`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: sikker Wi-Fi DSB tog, Københavns Lufthavn CPH Wi-Fi VPN, Evil Twin åbent Wi-Fi café, Hysteria2 QUIC Storebælt, MitID MobilePay e-Boks Smart Split, YiVPN Danmark

## Key Takeaways (TL;DR)

- Åbne café-netværk og lufthavns-SSID'er udsætter din bærbare for DNS-aflytning og Evil Twin-angreb, mens Storebæltstunnelen i DSB-tog ofte får ældre TCP-VPN'er til at afbryde.
- YiVPN v1.0.14 bruger Hysteria2 (QUIC/UDP med disablePathMTUDiscovery og kort ISRG Root X2-kæde) til at holde SSH og videomøder kørende gennem skift over Storebælt, og VLESS+REALITY (TCP/443) bag strenge hotel- og lufthavnsfirewalls.
- Gennemfør altid login på CPH Airport Free WiFi eller DSB-portalen, før du slår Global TUN til, så portalens viderestilling ikke bliver fanget i tunnelen.
- Smart Split i sing-box 1.14.3 lader MitID, MobilePay, e-Boks og Borger.dk gå direkte via YouSee (TDC), Norlys eller Hiper — prøv 90 min/dag gratis (nulstilles 17:00 CET) eller YiPro fra $2.99/md. på op til 3 enheder.

## Overview

Når du arbejder på farten i **DSB-tog** mellem København og Aarhus, venter ved gaten i **Københavns Lufthavn (CPH)** eller sidder på en travl café i Indre By, står du over for to klassiske problemer: usikrede gæstenetværk og forbindelser, der fryser midt i et opkald over Storebælt. **YiVPN v1.0.14** beskytter din enhed med Layer-3 **Global TUN**, holder sessionen stabil via **Hysteria2** (QUIC) eller **VLESS+REALITY** (`TCP/443`) og lader **MitID**, **MobilePay**, **e-Boks** og **Borger.dk** køre direkte gennem **Smart Split**.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Evil Twin, DNS-risiko og Storebælt-udfald på danske netværk](https://yivpn.net/da/guides/sikker-wifi-dsb-tog-koebenhavns-lufthavn/#evil-twin-og-storebaelt)
- [2. Hysteria2 vs VLESS+REALITY: sådan holder sing-box 1.14.3 forbindelsen stabil](https://yivpn.net/da/guides/sikker-wifi-dsb-tog-koebenhavns-lufthavn/#hysteria2-vs-vless-danmark)
- [3. MitID, MobilePay, e-Boks og Borger.dk direkte med Smart Split](https://yivpn.net/da/guides/sikker-wifi-dsb-tog-koebenhavns-lufthavn/#mitid-mobilepay-smart-split)
- [4. Privatliv uden registrering, gratisminutter og priser](https://yivpn.net/da/guides/sikker-wifi-dsb-tog-koebenhavns-lufthavn/#privatliv-og-priser)

## Copyable Diagnostic & Config Snippets

```bash
# 1. Bekræft SHA-256 på macOS Universal DMG (YiVPN v1.0.14)
shasum -a 256 ~/Downloads/YIVPN_1.0.14_universal.dmg
# Forventet hash: 71fdabf0ca5303e1f45a4d8ea7376ebcf65fe308c9ae3cc754f3bda67bcff2fe

# 2. Kontrollér lokal headless proxy, når YiVPN eller yivpn-agent-cli v2.2.1 kører
curl --socks5-hostname 127.0.0.1:10808 -I https://yivpn.net
```

## Quick FAQ

**Q: Hvorfor er åbne Wi-Fi-netværk på københavnske caféer og i CPH en sikkerhedsrisiko?**

På delte hotspots uden klientisolering kan andre på samme accesspunkt opsnappe ukrypterede DNS-opslag eller sætte en falsk adgangsklon (Evil Twin) op med samme SSID-navn. Når YiVPN's Layer-3 Global TUN er aktiv, krypteres al DNS- og applikationstrafik allerede på din enhed.

**Q: Hvad sker der med VPN-forbindelsen, når DSB-toget kører gennem Storebæltstunnelen?**

Under og lige efter krydsningen af Storebæltsforbindelsen skifter togets onboard-Wi-Fi eller dit mobile hotspot hurtigt mellem basestationer på Sjælland og Fyn. Hysteria2 over QUIC håndterer midlertidigt pakketab og IP-/celleskift uden den lange genopkoblingstid, som TCP-tunneler lider under.

**Q: Kan jeg bruge MitID, MobilePay, e-Boks og Borger.dk, mens YiVPN kører?**

Ja. Når Smart Split er aktiveret i YiVPN v1.0.14, sendes trafik til MitID, MobilePay, e-Boks, Borger.dk og danske banker direkte via din danske forbindelse hos YouSee (TDC), Norlys, Hiper eller dit mobilnetværk, mens øvrig internettrafik forbliver krypteret.

**Q: Hvordan fungerer den gratis kvote og aktiveringskoden i Danmark?**

Alle får 90 aktive minutter gratis hver dag uden e-mail eller betalingskort; uret sættes på pause ved afbrydelse og nulstilles dagligt kl. 17:00 CET i København (16:00 UTC). Betaling kan aktiveres anonymt med en 16-tegns kode (YIVP-XXXX-XXXX-XXXX) på op til 3 enheder.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Sikker Wi-Fi i DSB-tog, Københavns Lufthavn (CPH) og på caféer: undgå afbrydelser med QUIC og Hysteria2](https://yivpn.net/da/guides/sikker-wifi-dsb-tog-koebenhavns-lufthavn/)
- **Dansk Guides Hub**: [https://yivpn.net/da/guides/](https://yivpn.net/da/guides/) · [RSS Feed](https://yivpn.net/da/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/da/download/?ref=github-guides](https://yivpn.net/da/download/?ref=github-guides)
- **Official Website (Dansk)**: [https://yivpn.net/da/](https://yivpn.net/da/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
