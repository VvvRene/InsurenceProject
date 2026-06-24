# Windows — 使用 setup-and-run.cmd

本指南说明如何在 Windows 上运行仓库中的辅助脚本 `setup-and-run.cmd`，脚本会在需要时安装先决工具并使用 Docker Compose 启动应用。

## 目的

- 脚本会检查并安装或更新：`winget`、WSL2 和 Docker Desktop。
- 如果检测到 Docker Desktop，会启动它并等待 Docker 引擎就绪，然后执行 `docker compose build --pull` 和 `docker compose up -d`。

## 前置条件

- 一台可联网的 Windows 机器。
- 必须以管理员权限运行脚本（脚本会检查权限并在非提升状态下退出）。

## 快速操作步骤

1. 以管理员身份打开命令提示符：右键“命令提示符”→ 以管理员身份运行。
2. 切换到项目根目录（`setup-and-run.cmd` 所在目录）：

```cmd
cd \path\to\InsurenceProject
```

3. 运行脚本：

```cmd
setup-and-run.cmd
```

4. 成功时脚本会显示：

"Success. App is running at: http://localhost:3000"

## 脚本执行摘要

- 验证管理员权限。
- 确保 `winget` 可用（用于在缺失时安装 WSL/Docker）。
- 确保已安装 WSL 并将其设置为 WSL2，更新内核。
- 确保已安装或尝试更新 Docker Desktop，并启动它。
- 等待 Docker 引擎准备就绪。
- 执行 `docker compose build --pull`，随后 `docker compose up -d`。

## 常用命令（脚本完成后）

- 查看日志：

```cmd
docker compose logs -f
```

- 停止并删除服务：

```cmd
docker compose down
```

## 故障排查

- `ERROR: Please run this script as Administrator` — 请以管理员身份重新运行脚本。
- `ERROR: winget was not found` — 从 Microsoft Store 安装 “App Installer”，然后重试。
- WSL 安装可能需要重启 Windows 才能使 `wsl` 命令可用。
- 若 Docker CLI 在安装后仍不可用，打开一个新的终端会话（或注销并重新登录）后重试。
- 若未检测到 Docker Compose v2，请打开 Docker Desktop 设置启用 Compose v2，或安装包含 Compose v2 的 Docker Desktop 版本。

如果某一步安装失败，请根据脚本输出的具体错误提示进行处理。

## 手动替代（不使用脚本）

在提升权限的终端手动运行：

```cmd
:: 设置并更新 WSL2（可能需要下载并重启）
wsl --set-default-version 2
wsl --update

:: 启动 Docker Desktop 或确保服务运行，然后：
docker compose build --pull
docker compose up -d
```

## 参考位置

- 脚本位置： [setup-and-run.cmd](setup-and-run.cmd)
- 本指南： [doc/SETUP-WINDOWS.zh-CN.md](doc/SETUP-WINDOWS.zh-CN.md)

如需我也可以添加 PowerShell 版本或实现非提升权限时的提示提升脚本，告诉我你更倾向哪种方案。
