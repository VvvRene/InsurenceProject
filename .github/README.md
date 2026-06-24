# 在 Windows 本地运行

此项目可以在 Windows 本地运行。推荐且最简单的方法是从 GitHub 下载仓库并使用附带的 `setup-and-run.cmd` 脚本准备环境并通过 Docker Compose 启动应用。

## 1) 下载仓库

- 使用 Git 克隆（将 `<owner>/<repo>` 替换为实际仓库路径）：

```bash
git clone https://github.com/<owner>/<repo>.git
cd InsurenceProject
```

- 或从 GitHub 下载 ZIP 并解压到一个文件夹，然后在该文件夹打开终端。

## 2) 推荐：运行辅助脚本（以管理员身份）

仓库包含 `setup-and-run.cmd`，该脚本会检查/安装 `winget`、WSL2 和 Docker Desktop（如可能），启动 Docker Desktop，等待 Docker 引擎就绪，然后执行 `docker compose build --pull` 和 `docker compose up -d`。

> 如果你在 Windows 上运行 Docker Desktop 或 WSL2 时遇到虚拟化相关错误，请先启用 Windows PC 的虚拟化支持。
>
> 1. 重启电脑并进入 BIOS/UEFI 设置。
>
>    ``` 
>    cmd:
>    
>    shutdown -r -fw -t 0
>    ```
> 2. 找到与虚拟化相关的选项，例如 `Intel VT-x`、`Intel Virtualization Technology`、`AMD-V`、`SVM Mode` 或 `Virtualization Technology`。
> 3. 将其设置为启用（Enabled），保存设置并退出。
> 4. 重新启动 Windows，然后确保在“控制面板 → 程序和功能 → 启用或关闭 Windows 功能”中启用了“适用于 Linux 的 Windows 子系统”和“虚拟机平台”。
> 5. 如果更改后需要立即重启，请在管理员命令提示符中运行：
>
> 这一步通常对运行 Docker Desktop、WSL2 和基于容器的开发环境至关重要。

操作步骤：

1. 以管理员权限打开命令提示符（右键 → 以管理员身份运行）。
2. 切换到项目根目录（`setup-and-run.cmd` 所在目录）。

```cmd
cd \path\to\InsurenceProject
setup-and-run.cmd
```

3. 成功运行后，脚本会输出：`Success. App is running at: http://localhost:3000`。

更多 Windows 详细说明和故障排查，请参阅 `doc/SETUP-WINDOWS.md`。

## 3) 手动替代（如不使用脚本）

如果你不想使用辅助脚本，可以在提升权限的终端手动运行：

```cmd
:: 确保 WSL2 已启用并更新
wsl --set-default-version 2
wsl --update

:: 使用 Docker Compose 构建并启动
docker compose build --pull
docker compose up -d
```

然后在浏览器打开 `http://localhost:3000`。

## 常用 Docker Compose 命令

- 查看日志：

```cmd
docker compose logs -f
```

- 停止并移除容器：

```cmd
docker compose down
```

## 故障排查提示

- 以管理员身份运行 `setup-and-run.cmd`，否则脚本会在权限不足时退出。
- 若缺少 `winget`，请从 Microsoft Store 安装 “App Installer”，或参考 `doc/SETUP-WINDOWS.md` 中的手动步骤。
- 如果安装 Docker 后仍无法使用 Docker CLI，请打开新终端或注销后重新登录。

## 参考

- 辅助脚本： `setup-and-run.cmd`
- Windows 指南： `doc/SETUP-WINDOWS.md`

如需，我可以把克隆 URL 替换为仓库的真实 GitHub 地址，或添加 PowerShell 版本的辅助脚本。告诉我你想要哪一个。

启动带 HMR 的开发服务器：

```bash
npm run dev
```

应用运行在 `http://localhost:5173`。

## 构建生产版本

生成生产构建：

```bash
npm run build
```

## 部署

### 使用 Docker 部署

构建并运行 Docker 镜像：

```bash
docker build -t my-app .

# 运行容器
docker run -p 3000:3000 my-app
```

容器化应用可部署到任何支持 Docker 的平台，例如：

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### 手动部署（DIY）

如果熟悉部署 Node 应用，内置的服务器已具备生产条件。确保部署 `npm run build` 的输出目录。示例目录结构：

```
├── package.json
├── package-lock.json (或 pnpm-lock.yaml, 或 bun.lockb)
├── build/
│   ├── client/    # 静态资源
│   └── server/    # 服务端代码
```

## 样式

该模板已配置 Tailwind CSS，提供一个简单的默认样式体验；你也可以使用任意喜欢的 CSS 框架。

---

由 ❤️ 与 React Router 构建。
