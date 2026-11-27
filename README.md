# JARVIS — Python Core

Base Python intégrée à ce dépôt à partir du projet open source **OpenJarvis**.

Cette branche prépare le socle Python de JARVIS : configuration, primitives de conversation, registres, moteurs d'inférence, agents, outils, mémoire, sécurité et système.

## Environnement

- Python 3.11, 3.12 ou 3.13
- Installation : `python -m pip install -e .`
- Vérification syntaxique : `python -m compileall -q src`

Le moteur d'inférence se configure dans le fichier utilisateur OpenJarvis (`~/.openjarvis/config.toml`). Un moteur local compatible Ollama ou un moteur compatible OpenAI doit être configuré pour générer des réponses.

## Structure

- `src/openjarvis/core` : types, configuration, événements, registres et chemins
- `src/openjarvis/engine` : abstraction d'inférence et adaptateurs
- `src/openjarvis/agents` : primitives et agent simple
- `src/openjarvis/tools` : interface d'outils et calculatrice
- `src/openjarvis/memory` : stockage et service de mémoire
- `src/openjarvis/system` : assemblage du système
- `src/openjarvis/security` et `telemetry` : garde-fous et métriques

## Origine

Le code OpenJarvis repris ici est identifié dans [UPSTREAM.md](UPSTREAM.md). Cette branche est un socle Python ciblé, pas une copie de l'ensemble des interfaces desktop, du frontend, des évaluations et des outils de recherche du dépôt amont.
