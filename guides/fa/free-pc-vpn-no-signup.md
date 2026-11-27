# VPN رایگان بدون ثبت‌نام و کارت بانکی برای کامپیوتر و اندروید: روزانه ۹۰ دقیقه با ریست خودکار (2026)

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/fa/guides/free-pc-vpn-no-signup/)**.

- **Language**: `fa` (فارسی) · **Cluster**: `comparison` · **Updated**: `2026-11-27`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: VPN رایگان بدون ثبت نام, VPN بدون کارت بانکی کامپیوتر اندروید, روزانه 90 دقیقه VPN رایگان, Smart Split شاپرک اسنپ, هسته آفلاین sing-box 1.14.3, کد هدیه 16 کاراکتری YiVPN

## Key Takeaways (TL;DR)

- کاربران بدون کارت بانکی بین‌المللی روی شبکه‌های همراه اول، ایرانسل و مخابرات می‌توانند بدون ایمیل، شماره موبایل یا ثبت‌نام، روزانه 90 دقیقه زمان فعال رایگان در کامپیوتر و اندروید داشته باشند.
- تایمر سهمیه رایگان فقط در زمان اتصال فعال شمارش می‌شود، با قطع اتصال متوقف می‌گردد و هر روز ساعت 19:30 به وقت تهران (16:00 UTC) به‌صورت خودکار ریست می‌شود.
- بسته‌های YiVPN v1.0.14 هسته sing-box 1.14.3 و قوانین Smart Split را به‌صورت 100% آفلاین در خود دارند، با چک‌سام SHA-256 از GitHub Releases قابل راستی‌آزمایی هستند و شاپرک، همراه بانک‌ها، اسنپ و .ir را مستقیم نگه می‌دارند.
- در صورت نیاز به استفاده نامحدود، طرح YiPro از $2.99 در ماه (یا $21.99 در سال) تا 3 دستگاه هم‌زمان را از طریق کد 16 کاراکتری مجهول YIVP-XXXX-XXXX-XXXX پشتیبانی می‌کند که به‌راحتی توسط همکار یا دوستان خارج از کشور قابل ارسال است.

## Overview

بسیاری از کاربران کامپیوتر و اندروید در ایران، به‌دلیل نداشتن کارت بانکی بین‌المللی، امکان استفاده از «دوره‌های آزمایشی رایگان» سرویس‌های خارجی که پیش‌شرط ثبت کارت اعتباری دارند را ندارند؛ از سوی دیگر، ابزارهای رایگان نامعتبر معمولاً با تبلیغات، کاهش شدید پهنای باند یا ارسال ترافیک پس‌زمینه همراه‌اند. **YiVPN v1.0.14** یک مدل مهندسی شفاف ارائه می‌دهد: **روزانه ۹۰ دقیقه اتصال فعال رایگان** بدون ثبت‌نام، بدون ایمیل و بدون کارت بانکی، همراه با هسته **۱۰۰٪ آفلاین `sing-box 1.14.3`** و تفکیک هوشمند ترافیک (**`Smart Split`**) برای شبکه‌های **همراه اول (`MCI`)**، **ایرانسل (`Irancell`)** و **مخابرات (`TCI`)**.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. مقایسه مدل ۹۰ دقیقه رایگان YiVPN با سرویس‌های «رایگان نامحدود» و «Trial با کارت»](https://yivpn.net/fa/guides/free-pc-vpn-no-signup/#free-vpn-models-comparison)
- [2. زمان ریست روزانه در تهران (19:30 IRST) و عملکرد Smart Split روی سرویس‌های داخلی](https://yivpn.net/fa/guides/free-pc-vpn-no-signup/#irst-reset-and-smart-split)
- [3. هسته ۱۰۰٪ آفلاین sing-box 1.14.3 و بررسی اصالت SHA-256 از GitHub Releases](https://yivpn.net/fa/guides/free-pc-vpn-no-signup/#offline-core-sha256-verify)
- [4. پلن اختیاری YiPro با کد ۱۶ کاراکتری مجهول برای ۳ دستگاه هم‌زمان](https://yivpn.net/fa/guides/free-pc-vpn-no-signup/#yipro-anonymous-code-3-devices)

## Copyable Diagnostic & Config Snippets

```powershell
# Windows MSI (YIVPN_1.0.14_x64.msi)
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
# 412b78aa4affea582e04dc0ce0cb88bff765e0496e5be47e7479edfce9bbbdd2

# Windows Portable ZIP (YIVPN_1.0.14_x64_portable.zip)
Get-FileHash .\YIVPN_1.0.14_x64_portable.zip -Algorithm SHA256
# b636065d4e3d4b054f240573449a0899c3c44ab41446e1094c53832281780491
```

## Quick FAQ

**Q: آیا برای فعال شدن ۹۰ دقیقه روزانه روی ویندوز، مک یا اندروید باید ایمیل یا کارت بانکی وارد کنیم؟**

خیر. بلافاصله پس از نصب YiVPN v1.0.14، هر دستگاه بدون ایجاد حساب کاربری، بدون ایمیل و بدون نیاز به کارت بانکی بین‌المللی روزانه 90 دقیقه اتصال فعال رایگان دریافت می‌کند.

**Q: اگر در طول روز فقط ۱۵ دقیقه متصل شوم، بقیه ۹۰ دقیقه چه می‌شود؟**

شمارنده زمان تنها هنگام فعال بودن تونل کار می‌کند. پس از قطع اتصال، تایمر متوقف می‌شود و 75 دقیقه باقی‌مانده تا زمان ریست خودکار روزانه در ساعت 19:30 IRST (16:00 UTC) قابل استفاده خواهد بود.

**Q: چرا در بسیاری از نرم‌افزارهای متفرقه پس از نصب، دانلود هسته روی اینترنت داخلی قفل می‌شود؟**

بسیاری از کلاینت‌های شخص ثالث برای کاهش حجم اولیه، هسته sing-box یا فایل‌های قواعد مسیر را هنگام اولین اجرا از مخازن خارجی می‌گیرند. YiVPN v1.0.14 هسته sing-box 1.14.3 و جداول پایه singbox-smart-split را به‌صورت 100% آفلاین داخل نصبی قرار داده است.

**Q: کاربرانی که کارت ارزی ندارند چگونه می‌توانند پلن نامحدود YiPro را فعال کنند؟**

پلن YiPro از $2.99 در ماه ($6.99 سه‌ماهه یا $21.99 سالانه) به‌جای وابستگی اجباری به ایمیل یا اتصال مستقیم کارت کاربر، از کد فعال‌سازی 16 کاراکتری مجهول (YIVP-XXXX-XXXX-XXXX) برای حداکثر 3 دستگاه هم‌زمان استفاده می‌کند که همکار یا دوستان مقیم خارج می‌توانند کد آن را تهیه و برای شما ارسال کنند.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [VPN رایگان بدون ثبت‌نام و کارت بانکی برای کامپیوتر و اندروید: روزانه ۹۰ دقیقه با ریست خودکار (2026)](https://yivpn.net/fa/guides/free-pc-vpn-no-signup/)
- **فارسی Guides Hub**: [https://yivpn.net/fa/guides/](https://yivpn.net/fa/guides/) · [RSS Feed](https://yivpn.net/fa/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/fa/download/?ref=github-guides](https://yivpn.net/fa/download/?ref=github-guides)
- **Official Website (فارسی)**: [https://yivpn.net/fa/](https://yivpn.net/fa/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
