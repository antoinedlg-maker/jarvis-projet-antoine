/* JARVIS — module Poids natif (aucun overlay, aucune navigation parallèle).
 * Réutilise la page #page-weight, les pesées et l'objectif déjà stockés par l'app.
 * L'image holographique est une illustration 2.5D ; le glisser applique une rotation CSS.
 */
(() => {
  "use strict";
  const stage = document.getElementById("weightHologramStage");
  const holo = document.getElementById("weightHologram");
  if (!stage || !holo) return;

  let dragging = false, lastX = 0, lastY = 0, rotateY = 0, rotateX = 0;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const apply = () => {
    holo.style.setProperty("--holo-ry", rotateY.toFixed(1) + "deg");
    holo.style.setProperty("--holo-rx", rotateX.toFixed(1) + "deg");
  };

  stage.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true; lastX = event.clientX; lastY = event.clientY;
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointermove", event => {
    if (!dragging) return;
    rotateY = clamp(rotateY + (event.clientX - lastX) * .42, -42, 42);
    rotateX = clamp(rotateX - (event.clientY - lastY) * .16, -12, 12);
    lastX = event.clientX; lastY = event.clientY; apply();
  });
  const release = () => {
    if (!dragging) return;
    dragging = false; rotateX = 0; rotateY = 0; apply();
  };
  stage.addEventListener("pointerup", release);
  stage.addEventListener("pointercancel", release);
  stage.addEventListener("lostpointercapture", release);

  holo.addEventListener("error", () => {
    const status = document.getElementById("avatarStatus");
    if (status) status.textContent = "IMAGE NON CHARGÉE";
  });
  holo.addEventListener("load", () => {
    const status = document.getElementById("avatarStatus");
    if (status) status.textContent = "HOLOGRAMME ACTIF";
  });

  // L'application conserve déjà poids, objectif, historique et courbe dans son localStorage.
  // On garde donc une seule source de vérité et les commandes natives existantes.
  window.addEventListener("jarvis-weight-updated", () => {
    const status = document.getElementById("avatarStatus");
    if (status && !status.textContent.includes("MODÈLE PERSONNEL")) status.textContent = "HOLOGRAMME ACTIF";
  });
  const status = document.getElementById("avatarStatus");
  if (status) status.textContent = "HOLOGRAMME ACTIF";
})();
