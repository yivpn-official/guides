# مقایسه فنی Hysteria2، VLESS+REALITY و WireGuard روی اینترنت همراه و فیبر با Packet Loss بالا

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/fa/guides/hysteria2-vs-wireguard-vs-reality/)**.

- **Language**: `fa` (فارسی) · **Cluster**: `comparison` · **Updated**: `2026-11-21`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: مقایسه Hysteria2 و WireGuard, VLESS REALITY چیست, کاهش Packet Loss اینترنت, تنظیم MTU و QUIC, هسته آفلاین sing-box, مسیریابی هوشمند دامنه‌های ir

## Key Takeaways (TL;DR)

- در خطوط پرنوسان با Packet Loss بالای ۳٪، الگوریتم کنترل ازدحام QUIC در Hysteria2 با غیرفعال‌سازی کشف MTU مسیر و زنجیره گواهی کوتاه، از افت شدید پهنای باند جلوگیری می‌کند.
- در شبکه‌هایی که ترافیک UDP محدود یا شکل‌دهی می‌شود، پروتکل VLESS+REALITY روی TCP/443 با TLS 1.3 و BBR پایدارترین نرخ انتقال را حفظ می‌کند.
- کلاینت YiVPN v1.0.14 هسته sing-box 1.14.3 و قوانین مسیریابی را ۱۰۰٪ آفلاین درون فایل نصب قرار می‌دهد تا خطای دانلود اولیه هسته روی شبکه‌های ناپایدار رخ ندهد.
- با Smart Split دامنه‌های .ir، درگاه‌های پرداخت شاپرک (Shaparak)، همراه بانک‌ها و Snapp بدون نیاز به قطع تونل مستقیماً از مسیر داخلی عبور می‌کنند.

## Overview

