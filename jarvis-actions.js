(() => {
"use strict";
const API="https://jarvis-iron-paradise.antoine-delage2001.workers.dev",TOKEN_KEY="jarvis_api_token";
const AGENTS=[["product","◈","Architecte produit","Roadmap & expérience"],["sport","⚡","Coach sportif","Entraînement & progression"],["programming","✧","Architecte entraînement","Programmes & progression"],["nutrition","✦","Nutrition sportive","Carburant & apports"],["mealprep","♨","Chef nutrition","Menus & préparation"],["recovery","☾","Récupération","Sommeil & repos"],["performance","⌁","Analyste performance","Tendances & indicateurs"],["habits","◆","Coach discipline","Habitudes & régularité"],["quality","⛭","Ingénieur qualité","Sécurité & fiabilité"]];
const DESIGN_AGENTS=[["art-direction","✦","Directeur artistique","Identité visuelle"],["ux-mobile","⌁","Architecte UX mobile","Navigation iPhone"],["ui-system","◈","Designer UI system","Composants & design system"],["dashboard","▦","Designer dashboard","Données & visualisation"],["design-quality","⛭","QA design & accessibilité","Contraste & non-régression"]];
const style=document.createElement("style");
style.textContent="#jarvis-action-launch{position:fixed;right:15px;bottom:94px;z-index:9998;border:1px solid #65c8ff;background:linear-gradient(120deg,#124b82,#0a1b30);color:#eaf7ff;border-radius:999px;padding:13px 16px;font-weight:900;letter-spacing:.6px;box-shadow:0 8px 28px #000b,0 0 18px #238eff55}#jarvis-action-panel{display:none;position:fixed;z-index:9999;inset:auto 10px 150px;width:auto;max-width:520px;max-height:74vh;overflow:auto;background:linear-gradient(145deg,#12243a,#070f1b);color:#f2f7fc;border:1px solid #65c8ff88;border-radius:20px;padding:16px;box-shadow:0 18px 60px #000e;font:14px Inter,system-ui}#jarvis-action-panel.open{display:block}#jarvis-action-panel h3{font:800 17px Orbitron,Inter,sans-serif;letter-spacing:1px;margin:0 0 7px;color:#a9e2ff}#jarvis-action-panel .jarvis-kicker{font:9px Orbitron,sans-serif;letter-spacing:2px;color:#e8b95f;margin-bottom:9px}#jarvis-action-panel input,#jarvis-action-panel textarea{width:100%;background:#071321;color:#fff;border:1px solid #345573;border-radius:10px;padding:11px;margin:6px 0}#jarvis-action-panel textarea{min-height:85px;resize:vertical}#jarvis-action-panel button{border:1px solid #65c8ff;border-radius:10px;padding:11px 13px;margin:5px 4px 5px 0;background:linear-gradient(110deg,#1768c4,#3e9fd8);color:#fff;font-weight:800}#jarvis-action-panel button.secondary{background:#17283b;color:#c7eaff;border-color:#466b8d}#jarvis-action-panel button:disabled{opacity:.55}#jarvis-action-status{font-size:11px;color:#a9bed2;margin:4px 0 8px}#jarvis-action-result,#jarvis-team-results{white-space:pre-wrap;line-height:1.55;margin-top:10px;color:#e7f1fa;font-size:12px}#jarvis-agent-console{margin-top:14px;padding-top:13px;border-top:1px solid #345573}.jarvis-agent-head{display:flex;justify-content:space-between;gap:8px;font-size:11px;color:#e8b95f}.jarvis-agent-head span{color:#9eb5ca;font-size:10px}.jarvis-agent-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}.jarvis-agent{background:#0b1929;border:1px solid #294763;border-radius:10px;padding:9px;display:grid;grid-template-columns:22px 1fr;gap:3px 5px}.jarvis-agent i{grid-row:span 2;color:#e8b95f;font-style:normal}.jarvis-agent b{font-size:10px;color:#eff8ff}.jarvis-agent small{grid-column:2;color:#92abc2;font-size:9px}.jarvis-agent em{grid-column:2;font-style:normal;font-size:9px;color:#9db0c2}.jarvis-agent.running{border-color:#e8b95f;box-shadow:0 0 12px #e8b95f33}.jarvis-agent.running em{color:#f1c96e}.jarvis-agent.done{border-color:#52d9a2}.jarvis-agent.done em{color:#72e0b0}.jarvis-agent.failed{border-color:#e65a63}.jarvis-agent.failed em{color:#ff8990}#jarvis-team-run{width:100%;margin-top:9px}#jarvis-team-results .agent-result{padding:10px;margin-top:8px;background:#0a1726;border:1px solid #284763;border-radius:10px;white-space:pre-wrap}#jarvis-team-results .agent-result strong{display:block;color:#e8b95f;margin-bottom:5px}#jarvis-field-ops{margin-top:17px;padding:16px;border:1px solid #65c8ff66;border-radius:17px;background:linear-gradient(145deg,#102b46,#081321);box-shadow:0 12px 30px #0005}#jarvis-field-ops .ops-kicker{font:9px Orbitron,sans-serif;letter-spacing:2px;color:#e8b95f}#jarvis-field-ops h3{font:700 15px Orbitron,sans-serif;color:#d9efff;margin:7px 0}#jarvis-field-ops p{font-size:11px;color:#afc4d7;line-height:1.5}#jarvis-field-ops .ops-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:12px 0}#jarvis-field-ops .ops-stat{padding:9px 6px;border:1px solid #345573;border-radius:10px;background:#071321;text-align:center}#jarvis-field-ops .ops-stat b{display:block;font:700 14px Orbitron;color:#8fd8ff}#jarvis-field-ops .ops-stat small{font-size:8px;color:#9eb5ca}#jarvis-field-ops button{width:100%;padding:10px;border-radius:10px;border:1px solid #65c8ff;background:#1768c4;color:white;font-weight:800}";
style.textContent += "#jarvis-profile-open{width:100%;margin:5px 0}#jarvis-profile-status{font-size:10px;color:#9dbbd2;margin:0 0 8px}#jarvis-profile-modal{display:none;position:fixed;inset:0;z-index:10001;background:#020812ef;padding:10px;overflow:auto;align-items:center;justify-content:center;font:14px Inter,system-ui;color:#eff8ff}#jarvis-profile-modal.open{display:flex}#jarvis-profile-modal .jarvis-profile-card{width:min(100%,620px);max-height:94vh;overflow:auto;background:linear-gradient(145deg,#142b43,#071321);border:1px solid #65c8ff99;border-radius:20px;padding:15px}#jarvis-profile-modal h3{font:800 18px Orbitron,Inter,sans-serif;color:#b9e8ff;margin:5px 0 8px}#jarvis-profile-modal .jarvis-profile-intro{font-size:11px;line-height:1.5;color:#b0c5d8}#jarvis-profile-modal .jarvis-profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}#jarvis-profile-modal label{display:block;font-size:10px;color:#c7def0}#jarvis-profile-modal label.wide{grid-column:1/-1}#jarvis-profile-modal input,#jarvis-profile-modal select,#jarvis-profile-modal textarea{display:block;width:100%;box-sizing:border-box;margin-top:5px;background:#071321;color:#fff;border:1px solid #345573;border-radius:9px;padding:10px;font:13px Inter,system-ui}#jarvis-profile-modal .jarvis-profile-actions{display:flex;gap:8px;margin-top:12px}#jarvis-profile-modal .jarvis-profile-actions button{flex:1;margin:0}#jp-feedback{font-size:11px;color:#8de6bd;margin-top:8px}@media(max-width:430px){#jarvis-profile-modal .jarvis-profile-grid{gap:6px}}";
document.head.appendChild(style);
const launch=document.createElement("button");launch.id="jarvis-action-launch";launch.textContent="✦ AVENGERS / JARVIS";
const panel=document.createElement("section");panel.id="jarvis-action-panel";
panel.innerHTML='<div class="jarvis-kicker">STARK INDUSTRIES • IRON PARADISE</div><h3>AVENGERS COMMAND CENTER</h3><div id="jarvis-action-status">Système prêt · 9 agents spécialisés.</div><button type="button" class="secondary" id="jarvis-profile-open">◈ MON PROFIL SPORTIF</button><div id="jarvis-profile-status" class="jarvis-profile-status">Profil non renseigné.</div><button type="button" class="secondary" id="jarvis-history-toggle">📋 DERNIÈRES SESSIONS / COPIER</button><div id="jarvis-report-history" hidden></div><input id="jarvis-action-token" type="password" autocomplete="off" placeholder="Clé d’accès JARVIS"><button type="button" class="secondary" id="jarvis-token-save">ENREGISTRER LA CLÉ SUR CET IPHONE</button><div id="jarvis-token-status" style="font-size:10px;color:#9dbbd2;margin:0 0 8px">Clé non vérifiée sur cet appareil.</div><textarea id="jarvis-action-message" placeholder="Décris ta mission : programme ma semaine sport et adapte les repas à mes séances…"></textarea><button id="jarvis-action-send">Exécuter avec JARVIS</button><button class="secondary" id="jarvis-connection-check">Diagnostic système</button><button class="secondary" id="jarvis-action-close">Fermer</button><div id="jarvis-action-result" aria-live="polite"></div><div id="jarvis-agent-console"><div class="jarvis-agent-head"><b>AVENGERS FIELD TEAM</b><span id="jarvis-agent-state">9 spécialistes en veille</span></div><div class="jarvis-agent-grid" id="jarvis-agent-grid"></div><div id="jarvis-autonomy-status" class="agent-result">Agents en attente de connexion au service autonome…</div><div id="jarvis-team-results"></div></div>';
document.body.append(launch,panel);
style.textContent += "#jarvis-design-console{margin-top:15px;padding-top:14px;border-top:1px solid #345573}#jarvis-design-console .design-kicker{font:9px Orbitron,sans-serif;letter-spacing:2px;color:#e8b95f}#jarvis-design-console h4{font:700 14px Orbitron,sans-serif;color:#d9efff;margin:7px 0}#jarvis-design-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:10px 0}#jarvis-design-grid .jarvis-agent{min-height:58px}#jarvis-design-run{width:100%;margin-top:8px}#jarvis-design-results{font-size:12px;line-height:1.55}#jarvis-design-results .agent-result{padding:10px;margin-top:8px;background:#0a1726;border:1px solid #284763;border-radius:10px;white-space:pre-wrap}";
panel.insertAdjacentHTML("beforeend", '<div id="jarvis-design-console"><div class="design-kicker">STARK CREATIVE LAB</div><h4>ÉQUIPE DESIGN JARVIS</h4><p style="font-size:10px;color:#9eb5ca;line-height:1.5">5 spécialistes dédiés à la refonte visuelle et à l’expérience mobile. Analyses séparées, sans modifier automatiquement l’application.</p><div id="jarvis-design-grid"></div><div id="jarvis-design-results"></div></div>');
$("jarvis-design-grid").innerHTML=DESIGN_AGENTS.map(x=>'<div class="jarvis-agent" data-design-agent="'+x[0]+'"><i>'+x[1]+'</i><b>'+x[2]+'</b><small>'+x[3]+'</small><em>En attente</em></div>').join("");
const profileModal=document.createElement("div");profileModal.id="jarvis-profile-modal";
profileModal.innerHTML='<div class="jarvis-profile-card" role="dialog" aria-modal="true"><div class="jarvis-kicker">IRON PARADISE / BIOMETRIC PROFILE</div><h3>CONFIGURATION DU PROFIL</h3><p class="jarvis-profile-intro">Renseigne ces informations une seule fois. Elles seront conservées sur cet appareil et transmises automatiquement aux 9 spécialistes.</p><div class="jarvis-profile-grid"><label>Âge (ans)<input id="jp-age" type="number" min="16" max="100" placeholder="Ex. 25"></label><label>Sexe<select id="jp-sex"><option value="">Non précisé</option><option>Homme</option><option>Femme</option><option>Autre / préfère préciser</option></select></label><label>Taille (cm)<input id="jp-height" type="number" min="100" max="230" placeholder="Ex. 185"></label><label>Poids actuel (kg)<input id="jp-weight" type="number" min="30" max="350" step="0.1" placeholder="Dernière pesée si connue"></label><label class="wide">Objectif principal<select id="jp-goal"><option value="">Choisir…</option><option>Perte de graisse progressive</option><option>Recomposition corporelle</option><option>Prise de muscle</option><option>Renforcement et forme générale</option><option>Endurance et condition physique</option></select></label><label>Niveau actuel<select id="jp-level"><option value="">Choisir…</option><option>Débutant / reprise</option><option>Intermédiaire</option><option>Avancé</option></select></label><label>Séances par semaine<select id="jp-days"><option value="">Choisir…</option><option value="2">2 séances</option><option value="3">3 séances</option><option value="4">4 séances</option><option value="5">5 séances</option><option value="6">6 séances</option></select></label><label>Durée par séance<select id="jp-duration"><option value="">Choisir…</option><option>20-30 minutes</option><option>30-45 minutes</option><option>45-60 minutes</option><option>60-75 minutes</option><option>75-90 minutes</option></select></label><label class="wide">Matériel disponible<textarea id="jp-equipment" rows="2" placeholder="Ex. haltères réglables, barre, tapis, poids du corps…"></textarea></label><label class="wide">Douleurs, blessures ou limites à respecter<textarea id="jp-limits" rows="2" placeholder="Ex. genoux sensibles, douleur au dos, aucune…"></textarea></label><label class="wide">Autres précisions (facultatif)<textarea id="jp-notes" rows="2" placeholder="Horaires, préférences, exercices à éviter…"></textarea></label></div><div class="jarvis-profile-actions"><button type="button" id="jp-save">ENREGISTRER MON PROFIL</button><button type="button" class="secondary" id="jp-cancel">Plus tard</button></div><div id="jp-feedback"></div></div>';
document.body.appendChild(profileModal);
const $=id=>document.getElementById(id);
$("jarvis-agent-grid").innerHTML=AGENTS.map(a=>'<div class="jarvis-agent" data-agent="'+a[0]+'"><i>'+a[1]+'</i><b>'+a[2]+'</b><small>'+a[3]+'</small><em>En attente</em></div>').join("");
$("jarvis-action-token").value=localStorage.getItem(TOKEN_KEY)||"";

async function refreshAutonomyStatus(){
 const host=$("jarvis-autonomy-status");if(!host)return;
 const token=localStorage.getItem(TOKEN_KEY)||$("jarvis-action-token").value.trim();
 if(!token){host.textContent="AUTONOMIE EN ATTENTE · Enregistre la clé d’accès sur cet iPhone pour consulter l’état du service.";return;}
 try{
  const response=await fetch(API+"/autonomy/status",{headers:{"Authorization":"Bearer "+token},cache:"no-store"});
  const data=await response.json();if(!response.ok)throw new Error(data.error||"HTTP "+response.status);
  if(data.status==="needs_storage"){host.textContent="AUTONOMIE NON ACTIVÉE · Le stockage persistant JARVIS_MEMORY doit être relié au Worker Cloudflare.";return;}
  if(data.status==="scheduled_not_started"){host.textContent="AUTONOMIE PROGRAMMÉE · Le premier cycle horaire n’a pas encore été confirmé.";return;}
  host.textContent="AGENTS AUTONOMES ACTIFS · "+data.completedCycles+" cycles terminés · dernier agent : "+(data.lastAgent||"en attente")+" · "+(data.lastRunAt?new Date(data.lastRunAt).toLocaleString("fr-FR"):"aucun cycle confirmé")+".";
 }catch(error){host.textContent="ÉTAT AUTONOME INDISPONIBLE · "+error.message;}
}

launch.addEventListener("click",()=>{panel.classList.toggle("open");if(panel.classList.contains("open")){refreshAutonomyStatus();if(!state.profile)openProfileModal();}});
$("jarvis-action-close").addEventListener("click",()=>panel.classList.remove("open"));
function updateProfileStatus(){const p=state.profile,el=$("jarvis-profile-status");if(!el)return;el.textContent=p?("Profil enregistré · "+[p.age?p.age+" ans":"",p.heightCm?p.heightCm+" cm":"",p.goal||""].filter(Boolean).join(" · ")):"Profil non renseigné — configure-le pour personnaliser les 9 agents.";}
function openProfileModal(){const p=state.profile||{},latest=(state.weights||[]).slice(-1)[0];const fields={age:p.age,sex:p.sex,height:p.heightCm,weight:p.weightKg??(latest?latest.weight:""),goal:p.goal,level:p.level,days:p.sessionsPerWeek,duration:p.sessionDuration,equipment:p.equipment,limits:p.limitations,notes:p.notes};Object.entries(fields).forEach(([k,v])=>{const el=$("jp-"+k);if(el)el.value=v??"";});$("jp-feedback").textContent="";profileModal.classList.add("open");}
function saveProfile(){const v=id=>$("jp-"+id).value.trim(),age=Number(v("age")),height=Number(v("height")),weight=v("weight")===""?null:Number(v("weight"));if(!age||age<16||age>100){$("jp-feedback").textContent="Indique un âge valide (16 à 100 ans).";return;}if(!height||height<100||height>230){$("jp-feedback").textContent="Indique une taille valide (100 à 230 cm).";return;}if(weight!==null&&(!Number.isFinite(weight)||weight<30||weight>350)){$("jp-feedback").textContent="Vérifie le poids indiqué.";return;}state.profile={age,sex:v("sex")||null,heightCm:height,weightKg:weight,goal:v("goal")||null,level:v("level")||null,sessionsPerWeek:Number(v("days"))||null,sessionDuration:v("duration")||null,equipment:v("equipment"),limitations:v("limits"),notes:v("notes"),updatedAt:new Date().toISOString()};saveState();profileModal.classList.remove("open");updateProfileStatus();render();}
$("jarvis-profile-open").addEventListener("click",openProfileModal);$("jp-save").addEventListener("click",saveProfile);$("jp-cancel").addEventListener("click",()=>profileModal.classList.remove("open"));profileModal.addEventListener("click",e=>{if(e.target===profileModal)profileModal.classList.remove("open");});updateProfileStatus();
function dailyContext(){
 const today=new Date().toLocaleDateString("en-CA"),meals=(state.meals||[]).filter(x=>x.date===today),workouts=(state.workouts||[]).filter(x=>x.date===today),latest=(state.weights||[]).slice(-1)[0];
 return {date:today,weight:latest?latest.weight:(state.profile?.weightKg??null),goal:state.goal||null,xp:state.xp||0,meals:meals.map(x=>({name:x.name,type:x.type,calories:x.calories,protein:x.protein})),dailyCalories:meals.reduce((n,x)=>n+(Number(x.calories)||0),0),dailyProtein:meals.reduce((n,x)=>n+(Number(x.protein)||0),0),workouts:workouts.map(x=>({name:x.name,type:x.type,duration:x.duration,intensity:x.intensity})),workoutCount:workouts.length};
}
function buildContext(){const history={weights:(state.weights||[]).slice(-8),recentWorkouts:(state.workouts||[]).slice(-12),recentMeals:(state.meals||[]).slice(-12),completedMissions:state.completedMissions||[],shoppingCount:(state.shopping||[]).length};return JSON.stringify({source:"JARVIS IRON PARADISE — données réellement saisies",profile:state.profile||null,today:dailyContext(),history,existingModules:["suivi du poids et objectif","journal nutrition calories/protéines","liste de courses","journal des séances","missions quotidiennes et XP","tableau de bord Avengers"],principles:["sport prioritaire","nutrition coordonnée aux séances","récupération prise en compte","aucune donnée inventée","progression durable et non punitive"]});}
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
 $("jarvis-agent-state").textContent=results.filter(x=>x.status==="completed").length+"/"+AGENTS.length+" agents ont répondu";saveAgentReport({reply:data.reply,executiveSummary:data.executiveSummary||"",agentResults:results,generatedAt:data.generatedAt||new Date().toISOString(),message:$("jarvis-action-message").value});
}
async function runTeam(automatic){
 const message=$("jarvis-action-message").value.trim()||"Audit stratégique de JARVIS IRON PARADISE : sport prioritaire, nutrition synchronisée, récupération, suivi des progrès, expérience Avengers et fonctionnalités gratuites concrètes.";
 const token=$("jarvis-action-token").value.trim();
 if(!token){$("jarvis-team-results").textContent="Clé d’accès absente. Saisis-la puis appuie sur « Enregistrer la clé sur cet iPhone ».";setAgentState("idle","Connexion requise");return;}
 localStorage.setItem(TOKEN_KEY,token);
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
  saveAgentReport(report);try{localStorage.setItem("jarvis_avengers_audit_date_v2",new Date().toLocaleDateString("en-CA"));}catch(e){}
  $("jarvis-action-status").textContent=summary;
 }catch(error){
  $("jarvis-action-status").textContent="Conseil interrompu : "+error.message;
 }finally{button.disabled=false;}
}


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
 localStorage.setItem(TOKEN_KEY,token);$("jarvis-action-send").disabled=true;$("jarvis-action-status").textContent="JARVIS analyse la mission et les données du jour…";$("jarvis-action-result").textContent="";
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
 const box=document.createElement("section");box.id="jarvis-field-ops";box.innerHTML='<div class="ops-kicker">AVENGERS FIELD OPERATIONS</div><h3>SPORT × NUTRITION : SYNCHRONISATION</h3><p id="ops-guidance">Les données du jour alimentent les analyses JARVIS.</p><div class="ops-grid"><div class="ops-stat"><b id="ops-calories">0</b><small>KCALS SAISIES</small></div><div class="ops-stat"><b id="ops-protein">0 g</b><small>PROTÉINES</small></div><div class="ops-stat"><b id="ops-training">0</b><small>SÉANCES DU JOUR</small></div></div><button type="button" id="ops-open-command">OUVRIR LE QG AVENGERS</button><button type="button" id="ops-weekly-plan">GÉNÉRER MON PROGRAMME DE LA SEMAINE</button><div class="ops-kicker" style="margin-top:15px">DERNIÈRES SESSIONS JARVIS</div><p id="jarvis-saved-report">Aucun rapport des agents pour le moment.</p><button type="button" id="ops-copy-last">COPIER LA DERNIÈRE SESSION</button><button type="button" id="ops-open-history">VOIR / COPIER L’HISTORIQUE</button>';
 const title=[...home.querySelectorAll(".section-title")].find(el=>el.textContent.includes("PROTOCOLE DU JOUR"));if(title)title.after(box);else home.appendChild(box);
 $("ops-open-command").addEventListener("click",()=>{panel.classList.add("open");$("jarvis-action-message").value="Analyse mes données du jour et synchronise les recommandations sport, nutrition et récupération.";});$("ops-weekly-plan").addEventListener("click",launchWeeklyPlan);$("ops-copy-last").addEventListener("click",()=>{try{const report=JSON.parse(localStorage.getItem("jarvis_avengers_last_report_v2")||"null");if(!report){$("ops-copy-last").textContent="AUCUNE SESSION";return;}copyReportText(reportToText(report),$("ops-copy-last"));}catch(e){$("ops-copy-last").textContent="ERREUR HISTORIQUE";}});$("ops-open-history").addEventListener("click",()=>{panel.classList.add("open");const host=$("jarvis-report-history");host.hidden=false;$("jarvis-history-toggle").textContent="MASQUER L’HISTORIQUE";renderReportHistory();host.scrollIntoView({behavior:"smooth",block:"start"});});
}
const originalRender=render;render=function(){originalRender();renderFieldOps();};mountFieldOps();renderFieldOps();
function saveAgentReport(report){
 try{localStorage.setItem("jarvis_avengers_last_report_v2",JSON.stringify(report));const history=JSON.parse(localStorage.getItem("jarvis_avengers_report_history_v1")||"[]");history.unshift(report);localStorage.setItem("jarvis_avengers_report_history_v1",JSON.stringify(history.slice(0,20)));}catch(e){console.warn("Historique JARVIS indisponible",e);}
 renderSavedReport();renderReportHistory();
}
function reportToText(report){
 const lines=[(report.generatedAt?new Date(report.generatedAt).toLocaleString("fr-FR"):"Rapport")+" · "+(report.reply||"Conseil Avengers")];
 if(report.executiveSummary)lines.push("\\nSYNTHÈSE JARVIS\\n"+report.executiveSummary);
 (Array.isArray(report.agentResults)?report.agentResults:[]).forEach(item=>lines.push("\\n"+(item.name||item.agent||"Agent")+" — "+(item.status==="completed"?"TERMINÉ":"ÉCHEC")+"\\n"+(item.analysis||"Aucune analyse conservée.")));
 return lines.join("\\n");
}
async function copyReportText(value,button){
 try{
  if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(value);
  else{const area=document.createElement("textarea");area.value=value;area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();document.execCommand("copy");area.remove();}
  const old=button.textContent;button.textContent="COPIÉ !";setTimeout(()=>button.textContent=old,1600);
 }catch(e){button.textContent="COPIE IMPOSSIBLE";}
}
function renderReportHistory(){
 const host=$("jarvis-report-history");if(!host)return;let history=[];
 try{history=JSON.parse(localStorage.getItem("jarvis_avengers_report_history_v1")||"[]");if(!history.length){const last=JSON.parse(localStorage.getItem("jarvis_avengers_last_report_v2")||"null");if(last)history=[last];}}catch(e){}
 host.textContent="";
 if(!history.length){const empty=document.createElement("p");empty.textContent="Aucun rapport enregistré sur cet iPhone.";host.appendChild(empty);return;}
 const toolbar=document.createElement("div");toolbar.style.display="flex";toolbar.style.flexWrap="wrap";toolbar.style.gap="6px";toolbar.style.margin="8px 0";
 const copyAll=document.createElement("button");copyAll.type="button";copyAll.className="secondary";copyAll.textContent="COPIER TOUT L’HISTORIQUE";copyAll.addEventListener("click",()=>copyReportText(history.map(reportToText).join("\\n\\n====================\\n\\n"),copyAll));
 const latest=document.createElement("button");latest.type="button";latest.className="secondary";latest.textContent="COPIER LA DERNIÈRE SESSION";latest.addEventListener("click",()=>copyReportText(reportToText(history[0]),latest));
 toolbar.append(copyAll,latest);host.appendChild(toolbar);
 history.forEach((report,index)=>{
  const details=document.createElement("details");details.className="agent-result";details.style.marginTop="8px";details.open=index===0;
  const summary=document.createElement("summary");summary.style.cursor="pointer";summary.style.fontWeight="800";
  const count=Array.isArray(report.agentResults)?report.agentResults.filter(item=>item.status==="completed").length:0;
  summary.textContent=(report.generatedAt?new Date(report.generatedAt).toLocaleString("fr-FR"):"Session")+" · "+count+"/"+(report.agentResults||[]).length+" agents · "+(report.reply||"Conseil Avengers");
  const copy=document.createElement("button");copy.type="button";copy.className="secondary";copy.textContent="COPIER CETTE SESSION";copy.style.marginTop="8px";copy.addEventListener("click",()=>copyReportText(reportToText(report),copy));
  details.append(summary,copy);
  (Array.isArray(report.agentResults)?report.agentResults:[]).forEach(item=>{
   const entry=document.createElement("div");entry.style.marginTop="9px";const name=document.createElement("b");name.textContent=(item.name||item.agent||"Agent")+" · "+(item.status==="completed"?"TERMINÉ":"ÉCHEC");
   const body=document.createElement("p");body.style.whiteSpace="pre-wrap";body.textContent=item.analysis||"Aucune analyse conservée.";entry.append(name,body);details.appendChild(entry);
  });
  host.appendChild(details);
 });
}
$("jarvis-history-toggle").addEventListener("click",()=>{const host=$("jarvis-report-history");host.hidden=!host.hidden;$("jarvis-history-toggle").textContent=host.hidden?"CONSULTER L’HISTORIQUE":"MASQUER L’HISTORIQUE";if(!host.hidden)renderReportHistory();});
function renderSavedReport(){const host=$("jarvis-saved-report");if(!host)return;try{const saved=JSON.parse(localStorage.getItem("jarvis_avengers_last_report_v2")||"null");if(!saved){host.textContent="Aucun rapport des agents pour le moment.";return;}host.textContent=(saved.generatedAt?new Date(saved.generatedAt).toLocaleString("fr-FR")+" · ":"")+(saved.reply||"Dernier rapport disponible")+(saved.executiveSummary?"\n\n"+saved.executiveSummary:"");}catch(e){host.textContent="Rapport précédent illisible.";}}
renderSavedReport();renderReportHistory();
if(localStorage.getItem(TOKEN_KEY)&&localStorage.getItem("jarvis_avengers_audit_date_v2")!==new Date().toLocaleDateString("en-CA")){
 panel.classList.add("open");
 $("jarvis-action-message").value="Lance le premier conseil Avengers : audite JARVIS IRON PARADISE, propose les nouvelles fonctionnalités et définis un plan priorisé. Le sport est la priorité absolue ; relie entraînement, nutrition et récupération. Préserve toutes les données et fonctions existantes.";
 setTimeout(()=>runTeam(true),500);
}
})();