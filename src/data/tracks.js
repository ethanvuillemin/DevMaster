/**
 * Registre des parcours (tracks) de la plateforme.
 *
 * Chaque track a :
 *   - id, slug pour les routes
 *   - tags[] pour la catégorisation
 *   - capstone : projet pratique de fin de parcours
 */

export const TAGS = {
  devops: { label: 'DevOps', color: '#34d399', icon: '⚙️' },
  dev: { label: 'Développement', color: '#60a5fa', icon: '💻' },
  mlops: { label: 'MLOps', color: '#a78bfa', icon: '🧠' },
  llmops: { label: 'LLMOps', color: '#f472b6', icon: '🤖' },
  ia: { label: 'Intelligence Artificielle', color: '#fb923c', icon: '🧬' },
  fullstack: { label: 'Full Stack', color: '#fbbf24', icon: '🌐' },
};

const TRACKS = [
  {
    id: 'git',
    slug: '/git',
    icon: '🌿',
    title: 'Maîtriser Git',
    subtitle: 'Ligne de commande',
    desc: 'De git init au workflow professionnel. Terminal interactif avec moteur Git simulé et graphes SVG en temps réel.',
    tags: ['devops', 'dev'],
    color: '#34d399',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    features: ['Terminal simulé', '23 exercices métier', 'Graphes temps réel'],
    moduleIdRange: [1, 99],   // IDs 1-99 = Git modules
    capstone: {
      title: '🏆 Projet final : Contribuer à un projet open-source',
      scenario: `Vous allez simuler le workflow complet d'un contributeur open-source professionnel.

**Contexte** : Vous avez trouvé un bug dans une bibliothèque open-source populaire. Vous allez forker le projet, créer une branche de fix, coder la correction, et préparer une Pull Request propre.`,
      tasks: [
        {
          title: '1. Initialiser le projet',
          instructions: `Créez un nouveau dépôt Git et simulez un projet existant :

\`\`\`bash
mkdir open-source-lib && cd open-source-lib
git init
git config user.name "Votre Nom"
git config user.email "vous@email.com"

# Créer la structure du projet
echo '{ "name": "mathlib", "version": "1.2.0" }' > package.json
echo '# MathLib' > README.md
echo 'function add(a, b) { return a + b; }' > lib.js
echo 'module.exports = { add };' >> lib.js

git add .
git commit -m "feat: initial release v1.2.0"
git tag -a v1.2.0 -m "Release 1.2.0"
\`\`\``,
        },
        {
          title: '2. Simuler le fork et créer la branche de fix',
          instructions: `Ajoutez le remote "upstream" (le repo original) et créez votre branche de correction :

\`\`\`bash
git remote add upstream https://github.com/original/mathlib.git
git remote add origin https://github.com/vous/mathlib.git

# Créer une branche de fix depuis main
git checkout -b bugfix/fix-negative-numbers

# Vérifier
git branch
git remote -v
\`\`\``,
        },
        {
          title: '3. Coder le fix et commiter proprement',
          instructions: `Corrigez le bug et faites des commits Conventional Commits :

\`\`\`bash
# Modifier le code
echo 'function add(a, b) { return Number(a) + Number(b); }' > lib.js
echo 'function subtract(a, b) { return Number(a) - Number(b); }' >> lib.js
echo 'module.exports = { add, subtract };' >> lib.js

git add lib.js
git commit -m "fix(math): gérer les inputs non-numériques dans add()"

# Ajouter des tests
echo 'const { add } = require("./lib");' > test.js
echo 'console.assert(add(1, 2) === 3, "1+2 should be 3");' >> test.js
echo 'console.assert(add("1", "2") === 3, "string inputs");' >> test.js

git add test.js
git commit -m "test(math): ajouter les tests pour add() avec strings"
\`\`\``,
        },
        {
          title: '4. Préparer la Pull Request',
          instructions: `Vérifiez votre travail et poussez :

\`\`\`bash
# Vérifier l'historique
git log --oneline

# Vérifier que tout est clean
git status

# Pousser la branche
git push -u origin bugfix/fix-negative-numbers

# Vérifier le résultat
git log --oneline --all --graph
\`\`\`

**Sur GitHub/GitLab** : vous ouvririez maintenant une Pull Request / Merge Request depuis \`bugfix/fix-negative-numbers\` vers \`main\` du repo upstream.`,
        },
        {
          title: '5. Après le merge : nettoyer',
          instructions: `Une fois la PR mergée, nettoyez votre dépôt local :

\`\`\`bash
# Revenir sur main
git checkout main

# Mettre à jour depuis upstream
git pull upstream main

# Supprimer la branche de fix
git branch -d bugfix/fix-negative-numbers

# Taguer la nouvelle version
git tag -a v1.2.1 -m "Patch: fix negative numbers"

# Vérifier
git log --oneline --all
git tag
\`\`\``,
        },
      ],
      skills: ['git init/clone', 'branches', 'commits conventionnels', 'remotes', 'tags', 'workflow PR'],
      links: [
        { label: 'Guide : contribuer à l\'open-source', url: 'https://docs.github.com/fr/get-started/exploring-projects-on-github/contributing-to-a-project' },
        { label: 'Conventional Commits', url: 'https://www.conventionalcommits.org/fr/' },
      ],
    },
  },
  {
    id: 'cicd',
    slug: '/cicd',
    icon: '🔄',
    title: 'Maîtriser le CI/CD',
    subtitle: 'Pipelines & Déploiement',
    desc: 'GitHub Actions, GitLab CI, Jenkins. Écrivez de vrais pipelines YAML dans un éditeur interactif avec validation.',
    tags: ['devops'],
    color: '#60a5fa',
    gradient: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20',
    features: ['Éditeur YAML', '14 exercices pipeline', 'Multi-plateforme'],
    moduleIdRange: [100, 199], // IDs 100-199 = CI/CD modules
    capstone: {
      title: '🏆 Projet final : Pipeline de production full-stack',
      scenario: `Vous êtes le lead DevOps d'une startup. L'application est un site e-commerce React + API Node.js. Vous devez mettre en place le pipeline CI/CD complet, du push au déploiement.

**Objectif** : Écrire un workflow GitHub Actions qui gère tout le cycle de vie de l'application.`,
      tasks: [
        {
          title: '1. Pipeline de tests multi-services',
          instructions: `Créez un workflow qui teste le frontend ET le backend en parallèle :

\`\`\`yaml
# .github/workflows/ci.yml
name: Full-Stack CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test-frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  test-backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
\`\`\``,
        },
        {
          title: '2. Build Docker multi-images',
          instructions: `Ajoutez le build des images Docker après les tests :

\`\`\`yaml
  build-images:
    needs: [test-frontend, test-backend]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: ./frontend
          push: true
          tags: ghcr.io/startup/frontend:\${{ github.sha }}
      - uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: ghcr.io/startup/backend:\${{ github.sha }}
\`\`\``,
        },
        {
          title: '3. Déploiement staging automatique',
          instructions: `Déploiement automatique sur staging quand c'est pushé sur develop :

\`\`\`yaml
  deploy-staging:
    needs: build-images
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.monshop.com
    steps:
      - run: |
          echo "Deploying to staging..."
          echo "Frontend: ghcr.io/startup/frontend:\${{ github.sha }}"
          echo "Backend: ghcr.io/startup/backend:\${{ github.sha }}"
\`\`\``,
        },
        {
          title: '4. Déploiement production protégé',
          instructions: `Déploiement sur production uniquement sur main, avec protection d'environnement :

\`\`\`yaml
  deploy-production:
    needs: build-images
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://monshop.com
    steps:
      - run: |
          echo "🚀 Deploying to production..."
          echo "Version: \${{ github.sha }}"
\`\`\`

**Configuration GitHub** : activez la protection d'environnement "production" avec required reviewers dans Settings → Environments.`,
        },
        {
          title: '5. Notifications et monitoring',
          instructions: `Ajoutez des notifications Slack/Discord en cas d'échec :

\`\`\`yaml
  notify-failure:
    needs: [test-frontend, test-backend, build-images]
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "❌ Pipeline failed!"
          echo "Commit: \${{ github.sha }}"
          echo "Author: \${{ github.actor }}"
          # Dans la vraie vie : webhook Slack/Discord
\`\`\`

**Pipeline complet** : le fichier final fait ~100 lignes et couvre tests parallèles → build Docker → deploy staging → deploy production → notifications.`,
        },
      ],
      skills: ['GitHub Actions', 'Docker build', 'environments', 'conditions', 'secrets', 'notifications'],
      links: [
        { label: 'GitHub Actions — Deploying', url: 'https://docs.github.com/en/actions/deployment' },
        { label: 'Docker Build Push Action', url: 'https://github.com/docker/build-push-action' },
        { label: 'GitHub Environments', url: 'https://docs.github.com/en/actions/deployment/targeting-different-environments' },
      ],
    },
  },
];

export default TRACKS;
