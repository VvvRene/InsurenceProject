# Windows — Using setup-and-run.cmd

This guide explains how to run the repository's Windows helper script [setup-and-run.cmd](setup-and-run.cmd) to install prerequisites (if necessary) and start the app using Docker Compose.

## Purpose

- The script checks for and installs or updates: `winget`, WSL2, and Docker Desktop.
- It starts Docker Desktop (if present), waits for the Docker engine, then runs `docker compose build --pull` and `docker compose up -d`.

## Prerequisites

- A Windows machine with internet access.
- You must run the script as an Administrator (the script will check for admin rights and exit if not elevated).

## Quick steps

1. Open an elevated Command Prompt: right-click Command Prompt → Run as administrator.
2. Change directory to the project root (where `setup-and-run.cmd` lives):

```cmd
cd \path\to\InsurenceProject
```

3. Run the script:

```cmd
setup-and-run.cmd
```

4. On success the script prints:

"Success. App is running at: http://localhost:3000"

## What the script does (summary)

- Verifies administrative privileges.
- Ensures `winget` is available (used to install WSL/Docker if missing).
- Ensures WSL is installed and set to WSL2, and updates the kernel.
- Ensures Docker Desktop is installed (or attempts to update it) and launches it.
- Waits for the Docker engine to become ready.
- Runs `docker compose build --pull` then `docker compose up -d`.

## Useful commands (after the script completes)

- Follow logs:

```cmd
docker compose logs -f
```

- Stop/teardown the app:

```cmd
docker compose down
```

## Troubleshooting

- ERROR: Please run this script as Administrator — re-run using an elevated Command Prompt.
- ERROR: winget was not found — install "App Installer" from the Microsoft Store, then re-run.
- WSL installs may require you to restart Windows before `wsl` becomes available.
- If Docker CLI is not found after installation, open a new terminal session (or sign out and back in) and re-run the script.
- If Docker Compose v2 is not available, open Docker Desktop and enable Compose v2 in settings (or install a Docker Desktop release that includes Compose v2).

If an installation step fails, read the specific error printed by the script and follow the hint shown.

## Manual alternative (if you prefer not to use the script)

Run these steps yourself in an elevated terminal:

```cmd
:: Ensure WSL2 (may require download/restart)
wsl --set-default-version 2
wsl --update

:: Start Docker Desktop (or ensure the service is running), then:
docker compose build --pull
docker compose up -d
```

## Where to look next

- Script location: [setup-and-run.cmd](setup-and-run.cmd)
- This guide: [doc/SETUP-WINDOWS.md](doc/SETUP-WINDOWS.md)

If you want, I can also add a short PowerShell variant or a non-elevated check that prompts to elevate — tell me which option you prefer.
