(() => {
"use strict";
const API="https://jarvis-iron-paradise.antoine-delage2001.workers.dev",TOKEN_KEY="jarvis_api_token";
const AGENTS=[["product","◈","Architecte produit","Roadmap & expérience"],["sport","⚡","Coach sportif","Entraînement & progression"],["programming","✧","Architecte entraînement","Programmes & progression"],["nutrition","✦","Nutrition sportive","Carburant & apports"],["mealprep","♨","Chef nutrition","Menus & préparation"],["recovery","☾","Récupération","Sommeil & repos"],["performance","⌁","Analyste performance","Tendances & indicateurs"],["habits","◆","Coach discipline","Habitudes & régularité"],["quality","⛭","Ingénieur qualité","Sécurité & fiabilité"]];
const style=document.createElement("style");
style.textContent="#jarvis-action-launch{position:fixed;right:15px;bottom:94px;z-index:9998;border:1px solid #65c8ff;background:linear-gradient(120deg,#124b82,#0a1b30);color:#eaf7ff;border-radius:999px;padding:13px 16px;font-weight:900;letter-spacing:.6px;box-shadow:0 8px 28px #000b,0 0 18px #238eff55}#jarvis-action-panel{display:none;position:fixed;z-index:9999;inset:auto 10px 150px;width:auto;max-width:520px;max-height:74vh;overflow:auto;background:linear-gradient(145deg,#12243a,#070f1b);color:#f2f7fc;border:1px solid #65c8ff88;border-radius:20px;padding:16px;box-shadow:0 18px 60px #000e;font:14px Inter,system-ui}#jarvis-action-panel.open{display:block}#jarvis-action-panel h3{font:800 17px Orbitron,Inter,sans-serif;letter-spacing:1px;margin:0 0 7px;color:#a9e2ff}#jarvis-action-panel .jarvis-kicker{font:9px Orbitron,sans-serif;letter-spacing:2px;color:#e8b95f;margin-bottom:9px}#jarvis-action-panel input,#jarvis-action-panel textarea{width:100%;background:#071321;color:#fff;border:1px solid #345573;border-radius:10px;padding:11px;margin:6px 0}#jarvis-action-panel textarea{min-height:85px;resize:vertical}#jarvis-action-panel button{border:1px solid #65c8ff;border-radius:10px;padding:11px 13px;margin:5px 4px 5px 0;background:linear-gradient(110deg,#1768c4,#3e9fd8);color:#fff;font-weight:800}#jarvis-action-panel button.secondary{background:#17283b;color:#c7eaff;border-color:#466b8d}#jarvis-action-panel button:disabled{opacity:.55}#jarvis-action-status{font-size:11px;color:#a9bed2;margin:4px 0 8px}#jarvis-action-result,#jarvis-team-results{white-space:pre-wrap;line-height:1.55;margin-top:10px;color:#e7f1fa;font-size:12px}#jarvis-agent-console{margin-top:14px;padding-top:13px;border-top:1px solid #345573}.jarvis-agent-head{display:flex;justify-content:space-between;gap:8px;font-size:11px;color:#e8b95f}.jarvis-agent-head span{color:#9eb5ca;font-size:10px}.jarvis-agent-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}.jarvis-agent{background:#0b1929;border:1px solid #294763;border-radius:10px;padding:9px;display:grid;grid-template-columns:22px 1fr;gap:3px 5px}.jarvis-agent i{grid-row:span 2;color:#e8b95f;font-style:normal}.jarvis-agent b{font-size:10px;color:#eff8ff}.jarvis-agent small{grid-column:2;color:#92abc2;font-size:9px}.jarvis-agent em{grid-column:2;font-style:normal;font-size:9px;color:#9db0c2}.jarvis-agent.running{border-color:#e8b95f;box-shadow:0 0 12px #e8b95f33}.jarvis-agent.running em{color:#f1c96e}.jarvis-agent.done{border-color:#52d9a2}.jarvis-agent.done em{color:#72e0b0}.jarvis-agent.failed{border-color:#e65a63}.jarvis-agent.failed em{color:#ff8990}#jarvis-team-run{width:100%;margin-top:9px}#jarvis-team-results .agent-result{padding:10px;margin-top:8px;background:#0a1726;border:1px solid #284763;border-radius:10px;white-space:pre-wrap}#jarvis-team-results .agent-result strong{display:block;color:#e8b95f;margin-bottom:5px}#jarvis-field-ops{margin-top:17px;padding:16px;border:1px solid #65c8ff66;border-radius:17px;background:linear-gradient(145deg,#102b46,#081321);box-shadow:0 12px 30px #0005}#jarvis-field-ops .ops-kicker{font:9px Orbitron,sans-serif;letter-spacing:2px;color:#e8b95f}#jarvis-field-ops h3{font:700 15px Orbitron,sans-serif;color:#d9efff;margin:7px 0}#jarvis-field-ops p{font-size:11px;color:#afc4d7;line-height:1.5}#jarvis-field-ops .ops-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:12px 0}#jarvis-field-ops .ops-stat{padding:9px 6px;border:1px solid #345573;border-radius:10px;background:#071321;text-align:center}#jarvis-field-ops .ops-stat b{display:block;font:700 14px Orbitron;color:#8fd8ff}#jarvis-field-ops .ops-stat small{font-size:8px;color:#9eb5ca}#jarvis-field-ops button{width:100%;padding:10px;border-radius:10px;border:1px solid #65c8ff;background:#1768c4;color:white;font-weight:800}";
document.head.appendChild(style);
const launch=document.createElement("button");launch.id="jarvis-action-launch";launch.textContent="✦ AVENGERS / JARVIS";
const panel=document.createElement("section");panel.id="jarvis-action-panel";
panel.innerHTML='<div class="jarvis-kicker">STARK INDUSTRIES • IRON PARADISE</div><h3>AVENGERS COMMAND CENTER</h3><div id="jarvis-action-status">Système prêt · 9 agents spécialisés.</div><input id="jarvis-action-token" type="password" autocomplete="off" placeholder="Clé d’accès JARVIS"><textarea id="jarvis-action-message" placeholder="Décris ta mission : programme ma semaine sport et adapte les repas à mes séances…"></textarea><button id="jarvis-action-send">Exécuter avec JARVIS</button><button class="secondary" id="jarvis-connection-check">Diagnostic système</button><button class="secondary" id="jarvis-action-close">Fermer</button><div id="jarvis-action-result" aria-live="polite"></div><div id="jarvis-agent-console"><div class="jarvis-agent-head"><b>AVENGERS FIELD TEAM</b><span id="jarvis-agent-state">9 spécialistes en veille</span></div><div class="jarvis-agent-grid" id="jarvis-agent-grid"></div><button id="jarvis-team-run" class="secondary">Lancer le conseil des 9 agents</button><button id="jarvis-weekly-plan" class="secondary">Générer mon programme sportif de la semaine</button><div id="jarvis-team-results"></div></div>';
document.body.append(launch,panel);
const $=id=>document.getElementById(id);
$("jarvis-agent-grid").innerHTML=AGENTS.map(a=>'<div class="jarvis-agent" data-agent="'+a[0]+'"><i>'+a[1]+'</i><b>'+a[2]+'</b><small>'+a[3]+'</small><em>En attente</em></div>').join("");
$("jarvis-action-token").value=sessionStorage.getItem(TOKEN_KEY)||"";
launch.addEventListener("click",()=>panel.classList.toggle("open"));
$("jarvis-action-close").addEventListener("click",()=>panel.classList.remove("open"));
function dailyContext(){
 const today=new Date().toLocaleDateString("en-CA"),meals=(state.meals||[]).filter(x=>x.date===today),workouts=(state.workouts||[]).filter(x=>x.date===today),latest=(state.weights||[]).slice(-1)[0];
 return {date:today,weight:latest?latest.weight:null,goal:state.goal||null,xp:state.xp||0,meals:meals.map(x=>({name:x.name,type:x.type,calories:x.calories,protein:x.protein})),dailyCalories:meals.reduce((n,x)=>n+(Number(x.calories)||0),0),dailyProtein:meals.reduce((n,x)=>n+(Number(x.protein)||0),0),workouts:workouts.map(x=>({name:x.name,type:x.type,duration:x.duration,intensity:x.intensity})),workoutCount:workouts.length};
}
function buildContext(){const history={weights:(state.weights||[]).slice(-8),recentWorkouts:(state.workouts||[]).slice(-12),recentMeals:(state.meals||[]).slice(-12),completedMissions:state.completedMissions||[],shoppingCount:(state.shopping||[]).length};return JSON.stringify({source:"JARVIS IRON PARADISE — données réellement saisies",today:dailyContext(),history,existingModules:["suivi du poids et objectif","journal nutrition calories/protéines","liste de courses","journal des séances","missions quotidiennes et XP","tableau de bord Avengers"],principles:["sport prioritaire","nutrition coordonnée aux séances","récupération prise en compte","aucune donnée inventée","progression durable et non punitive"]});}
function setAgentState(mode,label){
 $("jarvis-agent-state").textContent=label;
 panel.querySelectorAll(".jarvis-agent").forEach(card=>{card.classList.remove("running","done","failed");card.querySelector("em").textContent=mode==="running"?"Analyse en cours…":mode==="done"?"Analyse terminée":mode==="failed"?"Échec":"En attente";if(mode!=="idle")card.classList.add(mode);});
}
function renderAgentResults(data){
 const results=Array.isArray(data.agentResults)?data.agentResults:[],host=$("jarvis-team-results");host.textContent="";
 const summary=document.createElement("p");summary.textContent=String(data.reply||"Analyses des spécialistes");host.appendChild(summary);if(data.executiveSummary){const executive=document.createElement("div");executive.className="agent-result";const heading=document.createElement("strong"),body=document.createElement("div");heading.textContent="JARVIS — SYNTHÈSE DU DIRECTEUR";body.textContent=String(data.executiveSummary);executive.append(heading,body);host.appendChild(executive);}
 if(!results.length){const note=document.createElement("p");note.textContent="Le serveur n’a pas fourni agentResults. Champs reçus : "+Object.keys(data||{}).join(", ");host.appendChild(note);return;}
 results.forEach(item=>{
  const card=document.createElement("div");card.className="agent-result";const title=document.createElement("strong"),body=document.createElement("div");
  title.textContent=String(item.name||item.agent||"Agent");body.textContent=String(item.analysis||"Aucune analyse renvoyée.");card.append(title,body);host.appendChild(card);
  const agentCard=panel.querySelector('[data-agent="'+String(item.agent)+'"]');
  if(agentCard){const failed=item.status==="failed";agentCard.classList.remove("running","done","failed");agentCard.classList.add(failed?"failed":"done");agentCard.querySelector("em").textContent=failed?"À relancer":"Analyse terminée";}
 });
 $("jarvis-agent-state").textContent=results.filter(x=>x.status==="completed").length+"/"+AGENTS.length+" agents ont répondu";try{localStorage.setItem("jarvis_avengers_last_report_v2",JSON.stringify({reply:data.reply,executiveSummary:data.executiveSummary||"",agentResults:results,generatedAt:data.generatedAt||new Date().toISOString(),message:$("jarvis-action-message").value}));}catch(e){}renderSavedReport();
}
async function runTeam(automatic){
 const message=$("jarvis-action-message").value.trim()||"Audit stratégique de JARVIS IRON PARADISE : sport prioritaire, nutrition synchronisée, récupération, suivi des progrès, expérience Avengers et fonctionnalités gratuites concrètes.";
 const token=$("jarvis-action-token").value.trim();
 if(!token){$("jarvis-team-results").textContent="Clé d’accès absente de cette session. Elle n’est pas enregistrée dans le code. Renseigne-la pour lancer les agents.";setAgentState("idle","Connexion requise");return;}
 sessionStorage.setItem(TOKEN_KEY,token);
 const button=$("jarvis-team-run");button.disabled=true;
 const host=$("jarvis-team-results");host.textContent="";
 const context=buildContext(),results=[];
 const healthResponse=await fetch(API+"/health",{cache:"no-store"}),health=await healthResponse.json();
 if(!healthResponse.ok||health.deployment!=="avengers-nine-agents-one-request-v3"){
  $("jarvis-team-results").textContent="Le Worker Cloudflare n’a pas encore reçu la nouvelle version agent par agent. Version détectée : "+String(health.deployment||"inconnue")+". Aucun appel aux agents n’a été lancé pour éviter de relancer l’ancien conseil complet.";
  $("jarvis-agent-state").textContent="Mise à jour Worker requise";button.disabled=false;return;
 }
 const intro=document.createElement("p");intro.textContent=automatic?"JARVIS lance les 9 analyses séparément…":"JARVIS lance les spécialistes un par un…";host.appendChild(intro);
 $("jarvis-agent-state").textContent="0/9 agents terminés";
 panel.querySelectorAll(".jarvis-agent").forEach(card=>{card.classList.remove("running","done","failed");card.querySelector("em").textContent="En attente";});
 try{
  for(let i=0;i<AGENTS.length;i++){
   const agent=AGENTS[i],card=panel.querySelector('[data-agent="'+agent[0]+'"]');
   if(card){card.classList.remove("done","failed");card.classList.add("running");card.querySelector("em").textContent="Analyse "+(i+1)+"/9…";}
   $("jarvis-agent-state").textContent=(i+1)+"/9 · "+agent[2]+" en cours";
   const status=document.createElement("p");status.textContent="Analyse "+(i+1)+"/9 — "+agent[2]+"…";host.appendChild(status);
   try{
    const response=await fetch(API+"/team",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({agentId:agent[0],message,context})});
    let data={};try{data=await response.json();}catch(e){}
    if(!response.ok)throw new Error(data.error||"Erreur API "+response.status);
    const item=(Array.isArray(data.agentResults)&&data.agentResults[0])||{agent:agent[0],name:agent[2],status:"failed",analysis:"Le Worker n'a renvoyé aucun résultat."};
    results.push(item);
    if(card){card.classList.remove("running");card.classList.add(item.status==="completed"?"done":"failed");card.querySelector("em").textContent=item.status==="completed"?"Analyse terminée":"Échec — suite";}
    const resultCard=document.createElement("div");resultCard.className="agent-result";
    const heading=document.createElement("strong"),body=document.createElement("div");
    heading.textContent=(i+1)+". "+String(item.name||agent[2])+" — "+(item.status==="completed"?"TERMINÉ":"ÉCHEC");
    body.textContent=String(item.analysis||"Aucune analyse renvoyée.");resultCard.append(heading,body);host.appendChild(resultCard);
   }catch(agentError){
    const item={agent:agent[0],name:agent[2],status:"failed",analysis:"Erreur : "+agentError.message};results.push(item);
    if(card){card.classList.remove("running");card.classList.add("failed");card.querySelector("em").textContent="Échec — suite";}
    const resultCard=document.createElement("div");resultCard.className="agent-result";
    const heading=document.createElement("strong"),body=document.createElement("div");heading.textContent=(i+1)+". "+agent[2]+" — ÉCHEC";body.textContent=item.analysis;resultCard.append(heading,body);host.appendChild(resultCard);
   }
   $("jarvis-agent-state").textContent=(i+1)+"/9 traités · "+results.filter(x=>x.status==="completed").length+" réussis";
  }
  const completed=results.filter(x=>x.status==="completed").length;
  const summary="Conseil Avengers terminé : "+completed+"/9 analyses réussies. Chaque spécialiste a été interrogé dans une requête indépendante. "+(completed<9?"Les agents en échec sont identifiés individuellement et n'ont pas bloqué les suivants.":"Les neuf spécialistes ont répondu.");
  const top=document.createElement("div");top.className="agent-result";
  const title=document.createElement("strong"),body=document.createElement("div");title.textContent="JARVIS — BILAN DU CONSEIL";body.textContent=summary;top.prepend(title,body);host.insertBefore(top,host.children[1]||null);
  const report={reply:summary,executiveSummary:"Les neuf avis sont affichés individuellement ci-dessus. Aucun appel IA de synthèse supplémentaire n'est lancé.",agentResults:results,generatedAt:new Date().toISOString(),message};
  try{localStorage.setItem("jarvis_avengers_last_report_v2",JSON.stringify(report));localStorage.setItem("jarvis_avengers_audit_date_v2",new Date().toLocaleDateString("en-CA"));}catch(e){}
  renderSavedReport();$("jarvis-action-status").textContent=summary;
 }catch(error){
  $("jarvis-action-status").textContent="Conseil interrompu : "+error.message;
 }finally{button.disabled=false;}
}
$("jarvis-team-run").addEventListener("click",()=>runTeam(false));$("jarvis-weekly-plan").addEventListener("click",launchWeeklyPlan);function launchWeeklyPlan(){panel.classList.add("open");$("jarvis-action-message").value="MISSION PROGRAMME HEBDOMADAIRE : bâtis un plan sportif de 7 jours réaliste et progressif. Le sport est prioritaire. Pour chaque jour, précise objectif, type de séance, durée indicative, niveau d’effort et récupération. Coordonne les conseils nutritionnels et les repas avec les jours d’entraînement. Prévois des jours de repos. N’invente ni matériel, ni disponibilité, ni limitation médicale : indique les informations manquantes et propose des options prudentes. Termine par les 3 premières actions à réaliser.";runTeam(false);}
$("jarvis-connection-check").addEventListener("click",async()=>{
 const button=$("jarvis-connection-check");button.disabled=true;$("jarvis-action-status").textContent="Diagnostic du réacteur…";
 try{const response=await fetch(API+"/health",{cache:"no-store"}),data=await response.json();if(!response.ok)throw new Error("HTTP "+response.status);$("jarvis-action-status").textContent="Worker "+data.status+" · IA "+data.ai+" · "+data.agents+" agents · clé serveur "+(data.tokenConfigured?"détectée":"absente")+" · "+data.deployment;}
 catch(error){$("jarvis-action-status").textContent="Diagnostic impossible : "+error.message;}finally{button.disabled=false;}
});
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
 if(!token){$("jarvis-action-result").textContent="Clé d’accès absente. Aucune action n’a été exécutée.";return;}if(!message){$("jarvis-action-result").textContent="Décris la mission à exécuter.";return;}
 sessionStorage.setItem(TOKEN_KEY,token);$("jarvis-action-send").disabled=true;$("jarvis-action-status").textContent="JARVIS analyse la mission et les données du jour…";$("jarvis-action-result").textContent="";
 try{
  const response=await fetch(API+"/act",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({message,context:buildContext()})}),data=await response.json();
  if(!response.ok)throw new Error(data.error||"Erreur API "+response.status);
  const applied=[];(Array.isArray(data.actions)?data.actions:[]).forEach(a=>applied.push(applyAction(a)));if(applied.length){saveState();render();}
  $("jarvis-action-result").textContent=(data.reply||"Mission analysée.")+(applied.length?"\n\nActions effectuées :\n• "+applied.join("\n• "):"\n\nAucune action à appliquer : JARVIS demande éventuellement une précision ou fournit une recommandation.");
  $("jarvis-action-status").textContent=applied.length?applied.length+" action(s) exécutée(s) et sauvegardée(s).":"Analyse terminée.";
 }catch(error){$("jarvis-action-status").textContent="Mission non exécutée";$("jarvis-action-result").textContent=error.message;}finally{$("jarvis-action-send").disabled=false;}
});
function renderFieldOps(){
 if(!$("jarvis-field-ops"))return;const c=dailyContext();$("ops-calories").textContent=c.dailyCalories.toLocaleString("fr-FR");$("ops-protein").textContent=c.dailyProtein+" g";$("ops-training").textContent=String(c.workoutCount);
 $("ops-guidance").textContent=c.workoutCount?"Séance enregistrée : nutrition et récupération seront évaluées avec cette activité.":"Aucune séance enregistrée aujourd’hui : le coach privilégiera une progression réaliste et adaptée.";
}
function mountFieldOps(){
 const home=$("page-home");if(!home||$("jarvis-field-ops"))return;
 const box=document.createElement("section");box.id="jarvis-field-ops";box.innerHTML='<div class="ops-kicker">AVENGERS FIELD OPERATIONS</div><h3>SPORT × NUTRITION : SYNCHRONISATION</h3><p id="ops-guidance">Les données du jour alimentent les analyses JARVIS.</p><div class="ops-grid"><div class="ops-stat"><b id="ops-calories">0</b><small>KCALS SAISIES</small></div><div class="ops-stat"><b id="ops-protein">0 g</b><small>PROTÉINES</small></div><div class="ops-stat"><b id="ops-training">0</b><small>SÉANCES DU JOUR</small></div></div><button type="button" id="ops-open-command">OUVRIR LE QG AVENGERS</button><button type="button" id="ops-weekly-plan">GÉNÉRER MON PROGRAMME DE LA SEMAINE</button><div class="ops-kicker" style="margin-top:15px">DERNIER RAPPORT DES AGENTS</div><p id="jarvis-saved-report">Aucun rapport des agents pour le moment.</p>';
 const title=[...home.querySelectorAll(".section-title")].find(el=>el.textContent.includes("PROTOCOLE DU JOUR"));if(title)title.after(box);else home.appendChild(box);
 $("ops-open-command").addEventListener("click",()=>{panel.classList.add("open");$("jarvis-action-message").value="Analyse mes données du jour et synchronise les recommandations sport, nutrition et récupération.";});$("ops-weekly-plan").addEventListener("click",launchWeeklyPlan);
}
const originalRender=render;render=function(){originalRender();renderFieldOps();};mountFieldOps();renderFieldOps();
function renderSavedReport(){const host=$("jarvis-saved-report");if(!host)return;try{const saved=JSON.parse(localStorage.getItem("jarvis_avengers_last_report_v2")||"null");if(!saved){host.textContent="Aucun rapport des agents pour le moment.";return;}host.textContent=(saved.generatedAt?new Date(saved.generatedAt).toLocaleString("fr-FR")+" · ":"")+(saved.reply||"Dernier rapport disponible")+(saved.executiveSummary?"\n\n"+saved.executiveSummary:"");}catch(e){host.textContent="Rapport précédent illisible.";}}renderSavedReport();
if(sessionStorage.getItem(TOKEN_KEY)&&localStorage.getItem("jarvis_avengers_audit_date_v2")!==new Date().toLocaleDateString("en-CA")){
 panel.classList.add("open");
 $("jarvis-action-message").value="Lance le premier conseil Avengers : audite JARVIS IRON PARADISE, propose les nouvelles fonctionnalités et définis un plan priorisé. Le sport est la priorité absolue ; relie entraînement, nutrition et récupération. Préserve toutes les données et fonctions existantes.";
 setTimeout(()=>runTeam(true),500);
}
})();