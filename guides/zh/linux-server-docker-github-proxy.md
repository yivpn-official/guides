# 云服务器与 Docker 拉不动 GitHub、Docker Hub、HuggingFace？一条命令不断 SSH 接入代理

> **Canonical 完整原文**：本文为 GitHub 速查版（含核心结论、章节直达目录、命令片段与 FAQ），完整对比表格、图文步骤与最新更新请访问官网原文：**[https://yivpn.net/guides/linux-server-docker-github-proxy/](https://yivpn.net/guides/linux-server-docker-github-proxy/)**

- **Language**: `zh` (简体中文) · **Cluster**: `dev` · **Updated**: `2026-11-25`
- **Tested Environment**: Ubuntu 24.04 / Debian 12 (阿里云 ECS / 腾讯云 CVM) · yivpn-agent-cli v2.2.1
- **Keywords**: 云服务器GitHub代理, Docker Hub拉取超时, Linux不断SSH代理, HuggingFace下载加速, yivpn-agent-cli, 易VPN

## 核心结论速览（TL;DR）

- 在阿里云 ECS、腾讯云 CVM 等无图形界面的云服务器上开启全局 TUN 或修改系统代理会直接切断入站 SSH（TCP 22）或污染系统默认路由；必须使用仅绑定本地回环 127.0.0.1:10808 的无头代理守护进程。
- 在国内服务器尚未连上代理前，切勿直接运行 npx github:... 拉取仓库脚本，应从国内直连可达的一方镜像 https://yivpn.net/vpn-api/yivpn-agent.mjs 下载并核对 SHA-256 哈希。
- 执行 node ~/.yivpn-agent/yivpn-agent.mjs connect --auto-trial 即可零注册开启 $0（90 分钟 / 1 GiB ohio3 节点）云端试用，且严禁在 Linux 云主机上追加 --system-proxy 参数。
- 将 HTTPS_PROXY=http://127.0.0.1:10808 精准注入 git clone、docker build、Docker systemd 或 huggingface-cli，同时在 NO_PROXY 保留阿里云/腾讯云内网与国内镜像源，即可兼顾拉包速度与 SSH 稳定性。

## 摘要

在阿里云 ECS、腾讯云 CVM 或华为云 Linux 实例上部署开源项目、构建 Docker 镜像或微调 HuggingFace 模型时，`git clone github.com` 超时、`docker pull` 卡在 `TLS handshake timeout`、`huggingface-cli` 断流是最常见的工程阻塞。许多运维和开发者尝试在云主机上直接开启全局 TUN VPN，结果命令刚敲完，**SSH 终端就瞬间失联**。根本解法在于：**不碰主机默认路由表，用 [yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli) `v2.2.1` 在本地回环地址 `127.0.0.1:10808` 拉起纯无头（Headless）代理网关，仅按需向 Git、Docker 与 Python 工具链注入环境变量。**

## 完整正文目录（直达官网对应章节）

- [一、为什么云服务器一开全局 TUN 或系统代理就断 SSH？](https://yivpn.net/guides/linux-server-docker-github-proxy/#why-global-tun-breaks-ssh)
- [二、零依赖下载 yivpn-agent-cli v2.2.1 并启动 127.0.0.1:10808 网关](https://yivpn.net/guides/linux-server-docker-github-proxy/#install-and-connect-yivpn-agent)
- [三、GitHub、Docker 构建、HuggingFace 与 pip 精准分流配置](https://yivpn.net/guides/linux-server-docker-github-proxy/#configure-git-docker-huggingface)
- [四、云端试用与桌面端免费额度、YiPro 正式版对比](https://yivpn.net/guides/linux-server-docker-github-proxy/#cloud-trial-vs-desktop-yipro)

## 可直接复制的排查 / 配置命令

```bash
# 1. 创建本地目录并从国内直连镜像下载 yivpn-agent-cli v2.2.1
mkdir -p ~/.yivpn-agent
curl -fsSL https://yivpn.net/vpn-api/yivpn-agent.mjs -o ~/.yivpn-agent/yivpn-agent.mjs

# 2. 校验文件 SHA-256 哈希，确保脚本未被篡改
echo "6dc9cab1175e626726c56eb63e4af15473aee8eefb6c396f53a8b7930badef63  $HOME/.yivpn-agent/yivpn-agent.mjs" | sha256sum -c -

# 3. 零注册启动云端 $0 试用（90 分钟 / 1 GiB ohio3 节点），仅绑定 127.0.0.1:10808
node ~/.yivpn-agent/yivpn-agent.mjs connect --auto-trial

# 4. 验证本地端口与隧道连通性（测试完国内直连对比请用 --noproxy "*"）
curl -fsSL -x http://127.0.0.1:10808 -I https://github.com
curl -fsSL --noproxy "*" -I https://mirrors.aliyun.com
```

```bash
# --- 场景 A：当前终端临时加速 git clone、huggingface-cli 与 pip ---
export HTTP_PROXY="http://127.0.0.1:10808"
export HTTPS_PROXY="http://127.0.0.1:10808"
export NO_PROXY="localhost,127.0.0.1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,100.100.100.200,169.254.169.254,.aliyuncs.com,.myqcloud.com,mirrors.aliyun.com,pypi.tuna.tsinghua.edu.cn"

git clone https://github.com/vllm-project/vllm.git
huggingface-cli download Qwen/Qwen2.5-7B-Instruct --local-dir ./qwen-7b

# --- 场景 B：让 Docker 守护进程 (docker pull) 走本地代理 ---
sudo mkdir -p /etc/systemd/system/docker.service.d
cat <<'EOF' | sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:10808"
Environment="HTTPS_PROXY=http://127.0.0.1:10808"
Environment="NO_PROXY=localhost,127.0.0.1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.aliyuncs.com,.tencentyun.com"
EOF
sudo systemctl daemon-reload && sudo systemctl restart docker

# --- 场景 C：在 docker build 阶段让容器内 apt/pip/git 共享宿主机 127.0.0.1:10808 ---
docker build --network=host \
  --build-arg HTTP_PROXY=http://127.0.0.1:10808 \
  --build-arg HTTPS_PROXY=http://127.0.0.1:10808 \
  --build-arg NO_PROXY="localhost,127.0.0.1,mirrors.aliyun.com" \
  -t my-app:latest .
```

## 常见问题速答（FAQ）

**Q: 为什么在 Linux 云服务器上开全局 VPN 或 TUN 模式，SSH 终端会立刻卡死掉线？**

全局 TUN 会接管主机的默认路由表（0.0.0.0/0），导致你的本地电脑发往云服务器公网 IP TCP 22 端口的 SSH 回程数据包被误送进海外加密隧道，形成非对称路由丢包。使用 yivpn-agent-cli 仅监听 127.0.0.1:10808 而不改动内核路由表，入站 SSH 会话完全不受影响。

**Q: 为什么不能在云服务器上直接用 npx github:yivpn-official/yivpn-agent-cli？**

因为国内云服务器在代理启动前通常无法直连 github.com 或 raw.githubusercontent.com，执行 npx github:... 会直接卡在克隆超时阶段。先通过 https://yivpn.net/vpn-api/yivpn-agent.mjs 一方直连下载并保存到 ~/.yivpn-agent/yivpn-agent.mjs 是最稳妥的做法。

**Q: Docker build 为什么配置了终端环境变量 HTTPS_PROXY 还是无法访问 Docker Hub 或 GitHub？**

Docker 构建由后台独立的 dockerd 守护进程执行，普通 Shell 里的 export 不会自动传入守护进程，也不会注入容器构建内部网络。拉取基础镜像需在 /etc/systemd/system/docker.service.d/http-proxy.conf 中为 dockerd 配置代理，而 Dockerfile 内部下载源码需在 docker build 时显式传递 --build-arg HTTPS_PROXY=http://127.0.0.1:10808（或配合 --network=host）。

**Q: 云端 --auto-trial 试用耗尽后，如何切换到正式套餐？支持多少台设备？**

云端 --auto-trial 提供 $0（90 分钟 / 1 GiB 流量）ohio3 节点零门槛验证；如果需要长期在云服务器、主力开发机与手机间复用，可在易VPN 桌面端每日享受 90 分钟免费额度（北京时间 00:00 重置），或升级 YiPro 方案（¥19.90/月、¥49.90/季、¥159.90/年，支持 3 台设备同时在线）并使用匿名激活码 YIVP-XXXX-XXXX-XXXX 在服务器上无头登录。

---

### 官方入口与延伸资源

- **完整原文**：[云服务器与 Docker 拉不动 GitHub、Docker Hub、HuggingFace？一条命令不断 SSH 接入代理](https://yivpn.net/guides/linux-server-docker-github-proxy/)
- **中文教程中心**：[https://yivpn.net/guides/](https://yivpn.net/guides/) · [RSS 订阅](https://yivpn.net/guides/rss.xml)
- **下载客户端（每天免费 90 分钟，免注册）**：[https://yivpn.net/download/?ref=github-guides](https://yivpn.net/download/?ref=github-guides)
- **官方 Release 与 SHA-256 校验仓**：[yivpn-official/yivpn](https://github.com/yivpn-official/yivpn)
- **开源智能分流规则生成器**：[yivpn-official/singbox-smart-split](https://github.com/yivpn-official/singbox-smart-split)
- **AI Agent CLI & 本地 MCP**：[yivpn-official/yivpn-agent-cli](https://github.com/yivpn-official/yivpn-agent-cli)
