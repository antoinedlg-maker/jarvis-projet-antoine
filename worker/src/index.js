const DEFAULT_MODEL = "@cf/google/gemma-4-26b-a4b-it";

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


async function planActions(env, message, context = "") {
  const prompt = [
    "Tu es le planificateur d'actions de JARVIS IRON PARADISE.",
    "Retourne UNIQUEMENT un objet JSON valide, sans markdown, au format {\"reply\":string,\"actions\":[...]}.",
    "Actions autorisées :",
    "- {\"type\":\"add_meal\",\"name\":string,\"calories\":number,\"protein\":number,\"mealType\":\"petit-déjeuner\"|\"déjeuner\"|\"dîner\"|\"collation\"}",
    "- {\"type\":\"add_workout\",\"name\":string,\"duration\":number,\"workoutType\":string,\"intensity\":\"faible\"|\"modérée\"|\"élevée\",\"notes\":string}",
    "- {\"type\":\"set_goal\",\"weight\":number}",
    "- {\"type\":\"add_shopping\",\"name\":string,\"qty\":string,\"price\":number}",
    "N'invente jamais des calories, protéines, durées, poids ou prix. Si les données nécessaires manquent, pose une question dans reply et renvoie actions: [].",
    "Ne crée une action que si l'utilisateur demande explicitement de l'enregistrer, ajouter, noter, programmer ou modifier. Les demandes d'information ne déclenchent aucune action.",
    "Ne propose jamais de suppression, de modification rétroactive, de pesée réelle ni de changement de XP.",
    "Maximum 5 actions. JSON seulement.",
    "Demande utilisateur : " + message,
    "Contexte : " + context
  ].join("\\n");
  const result = await env.AI.run(env.AI_MODEL || DEFAULT_MODEL, {
    messages: [
      { role: "system", content: "Tu es un moteur d'exécution prudent. Respecte strictement le schéma JSON." },
      { role: "user", content: prompt }
    ]
  });
  const raw = getReply(result);
  const cleaned = raw.replace(/^\s*```(?:json)?/i, "").replace(/```\s*$/i, "").trim();
  let parsed;
  try { parsed = JSON.parse(cleaned); } catch { throw new Error("Invalid action JSON"); }
  if (!parsed || typeof parsed.reply !== "string" || !Array.isArray(parsed.actions)) throw new Error("Invalid action schema");
  const actions = parsed.actions.slice(0, 5).filter(a => {
    if (!a || typeof a !== "object") return false;
    if (a.type === "add_meal") return typeof a.name === "string" && a.name.trim() && Number.isFinite(a.calories) && a.calories >= 0 && a.calories <= 5000 && Number.isFinite(a.protein) && a.protein >= 0 && a.protein <= 400 && ["Petit-déjeuner","Déjeuner","Dîner","Collation"].includes(a.mealType);
    if (a.type === "add_workout") return typeof a.name === "string" && a.name.trim() && Number.isInteger(a.duration) && a.duration >= 1 && a.duration <= 600 && ["Renforcement musculaire","Cardio doux","Marche","Mobilité / récupération","Full body"].includes(a.workoutType) && ["Douce","Modérée","Intense"].includes(a.intensity);
    if (a.type === "set_goal") return Number.isFinite(a.weight) && a.weight >= 1 && a.weight <= 500;
    if (a.type === "add_shopping") return typeof a.name === "string" && a.name.trim() && typeof a.qty === "string" && Number.isFinite(a.price) && a.price >= 0 && a.price <= 100000;
    return false;
  });
  return { reply: parsed.reply.slice(0, 2000), actions };
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://antoinedlg-maker.github.io";

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
        agents: AGENTS.length,
        tokenConfigured: Boolean(env.JARVIS_API_TOKEN)
      }, 200, { ...cors, "Cache-Control": "no-store, max-age=0" });
    }

    if (url.pathname === "/agents" && request.method === "GET") {
      return json({ supervisor: "JARVIS", agents: AGENTS }, 200, cors);
    }


    if (url.pathname === "/act" && request.method === "POST") {
      if (!env.AI) return json({ error: "AI binding is not configured yet." }, 503, cors);
      if (!env.JARVIS_API_TOKEN || request.headers.get("Authorization")?.trim() !== `Bearer ${String(env.JARVIS_API_TOKEN).trim()}`) {
        return json({ error: "Unauthorized" }, 401, cors);
      }
      let body;
      try { body = await request.json(); } catch { return json({ error: "Invalid JSON body." }, 400, cors); }
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message || message.length > 2000) return json({ error: "Message required (maximum 2000 characters)." }, 400, cors);
      const context = typeof body.context === "string" ? body.context.slice(0, 4000) : "";
      try {
        const plan = await planActions(env, message, context);
        return json({ ...plan, mode: "action_planner", requiresClientApply: true }, 200, cors);
      } catch {
        return json({ error: "Action planning failed. Check AI binding, model and quota." }, 502, cors);
      }
    }

    if (url.pathname === "/chat" || url.pathname === "/team") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, cors);
      if (!env.AI) return json({ error: "AI binding is not configured yet." }, 503, cors);

      if (!env.JARVIS_API_TOKEN ||
          request.headers.get("Authorization")?.trim() !== `Bearer ${String(env.JARVIS_API_TOKEN).trim()}`) {
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
          agents: specialistResults.map(({ agent, name }) => ({ agent, name, status: "completed" })),
          agentResults: specialistResults
        }, 200, cors);
      } catch {
        return json({ error: "AI request failed. Check the Workers AI binding, model and daily quota." }, 502, cors);
      }
    }

    return json({
      name: "JARVIS IRON PARADISE",
      status: "online",
      endpoints: ["/health", "/agents", "/chat", "/team", "/act"]
    }, 200, cors);
  }
};
