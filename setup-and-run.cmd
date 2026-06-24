@echo off
setlocal EnableExtensions EnableDelayedExpansion
set "EXITCODE=1"

cd /d "%~dp0"

echo [1/4] Checking WSL2...
call :require_admin
if errorlevel 1 goto :end

call :ensure_winget
if errorlevel 1 goto :end

call :ensure_wsl2
if errorlevel 1 goto :end

echo [2/4] Checking Docker Desktop...
call :ensure_docker
if errorlevel 1 goto :end

echo [3/4] Waiting for Docker engine...
call :wait_for_docker
if errorlevel 1 goto :end

echo [4/4] Building and starting app with Docker Compose...
docker compose version >nul 2>&1
if errorlevel 1 (
  echo ERROR: Docker Compose v2 is not available.
  echo Open Docker Desktop and make sure Docker Compose is enabled.
  goto :end
)

docker compose build --pull
if errorlevel 1 (
  echo ERROR: docker compose build failed.
  goto :end
)

docker compose up -d
if errorlevel 1 (
  echo ERROR: docker compose up failed.
  goto :end
)

echo.
echo Success.
echo App is running at: http://localhost:3000
echo Show logs with: docker compose logs -f
echo Stop with: docker compose down
set "EXITCODE=0"
goto :end

:require_admin
net session >nul 2>&1
if errorlevel 1 (
  echo ERROR: Please run this script as Administrator.
  exit /b 1
)
exit /b 0

:ensure_winget
where winget >nul 2>&1
if errorlevel 1 (
  echo ERROR: winget was not found.
  echo Install App Installer from Microsoft Store, then run this script again.
  exit /b 1
)
exit /b 0

:ensure_wsl2
set "WSL_NEW_INSTALL=0"
where wsl >nul 2>&1
if errorlevel 1 (
  echo WSL not found. Installing Microsoft.WSL via winget...
  winget install --id Microsoft.WSL --source winget --accept-package-agreements --accept-source-agreements
  if errorlevel 1 (
    echo ERROR: Failed to install WSL.
    exit /b 1
  )
  set "WSL_NEW_INSTALL=1"
) else (
  echo WSL found. Updating...
)

where wsl >nul 2>&1
if errorlevel 1 (
  echo ERROR: WSL installation finished but command is not available yet.
  echo Restart your terminal, then run this script again.
  exit /b 1
)

if "%WSL_NEW_INSTALL%"=="1" (
  echo Enabling WSL optional components...
  wsl --install --no-distribution >nul 2>&1
)

echo Setting WSL default version to 2...
wsl --set-default-version 2
if errorlevel 1 (
  echo ERROR: Failed to set WSL default version to 2.
  exit /b 1
)

echo Updating WSL kernel...
wsl --update
if errorlevel 1 (
  echo WARNING: WSL update may require a restart.
)
exit /b 0

:ensure_docker
set "DOCKER_NEW_INSTALL=0"
where docker >nul 2>&1
if errorlevel 1 (
  echo Docker not found. Installing Docker Desktop via winget...
  winget install --id Docker.DockerDesktop --source winget --accept-package-agreements --accept-source-agreements --disable-interactivity
  if errorlevel 1 (
    echo ERROR: Failed to install Docker Desktop.
    exit /b 1
  )
  set "DOCKER_NEW_INSTALL=1"
) else (
  echo Docker found. Attempting update via winget...
  call :try_update_docker
)

set "PATH=%ProgramFiles%\Docker\Docker\resources\bin;!PATH!"
where docker >nul 2>&1
if errorlevel 1 (
  if "%DOCKER_NEW_INSTALL%"=="1" (
    echo ERROR: Docker was installed but the CLI is not available in this session yet.
    echo Open a new terminal ^(or sign out and in^), then run this script again.
    exit /b 1
  )
  echo ERROR: Docker CLI is not available in PATH.
  exit /b 1
)

if exist "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" (
  start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
)
exit /b 0

:try_update_docker
winget upgrade --id Docker.DockerDesktop --source winget --accept-package-agreements --accept-source-agreements --disable-interactivity >nul 2>&1
if errorlevel 1 (
  echo NOTE: Docker update failed or skipped. Continuing with current Docker installation.
  exit /b 0
)
echo Docker Desktop update completed (or already at latest version).
exit /b 0

:wait_for_docker
set /a RETRIES=90
:wait_loop
docker version >nul 2>&1
if not errorlevel 1 exit /b 0

set /a RETRIES-=1
if !RETRIES! LEQ 0 (
  echo ERROR: Docker engine did not become ready in time.
  exit /b 1
)

echo Waiting for Docker to become ready...
timeout /t 2 /nobreak >nul
goto :wait_loop

:end
endlocal & exit /b %EXITCODE%
