# تنظیم تفکیک هوشمند ترافیک (Smart Split): اتصال مستقیم به شاپرک، همراه بانک‌ها، اسنپ و سایت‌های .ir

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/fa/guides/smart-split-shaparak-hamrah-bank-ir-direct/)**.

- **Language**: `fa` (فارسی) · **Cluster**: `crossborder` · **Updated**: `2026-11-23`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: تفکیک هوشمند ترافیک Smart Split, اتصال مستقیم شاپرک همراه بانک, تنظیم VPN برای اسنپ و دیجی‌کالا, مسیر مستقیم دامنه ir در sing-box, YiVPN همراه اول ایرانسل مخابرات, Global TUN و Hysteria2

## Key Takeaways (TL;DR)

- درگاه پرداخت شاپرک، اپلیکیشن‌های همراه بانک، اسنپ و دیجی‌کالا به دلیل بررسی IP و فایروال‌های داخلی، ترافیک ورودی از IP خارجی را مسدود می‌کنند یا خطای تایم‌اوت می‌دهند.
- ترکیب حالت Layer-3 Global TUN با موتور متن‌باز Smart Split در هسته sing-box 1.14.3 باعث می‌شود دامنه‌ها و IPهای داخلی .ir به‌صورت مستقیم و بدون قطع VPN باز شوند.
- روی اینترنت همراه اول (MCI)، ایرانسل (Irancell) و مخابرات (TCI)، پروتکل‌های Hysteria2 و VLESS+REALITY پایداری تونل را حفظ کرده و هم‌زمان نیاز به خاموش و روشن کردن مداوم VPN را حذف می‌کنند.
- هر دستگاه روزانه 90 دقیقه سهمیه فعال رایگان (با ریست در ساعت 19:30 به وقت تهران / 16:00 UTC) دارد و پلن YiPro از $2.99 در ماه تا 3 دستگاه هم‌زمان را پشتیبانی می‌کند.

## Overview

یکی از آزاردهنده‌ترین مشکلات فنی روزمره کاربران و توسعه‌دهندگان در ایران، نیاز به خاموش و روشن کردن مداوم VPN در طول روز است: به محض باز کردن درگاه پرداخت **شاپرک (Shaparak)**، **همراه بانک**، **اسنپ (Snapp)**، **دیجی‌کالا** یا سامانه‌های اداری `.ir`، صفحه با خطای مسدودیت یا تایم‌اوت متوقف می‌شود. راه‌حل مهندسی استاندارد برای حذف این اصطکاک دائمی، استفاده از **تفکیک هوشمند ترافیک (`Smart Split`)** همراه با **`Layer-3 Global TUN`** در هسته آفلاین **`sing-box 1.14.3`** است تا ترافیک داخلی ایران همواره مستقیم بماند.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. چرا شاپرک، همراه بانک‌ها و اسنپ با IP خارجی مسدود می‌شوند؟](https://yivpn.net/fa/guides/smart-split-shaparak-hamrah-bank-ir-direct/#why-ir-services-block-vpn)
- [2. عملکرد sing-box 1.14.3 و Global TUN روی همراه اول، ایرانسل و مخابرات](https://yivpn.net/fa/guides/smart-split-shaparak-hamrah-bank-ir-direct/#singbox-offline-core-iran-isps)
- [3. راهنمای فعال‌سازی Smart Split بدون ثبت‌نام و اطلاعات شخصی](https://yivpn.net/fa/guides/smart-split-shaparak-hamrah-bank-ir-direct/#setup-smart-split-steps)
- [4. بررسی عملکرد مسیریابی در ترمینال و خط فرمان](https://yivpn.net/fa/guides/smart-split-shaparak-hamrah-bank-ir-direct/#cli-verification-ir-direct)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. بررسی IP خروجی بین‌المللی (باید IP سرور YiVPN را نمایش دهد)
curl.exe -s https://api.ipify.org

# 2. بررسی پاسخ مستقیم سایت داخلی .ir (باید بدون خطا و با تأخیر پایین متصل شود)
curl.exe -I -s -o $null -w "status=%{http_code} ttfb=%{time_starttransfer}s\n" https://www.shaparak.ir

# 3. بررسی تطابق نام دامنه داخلی در سیستم‌عامل
Resolve-DnsName -Name shaparak.ir -Type A
```

## Quick FAQ

**Q: چرا هنگام پرداخت در درگاه شاپرک یا باز کردن همراه بانک با VPN روشن خطا دریافت می‌کنیم؟**

شبکه پرداخت شاپرک و سامانه‌های بانکی ایران از فایروال‌های محدودیت جغرافیایی و بررسی تطابق IP استفاده می‌کنند؛ بنابراین درخواست‌هایی که از سرورهای خارج از کشور ارسال شوند، بلافاصله مسدود یا با خطای دسترسی مواجه می‌شوند.

**Q: آیا Smart Split فقط در مرورگر کار می‌کند یا برای اپلیکیشن‌های اندروید و ویندوز هم فعال است؟**

در YiVPN v1.0.14، تفکیک هوشمند روی لایه سوم شبکه (Global TUN) و توسط هسته داخلی sing-box 1.14.3 انجام می‌شود؛ یعنی علاوه بر مرورگر، اپلیکیشن‌هایی مثل همراه بانک، اسنپ، تپسی، دیجی‌کالا و ابزارهای ترمینال هم ترافیک داخلی خود را مستقیم دریافت می‌کنند.

**Q: کدام پروتکل برای اپراتورهای همراه اول، ایرانسل و مخابرات انتخاب مطمئن‌تری است؟**

در خطوطی که ترافیک UDP پایدار است، Hysteria2 مبتنی بر QUIC/UDP سرعت و بازیابی بسته‌های بسیار خوبی ارائه می‌دهد. در شبکه‌هایی که UDP دچار افت کیفیت یا محدودیت می‌شود، VLESS+REALITY روی پورت TCP/443 گزینه پایدارتری است.

**Q: سهمیه رایگان روزانه چه زمانی ریست می‌شود و هر اشتراک روی چند دستگاه کار می‌کند؟**

هر کاربر روزانه 90 دقیقه زمان فعال رایگان دارد که در زمان قطع اتصال متوقف می‌شود و هر روز ساعت 19:30 به وقت تهران (IRST / 16:00 UTC) ریست می‌شود. پلن‌های YiPro با کد فعال‌سازی 16 کاراکتری بدون نیاز به ایمیل تا 3 دستگاه هم‌زمان را پوشش می‌دهند.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [تنظیم تفکیک هوشمند ترافیک (Smart Split): اتصال مستقیم به شاپرک، همراه بانک‌ها، اسنپ و سایت‌های .ir](https://yivpn.net/fa/guides/smart-split-shaparak-hamrah-bank-ir-direct/)
- **فارسی Guides Hub**: [https://yivpn.net/fa/guides/](https://yivpn.net/fa/guides/) · [RSS Feed](https://yivpn.net/fa/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/fa/download/?ref=github-guides](https://yivpn.net/fa/download/?ref=github-guides)
- **Official Website (فارسی)**: [https://yivpn.net/fa/](https://yivpn.net/fa/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
