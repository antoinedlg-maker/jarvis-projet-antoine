(() => {
  const API = "https://jarvis-iron-paradise.antoine-delage2001.workers.dev";
  const TOKEN_KEY = "jarvis_api_token";
  const style = document.createElement("style");
  style.textContent = "#jarvis-action-launch{position:fixed;right:16px;bottom:92px;z-index:9998;border:1px solid #d8ad62;background:#171411;color:#f1d39a;border-radius:999px;padding:13px 17px;font-weight:800;box-shadow:0 8px 28px #0009}#jarvis-action-panel{display:none;position:fixed;z-index:9999;right:12px;bottom:150px;width:min(390px,calc(100vw - 24px));max-height:70vh;overflow:auto;background:#12110f;color:#f7f1e7;border:1px solid #b78d4d;border-radius:18px;padding:16px;box-shadow:0 18px 60px #000b;font:14px Inter,system-ui}#jarvis-action-panel.open{display:block}#jarvis-action-panel h3{font-size:17px;margin:0 0 10px;color:#e4bd78}#jarvis-action-panel input,#jarvis-action-panel textarea{width:100%;background:#080808;color:#fff;border:1px solid #5b4930;border-radius:10px;padding:11px;margin:6px 0}#jarvis-action-panel textarea{min-height:85px;resize:vertical}#jarvis-action-panel button{border:0;border-radius:10px;padding:11px 14px;margin:5px 4px 5px 0;background:#d8ad62;color:#17120b;font-weight:800}#jarvis-action-panel button.secondary{background:#30271b;color:#e4bd78;border:1px solid #72572f}#jarvis-action-result{white-space:pre-wrap;line-height:1.5;margin-top:10px;color:#eee}#jarvis-action-status{font-size:11px;color:#b7a98f;margin:4px 0 8px}";
  style.textContent += "#jarvis-agent-console{margin-top:15px;padding-top:14px;border-top:1px solid #51432e}.jarvis-agent-head{display:flex;justify-content:space-between;gap:8px;font-size:11px;color:#e4bd78}.jarvis-agent-head span{color:#b7a98f;font-size:10px}.jarvis-agent-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}.jarvis-agent{background:#1b1b1a;border:1px solid #51432e;border-radius:10px;padding:9px;display:grid;grid-template-columns:20px 1fr;gap:3px 5px}.jarvis-agent i{grid-row:span 2;color:#e4bd78;font-style:normal}.jarvis-agent b{font-size:10px;color:#f7f1e7}.jarvis-agent small{grid-column:2;color:#a99e8a;font-size:9px}.jarvis-agent em{grid-column:2;font-style:normal;font-size:9px;color:#9c9c9c}.jarvis-agent.running{border-color:#d8ad62;box-shadow:0 0 12px #d8ad6233}.jarvis-agent.running em{color:#f4c56e}.jarvis-agent.done{border-color:#42d6a0}.jarvis-agent.done em{color:#42d6a0}#jarvis-team-run{width:100%;margin-top:9px}#jarvis-team-results{font-size:11px;line-height:1.5;margin-top:8px;color:#eee}#jarvis-team-results .agent-result{padding:9px;margin-top:7px;background:#211e19;border-radius:8px}#jarvis-team-results strong{color:#e4bd78}";
  document.head.appendChild(style);
  const launch=document.createElement("button");
  launch.id="jarvis-action-launch";launch.textContent="✦ JARVIS";
  const panel=document.createElement("section");
  panel.id="jarvis-action-panel";
  panel.innerHTML='<h3>J.A.R.V.I.S. — Centre de commande</h3><div id="jarvis-action-status">Assistant prêt · les actions autorisées seront enregistrées dans cette application.</div><input id="jarvis-action-token" type="password" autocomplete="off" placeholder="Clé d’accès JARVIS"><textarea id="jarvis-action-message" placeholder="Ex : Ajoute à mon journal un déjeuner : poulet, riz et légumes, 650 kcal et 45 g de protéines."></textarea><button id="jarvis-action-send">Exécuter la mission</button><button class="secondary" id="jarvis-action-close">Fermer</button><div id="jarvis-action-result" aria-live="polite"></div>
  <div id="jarvis-agent-console"><div class="jarvis-agent-head"><b>ÉQUIPE JARVIS</b><span id="jarvis-agent-state">4 spécialistes disponibles</span></div>
  <div class="jarvis-agent-grid">
  <div class="jarvis-agent" data-agent="product"><i>◈</i><b>Architecte produit</b><small>Application & priorités</small><em>En attente</em></div>
  <div class="jarvis-agent" data-agent="sport"><i>⌁</i><b>Coach sportif</b><small>Entraînement & progression</small><em>En attente</em></div>
  <div class="jarvis-agent" data-agent="nutrition"><i>✦</i><b>Nutrition</b><small>Repas & équilibre</small><em>En attente</em></div>
  <div class="jarvis-agent" data-agent="quality"><i>⛭</i><b>Ingénieur qualité</b><small>Contrôle & fiabilité</small><em>En attente</em></div></div>
  <button id="jarvis-team-run" class="secondary">Faire travailler les 4 agents</button><div id="jarvis-team-results"></div></div>';
  document.body.append(launch,panel);
  const $=id=>document.getElementById(id);
  $("jarvis-action-token").value=sessionStorage.getItem(TOKEN_KEY)||"";
  launch.addEventListener("click",()=>panel.classList.toggle("open"));
  $("jarvis-action-close").addEventListener("click",()=>panel.classList.remove("open"));
  const agentCards=[...panel.querySelectorAll(".jarvis-agent")];
  function agentState(state,label){$("jarvis-agent-state").textContent=label;agentCards.forEach(card=>{card.classList.remove("running","done");card.querySelector("em").textContent=state==="running"?"Analyse en cours…":state==="done"?"Analyse terminée":"En attente";if(state!=="idle")card.classList.add(state);});}
  $("jarvis-team-run").addEventListener("click",async()=>{
    const message=$("jarvis-action-message").value.trim(),token=$("jarvis-action-token").value.trim();
    if(!message){$("jarvis-team-results").textContent="Écris d’abord une mission dans le champ ci-dessus.";return}
    if(!token){$("jarvis-team-results").textContent="Équipe non connectée : le Worker ne reçoit pas encore le secret d’accès.";agentState("idle","Connexion requise");return}
    $("jarvis-team-run").disabled=true;$("jarvis-team-results").textContent="JARVIS distribue la mission aux 4 spécialistes…";agentState("running","4 agents en analyse");
    try{
      const response=await fetch(API+"/team",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({message})});
      const data=await response.json();if(!response.ok)throw new Error(data.error||"Erreur API "+response.status);
      agentState("done","4 agents ont terminé");
      const details=Array.isArray(data.agentResults)?data.agentResults:[];
      $("jarvis-team-results").innerHTML=(data.reply||"Synthèse de JARVIS")+(details.length?details.map(a=>'<div class="agent-result"><strong>'+escapeText(a.name)+'</strong><br>'+escapeText(a.analysis)+'</div>').join(""):"");
    }catch(error){agentState("idle","Échec de connexion");$("jarvis-team-results").textContent=error.message;}
    finally{$("jarvis-team-run").disabled=false;}
  });
  function escapeText(value){const d=document.createElement("div");d.textContent=String(value||"");return d.innerHTML;}
  function tryLocalMeal(message){
    const kcal=message.match(/(\d{2,4})\s*kcal/i),protein=message.match(/(\d{1,3})\s*g\s*(?:de\s*)?protéines?/i),type=message.match(/petit[- ]déjeuner|déjeuner|dîner|collation/i);
    if(!/ajoute|enregistre|note|saisis/i.test(message)||!kcal||!protein||!type)return null;
    const raw=type[0].toLowerCase().replace("petit déjeuner","petit-déjeuner");
    const mealType={"petit-déjeuner":"Petit-déjeuner","déjeuner":"Déjeuner","dîner":"Dîner","collation":"Collation"}[raw];
    const item={name:"Repas saisi en mode local",calories:Number(kcal[1]),protein:Number(protein[1]),type:mealType,date:new Date().toLocaleDateString("en-CA")};
    if(item.calories>5000||item.protein>400)return null;
    state.meals.push(item);state.xp+=5;saveState();render();return item;
  }
  function applyAction(a){
    const today=new Date().toLocaleDateString("en-CA");
    if(a.type==="add_meal"){state.meals.push({name:a.name.trim(),calories:a.calories,protein:a.protein,type:a.mealType,date:today});state.xp+=5;return "Repas ajouté : "+a.name;}
    if(a.type==="add_workout"){state.workouts.push({name:a.name.trim(),duration:a.duration,type:a.workoutType,intensity:a.intensity,notes:a.notes||"",date:today});state.xp+=25;return "Séance ajoutée : "+a.name;}
    if(a.type==="set_goal"){state.goal=a.weight;return "Objectif de poids réglé : "+a.weight+" kg";}
    if(a.type==="add_shopping"){state.shopping.push({name:a.name.trim(),qty:a.qty||"",price:a.price,checked:false});return "Article ajouté : "+a.name;}
    throw new Error("Action non autorisée");
  }
  $("jarvis-action-send").addEventListener("click",async()=>{
    const message=$("jarvis-action-message").value.trim(),token=$("jarvis-action-token").value.trim();
    if(!token){$("jarvis-action-result").textContent="Il manque la clé d’accès. Configure-la dans Cloudflare puis colle-la ici.";return}
    if(!message){$("jarvis-action-result").textContent="Écris une mission.";return}
    sessionStorage.setItem(TOKEN_KEY,token);$("jarvis-action-send").disabled=true;$("jarvis-action-status").textContent="JARVIS analyse la mission…";$("jarvis-action-result").textContent="";
    try{
      const response=await fetch(API+"/act",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({message})});
      if(response.status===401){
        const local=tryLocalMeal(message);
        if(local){$("jarvis-action-status").textContent="Action enregistrée localement · IA distante toujours déconnectée";$("jarvis-action-result").textContent="Repas ajouté dans ton journal : "+local.calories+" kcal, "+local.protein+" g de protéines, "+local.type+".\\n\\nLe Worker refuse toujours l’accès : les agents IA ne sont pas encore connectés.";return;}
        throw new Error("Unauthorized : le Worker ne reçoit pas le secret. Aucune action n’a été exécutée.");
      }
      const data=await response.json();if(!response.ok)throw new Error(data.error||"Erreur API "+response.status);
      const applied=[];for(const action of (Array.isArray(data.actions)?data.actions:[]))applied.push(applyAction(action));
      if(applied.length){saveState();render();}
      $("jarvis-action-result").textContent=(data.reply||"Mission terminée.")+(applied.length?"\n\nActions effectuées :\n• "+applied.join("\n• "):"\n\nAucune action à appliquer.");
      $("jarvis-action-status").textContent=applied.length?applied.length+" action(s) exécutée(s) et sauvegardée(s).":"Analyse terminée.";
    }catch(error){$("jarvis-action-status").textContent="Mission non exécutée";$("jarvis-action-result").textContent=error.message;}
    finally{$("jarvis-action-send").disabled=false;}
  });
})();