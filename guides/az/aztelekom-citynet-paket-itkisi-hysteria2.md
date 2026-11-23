# Aztelekom, Baktelecom və CityNet fiber şəbəkələrində axşam sürət düşməsi: Hysteria2 ilə stabil bağlantı

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/az/guides/aztelekom-citynet-paket-itkisi-hysteria2/)**.

- **Language**: `az` (Azərbaycan) · **Cluster**: `crossborder` · **Updated**: `2026-11-23`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: Aztelekom axşam sürət düşməsi, CityNet Baktelecom paket itkisi, Hysteria2 QUIC disablePathMTUDiscovery, VLESS REALITY Azərbaycan VPN, Smart Split ABB Mobile Birbank, YiVPN fiber təlimat

## Key Takeaways (TL;DR)

- Aztelekom, Baktelecom və CityNet GPON fiber xətlərində axşam saatlarında (20:00–00:00) beynəlxalq kanallarda 2–6% paket itkisi yarandıqda klassik TCP tunelləri sürəti kəskin aşağı salır.
- QUIC/UDP əsaslı Hysteria2 protokolu adaptiv tıxac nəzarəti, disablePathMTUDiscovery və RFC 9000 3x limitinə sığan qısa sertifikat zənciri sayəsində axşam itkilərində yüksək sabitlik verir.
- İş yerindəki Wi-Fi və ya Azercell, Bakcell, Nar mobil şəbəkələri UDP trafikini məhdudlaşdırdıqda TCP/443 üzərindən işləyən VLESS+REALITY (TLS 1.3) fasiləsiz ehtiyat kanal təmin edir.
- YiVPN v1.0.14 daxilindəki 100% oflayn sing-box 1.14.3 nüvəsi və Smart Split qaydaları ABB Mobile, Birbank, m10 və myGov tətbiqlərini birbaşa yerli marşrutda saxlayır.

## Overview

Azərbaycanda **Aztelekom**, **Baktelecom** və **CityNet** GPON fiber xətlərində, eləcə də **Azercell**, **Bakcell** və **Nar** mobil şəbəkələrində tez-tez rast gəlinən haldır: yerli sürət testi 100 Mbit/s göstərir, lakin axşam saat 20:00-dan sonra beynəlxalq bulud xidmətləri, GitHub, AI platformaları və yüksək keyfiyyətli video axınları ləngiyir. Bunun əsas səbəbi yerli xəttin zəifliyi deyil, beynəlxalq çıxış kanallarında yaranan axşam sıxlığı və paket itkisidir. Bu texniki bələdçidə **Hysteria2** protokolunun **VLESS+REALITY** ehtiyatı və **Smart Split** ilə birlikdə bağlantını necə sabitləşdirdiyini izah edirik.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Axşam saatlarında GPON fiber xətlərində sürət niyə düşür?](https://yivpn.net/az/guides/aztelekom-citynet-paket-itkisi-hysteria2/#evening-fiber-bottleneck)
- [2. Hysteria2, VLESS+REALITY və standart protokolların müqayisəsi](https://yivpn.net/az/guides/aztelekom-citynet-paket-itkisi-hysteria2/#protocol-comparison-az)
- [3. Terminaldan xəttin itkisini və MTU həddini yoxlamaq](https://yivpn.net/az/guides/aztelekom-citynet-paket-itkisi-hysteria2/#cli-diagnostics-az)
- [4. Global TUN və Smart Split ilə yerli bankları qorumaq](https://yivpn.net/az/guides/aztelekom-citynet-paket-itkisi-hysteria2/#global-tun-smart-split-az)
- [5. Gündəlik 90 dəqiqə pulsuz sınaq, 3 cihaz və YiPro planları](https://yivpn.net/az/guides/aztelekom-citynet-paket-itkisi-hysteria2/#free-90m-and-yipro-az)

## Copyable Diagnostic & Config Snippets

```bash
# 1. Beynəlxalq HTTPS əl sıxma (TLS) və ilk bayt müddətini (TTFB) ölçün
curl -o /dev/null -s -w \
  "DNS: %{time_namelookup}s | Connect: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Speed: %{speed_download} B/s\n" \
  https://speed.cloudflare.com/__down?bytes=10000000

# 2. PPPoE / MTU həddini Linux və ya macOS-da yoxlayın (Windows-da: ping -n 4 -f -l 1464 1.1.1.1)
ping -c 4 -M do -s 1464 1.1.1.1
```

```powershell
# 1. YiVPN qoşulu ikən xarici çıxış IP ünvanını yoxlayın
curl.exe -s https://api.ipify.org; echo ""

# 2. Yerli myGov portalının Smart Split ilə birbaşa açıldığını təsdiqləyin
Test-NetConnection -ComputerName my.gov.az -Port 443 | Select-Object ComputerName, RemoteAddress, TcpTestSucceeded

# 3. Windows .msi paketinin SHA-256 dəyərini yoxlayın
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
```

## Quick FAQ

**Q: Speedtest Bakıda 100 Mbit/s göstərdiyi halda axşamlar xarici saytlar və 4K video niyə donur?**

Yerli Speedtest ölçümü provayderin Bakıdakı daxili qovşağına 2–5 ms gecikmə ilə qoşulur. Axşam pik saatlarında Avropa və qlobal magistrallara çıxışda 2–6% paket itkisi və RTT artımı yarandıqda standart TCP/CUBIC alqoritmi ötürmə pəncərəsini yarıya endirir və sürət kəskin düşür.

**Q: Hysteria2 niyə PPPoE əsaslı fiber və LTE xətlərində adi WireGuard və ya OpenVPN-dən daha yaxşı işləyir?**

Hysteria2 UDP/QUIC üzərində itkiyə davamlı ötürmə idarəetməsi tətbiq edir və disablePathMTUDiscovery parametri ilə PPPoE/LTE şəbəkələrindəki ICMP MTU qara dəliklərindən (blackhole) yan keçir. Nəticədə kiçik paket itkilərində bağlantı donmur.

**Q: Azercell, Bakcell və ya Nar mobil internetində UDP məhdudlaşdırılıbsa, nə etmək lazımdır?**

YiVPN tətbiqində bir toxunuşla ehtiyat VLESS+REALITY protokoluna keçin. O, standart TCP/443 portu və TLS 1.3 maskalanması üzərindən işlədiyi üçün UDP məhdudiyyətlərindən təsirlənmir.

**Q: Smart Split açıq olanda ABB Mobile, Birbank, m10 və myGov birbaşa işləyəcəkmi və pulsuz sınaq neçə dəqiqədir?**

Bəli. Smart Split yerli bank və dövlət tətbiqlərini birbaşa Azərbaycan IP-si ilə yönləndirir. YiVPN hər gün qeydiyyatsız və kartsız 90 aktiv dəqiqə pulsuz istifadə verir; limit qoşulma kəsildikdə dayanır və hər gün saat 20:00 AZT-də (Bakı, 16:00 UTC) yenilənir.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Aztelekom, Baktelecom və CityNet fiber şəbəkələrində axşam sürət düşməsi: Hysteria2 ilə stabil bağlantı](https://yivpn.net/az/guides/aztelekom-citynet-paket-itkisi-hysteria2/)
- **Azərbaycan Guides Hub**: [https://yivpn.net/az/guides/](https://yivpn.net/az/guides/) · [RSS Feed](https://yivpn.net/az/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/az/download/?ref=github-guides](https://yivpn.net/az/download/?ref=github-guides)
- **Official Website (Azərbaycan)**: [https://yivpn.net/az/](https://yivpn.net/az/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
