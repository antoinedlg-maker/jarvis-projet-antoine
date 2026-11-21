# JARVIS Cloudflare Worker

## Runtime
- Entrypoint: `worker/src/index.js`
- Root Wrangler config: `wrangler.toml`
- Workers AI binding: `AI`
- Model: `@cf/google/gemma-4-26b-a4b-it`

## Endpoints
- `GET /health`: runtime and configuration diagnostics (never returns secrets)
- `GET /agents`: specialist descriptions
- `POST /chat`: JARVIS single-agent response
- `POST /team`: four specialists in parallel plus JARVIS synthesis
- `POST /act`: validated action plan for the PWA to apply

## Authentication
All POST endpoints require `Authorization: Bearer <token>`.
Configure `JARVIS_API_TOKEN` as a Cloudflare Worker **Secret** in the same deployed Worker environment. Never commit the token to this repository or place it in frontend source.
The PWA stores the token in session storage and sends it only in the Authorization header.

## Action safety
The Worker only returns a small allowlist of validated actions. The PWA applies those actions to its own local state. Deletions, retroactive edits, fabricated measurements and XP manipulation are not supported.

<!-- deployment refresh: 2026-11-21 -->
