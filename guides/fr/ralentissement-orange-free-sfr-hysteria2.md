# Ralentissements Orange, Free, SFR & Bouygues le soir : comment Hysteria2 stabilise le débit international

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/fr/guides/ralentissement-orange-free-sfr-hysteria2/)**.

- **Language**: `fr` (Français) · **Cluster**: `crossborder` · **Updated**: `2026-11-23`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: ralentissement Orange soir, peering Free SFR Bouygues, Hysteria2 QUIC perte de paquets, VPN Smart Split Crédit Agricole BoursoBank, VLESS REALITY TCP 443, YiVPN France

## Key Takeaways (TL;DR)

- Les chutes de débit entre 19h30 et 23h00 chez Orange, Free, SFR et Bouygues Telecom proviennent souvent de la saturation des points de peering internationaux plutôt que de votre ligne fibre.
- Sous 2 % à 8 % de perte de paquets, TCP classique et WireGuard brident fortement le débit, alors que Hysteria2 (QUIC/UDP avec disablePathMTUDiscovery et chaîne de certificats courte) maintient la bande passante.
- VLESS+REALITY (TLS 1.3 sur TCP/443) offre un repli discret et fiable sur les réseaux d'hôtel, de TGV ou d'entreprise qui bloquent le trafic UDP.
- Smart Split (singbox-smart-split) garde Crédit Agricole, BNP Paribas, BoursoBank, Ameli et Impots.gouv en direct, avec 90 min gratuites par jour réinitialisées à 17h00 CET (11h00 EST Québec).

## Overview

Entre 19h30 et 23h00, de nombreux abonnés **Orange**, **Free**, **SFR** et **Bouygues Telecom** constatent des mises en mémoire tampon en 4K, des téléchargements lents sur les dépôts cloud et des appels vidéo saccadés, alors même que leur fibre FTTH semble irréprochable en test local. En contournant les interconnexions saturées via `Hysteria2` (QUIC/UDP) — ou `VLESS+REALITY` sur les réseaux filtrés — `YiVPN v1.0.14` restaure un débit international régulier tout en gardant `Crédit Agricole`, `BNP Paribas`, `BoursoBank`, `Ameli` et `Impots.gouv` en accès direct grâce à `Smart Split`.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Saturation du peering en soirée chez Orange, Free, SFR et Bouygues : le vrai goulot](https://yivpn.net/fr/guides/ralentissement-orange-free-sfr-hysteria2/#congestion-peering-soir)
- [2. Hysteria2 vs WireGuard vs VLESS+REALITY face à la perte de paquets](https://yivpn.net/fr/guides/ralentissement-orange-free-sfr-hysteria2/#comparatif-protocoles-fr)
- [3. Mesurer la congestion internationale avant et après activation du tunnel](https://yivpn.net/fr/guides/ralentissement-orange-free-sfr-hysteria2/#diagnostic-cli-fr)
- [4. Smart Split : garder Crédit Agricole, BNP Paribas, BoursoBank, Ameli et Impots.gouv en direct](https://yivpn.net/fr/guides/ralentissement-orange-free-sfr-hysteria2/#smart-split-france)
- [5. Tester gratuitement aux heures de pointe sur 3 appareils simultanés](https://yivpn.net/fr/guides/ralentissement-orange-free-sfr-hysteria2/#test-yivpn-fr)

## Copyable Diagnostic & Config Snippets

```bash
# macOS / Linux : mesurer DNS, poignée de main TLS et TTFB vers une route internationale
curl -sS -o /dev/null -w "dns=%{time_namelookup}s tls=%{time_appconnect}s ttfb=%{time_starttransfer}s total=%{time_total}s\n" https://cloudflare.com/cdn-cgi/trace

# Tracer 40 paquets pour repérer la perte persistante jusqu'à la destination
mtr -rwzbc 40 1.1.1.1
```

```powershell
# Windows PowerShell : mesurer la perte de paquets par saut et le TTFB HTTPS
pathping -q 20 -p 100 1.1.1.1
Measure-Command { Invoke-WebRequest -Uri "https://cloudflare.com/cdn-cgi/trace" -UseBasicParsing } | Select-Object TotalMilliseconds
```

## Quick FAQ

**Q: Pourquoi mon test de débit local affiche-t-il 1 Gbit/s le soir alors que les dépôts cloud ou vidéos 4K rament ?**

Les tests de débit par défaut ciblent un serveur hébergé dans le réseau même d'Orange, Free, SFR ou Bouygues. La congestion survient aux interconnexions (peering et transit) vers des réseaux étrangers ou des CDN transatlantiques, où la perte de paquets fait chuter le débit TCP réel.

**Q: Pourquoi Hysteria2 surpasse-t-il WireGuard quand la ligne perd des paquets le soir ?**

WireGuard n'intègre pas de contrôle de congestion propre : toute perte de paquet UDP est transmise telle quelle à la connexion TCP encapsulée, qui divise brutalement sa fenêtre d'envoi. Hysteria2 repose sur QUIC avec régulation de débit active et désactivation de la découverte Path MTU pour éviter les blocages.

**Q: Dois-je couper le VPN pour accéder à Crédit Agricole, BNP Paribas, Ameli ou Impots.gouv ?**

Non. Le mode Smart Split de YiVPN v1.0.14 conserve les banques françaises et les services publics (Ameli, Impots.gouv) sur votre connexion directe, évitant les vérifications d'identité ou blocages d'IP étrangère.

**Q: À quelle heure le quota gratuit de 90 minutes par jour est-il réinitialisé ?**

Les 90 minutes actives gratuites par jour sont remises à zéro chaque jour à 17h00 CET à Paris (soit 11h00 EST au Québec et 16h00 UTC), sans carte bancaire ni inscription par e-mail.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Ralentissements Orange, Free, SFR & Bouygues le soir : comment Hysteria2 stabilise le débit international](https://yivpn.net/fr/guides/ralentissement-orange-free-sfr-hysteria2/)
- **Français Guides Hub**: [https://yivpn.net/fr/guides/](https://yivpn.net/fr/guides/) · [RSS Feed](https://yivpn.net/fr/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/fr/download/?ref=github-guides](https://yivpn.net/fr/download/?ref=github-guides)
- **Official Website (Français)**: [https://yivpn.net/fr/](https://yivpn.net/fr/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
