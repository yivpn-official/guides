# Claude Code·Cursor·Codex 터미널 프록시 및 로컬 MCP 자동 라우팅 설정 완벽 가이드

> **Canonical Full Guide**: This GitHub playbook provides the TL;DR summary, deep-linked section outline, copyable diagnostic snippets, and FAQ. Read the complete article with full comparison tables and latest updates on **[yivpn.net](https://yivpn.net/ko/guides/ai-coding-tools-proxy/)**.

- **Language**: `ko` (한국어) · **Cluster**: `dev` · **Updated**: `2026-11-27`
- **Tested Environment**: Windows 11 / macOS 15 / WSL2 · YiVPN v1.0.14 (sing-box 1.14.3) · yivpn-agent-cli v2.2.1
- **Keywords**: Claude Code 프록시 설정, Cursor HTTP2 오류, Codex CLI 타임아웃, WSL2 Docker 프록시, 로컬 MCP 라우팅, yivpn-agent-cli

## Key Takeaways (TL;DR)

- OS 기본 '시스템 프록시'는 브라우저 전용 레지스트리만 제어하므로 Node.js(Claude Code), Python/Rust CLI(Codex), SSH(git@github.com), WSL2 및 Docker 빌드 트래픽은 이를 무시하고 타임아웃을 겪기 쉽습니다.
- YiVPN v1.0.14는 100% 오프라인 내장 sing-box 1.14.3 코어 기반 Layer-3 Global TUN과 singbox-smart-split을 결합해, AI API만 Hysteria2 또는 VLESS+REALITY로 우회하고 네이버·카카오·토스 및 국내 패키지 미러는 KT·SKB·LG U+ 직결로 유지합니다.
- 가상 NIC 사용이 제한된 사내 PC나 원격 서버에서는 yivpn-agent-cli v2.2.1(로컬 게이트웨이 127.0.0.1:10808)과 NO_PROXY를 조합하거나, 데스크톱 로컬 MCP(127.0.0.1:38419)의 preview_routing_rules·rollback_routing_rules로 안전하게 규칙을 자동화할 수 있습니다.
- 회원가입·카드 등록 없이 매일 90분 무료(한국 시간 매일 01:00 KST 리셋)로 검증 가능하며, YiPro는 $2.99/월($6.99/분기·$21.99/년)로 최대 3대 기기 동시 접속을 지원합니다.

## Overview

판교나 강남 오피스, 혹은 재택 **KT·SK브로드밴드·LG U+** 환경에서 **Cursor**, **Claude Code**, **OpenAI Codex CLI**를 실무에 도입한 개발자들이 가장 자주 겪는 장애는 **“브라우저는 멀쩡한데 터미널 AI 도구만 `ETIMEDOUT`이나 HTTP/2 연결 끊김으로 멈추는 현상”**입니다. 이는 OS의 **시스템 프록시(System Proxy)**가 브라우저 중심으로 설계되어 있어 CLI·SSH·WSL2·Docker 프로세스를 포착하지 못하기 때문입니다. 이 글에서는 **Layer-3 Global TUN + Smart Split**, **명시적 `NO_PROXY` 환경 변수**, 그리고 **로컬 MCP(`127.0.0.1:38419`) 자동 라우팅** 세 가지 실전 해법을 정리합니다.

## Full Guide Outline (Deep Links to yivpn.net)

- [1. 시스템 프록시가 CLI·SSH·WSL2·Docker에서 실패하는 이유](https://yivpn.net/ko/guides/ai-coding-tools-proxy/#why-system-proxy-fails-cli)
- [2. 방법 A(최우선 권장): Layer-3 Global TUN + Smart Split으로 무설정 통합](https://yivpn.net/ko/guides/ai-coding-tools-proxy/#option-a-global-tun-smart-split)
- [3. 방법 B: 제한된 사내 PC·WSL2용 yivpn-agent-cli 및 NO_PROXY 설정](https://yivpn.net/ko/guides/ai-coding-tools-proxy/#option-b-cli-and-no-proxy)
- [4. 방법 C: 로컬 MCP(127.0.0.1:38419) 연동으로 AI Agent가 직접 분기 규칙 제어](https://yivpn.net/ko/guides/ai-coding-tools-proxy/#option-c-local-mcp)

## Copyable Diagnostic & Config Snippets

```bash
# macOS / Linux / WSL2 (~/.zshrc 또는 ~/.bashrc)
export HTTPS_PROXY="http://127.0.0.1:10808"
export ALL_PROXY="socks5h://127.0.0.1:10808"
export NO_PROXY="localhost,127.0.0.1,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.kr,naver.com,kakao.com,toss.im,.internal,.local"

# Windows PowerShell (현재 터미널 세션용 동일 설정)
# $env:HTTPS_PROXY = "http://127.0.0.1:10808"
# $env:NO_PROXY = "localhost,127.0.0.1,192.168.*,10.*,.kr,naver.com,kakao.com,toss.im"
# curl.exe -I --max-time 8 https://api.anthropic.com
```

```json
{
  "mcpServers": {
    "yivpn": {
      "command": "npx",
      "args": ["-y", "yivpn-agent-cli@latest", "mcp"],
      "env": {
        "YIVPN_MCP_ENDPOINT": "http://127.0.0.1:38419"
      }
    }
  }
}
```

## Quick FAQ

**Q: 웹 브라우저에서는 Claude와 GitHub가 잘 열리는데, 왜 터미널의 claude나 codex 명령만 타임아웃이 발생하나요?**

Windows WinINet이나 macOS 시스템 프록시는 주로 Chromium 계열 브라우저 UI만 참조합니다. 반면 Claude Code(Node.js), Codex CLI, Git SSH(TCP 22), WSL2 NAT 가상 네트워크, Docker 데몬은 시스템 프록시를 건너뛰고 물리 NIC로 직접 패킷을 보냅니다. Layer-3 Global TUN을 켜거나 터미널에 HTTPS_PROXY를 명시해야 해결됩니다.

**Q: Global TUN을 켜면 네이버·카카오톡·토스나 사내 GitLab, 국내 npm/PyPI 미러 속도가 느려지지 않나요?**

그렇지 않습니다. YiVPN의 오픈소스 singbox-smart-split 엔진은 .kr 도메인, 네이버·카카오·토스·시중 은행, 국내 패키지 미러(예: Kakao/KAIST 미러) 및 사설 대역(192.168.0.0/16, 10.0.0.0/8)을 KT·SK브로드밴드·LG U+ 원래 회선으로 직결(DIRECT) 처리해 지연이 없습니다.

**Q: 로컬 MCP(127.0.0.1:38419)에 라우팅 제어를 맡기면 소스 코드가 외부로 전송되거나 네트워크가 망가지지 않나요?**

안전하게 격리되어 있습니다. 데스크톱 로컬 MCP 엔드포인트는 오직 루프백 127.0.0.1:38419에서만 수신하며 프로젝트 소스 코드를 읽지 않습니다. 또한 규칙 적용 전 preview_routing_rules로 영향 범위를 검증하고, 이상 시 rollback_routing_rules로 즉시 직전 스냅샷으로 되돌릴 수 있습니다.

**Q: 무료 체험 90분은 언제 초기화되며, 팀 작업이나 여러 기기에서도 쓸 수 있나요?**

무료 체험은 이메일·카드 등록 없이 즉시 사용 가능하며 연결을 끊으면 시간이 멈춥니다. 매일 서울 시간 01:00 KST(16:00 UTC)에 90분이 새로 충전됩니다. 노트북·데스크톱·테스트 폰 등 여러 기기에서 상시 개발하려면 YiPro($2.99/월, $6.99/분기, $21.99/년)로 최대 3대 동시 접속이 가능합니다.

---

### Official Links & Resources

- **Read Full Guide on yivpn.net**: [Claude Code·Cursor·Codex 터미널 프록시 및 로컬 MCP 자동 라우팅 설정 완벽 가이드](https://yivpn.net/ko/guides/ai-coding-tools-proxy/)
- **한국어 Guides Hub**: [https://yivpn.net/ko/guides/](https://yivpn.net/ko/guides/) · [RSS Feed](https://yivpn.net/ko/guides/rss.xml)
- **Download YiVPN (90 Min Free Daily, No Sign-Up)**: [https://yivpn.net/ko/download/?ref=github-guides](https://yivpn.net/ko/download/?ref=github-guides)
- **Official Website (한국어)**: [https://yivpn.net/ko/](https://yivpn.net/ko/)
- **Official Releases & SHA-256 Checksums**: [yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **Open-Source Smart Split Rules**: [yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & Local MCP**: [yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
