# كيفية تشغيل VPN في السعودية دون تعطيل أبشر ونفاذ وتطبيقات البنوك (STC و Mobily و Zain)

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/ar/guides/saudi-absher-nafath-smart-split-vpn/)**.

- **Language**: `ar` (العربية) · **Cluster**: `crossborder` · **Updated**: `2026-11-23`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: VPN السعودية أبشر نفاذ, تقسيم الترافيك Smart Split السعودية, تشغيل VPN مع مصرف الراجحي STC Pay, تأمين واي فاي الرياض جدة, YiVPN STC Mobily Zain, sing-box Hysteria2 السعودية

## Key Takeaways (TL;DR)

- تعطيل أبشر ونفاذ وتوكلنا ومصرف الراجحي عند تشغيل VPN تقليدي يحدث بسبب خروج الطلبات من عنوان IP أجنبي يثير أنظمة التحقق الجغرافي.
- الدمج بين وضع Global TUN على الطبقة الثالثة وميزة Smart Split يُبقي نطاقات .sa والتطبيقات الحكومية والبنكية على الاتصال المباشر بينما يشفر بقية حركة البيانات.
- على شبكات ألياف و5G من STC وMobily وZain KSA، يوفر بروتوكول Hysteria2 استقراراً عالياً للاجتماعات السحابية، بينما يعمل VLESS+REALITY على منفذ TCP/443 في الشبكات المقيدة.
- يحصل كل مستخدم على 90 دقيقة مجانية يومياً تتجدد عند الساعة 19:00 بتوقيت السعودية (16:00 UTC) دون تسجيل بريد إلكتروني، وتغطي باقات YiPro من $2.99 شهرياً حتى 3 أجهزة متزامنة.

## Overview

يحتاج الموظفون عن بُعد ورواد الأعمال في الرياض وجدة والدمام يومياً إلى تأمين اجتماعاتهم السحابية واتصالاتهم على شبكات الواي فاي العامة في المقاهي والمطارات، مع الاعتماد في الوقت نفسه على خدمات محلية حساسة مثل **أبشر (Absher)** و**نفاذ (Nafath)** و**مصرف الراجحي** و**STC Pay**. المشكلة أن شبكات الـ VPN التقليدية تُمرّر كل حركة البيانات عبر نفق خارجي واحد، مما يؤدي إلى فشل تسجيل الدخول الحيوي ورسائل التحقق `OTP`. الحل الهندسي الدقيق هو استخدام **`Global TUN` مع `Smart Split`** عبر نواة `sing-box 1.14.3` المدمجة لإبقاء الخدمات السعودية على الاتصال المباشر وتشفير حركة العمل الدولية فقط.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. لماذا تتعطل تطبيقات أبشر ونفاذ والبنوك مع الـ VPN التقليدي؟](https://yivpn.net/ar/guides/saudi-absher-nafath-smart-split-vpn/#why-saudi-apps-fail-full-vpn)
- [2. بنية Global TUN و sing-box 1.14.3 على شبكات STC و Mobily و Zain](https://yivpn.net/ar/guides/saudi-absher-nafath-smart-split-vpn/#saudi-isp-tun-protocols)
- [3. خطوات تفعيل Smart Split وحماية الخصوصية اليومية في المملكة](https://yivpn.net/ar/guides/saudi-absher-nafath-smart-split-vpn/#setup-smart-split-saudi)
- [4. فحص المسار من سطر الأوامر للتأكد من عمل Smart Split](https://yivpn.net/ar/guides/saudi-absher-nafath-smart-split-vpn/#cli-verify-saudi-split)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. التحقق من عنوان الخروج الدولي داخل النفق المشفر
curl.exe -s https://api.ipify.org

# 2. اختبار استجابة بوابة حكومية سعودية عبر المسار المباشر (Smart Split)
curl.exe -I -s -o $null -w "status=%{http_code} ttfb=%{time_starttransfer}s\n" https://www.absher.sa

# 3. التأكد من سلامة استعلامات DNS دون تسرب على الشبكة المحلية
Resolve-DnsName -Name my.gov.sa -Type A
```

## Quick FAQ

**Q: لماذا يتوقف تطبيق أبشر أو نفاذ أو مصرف الراجحي بمجرد تشغيل الـ VPN؟**

تعتمد المنصات الحكومية والبنوك السعودية مثل أبشر ونفاذ ومصرف الراجحي والأهلي (SNB) وSTC Pay على مطابقة الموقع الجغرافي لعنوان الـ IP مع رمز التحقق OTP والمصادقة الحيوية. مرور هذه الطلبات عبر خادم خارجي يجعل الجلسة تبدو كمحاولة دخول مشبوهة من خارج المملكة.

**Q: هل أحتاج إلى إيقاف YiVPN يدوياً في كل مرة أستخدم فيها توكلنا أو نفاذ؟**

لا. عند تفعيل ميزة Smart Split المبنية على نواة sing-box 1.14.3، يتم توجيه جميع نطاقات .sa والمنصات المحلية مباشرة عبر شبكة STC أو Mobily أو Zain، بينما تبقى بقية جلسات العمل والاجتماعات محمية داخل النفق المشفر.

**Q: ما البروتوكول الأنسب على شبكات STC وMobily وZain في الرياض وجدة؟**

على الألياف المنزلية وشبكات 5G، يقلل بروتوكول Hysteria2 المعتمد على QUIC/UDP من تقطع الصوت والصورة. أما في شبكات الفنادق أو المقاهي أو الشركات التي تقيد منافذ UDP، فيُفضل التحويل إلى VLESS+REALITY عبر TCP/443.

**Q: هل يتطلب YiVPN ربط رقم جوال سعودي أو بريد إلكتروني للبدء؟**

لا يتطلب أي بيانات شخصية. تحصل فوراً على 90 دقيقة نشطة مجاناً يومياً تتجدد الساعة 19:00 بتوقيت السعودية (16:00 UTC)، وتعمل باقات YiPro عبر رمز تفعيل مجهول من 16 خانة (YIVP-XXXX-XXXX-XXXX) بسعر يبدأ من $2.99 شهرياً لـ 3 أجهزة.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [كيفية تشغيل VPN في السعودية دون تعطيل أبشر ونفاذ وتطبيقات البنوك (STC و Mobily و Zain)](https://yivpn.net/ar/guides/saudi-absher-nafath-smart-split-vpn/)
- **العربية Guides Hub**: [https://yivpn.net/ar/guides/](https://yivpn.net/ar/guides/) · [RSS Feed](https://yivpn.net/ar/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/ar/download/?ref=github-guides](https://yivpn.net/ar/download/?ref=github-guides)
- **Official Website (العربية)**: [https://yivpn.net/ar/](https://yivpn.net/ar/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
