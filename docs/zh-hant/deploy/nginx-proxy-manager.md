# Nginx Proxy Manager 部署

本頁適用於已在伺服器安裝 Nginx Proxy Manager，並希望從 NexaCard 四個倉庫拉取原始碼、建置後透過網域存取的部署方式。

## 端口規劃

- API: `127.0.0.1:5175`
- User: `127.0.0.1:5173`
- Admin: `127.0.0.1:5174`
- Docs: 可選，建議 `127.0.0.1:5176`

請只讓服務監聽本機，再由 Nginx Proxy Manager 對外反向代理。

## 拉取倉庫

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

設定：

```yaml
server:
  host: 127.0.0.1
  port: 5175
  mode: release
```

同時設定強密鑰、管理員初始化資料、資料庫、Redis 與 CORS。

```bash
go mod download
go build -trimpath -tags release -ldflags="-s -w -X github.com/NexaCard/API/internal/version.Version=v1.0.0" -o nexacard-api ./cmd/server
./nexacard-api -mode all
```

## 前台與後台

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

## Nginx Proxy Manager

前台 Proxy Host：

- Domain Names: `shop.example.com`
- Scheme: `http`
- Forward Hostname / IP: `127.0.0.1`
- Forward Port: `5173`
- SSL: 申請憑證並開啟 Force SSL

後台 Proxy Host：

- Domain Names: `admin.example.com`
- Scheme: `http`
- Forward Hostname / IP: `127.0.0.1`
- Forward Port: `5174`
- SSL: 申請憑證並開啟 Force SSL

前台 Custom Locations：

| Location | Scheme | Forward Hostname / IP | Forward Port |
| --- | --- | --- | --- |
| `/api` | `http` | `127.0.0.1` | `5175` |
| `/uploads` | `http` | `127.0.0.1` | `5175` |
| `/sitemap.xml` | `http` | `127.0.0.1` | `5175` |
| `/robots.txt` | `http` | `127.0.0.1` | `5175` |

後台 Custom Locations：

| Location | Scheme | Forward Hostname / IP | Forward Port |
| --- | --- | --- | --- |
| `/api` | `http` | `127.0.0.1` | `5175` |
| `/uploads` | `http` | `127.0.0.1` | `5175` |
