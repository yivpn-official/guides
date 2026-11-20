# Azərbaycanda VPN açıqkən ABB Mobile, Birbank, m10 və myGov-un birbaşa işləməsi: Smart Split təlimatı

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/az/guides/abb-birbank-mygov-smart-split-vpn/)**.

- **Language**: `az` (Azərbaycan) · **Cluster**: `crossborder` · **Updated**: `2026-11-21`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: ABB Mobile VPN problemi, Birbank Smart Split VPN, myGov ASAN Login birbaşa giriş, Azərbaycanda VPN m10, Aztelekom CityNet Hysteria2, YiVPN Smart Split təlimat

## Key Takeaways (TL;DR)

- Adi tam tunel VPN açıqkən ABB Mobile, Birbank, m10, myGov və ASAN Login xarici IP gördüyü üçün təhlükəsizlik xətası, 3D Secure ləngiməsi və ya sessiya qırılması yaradır.
- YiVPN v1.0.14-dəki Smart Split və Global TUN yerli bankları, dövlət portallarını və .az saytlarını birbaşa Aztelekom, Baktelecom, CityNet, Azercell, Bakcell və Nar IP-si ilə yönləndirir.
- Axşam saatlarında beynəlxalq fiber xətlərdə yaranan paket itkilərini Hysteria2 sabitləşdirir, məhdudiyyətli şəbəkələrdə isə VLESS+REALITY ehtiyat kanal kimi işləyir.
- Hər gün qeydiyyatsız və bank kartı olmadan 90 aktiv dəqiqə pulsuz sınaq (Bakı vaxtı ilə 20:00 AZT yenilənir) sayəsində marşrutu öz provayderinizdə rahat yoxlaya bilərsiniz.

## Overview

Azərbaycanda iş, bulud xidmətləri və ya süni intellekt alətləri üçün VPN açan istifadəçilərin ən çox qarşılaşdığı çətinlik **ABB Mobile**, **Birbank (Kapital Bank)**, **m10**, **myGov** və **ASAN Login** kimi yerli tətbiqlərin donması və ya təhlükəsizlik xətası verməsidir. Səbəb sadədir: adi VPN bütün trafiki xarici ölkəyə yönləndirdiyi üçün yerli bank və dövlət sistemləri həqiqi Bakı IP-nizi itirir. **YiVPN v1.0.14**-ün **Smart Split** və **Global TUN** rejimi yerli `.az` xidmətlərini birbaşa saxlayaraq beynəlxalq trafiki ayrıca şifrələyir.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Adi VPN açıqkən ABB Mobile, Birbank və myGov niyə xəta verir?](https://yivpn.net/az/guides/abb-birbank-mygov-smart-split-vpn/#why-local-apps-fail)
- [2. Tam VPN tuneli və Smart Split müqayisəsi](https://yivpn.net/az/guides/abb-birbank-mygov-smart-split-vpn/#full-vpn-vs-smart-split)
- [3. Windows, macOS və Android-də Smart Split quraşdırılması](https://yivpn.net/az/guides/abb-birbank-mygov-smart-split-vpn/#setup-smart-split)
- [4. Yerli birbaşa marşrut və tunel IP-sinin yoxlanılması](https://yivpn.net/az/guides/abb-birbank-mygov-smart-split-vpn/#verify-routing-terminal)
- [5. Qeydiyyatsız gündəlik 90 dəqiqə pulsuz sınaq və YiPro şərtləri](https://yivpn.net/az/guides/abb-birbank-mygov-smart-split-vpn/#free-daily-quota-az)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Yerli .az portalına cavab müddətini yoxlayın (birbaşa marşrutda adətən 5–25 ms)
Test-NetConnection -ComputerName my.gov.az -Port 443 | Select-Object ComputerName, RemoteAddress, TcpTestSucceeded

# 2. Beynəlxalq çıxış IP ünvanını yoxlayın (şifrələnmiş tunel qovşağının IP-si görünməlidir)
curl.exe -s https://api.ipify.org; echo ""

# 3. Yüklədiyiniz Windows .msi quraşdırıcısının SHA-256 bütövlüyünü təsdiqləyin
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
```

## Quick FAQ

**Q: VPN açıqkən Birbank və ABB Mobile niyə bəzən açılmır və ya SMS kod gecikir?**

Azərbaycan banklarının antifrod sistemləri girişin yerli IP ünvanından gəlməsini gözləyir. Bütün trafik xarici serverdən keçdikdə tətbiq şübhəli geolokasiya xəbərdarlığı verir, 3D Secure təsdiqi ləngiyir və ya sessiya təhlükəsizlik məqsədilə bağlanır.

**Q: Smart Split rejimində myGov, ASAN Login və e-Gov.az birbaşa işləyəcəkmi?**

Bəli. YiVPN-in açıq mənbəli singbox-smart-split qaydaları yerli bank tətbiqlərini, myGov, ASAN Login, e-Gov.az portallarını və yerli .az resurslarını avtomatik olaraq birbaşa yerli provayder marşrutunda saxlayır.

**Q: Aztelekom və ya CityNet xəttində axşamlar beynəlxalq sürət düşəndə hansı protokol daha sabitdir?**

Paket itkisi olan fiber və mobil xətlərdə QUIC/UDP əsaslı Hysteria2 daha yüksək və sabit sürət verir. Ofis Wi-Fi və ya mobil operator UDP trafikini məhdudlaşdırdıqda isə TCP/TLS 1.3 əsaslı VLESS+REALITY protokolu fasiləsiz ehtiyat həll təqdim edir.

**Q: Pulsuz 90 dəqiqəlik limit saat neçədə yenilənir və qeydiyyat tələb olunurmu?**

Xeyr, heç bir e-poçt, telefon nömrəsi və ya bank kartı tələb olunmur. Aktiv 90 dəqiqəlik pulsuz kvota qoşulmanı bağladıqda dayanır və hər gün Bakı vaxtı ilə saat 20:00 AZT-də (16:00 UTC) avtomatik yenilənir.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Azərbaycanda VPN açıqkən ABB Mobile, Birbank, m10 və myGov-un birbaşa işləməsi: Smart Split təlimatı](https://yivpn.net/az/guides/abb-birbank-mygov-smart-split-vpn/)
- **Azərbaycan Guides Hub**: [https://yivpn.net/az/guides/](https://yivpn.net/az/guides/) · [RSS Feed](https://yivpn.net/az/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/az/download/?ref=github-guides](https://yivpn.net/az/download/?ref=github-guides)
- **Official Website (Azərbaycan)**: [https://yivpn.net/az/](https://yivpn.net/az/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
