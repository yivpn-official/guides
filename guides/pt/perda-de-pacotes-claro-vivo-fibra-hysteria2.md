# Internet lenta à noite na Claro, Vivo e Oi Fibra para sites internacionais? Como o Hysteria2 reduz perda de pacotes

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/pt/guides/perda-de-pacotes-claro-vivo-fibra-hysteria2/)**.

- **Language**: `pt` (Português) · **Cluster**: `crossborder` · **Updated**: `2026-11-25`
- **Tested Environment**: Windows 11 / macOS 15 / Android 15 · YiVPN v1.0.14 (sing-box 1.14.3)
- **Keywords**: internet lenta à noite Claro Vivo Fibra, perda de pacotes rotas internacionais Brasil, Hysteria2 QUIC vs TCP over TCP, TIM Ultrafibra Oi Fibra ping alto, Smart Split Pix Gov.br Nubank, YiVPN VLESS REALITY sing-box

## Key Takeaways (TL;DR)

- Entre 19h e 23h (BRT), rotas internacionais saindo de São Paulo e Rio pela Claro, Vivo Fibra, Oi Fibra e TIM Ultrafibra (e MEO/NOS em Portugal) sofrem congestionamento de trânsito IP e perda de pacotes, derrubando túneis TCP.
- VPNs TCP-sobre-TCP amplificam travamentos por head-of-line blocking; já o Hysteria2 no YiVPN v1.0.14 (sing-box 1.14.3) usa QUIC/UDP com disablePathMTUDiscovery e cadeia curta de certificados para sustentar vazão.
- Quando redes corporativas ou operadoras filtram UDP, o VLESS+REALITY sobre TCP/443 assume como fallback estável, enquanto o Smart Split mantém Pix, Gov.br, Nubank, Itaú e Bradesco em rota direta.
- Você pode medir o ganho na sua própria linha sem cartão usando 90 minutos ativos grátis por dia (renova às 13:00 BRT / 16:00 Lisboa / 16:00 UTC) ou assinar o YiPro por $2.99/mês para 3 dispositivos.

## Overview

Se a sua conexão na **Claro**, **Vivo Fibra**, **Oi Fibra** ou **TIM Ultrafibra** (ou na **MEO** e **NOS**, em Portugal) bate velocidade máxima no medidor nacional, mas sofre travamentos, buffering e timeouts em serviços internacionais entre 19h e 23h, o problema raramente está no roteador da sua casa. Nesse horário de pico, o congestionamento nos enlaces internacionais entre São Paulo/Rio e América do Norte ou Europa gera perda de pacotes que derruba conexões TCP convencionais. Com o núcleo offline **`sing-box 1.14.3`** do **YiVPN v1.0.14**, o transporte **Hysteria2** (QUIC/UDP) reduz o impacto dessas perdas enquanto o **Smart Split** preserva **Pix**, **Gov.br**, **Nubank**, **Itaú** e **Bradesco** em rota direta.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. Por que rotas internacionais perdem pacotes à noite no Brasil e em Portugal](https://yivpn.net/pt/guides/perda-de-pacotes-claro-vivo-fibra-hysteria2/#evening-international-congestion)
- [2. TCP-sobre-TCP vs. Hysteria2 (QUIC/UDP) e VLESS+REALITY](https://yivpn.net/pt/guides/perda-de-pacotes-claro-vivo-fibra-hysteria2/#tcp-vs-hysteria2-comparison)
- [3. Como diagnosticar latência e perda de pacotes no terminal](https://yivpn.net/pt/guides/perda-de-pacotes-claro-vivo-fibra-hysteria2/#diagnose-packet-loss-terminal)
- [4. Mantendo Pix, Gov.br e bancos fora do túnel com Smart Split](https://yivpn.net/pt/guides/perda-de-pacotes-claro-vivo-fibra-hysteria2/#smart-split-brazil-banks)
- [5. Teste grátis diário de 90 minutos e planos YiPro](https://yivpn.net/pt/guides/perda-de-pacotes-claro-vivo-fibra-hysteria2/#free-test-and-yipro)

## Copyable Diagnostic & Config Snippets

```powershell
# 1. Confirmar que serviços locais (.gov.br) seguem em rota direta rápida
Test-NetConnection -ComputerName gov.br -Port 443 | Select-Object ComputerName, RemoteAddress, TcpTestSucceeded

# 2. Medir tempo de handshake TLS e resposta total até um endpoint internacional
curl.exe -o NUL -s -w "Connect: %{time_connect}s | TLS: %{time_appconnect}s | Total: %{time_total}s\n" https://api.github.com

# 3. Confirmar o IP de saída ativo quando o túnel Hysteria2 estiver conectado
curl.exe -s https://api.ipify.org; echo ""
```

## Quick FAQ

**Q: Por que o Speedtest local mostra 500 Mbps, mas sites dos EUA e Europa travam à noite na Claro, Vivo ou Oi Fibra?**

O teste nacional mede servidores dentro do próprio provedor ou no IX.br (São Paulo/Rio), sem atravessar enlaces submarinos. À noite, o gargalo acontece nas trocas de tráfego internacionais para América do Norte e Europa, onde 1% a 3% de perda de pacotes derruba a janela de congestionamento TCP.

**Q: Qual a diferença prática entre Hysteria2 e VLESS+REALITY quando há perda de pacotes ou filtro UDP?**

O Hysteria2 roda sobre QUIC/UDP e evita que um único pacote perdido trave todos os fluxos simultâneos, mantendo streaming, chamadas e APIs responsivos. Se uma rede Wi-Fi pública ou operadora limitar UDP, o VLESS+REALITY (TLS 1.3 na porta TCP/443) oferece alternativa estável.

**Q: Manter o Hysteria2 conectado vai bloquear Pix, Gov.br, Nubank, Itaú ou Bradesco?**

Não com o Smart Split ativado. O cliente YiVPN v1.0.14 roteia serviços brasileiros, bancos, Gov.br e rede local diretamente pelo seu IP da operadora, criptografando apenas o tráfego externo.

**Q: Posso testar se o Hysteria2 resolve a lentidão noturna no meu provedor antes de pagar?**

Sim. O YiVPN oferece 90 minutos ativos grátis todos os dias sem cadastro e sem cartão de crédito, com renovação diária às 13:00 BRT (16:00 Lisboa / 16:00 UTC). Se precisar de uso contínuo, o YiPro custa $2.99/mês para até 3 dispositivos.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Internet lenta à noite na Claro, Vivo e Oi Fibra para sites internacionais? Como o Hysteria2 reduz perda de pacotes](https://yivpn.net/pt/guides/perda-de-pacotes-claro-vivo-fibra-hysteria2/)
- **Português Guides Hub**: [https://yivpn.net/pt/guides/](https://yivpn.net/pt/guides/) · [RSS Feed](https://yivpn.net/pt/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/pt/download/?ref=github-guides](https://yivpn.net/pt/download/?ref=github-guides)
- **Official Website (Português)**: [https://yivpn.net/pt/](https://yivpn.net/pt/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
