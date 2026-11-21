# JARVIS Cloudflare Worker

This directory contains the Cloudflare Worker API. It is intentionally separate from the existing PWA.

## Cloudflare Git deployment

Connect this repository to the existing Worker using Cloudflare Workers Builds:
- Repository: antoinedlg-maker/jarvis-projet-antoine
- Production branch: feature/cloudflare-worker (temporary setup branch)
- Root directory: worker
- Deploy command: npx wrangler deploy

The Worker name is jarvis-iron-paradise, matching the Worker created in the Cloudflare dashboard.

## Required configuration

The Wrangler config declares a Workers AI binding named AI. Enable Workers AI for this Worker in Cloudflare.

Add these Worker variables/secrets in Cloudflare:
- ALLOWED_ORIGIN: the exact origin of the published JARVIS PWA (for example, https://your-site.example; no trailing slash).
- JARVIS_API_TOKEN: a long random secret, stored as a secret, never in frontend JavaScript.
- AI_MODEL (optional): override the default model identifier.

The /chat endpoint requires the Authorization header: Bearer <JARVIS_API_TOKEN>.
The /health endpoint is public and reports whether the AI binding is present.

## Endpoints

- GET /health
- POST /chat with JSON body { "message": "..." }

This is a backend scaffold. It does not yet connect the PWA UI or read/write personal app data. Do not put personal data or credentials in public repository files.
