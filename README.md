# 🌿 GitMaster — Plateforme d'apprentissage Git interactive

Application React + Tailwind CSS pour apprendre Git de zéro à héros, avec un terminal interactif et des exercices validés automatiquement.

## Fonctionnalités

- **7 modules progressifs** — Débutant → Expert
- **Terminal simulé** — Commandes Git avec feedback réaliste et validation
- **Exercices guidés** — Indices progressifs, commandes attendues
- **Cheatsheet searchable** — Toutes les commandes avec filtre instantané
- **Visualisations Git** — Graphes SVG (branches, merge, rebase)
- **Ressources** — Liens doc officielle, Atlassian, GitHub, GitLab à chaque étape
- **Responsive** — Desktop, tablette, mobile
- **Déployable Firebase** — Configuration prête à l'emploi

## Architecture du projet

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Navigation sticky + progress
│   │   └── Footer.jsx          # Liens ressources
│   └── ui/
│       ├── Terminal.jsx         # Terminal interactif (exercices)
│       ├── MarkdownRenderer.jsx # Rendu markdown des leçons
│       ├── GitGraph.jsx         # Visualisations SVG Git
│       └── ProgressBar.jsx      # Barre de progression
├── pages/
│   ├── Home.jsx                 # Landing + aperçu modules
│   ├── Roadmap.jsx              # Timeline des 7 modules
│   ├── ModulePage.jsx           # Leçons + exercices d'un module
│   └── Cheatsheet.jsx           # Référence des commandes (searchable)
├── data/
│   ├── modules.js               # Contenu complet des modules
│   ├── cheatsheet.js            # Données de la cheatsheet
│   └── terminalResponses.js     # Simulateur de réponses terminal
├── context/
│   └── ProgressContext.jsx      # State global progression
├── App.jsx                      # Routes React Router
├── main.jsx                     # Entry point
└── index.css                    # Tailwind + custom styles
```

## Stack technique

- **React 18** — Composants fonctionnels, hooks, context API
- **React Router v6** — Navigation SPA
- **Tailwind CSS v3** — Design system + classes utilitaires
- **Vite** — Build tool ultra-rapide
- **Firebase Hosting** — Déploiement CDN global

## Développement local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
# → http://localhost:5173

# 3. Build de production
npm run build

# 4. Prévisualiser le build
npm run preview
```

## Déploiement sur Firebase

```bash
# 1. Installer Firebase CLI
npm install -g firebase-tools

# 2. Se connecter
firebase login

# 3. Créer un projet (ou utiliser un existant)
firebase projects:create gitmaster-monuniv

# 4. Modifier .firebaserc avec votre project ID
#    OU: firebase use --add

# 5. Build + deploy
npm run deploy

# → https://VOTRE-PROJET.web.app
```

## Modules d'apprentissage

| # | Module | Niveau | Sujets |
|---|--------|--------|--------|
| 1 | 🌱 Découverte de Git | Débutant | Concepts, installation, config |
| 2 | 📦 Add, Commit, Status | Débutant | 3 zones, staging, commits |
| 3 | 🌿 Branches & Merge | Intermédiaire | Branches, merge, conflits |
| 4 | 🌐 Remotes | Intermédiaire | Push, pull, clone, SSH |
| 5 | ⚡ Rebase, Cherry-pick, Stash | Avancé | Historique propre |
| 6 | 🔄 Reset, Revert, Historique | Avancé | Annuler, reflog |
| 7 | 🚀 Workflows & Pratiques | Expert | Git Flow, tags, .gitignore |

## Personnalisation

### Ajouter un module

Ajoutez un objet dans `src/data/modules.js` avec la structure :

```js
{
  id: 8,
  level: 'Expert',
  icon: '🔧',
  title: 'Mon nouveau module',
  desc: 'Description courte.',
  color: 'blue',
  colorHex: '#60a5fa',
  lessons: [{ title: '...', content: '...', links: [] }],
  exercises: [{ title: '...', instruction: '...', steps: [], hints: [], validate: (cmds) => true }],
}
```

### Modifier le thème

Modifiez `tailwind.config.js` pour adapter les couleurs, polices et animations.

## Licence

Usage éducatif libre.
