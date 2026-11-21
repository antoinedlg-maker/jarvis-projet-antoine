const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct";

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowedOrigin = env.ALLOWED_ORIGIN;

    if (origin && allowedOrigin && origin !== allowedOrigin) {
      return json({ error: "Origin not allowed" }, 403);
    }

    const cors = {
      "Access-Control-Allow-Origin": allowedOrigin || "null",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);

    if (url.pathname === "/health" && request.method === "GET") {
      return json({
        name: "JARVIS IRON PARADISE",
        status: "online",
        ai: Boolean(env.AI) ? "connected" : "not_configured"
      }, 200, cors);
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      if (!env.AI) {
        return json({ error: "AI binding is not configured yet." }, 503, cors);
      }

      if (!env.JARVIS_API_TOKEN ||
          request.headers.get("Authorization") !== `Bearer ${env.JARVIS_API_TOKEN}`) {
        return json({ error: "Unauthorized" }, 401, cors);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "Invalid JSON body." }, 400, cors);
      }

      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message || message.length > 4000) {
        return json({ error: "Message required (maximum 4000 characters)." }, 400, cors);
      }

      try {
        const result = await env.AI.run(env.AI_MODEL || DEFAULT_MODEL, {
          messages: [
            {
              role: "system",
              content: "Tu es JARVIS, l'assistant personnel de l'application IRON PARADISE. Réponds en français, clairement et utilement. N'invente jamais de données sportives ou nutritionnelles que l'utilisateur ne t'a pas fournies."
            },
            { role: "user", content: message }
          ]
        });

        return json({ reply: result.response || "Je n'ai pas pu générer de réponse." }, 200, cors);
      } catch {
        return json({ error: "AI request failed. Check the Workers AI binding and model." }, 502, cors);
      }
    }

    return json({
      name: "JARVIS IRON PARADISE",
      status: "online",
      endpoints: ["/health", "/chat"]
    }, 200, cors);
  }
};
