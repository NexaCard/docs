# Nginx Proxy Manager Deployment

Use this guide when the server already runs Nginx Proxy Manager and you want to clone the four NexaCard repositories, build them on the server, and expose them by domain.

## Ports

- API: `127.0.0.1:5175`
- User: `127.0.0.1:5173`
- Admin: `127.0.0.1:5174`
- Docs: optional, recommended `127.0.0.1:5176`

Keep these services bound to localhost and expose them through Nginx Proxy Manager.

## Clone

```bash
mkdir -p /opt/nexacard
cd /opt/nexacard
git clone https://github.com/NexaCard/API.git
git clone https://github.com/NexaCard/user.git
git clone https://github.com/NexaCard/admin.git
git clone https://github.com/NexaCard/docs.git
```

## API

```bash
cd /opt/nexacard/API
cp config.yml.example config.yml
```

Set:

```yaml
server:
  host: 127.0.0.1
  port: 5175
  mode: release
```

Also configure strong secrets, admin bootstrap credentials, database, Redis, and CORS.

```bash
go mod download
go build -trimpath -tags release -ldflags="-s -w -X github.com/NexaCard/API/internal/version.Version=v1.0.0" -o nexacard-api ./cmd/server
./nexacard-api -mode all
```

Use `systemd` for production process management.

## Frontends

```bash
cd /opt/nexacard/user
npm ci
npm run build
npm install -g serve
serve -s dist -l 127.0.0.1:5173
```

```bash
cd /opt/nexacard/admin
npm ci
npm run build
serve -s dist -l 127.0.0.1:5174
```

## Proxy Hosts

Storefront:

- Domain Names: `shop.example.com`
- Scheme: `http`
- Forward Hostname / IP: `127.0.0.1`
- Forward Port: `5173`
- SSL: request a certificate and enable Force SSL

Admin:

- Domain Names: `admin.example.com`
- Scheme: `http`
- Forward Hostname / IP: `127.0.0.1`
- Forward Port: `5174`
- SSL: request a certificate and enable Force SSL

## Custom Locations

For the storefront domain:

| Location | Scheme | Forward Hostname / IP | Forward Port |
| --- | --- | --- | --- |
| `/api` | `http` | `127.0.0.1` | `5175` |
| `/uploads` | `http` | `127.0.0.1` | `5175` |
| `/sitemap.xml` | `http` | `127.0.0.1` | `5175` |
| `/robots.txt` | `http` | `127.0.0.1` | `5175` |

For the admin domain:

| Location | Scheme | Forward Hostname / IP | Forward Port |
| --- | --- | --- | --- |
| `/api` | `http` | `127.0.0.1` | `5175` |
| `/uploads` | `http` | `127.0.0.1` | `5175` |
