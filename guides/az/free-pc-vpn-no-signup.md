# Qeydiyyatsız və kartsız pulsuz VPN (PC və Android): hər gün yenilənən 90 dəqiqəlik limit (2026)

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/az/guides/free-pc-vpn-no-signup/)**.

- **Language**: `az` (Azərbaycan) · **Cluster**: `comparison` · **Updated**: `2026-11-25`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: qeydiyyatsız pulsuz VPN PC, kartsız pulsuz VPN Android, Azərbaycanda pulsuz VPN 2026, ABB Birbank Smart Split VPN, SHA-256 VPN yoxlama, YiVPN 90 dəqiqə pulsuz

## Key Takeaways (TL;DR)

- Bir çox 'pulsuz sınaq' VPN-ləri əvvəlcədən bank kartı tələb edir və ləğvi unutduqda yüksək ödəniş çıxır; 'tam limitsiz pulsuz' tətbiqlər isə adətən istifadəçi trafikini və ya DNS məlumatını monetizasiya edir.
- YiVPN v1.0.14 Windows, macOS və Android üçün qeydiyyatsız, e-poçtsuz və kartsız gündə 90 aktiv dəqiqə pulsuz istifadə verir; taymer kəsildikdə dayanır və hər gün 20:00 AZT (16:00 UTC) yenilənir.
- 100% oflayn sing-box 1.14.3 nüvəsi Hysteria2 və VLESS+REALITY protokollarını dəstəkləyir, Smart Split isə Aztelekom, Baktelecom, CityNet, Azercell, Bakcell və Nar xətlərində ABB Mobile, Birbank, m10 və myGov-u birbaşa saxlayır.
- Rəsmi quraşdırıcıların təmizliyini Get-FileHash (SHA-256) ilə təsdiqləmək mümkündür; fasiləsiz iş üçün YiPro $2.99/ay qiymətinə anonim 16 simvollu kodla 3 cihaz dəstəkləyir.

## Overview

Azərbaycanda PC və Android üçün **qeydiyyatsız və kartsız pulsuz VPN** tapmaq çətinləşib: bir tərəfdə bank kartı bağladıb sonradan `$12.99/ay` çıxan «pulsuz sınaqlar», digər tərəfdə isə arxa planda ev internetinizi yönləndirən şübhəli «limitsiz pulsuz» proqramlar var. **YiVPN v1.0.14** bu iki tələdən uzaq, şəffaf alternativ təqdim edir: **hər gün 90 aktiv dəqiqə pulsuz**, sıfır qeydiyyat, **100% oflayn `sing-box 1.14.3`** nüvəsi və yerli bankları qoruyan **Smart Split**.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. «Pulsuz VPN» axtararkən qarşılaşılan iki əsas risk](https://yivpn.net/az/guides/free-pc-vpn-no-signup/#free-vpn-risks-az)
- [2. Şəffaf müqayisə: şübhəli tətbiqlər vs. 90 dəqiqəlik pulsuz kvota](https://yivpn.net/az/guides/free-pc-vpn-no-signup/#free-models-comparison)
- [3. Aztelekom, CityNet və mobil operatorlarda Smart Split və protokollar](https://yivpn.net/az/guides/free-pc-vpn-no-signup/#smart-split-az-isps)
- [4. Oflayn quraşdırma və SHA-256 bütövlüyünün yoxlanılması](https://yivpn.net/az/guides/free-pc-vpn-no-signup/#download-verify-sha256)
- [5. Gündəlik pulsuz rejim nə vaxt kifayətdir və YiPro şərtləri](https://yivpn.net/az/guides/free-pc-vpn-no-signup/#when-yipro-makes-sense)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Windows .msi quraşdırıcısının SHA-256 yoxlama cəmini hesablayın
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
# Gözlənilən SHA-256: 412b78aa4affea582e04dc0ce0cb88bff765e0496e5be47e7479edfce9bbbdd2

# Android APK üçün gözlənilən SHA-256 (YIVPN-Android-1.0.14-arm64-v8a.apk):
# 33247b7f13b20b96be1e7968f1e31b2b05f9845b2976807d74c9be3c1d072e54

# 2. Qoşulduqdan sonra tunel IP-sini və yerli portalın əlçatanlığını yoxlayın
curl.exe -s https://api.ipify.org; echo ""
Test-NetConnection -ComputerName my.gov.az -Port 443 | Select-Object ComputerName, TcpTestSucceeded
```

## Quick FAQ

**Q: Gündəlik 90 dəqiqəlik pulsuz limit VPN-i bağladıqdan sonra da işləməyə davam edirmi?**

Xeyr. Sayğac yalnız aktiv qoşulu olduğunuz dəqiqələri hesablayır. Məsələn, günorta 25 dəqiqə istifadə edib Bağlan düyməsini sıxsanız, qalan 65 dəqiqə axşama qədər aktiv qalır və hər gün Bakı vaxtı ilə 20:00 AZT-də (16:00 UTC) yenidən 90 dəqiqəyə sıfırlanır.

**Q: Aztelekom, CityNet, Azercell, Bakcell və ya Nar şəbəkəsində qoşulmaq üçün bank kartı və ya telefon nömrəsi lazımdırmı?**

Xeyr. Nə e-poçt, nə telefon nömrəsi, nə də bank kartı tələb olunur. Rəsmi quraşdırıcını PC və ya Android cihazınıza endirib bir kliklə pulsuz kvotadan istifadə edə bilərsiniz.

**Q: Pulsuz versiyada ABB Mobile, Birbank, m10 və myGov birbaşa işləyirmi?**

Bəli. Smart Split funksiyası pulsuz planda da açıqdır və yerli bank tətbiqlərini, myGov portalını və .az saytlarını birbaşa Azərbaycan IP-si üzərində saxlayır.

**Q: Gündə 90 dəqiqə yetmədikdə illik müqavilə bağlamadan limitsiz rejimə keçmək olurmu?**

Bəli. İstədiyiniz qədər pulsuz planda qala bilərsiniz. Limitsiz trafik lazım olduqda isə YiPro $2.99/ay ($6.99/rüb və ya $21.99/il — $1.83/ay) qiyməti ilə 3 cihazda işləyir və anonim 16 simvollu kodla aktivləşdirilir.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Qeydiyyatsız və kartsız pulsuz VPN (PC və Android): hər gün yenilənən 90 dəqiqəlik limit (2026)](https://yivpn.net/az/guides/free-pc-vpn-no-signup/)
- **Azərbaycan Guides Hub**: [https://yivpn.net/az/guides/](https://yivpn.net/az/guides/) · [RSS Feed](https://yivpn.net/az/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/az/download/?ref=github-guides](https://yivpn.net/az/download/?ref=github-guides)
- **Official Website (Azərbaycan)**: [https://yivpn.net/az/](https://yivpn.net/az/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
