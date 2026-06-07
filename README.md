# NexaCard Documentation

Official documentation site for NexaCard, built with VitePress.

## Secondary Development Notice

NexaCard Docs is maintained for the NexaCard secondary-development project. It points to NexaCard repositories, release links, deployment paths, and branding. See [NOTICE.md](./NOTICE.md).

## Requirements

- Node.js `20 LTS` or higher
- npm `10+`

## Local Development

```bash
npm install
npm run docs:dev
```

Default local URL:

- Docs: `http://localhost:5176`

## Build

```bash
npm run docs:build
```

The static files are generated in `docs/.vitepress/dist`.

## Deployment Docs

- Manual deployment: `docs/deploy/manual.md`
- Docker Compose: `docs/deploy/docker-compose.md`
- Nginx Proxy Manager: `docs/deploy/nginx-proxy-manager.md`

## Related Repositories

- API: https://github.com/NexaCard/API
- User: https://github.com/NexaCard/user
- Admin: https://github.com/NexaCard/admin
- Docs: https://github.com/NexaCard/docs
