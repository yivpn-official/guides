# VPN gratuit sur PC et Mac sans inscription : 90 minutes par jour sans carte bancaire (Test 2026)

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/fr/guides/free-pc-vpn-no-signup/)**.

- **Language**: `fr` (Français) · **Cluster**: `comparison` · **Updated**: `2026-11-25`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: VPN gratuit PC sans inscription, VPN Mac sans carte bancaire, VPN gratuit sans email, YiVPN 90 minutes par jour, Smart Split Crédit Agricole Ameli, sing-box 1.14.3 Orange Free SFR Bouygues

## Key Takeaways (TL;DR)

- Les « essais gratuits » à carte bancaire et certaines extensions gratuites exposent soit à un renouvellement tacite coûteux, soit à la revente de bande passante résidentielle.
- YiVPN v1.0.14 offre 90 minutes actives par jour sur Windows, macOS et Android sans email ni carte bancaire ; le minuteur se met en pause dès la déconnexion et se réinitialise à 17h00 CET (Paris) / 11h00 EST (Montréal), soit 16:00 UTC.
- Sur Orange, Free, SFR et Bouygues, le mode Smart Split (sing-box 1.14.3) conserve Crédit Agricole, BNP Paribas, BoursoBank, Ameli et Impots.gouv.fr sur votre IP française.
- Les installateurs embarquent sing-box 1.14.3 hors ligne avec empreintes SHA-256 publiques ; le passage optionnel à YiPro ($2.99/mois pour 3 appareils) fonctionne via un code anonyme à 16 caractères.

## Overview

Chercher un VPN gratuit sur PC ou Mac sans laisser son adresse email ni sa carte bancaire tourne souvent au parcours d'obstacles entre « essais gratuits » à reconduction tacite et extensions navigateur opaques. `YiVPN v1.0.14` adopte un modèle vérifiable : **90 minutes actives par jour** sur Windows 11, macOS 15 et Android 15 sans inscription ni carte, avec mise en pause immédiate à la déconnexion, réinitialisation quotidienne à **17h00 CET** à Paris (**11h00 EST** à Montréal, `16:00 UTC`), noyau `sing-box 1.14.3` embarqué hors ligne et mode `Smart Split` compatible avec les banques et services publics français.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Pièges des essais gratuits à carte bancaire et extensions qui revendent votre bande passante](https://yivpn.net/fr/guides/free-pc-vpn-no-signup/#pieges-vpn-gratuits)
- [2. Comment fonctionnent les 90 minutes actives par jour de YiVPN (Paris 17h00 CET / Montréal 11h00 EST)](https://yivpn.net/fr/guides/free-pc-vpn-no-signup/#quota-90-minutes)
- [3. Orange, Free, SFR, Bouygues : Smart Split pour vos banques françaises et services publics](https://yivpn.net/fr/guides/free-pc-vpn-no-signup/#smart-split-france)
- [4. Noyau hors ligne sing-box 1.14.3, vérification SHA-256 et passage optionnel à YiPro](https://yivpn.net/fr/guides/free-pc-vpn-no-signup/#verification-sha256-yipro)

## Copyable Diagnostic & Config Snippets

```powershell
# Windows 11 (PowerShell) : Vérifier l'empreinte SHA-256 de l'installateur et l'IP de sortie
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
# Attendu : 412B78AA4AFFEA582E04DC0CE0CB88BFF765E0496E5BE47E7479EDFCE9BBBDD2

# Option version portable sans installation système :
Get-FileHash .\YIVPN_1.0.14_x64_portable.zip -Algorithm SHA256
# Attendu : B636065D4E3D4B054F240573449A0899C3C44AB41446E1094C53832281780491

(Invoke-RestMethod -Uri "https://api.ipify.org?format=json").ip
```

```bash
# macOS : Contrôler l'empreinte SHA-256 du paquet universel avant ouverture
shasum -a 256 ~/Downloads/YIVPN_1.0.14_universal.dmg
# Attendu : 71fdabf0ca5303e1f45a4d8ea7376ebcf65fe308c9ae3cc754f3bda67bcff2fe

# Contrôler l'IP publique et le point de sortie une fois le tunnel actif
curl -4 -sS https://cloudflare.com/cdn-cgi/trace | grep -E "^(ip|loc|colo)="
```

## Quick FAQ

**Q: Le compteur des 90 minutes gratuites continue-t-il de tourner quand je ferme mon PC ou que je me déconnecte ?**

Non. Le quota de 90 minutes par jour ne décompte que le temps de connexion active. Dès que vous cliquez sur déconnecter ou que le tunnel se coupe, le minuteur se fige automatiquement jusqu'à la prochaine session.

**Q: À quelle heure précise le quota gratuit se réinitialise-t-il en France et au Québec ?**

La remise à zéro quotidienne s'effectue à 16:00 UTC, ce qui correspond exactement à 17h00 CET (heure d'hiver à Paris, Bruxelles et Genève) et à 11h00 EST (Montréal / Québec).

**Q: Pourquoi mes applis bancaires (Crédit Agricole, BNP, BoursoBank) ou Ameli bloquent-elles avec un VPN classique ?**

Ces portails vérifient que l'adresse IP appartient bien à un fournisseur grand public français (Orange, Free, SFR, Bouygues) et rejettent souvent les IP de centres de données étrangers. Le mode Smart Split de YiVPN garde automatiquement ces domaines en accès direct.

**Q: Comment passer à YiPro sans donner d'adresse email ni créer de compte nominatif ?**

Vous pouvez activer YiPro ($2.99/mois pour 3 appareils simultanés) à l'aide d'un code d'activation anonyme à 16 caractères (format YIVP-XXXX-XXXX-XXXX), sans email ni numéro de téléphone obligatoire.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [VPN gratuit sur PC et Mac sans inscription : 90 minutes par jour sans carte bancaire (Test 2026)](https://yivpn.net/fr/guides/free-pc-vpn-no-signup/)
- **Français Guides Hub**: [https://yivpn.net/fr/guides/](https://yivpn.net/fr/guides/) · [RSS Feed](https://yivpn.net/fr/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/fr/download/?ref=github-guides](https://yivpn.net/fr/download/?ref=github-guides)
- **Official Website (Français)**: [https://yivpn.net/fr/](https://yivpn.net/fr/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
