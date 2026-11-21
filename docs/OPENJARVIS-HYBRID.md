# JARVIS IRON PARADISE — OpenJarvis Hybrid

This integration keeps the existing GitHub Pages PWA and its local \`localStorage\` data. OpenJarvis runs as a separate Python service on the user's computer. A small FastAPI bridge exposes only the health check and chat-completion route to the private Tailscale network.

## Architecture

- \`index.html\`: existing five-tab IRON PARADISE application; existing tracking and XP logic is not replaced.
- \`jarvis-ai.js\` / \`jarvis-ai.css\`: floating AI chat panel, separate from the existing app state.
- \`backend/app.py\`: narrow HTTP bridge to the OpenJarvis API.
- OpenJarvis: local inference, agent orchestration, model selection, tools, memory and trace-driven learning.
- Ollama: local model runtime (first setup uses \`qwen3:8b\`).

The frontend does not contain an API key or a cloud-provider secret. The bridge binds to localhost; Tailscale Serve is the private HTTPS entry point. Do not expose the bridge or OpenJarvis directly to the public internet.

## Windows setup (on the computer that will host JARVIS)

1. Install Git, Python 3.11+, [uv](https://docs.astral.sh/uv/), [Ollama](https://ollama.com/) and [Tailscale](https://tailscale.com/download).
2. Install the local model:

   \`\`\`powershell
   ollama pull qwen3:8b
   \`\`\`

3. Install OpenJarvis from its official repository:

   \`\`\`powershell
   git clone https://github.com/open-jarvis/OpenJarvis.git
   cd OpenJarvis
   uv sync --extra server
   uv run jarvis serve --host 127.0.0.1 --port 8000 --engine ollama --model qwen3:8b --agent orchestrator
   \`\`\`

   Keep this terminal running. OpenJarvis is intentionally bound to localhost.

4. In a second PowerShell window, clone your IRON PARADISE repository and start the bridge:

   \`\`\`powershell
   git clone https://github.com/antoinedlg-maker/jarvis-projet-antoine.git
   cd jarvis-projet-antoine
   py -m venv .venv
   .venv\Scripts\Activate.ps1
   pip install -r backend\requirements.txt
   $env:OPENJARVIS_URL = "http://127.0.0.1:8000"
   $env:JARVIS_ALLOWED_ORIGINS = "https://antoinedlg-maker.github.io"
   uvicorn backend.app:app --host 127.0.0.1 --port 8081
   \`\`\`

5. With Tailscale signed in on both the computer and iPhone, publish the local bridge privately over HTTPS:

   \`\`\`powershell
   tailscale serve --bg http://127.0.0.1:8081
   tailscale serve status
   \`\`\`

   Use the HTTPS \`*.ts.net\` URL shown by \`tailscale serve status\`. Do not use a public tunnel or router port-forwarding.

## iPhone setup

1. Install/sign in to Tailscale on the iPhone and connect to the same private tailnet as the host computer.
2. Open the GitHub Pages app.
3. Tap the floating **JARVIS AI** control.
4. Paste the computer's HTTPS Tailscale Serve URL into the server address field.
5. Keep the model set to \`qwen3:8b\`, save, then select **TESTER LA CONNEXION**.
6. Ask a question after the status reports \`OPENJARVIS CONNECTÉ\`.

The computer must be on, Ollama running, OpenJarvis running, the bridge running, and Tailscale connected for remote AI responses.

## Personal-data control

The chat works without sending the app's tracking data. The checkbox **Autoriser l'envoi de mon contexte sportif et nutritionnel** is off by default. When enabled, the chat request may include the latest weight, weight history (last 12 entries), target weight, today's meal names/calories/protein, recent workouts (last 5), XP and level. Shopping-list contents and other browser storage are not sent. Chat history is stored separately in this browser's localStorage.

## Current scope

- First milestone: chat + health check + optional context.
- The bridge does not write to the app's weight, meal, workout, shopping, mission or XP records.
- OpenJarvis memory and learning remain on the host computer; this first pass does not yet sync the PWA's complete local history into OpenJarvis memory.
- If the GitHub Pages project URL or allowed origin changes, update \`JARVIS_ALLOWED_ORIGINS\` in the bridge environment and restart it.
- Never bind the bridge to \`0.0.0.0\` or publish port 8081 publicly. Use Tailscale Serve for private access.
