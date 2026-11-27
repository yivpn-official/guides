# Banques françaises (Crédit Agricole, BNP, BoursoBank) & Impots.gouv : garder l’accès direct via Smart Split

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/fr/guides/banques-francaises-impots-smart-split-vpn/)**.

- **Language**: `fr` (Français) · **Cluster**: `crossborder` · **Updated**: `2026-11-27`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: VPN banque française Smart Split, Crédit Agricole BNP BoursoBank VPN, Impots.gouv FranceConnect Ameli VPN, Livebox Freebox 192.168.1.0/24 VPN, Orange Free SFR Bouygues YiVPN, sing-box 1.14.3 Hysteria2

## Key Takeaways (TL;DR)

- Les VPN plein tunnel déclenchent fréquemment des blocages 3D Secure ou anti-fraude sur Crédit Agricole, BNP Paribas, BoursoBank, Société Générale, Ameli, Impots.gouv.fr et FranceConnect.
- YiVPN v1.0.14 associe le mode Layer-3 Global TUN au moteur singbox-smart-split (sing-box 1.14.3) pour router directement les domaines bancaires et administratifs .fr ainsi que le réseau local 192.168.1.0/24 (Livebox / Freebox).
- Le trafic international et les connexions sensibles restent chiffrés via Hysteria2 (UDP/QUIC) ou VLESS+REALITY (TCP/443), adaptés aux réseaux Orange, Free, SFR et Bouygues Telecom.
- Test gratuit de 90 minutes actives par jour sans inscription (réinitialisation à 17:00 CET / 16:00 UTC) ; YiPro à $2.99/mois couvre 3 appareils simultanés avec un code anonyme YIVP-XXXX-XXXX-XXXX.

## Overview

En France, activer un VPN traditionnel en mode « tout le trafic » provoque presque systématiquement les mêmes frictions : validation **3D Secure** refusée chez **Crédit Agricole**, **BNP Paribas**, **BoursoBank** ou **Société Générale**, erreur de session sur **Impots.gouv.fr**, **Ameli** ou **FranceConnect**, et coupure d’accès à l’interface d’administration de votre **Livebox** ou **Freebox** (`192.168.1.0/24`). Avec `YiVPN v1.0.14`, le mode **Global TUN** de niveau 3 s’appuie sur `sing-box 1.14.3` et les règles [singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split) pour conserver vos flux bancaires, fiscaux et domestiques en direct sur votre ligne **Orange**, **Free**, **SFR** ou **Bouygues Telecom**, tout en chiffrant le reste de votre navigation via `Hysteria2` ou `VLESS+REALITY`.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Pourquoi les VPN plein tunnel bloquent les banques françaises et FranceConnect](https://yivpn.net/fr/guides/banques-francaises-impots-smart-split-vpn/#blocages-plein-tunnel)
- [2. Comment YiVPN v1.0.14 orchestre Global TUN et singbox-smart-split](https://yivpn.net/fr/guides/banques-francaises-impots-smart-split-vpn/#architecture-smart-split)
- [3. Hysteria2 et VLESS+REALITY sur Orange, Free, SFR et Bouygues Telecom](https://yivpn.net/fr/guides/banques-francaises-impots-smart-split-vpn/#protocoles-operateurs-france)
- [4. Prise en main sans compte : 90 minutes par jour ou YiPro pour 3 appareils](https://yivpn.net/fr/guides/banques-francaises-impots-smart-split-vpn/#essai-et-tarifs)

## Copyable Diagnostic & Config Snippets

```json
{
  "route": {
    "rules": [
      { "ip_is_private": true, "outbound": "direct" },
      { "domain_suffix": [".gouv.fr", "ameli.fr", "credit-agricole.fr", "bnpparibas", "boursobank.com", "societegenerale.fr"], "outbound": "direct" }
    ],
    "final": "proxy"
  }
}
```

## Quick FAQ

**Q: Pourquoi ma banque française bloque-t-elle mes paiements 3D Secure quand j’active un VPN classique ?**

Les établissements comme Crédit Agricole, BNP Paribas, BoursoBank ou Société Générale comparent votre adresse IP à celle de votre opérateur habituel (Orange, Free, SFR ou Bouygues Telecom). Une IP de centre de données étranger déclenche immédiatement une alerte anti-fraude ou un refus de validation 3D Secure.

**Q: Smart Split fonctionne-t-il aussi avec FranceConnect, Impots.gouv.fr et Ameli ?**

Oui. Le jeu de règles singbox-smart-split intégré à sing-box 1.14.3 dirige les services publics français (.gouv.fr, Ameli, FranceConnect) en direct sur votre ligne résidentielle tout en maintenant le chiffrement pour le reste du trafic.

**Q: Pourquoi ma Livebox ou ma Freebox (192.168.1.0/24) devient-elle inaccessible avec certains VPN ?**

Un tunnel sans exclusion LAN envoie les requêtes destinées aux plages privées 192.168.1.0/24 ou 192.168.0.0/24 vers la passerelle distante au lieu de votre box locale. Smart Split conserve ces sous-réseaux en accès direct.

**Q: Faut-il créer un compte avec e-mail pour utiliser YiVPN sur mes appareils ?**

Non. Vous bénéficiez de 90 minutes actives par jour sans inscription (remise à zéro à 17:00 CET, soit 16:00 UTC). Pour YiPro ($2.99/mois sur 3 appareils simultanés), un code d’activation anonyme à 16 caractères (YIVP-XXXX-XXXX-XXXX) suffit.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Banques françaises (Crédit Agricole, BNP, BoursoBank) & Impots.gouv : garder l’accès direct via Smart Split](https://yivpn.net/fr/guides/banques-francaises-impots-smart-split-vpn/)
- **Français Guides Hub**: [https://yivpn.net/fr/guides/](https://yivpn.net/fr/guides/) · [RSS Feed](https://yivpn.net/fr/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/fr/download/?ref=github-guides](https://yivpn.net/fr/download/?ref=github-guides)
- **Official Website (Français)**: [https://yivpn.net/fr/](https://yivpn.net/fr/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
