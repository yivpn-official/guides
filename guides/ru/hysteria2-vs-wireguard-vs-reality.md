# Hysteria2, VLESS+REALITY (TLS 1.3) и WireGuard: какой протокол устойчивее на сложных сетях и при потере пакетов?

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/ru/guides/hysteria2-vs-wireguard-vs-reality/)**.

- **Language**: `ru` (Русский) · **Cluster**: `comparison` · **Updated**: `2026-11-27`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: Hysteria2 vs WireGuard, VLESS REALITY TLS 1.3, протокол при потере пакетов, MTU blackhole UDP шейпинг, sing-box 1.14.3 Smart Split, YiVPN Ростелеком МТС Билайн

## Key Takeaways (TL;DR)

- Стандартный WireGuard (UDP, фиксированный MTU 1420 байт) работает с минимальным оверхедом на чистых каналах, но при 3–8% потерь пакетов, PPPoE-фрагментации или UDP-шейпинге пропускная способность падает кратно.
- Hysteria2 поверх QUIC/UDP в YiVPN v1.0.14 использует disablePathMTUDiscovery и короткую цепочку сертификатов ISRG Root X2, укладываясь в лимит усиления 3x по RFC 9000 и стабильно удерживая поток при потерях.
- Когда мобильный или корпоративный шлюз режет высокоскоростной UDP, VLESS+REALITY поверх TLS 1.3 (TCP/443) с серверным BBR и планировщиком fq обеспечивает ровный канал без деградации рукопожатия.
- Встроенное 100% офлайн-ядро sing-box 1.14.3 и правила Smart Split оставляют Госуслуги, Сбербанк, Т-Банк, Яндекс и домены .ru на прямом маршруте провайдера, а целостность установщика проверяется по SHA-256.

## Overview

Выбор транспортного протокола напрямую определяет, будет ли соединение держать стабильную полосу при вечерней нагрузке у **Ростелекома**, **МТС**, **Билайна** и **МегаФона** или начнёт зависать при первых потерях пакетов. На чистой магистрали без потерь **WireGuard**, **Hysteria2** и **VLESS+REALITY** показывают сопоставимую задержку, но при потере 3–8% пакетов, обрезке MTU или операторском UDP-шейпинге их поведение на транспортном уровне L4 расходится принципиально. В этом инженерном разборе сравним три протокола и покажем, как **YiVPN v1.0.14** на базе офлайн-ядра **sing-box 1.14.3** сочетает их со **Smart Split** для прямого доступа к российским сервисам.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Физика транспортного уровня: почему падает скорость при потерях](https://yivpn.net/ru/guides/hysteria2-vs-wireguard-vs-reality/#transport-layer-physics)
- [2. Сравнение Hysteria2, VLESS+REALITY и WireGuard](https://yivpn.net/ru/guides/hysteria2-vs-wireguard-vs-reality/#protocol-benchmark-matrix)
- [3. Почему Hysteria2 в YiVPN не обрывается на старте: PMTUD и ISRG Root X2](https://yivpn.net/ru/guides/hysteria2-vs-wireguard-vs-reality/#hysteria2-tuning-details)
- [4. Проверка целостности SHA-256 и диагностика маршрута](https://yivpn.net/ru/guides/hysteria2-vs-wireguard-vs-reality/#sha256-and-diagnostics)
- [5. Smart Split для банков РФ и условия доступа без привязки карты](https://yivpn.net/ru/guides/hysteria2-vs-wireguard-vs-reality/#smart-split-and-access)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Проверка контрольной суммы установщика Windows (YiVPN v1.0.14)
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
# Ожидаемый SHA-256: 412b78aa4affea582e04dc0ce0cb88bff765e0496e5be47e7479edfce9bbbdd2

# 2. Проверка порогового MTU линии (1472 + 28 байт заголовков = 1500 MTU)
ping.exe -n 4 -f -l 1472 1.1.1.1

# 3. Проверка прямой маршрутизации российского ресурса при включённом Smart Split
Test-NetConnection -ComputerName gosuslugi.ru -Port 443 | Select-Object ComputerName, RemoteAddress, TcpTestSucceeded
```

## Quick FAQ

**Q: Почему WireGuard теряет скорость на Ростелекоме, МТС, Билайне или МегаФоне в часы нагрузки?**

Стандартный WireGuard не адаптирует агрессивность передачи под потери на магистрали и по умолчанию ориентируется на MTU 1420 байт. На PPPoE-линиях или в сотовых сетях LTE/5G при фрагментации пакетов и вечернем UDP-шейпинге внутренние TCP-сессии внутри туннеля начинают сбрасывать окно перегрузки (cwnd).

**Q: В чём техническая разница между Hysteria2 и VLESS+REALITY в клиенте YiVPN v1.0.14?**

Hysteria2 работает поверх QUIC/UDP с контролем скорости на основе реальной пропускной способности канала, отключённым PMTUD (disablePathMTUDiscovery) и короткой цепочкой ISRG Root X2. VLESS+REALITY использует стандартный TCP/443 с TLS 1.3 и серверным BBR/fq, поэтому не зависит от пропускной способности UDP.

**Q: Нужно ли настраивать ядро sing-box вручную и можно ли проверить подлинность файлов YiVPN?**

Нет, YiVPN v1.0.14 поставляется со 100% офлайн-ядром sing-box 1.14.3, не требующим докачки бинарников после установки. Официальные установщики на GitHub Releases сопровождаются контрольными суммами SHA-256 для Windows, macOS и Android.

**Q: Сколько стоит подписка YiPro и как работает бесплатный лимит без регистрации?**

Бесплатно предоставляются 90 активных минут в сутки без почты, регистрации и привязки карты; таймер ставится на паузу при отключении и сбрасывается ежедневно в 19:00 МСК (16:00 UTC). Подписка YiPro стоит $2.99/мес ($6.99/квартал или $21.99/год, что эквивалентно $1.83/мес) для 3 устройств одновременно; опционально доступен выделенный статический резидентский IP от $4.29/мес.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Hysteria2, VLESS+REALITY (TLS 1.3) и WireGuard: какой протокол устойчивее на сложных сетях и при потере пакетов?](https://yivpn.net/ru/guides/hysteria2-vs-wireguard-vs-reality/)
- **Русский Guides Hub**: [https://yivpn.net/ru/guides/](https://yivpn.net/ru/guides/) · [RSS Feed](https://yivpn.net/ru/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/ru/download/?ref=github-guides](https://yivpn.net/ru/download/?ref=github-guides)
- **Official Website (Русский)**: [https://yivpn.net/ru/](https://yivpn.net/ru/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
