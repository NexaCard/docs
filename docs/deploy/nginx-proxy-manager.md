# Nginx Proxy Manager 部署

本页适用于服务器已安装 Nginx Proxy Manager，并希望直接拉取 NexaCard 四个仓库源码构建部署的方式。

## 端口规划

- API: `127.0.0.1:5175`
- User: `127.0.0.1:5173`
- Admin: `127.0.0.1:5174`
- Docs: 可选，建议 `127.0.0.1:5176`

生产环境不要把这些端口直接暴露到公网，只监听本机，再由 Nginx Proxy Manager 反向代理。

## 拉取仓库

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

编辑 `config.yml`：

```yaml
server:
  host: 127.0.0.1
  port: 5175
  mode: release
```

同时修改强密钥、默认管理员、数据库、Redis 和 CORS：

```yaml
cors:
  allowed_origins:
    - "https://shop.example.com"
    - "https://admin.example.com"
```

构建并运行：

```bash
go mod download
go build -trimpath -tags release -ldflags="-s -w -X github.com/NexaCard/API/internal/version.Version=v1.0.0" -o nexacard-api ./cmd/server
./nexacard-api -mode all
```

建议使用 `systemd` 托管 API，确保服务器重启后自动恢复。

## 前台和后台

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

生产环境建议同样使用 `systemd` 托管两个静态服务。

## Nginx Proxy Manager

前台域名 Proxy Host：

- Domain Names: `shop.example.com`
- Scheme: `http`
- Forward Hostname / IP: `127.0.0.1`
- Forward Port: `5173`
- SSL: 申请证书并开启 Force SSL

后台域名 Proxy Host：

- Domain Names: `admin.example.com`
- Scheme: `http`
- Forward Hostname / IP: `127.0.0.1`
- Forward Port: `5174`
- SSL: 申请证书并开启 Force SSL

## Custom Locations

前台域名添加：

| Location | Scheme | Forward Hostname / IP | Forward Port |
| --- | --- | --- | --- |
| `/api` | `http` | `127.0.0.1` | `5175` |
| `/uploads` | `http` | `127.0.0.1` | `5175` |
| `/sitemap.xml` | `http` | `127.0.0.1` | `5175` |
| `/robots.txt` | `http` | `127.0.0.1` | `5175` |

后台域名添加：

| Location | Scheme | Forward Hostname / IP | Forward Port |
| --- | --- | --- | --- |
| `/api` | `http` | `127.0.0.1` | `5175` |
| `/uploads` | `http` | `127.0.0.1` | `5175` |

## 检查

```bash
curl http://127.0.0.1:5175/health
curl -I http://127.0.0.1:5173
curl -I http://127.0.0.1:5174
```

然后访问：

- `https://shop.example.com`
- `https://admin.example.com`
