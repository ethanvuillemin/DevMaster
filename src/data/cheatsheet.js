/**
 * Données structurées pour la cheatsheet Git.
 */

const CHEATSHEET_SECTIONS = [
  {
    title: 'Configuration',
    color: 'accent-green',
    colorHex: '#34d399',
    commands: [
      { cmd: 'git config --global user.name "Nom"', desc: "Définir le nom" },
      { cmd: 'git config --global user.email "email"', desc: "Définir l'email" },
      { cmd: 'git config --list', desc: 'Voir la configuration' },
      { cmd: 'git config --global core.editor "code"', desc: "Choisir l'éditeur" },
    ],
  },
  {
    title: 'Créer & Cloner',
    color: 'accent-blue',
    colorHex: '#60a5fa',
    commands: [
      { cmd: 'git init', desc: 'Initialiser un dépôt' },
      { cmd: 'git clone <url>', desc: 'Cloner un dépôt distant' },
    ],
  },
  {
    title: 'Modifications',
    color: 'accent-purple',
    colorHex: '#a78bfa',
    commands: [
      { cmd: 'git status', desc: "État des fichiers" },
      { cmd: 'git add <fichier>', desc: 'Ajouter au staging' },
      { cmd: 'git add .', desc: 'Tout ajouter' },
      { cmd: 'git commit -m "msg"', desc: 'Créer un commit' },
      { cmd: 'git diff', desc: 'Voir les différences' },
      { cmd: 'git diff --staged', desc: 'Différences stagées' },
    ],
  },
  {
    title: 'Branches',
    color: 'accent-pink',
    colorHex: '#f472b6',
    commands: [
      { cmd: 'git branch', desc: 'Lister les branches' },
      { cmd: 'git branch <nom>', desc: 'Créer une branche' },
      { cmd: 'git checkout <nom>', desc: 'Changer de branche' },
      { cmd: 'git checkout -b <nom>', desc: 'Créer + changer' },
      { cmd: 'git merge <branche>', desc: 'Fusionner' },
      { cmd: 'git branch -d <nom>', desc: 'Supprimer' },
    ],
  },
  {
    title: 'Remote',
    color: 'accent-orange',
    colorHex: '#fb923c',
    commands: [
      { cmd: 'git remote add origin <url>', desc: 'Ajouter un remote' },
      { cmd: 'git push origin <branche>', desc: 'Pousser' },
      { cmd: 'git pull origin <branche>', desc: 'Récupérer + fusionner' },
      { cmd: 'git fetch', desc: 'Récupérer sans fusionner' },
      { cmd: 'git push -u origin <br>', desc: 'Pousser + tracking' },
    ],
  },
  {
    title: 'Annuler',
    color: 'accent-red',
    colorHex: '#f87171',
    commands: [
      { cmd: 'git restore <fichier>', desc: 'Annuler les modifs' },
      { cmd: 'git restore --staged <f>', desc: 'Retirer du staging' },
      { cmd: 'git revert <commit>', desc: 'Annuler un commit (sûr)' },
      { cmd: 'git reset --soft HEAD~1', desc: 'Défaire le commit' },
      { cmd: 'git reset --hard HEAD~1', desc: '⚠️ Tout supprimer' },
      { cmd: 'git commit --amend', desc: 'Corriger le dernier commit' },
    ],
  },
  {
    title: 'Stash',
    color: 'accent-yellow',
    colorHex: '#fbbf24',
    commands: [
      { cmd: 'git stash', desc: 'Mettre de côté' },
      { cmd: 'git stash push -m "msg"', desc: 'Stash nommé' },
      { cmd: 'git stash list', desc: 'Lister' },
      { cmd: 'git stash pop', desc: 'Récupérer + supprimer' },
      { cmd: 'git stash apply', desc: 'Récupérer (garder)' },
    ],
  },
  {
    title: 'Historique',
    color: 'text-secondary',
    colorHex: '#94a3b8',
    commands: [
      { cmd: 'git log', desc: "Voir l'historique" },
      { cmd: 'git log --oneline', desc: 'Condensé' },
      { cmd: 'git log --graph --all', desc: 'En graphe' },
      { cmd: 'git reflog', desc: 'Filet de sécurité' },
      { cmd: 'git blame <fichier>', desc: 'Auteur par ligne' },
      { cmd: 'git shortlog -sn', desc: 'Stats par auteur' },
    ],
  },
];

export default CHEATSHEET_SECTIONS;
