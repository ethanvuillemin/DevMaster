/**
 * Modules d'apprentissage Git — Exercices métier avec validation engine.
 *
 * Chaque exercice :
 *   - scenario   : contexte professionnel réaliste
 *   - objectives : ce que l'étudiant doit accomplir
 *   - hints[]    : indices progressifs (vague → précis, sans donner la réponse)
 *   - solution[] : commandes exactes (révélées après tous les indices)
 *   - setup[]    : commandes exécutées automatiquement pour préparer l'état
 *   - validate(cmds, state) : vérifie l'état du moteur Git
 */

const MODULES = [
  // ═══════════════════════════════════════════════════════════
  // MODULE 1 — Découverte de Git
  // ═══════════════════════════════════════════════════════════
  {
    id: 1, level: 'Débutant', icon: '🌱', title: 'Découverte de Git',
    desc: 'Comprendre pourquoi Git existe et à quoi il sert.',
    color: 'green', colorHex: '#34d399',
    lessons: [
      {
        title: "Qu'est-ce que Git ?",
        content: `### Le problème que Git résout

Imaginez un projet avec 10 développeurs. Sans outil de versioning :

- Marie modifie le fichier \`app.js\` pendant que Paul fait pareil → **conflits**
- Un bug est introduit vendredi → lundi, impossible de retrouver **qui** a changé **quoi**, **quand**
- Vous voulez tester une idée sans risquer de casser le projet → vous faites des copies \`projet_v2_final_VRAIMNT_final.zip\` → **chaos**

**Git** est un **système de contrôle de version distribué** (DVCS) qui résout **tous** ces problèmes. Créé en 2005 par **Linus Torvalds** (le créateur de Linux), c'est aujourd'hui l'outil utilisé par **95% des développeurs** dans le monde.

### Comment fonctionne Git ?

Git enregistre l'historique complet de votre projet sous forme de **snapshots** successifs (appelés **commits**). Chaque commit capture l'état de tous les fichiers à un instant donné.

\`\`\`
Commit 1          Commit 2          Commit 3
┌──────────┐     ┌──────────┐     ┌──────────┐
│ index.html│     │ index.html│     │ index.html│
│ style.css │ ──► │ style.css │ ──► │ style.css │
│           │     │ app.js    │     │ app.js    │
└──────────┘     └──────────┘     └──────────┘
  "Init"        "Ajouter le JS"  "Fix bug #42"
\`\`\`

### Les 3 concepts fondamentaux

1. **Repository (dépôt)** — Le dossier de votre projet + le dossier caché \`.git/\` qui contient tout l'historique. Le \`.git/\` est la "base de données" de Git.
2. **Commit** — Un snapshot de votre projet à un instant T. Chaque commit a un identifiant unique (hash), un message, un auteur, et une date.
3. **Branch (branche)** — Une ligne de développement indépendante. Permet de travailler sur une fonctionnalité sans impacter le code principal.

### Git ≠ GitHub ≠ GitLab ≠ Bitbucket

C'est la confusion **la plus fréquente** chez les débutants. Voici la différence :

| | **Git** | **GitHub / GitLab / Bitbucket** |
|---|---------|-------------------------------|
| **C'est quoi ?** | Un logiciel en ligne de commande | Des plateformes web (sites internet) |
| **Où ça tourne ?** | **Localement** sur votre machine | Sur des serveurs dans le cloud |
| **Créé par** | Linus Torvalds (2005) | GitHub Inc. / GitLab Inc. / Atlassian |
| **Sert à** | Gérer les versions de votre code | **Héberger** des dépôts Git + collaboration |
| **Peut fonctionner sans l'autre ?** | ✅ Oui, Git fonctionne 100% en local | ❌ Non, ils utilisent Git en interne |
| **Fonctionnalités en plus** | — | Pull Requests, Issues, Wiki, CI/CD, gestion de projet |

> **Analogie** : Git est comme **un moteur de voiture** (l'outil technique). GitHub/GitLab sont comme **des concessions automobiles** (le service autour de l'outil).

### Pourquoi apprendre la ligne de commande ?

Les interfaces graphiques (VS Code, GitKraken, SourceTree) sont pratiques, mais :
- Elles ne couvrent **pas toutes les commandes** Git
- En cas de problème, c'est la CLI qui vous sauve
- Les serveurs de CI/CD utilisent **uniquement** la CLI
- Les tutoriels et la doc sont écrits pour la CLI
- Comprendre la CLI = comprendre **vraiment** Git`,
        links: [
          { label: 'Documentation officielle Git', url: 'https://git-scm.com/doc' },
          { label: 'Pro Git Book (gratuit, en français)', url: 'https://git-scm.com/book/fr/v2' },
          { label: 'Git — Wikipedia (histoire)', url: 'https://fr.wikipedia.org/wiki/Git' },
          { label: 'GitHub vs GitLab vs Bitbucket (comparatif)', url: 'https://www.atlassian.com/fr/git/tutorials/bitbucket-vs-github' },
          { label: 'Comprendre le versioning', url: 'https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-%C3%80-propos-de-la-gestion-de-version' },
        ],
      },
      {
        title: 'Installer et configurer Git',
        content: `### Installation selon votre système

**Linux (Debian/Ubuntu) :**
\`\`\`bash
sudo apt update && sudo apt install git
\`\`\`

**macOS :**
\`\`\`bash
# Option 1 : Homebrew (recommandé)
brew install git

# Option 2 : Xcode Command Line Tools
xcode-select --install
\`\`\`

**Windows :**
Téléchargez l'installeur sur [git-scm.com/downloads](https://git-scm.com/downloads). Pendant l'installation, gardez les options par défaut. Git Bash sera installé automatiquement (un terminal qui fonctionne comme Linux).

### Vérifier l'installation

\`\`\`bash
git --version
# Doit afficher : git version 2.x.x
\`\`\`

### Configuration initiale (obligatoire)

Git a besoin de savoir **qui vous êtes** pour signer chaque commit :

\`\`\`bash
# Votre nom (visible dans l'historique)
git config --global user.name "Votre Nom Complet"

# Votre email (doit correspondre à votre compte GitHub/GitLab)
git config --global user.email "votre@email.com"
\`\`\`

### Configurations recommandées

\`\`\`bash
# Branche par défaut : "main" (au lieu de "master")
git config --global init.defaultBranch main

# Éditeur de texte pour les messages de commit
git config --global core.editor "code --wait"   # VS Code
# OU: git config --global core.editor "nano"     # Nano (plus simple)

# Activer les couleurs dans le terminal
git config --global color.ui auto

# Vérifier toute la configuration
git config --list
\`\`\`

### Les 3 niveaux de configuration

| Niveau | Commande | Portée | Fichier |
|--------|----------|--------|---------|
| **System** | \`--system\` | Tous les utilisateurs | \`/etc/gitconfig\` |
| **Global** | \`--global\` | Votre compte | \`~/.gitconfig\` |
| **Local** | \`--local\` | Ce dépôt seulement | \`.git/config\` |

Le niveau local prime sur global, qui prime sur system.`,
        links: [
          { label: 'Télécharger Git', url: 'https://git-scm.com/downloads' },
          { label: 'Paramétrage à la première utilisation', url: 'https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Param%C3%A9trage-%C3%A0-la-premi%C3%A8re-utilisation-de-Git' },
          { label: 'git config — Référence', url: 'https://git-scm.com/docs/git-config' },
        ],
      },
      {
        title: 'Les commandes essentielles',
        content: `### Référence rapide des commandes de base

Chaque commande Git suit le format : \`git <commande> [options] [arguments]\`

### Créer et inspecter

| Commande | Ce qu'elle fait | Quand l'utiliser |
|----------|----------------|-----------------|
| \`git init\` | Crée un nouveau dépôt Git dans le dossier courant | Au début d'un nouveau projet |
| \`git clone <url>\` | Copie un dépôt distant sur votre machine | Pour rejoindre un projet existant |
| \`git status\` | Montre l'état de vos fichiers (modifiés, stagés, non-suivis) | **Avant chaque commit** (réflexe !) |
| \`git log\` | Affiche l'historique des commits | Pour voir ce qui a été fait |
| \`git log --oneline\` | Version condensée du log (1 ligne par commit) | Usage quotidien |
| \`git diff\` | Montre les modifications non encore stagées | Pour vérifier ce que vous allez ajouter |

### Enregistrer des modifications

| Commande | Ce qu'elle fait | Quand l'utiliser |
|----------|----------------|-----------------|
| \`git add <fichier>\` | Ajoute un fichier à la staging area | Quand un fichier est prêt à être commité |
| \`git add .\` | Ajoute **tous** les fichiers modifiés | Quand tout est prêt |
| \`git commit -m "msg"\` | Crée un commit avec un message | Après avoir stagé les fichiers |
| \`git commit --amend\` | Modifie le dernier commit | Pour corriger un message ou oubli |

### Branches

| Commande | Ce qu'elle fait | Quand l'utiliser |
|----------|----------------|-----------------|
| \`git branch\` | Liste les branches | Pour voir où vous en êtes |
| \`git branch <nom>\` | Crée une nouvelle branche | Pour démarrer une feature |
| \`git checkout <nom>\` | Bascule sur une branche | Pour changer de contexte |
| \`git checkout -b <nom>\` | Crée ET bascule | Raccourci très utilisé |
| \`git merge <branche>\` | Fusionne une branche dans la courante | Quand une feature est terminée |

### Collaboration

| Commande | Ce qu'elle fait | Quand l'utiliser |
|----------|----------------|-----------------|
| \`git remote add origin <url>\` | Connecte votre dépôt à un serveur | Une seule fois par projet |
| \`git push origin <branche>\` | Envoie vos commits sur le serveur | Après avoir commité localement |
| \`git pull origin <branche>\` | Récupère et fusionne les changements distants | Avant de commencer à travailler |
| \`git fetch\` | Récupère sans fusionner | Pour vérifier avant de merger |

> **Conseil** : tapez \`git status\` entre chaque commande quand vous débutez. C'est le meilleur moyen de comprendre ce qui se passe.`,
        links: [
          { label: 'Référence complète des commandes Git', url: 'https://git-scm.com/docs' },
          { label: 'Cheatsheet Git (PDF)', url: 'https://education.github.com/git-cheat-sheet-education.pdf' },
          { label: 'git add — documentation', url: 'https://git-scm.com/docs/git-add' },
          { label: 'git commit — documentation', url: 'https://git-scm.com/docs/git-commit' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Créer votre premier dépôt',
        scenario: "Vous venez d'être embauché comme développeur junior. Votre chef d'équipe vous demande de créer un nouveau projet et d'initialiser le dépôt Git.",
        objectives: ['Initialiser un dépôt Git dans le répertoire courant'],
        hints: [
          "Il existe une commande Git pour créer un nouveau dépôt vide. Elle commence par 'git'.",
          "La commande pour démarrer un dépôt Git est 'git init'. Tapez-la et observez le résultat.",
        ],
        solution: ['git init'],
        setup: [],
        validate: (cmds, state) => state.initialized === true,
      },
      {
        title: 'Configurer votre identité',
        scenario: "Avant votre premier commit, l'équipe exige que chaque développeur configure son identité Git. Votre nom est \"Alex Martin\" et votre email est \"alex@startup.io\".",
        objectives: ['Définir votre nom dans la configuration Git', 'Définir votre email'],
        hints: [
          "Git a besoin de savoir qui fait les commits. Cherchez du côté de 'git config'.",
          "Il y a deux propriétés à configurer : 'user.name' et 'user.email'. L'option '--global' les applique partout.",
        ],
        solution: ['git config --global user.name "Alex Martin"', 'git config --global user.email "alex@startup.io"'],
        setup: ['git init'],
        validate: (cmds, state) =>
          state.config['user.name'] && state.config['user.email'] &&
          state.config['user.name'].length > 0 && state.config['user.email'].includes('@'),
      },
      {
        title: 'Vérifier votre installation',
        scenario: "Un collègue doute que Git soit bien installé sur votre machine. Prouvez-lui en affichant la version de Git et votre configuration complète.",
        objectives: ['Afficher la version de Git', 'Afficher la configuration complète'],
        hints: [
          "Git a des options pour afficher des informations sur lui-même. Pensez aux flags '--version' et '--list'.",
          "Essayez 'git --version' pour la version, puis 'git config --list' pour la configuration.",
        ],
        solution: ['git --version', 'git config --list'],
        setup: ['git init', 'git config --global user.name "Dev"', 'git config --global user.email "dev@test.io"'],
        validate: (cmds) =>
          cmds.some(c => c.includes('--version')) &&
          cmds.some(c => c.includes('config') && c.includes('--list')),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 2 — Add, Commit, Status
  // ═══════════════════════════════════════════════════════════
  {
    id: 2, level: 'Débutant', icon: '📦', title: 'Les bases : Add, Commit, Status',
    desc: 'Maîtriser le workflow fondamental de Git.',
    color: 'blue', colorHex: '#60a5fa',
    lessons: [
      {
        title: 'Les 3 zones de Git',
        content: `### Le modèle des 3 zones

\`\`\`
Working Directory  →  git add  →  Staging Area  →  git commit  →  Repository
   (fichiers)                       (index)                       (historique)
\`\`\`

1. **Working Directory** — Ce que vous éditez
2. **Staging Area (Index)** — Ce qui sera dans le prochain commit
3. **Repository (.git)** — L'historique complet

### Commandes essentielles

\`\`\`bash
git status                    # État des fichiers
git add fichier.txt           # Stager un fichier
git add .                     # Stager tout
git commit -m "message"       # Commiter
git log --oneline             # Historique condensé
\`\`\``,
        links: [
          { label: 'Enregistrer des modifications', url: 'https://git-scm.com/book/fr/v2/Les-bases-de-Git-Enregistrer-des-modifications-dans-le-d%C3%A9p%C3%B4t' },
          { label: 'Cheatsheet Git (PDF)', url: 'https://education.github.com/git-cheat-sheet-education.pdf' },
        ],
      },
      {
        title: 'Bonnes pratiques de commit',
        content: `### Conventional Commits

Format : \`type(scope): description\`

| Type | Usage |
|------|-------|
| **feat** | Nouvelle fonctionnalité |
| **fix** | Correction de bug |
| **docs** | Documentation |
| **refactor** | Refactorisation |
| **test** | Tests |

\`\`\`bash
git commit -m "feat(auth): ajouter la connexion Google"
git commit -m "fix(panier): corriger le total TTC"
\`\`\`

### Règles d'or
- 1 commit = 1 modification logique
- Commitez souvent
- Message à l'impératif : "Ajouter" pas "Ajouté"`,
        links: [
          { label: 'Conventional Commits', url: 'https://www.conventionalcommits.org/fr/' },
          { label: 'How to Write a Git Commit Message', url: 'https://cbea.ms/git-commit/' },
        ],
      },
    ],
    exercises: [
      {
        title: "Créer la page d'accueil",
        scenario: "Vous démarrez le développement d'un site e-commerce. La première tâche dans Jira est de créer le fichier HTML de la page d'accueil et de faire le premier commit du projet.",
        objectives: ["Créer le fichier index.html", "L'ajouter au suivi Git", "Faire un commit avec un message descriptif"],
        hints: [
          "Commencez par créer un fichier. En terminal, 'touch' crée un fichier vide.",
          "Un fichier créé n'est pas automatiquement suivi par Git. Il faut explicitement le signaler avec une commande 'git add'.",
          "Une fois le fichier 'stagé', il faut enregistrer cette modification dans l'historique. La commande 'git commit' avec le flag '-m' permet d'écrire le message directement.",
        ],
        solution: ['touch index.html', 'git add index.html', 'git commit -m "feat: ajouter la page d\'accueil"'],
        setup: ['git init', 'git config --global user.name "Dev"'],
        validate: (cmds, state) => state.commits.length >= 1,
      },
      {
        title: 'Livraison multi-fichiers',
        scenario: "Le designer vous a envoyé les maquettes. Vous devez créer la feuille de style CSS et le script JS, puis les commiter ensemble car ils font partie de la même fonctionnalité.",
        objectives: ['Créer style.css et app.js', 'Ajouter les deux fichiers en une seule commande', 'Commiter le tout'],
        hints: [
          "Vous pouvez créer plusieurs fichiers avec 'touch'. Et il existe un raccourci pour stager tous les fichiers d'un coup.",
          "Le raccourci 'git add .' (avec un point) ajoute tous les fichiers non suivis ou modifiés.",
          "Après 'git add .', un seul 'git commit -m \"...\"' enregistre tout ce qui est stagé.",
        ],
        solution: ['touch style.css', 'touch app.js', 'git add .', 'git commit -m "feat: ajouter les assets frontend"'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"'],
        validate: (cmds, state) => state.commits.length >= 2 && Object.keys(state.workingDir).length >= 3,
      },
      {
        title: 'Inspecter avant de commiter',
        scenario: "Votre tech lead insiste : avant chaque commit, vérifiez toujours l'état du dépôt et consultez l'historique. C'est une habitude professionnelle essentielle.",
        objectives: ["Vérifier l'état des fichiers avec git status", "Consulter l'historique en mode condensé"],
        hints: [
          "Il existe deux commandes Git pour voir 'où on en est' : l'une montre l'état actuel, l'autre l'historique passé.",
          "'git status' montre les fichiers modifiés/stagés. 'git log' affiche les commits. L'option '--oneline' rend le log plus lisible.",
        ],
        solution: ['git status', 'git log --oneline'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "feat: init"'],
        validate: (cmds) =>
          cmds.some(c => c.includes('git status')) &&
          cmds.some(c => c.includes('git log')),
      },
      {
        title: 'Corriger un message de commit',
        scenario: "Oups ! Vous venez de commiter avec le message \"wip\" alors que votre équipe utilise les Conventional Commits. Corrigez le message du dernier commit sans en créer un nouveau.",
        objectives: ["Modifier le message du dernier commit"],
        hints: [
          "Git permet de modifier le dernier commit sans en créer un nouveau. Cherchez l'option '--amend'.",
          "La commande 'git commit --amend -m \"nouveau message\"' remplace le message du dernier commit.",
        ],
        solution: ['git commit --amend -m "feat: ajouter le formulaire de contact"'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch form.html', 'git add .', 'git commit -m "wip"'],
        validate: (cmds, state) => {
          if (!state.commits.length) return false;
          const last = state.commits[state.commits.length - 1];
          return last.message !== 'wip' && last.message.length > 5;
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 3 — Branches & Merge
  // ═══════════════════════════════════════════════════════════
  {
    id: 3, level: 'Intermédiaire', icon: '🌿', title: 'Branches & Merge',
    desc: 'Travailler en parallèle et fusionner le code.',
    color: 'purple', colorHex: '#a78bfa',
    lessons: [
      {
        title: 'Comprendre les branches',
        content: `### Qu'est-ce qu'une branche ?

Un **pointeur mobile vers un commit** (41 octets !).

\`\`\`bash
git branch                    # Lister
git branch ma-branche         # Créer
git checkout ma-branche       # Basculer
git switch ma-branche         # Basculer (moderne)
git checkout -b ma-branche    # Créer + basculer
git branch -d ma-branche      # Supprimer
\`\`\`

### Convention de nommage
\`\`\`
feature/nom-feature
bugfix/description
hotfix/urgence
release/v1.2.0
\`\`\``,
        links: [
          { label: 'Les branches en bref', url: 'https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Les-branches-en-bref' },
          { label: 'Learn Git Branching', url: 'https://learngitbranching.js.org/?locale=fr_FR' },
        ],
      },
      {
        title: 'Fusionner avec Merge',
        content: `### Git Merge

\`\`\`bash
git checkout main       # Se placer sur la destination
git merge ma-branche    # Fusionner
\`\`\`

### Résoudre les conflits

Dans le fichier en conflit :
\`\`\`
<<<<<<< HEAD
Votre code
=======
Leur code
>>>>>>> feature
\`\`\`

Résolution : éditer → \`git add\` → \`git commit\``,
        links: [
          { label: 'Branches et fusions — Pro Git', url: 'https://git-scm.com/book/fr/v2/Les-branches-avec-Git-Branches-et-fusions%C2%A0%3A-les-bases' },
          { label: 'git merge — Référence', url: 'https://git-scm.com/docs/git-merge' },
          { label: 'Résoudre les conflits (Atlassian)', url: 'https://www.atlassian.com/fr/git/tutorials/using-branches/merge-conflicts' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Développer une feature isolée',
        scenario: "Le product owner veut une barre de navigation. La règle de l'équipe : jamais de code directement sur main. Créez une branche dédiée pour développer cette feature.",
        objectives: ['Créer une branche feature/navbar', 'Basculer dessus'],
        hints: [
          "Les branches permettent de travailler sans toucher à 'main'. Il existe une commande pour créer une branche et y basculer en même temps.",
          "Le flag '-b' de 'git checkout' permet de créer et basculer en une seule commande. Le nom devrait suivre la convention feature/...",
        ],
        solution: ['git checkout -b feature/navbar'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"'],
        validate: (cmds, state) =>
          state.HEAD === 'feature/navbar' && state.branches['feature/navbar'] !== undefined,
      },
      {
        title: 'Merger une feature terminée',
        scenario: "Votre feature navbar est terminée et testée. Il faut maintenant la fusionner dans main pour qu'elle soit déployée en production.",
        objectives: ['Revenir sur main', 'Fusionner la branche feature/navbar'],
        hints: [
          "Pour fusionner, vous devez d'abord vous placer sur la branche qui va recevoir le code. Pensez à 'git checkout' ou 'git switch'.",
          "Une fois sur 'main', la commande 'git merge' suivie du nom de la branche intègre le code.",
        ],
        solution: ['git checkout main', 'git merge feature/navbar'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"',
          'git checkout -b feature/navbar', 'touch navbar.html', 'git add .', 'git commit -m "feat: navbar"'],
        validate: (cmds, state) =>
          state.HEAD === 'main' && cmds.some(c => c.includes('merge')),
      },
      {
        title: 'Nettoyer après le merge',
        scenario: "La feature est mergée, super ! Bonne pratique : supprimez la branche feature qui n'est plus utile pour garder un dépôt propre.",
        objectives: ["Vérifier que vous êtes sur main", "Supprimer la branche feature/navbar"],
        hints: [
          "On peut lister les branches et en supprimer avec 'git branch'. Le flag pour supprimer est '-d' (ou '-D' pour forcer).",
          "Vérifiez avec 'git branch' que feature/navbar existe, puis 'git branch -d feature/navbar' la supprime.",
        ],
        solution: ['git branch', 'git branch -d feature/navbar'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"',
          'git checkout -b feature/navbar', 'touch navbar.html', 'git add .', 'git commit -m "feat: navbar"',
          'git checkout main', 'git merge feature/navbar'],
        validate: (cmds, state) => !state.branches['feature/navbar'],
      },
      {
        title: 'Travailler sur deux features',
        scenario: "Le sprint courant vous assigne deux tâches : un footer ET un formulaire de contact. Créez deux branches séparées depuis main pour travailler indépendamment sur chacune.",
        objectives: ["Créer feature/footer depuis main", "Créer feature/contact depuis main", "Vérifier avec git branch que les 3 branches existent"],
        hints: [
          "Vous devez créer deux branches, mais attention à bien revenir sur 'main' entre les deux pour que chaque branche parte du même point.",
          "Le workflow : créer feature/footer → revenir sur main → créer feature/contact. Utilisez 'git checkout -b' ou 'git switch -c'.",
        ],
        solution: ['git checkout -b feature/footer', 'git checkout main', 'git checkout -b feature/contact', 'git branch'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"'],
        validate: (cmds, state) =>
          state.branches['feature/footer'] !== undefined &&
          state.branches['feature/contact'] !== undefined &&
          Object.keys(state.branches).length >= 3,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 4 — Remotes : Push, Pull, Clone
  // ═══════════════════════════════════════════════════════════
  {
    id: 4, level: 'Intermédiaire', icon: '🌐', title: 'Remotes : Push, Pull, Clone',
    desc: 'Collaborer avec des dépôts distants.',
    color: 'pink', colorHex: '#f472b6',
    lessons: [
      {
        title: 'Travailler avec les remotes',
        content: `### Commandes essentielles

\`\`\`bash
git clone <url>                   # Cloner
git remote -v                     # Lister les remotes
git remote add origin <url>       # Ajouter un remote
git push origin main              # Envoyer
git pull origin main              # Récupérer + fusionner
git fetch origin                  # Récupérer sans fusionner
git push -u origin feature/x      # Push + tracking
\`\`\`

### fetch vs pull

| Commande | Action |
|----------|--------|
| \`git fetch\` | Télécharge, n'applique pas |
| \`git pull\` | fetch + merge |

### SSH (recommandé)

\`\`\`bash
ssh-keygen -t ed25519 -C "email@example.com"
cat ~/.ssh/id_ed25519.pub
\`\`\``,
        links: [
          { label: 'Travailler avec des dépôts distants — Pro Git', url: 'https://git-scm.com/book/fr/v2/Les-bases-de-Git-Travailler-avec-des-d%C3%A9p%C3%B4ts-distants' },
          { label: 'SSH GitHub', url: 'https://docs.github.com/fr/authentication/connecting-to-github-with-ssh' },
          { label: 'SSH GitLab', url: 'https://docs.gitlab.com/ee/user/ssh.html' },
          { label: 'git push — Référence', url: 'https://git-scm.com/docs/git-push' },
          { label: 'git pull — Référence', url: 'https://git-scm.com/docs/git-pull' },
          { label: 'git remote — Référence', url: 'https://git-scm.com/docs/git-remote' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Publier votre projet sur GitHub',
        scenario: "Votre projet local est prêt. Le CTO vous a créé un repo vide sur GitHub à l'adresse https://github.com/startup/webapp.git. Connectez votre dépôt local et poussez votre code.",
        objectives: ['Ajouter le remote "origin"', 'Pousser la branche main'],
        hints: [
          "Il faut d'abord dire à Git où se trouve le serveur distant. C'est la notion de 'remote'.",
          "'git remote add' crée le lien. Le nom conventionnel est 'origin'. Ensuite 'git push' envoie le code.",
        ],
        solution: ['git remote add origin https://github.com/startup/webapp.git', 'git push origin main'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "feat: init"'],
        validate: (cmds, state) =>
          state.remotes.origin !== undefined &&
          cmds.some(c => c.includes('push')),
      },
      {
        title: 'Cloner un projet existant',
        scenario: "Vous rejoignez une équipe qui travaille déjà sur un projet. Le repo est sur https://gitlab.com/equipe/api-backend.git. Récupérez le code et vérifiez que le remote est configuré.",
        objectives: ['Cloner le dépôt distant', 'Vérifier les remotes configurés'],
        hints: [
          "Pour récupérer un projet existant depuis un serveur, il existe une commande Git qui télécharge tout l'historique d'un coup.",
          "'git clone <url>' crée une copie locale complète. 'git remote -v' affiche les remotes.",
        ],
        solution: ['git clone https://gitlab.com/equipe/api-backend.git', 'git remote -v'],
        setup: [],
        validate: (cmds, state) =>
          state.remotes.origin !== undefined &&
          cmds.some(c => c.includes('remote -v')),
      },
      {
        title: 'Pousser une feature branch',
        scenario: "Vous avez développé une feature de recherche sur une branche locale. Pour ouvrir une Pull Request, vous devez d'abord la pousser sur le serveur.",
        objectives: ["Créer et basculer sur feature/search", "Faire un commit", "Pousser la branche vers origin"],
        hints: [
          "Le workflow : créer la branche → travailler → pousser. Pour la première poussée d'une nouvelle branche, il faut indiquer le remote et le nom de la branche.",
          "'git push origin feature/search' pousse la branche. Ajoutez '-u' pour configurer le tracking.",
        ],
        solution: ['git checkout -b feature/search', 'touch search.js', 'git add .', 'git commit -m "feat: ajouter la recherche"', 'git push -u origin feature/search'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"',
          'git remote add origin https://github.com/startup/webapp.git'],
        validate: (cmds, state) =>
          state.remotes.origin?.branches?.['feature/search'] !== undefined ||
          (cmds.some(c => c.includes('push') && c.includes('feature/search'))),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 5 — Rebase, Cherry-pick & Stash
  // ═══════════════════════════════════════════════════════════
  {
    id: 5, level: 'Avancé', icon: '⚡', title: 'Rebase, Cherry-pick & Stash',
    desc: 'Techniques avancées pour un historique propre.',
    color: 'orange', colorHex: '#fb923c',
    lessons: [
      {
        title: 'Git Stash & Cherry-pick',
        content: `### Stash — Mettre de côté temporairement

\`\`\`bash
git stash                    # Sauvegarder
git stash push -m "WIP nav" # Avec message
git stash list               # Lister
git stash pop                # Récupérer + supprimer
git stash apply              # Récupérer (garder)
\`\`\`

### Cherry-pick — Piocher un commit

\`\`\`bash
git cherry-pick abc1234      # Appliquer un commit spécifique
\`\`\`

### Rebase interactif

\`\`\`bash
git rebase -i HEAD~3         # Réécrire les 3 derniers commits
\`\`\`

> **Règle d'or** : Ne jamais rebaser des commits déjà poussés et partagés.`,
        links: [
          { label: 'Git Stash (Atlassian)', url: 'https://www.atlassian.com/fr/git/tutorials/saving-changes/git-stash' },
          { label: 'Rebase interactif (Atlassian)', url: 'https://www.atlassian.com/fr/git/tutorials/rewriting-history/git-rebase-i' },
          { label: 'git stash — Référence', url: 'https://git-scm.com/docs/git-stash' },
          { label: 'git rebase — Référence', url: 'https://git-scm.com/docs/git-rebase' },
          { label: 'git cherry-pick — Référence', url: 'https://git-scm.com/docs/git-cherry-pick' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Interruption urgente',
        scenario: "Vous êtes en train de coder un nouveau dashboard quand le CTO vous appelle : \"Bug critique en prod, lâche tout et fixe-le maintenant !\" Vous avez des fichiers non commités. Il faut sauvegarder votre travail proprement avant de changer de contexte.",
        objectives: ['Sauvegarder votre travail en cours avec git stash', 'Basculer sur main pour le hotfix'],
        hints: [
          "Vous ne pouvez pas changer de branche avec des modifications non commitées. Il existe une commande pour mettre de côté temporairement vos changements sans les commiter.",
          "'git stash' sauvegarde vos modifications. Vous pouvez ensuite changer de branche librement. Utilisez 'git checkout main' ensuite.",
        ],
        solution: ['git stash', 'git checkout main'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"',
          'git checkout -b feature/dashboard', 'touch dashboard.js', 'echo "// WIP" > dashboard.js'],
        validate: (cmds, state) =>
          state.stash.length > 0 && state.HEAD === 'main',
      },
      {
        title: 'Reprendre le travail après le hotfix',
        scenario: "Le hotfix est déployé, ouf ! Retournez sur votre branche dashboard et récupérez le travail que vous aviez mis de côté.",
        objectives: ['Revenir sur feature/dashboard', 'Récupérer le stash'],
        hints: [
          "Vous avez sauvegardé votre travail plus tôt. Il faut d'abord retourner sur la bonne branche, puis restaurer vos modifications.",
          "'git stash pop' récupère le dernier stash et le supprime de la pile. 'git stash apply' le garde en sauvegarde.",
        ],
        solution: ['git checkout feature/dashboard', 'git stash pop'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"',
          'git checkout -b feature/dashboard', 'touch dashboard.js', 'echo "// WIP" > dashboard.js',
          'git stash', 'git checkout main', 'touch hotfix.txt', 'git add .', 'git commit -m "fix: hotfix prod"'],
        validate: (cmds, state) =>
          state.HEAD === 'feature/dashboard' &&
          state.stash.length === 0,
      },
      {
        title: 'Gestion de stash nommés',
        scenario: "Vous jonglez entre 3 features. Avant de passer à chacune, vous stashez votre travail avec un message descriptif pour vous y retrouver. Stashez le travail courant avec un message, puis listez vos stash.",
        objectives: ['Stasher avec un message descriptif', 'Lister les stash disponibles'],
        hints: [
          "On peut ajouter un message au stash pour se souvenir de ce qu'il contient. Cherchez l'option '-m' ou 'push -m'.",
          "'git stash push -m \"mon message\"' crée un stash nommé. 'git stash list' affiche la pile.",
        ],
        solution: ['git stash push -m "WIP: dashboard filters"', 'git stash list'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"',
          'git checkout -b feature/dashboard', 'touch filters.js', 'echo "// filters" > filters.js'],
        validate: (cmds, state) =>
          state.stash.length > 0 &&
          cmds.some(c => c.includes('stash list')),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 6 — Reset, Revert & Historique
  // ═══════════════════════════════════════════════════════════
  {
    id: 6, level: 'Avancé', icon: '🔄', title: 'Reset, Revert & Historique',
    desc: "Annuler, corriger et naviguer dans l'historique.",
    color: 'red', colorHex: '#f87171',
    lessons: [
      {
        title: 'Annuler des changements',
        content: `### Tableau comparatif

| Commande | Historique | Fichiers | Usage |
|----------|-----------|----------|-------|
| \`restore\` | ✅ Intact | Restaurés | Annuler des modifs locales |
| \`revert\` | ✅ +commit | Inversés | Annuler un commit partagé |
| \`reset --soft\` | ❌ Réécrit | En staging | Refaire le commit |
| \`reset --hard\` | ❌ Réécrit | ❌ Supprimés | Danger ! |

### Reflog — Le filet de sécurité

\`\`\`bash
git reflog                  # Tout l'historique
git reset --hard HEAD@{2}   # Revenir dans le temps
\`\`\``,
        links: [
          { label: 'Reset démystifié — Pro Git', url: 'https://git-scm.com/book/fr/v2/Utilitaires-Git-Reset-d%C3%A9mystifi%C3%A9' },
          { label: 'Undoing Changes (Atlassian)', url: 'https://www.atlassian.com/fr/git/tutorials/undoing-changes' },
          { label: 'git reset — Référence', url: 'https://git-scm.com/docs/git-reset' },
          { label: 'git revert — Référence', url: 'https://git-scm.com/docs/git-revert' },
          { label: 'git restore — Référence', url: 'https://git-scm.com/docs/git-restore' },
          { label: 'git reflog — Référence', url: 'https://git-scm.com/docs/git-reflog' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Annuler le dernier commit (sans perdre le code)',
        scenario: "Vous venez de commiter du code de debug (console.log partout) sur la branche principale. Le code review automatique a rejeté votre PR. Annulez ce commit mais gardez les fichiers pour les nettoyer.",
        objectives: ['Annuler le dernier commit en gardant les fichiers dans le staging'],
        hints: [
          "Il y a plusieurs niveaux de 'reset' dans Git. L'un d'eux annule le commit mais garde les changements prêts à être re-commités.",
          "'git reset --soft HEAD~1' annule le dernier commit et remet les fichiers en staging. Le code n'est pas perdu.",
        ],
        solution: ['git reset --soft HEAD~1'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch app.js', 'git add .', 'git commit -m "feat: app base"',
          'echo "console.log(debug)" > debug.js', 'git add .', 'git commit -m "wip: debug stuff"'],
        validate: (cmds, state) =>
          cmds.some(c => c.includes('reset') && c.includes('--soft')),
      },
      {
        title: 'Revert un commit partagé',
        scenario: "Un commit poussé sur main a cassé la production. Votre collègue a déjà basé son travail dessus. Impossible de réécrire l'historique — il faut annuler proprement avec un nouveau commit.",
        objectives: ['Identifier le hash du commit problématique', 'Utiliser git revert pour créer un commit inverse'],
        hints: [
          "Quand on ne peut pas réécrire l'historique (branche partagée), 'revert' est la seule option. Il crée un nouveau commit qui fait l'inverse.",
          "D'abord 'git log --oneline' pour trouver le hash. Puis 'git revert <hash>' crée le commit d'annulation.",
        ],
        solution: ['git log --oneline', 'git revert <hash_du_commit>'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "feat: init"',
          'touch broken.js', 'git add .', 'git commit -m "feat: broken feature"'],
        validate: (cmds, state) =>
          cmds.some(c => c.includes('revert')) &&
          state.commits.some(c => c.message.includes('Revert')),
      },
      {
        title: 'Explorer le reflog',
        scenario: "Catastrophe ! Un junior a fait 'git reset --hard' sur des commits importants. Heureusement, Git garde une trace de tout. Utilisez le reflog pour retrouver la trace des commits perdus.",
        objectives: ['Consulter le reflog pour voir tout l\'historique des actions'],
        hints: [
          "Git enregistre absolument chaque action pendant ~90 jours, même les reset et les rebase. Il y a une commande spéciale pour voir cet historique caché.",
          "'git reflog' affiche toutes les positions passées de HEAD. Chaque entrée a un identifiant HEAD@{n}.",
        ],
        solution: ['git reflog'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch app.js', 'git add .', 'git commit -m "feat: init"',
          'touch important.js', 'git add .', 'git commit -m "feat: feature importante"'],
        validate: (cmds) => cmds.some(c => c.includes('reflog')),
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 7 — Workflows & Bonnes Pratiques
  // ═══════════════════════════════════════════════════════════
  {
    id: 7, level: 'Expert', icon: '🚀', title: 'Workflows & Bonnes Pratiques',
    desc: 'Git Flow, GitHub Flow, tags, .gitignore.',
    color: 'yellow', colorHex: '#fbbf24',
    lessons: [
      {
        title: 'Les workflows Git',
        content: `### GitHub Flow (le plus utilisé)

\`\`\`
main ────────────────────────►
  \\              /
   feature ────► PR → Review → Merge
\`\`\`

### Git Flow (structuré)

| Branche | Rôle |
|---------|------|
| **main** | Production |
| **develop** | Intégration |
| **feature/** | Fonctionnalités |
| **hotfix/** | Urgences |
| **release/** | Préparation |

### Tags & SemVer

\`\`\`bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin --tags
\`\`\`

Format **MAJOR.MINOR.PATCH** : breaking.feature.fix`,
        links: [
          { label: 'GitHub Flow', url: 'https://docs.github.com/fr/get-started/using-github/github-flow' },
          { label: 'Git Flow', url: 'https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow' },
          { label: 'Semantic Versioning', url: 'https://semver.org/lang/fr/' },
        ],
      },
      {
        title: '.gitignore & outils',
        content: `### .gitignore

\`\`\`bash
node_modules/
.env
dist/
*.log
.DS_Store
__pycache__/
\`\`\`

> Utilisez [gitignore.io](https://www.toptal.com/developers/gitignore)

### Outils utiles

\`\`\`bash
git blame fichier.txt
git log --graph --oneline --all
git shortlog -sn
\`\`\``,
        links: [
          { label: 'gitignore.io', url: 'https://www.toptal.com/developers/gitignore' },
          { label: 'Collection .gitignore', url: 'https://github.com/github/gitignore' },
        ],
      },
    ],
    exercises: [
      {
        title: 'GitHub Flow complet',
        scenario: "Sprint planning : on vous assigne la feature de login. Suivez le GitHub Flow complet : créer une branche, coder, commiter, pousser pour ouvrir une PR.",
        objectives: ['Créer feature/login depuis main', 'Faire au moins un commit', 'Pousser vers origin'],
        hints: [
          "Le GitHub Flow suit un cycle : branche → commit → push → PR. Commencez par créer et basculer sur une branche feature.",
          "Après votre commit, il faut pousser la branche vers le remote pour qu'elle apparaisse sur GitHub/GitLab.",
        ],
        solution: ['git checkout -b feature/login', 'touch login.js', 'git add .', 'git commit -m "feat(auth): ajouter le formulaire de login"', 'git push -u origin feature/login'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch index.html', 'git add .', 'git commit -m "init"',
          'git remote add origin https://github.com/startup/webapp.git'],
        validate: (cmds, state) =>
          state.HEAD?.includes('feature/login') &&
          state.commits.length >= 2 &&
          cmds.some(c => c.includes('push')),
      },
      {
        title: 'Taguer une release',
        scenario: "La v1.0.0 de votre application est prête à partir en production. Le devops vous demande de créer un tag Git annoté pour marquer cette version et de le pousser sur le serveur.",
        objectives: ['Créer un tag annoté v1.0.0', 'Pousser le tag sur origin'],
        hints: [
          "Les tags marquent des points importants dans l'historique (releases). Il existe des tags 'légers' et 'annotés'. Les annotés sont recommandés.",
          "'git tag -a v1.0.0 -m \"message\"' crée un tag annoté. 'git push origin --tags' les envoie au serveur.",
        ],
        solution: ['git tag -a v1.0.0 -m "Release 1.0.0"', 'git push origin --tags'],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch app.js', 'git add .', 'git commit -m "feat: application complète"',
          'git remote add origin https://github.com/startup/webapp.git'],
        validate: (cmds, state) =>
          state.tags['v1.0.0'] !== undefined &&
          cmds.some(c => c.includes('push') && c.includes('tag')),
      },
      {
        title: 'Workflow hotfix en production',
        scenario: "Alerte PagerDuty à 3h du matin ! Un bug critique en production. Vous devez créer une branche hotfix depuis main, commiter le fix, merger dans main et taguer le patch.",
        objectives: ['Créer hotfix/critical-bug depuis main', 'Commiter le fix', 'Revenir sur main et merger', 'Créer un tag v1.0.1'],
        hints: [
          "Un hotfix suit le même workflow qu'une feature mais avec plus d'urgence. Branche → fix → merge → tag.",
          "Créez la branche hotfix, commitez dedans, revenez sur main, mergez, puis taguez la nouvelle version patch (v1.0.1).",
        ],
        solution: [
          'git checkout -b hotfix/critical-bug',
          'touch fix.js', 'git add .', 'git commit -m "fix: corriger le bug critique"',
          'git checkout main', 'git merge hotfix/critical-bug',
          'git tag -a v1.0.1 -m "Hotfix critical bug"',
        ],
        setup: ['git init', 'git config --global user.name "Dev"', 'touch app.js', 'git add .', 'git commit -m "feat: v1.0.0"',
          'git tag -a v1.0.0 -m "v1.0.0"'],
        validate: (cmds, state) =>
          state.HEAD === 'main' &&
          state.tags['v1.0.1'] !== undefined &&
          cmds.some(c => c.includes('merge') && c.includes('hotfix')),
      },
    ],
  },
];

export default MODULES;
