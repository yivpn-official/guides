# Telekom & Vodafone Peering-Probleme am Abend lösen: Warum Hysteria2 bei Paketverlust schneller als WireGuard ist

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/de/guides/telekom-vodafone-peering-paketverlust-hysteria2/)**.

- **Language**: `de` (Deutsch) · **Cluster**: `crossborder` · **Updated**: `2026-11-21`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: Telekom Peering Probleme, Vodafone Paketverlust Abend, Hysteria2 vs WireGuard, VPN Smart Split FritzBox Sparkasse, QUIC VPN Paketverlust, YiVPN Deutschland DSGVO

## Key Takeaways (TL;DR)

- Abendliche Einbrüche bei Telekom (AS3320) und Vodafone Kabel entstehen meist durch überlastete Peering-Übergänge oder DOCSIS-Rückweg-Jitter, nicht durch fehlende Anschlussbandbreite.
- Bei 2 % bis 10 % Paketverlust bricht klassisches TCP (und TCP in WireGuard) drastisch ein, während Hysteria2 über QUIC mit deaktivierter Path-MTU-Discovery die Rate stabil hält.
- Smart Split auf Basis von singbox-smart-split hält fritz.box (192.168.178.0/24), NAS, Sparkasse, ING und DKB direkt, während überlastete Auslandsrouten durch den Tunnel laufen.
- YiVPN v1.0.14 lässt sich DSGVO-sparsam ohne E-Mail-Konto mit 90 kostenlosen Minuten pro Tag (Reset täglich 17:00 MEZ / CET) direkt zur Primetime testen.

## Overview

Zwischen 19:00 und 23:00 Uhr klagen viele Anschlüsse der Deutschen Telekom und von Vodafone Kabel über hohe Latenzspitzen, stockende Cloud-APIs und zähen Seitenaufbau, obwohl der lokale Speedtest volle Bandbreite meldet. Ein sauber geroutetes VPN mit `Hysteria2` (QUIC) oder `VLESS+REALITY` umgeht überlastete Peering-Übergänge und stabilisiert verlustbehaftete Strecken — während `Smart Split` die `Fritz!Box`, `Sparkasse`, `ING` und `DKB` direkt im Heimnetz belässt.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Warum abends bei Telekom und Vodafone plötzlich Pakete verloren gehen](https://yivpn.net/de/guides/telekom-vodafone-peering-paketverlust-hysteria2/#abend-peering-ursachen)
- [2. Protokoll-Vergleich bei 2 % bis 10 % Paketverlust: Hysteria2, VLESS+REALITY und WireGuard](https://yivpn.net/de/guides/telekom-vodafone-peering-paketverlust-hysteria2/#protokoll-vergleich)
- [3. Abendlichen Paketverlust selbst messen: MTR, PathPing und TTFB-Diagnose](https://yivpn.net/de/guides/telekom-vodafone-peering-paketverlust-hysteria2/#paketverlust-messen)
- [4. Smart Split im deutschen Heimnetz: Fritz!Box, Sparkasse, ING und DKB direkt halten](https://yivpn.net/de/guides/telekom-vodafone-peering-paketverlust-hysteria2/#smart-split-heimnetz)
- [5. Datensparsam testen nach DSGVO-Prinzip: Einrichtung ohne E-Mail-Konto](https://yivpn.net/de/guides/telekom-vodafone-peering-paketverlust-hysteria2/#dsgvo-praxistest)

## Copyable Diagnostic & Config Snippets

```bash
# Linux / macOS: 50 Pakete pro Hop inkl. ASN-Anzeige (direkt vs. mit aktivem Tunnel)
mtr -rwzbc 50 1.1.1.1

# Time-to-First-Byte (TTFB) und TLS-Handshake zu einem internationalen Ziel messen
curl -sS -o /dev/null -w "dns=%{time_namelookup}s tls=%{time_appconnect}s ttfb=%{time_starttransfer}s total=%{time_total}s\n" https://cloudflare.com/cdn-cgi/trace

# Windows PowerShell: Verlust pro Hop und Ziel-Latenz pruefen
pathping -q 25 -p 100 1.1.1.1
```

## Quick FAQ

**Q: Warum zeigt der Speedtest abends volle Bandbreite, während internationale Dienste stocken?**

Standard-Speedtests messen häufig gegen Server direkt im eigenen Providernetz. Die eigentlichen Engpässe liegen jedoch an voll ausgelasteten Peering-Übergängen zu fremden autonomen Systemen (z. B. Cloudflare oder US-Transit), weshalb erst Routen außerhalb des Providernetzes hohen Paketverlust zeigen.

**Q: Warum ist WireGuard bei abendlichem Paketverlust oft langsamer als Hysteria2?**

WireGuard verzichtet bewusst auf eine eigene Staukontrolle und reicht verlorene Pakete direkt an die getunnelte TCP-Verbindung weiter. Schon wenige Prozent Verlust lassen den TCP-Stau-Algorithmus das Sendefenster halbieren. Hysteria2 nutzt dagegen QUIC mit aktiver Pacing-Steuerung und kompensiert Paketverluste deutlich robuster.

**Q: Funktioniert Online-Banking bei Sparkasse, ING oder DKB trotz aktivem VPN?**

Ja, im Modus Smart Split werden deutsche Bank-Domains sowie das lokale Fritz!Box-Heimnetz direkt über den eigenen Internetanschluss geroutet. Dadurch bleiben pushTAN, photoTAN und lokale NAS-Freigaben ohne Sicherheitswarnungen erreichbar.

**Q: Wann wird das kostenlose Tageskontingent von YiVPN in Deutschland zurückgesetzt?**

Die 90 kostenlosen aktiven Minuten pro Tag setzen sich täglich um 17:00 MEZ (CET, entspricht 00:00 UTC+8 bzw. 16:00 UTC) automatisch zurück — ohne Registrierung, ohne E-Mail und ohne Zahlungsdaten.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Telekom & Vodafone Peering-Probleme am Abend lösen: Warum Hysteria2 bei Paketverlust schneller als WireGuard ist](https://yivpn.net/de/guides/telekom-vodafone-peering-paketverlust-hysteria2/)
- **Deutsch Guides Hub**: [https://yivpn.net/de/guides/](https://yivpn.net/de/guides/) · [RSS Feed](https://yivpn.net/de/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/de/download/?ref=github-guides](https://yivpn.net/de/download/?ref=github-guides)
- **Official Website (Deutsch)**: [https://yivpn.net/de/](https://yivpn.net/de/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
