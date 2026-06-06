# NexaCard Documentation

This repository contains the official documentation site for **NexaCard**, built with **VitePress**.

## Website

- GitHub (docs): https://github.com/NexaCard/docs
- GitHub (main API project): https://github.com/NexaCard/API
- GitHub (user frontend): https://github.com/NexaCard/user
- GitHub (admin frontend): https://github.com/NexaCard/admin

## Tech Stack

- Node.js
- VitePress

## Local Development

```bash
npm install
npm run docs:dev
```

Default local URL: `http://localhost:5173`

## Build

```bash
npm run docs:build
```

The static files will be generated in `docs/.vitepress/dist`.

## Docker

Build image:

```bash
docker build -t nexacard/docs:latest .
```

Run container:

```bash
docker run --rm -p 8082:80 nexacard/docs:latest
```

Then open `http://localhost:8082`.
