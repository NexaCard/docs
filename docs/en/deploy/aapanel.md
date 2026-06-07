# Manually Deploy Using aaPanel (Based on Releases Archive)

> Last Updated: 2026-02-27

If you have not chosen a deployment method yet, start with [Deployment Overview and Selection Guide](/en/deploy/).

This document is for deploying using the compiled artifacts provided in the repository Releases.

Features:

- No need to `git clone` the source code on the server
- No need to run `go build` / `npm run build` on the server
- Only involves "Upload (or Download) → Extract → Configure → Start"

## 1. Panel and Software Preparation

Install in aaPanel:

- Nginx
- PM2 manager (or Supervisor)
- Extraction tools (`unzip` / `tar`)
- Redis (if needed)
- PostgreSQL (if needed)

> This deployment method does not rely on Git, Go, or Node.js build environment.

## 2. Prepare Directories

```bash
mkdir -p /www/wwwroot/nexacard/{api,user,admin}
cd /www/wwwroot/nexacard
```
## 3. Download and Extract the Release Package

Please download the corresponding version package from the Releases of the following repositories (it is recommended that all three ends use the same version number):

- API (main project): `https://github.com/NexaCard/API/releases`
- User (user front-end): `https://github.com/NexaCard/user/releases`
- Admin (back-end): `https://github.com/NexaCard/admin/releases`

Example (replace the file name with your actual Release artifact):

> The API package follows GoReleaser naming rules: `nexacard-api_<tag>_Linux_x86_64.tar.gz`, for example `nexacard-api_v1.0.0_Linux_x86_64.tar.gz`.
> Example User package name: `nexacard-user-v1.0.0.zip`.
> Example Admin package name: `nexacard-admin-v1.0.0.zip`.

```bash
# API
wget -O api.tar.gz https://github.com/NexaCard/API/releases/download/v1.0.0/nexacard-api_v1.0.0_Linux_x86_64.tar.gz
mkdir -p api && tar -xzf api.tar.gz -C api

# User
wget -O user.zip https://github.com/NexaCard/user/releases/download/v1.0.0/nexacard-user-v1.0.0.zip
mkdir -p user && unzip -o user.zip -d user

# Admin
wget -O admin.zip https://github.com/NexaCard/admin/releases/download/v1.0.0/nexacard-admin-v1.0.0.zip
mkdir -p admin && unzip -o admin.zip -d admin
```
> After extracting the API package, the `/www/wwwroot/nexacard/api` directory should contain:
> - `config.yml.example`
> - `nexacard`
> - `README.md`

## 4. Deploy the API (no compilation required)

Make sure the API extraction directory contains the following files: `config.yml.example`, `nexacard`, `README.md`.

```bash
cd /www/wwwroot/nexacard/api
cp config.yml.example config.yml
# Edit config.yml
chmod +x ./nexacard
```
> ⚠️ Important Security Reminder: You must change the `jwt.secret` and `user_jwt.secret` in `config.yml` before going live.
>
> Please use a high-strength random string of at least 32 characters. Do not use the default template values.

Add the startup command in aaPanel's PM2/Supervisor:

> It is also recommended to set environment variables for this process (used to initialize the default admin and avoid using weak default passwords):
>
> - `NEXACARD_DEFAULT_ADMIN_USERNAME=admin`
> - `NEXACARD_DEFAULT_ADMIN_PASSWORD=<your strong password>`

```bash
/www/wwwroot/nexacard/api/nexacard
```
The working directory is set to:

```text
/www/wwwroot/nexacard/api
```
### 4.1 Default Back-End Admin Account (First Initialization)

When the `admins` table in the database is empty, the API will attempt to create a default admin account on first startup:

- Default username: `admin`
- Default password: set a strong password with `NEXACARD_DEFAULT_ADMIN_PASSWORD`

> Strongly recommended: Change the password immediately after the first login to the admin panel.

If you have already set `NEXACARD_DEFAULT_ADMIN_USERNAME` / `NEXACARD_DEFAULT_ADMIN_PASSWORD` in PM2/Supervisor, those values take highest priority.

If those environment variables are not set, you can also configure `config.yml`:

```yaml
bootstrap:
  default_admin_username: admin
  default_admin_password: <your-strong-password>
```

On first startup, the API will read this configuration to initialize the admin account.

## 5. Deploying User and Admin (No Build Required)

Requirement: The release package already contains static files ready for hosting (usually `dist`);
if it is a ZIP package, please unzip it first and confirm that `user/dist` and `admin/dist` directories exist.

Recommended directories:

- User site root: `/www/wwwroot/nexacard/user/dist`
- Admin site root: `/www/wwwroot/nexacard/admin/dist`

## 6. Creating Sites in aaPanel

It is recommended to create two sites:

- Front-end site: `shop.example.com` → root directory `user/dist`
- Admin site: `admin.example.com` → root directory `admin/dist`

And apply SSL certificates for both.

## 7. Reverse Proxy Configuration

Add in the outer gateway (Nginx):

- `/api` → `http://127.0.0.1:5175/api`
- `/uploads` → `http://127.0.0.1:5175/uploads`
- `/sitemap.xml` → `http://127.0.0.1:5175/sitemap.xml` (user frontend domain only)
- `/robots.txt` → `http://127.0.0.1:5175/robots.txt` (user frontend domain only)

### 7.1 Subdomain Deployment Example

```nginx
# User frontend
server {
    listen 80;
    server_name shop.example.com;

    root /www/wwwroot/nexacard/user/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # SEO assets are generated dynamically by the backend; they must be
    # proxied explicitly, otherwise the SPA fallback above will swallow them.
    location = /sitemap.xml {
        proxy_pass http://127.0.0.1:5175/sitemap.xml;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location = /robots.txt {
        proxy_pass http://127.0.0.1:5175/robots.txt;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5175/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        proxy_pass http://127.0.0.1:5175/uploads/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Admin frontend
server {
    listen 80;
    server_name admin.example.com;

    root /www/wwwroot/nexacard/admin/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5175/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        proxy_pass http://127.0.0.1:5175/uploads/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
For front-end history routing, you need to configure `try_files` to `index.html`.

## 8. Security Recommendations

- Do not use default values for keys in `config.yml`
- Only open necessary ports (80/443)
- It is not recommended to expose the API directly on public ports
- In production mode, please set `server.mode: release`
