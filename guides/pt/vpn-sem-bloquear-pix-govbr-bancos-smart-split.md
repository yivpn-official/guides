# Como usar VPN no Brasil sem bloquear Pix, Gov.br e apps de bancos (Nubank, Itaú, Bradesco) via Smart Split

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/pt/guides/vpn-sem-bloquear-pix-govbr-bancos-smart-split/)**.

- **Language**: `pt` (Português) · **Cluster**: `crossborder` · **Updated**: `2026-11-23`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: VPN sem bloquear Pix, VPN Gov.br Nubank Itaú Bradesco, Smart Split VPN Brasil, Global TUN sing-box Brasil, VPN MB WAY Portugal, YiVPN Claro Vivo Oi

## Key Takeaways (TL;DR)

- Uma VPN em túnel completo altera o IP de origem nas operadoras Claro, Vivo e Oi, disparando alertas antifraude no Pix, Gov.br, Nubank, Itaú, Bradesco, Banco do Brasil e Receita Federal.
- O modo Global TUN de camada L3 combinado ao Smart Split (singbox-smart-split) mantém bancos brasileiros, portais .gov.br e até o MB WAY em Portugal na rota direta local.
- Para tráfego internacional sem engasgos, o YiVPN v1.0.14 combina Hysteria2 (QUIC com disablePathMTUDiscovery) e fallback VLESS+REALITY sobre TCP/443 com núcleo sing-box 1.14.3 100% offline.
- Você pode validar o roteamento sem cartão nem cadastro com 90 minutos ativos gratuitos por dia, renovados às 13:00 BRT (Brasília) / 16:00 WET (Lisboa) (16:00 UTC).

## Overview

Quem trabalha remotamente ou acessa ferramentas globais no Brasil enfrenta um dilema diário: ao ligar uma VPN comum para proteger o Wi-Fi ou estabilizar rotas internacionais, transações **Pix**, o login do **Gov.br**, declarações na **Receita Federal** e aplicativos do **Nubank**, **Itaú**, **Bradesco** e **Banco do Brasil** passam a exigir selfie de segurança ou exibem erro de conexão. Isso acontece porque o túnel tradicional mascara até o tráfego nacional com um IP estrangeiro. Com **Global TUN** de camada L3 e **Smart Split**, é possível manter todo o sistema bancário na rota direta da **Claro**, **Vivo** ou **Oi** enquanto apenas o tráfego externo passa pelo túnel criptografado.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Por que VPNs tradicionais bloqueiam Pix, Gov.br e apps bancários](https://yivpn.net/pt/guides/vpn-sem-bloquear-pix-govbr-bancos-smart-split/#why-banks-block-vpn)
- [2. Túnel completo vs. Global TUN com Smart Split](https://yivpn.net/pt/guides/vpn-sem-bloquear-pix-govbr-bancos-smart-split/#full-tunnel-vs-smart-split)
- [3. Como funcionam Global TUN, Hysteria2 e VLESS+REALITY no YiVPN v1.0.14](https://yivpn.net/pt/guides/vpn-sem-bloquear-pix-govbr-bancos-smart-split/#global-tun-and-protocols)
- [4. Passo a passo de configuração e verificação via terminal](https://yivpn.net/pt/guides/vpn-sem-bloquear-pix-govbr-bancos-smart-split/#setup-and-cli-verify)
- [5. Teste diário de 90 minutos grátis, 3 dispositivos e planos YiPro](https://yivpn.net/pt/guides/vpn-sem-bloquear-pix-govbr-bancos-smart-split/#free-quota-and-yipro-pt)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Confirmar que o tráfego internacional sai pelo IP criptografado do túnel
curl.exe -s https://api.ipify.org; echo ""

# 2. Confirmar que o portal Gov.br responde diretamente com baixa latência
Test-NetConnection -ComputerName sso.acesso.gov.br -Port 443 | Select-Object ComputerName, RemoteAddress, TcpTestSucceeded

# 3. Validar o hash SHA-256 do instalador Windows (.msi)
Get-FileHash .\YIVPN_1.0.14_x64.msi -Algorithm SHA256
```

```bash
curl -s -o /dev/null -w "Gov.br HTTP: %{http_code} | TLS: %{time_appconnect}s | Total: %{time_total}s\n" https://www.gov.br/
curl -s https://api.ipify.org; echo ""
```

## Quick FAQ

**Q: Por que o Pix, o Nubank ou o Itaú pedem verificação facial ou bloqueiam o acesso com VPN ligada?**

Os motores antifraude bancários cruzam o ASN da operadora local (Claro, Vivo, Oi) com a geolocalização do dispositivo. Quando o aplicativo recebe uma requisição vinda de um IP estrangeiro ou de datacenter fora do Brasil, o sistema interpreta risco de invasão e exige nova validação ou bloqueia transferências Pix.

**Q: O Smart Split funciona também para Receita Federal, Gov.br e Banco do Brasil no desktop?**

Sim. No YiVPN v1.0.14, o modo Global TUN atua na camada L3 do sistema operacional, capturando navegadores, apps nativos e terminais. O perfil aberto singbox-smart-split garante que domínios .gov.br, Receita Federal, Banco do Brasil, Itaú, Bradesco, Nubank e sua rede LAN sigam diretamente pelo seu provedor.

**Q: E para quem alterna entre Brasil e Portugal, o MB WAY e bancos portugueses também ficam protegidos contra bloqueios?**

Sim. A lógica de roteamento local do Smart Split também preserva a compatibilidade com serviços financeiros portugueses como o MB WAY, evitando quedas de sessão ao autenticar pagamentos enquanto o tráfego internacional permanece criptografado.

**Q: Quanto custa o YiPro e como funcionam os 90 minutos grátis sem cadastro?**

Todos os dias você recebe 90 minutos ativos gratuitos sem e-mail nem cartão de crédito; o cronômetro pausa ao desconectar e reinicia às 13:00 BRT / 16:00 WET (16:00 UTC). Para uso ilimitado em até 3 dispositivos simultâneos, o plano YiPro parte de $2.99/mês ($6.99 trimestral ou $21.99/ano, equivalente a $1.83/mês).

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Como usar VPN no Brasil sem bloquear Pix, Gov.br e apps de bancos (Nubank, Itaú, Bradesco) via Smart Split](https://yivpn.net/pt/guides/vpn-sem-bloquear-pix-govbr-bancos-smart-split/)
- **Português Guides Hub**: [https://yivpn.net/pt/guides/](https://yivpn.net/pt/guides/) · [RSS Feed](https://yivpn.net/pt/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/pt/download/?ref=github-guides](https://yivpn.net/pt/download/?ref=github-guides)
- **Official Website (Português)**: [https://yivpn.net/pt/](https://yivpn.net/pt/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
