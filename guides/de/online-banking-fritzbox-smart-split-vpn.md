# Online-Banking (Sparkasse, ING, DKB) & Fritz!Box-Heimnetz trotz VPN direkt nutzen: Smart-Split-Anleitung

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/de/guides/online-banking-fritzbox-smart-split-vpn/)**.

- **Language**: `de` (Deutsch) · **Cluster**: `crossborder` · **Updated**: `2026-11-25`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: Online-Banking VPN Smart Split, Sparkasse pushTAN VPN Fehler, FritzBox 192.168.178.0/24 VPN direkt, ING DKB Comdirect ELSTER VPN, Telekom Vodafone 1und1 Smart Split, YiVPN sing-box 1.14.3

## Key Takeaways (TL;DR)

- Klassische Voll-Tunnel-VPNs brechen bei Sparkasse (pushTAN), ING, DKB, Comdirect und ELSTER häufig durch Geo-IP-Sperren oder 2FA-Timeouts und kappen den Zugriff auf die lokale AVM FRITZ!Box (192.168.178.0/24).
- YiVPN v1.0.14 nutzt Layer-3 Global TUN mit singbox-smart-split (sing-box 1.14.3), sodass .de-Banking, lokale LAN-Subnetze, Synology NAS und mDNS-Drucker direkt über den eigenen Anschluss laufen.
- Auf Anschlüssen von Deutsche Telekom, Vodafone und 1&1 wählt das Routing bei abendlichem Peering-Paketverlust Hysteria2 oder weicht auf VLESS+REALITY (TCP/443) aus.
- Ohne E-Mail-Registrierung lassen sich täglich 90 aktive Minuten kostenlos testen (Reset um 17:00 Uhr MEZ / CET bzw. 16:00 UTC); YiPro kostet $2.99/Monat für 3 Geräte.

## Overview

