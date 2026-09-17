---
name: caddy-sqlite-devops
description: Operational guidelines for deploying with Caddy reverse proxy, HTTPS, managing production Next.js builds, and ensuring safe SQLite backups in production. Use when deploying, configuring Caddy, or managing backups.
---

# Caddy, Deployment & SQLite Production Ops

This skill provides system administration and deployment practices for running the church portal with Next.js, Caddy, and SQLite.

## 1. Caddy Reverse Proxy & HTTPS (`Caddyfile`)
Caddy serves as the public entry point, automating TLS certificates and asset compression.

**Production `Caddyfile` Pattern**:
```caddy
adventist-dushanbe.tj, www.adventist-dushanbe.tj {
    encode zstd gzip

    # Security Headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # Static Cache Optimization
    @static {
        path /_next/static/* /images/* /favicon.ico /icon.svg
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Reverse Proxy to Next.js standalone or PM2
    reverse_proxy 127.0.0.1:3000 {
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }
}
```

## 2. SQLite Reliability in Production
SQLite is embedded and fast, but requires specific settings for concurrent web access:
- **WAL Mode (Write-Ahead Logging)**:
  Ensure SQLite operates in WAL mode for concurrent readers and writers without lock contention:
  ```bash
  sqlite3 db/custom.db "PRAGMA journal_mode=WAL;"
  sqlite3 db/custom.db "PRAGMA busy_timeout=5000;"
  ```
- **Live Safe Backups**:
  Never copy the `.db` file directly with `cp` while the server is writing. Always use the atomic `.backup` command:
  ```bash
  # Cron script: scripts/backup-db.sh
  mkdir -p ./db/backups
  TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
  sqlite3 db/custom.db ".backup './db/backups/db_${TIMESTAMP}.sqlite'"
  # Keep only last 14 backups
  find ./db/backups -name "db_*.sqlite" -mtime +14 -delete
  ```

## 3. Production Build & Startup Flow
Standard release sequence:
```bash
# 1. Pull changes & install dependencies
git pull
bun install --frozen-lockfile

# 2. Database migrations
bunx prisma db push # or prisma migrate deploy

# 3. Compile optimized build
bun run build

# 4. Reload process manager (PM2 / Systemd)
pm2 reload church-web || pm2 start "bun start" --name church-web
```