در لینک‌های اینترنت همراه و فیبر که هم‌زمان با **نوسان تاخیر (`Jitter`)**، **افت بسته (`Packet Loss`)** و **محدودیت‌های `Path MTU`** روبه‌رو هستند، انتخاب لایه انتقال (`Transport Layer`) بسیار مهم‌تر از موقعیت جغرافیایی سرور است. این راهنمای مهندسی رفتار **`Hysteria2`**، **`VLESS+REALITY`** و **`WireGuard`** را در شبکه اپراتورهای همراه و ثابت بررسی می‌کند و نشان می‌دهد ترکیب **هسته آفلاین `sing-box 1.14.3`** با **`Smart Split`** چگونه اتصال کاری و خدمات محلی `.ir` را هم‌زمان پایدار نگه می‌دارد.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. چرا در شبکه‌های پرنوسان، لایه انتقال و MTU تعیین‌کننده هستند؟](https://yivpn.net/fa/guides/hysteria2-vs-wireguard-vs-reality/#transport-layer-packet-loss)
- [2. جدول مقایسه مهندسی Hysteria2، VLESS+REALITY و WireGuard](https://yivpn.net/fa/guides/hysteria2-vs-wireguard-vs-reality/#protocol-benchmark-matrix)
- [3. دو مزیت عملیاتی مهم: هسته ۱۰۰٪ آفلاین sing-box و تفکیک هوشمند .ir](https://yivpn.net/fa/guides/hysteria2-vs-wireguard-vs-reality/#offline-core-smart-split)
- [4. تست عملی Packet Loss، تاخیر دست‌دهی و Path MTU در ترمینال](https://yivpn.net/fa/guides/hysteria2-vs-wireguard-vs-reality/#mtu-packet-loss-diagnostics)
- [5. ارزیابی رایگان روزانه، کد فعال‌سازی ناشناس و پوشش ۳ دستگاه](https://yivpn.net/fa/guides/hysteria2-vs-wireguard-vs-reality/#daily-free-quota-anonymous-code)

## Copyable Diagnostic & Config Snippets

```bash
# 1. بررسی Path MTU روی لینوکس (بسته 1380 بایتی بدون Fragmentation)
ping -c 4 -M do -s 1380 1.1.1.1

# 2. تفکیک دقیق زمان DNS، اتصال TCP، دست‌دهی TLS و اولین بایت پاسخ (TTFB)
curl -o /dev/null -s -w "dns=%{time_namelookup}s tcp=%{time_connect}s tls=%{time_appconnect}s ttfb=%{time_starttransfer}s\n" https://www.cloudflare.com/cdn-cgi/trace

# 3. بررسی نوع رمزنگاری و موقعیت گره خروجی پس از اتصال
curl -s https://www.cloudflare.com/cdn-cgi/trace | grep -E "ip=|loc=|tls=|http="
```

```powershell
ping -n 4 -f -l 1380 1.1.1.1
curl.exe -s https://www.cloudflare.com/cdn-cgi/trace | Select-String -Pattern "^(ip|loc|tls|http)="
```

## Quick FAQ

**Q: چرا WireGuard با وجود سرعت بالا در شرایط ایده‌آل، روی برخی خطوط همراه اول یا ایرانسل دچار افت یا قطعی می‌شود؟**

WireGuard از بسته‌های UDP با هدر ثابت و MTU پیش‌فرض 1420 بایت استفاده می‌کند و مکانیزم کنترل ازدحام اختصاصی برای جبران Packet Loss سنگین ندارد. در مسیرهایی که Path MTU کمتر از حد استاندارد است یا ترافیک UDP با اولویت پایین پردازش می‌شود، دست‌دهی WireGuard به سرعت دچار تایم‌اوت می‌شود.

**Q: نقش زنجیره گواهی کوتاه و disablePathMTUDiscovery در پایداری Hysteria2 چیست؟**

طبق استاندارد RFC 9000، سرور QUIC پیش از تایید آدرس کلاینت حداکثر سه برابر اندازه بسته اولیه مجاز به ارسال داده است. استفاده از زنجیره گواهی کوتاه ECDSA (مانند ISRG Root X2) باعث می‌شود کل دست‌دهی TLS در یک نوبت ارسال جا بگیرد و disablePathMTUDiscovery از افتادن بسته‌ها در چاله MTU جلوگیری می‌کند.

**Q: آیا هنگام استفاده از YiVPN لازم است برای پرداخت در شاپرک یا باز کردن Snapp اتصال را قطع کرد؟**

خیر. قابلیت Smart Split مبتنی بر singbox-smart-split به‌صورت خودکار دامنه‌های .ir، درگاه‌های شاپرک (Shaparak)، اپلیکیشن‌های بانکی داخلی و Snapp را از مسیر مستقیم عبور می‌دهد تا خطای آی‌پی غیرمجاز یا تاخیر اضافه ایجاد نشود.

**Q: سهمیه رایگان روزانه YiVPN چه ساعتی به وقت تهران ریست می‌شود و برای چند دستگاه قابل استفاده است؟**

هر کاربر روزانه ۹۰ دقیقه رایگان بدون نیاز به ثبت‌نام، ایمیل یا کارت بانکی دریافت می‌کند که هر روز ساعت 19:30 به وقت تهران (IRST) به‌طور خودکار ریست می‌شود. پلن YiPro از $2.99/ماه (یا سالانه $21.99) با کد ناشناس ۱۶ کاراکتری تا ۳ دستگاه همزمان را پوشش می‌دهد.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [مقایسه فنی Hysteria2، VLESS+REALITY و WireGuard روی اینترنت همراه و فیبر با Packet Loss بالا](https://yivpn.net/fa/guides/hysteria2-vs-wireguard-vs-reality/)
- **فارسی Guides Hub**: [https://yivpn.net/fa/guides/](https://yivpn.net/fa/guides/) · [RSS Feed](https://yivpn.net/fa/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/fa/download/?ref=github-guides](https://yivpn.net/fa/download/?ref=github-guides)
- **Official Website (فارسی)**: [https://yivpn.net/fa/](https://yivpn.net/fa/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
