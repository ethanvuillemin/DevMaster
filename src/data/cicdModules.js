/**
 * Modules CI/CD — From Scratch to Hero
 *
 * Chaque exercice utilise un éditeur YAML (pas le terminal Git).
 * La validation vérifie le contenu YAML écrit par l'étudiant.
 */

const CICD_MODULES = [
  // ═══════════════════════════════════════════════════════════
  // MODULE 1 — Introduction au CI/CD
  // ═══════════════════════════════════════════════════════════
  {
    id: 101, level: 'Débutant', icon: '🔄', title: 'Introduction au CI/CD',
    desc: 'Comprendre les concepts fondamentaux de l\'intégration et du déploiement continus.',
    color: 'green', colorHex: '#34d399',
    lessons: [
      {
        title: 'Qu\'est-ce que le CI/CD ?',
        content: `### CI — Continuous Integration

L'**intégration continue** consiste à merger fréquemment le code de chaque développeur dans une branche commune, en vérifiant automatiquement que rien n'est cassé.

À chaque push ou Pull Request, un **pipeline** exécute :
1. **Build** — Compilation du code
2. **Test** — Tests automatisés (unitaires, intégration)
3. **Lint** — Vérification de la qualité du code

### CD — Continuous Delivery / Deployment

| Concept | Description |
|---------|------------|
| **Continuous Delivery** | Le code est prêt à être déployé à tout moment (déploiement manuel) |
| **Continuous Deployment** | Chaque changement validé est déployé automatiquement en production |

### Le pipeline CI/CD

\`\`\`
Push → Build → Test → Lint → Deploy staging → Deploy prod
\`\`\`

Chaque étape est un **job** ou **step**. Si une étape échoue, le pipeline s'arrête.

### Les plateformes

| Plateforme | Fichier de config | Intégration |
|-----------|------------------|------------|
| **GitHub Actions** | \`.github/workflows/*.yml\` | Native GitHub |
| **GitLab CI/CD** | \`.gitlab-ci.yml\` | Native GitLab |
| **Jenkins** | \`Jenkinsfile\` | Universel (auto-hébergé) |
| **CircleCI** | \`.circleci/config.yml\` | SaaS |
| **Travis CI** | \`.travis.yml\` | SaaS |

Toutes fonctionnent sur le même principe : un fichier YAML (ou Groovy pour Jenkins) décrit les étapes à exécuter automatiquement.`,
        links: [
          { label: 'CI/CD expliqué (Atlassian)', url: 'https://www.atlassian.com/fr/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment' },
          { label: 'DevOps Roadmap', url: 'https://roadmap.sh/devops' },
        ],
      },
      {
        title: 'Anatomie d\'un pipeline',
        content: `### Structure commune à toutes les plateformes

Quel que soit l'outil, un pipeline se compose de :

#### 1. Trigger (déclencheur)
Quand le pipeline s'exécute : push, PR, schedule (cron), tag...

#### 2. Stages / Jobs
Les grandes phases : build, test, deploy. Elles s'exécutent en séquence ou en parallèle.

#### 3. Steps
Les commandes individuelles dans chaque job.

#### 4. Environment
L'OS et les outils disponibles (Ubuntu, Node.js, Docker...).

### Exemple conceptuel

\`\`\`yaml
# Ce n'est PAS un vrai fichier — c'est le concept
trigger: push on main

stages:
  - build:
      run: npm install && npm run build
  - test:
      run: npm test
  - deploy:
      run: deploy-to-production
      only: main branch
\`\`\`

### Vocabulaire essentiel

| Terme | Signification |
|-------|--------------|
| **Pipeline** | L'ensemble du processus automatisé |
| **Job** | Une tâche isolée (build, test...) |
| **Step** | Une commande dans un job |
| **Runner** | La machine qui exécute le pipeline |
| **Artifact** | Fichier produit par un job (ex: build/) |
| **Cache** | Fichiers réutilisés entre runs (ex: node_modules/) |
| **Secret** | Variable sensible (API key, token) |`,
        links: [
          { label: 'GitHub Actions Docs', url: 'https://docs.github.com/fr/actions' },
          { label: 'GitLab CI/CD Docs', url: 'https://docs.gitlab.com/ee/ci/' },
        ],
      },
      {
        title: 'Comprendre le YAML',
        content: `### Qu'est-ce que le YAML ?

**YAML** (YAML Ain't Markup Language) est un format de données lisible par l'humain. C'est le format utilisé par **toutes** les plateformes CI/CD modernes (GitHub Actions, GitLab CI, CircleCI, etc.) pour décrire les pipelines.

### Pourquoi YAML ?

| Format | Lisibilité | Usage en CI/CD |
|--------|-----------|---------------|
| **JSON** | Moyen (accolades, virgules) | Rare |
| **XML** | Faible (balises verbeuses) | Jenkins legacy |
| **YAML** | ✅ Excellent (indentation) | Standard actuel |
| **Groovy** | Code (if/else) | Jenkins Pipelines |

### Syntaxe de base

\`\`\`yaml
# Ceci est un commentaire

# Clé-valeur simple
name: Mon Pipeline
version: 1.0

# Listes (avec tirets)
fruits:
  - pomme
  - banane
  - cerise

# Objet imbriqué (avec indentation)
serveur:
  host: localhost
  port: 3000
  debug: true

# Liste d'objets
utilisateurs:
  - nom: Alice
    role: admin
  - nom: Bob
    role: dev
\`\`\`

### ⚠️ Les pièges du YAML

1. **L'indentation est OBLIGATOIRE** — Utilisez des **espaces** (pas des tabulations). 2 espaces par niveau.
2. **Pas de tabulations** — YAML les interdit. Configurez votre éditeur en "spaces only".
3. **Les deux-points (:)** doivent être suivis d'un espace : \`clé: valeur\` (pas \`clé:valeur\`)
4. **Les chaînes avec caractères spéciaux** doivent être entre guillemets : \`message: "Bonjour: monde"\`

### YAML appliqué au CI/CD

\`\`\`yaml
# Structure type d'un fichier CI/CD
name: CI Pipeline              # string
on: push                       # string (déclencheur)

jobs:                          # objet
  build:                       # objet imbriqué (le job)
    runs-on: ubuntu-latest     # string
    steps:                     # liste
      - uses: actions/checkout@v4    # élément 1
      - run: npm install             # élément 2
      - run: npm test                # élément 3
\`\`\`

Chaque niveau d'indentation représente un **niveau hiérarchique**. C'est comme un plan de document : titre → sous-titre → contenu.`,
        links: [
          { label: 'YAML — Tutoriel complet', url: 'https://learnxinyminutes.com/docs/fr-fr/yaml-fr/' },
          { label: 'YAML Validator en ligne', url: 'https://www.yamllint.com/' },
          { label: 'YAML Spec officielle', url: 'https://yaml.org/spec/1.2.2/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Votre premier workflow GitHub Actions',
        scenario: "Votre équipe utilise GitHub. Le tech lead vous demande de mettre en place un pipeline basique qui s'exécute à chaque push et affiche \"Hello CI!\".",
        objectives: ['Créer un workflow GitHub Actions valide', 'Déclencher sur push', 'Avoir au moins un job avec un step'],
        hints: [
          "Un workflow GitHub Actions est un fichier YAML. Il doit définir un nom, un déclencheur ('on'), et des 'jobs'.",
          "Chaque job a besoin d'un 'runs-on' (l'OS) et de 'steps'. Un step peut être 'run: commande' ou 'uses: action'.",
          "La structure minimale : name → on → jobs → mon-job → runs-on + steps. L'OS classique est 'ubuntu-latest'.",
        ],
        solution: `name: CI
on: push
jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Hello CI!"`,
        starterCode: `# .github/workflows/ci.yml
# Écrivez votre premier workflow GitHub Actions
name: 
`,
        validate: (yaml) => {
          return yaml.includes('name:') && yaml.includes('on:') &&
            yaml.includes('jobs:') && yaml.includes('runs-on:') &&
            yaml.includes('steps:') && (yaml.includes('run:') || yaml.includes('uses:'));
        },
      },
      {
        title: 'Premier pipeline GitLab CI',
        scenario: "Votre entreprise utilise GitLab. On vous demande de créer un fichier .gitlab-ci.yml avec un stage 'test' qui exécute les tests.",
        objectives: ['Définir les stages du pipeline', 'Créer un job de test', 'Spécifier le script à exécuter'],
        hints: [
          "GitLab CI utilise un fichier .gitlab-ci.yml à la racine du projet. La structure est différente de GitHub Actions.",
          "Dans GitLab CI, on définit d'abord les 'stages' (phases), puis chaque job déclare à quel stage il appartient avec 'stage:'.",
          "Un job GitLab CI a besoin d'un 'stage:' et d'un 'script:' (liste de commandes).",
        ],
        solution: `stages:
  - test

run-tests:
  stage: test
  script:
    - echo "Running tests..."
    - npm test`,
        starterCode: `# .gitlab-ci.yml
# Créez un pipeline GitLab CI basique
`,
        validate: (yaml) => {
          return yaml.includes('stages:') && yaml.includes('stage:') &&
            yaml.includes('script:') && (yaml.includes('test') || yaml.includes('Test'));
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 2 — GitHub Actions en profondeur
  // ═══════════════════════════════════════════════════════════
  {
    id: 102, level: 'Débutant', icon: '🐙', title: 'GitHub Actions',
    desc: 'Maîtriser les workflows GitHub Actions de A à Z.',
    color: 'blue', colorHex: '#60a5fa',
    lessons: [
      {
        title: 'Structure d\'un workflow',
        content: `### Le fichier workflow

Emplacement : \`.github/workflows/nom.yml\`

\`\`\`yaml
name: CI Pipeline          # Nom du workflow

on:                        # Déclencheurs
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:                      # Les jobs
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4    # Cloner le repo
      - uses: actions/setup-node@v4  # Installer Node.js
        with:
          node-version: 20
      - run: npm ci                  # Installer deps
      - run: npm run build           # Build
      - run: npm test                # Tests
\`\`\`

### Les déclencheurs (on:)

| Trigger | Quand |
|---------|-------|
| \`push\` | À chaque push |
| \`pull_request\` | À chaque PR |
| \`schedule\` | Cron (ex: tous les jours) |
| \`workflow_dispatch\` | Manuellement |
| \`release\` | À chaque release |

### Les actions prédéfinies

Les "actions" sont des blocs réutilisables du marketplace :

\`\`\`yaml
- uses: actions/checkout@v4          # Cloner le code
- uses: actions/setup-node@v4       # Installer Node
- uses: actions/setup-python@v5     # Installer Python
- uses: actions/cache@v4            # Cacher les deps
- uses: actions/upload-artifact@v4  # Sauver des fichiers
\`\`\``,
        links: [
          { label: 'GitHub Actions Quickstart', url: 'https://docs.github.com/fr/actions/quickstart' },
          { label: 'Workflow Syntax', url: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions' },
          { label: 'Actions Marketplace', url: 'https://github.com/marketplace?type=actions' },
        ],
      },
      {
        title: 'Variables, secrets et conditions',
        content: `### Variables d'environnement

\`\`\`yaml
env:                              # Variables globales
  NODE_ENV: production

jobs:
  build:
    runs-on: ubuntu-latest
    env:                          # Variables du job
      DATABASE_URL: postgres://...
    steps:
      - run: echo \${{ env.NODE_ENV }}
\`\`\`

### Secrets

Configurés dans Settings → Secrets → Actions de votre repo.

\`\`\`yaml
steps:
  - run: deploy --token \${{ secrets.DEPLOY_TOKEN }}
\`\`\`

> **Règle d'or** : Ne JAMAIS mettre de secrets dans le YAML. Toujours utiliser \`secrets.\`

### Conditions (if:)

\`\`\`yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'   # Seulement sur main
    steps:
      - run: echo "Deploying..."

  notify:
    runs-on: ubuntu-latest
    if: failure()                          # Seulement si échec
    steps:
      - run: echo "Pipeline failed!"
\`\`\`

### Matrice de build

\`\`\`yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
    runs-on: \${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm test
\`\`\``,
        links: [
          { label: 'Variables d\'environnement', url: 'https://docs.github.com/en/actions/learn-github-actions/variables' },
          { label: 'Secrets', url: 'https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Pipeline Node.js complet',
        scenario: "Vous développez une API Node.js. Mettez en place un pipeline qui s'exécute sur push et PR vers main, installe les dépendances, lance le build et exécute les tests.",
        objectives: ['Déclencher sur push ET pull_request vers main', 'Utiliser actions/checkout et actions/setup-node', 'Exécuter npm ci, npm run build, npm test'],
        hints: [
          "Le déclencheur 'on' peut accepter plusieurs événements. 'push' et 'pull_request' peuvent cibler des branches spécifiques.",
          "L'action 'actions/checkout@v4' récupère le code. 'actions/setup-node@v4' installe Node. Utilisez 'with: node-version:' pour préciser la version.",
          "Les commandes 'npm ci' (install propre), 'npm run build' et 'npm test' s'ajoutent chacune comme un step 'run:'.",
        ],
        solution: `name: Node.js CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm test`,
        starterCode: `# .github/workflows/ci.yml
name: Node.js CI
on:
  # Déclencher sur push et PR vers main

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      # Ajoutez vos steps ici
`,
        validate: (yaml) => {
          return yaml.includes('push') && yaml.includes('pull_request') &&
            yaml.includes('actions/checkout') && yaml.includes('actions/setup-node') &&
            yaml.includes('npm ci') && yaml.includes('npm test') && yaml.includes('main');
        },
      },
      {
        title: 'Déploiement conditionnel',
        scenario: "Le pipeline doit builder sur toutes les branches, mais déployer UNIQUEMENT quand le code est poussé sur main. Ajoutez un job de déploiement conditionnel.",
        objectives: ['Un job build qui tourne toujours', 'Un job deploy conditionné à la branche main', 'Le job deploy dépend du job build'],
        hints: [
          "GitHub Actions permet d'ajouter une condition à un job avec 'if:'. On peut vérifier la branche avec 'github.ref'.",
          "Pour créer une dépendance entre jobs, utilisez 'needs: build'. La condition pour main est: if: github.ref == 'refs/heads/main'.",
        ],
        solution: `name: CI/CD
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm test
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: echo "Deploying to production..."`,
        starterCode: `name: CI/CD
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm test
  # Ajoutez un job deploy conditionnel
`,
        validate: (yaml) => {
          return yaml.includes('needs:') && yaml.includes('if:') &&
            yaml.includes('main') && yaml.includes('deploy');
        },
      },
      {
        title: 'Tests en matrice',
        scenario: "Votre bibliothèque open-source doit être compatible Node 18, 20 et 22. Configurez une matrice de tests qui exécute les tests sur ces 3 versions automatiquement.",
        objectives: ['Utiliser strategy.matrix pour les versions Node', 'Tester sur 3 versions'],
        hints: [
          "La directive 'strategy: matrix:' permet de faire tourner un même job avec plusieurs configurations. Chaque combinaison crée un run séparé.",
          "Définissez 'matrix: node-version: [18, 20, 22]' puis utilisez '${{ matrix.node-version }}' dans setup-node.",
        ],
        solution: `name: Matrix CI
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci
      - run: npm test`,
        starterCode: `name: Matrix CI
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    # Ajoutez une stratégie de matrice
    steps:
      - uses: actions/checkout@v4
      # Configurez Node.js avec la version de la matrice
`,
        validate: (yaml) => {
          return yaml.includes('strategy:') && yaml.includes('matrix:') &&
            yaml.includes('node-version') && yaml.includes('18') && yaml.includes('20');
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 3 — GitLab CI/CD
  // ═══════════════════════════════════════════════════════════
  {
    id: 103, level: 'Intermédiaire', icon: '🦊', title: 'GitLab CI/CD',
    desc: 'Maîtriser les pipelines GitLab CI/CD.',
    color: 'purple', colorHex: '#a78bfa',
    lessons: [
      {
        title: 'Structure de .gitlab-ci.yml',
        content: `### Le fichier .gitlab-ci.yml

À la racine du projet, ce fichier définit tout le pipeline.

\`\`\`yaml
# Définir les phases du pipeline
stages:
  - build
  - test
  - deploy

# Variables globales
variables:
  NODE_ENV: production

# Job de build
build-app:
  stage: build
  image: node:20
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

# Job de test
test-app:
  stage: test
  image: node:20
  script:
    - npm ci
    - npm test

# Job de déploiement
deploy-prod:
  stage: deploy
  script:
    - echo "Deploying..."
  only:
    - main
  environment:
    name: production
\`\`\`

### Différences avec GitHub Actions

| Concept | GitHub Actions | GitLab CI |
|---------|---------------|-----------|
| Fichier | \`.github/workflows/*.yml\` | \`.gitlab-ci.yml\` |
| Image Docker | \`runs-on:\` | \`image:\` |
| Commandes | \`run:\` | \`script:\` |
| Phases | Pas de stages natifs | \`stages:\` |
| Condition | \`if:\` | \`only:/except:\` ou \`rules:\` |
| Dépendances | \`needs:\` | \`needs:\` (identique) |

### Images Docker

GitLab CI exécute chaque job dans un **conteneur Docker** :

\`\`\`yaml
build:
  image: node:20-alpine    # Image légère Node.js
  script:
    - npm ci
\`\`\``,
        links: [
          { label: 'GitLab CI/CD Reference', url: 'https://docs.gitlab.com/ee/ci/yaml/' },
          { label: 'GitLab CI Quick Start', url: 'https://docs.gitlab.com/ee/ci/quick_start/' },
          { label: 'Predefined Variables', url: 'https://docs.gitlab.com/ee/ci/variables/predefined_variables.html' },
        ],
      },
      {
        title: 'Artifacts, cache et environments',
        content: `### Artifacts — Passer des fichiers entre jobs

\`\`\`yaml
build:
  stage: build
  script: npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy:
  stage: deploy
  script: deploy dist/
  # dist/ est automatiquement disponible
\`\`\`

### Cache — Accélérer les pipelines

\`\`\`yaml
build:
  cache:
    key: \$CI_COMMIT_REF_SLUG
    paths:
      - node_modules/
  script:
    - npm ci
    - npm run build
\`\`\`

### Environments — Gérer les déploiements

\`\`\`yaml
deploy-staging:
  stage: deploy
  environment:
    name: staging
    url: https://staging.monapp.com
  only:
    - develop

deploy-prod:
  stage: deploy
  environment:
    name: production
    url: https://monapp.com
  only:
    - main
  when: manual    # Déploiement manuel (clic)
\`\`\`

### Rules (remplacement moderne de only/except)

\`\`\`yaml
deploy:
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"
      when: always
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"
      when: manual
    - when: never
\`\`\``,
        links: [
          { label: 'Artifacts', url: 'https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html' },
          { label: 'Cache', url: 'https://docs.gitlab.com/ee/ci/caching/' },
          { label: 'Environments', url: 'https://docs.gitlab.com/ee/ci/environments/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Pipeline GitLab multi-stages',
        scenario: "Votre projet Python sur GitLab a besoin d'un pipeline avec 3 stages : lint, test et build. Chaque stage utilise une image Python.",
        objectives: ['Définir 3 stages', 'Créer un job par stage avec image Python', 'Utiliser les bonnes commandes (pylint, pytest, python setup.py build)'],
        hints: [
          "GitLab CI commence toujours par déclarer les 'stages:' dans l'ordre d'exécution. Chaque job déclare son stage avec 'stage:'.",
          "Chaque job peut spécifier son image Docker avec 'image:'. Pour Python, utilisez 'python:3.12'. Les commandes vont dans 'script:'.",
        ],
        solution: `stages:
  - lint
  - test
  - build

lint-code:
  stage: lint
  image: python:3.12
  script:
    - pip install pylint
    - pylint src/

run-tests:
  stage: test
  image: python:3.12
  script:
    - pip install pytest
    - pytest tests/

build-app:
  stage: build
  image: python:3.12
  script:
    - python setup.py build`,
        starterCode: `# .gitlab-ci.yml
# Créez un pipeline Python à 3 stages
`,
        validate: (yaml) => {
          return yaml.includes('stages:') && yaml.includes('lint') &&
            yaml.includes('test') && yaml.includes('build') &&
            yaml.includes('image:') && yaml.includes('script:') &&
            yaml.includes('stage:');
        },
      },
      {
        title: 'Artifacts entre jobs',
        scenario: "Le job 'build' produit un dossier dist/ qui doit être utilisé par le job 'deploy'. Configurez les artifacts pour passer ces fichiers entre les stages.",
        objectives: ['Le job build crée des artifacts', 'Le job deploy utilise ces artifacts', 'Les artifacts expirent après 1 heure'],
        hints: [
          "Dans GitLab CI, les 'artifacts' permettent de sauvegarder des fichiers d'un job pour les rendre disponibles aux suivants.",
          "Ajoutez 'artifacts: paths: [dist/]' au job build. Le job deploy du stage suivant y aura accès automatiquement. 'expire_in' contrôle la durée.",
        ],
        solution: `stages:
  - build
  - deploy

build-app:
  stage: build
  image: node:20
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy-app:
  stage: deploy
  script:
    - echo "Deploying dist/"
  only:
    - main`,
        starterCode: `stages:
  - build
  - deploy

build-app:
  stage: build
  image: node:20
  script:
    - npm ci
    - npm run build
  # Ajoutez les artifacts ici

deploy-app:
  stage: deploy
  script:
    - echo "Deploying dist/"
`,
        validate: (yaml) => {
          return yaml.includes('artifacts:') && yaml.includes('paths:') &&
            yaml.includes('dist') && yaml.includes('expire_in');
        },
      },
      {
        title: 'Déploiement multi-environnements',
        scenario: "Configurez le déploiement vers staging (auto sur develop) et production (manuel sur main) avec les environments GitLab.",
        objectives: ['Deploy staging automatique sur develop', 'Deploy production manuel sur main', 'Déclarer les environments avec URL'],
        hints: [
          "GitLab CI a la notion d'environments qui trackent les déploiements. 'when: manual' force un clic pour déclencher.",
          "'only:' restreint à une branche. 'environment: name:' + 'url:' déclare l'environnement. 'when: manual' rend le déploiement manuel.",
        ],
        solution: `stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm run build

deploy-staging:
  stage: deploy
  script:
    - echo "Deploy to staging"
  environment:
    name: staging
    url: https://staging.app.com
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - echo "Deploy to production"
  environment:
    name: production
    url: https://app.com
  only:
    - main
  when: manual`,
        starterCode: `stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm run build

# Ajoutez les jobs de déploiement staging et production
`,
        validate: (yaml) => {
          return yaml.includes('environment:') && yaml.includes('staging') &&
            yaml.includes('production') && yaml.includes('when: manual') &&
            (yaml.includes('only:') || yaml.includes('rules:'));
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 4 — Jenkins
  // ═══════════════════════════════════════════════════════════
  {
    id: 104, level: 'Intermédiaire', icon: '🏗️', title: 'Jenkins Pipelines',
    desc: 'Créer des pipelines Jenkins déclaratifs et scriptés.',
    color: 'pink', colorHex: '#f472b6',
    lessons: [
      {
        title: 'Jenkinsfile déclaratif',
        content: `### Qu'est-ce que Jenkins ?

Jenkins est un serveur d'automatisation **open-source et auto-hébergé**. Contrairement à GitHub Actions et GitLab CI (SaaS), Jenkins tourne sur vos propres serveurs.

### Pipeline déclaratif (recommandé)

\`\`\`groovy
pipeline {
    agent any                    // Sur n'importe quel runner

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'    // Seulement sur main
            }
            steps {
                sh 'deploy.sh'
            }
        }
    }

    post {
        always {
            cleanWs()           // Nettoyer le workspace
        }
        failure {
            mail to: 'team@company.com',
                 subject: 'Pipeline Failed!'
        }
    }
}
\`\`\`

### Comparaison

| Concept | GitHub Actions | GitLab CI | Jenkins |
|---------|---------------|-----------|---------|
| Langage | YAML | YAML | Groovy |
| Hébergement | Cloud (GitHub) | Cloud/Self | Self-hosted |
| Fichier | \`workflows/*.yml\` | \`.gitlab-ci.yml\` | \`Jenkinsfile\` |
| Plugins | Actions Marketplace | Pas de plugins | 1800+ plugins |
| Coût | Gratuit (publics) | Gratuit (limité) | Gratuit (infra à vous) |`,
        links: [
          { label: 'Jenkins Pipeline Syntax', url: 'https://www.jenkins.io/doc/book/pipeline/syntax/' },
          { label: 'Jenkins Getting Started', url: 'https://www.jenkins.io/doc/book/pipeline/getting-started/' },
          { label: 'Jenkinsfile Examples', url: 'https://www.jenkins.io/doc/pipeline/examples/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Premier Jenkinsfile',
        scenario: "Votre entreprise utilise Jenkins. Créez un Jenkinsfile déclaratif avec les stages Build et Test pour un projet Node.js.",
        objectives: ['Écrire un pipeline déclaratif Jenkins', 'Stages Build et Test', 'Utiliser sh pour les commandes'],
        hints: [
          "Un Jenkinsfile déclaratif commence par 'pipeline { }' et contient 'agent', 'stages' et des 'stage()' avec des 'steps'.",
          "La syntaxe : pipeline → agent any → stages → stage('Nom') → steps → sh 'commande'. C'est du Groovy, pas du YAML.",
        ],
        solution: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}`,
        starterCode: `// Jenkinsfile
// Écrivez un pipeline déclaratif
pipeline {

}`,
        validate: (content) => {
          return content.includes('pipeline') && content.includes('agent') &&
            content.includes('stages') && content.includes('stage(') &&
            content.includes('steps') && content.includes('sh ');
        },
      },
      {
        title: 'Pipeline avec conditions et post-actions',
        scenario: "Ajoutez un stage Deploy conditionné à la branche main, et des post-actions pour notifier en cas d'échec.",
        objectives: ['Stage Deploy avec condition when/branch', 'Bloc post avec failure notification'],
        hints: [
          "Jenkins utilise 'when { branch \"main\" }' pour conditionner un stage. Le bloc 'post { }' gère les actions après le pipeline.",
          "Dans 'post', 'failure { }' s'exécute uniquement en cas d'échec. 'always { }' s'exécute tout le temps.",
        ],
        solution: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm ci && npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh'
            }
        }
    }
    post {
        failure {
            echo 'Pipeline failed!'
        }
    }
}`,
        starterCode: `pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm ci && npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        // Ajoutez un stage Deploy conditionnel
    }
    // Ajoutez des post-actions
}`,
        validate: (content) => {
          return content.includes('when') && content.includes('branch') &&
            content.includes('post') && (content.includes('failure') || content.includes('always'));
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 5 — Tests & Qualité
  // ═══════════════════════════════════════════════════════════
  {
    id: 105, level: 'Avancé', icon: '🧪', title: 'Tests & Quality Gates',
    desc: 'Automatiser les tests, le linting et la couverture de code.',
    color: 'orange', colorHex: '#fb923c',
    lessons: [
      {
        title: 'Stratégie de tests en CI',
        content: `### Les niveaux de test

| Type | Vitesse | Portée | Quand |
|------|---------|--------|-------|
| **Unit tests** | Rapide | 1 fonction | Toujours |
| **Integration tests** | Moyen | Plusieurs modules | Toujours |
| **E2E tests** | Lent | Application complète | PR vers main |
| **Lint/Format** | Très rapide | Style de code | Toujours |

### Pipeline de qualité typique

\`\`\`yaml
jobs:
  lint:
    steps:
      - run: npm run lint          # ESLint, Prettier
  unit-tests:
    steps:
      - run: npm test -- --coverage  # Tests + couverture
  e2e-tests:
    needs: [lint, unit-tests]
    steps:
      - run: npx cypress run      # Tests end-to-end
\`\`\`

### Couverture de code

\`\`\`yaml
- run: npm test -- --coverage
- uses: codecov/codecov-action@v4  # Upload vers Codecov
\`\`\`

### Outils populaires

| Langage | Linter | Tests | E2E |
|---------|--------|-------|-----|
| JavaScript | ESLint | Jest, Vitest | Cypress, Playwright |
| Python | pylint, flake8 | pytest | Selenium |
| Java | Checkstyle | JUnit | Selenium |
| Go | golangci-lint | go test | - |`,
        links: [
          { label: 'Testing Best Practices', url: 'https://docs.github.com/en/actions/automating-builds-and-tests' },
          { label: 'Codecov', url: 'https://about.codecov.io/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Pipeline de qualité complet',
        scenario: "Le CTO exige que chaque PR passe par du lint, des tests unitaires avec couverture, et des tests E2E. Mettez en place ce pipeline de qualité.",
        objectives: ['Jobs parallèles : lint + unit-tests', 'Job E2E qui dépend des deux premiers', 'Couverture de code avec --coverage'],
        hints: [
          "Plusieurs jobs sans 'needs:' s'exécutent en parallèle. Le job E2E utilise 'needs: [lint, unit-tests]' pour attendre les deux.",
          "Pour le lint, exécutez 'npm run lint'. Pour les tests avec couverture : 'npm test -- --coverage'. Pour E2E : 'npx cypress run'.",
        ],
        solution: `name: Quality Gate
on: pull_request
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test -- --coverage
  e2e-tests:
    needs: [lint, unit-tests]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx cypress run`,
        starterCode: `name: Quality Gate
on: pull_request
jobs:
  # Créez les jobs lint, unit-tests et e2e-tests
`,
        validate: (yaml) => {
          return yaml.includes('lint') && yaml.includes('unit-tests') &&
            yaml.includes('needs:') && yaml.includes('coverage') &&
            (yaml.includes('cypress') || yaml.includes('playwright') || yaml.includes('e2e'));
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 6 — Docker & Build d'images
  // ═══════════════════════════════════════════════════════════
  {
    id: 106, level: 'Avancé', icon: '🐳', title: 'Docker & Container Builds',
    desc: 'Builder et pousser des images Docker dans un pipeline CI/CD.',
    color: 'red', colorHex: '#f87171',
    lessons: [
      {
        title: 'Docker dans un pipeline',
        content: `### Pourquoi Docker en CI/CD ?

Docker permet de créer des **images reproductibles** de votre application. Le pipeline build l'image, la teste, puis la pousse vers un registre.

### GitHub Actions + Docker

\`\`\`yaml
name: Docker Build
on:
  push:
    branches: [main]
jobs:
  build:
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
          push: true
          tags: ghcr.io/user/app:latest
\`\`\`

### GitLab CI + Docker

\`\`\`yaml
build-image:
  image: docker:24
  services:
    - docker:24-dind
  script:
    - docker build -t registry.gitlab.com/group/app:latest .
    - docker push registry.gitlab.com/group/app:latest
\`\`\`

### Registres d'images

| Registre | URL | Intégration |
|----------|-----|-------------|
| GitHub Container Registry | ghcr.io | GitHub |
| GitLab Registry | registry.gitlab.com | GitLab |
| Docker Hub | docker.io | Universel |
| AWS ECR | *.ecr.*.amazonaws.com | AWS |`,
        links: [
          { label: 'Docker Build Push Action', url: 'https://github.com/docker/build-push-action' },
          { label: 'GitLab Docker Integration', url: 'https://docs.gitlab.com/ee/ci/docker/using_docker_build.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Build et push Docker (GitHub)',
        scenario: "Votre application est containerisée. Configurez un workflow qui build l'image Docker et la pousse vers GitHub Container Registry à chaque push sur main.",
        objectives: ['Login au registre ghcr.io', 'Build et push avec docker/build-push-action', 'Taguer avec latest'],
        hints: [
          "Il existe des actions prédéfinies pour Docker sur le marketplace GitHub. 'docker/login-action' gère l'authentification, 'docker/build-push-action' le build.",
          "Le login utilise 'registry: ghcr.io' avec 'secrets.GITHUB_TOKEN'. Le build utilise 'push: true' et 'tags:' pour nommer l'image.",
        ],
        solution: `name: Docker Build
on:
  push:
    branches: [main]
jobs:
  build-and-push:
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
          push: true
          tags: ghcr.io/myorg/myapp:latest`,
        starterCode: `name: Docker Build
on:
  push:
    branches: [main]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Ajoutez le login et le build Docker
`,
        validate: (yaml) => {
          return yaml.includes('docker/login-action') && yaml.includes('docker/build-push-action') &&
            yaml.includes('ghcr.io') && yaml.includes('push: true') && yaml.includes('tags:');
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 7 — Stratégies de déploiement avancées
  // ═══════════════════════════════════════════════════════════
  {
    id: 107, level: 'Expert', icon: '🚀', title: 'Déploiement & Patterns avancés',
    desc: 'Stratégies de déploiement, caching, monorepos et workflows complexes.',
    color: 'yellow', colorHex: '#fbbf24',
    lessons: [
      {
        title: 'Stratégies de déploiement',
        content: `### Les stratégies

| Stratégie | Principe | Risque |
|-----------|----------|--------|
| **Rolling** | Mise à jour progressive des instances | Moyen |
| **Blue/Green** | Deux environnements, bascule instantanée | Faible |
| **Canary** | Déployer sur un % des utilisateurs | Très faible |
| **Feature Flags** | Activer/désactiver des features sans redéployer | Très faible |

### Pipeline de production complet

\`\`\`yaml
name: Production Pipeline
on:
  push:
    branches: [main]
jobs:
  test:
    # ... tests
  build:
    needs: test
    # ... build Docker image
  deploy-staging:
    needs: build
    environment: staging
    # ... deploy to staging
  integration-tests:
    needs: deploy-staging
    # ... run tests on staging
  deploy-production:
    needs: integration-tests
    environment:
      name: production
      url: https://myapp.com
    # ... deploy to production
\`\`\`

### Caching avancé

\`\`\`yaml
# GitHub Actions
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-\${{ hashFiles('package-lock.json') }}
    restore-keys: npm-
\`\`\`

### Workflow réutilisable (DRY)

\`\`\`yaml
# .github/workflows/reusable-deploy.yml
on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: \${{ inputs.environment }}
    steps:
      - run: deploy --env \${{ inputs.environment }}
\`\`\``,
        links: [
          { label: 'Deployment Strategies', url: 'https://docs.github.com/en/actions/deployment/about-deployments/deploying-with-github-actions' },
          { label: 'Reusable Workflows', url: 'https://docs.github.com/en/actions/using-workflows/reusing-workflows' },
          { label: 'Caching Dependencies', url: 'https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Pipeline de production complet',
        scenario: "Vous êtes le lead DevOps. Concevez le pipeline de production complet : test → build → deploy staging → deploy production (manuel).",
        objectives: ['4 jobs chaînés avec needs', 'Staging automatique', 'Production manuelle avec environment'],
        hints: [
          "Chaînez les jobs avec 'needs:'. Chaque job dépend du précédent. 'environment:' avec 'name:' et 'url:' active la protection manuelle dans GitHub.",
          "Pour rendre un deploy manuel sur GitHub Actions, utilisez 'environment:' qui est auto-protégé. Sur GitLab, 'when: manual'.",
        ],
        solution: `name: Production Pipeline
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.myapp.com
    steps:
      - run: echo "Deploy to staging"
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.com
    steps:
      - run: echo "Deploy to production"`,
        starterCode: `name: Production Pipeline
on:
  push:
    branches: [main]
jobs:
  # Créez 4 jobs chaînés: test → build → staging → production
`,
        validate: (yaml) => {
          return yaml.includes('test') && yaml.includes('build') &&
            yaml.includes('staging') && yaml.includes('production') &&
            yaml.includes('needs:') && yaml.includes('environment:') &&
            yaml.includes('url:');
        },
      },
      {
        title: 'Pipeline avec cache',
        scenario: "Le pipeline prend 8 minutes à cause de npm ci. Ajoutez un cache sur node_modules pour diviser le temps par 3.",
        objectives: ['Utiliser actions/cache pour node_modules', 'Clé basée sur package-lock.json'],
        hints: [
          "L'action 'actions/cache@v4' sauvegarde un dossier entre les runs. La clé doit changer quand les dépendances changent.",
          "Utilisez 'hashFiles(\"package-lock.json\")' comme partie de la clé pour invalider le cache automatiquement quand les deps changent.",
        ],
        solution: `name: Cached CI
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/cache@v4
        with:
          path: ~/.npm
          key: npm-\${{ hashFiles('package-lock.json') }}
          restore-keys: npm-
      - run: npm ci
      - run: npm run build
      - run: npm test`,
        starterCode: `name: Cached CI
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Ajoutez le cache ici
      - run: npm ci
      - run: npm run build
      - run: npm test`,
        validate: (yaml) => {
          return yaml.includes('actions/cache') && yaml.includes('path:') &&
            yaml.includes('key:') && yaml.includes('hashFiles');
        },
      },
    ],
  },
];

export default CICD_MODULES;