Wer in Deutschland oder dem DACH-Raum an einem Anschluss von **Deutsche Telekom**, **Vodafone** oder **1&1** arbeitet, kennt das klassische Voll-Tunnel-Dilemma: Sobald das VPN aktiv ist, verweigern **Sparkasse (pushTAN)**, **ING**, **DKB**, **Comdirect** oder das Steuerportal **ELSTER** die Anmeldung mit der deutschen Heim-IP, und gleichzeitig verschwinden die **AVM FRITZ!Box** (`fritz.box` / `192.168.178.0/24`), das **Synology NAS** sowie Netzwerkdrucker aus dem lokalen Netz. `YiVPN v1.0.14` löst diesen Konflikt über `Global TUN` und das Regelwerk [singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split) auf Basis von `sing-box 1.14.3`: Deutsche Banking-Ziele und private Heimnetz-Subnetze bleiben direkt auf der lokalen Leitung, während internationaler Datenverkehr sauber verschlüsselt durch `Hysteria2` oder `VLESS+REALITY` fließt.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Warum ein Voll-Tunnel-VPN Sparkasse, ING, DKB und fritz.box blockiert](https://yivpn.net/de/guides/online-banking-fritzbox-smart-split-vpn/#voll-tunnel-konflikte)
- [2. Smart Split unter der Haube: sing-box 1.14.3, LAN-CIDR und mDNS](https://yivpn.net/de/guides/online-banking-fritzbox-smart-split-vpn/#smart-split-architektur)
- [3. Telekom, Vodafone & 1&1: Hysteria2 vs. VLESS+REALITY plus Routing-Check](https://yivpn.net/de/guides/online-banking-fritzbox-smart-split-vpn/#isp-protokolle-routing)
- [4. Praxis-Setup: YiVPN v1.0.14 prüfen, 90 Min/Tag gratis nutzen & YiPro für 3 Geräte](https://yivpn.net/de/guides/online-banking-fritzbox-smart-split-vpn/#praxis-setup-yivpn)

## Copyable Diagnostic & Config Snippets

```powershell
# Windows 11 (PowerShell): Prüfen, ob 192.168.178.0/24 und fritz.box lokal im LAN bleiben
Get-NetRoute -DestinationPrefix "192.168.178.0/24" | Format-Table ifIndex, DestinationPrefix, NextHop, RouteMetric
Resolve-DnsName fritz.box -Type A
(Invoke-RestMethod -Uri "https://api.ipify.org?format=json").ip

# SHA-256 Integritätsprüfung für YIVPN_1.0.14_x64.msi
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
# Erwartet: 412B78AA4AFFEA582E04DC0CE0CB88BFF765E0496E5BE47E7479EDFCE9BBBDD2
```

```bash
# macOS / Linux: Lokale Route zur FRITZ!Box und aktive Tunnel-IP prüfen
route -n get 192.168.178.1 | grep -E "interface|gateway"
curl -4 -sS https://cloudflare.com/cdn-cgi/trace | grep -E "^(ip|loc|colo)="

# SHA-256 Integritätsprüfung für YIVPN_1.0.14_universal.dmg
shasum -a 256 ~/Downloads/YIVPN_1.0.14_universal.dmg
# Erwartet: 71fdabf0ca5303e1f45a4d8ea7376ebcf65fe308c9ae3cc754f3bda67bcff2fe
```

## Quick FAQ

**Q: Warum sperrt die Sparkasse (pushTAN) oder ING meinen Login, wenn ein normales VPN aktiv ist?**

Deutsche Banken und Steuerportale wie ELSTER prüfen IP-Reputation, ASN-Typ (Rechenzentrum statt Telekom/Vodafone/1&1-Endkundennetz) und plötzliche Länderwechsel. Ein Voll-Tunnel-VPN löst deshalb oft Sicherheitsabfragen, Session-Abbrüche oder blockierte pushTAN-Freigaben aus.

**Q: Weshalb ist fritz.box oder mein Synology NAS im Heimnetz unter einem VPN nicht mehr erreichbar?**

Leitet ein VPN ohne Split-Routing alle Anfragen – inklusive privater IPv4-Bereiche wie 192.168.178.0/24 oder Multicast-DNS (.local) – in den Tunnel, landen Pakete für die FRITZ!Box, den Netzwerkdrucker oder das NAS am falschen Gateway im Rechenzentrum statt im heimischen LAN.

**Q: Muss ich bei YiVPN für das kostenlose Tageskontingent oder den YiPro-Zugang meine E-Mail-Adresse angeben?**

Nein. Die 90 kostenlosen aktiven Minuten pro Tag starten ohne Konto oder Zahlungskarte und pausieren beim Trennen automatisch (täglicher Reset um 17:00 Uhr MEZ / CET, 16:00 UTC). Für YiPro ($2.99/Monat für 3 Geräte) genügt ein anonymer 16-stelliger Aktivierungscode im Format YIVP-XXXX-XXXX-XXXX.

**Q: Welches Protokoll empfiehlt sich bei Telekom-Abenddrosselung oder Vodafone DS-Lite?**

Bei abendlichen Peering-Engpässen im Telekom-Netz liefert Hysteria2 (UDP/QUIC mit disablePathMTUDiscovery) meist den höchsten Durchsatz. In restriktiven Firmen- oder Hotelnetzen mit UDP-Blockade steht VLESS+REALITY über TCP Port 443 als unauffällige Alternative bereit.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Online-Banking (Sparkasse, ING, DKB) & Fritz!Box-Heimnetz trotz VPN direkt nutzen: Smart-Split-Anleitung](https://yivpn.net/de/guides/online-banking-fritzbox-smart-split-vpn/)
- **Deutsch Guides Hub**: [https://yivpn.net/de/guides/](https://yivpn.net/de/guides/) · [RSS Feed](https://yivpn.net/de/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/de/download/?ref=github-guides](https://yivpn.net/de/download/?ref=github-guides)
- **Official Website (Deutsch)**: [https://yivpn.net/de/](https://yivpn.net/de/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
