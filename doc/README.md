# Run locally on Windows

This project can be run locally on Windows. The recommended, easiest path is to download the repository from GitHub and use the included `setup-and-run.cmd` helper to prepare the environment and start the app using Docker Compose.

## 1) Download the repository

- Clone using Git (replace `<owner>/<repo>` with the actual repo path):

```bash
git clone https://github.com/<owner>/<repo>.git
cd InsurenceProject
```

- Or download the ZIP from GitHub and extract it to a folder, then open a terminal in that folder.

## 2) Recommended: run the helper script (Administrator)

The repository includes `setup-and-run.cmd` which checks/installs `winget`, WSL2, and Docker Desktop (when possible), launches Docker Desktop, waits for the Docker engine, then runs `docker compose build --pull` and `docker compose up -d`.

Steps:

1. Open an elevated Command Prompt (right-click → Run as administrator).
2. Change to the project root (where `setup-and-run.cmd` is located).

```cmd
cd \path\to\InsurenceProject
setup-and-run.cmd
```

3. On success the script prints: `Success. App is running at: http://localhost:3000`.

See `doc/SETUP-WINDOWS.md` for more detailed Windows-specific notes and troubleshooting.

## 3) Manual alternative (if you prefer to run steps yourself)

If you prefer not to use the helper script, run these commands in an elevated terminal:

```cmd
:: Ensure WSL2 is enabled and updated
wsl --set-default-version 2
wsl --update

:: Build and start the app with Docker Compose
docker compose build --pull
docker compose up -d
```

Open your browser at `http://localhost:3000` to access the app.

## Useful Docker Compose commands

- Follow logs:

```cmd
docker compose logs -f
```

- Stop and remove containers:

```cmd
docker compose down
```

## Troubleshooting hints

- Run `setup-and-run.cmd` as Administrator — the script will exit if not elevated.
- If `winget` is missing, install "App Installer" from Microsoft Store or use the manual steps in `doc/SETUP-WINDOWS.md`.
- If Docker CLI isn't available after installation, open a new terminal or sign out and sign in again.

## References

- Helper script: `setup-and-run.cmd`
- Windows guide: `doc/SETUP-WINDOWS.md`

If you'd like, I can update the clone URL to the repository's real GitHub path and add a short PowerShell variant of the helper script. Tell me the repo URL or which variant you prefer.
