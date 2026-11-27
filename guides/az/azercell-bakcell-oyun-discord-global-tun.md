# Azercell, Bakcell və Nar 4G/5G şəbəkələrində aşağı ping və oyun/Discord səs sabitliyi: Global TUN bələdçisi

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/az/guides/azercell-bakcell-oyun-discord-global-tun/)**.

- **Language**: `az` (Azərbaycan) · **Cluster**: `crossborder` · **Updated**: `2026-11-27`
- **Tested Environment**: Android 15 / Windows 11 / macOS 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: Azercell Bakcell Nar aşağı ping, Discord səs kəsilməsi RTC Connecting, Global TUN sing-box oyun VPN, Hysteria2 mobil 4G 5G, Smart Split ABB Mobile Birbank, YiVPN Azərbaycan

## Key Takeaways (TL;DR)

- Azercell, Bakcell və Nar 4G/5G şəbəkələrində istifadə edilən CGNAT (Carrier-Grade NAT) və UDP marşrutlaşdırması pik saatlarda Discord səs paketlərində jitter və oyunlarda ani ping sıçrayışı yaradır.
- Brauzer əlavələri və ya adi HTTP/SOCKS5 sistem proksiləri UDP əsaslı Discord WebRTC səs kanallarını və oyun soketlərini əhatə etmədiyi üçün 'RTC Connecting' və ya 'No Route' xətaları qalır.
- YiVPN v1.0.14 daxilindəki 100% oflayn sing-box 1.14.3 nüvəsi, Layer-3 Global TUN (Wintun / utun / VpnService) və Hysteria2 vasitəsilə bütün TCP və UDP paketlərini stabil marşrutlaşdırır.
- Smart Split qaydaları ABB Mobile, Birbank, m10 və myGov tətbiqlərini birbaşa yerli IP-də saxlayır; gündə 90 aktiv dəqiqə pulsuz sınaq hər gün saat 20:00 AZT-də (16:00 UTC) yenilənir.

## Overview

Azərbaycanda **Azercell**, **Bakcell** və **Nar** 4G/5G mobil interneti ilə (yaxud telefon hotspotu üzərindən **Aztelekom** / **CityNet** xəttinə ehtiyat kimi qoşulduqda) onlayn oyun oynayan və **Discord** səsli otaqlarında danışan istifadəçilər oxşar problemlə üzləşirlər: veb-səhifələr sürətlə açılır, lakin Discord səs bağlantısı `RTC Connecting` mərhələsində ilişir və ya oyun daxilində ping hər bir neçə saniyədən bir 75 ms-dən 220 ms-ə sıçrayır. Səbəb sürət çatışmazlığı deyil, mobil CGNAT mühitində **UDP paketlərinin marşrutlaşdırılmasıdır**. Aşağıda **Layer-3 Global TUN**, **Hysteria2** və **Smart Split** mexanizmlərinin bu problemi necə aradan qaldırdığını texniki detallarla izah edirik.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Mobil CGNAT, jitter və sistem proksilərinin Discord/oyun xətaları](https://yivpn.net/az/guides/azercell-bakcell-oyun-discord-global-tun/#mobile-cgnat-and-proxy-limits)
- [2. Global TUN, Hysteria2 və VLESS+REALITY müqayisəsi](https://yivpn.net/az/guides/azercell-bakcell-oyun-discord-global-tun/#global-tun-protocol-comparison)
- [3. Mobil və masaüstü şəbəkədə ping və paket itkisini yoxlamaq](https://yivpn.net/az/guides/azercell-bakcell-oyun-discord-global-tun/#mobile-ping-diagnostics)
- [4. Smart Split ilə yerli bankları qorumaq və 90 dəqiqə pulsuz sınaq](https://yivpn.net/az/guides/azercell-bakcell-oyun-discord-global-tun/#smart-split-and-free-quota)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Beynəlxalq DNS və səs serveri istiqamətində ping sabitliyini (jitter) yoxlayın
ping.exe -n 15 1.1.1.1

# 2. Mobil 4G/5G və ya hotspot üçün MTU həddini yoxlayın (1392 = 1420 MTU üçün təhlükəsiz test)
ping.exe -n 4 -f -l 1392 1.1.1.1

# 3. YiVPN Windows quraşdırıcısının rəsmi SHA-256 dəyərini təsdiqləyin
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
# Gözlənilən dəyər: 412b78aa4affea582e04dc0ce0cb88bff765e0496e5be47e7479edfce9bbbdd2
```

## Quick FAQ

**Q: Niyə VPN və ya proksi açıq olanda saytlar işləyir, amma Discord səsli çatında 'RTC Connecting' ilişir?**

Saytlar və Discord-un mətn interfeysi TCP üzərindən işləyir və sistem HTTP/SOCKS5 proksisini görə bilir. Səsli çat və əksər onlayn oyunlar isə UDP soketləri açır; Layer-3 Global TUN olmadan bu paketlər tuneldən kənarda qalır və mobil CGNAT marşrutu ilə toqquşur.

**Q: Azercell, Bakcell və ya Nar 4G/5G üzərindən kompüterə hotspot paylaşanda ping niyə oynayır?**

Mobil operatorlar kütləvi CGNAT arxasında UDP port xəritələməsini tez-tez yeniləyir və bazavı stansiyadakı yükə görə MTU/bufer gecikməsi (bufferbloat) artır. Global TUN + Hysteria2 (disablePathMTUDiscovery ilə) UDP trafikini sabit bir şifrəli axında birləşdirərək port dəyişməsinin qarşısını alır.

**Q: Mobil şəbəkə UDP axınını məhdudlaşdırarsa, oyun və Discord üçün nə etmək lazımdır?**

YiVPN tətbiqində ehtiyat VLESS+REALITY (TCP/443 üzərindən TLS 1.3) kanalına keçə bilərsiniz. Global TUN yenə də bütün UDP oyun və səs paketlərini daxildə kapsullaşdırıb TCP/443 üzərindən stabil şəkildə ötürür.

**Q: Oyun zamanı ABB Mobile, Birbank, m10 və myGov normal açılacaqmı və qiymətlər necədir?**

Bəli. Smart Split yerli bank və dövlət xidmətlərini birbaşa Azərbaycan IP-si ilə saxlayır. Gündəlik 90 aktiv dəqiqə qeydiyyatsız və kartsız pulsuzdur (20:00 AZT-də yenilənir). Limitsiz YiPro paketi eyni anda 3 cihaz üçün ayda $2.99, rüblük $6.99 və ya illik $21.99 ($1.83/ay) təşkil edir; əlavə olaraq ayda $4.29-dan fərdi statik rezident IP mövcuddur.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Azercell, Bakcell və Nar 4G/5G şəbəkələrində aşağı ping və oyun/Discord səs sabitliyi: Global TUN bələdçisi](https://yivpn.net/az/guides/azercell-bakcell-oyun-discord-global-tun/)
- **Azərbaycan Guides Hub**: [https://yivpn.net/az/guides/](https://yivpn.net/az/guides/) · [RSS Feed](https://yivpn.net/az/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/az/download/?ref=github-guides](https://yivpn.net/az/download/?ref=github-guides)
- **Official Website (Azərbaycan)**: [https://yivpn.net/az/](https://yivpn.net/az/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
