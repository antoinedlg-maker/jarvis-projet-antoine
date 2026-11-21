import os
from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

OPENJARVIS_URL = os.getenv("OPENJARVIS_URL", "http://127.0.0.1:8000").rstrip("/")
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "JARVIS_ALLOWED_ORIGINS",
        "https://antoinedlg-maker.github.io",
    ).split(",")
    if origin.strip()
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.http = httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=5.0))
    yield
    await app.state.http.aclose()


app = FastAPI(
    title="JARVIS IRON PARADISE Bridge",
    version="0.1.0",
    docs_url=None,
    redoc_url=None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
async def health(request: Request):
    try:
        upstream = await request.app.state.http.get(f"{OPENJARVIS_URL}/health")
        if upstream.is_success:
            return {"status": "ok", "openjarvis": "ok"}
        return JSONResponse(
            status_code=503,
            content={"status": "degraded", "openjarvis": "unavailable", "upstream_status": upstream.status_code},
        )
    except httpx.HTTPError:
        return JSONResponse(
            status_code=503,
            content={"status": "degraded", "openjarvis": "unavailable"},
        )


@app.post("/v1/chat/completions")
async def chat_completions(request: Request):
    try:
        payload = await request.json()
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid JSON body") from exc

    if not isinstance(payload, dict) or not isinstance(payload.get("messages"), list):
        raise HTTPException(status_code=400, detail="A messages array is required")

    # The first integration milestone supports non-streaming chat only.
    payload["stream"] = False

    try:
        upstream = await request.app.state.http.post(
            f"{OPENJARVIS_URL}/v1/chat/completions",
            json=payload,
            headers={"Content-Type": "application/json"},
        )
    except httpx.TimeoutException as exc:
        raise HTTPException(status_code=504, detail="OpenJarvis request timed out") from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Cannot reach OpenJarvis") from exc

    if upstream.status_code >= 400:
        raise HTTPException(status_code=upstream.status_code, detail=upstream.text[:1000])

    try:
        return upstream.json()
    except ValueError as exc:
        raise HTTPException(status_code=502, detail="OpenJarvis returned invalid JSON") from exc
