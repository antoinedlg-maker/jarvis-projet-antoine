const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct";

const AGENTS = [
  {
    id: "product",
    name: "Architecte produit",
    mission: "Prioriser les fonctionnalités IRON PARADISE, définir les parcours et proposer des améliorations concrètes."
  },
  {
    id: "sport",
    name: "Coach sportif",
    mission: "Analyser entraînement, progression, récupération et proposer des conseils prudents et progressifs."
  },
  {
    id: "nutrition",
    name: "Nutritionniste",
    mission: "Aider sur repas, calories, protéines et organisation alimentaire sans régime extrême ni données inventées."
  },
  {
    id: "quality",
    name: "Ingénieur qualité",
    mission: "Repérer incohérences, risques, bugs possibles et critères de validation avant toute modification."
  }
];

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders }
  });
}

function getReply(result) {
  return result?.response || result?.result?.response || result?.output || "";
}

async function askAgent(env, agent, message, context = "") {
  const result = await env.AI.run(env.AI_MODEL || DEFAULT_MODEL, {
    messages: [
      {
        role: "system",
        content: `Tu es ${agent.name}, agent spécialisé de JARVIS IRON PARADISE. Mission : ${agent.mission} Réponds en français, de façon concise, précise et actionnable. N'invente aucune donnée. Si une information manque, signale-le. Tu analyses et proposes : tu ne prétends jamais avoir modifié l'application ou ses données.`
      },
      { role: "user", content: context ? `Mission : ${message}\n\nContexte :\n${context}` : message }
    ]
  });
  return getReply(result) || "Aucune analyse retournée.";
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
        ai: Boolean(env.AI) ? "connected" : "not_configured",
        agents: AGENTS.length
      }, 200, cors);
    }

    if (url.pathname === "/agents" && request.method === "GET") {
      return json({ supervisor: "JARVIS", agents: AGENTS }, 200, cors);
    }

    if (url.pathname === "/chat" || url.pathname === "/team") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);
      if (!env.AI) return json({ error: "AI binding is not configured yet." }, 503, cors);

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

      const context = typeof body.context === "string" ? body.context.slice(0, 6000) : "";
      const sessionId = typeof body.sessionId === "string" && /^[a-zA-Z0-9_-]{8,80}$/.test(body.sessionId)
        ? body.sessionId : null;
      const memoryKey = sessionId ? `session:${sessionId}` : null;
      let history = [];
      if (memoryKey && env.JARVIS_MEMORY) {
        try { history = await env.JARVIS_MEMORY.get(memoryKey, "json") || []; } catch { history = []; }
      }
      const memoryContext = history.slice(-10).map(item => `${item.role}: ${item.content}`).join("\\n");
      const combinedContext = [context, memoryContext].filter(Boolean).join("\\n\\n");

      try {
        if (url.pathname === "/chat") {
          const reply = await askAgent(env, {
            name: "JARVIS",
            mission: "Assistant principal d'IRON PARADISE. Réponds directement et route mentalement vers le bon domaine."
          }, message, combinedContext);
          if (memoryKey && env.JARVIS_MEMORY) {
            history.push({ role: "user", content: message, at: Date.now() }, { role: "assistant", content: reply, at: Date.now() });
            await env.JARVIS_MEMORY.put(memoryKey, JSON.stringify(history.slice(-12)), { expirationTtl: 60 * 60 * 24 * 30 });
          }
          return json({ reply, mode: "single_agent", memory: Boolean(memoryKey && env.JARVIS_MEMORY) }, 200, cors);
        }

        // Les spécialistes travaillent en parallèle ; JARVIS arbitre et synthétise.
        const specialistResults = await Promise.all(
          AGENTS.map(async agent => ({
            agent: agent.id,
            name: agent.name,
            analysis: await askAgent(env, agent, message, context)
          }))
        );

        const synthesis = await askAgent(
          env,
          {
            name: "JARVIS — Chef d'orchestre",
            mission: "Tu coordonnes les agents spécialistes. Compare leurs analyses, élimine les contradictions, retiens les actions les plus utiles et produis une réponse unique priorisée. Ne prétends pas avoir exécuté des changements."
          },
          message,
          specialistResults.map(item => `${item.name}:\n${item.analysis}`).join("\n\n")
        );

        return json({
          reply: synthesis,
          mode: "multi_agent",
          agents: specialistResults.map(({ agent, name }) => ({ agent, name, status: "completed" }))
        }, 200, cors);
      } catch {
        return json({ error: "AI request failed. Check the Workers AI binding, model and daily quota." }, 502, cors);
      }
    }

    return json({
      name: "JARVIS IRON PARADISE",
      status: "online",
      endpoints: ["/health", "/agents", "/chat", "/team"]
    }, 200, cors);
  }
};
