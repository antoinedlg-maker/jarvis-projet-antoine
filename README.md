# J.A.R.V.I.S. — IRON PARADISE

Application personnelle de suivi : poids, nutrition, courses, entraînement, missions et progression.

## Intégration IA hybride

L'application conserve son interface web/PWA et ses données locales. Un assistant conversationnel peut se connecter à un moteur OpenJarvis hébergé sur un ordinateur personnel via un pont FastAPI privé.

Voir [la documentation d'installation OpenJarvis Hybrid](docs/OPENJARVIS-HYBRID.md).

- Interface : `index.html`, `jarvis-ai.js`, `jarvis-ai.css`
- Pont API : `backend/app.py`
- Moteur IA : [OpenJarvis](https://github.com/open-jarvis/OpenJarvis)
- Les données sport/nutrition ne sont partagées qu'après activation explicite de l'option de contexte dans le chat.
