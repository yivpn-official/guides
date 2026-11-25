# نصب آفلاین VPN در ویندوز، مک و اندروید بدون نیاز به دانلود هسته خارجی: دریافت امن از GitHub Releases

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/fa/guides/offline-installer-singbox-github-releases-sha256/)**.

- **Language**: `fa` (فارسی) · **Cluster**: `dev` · **Updated**: `2026-11-25`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: نصب آفلاین sing-box, بررسی SHA-256 GitHub Releases, خطای دانلود هسته VPN, YiVPN v1.0.14, بسته آفلاین ویندوز مک اندروید, Smart Split شاپرک

## Key Takeaways (TL;DR)

- بسیاری از کلاینت‌های شخص ثالث در اولین اجرا برای دریافت باینری هسته sing-box یا فایل‌های قوانین .srs به اینترنت خارجی وابسته‌اند و روی شبکه‌های همراه اول، ایرانسل و مخابرات متوقف می‌شوند.
- نصبی‌های رسمی YiVPN v1.0.14 هسته sing-box 1.14.3 و موتور مسیریابی singbox-smart-split را به‌صورت 100% آفلاین درون بسته اصلی جای داده‌اند و بلافاصله اجرا می‌شوند.
- تمامی بسته‌های ویندوز (msi و portable zip)، مک (universal dmg) و اندروید (arm64-v8a apk) از دو کانال هم‌زمان شامل سایت رسمی و GitHub Releases با چک‌سام SHA-256 قابل راستی‌آزمایی عرضه می‌شوند.
- پس از نصب بدون ثبت‌نام، هر دستگاه روزانه 90 دقیقه سهمیه فعال رایگان (ریست در 19:30 به وقت تهران / 16:00 UTC) با Smart Split برای شاپرک و دامنه‌های .ir دارد و پلن YiPro با $2.99 در ماه تا 3 دستگاه را پوشش می‌دهد.

## Overview

یکی از رایج‌ترین بن‌بست‌های فنی هنگام راه‌اندازی ابزارهای شبکه روی خطوط **همراه اول (`MCI`)**، **ایرانسل (`Irancell`)** و **مخابرات (`TCI`)**، قفل شدن کلاینت‌های شخص ثالث در همان لحظه اول اجراست: برنامه نصب می‌شود، اما برای دریافت هسته `sing-box` یا دانلود فایل‌های قواعد مسیریابی `.srs` از مخازن خارجی با تایم‌اوت روبه‌رو می‌شود. نسخه **`YiVPN v1.0.14`** با بسته‌بندی **۱۰۰٪ آفلاین هسته `sing-box 1.14.3`** و عرضه هم‌زمان از طریق دو کانال مستقل (وب‌سایت رسمی و **GitHub Releases**) به همراه چک‌سام **SHA-256**، این مشکل را به‌طور کامل برطرف می‌کند.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. چرا دانلود آنلاین هسته در بسیاری از کلاینت‌ها متوقف می‌شود؟](https://yivpn.net/fa/guides/offline-installer-singbox-github-releases-sha256/#why-online-core-fetch-stalls)
- [2. جدول مشخصات و کدهای SHA-256 بسته‌های YiVPN v1.0.14](https://yivpn.net/fa/guides/offline-installer-singbox-github-releases-sha256/#official-sha256-checksums)
- [3. راستی‌آزمایی فایل نصبی در ویندوز، مک و اندروید](https://yivpn.net/fa/guides/offline-installer-singbox-github-releases-sha256/#verify-sha256-commands)
- [4. اجرای فوری، Smart Split برای شاپرک و سهمیه رایگان روزانه](https://yivpn.net/fa/guides/offline-installer-singbox-github-releases-sha256/#smart-split-and-daily-quota)

## Copyable Diagnostic & Config Snippets

```powershell
# بررسی SHA-256 در ویندوز (PowerShell) برای نصاب و نسخه پرتابل
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256 | Format-List
Get-FileHash .\YIVPN_1.0.14_x64_portable.zip -Algorithm SHA256 | Format-List
```

```bash
# بررسی SHA-256 در ترمینال macOS و لینوکس
shasum -a 256 ~/Downloads/YIVPN_1.0.14_universal.dmg
shasum -a 256 ~/Downloads/YIVPN-Android-1.0.14-arm64-v8a.apk
```

## Quick FAQ

**Q: چرا برخی کلاینت‌های متفرقه پس از نصب روی ویندوز یا اندروید در مرحله دانلود هسته گیر می‌کنند؟**

این ابزارها برای سبک نگه داشتن نصبی اولیه، هسته sing-box یا پایگاه‌های داده GeoIP و فایل‌های .srs را هنگام اولین اجرا از مخازن خارجی دانلود می‌کنند؛ در صورت ناپایداری مسیر یا اختلال CDN روی همراه اول، ایرانسل یا مخابرات، نرم‌افزار عملاً بدون هسته قابل استفاده باقی می‌ماند.

**Q: آیا YiVPN v1.0.14 پس از نصب نیاز به دانلود فایل قوانین Smart Split از گیت‌هاب دارد؟**

خیر. تمامی باینری‌های sing-box 1.14.3 و جداول پایه singbox-smart-split برای اتصال مستقیم شاپرک، همراه بانک‌ها و دامنه‌های .ir به‌صورت پیش‌فرض و کاملاً آفلاین داخل بسته‌های نصبی قرار گرفته‌اند.

**Q: از کجا مطمئن شویم فایل دانلودشده از آینه‌ها یا کانال‌های میانی دستکاری نشده است؟**

کافی است پس از دانلود بسته، دستور Get-FileHash در ویندوز یا shasum -a 256 در مک را اجرا کرده و خروجی 64 کاراکتری SHA-256 را با جدول رسمی منتشرشده در صفحه‌ی امنیت و GitHub Releases مقایسه کنید.

**Q: آیا برای استفاده از نسخه آفلاین باید ایمیل ثبت کنیم یا کارت بانکی بدهیم؟**

خیر. بلافاصله پس از نصب، 90 دقیقه زمان فعال روزانه بدون ثبت‌نام در اختیار شماست (تایمر در زمان قطع اتصال متوقف می‌شود و ساعت 19:30 به وقت تهران ریست می‌شود). پلن YiPro نیز از $2.99 در ماه تا 3 دستگاه را با کد 16 کاراکتری مجهول پشتیبانی می‌کند.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [نصب آفلاین VPN در ویندوز، مک و اندروید بدون نیاز به دانلود هسته خارجی: دریافت امن از GitHub Releases](https://yivpn.net/fa/guides/offline-installer-singbox-github-releases-sha256/)
- **فارسی Guides Hub**: [https://yivpn.net/fa/guides/](https://yivpn.net/fa/guides/) · [RSS Feed](https://yivpn.net/fa/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/fa/download/?ref=github-guides](https://yivpn.net/fa/download/?ref=github-guides)
- **Official Website (فارسی)**: [https://yivpn.net/fa/](https://yivpn.net/fa/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
