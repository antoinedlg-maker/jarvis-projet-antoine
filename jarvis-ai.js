(() => {
  "use strict";
  const SETTINGS_KEY = "jarvis_iron_paradise_ai_settings_v1";
  const CHAT_KEY = "jarvis_iron_paradise_ai_chat_v1";
  const DEFAULTS = { endpoint: "", model: "qwen3:8b", shareContext: false };
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || "null") || fallback; } catch (_) { return fallback; } };
  let settings = { ...DEFAULTS, ...read(SETTINGS_KEY, {}) };
  let messages = read(CHAT_KEY, []);
  let busy = false;

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = new URL("./jarvis-ai.css", document.currentScript?.src || location.href).href;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "jarvis-ai-root";
  root.innerHTML = \`
    <button class="jai-launcher" id="jai-launcher" type="button" aria-label="Ouvrir JARVIS AI"><span class="jai-launcher-core">J</span><span class="jai-launcher-label">JARVIS AI</span></button>
    <section class="jai-panel" id="jai-panel" aria-label="Assistant JARVIS" aria-hidden="true">
      <header class="jai-header"><div><div class="jai-kicker">IRON PARADISE / INTELLIGENCE CORE</div><h2>J.A.R.V.I.S.</h2><div class="jai-status" id="jai-status">SERVEUR NON CONFIGURÉ</div></div><button class="jai-close" id="jai-close" type="button" aria-label="Fermer">×</button></header>
      <div class="jai-settings">
        <label for="jai-endpoint">Adresse sécurisée de ton PC (Tailscale HTTPS)</label><input id="jai-endpoint" type="url" inputmode="url" placeholder="https://ton-pc.ton-reseau.ts.net">
        <div class="jai-setting-row"><label for="jai-model">Modèle</label><input id="jai-model" type="text" value="qwen3:8b" autocomplete="off"><button id="jai-save" type="button">ENREGISTRER</button></div>
        <label class="jai-consent"><input id="jai-context" type="checkbox"> Autoriser l'envoi de mon contexte sportif et nutritionnel avec mes questions</label>
        <div class="jai-setting-actions"><button id="jai-test" type="button">TESTER LA CONNEXION</button><span id="jai-privacy">Tes données restent sur ton iPhone tant que tu ne les partages pas.</span></div>
      </div>
      <div class="jai-messages" id="jai-messages" aria-live="polite"></div>
      <form class="jai-compose" id="jai-form"><textarea id="jai-input" rows="2" maxlength="3000" placeholder="Demande quelque chose à JARVIS…" aria-label="Ton message"></textarea><button id="jai-send" type="submit" aria-label="Envoyer">➤</button></form>
      <div class="jai-footer">OPENJARVIS ENGINE · CONNEXION PRIVÉE</div>
    </section>\`;
  document.body.appendChild(root);

  const $ = id => document.getElementById(id);
  const panel = $("jai-panel");
  const status = $("jai-status");
  const list = $("jai-messages");
  const input = $("jai-input");
  $("jai-endpoint").value = settings.endpoint;
  $("jai-model").value = settings.model;
  $("jai-context").checked = !!settings.shareContext;

  function saveSettings() {
    settings = { endpoint: $("jai-endpoint").value.trim().replace(/\/+$/, ""), model: $("jai-model").value.trim() || DEFAULTS.model, shareContext: $("jai-context").checked };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    status.textContent = settings.endpoint ? "CONFIGURATION ENREGISTRÉE" : "ADRESSE DU SERVEUR MANQUANTE";
  }
  function setStatus(text, mode) { status.textContent = text; status.dataset.mode = mode || "idle"; }
  function addMessage(role, content, persist = true) {
    const item = document.createElement("article");
    item.className = "jai-message " + (role === "user" ? "jai-user" : "jai-assistant");
    const label = document.createElement("span"); label.className = "jai-message-label"; label.textContent = role === "user" ? "TOI" : "JARVIS";
    const body = document.createElement("p"); body.textContent = content;
    item.append(label, body); list.appendChild(item); list.scrollTop = list.scrollHeight;
    if (persist) { messages.push({ role, content }); messages = messages.slice(-30); localStorage.setItem(CHAT_KEY, JSON.stringify(messages)); }
    return item;
  }
  function renderHistory() {
    list.replaceChildren();
    if (!messages.length) { addMessage("assistant", "Système prêt. Configure l'adresse sécurisée de ton ordinateur, teste la connexion, puis nous pourrons travailler ensemble sur tes objectifs."); messages = []; return; }
    messages.forEach(m => addMessage(m.role, m.content, false));
  }
  function appContext() {
    try {
      if (typeof state === "undefined" || !state) return null;
      const today = new Date().toLocaleDateString("en-CA");
      const todaysMeals = (state.meals || []).filter(x => x.date === today);
      const latestWeight = (state.weights || []).slice().sort((a,b) => a.date.localeCompare(b.date)).slice(-1)[0] || null;
      return {
        weight_kg: latestWeight?.weight ?? null, weight_date: latestWeight?.date ?? null,
        target_weight_kg: state.goal ?? null, weight_history: (state.weights || []).slice(-12),
        today_meals: todaysMeals.map(({name, calories, protein, type}) => ({name, calories, protein, type})),
        recent_workouts: (state.workouts || []).slice(-5).map(({name, duration, type, intensity, date}) => ({name, duration, type, intensity, date})),
        xp: Number(state.xp || 0), level: Math.floor(Number(state.xp || 0) / 100) + 1
      };
    } catch (_) { return null; }
  }
  function endpointUrl(path) {
    const base = settings.endpoint;
    if (!base) throw new Error("Configure d'abord l'adresse sécurisée de ton ordinateur.");
    const parsed = new URL(base);
    if (parsed.protocol !== "https:" && parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1") throw new Error("Pour protéger tes échanges, utilise une adresse HTTPS (Tailscale Serve).");
    return base + path;
  }
  async function testConnection() {
    saveSettings();
    try {
      setStatus("VÉRIFICATION DU SERVEUR…", "busy");
      const response = await fetch(endpointUrl("/health"), { method: "GET", cache: "no-store" });
      if (!response.ok) throw new Error("Le serveur répond avec le code " + response.status);
      const data = await response.json();
      if (data.openjarvis !== "ok" && data.status !== "ok") throw new Error("Le moteur OpenJarvis n'est pas encore prêt.");
      setStatus("OPENJARVIS CONNECTÉ", "online");
      addMessage("assistant", "Connexion établie. Le moteur JARVIS est disponible.");
    } catch (error) {
      setStatus("CONNEXION IMPOSSIBLE", "error");
      addMessage("assistant", "Connexion impossible : " + error.message + " Vérifie que ton PC est allumé, qu'OpenJarvis et le pont JARVIS tournent, et que Tailscale est connecté sur les deux appareils.");
    }
  }
  async function sendMessage(text) {
    if (busy || !text.trim()) return;
    saveSettings(); addMessage("user", text.trim()); input.value = "";
    const pending = addMessage("assistant", "Analyse en cours…", false); pending.classList.add("jai-pending");
    busy = true; $("jai-send").disabled = true; setStatus("ANALYSE EN COURS…", "busy");
    try {
      const system = "Tu es JARVIS, l'assistant personnel de l'application IRON PARADISE. Réponds en français, de façon directe, claire et encourageante. Tu aides à suivre le sport, la nutrition, les habitudes et la progression. Ne prétends jamais avoir modifié les données de l'application. Pour les sujets médicaux, reste prudent et recommande un professionnel si nécessaire. Distingue les données fournies des suppositions.";
      const payloadMessages = [{ role: "system", content: system }];
      if (settings.shareContext) {
        const context = appContext();
        if (context) payloadMessages.push({ role: "system", content: "Contexte de progression explicitement partagé par l'utilisateur :\n" + JSON.stringify(context) });
      }
      payloadMessages.push(...messages.filter(m => m.role === "user" || m.role === "assistant").slice(-12));
      const response = await fetch(endpointUrl("/v1/chat/completions"), {
        method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store",
        body: JSON.stringify({ model: settings.model, messages: payloadMessages, temperature: 0.6, max_tokens: 800, stream: false })
      });
      if (!response.ok) { const detail = await response.text(); throw new Error("Erreur API " + response.status + (detail ? " — " + detail.slice(0, 220) : "")); }
      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content;
      if (!answer) throw new Error("Le moteur n'a pas renvoyé de réponse exploitable.");
      pending.remove(); addMessage("assistant", String(answer)); setStatus("OPENJARVIS CONNECTÉ", "online");
    } catch (error) {
      pending.remove(); addMessage("assistant", "Je n'ai pas pu traiter ta demande : " + error.message); setStatus("ERREUR DE CONNEXION", "error");
    } finally { busy = false; $("jai-send").disabled = false; input.focus(); }
  }
  $("jai-launcher").addEventListener("click", () => { panel.classList.add("jai-open"); panel.setAttribute("aria-hidden", "false"); $("jai-launcher").classList.add("jai-hidden"); input.focus(); });
  $("jai-close").addEventListener("click", () => { panel.classList.remove("jai-open"); panel.setAttribute("aria-hidden", "true"); $("jai-launcher").classList.remove("jai-hidden"); });
  $("jai-save").addEventListener("click", saveSettings);
  $("jai-test").addEventListener("click", testConnection);
  $("jai-context").addEventListener("change", saveSettings);
  $("jai-form").addEventListener("submit", event => { event.preventDefault(); sendMessage(input.value); });
  input.addEventListener("keydown", event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); $("jai-form").requestSubmit(); } });
  renderHistory();
  if (settings.endpoint) setStatus("SERVEUR CONFIGURÉ · À TESTER", "idle");
})();