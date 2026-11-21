(() => {
  const API = "https://jarvis-iron-paradise.antoine-delage2001.workers.dev";
  const TOKEN_KEY = "jarvis_api_token";
  const style = document.createElement("style");
  style.textContent = "#jarvis-action-launch{position:fixed;right:16px;bottom:92px;z-index:9998;border:1px solid #d8ad62;background:#171411;color:#f1d39a;border-radius:999px;padding:13px 17px;font-weight:800;box-shadow:0 8px 28px #0009}#jarvis-action-panel{display:none;position:fixed;z-index:9999;right:12px;bottom:150px;width:min(390px,calc(100vw - 24px));max-height:70vh;overflow:auto;background:#12110f;color:#f7f1e7;border:1px solid #b78d4d;border-radius:18px;padding:16px;box-shadow:0 18px 60px #000b;font:14px Inter,system-ui}#jarvis-action-panel.open{display:block}#jarvis-action-panel h3{font-size:17px;margin:0 0 10px;color:#e4bd78}#jarvis-action-panel input,#jarvis-action-panel textarea{width:100%;background:#080808;color:#fff;border:1px solid #5b4930;border-radius:10px;padding:11px;margin:6px 0}#jarvis-action-panel textarea{min-height:85px;resize:vertical}#jarvis-action-panel button{border:0;border-radius:10px;padding:11px 14px;margin:5px 4px 5px 0;background:#d8ad62;color:#17120b;font-weight:800}#jarvis-action-panel button.secondary{background:#30271b;color:#e4bd78;border:1px solid #72572f}#jarvis-action-result{white-space:pre-wrap;line-height:1.5;margin-top:10px;color:#eee}#jarvis-action-status{font-size:11px;color:#b7a98f;margin:4px 0 8px}";
  document.head.appendChild(style);
  const launch=document.createElement("button");
  launch.id="jarvis-action-launch";launch.textContent="✦ JARVIS";
  const panel=document.createElement("section");
  panel.id="jarvis-action-panel";
  panel.innerHTML='<h3>J.A.R.V.I.S. — Centre de commande</h3><div id="jarvis-action-status">Assistant prêt · les actions autorisées seront enregistrées dans cette application.</div><input id="jarvis-action-token" type="password" autocomplete="off" placeholder="Clé d’accès JARVIS"><textarea id="jarvis-action-message" placeholder="Ex : Ajoute à mon journal un déjeuner : poulet, riz et légumes, 650 kcal et 45 g de protéines."></textarea><button id="jarvis-action-send">Exécuter la mission</button><button class="secondary" id="jarvis-action-close">Fermer</button><div id="jarvis-action-result" aria-live="polite"></div>';
  document.body.append(launch,panel);
  const $=id=>document.getElementById(id);
  $("jarvis-action-token").value=sessionStorage.getItem(TOKEN_KEY)||"";
  launch.addEventListener("click",()=>panel.classList.toggle("open"));
  $("jarvis-action-close").addEventListener("click",()=>panel.classList.remove("open"));
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
      const data=await response.json();if(!response.ok)throw new Error(data.error||"Erreur API "+response.status);
      const applied=[];for(const action of (Array.isArray(data.actions)?data.actions:[]))applied.push(applyAction(action));
      if(applied.length){saveState();render();}
      $("jarvis-action-result").textContent=(data.reply||"Mission terminée.")+(applied.length?"\n\nActions effectuées :\n• "+applied.join("\n• "):"\n\nAucune action à appliquer.");
      $("jarvis-action-status").textContent=applied.length?applied.length+" action(s) exécutée(s) et sauvegardée(s).":"Analyse terminée.";
    }catch(error){$("jarvis-action-status").textContent="Mission non exécutée";$("jarvis-action-result").textContent=error.message;}
    finally{$("jarvis-action-send").disabled=false;}
  });
})();