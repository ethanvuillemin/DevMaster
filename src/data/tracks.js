/**
 * Registre des parcours (tracks) de la plateforme.
 */

export const TAGS = {
  devops:    { label: 'DevOps',                  color: '#59CD90', icon: '⚙️' },
  dev:       { label: 'Développement',           color: '#3FA7D6', icon: '💻' },
  mlops:     { label: 'MLOps',                   color: '#AA7DCE', icon: '🧠' },
  llmops:    { label: 'LLMOps',                  color: '#F3752B', icon: '🤖' },
  ia:        { label: 'Intelligence Artificielle',color: '#F3752B', icon: '🧬' },
  fullstack: { label: 'Full Stack',              color: '#3FA7D6', icon: '🌐' },
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
    color: '#59CD90',
    gradient: 'from-[#59CD90]/15 to-[#59CD90]/5',
    borderColor: 'border-[#59CD90]/25',
    features: ['Terminal simulé', '23 exercices métier', 'Graphes temps réel'],
    moduleIdRange: [1, 99],
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
          instructions: `Ajoutez le remote "upstream" et créez votre branche de correction :

\`\`\`bash
git remote add upstream https://github.com/original/mathlib.git
git remote add origin https://github.com/vous/mathlib.git
git checkout -b bugfix/fix-negative-numbers
git branch
git remote -v
\`\`\``,
        },
        {
          title: '3. Coder le fix et commiter proprement',
          instructions: `Corrigez le bug avec des Conventional Commits :

\`\`\`bash
echo 'function add(a, b) { return Number(a) + Number(b); }' > lib.js
echo 'function subtract(a, b) { return Number(a) - Number(b); }' >> lib.js
echo 'module.exports = { add, subtract };' >> lib.js

git add lib.js
git commit -m "fix(math): gérer les inputs non-numériques dans add()"

echo 'const { add } = require("./lib");' > test.js
echo 'console.assert(add(1, 2) === 3);' >> test.js
git add test.js
git commit -m "test(math): ajouter les tests pour add() avec strings"
\`\`\``,
        },
        {
          title: '4. Préparer la Pull Request',
          instructions: `Vérifiez votre travail et poussez :

\`\`\`bash
git log --oneline
git status
git push -u origin bugfix/fix-negative-numbers
git log --oneline --all --graph
\`\`\``,
        },
        {
          title: '5. Après le merge : nettoyer',
          instructions: `Une fois la PR mergée, nettoyez votre dépôt :

\`\`\`bash
git checkout main
git pull upstream main
git branch -d bugfix/fix-negative-numbers
git tag -a v1.2.1 -m "Patch: fix negative numbers"
git log --oneline --all
git tag
\`\`\``,
        },
      ],
      skills: ['git init/clone', 'branches', 'commits conventionnels', 'remotes', 'tags', 'workflow PR'],
      links: [
        { label: "Guide : contribuer à l'open-source", url: 'https://docs.github.com/fr/get-started/exploring-projects-on-github/contributing-to-a-project' },
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
    color: '#3FA7D6',
    gradient: 'from-[#3FA7D6]/15 to-[#3FA7D6]/5',
    borderColor: 'border-[#3FA7D6]/25',
    features: ['Éditeur YAML', '14 exercices pipeline', 'Multi-plateforme'],
    moduleIdRange: [100, 199],
    capstone: {
      title: '🏆 Projet final : Pipeline de production full-stack',
      scenario: `Vous êtes le lead DevOps d'une startup. L'application est un site e-commerce React + API Node.js. Vous devez mettre en place le pipeline CI/CD complet, du push au déploiement.`,
      tasks: [
        {
          title: '1. Pipeline de tests multi-services',
          instructions: `\`\`\`yaml
name: Full-Stack CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
jobs:
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run lint && npm test
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm test
\`\`\``,
        },
        {
          title: '2. Build Docker multi-images',
          instructions: `\`\`\`yaml
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
          push: true
          tags: ghcr.io/startup/app:\${{ github.sha }}
\`\`\``,
        },
        {
          title: '3. Déploiement staging automatique',
          instructions: `\`\`\`yaml
  deploy-staging:
    needs: build-images
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.monshop.com
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to staging..."
\`\`\``,
        },
        {
          title: '4. Déploiement production protégé',
          instructions: `\`\`\`yaml
  deploy-production:
    needs: build-images
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://monshop.com
    runs-on: ubuntu-latest
    steps:
      - run: echo "🚀 Deploying to production..."
\`\`\``,
        },
        {
          title: '5. Notifications et monitoring',
          instructions: `\`\`\`yaml
  notify-failure:
    needs: [test-frontend, test-backend, build-images]
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - run: echo "❌ Pipeline failed — \${{ github.sha }}"
\`\`\``,
        },
      ],
      skills: ['GitHub Actions', 'Docker build', 'environments', 'conditions', 'secrets', 'notifications'],
      links: [
        { label: 'GitHub Actions — Deploying', url: 'https://docs.github.com/en/actions/deployment' },
        { label: 'Docker Build Push Action', url: 'https://github.com/docker/build-push-action' },
      ],
    },
  },
  {
    id: 'docker',
    slug: '/docker',
    icon: '🐳',
    title: 'Maîtriser Docker',
    subtitle: 'Conteneurs & Déploiement',
    desc: 'Du premier conteneur aux stacks de production, en tout petits pas. Progression douce avec code fourni clé en main.',
    tags: ['devops', 'dev'],
    color: '#AA7DCE',
    gradient: 'from-[#AA7DCE]/15 to-[#AA7DCE]/5',
    borderColor: 'border-[#AA7DCE]/25',
    features: ['Progression très douce', '38 exercices progressifs', 'Code fourni clé en main'],
    moduleIdRange: [200, 299],
    capstone: {
      title: '🏆 Projet final : Conteneuriser et livrer une app full-stack',
      scenario: `Vous êtes l'ingénieur DevOps d'une jeune entreprise. L'équipe a développé une app full-stack (React + Node + PostgreSQL) mais tout tourne "à la main".

**Objectif** : conteneuriser, orchestrer avec Compose, durcir pour la production, et automatiser la publication.`,
      tasks: [
        {
          title: '1. Dockerfile multi-stage pour le front',
          instructions: `\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\``,
        },
        {
          title: "2. Dockerfile durci pour l'API",
          instructions: `\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
USER node
EXPOSE 5000
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:5000/health || exit 1
CMD ["node", "server.js"]
\`\`\``,
        },
        {
          title: '3. Orchestration avec Compose',
          instructions: `\`\`\`yaml
services:
  client:
    build: ./client
    ports: ["80:80"]
    depends_on: [api]
  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/app
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
volumes:
  pgdata:
\`\`\``,
        },
        {
          title: '4. Réglages de production',
          instructions: `\`\`\`yaml
  api:
    restart: unless-stopped
    deploy:
      resources:
        limits: { cpus: "1.0", memory: 512M }
    logging:
      driver: json-file
      options: { max-size: "10m", max-file: "3" }
\`\`\``,
        },
        {
          title: '5. Pipeline de publication automatique',
          instructions: `\`\`\`yaml
name: Deliver
on:
  push:
    branches: [main]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions: { contents: read, packages: write }
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: ./api
          push: true
          tags: ghcr.io/\${{ github.repository }}-api:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\``,
        },
      ],
      skills: ['Dockerfile multi-stage', 'images non-root', 'docker compose', 'volumes & réseaux', 'healthchecks', 'build & push CI'],
      links: [
        { label: 'Docker — Get Started', url: 'https://docs.docker.com/get-started/' },
        { label: 'Awesome Compose', url: 'https://github.com/docker/awesome-compose' },
      ],
    },
  },
  {
    id: 'ml',
    slug: '/ml',
    icon: '🤖',
    title: 'Machine Learning',
    subtitle: 'De zéro à praticien',
    desc: 'Classification, régression, clustering. Comprendre les algorithmes, choisir les bonnes métriques et construire tes premiers modèles avec scikit-learn.',
    tags: ['mlops', 'ia'],
    color: '#F3752B',
    gradient: 'from-[#F3752B]/15 to-[#F3752B]/5',
    borderColor: 'border-[#F3752B]/25',
    features: ['Code Python fourni', '18 modules de 0 à Expert', 'MLOps & déploiement inclus'],
    moduleIdRange: [300, 399],
    capstone: {
      title: '🏆 Projet final : Pipeline ML complet de A à Z',
      scenario: `Tu es recruté comme junior data scientist dans une fintech. Ta première mission : construire un modèle de détection de fraude bancaire, l'évaluer correctement, et présenter tes résultats au responsable risque.`,
      tasks: [
        {
          title: '1. Exploration et préparation des données',
          instructions: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.datasets import make_classification

# Simuler un dataset de fraude (très déséquilibré : 2% de fraudes)
X, y = make_classification(
    n_samples=10000, n_features=20, n_informative=10,
    weights=[0.98, 0.02], random_state=42
)
df = pd.DataFrame(X, columns=[f'feature_{i}' for i in range(20)])
df['fraude'] = y

print(df['fraude'].value_counts())
print(f"Taux de fraude : {y.mean():.2%}")
\`\`\``,
        },
        {
          title: '2. Baseline et comparaison de modèles',
          instructions: `\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

X_train, X_test, y_train, y_test = train_test_split(
    df.drop('fraude', axis=1), df['fraude'],
    test_size=0.2, random_state=42, stratify=df['fraude']
)

for nom, clf in [
    ("Logistic Regression", LogisticRegression(max_iter=1000)),
    ("Random Forest", RandomForestClassifier(n_estimators=100, random_state=42)),
]:
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    y_proba = clf.predict_proba(X_test)[:, 1]
    print(f"\\n=== {nom} ===")
    print(classification_report(y_test, y_pred))
    print(f"AUC : {roc_auc_score(y_test, y_proba):.3f}")
\`\`\``,
        },
        {
          title: '3. Gérer le déséquilibre des classes',
          instructions: `\`\`\`python
from sklearn.ensemble import RandomForestClassifier

# class_weight='balanced' : donne plus de poids aux fraudes (rares)
rf_balanced = RandomForestClassifier(
    n_estimators=100, class_weight='balanced', random_state=42
)
rf_balanced.fit(X_train, y_train)
y_pred_b = rf_balanced.predict(X_test)
y_proba_b = rf_balanced.predict_proba(X_test)[:, 1]

print("=== Random Forest (équilibré) ===")
print(classification_report(y_test, y_pred_b))
print(f"AUC : {roc_auc_score(y_test, y_proba_b):.3f}")
\`\`\``,
        },
        {
          title: '4. Optimiser le seuil de décision',
          instructions: `\`\`\`python
import matplotlib.pyplot as plt
from sklearn.metrics import precision_recall_curve

precision, recall, thresholds = precision_recall_curve(y_test, y_proba_b)

plt.figure(figsize=(10, 5))
plt.plot(thresholds, precision[:-1], label='Precision', color='#3FA7D6')
plt.plot(thresholds, recall[:-1], label='Recall', color='#F3752B')
plt.xlabel('Seuil de décision')
plt.ylabel('Score')
plt.title('Optimisation du seuil — Fraude bancaire')
plt.legend()
plt.axvline(x=0.3, color='gray', linestyle='--', label='Seuil retenu=0.3')
plt.tight_layout()
plt.show()

# Appliquer le seuil optimisé
seuil_optimal = 0.3
y_pred_final = (y_proba_b >= seuil_optimal).astype(int)
print(classification_report(y_test, y_pred_final))
\`\`\``,
        },
        {
          title: '5. Présenter les résultats au responsable risque',
          instructions: `\`\`\`python
from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_test, y_pred_final)
TN, FP, FN, TP = cm.ravel()

montant_moyen_fraude = 1500  # €
cout_fausse_alarme = 20      # € (coût investigation)

fraudes_evitees = TP * montant_moyen_fraude
cout_fa = FP * cout_fausse_alarme
fraudes_ratees = FN * montant_moyen_fraude

print("=== Rapport pour le responsable risque ===")
print(f"Fraudes détectées  : {TP} ({TP/(TP+FN):.0%} du total)")
print(f"Fraudes ratées     : {FN} ({FN/(TP+FN):.0%} du total)")
print(f"Fausses alarmes    : {FP}")
print(f"")
print(f"Économies réalisées : {fraudes_evitees:,.0f} €")
print(f"Coût des FA         : {cout_fa:,.0f} €")
print(f"Pertes sur ratés    : {fraudes_ratees:,.0f} €")
print(f"Bénéfice net estimé : {fraudes_evitees - cout_fa - fraudes_ratees:,.0f} €")
\`\`\``,
        },
      ],
      skills: ['EDA', 'train/test split', 'classification', 'métriques', 'déséquilibre de classes', 'seuil de décision', 'présentation résultats'],
      links: [
        { label: 'scikit-learn — User Guide', url: 'https://scikit-learn.org/stable/user_guide.html' },
        { label: 'Kaggle — Credit Card Fraud Dataset', url: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud' },
      ],
    },
  },
  {
    id: 'devops',
    slug: '/devops',
    icon: '⚙️',
    title: 'DevOps / MLOps / LLMOps',
    subtitle: 'De Linux à l\'IA en production',
    desc: 'Linux → Docker → Kubernetes → Terraform → GitOps → DevSecOps → MLOps (MLflow, Prefect, BentoML) → LLMOps (vLLM, RAG, LangGraph). Fil rouge : industrialiser une startup SaaS avec IA embarquée.',
    tags: ['devops', 'mlops', 'llmops'],
    color: '#3FA7D6',
    gradient: 'from-[#3FA7D6]/15 to-[#3FA7D6]/5',
    borderColor: 'border-[#3FA7D6]/25',
    features: ['15 modules Linux → LLMOps', 'Fil rouge startup MonitAI', 'MLOps + LLMOps inclus'],
    moduleIdRange: [501, 599],
    capstone: {
      title: '🏆 Projet final : Plateforme DevOps + AI complète',
      scenario: `Tu es le lead DevOps/MLOps de MonitAI. La startup a maintenant un cluster EKS en production, un pipeline MLOps pour la détection d'anomalies, et un assistant RAG basé sur Mistral-7B. Tu dois mettre en place le dernier pilier : l'observabilité complète de toute la stack (infra + ML + LLM) et un agent SRE autonome.`,
      tasks: [
        {
          title: '1. Stack d\'observabilité unifiée',
          instructions: `\`\`\`bash
# Prometheus + Grafana (infra) — déjà en place
# LangFuse (LLM) — ajouter au cluster
helm upgrade --install langfuse langfuse/langfuse \\
  --namespace ai --create-namespace \\
  --set database.url="postgresql://..."

# Dashboard unifié : métriques infra + métriques LLM dans Grafana
# Panel 1 : CPU/Mem cluster (PromQL)
# Panel 2 : Latence RAG p95 (LangFuse API → Grafana datasource)
# Panel 3 : Coût LLM / jour (tokens × prix)
# Panel 4 : Taux cache hit sémantique
\`\`\``,
        },
        {
          title: '2. Pipeline CI/CD complet de la stack',
          instructions: `\`\`\`yaml
# .github/workflows/full-pipeline.yml
name: Full Stack Pipeline
on:
  push:
    branches: [main]

jobs:
  security:
    uses: ./.github/workflows/security.yml  # Gitleaks + Trivy
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - run: pytest tests/ --cov
  release:
    needs: [security, test]
    uses: ./.github/workflows/release.yml   # semantic-release
  deploy:
    needs: release
    # ArgoCD sync automatique depuis le tag semver
    # Image Updater détecte le nouveau tag → commit infra-k8s → sync
\`\`\``,
        },
        {
          title: '3. Agent SRE autonome (LangGraph)',
          instructions: `\`\`\`python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class SREAgentState(TypedDict):
    alert: dict         # alertmanager webhook payload
    analysis: str       # analyse de l'alerte
    runbook: str        # runbook récupéré via RAG
    remediation: str    # commande de remédiation proposée
    executed: bool      # a-t-on exécuté la remédiation ?

# 4 nœuds : analyze → retrieve_runbook → propose → (human_approval) → execute
# L'agent s'arrête si l'action est destructive et attend une approbation humaine
\`\`\``,
        },
        {
          title: '4. Cost Management LLM',
          instructions: `\`\`\`python
# Budget par feature + semantic cache + routing intelligent
from gptcache import cache

cache.init(...)  # cache sémantique
# Questions similaires → 0 appel LLM → économies 40%

# Routing : questions simples → Mistral-7B local (0$)
#           questions complexes → GPT-4o (5$/1M tokens)
def smart_router(query: str) -> str:
    complexity = classify_complexity(query)
    return "local" if complexity in ["simple", "medium"] else "gpt4o"
\`\`\``,
        },
        {
          title: '5. Documentation et runbooks as code',
          instructions: `\`\`\`markdown
# runbooks/high-cpu-alert.md
## Alerte : CPU > 90% pendant 10 minutes

### Causes possibles
1. Pic de trafic légitime → scaler
2. Boucle infinie dans l'app → redémarrer
3. Attaque DDoS → rate limit + WAF

### Remédiation automatique
\`\`\`bash
kubectl scale deployment api --replicas=$(( $(kubectl get deployment api -o jsonpath='{.spec.replicas}') + 2 ))
\`\`\`

### Escalade
Si non résolu après 15 min → alerter l'astreinte via PagerDuty
\`\`\`

\`\`\`python
# Indexer tous les runbooks dans pgvector pour le RAG
loader = DirectoryLoader("runbooks/", glob="**/*.md")
\`\`\``,
        },
      ],
      skills: ['EKS', 'ArgoCD', 'Prometheus', 'LangFuse', 'LangGraph', 'vLLM', 'RAG', 'semantic cache', 'DevSecOps'],
      links: [
        { label: 'LangFuse — self-hosted', url: 'https://langfuse.com/docs/deployment/self-host' },
        { label: 'LangGraph — documentation', url: 'https://langchain-ai.github.io/langgraph/' },
        { label: 'ArgoCD — documentation', url: 'https://argo-cd.readthedocs.io/' },
      ],
    },
  },
  {
    id: 'dl',
    slug: '/dl',
    icon: '🧠',
    title: 'Deep Learning',
    subtitle: 'Réseaux de neurones',
    desc: 'MLP, CNN, LSTM, Transformers, HuggingFace, YOLO, GANs et déploiement. Fil rouge médical : radiology AI de A à Z.',
    tags: ['mlops', 'ia'],
    color: '#59CD90',
    gradient: 'from-[#59CD90]/15 to-[#59CD90]/5',
    borderColor: 'border-[#59CD90]/25',
    features: ['Code PyTorch & Keras fourni', '15 modules de 0 à Expert', 'Fil rouge radiology AI'],
    moduleIdRange: [401, 499],
    capstone: {
      title: '🏆 Projet final : Radiology AI — pipeline complet',
      scenario: `Tu es lead MLE dans une startup de santé numérique. Le prototype de classification de chest X-ray est validé par l'équipe médicale. Tu dois maintenant livrer un système complet : modèle optimisé, API de production, suivi des expériences et pipeline MLOps reproductible.`,
      tasks: [
        {
          title: '1. Fine-tuning EfficientNetB0 avec W&B',
          instructions: `\`\`\`python
import wandb, tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0

wandb.init(project='radiology-capstone', name='efficientnet-final')

base = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(224,224,3))
base.trainable = False

# Build model, train phase 1 (feature extraction)
# Log toutes les métriques avec wandb.log(...)
\`\`\``,
        },
        {
          title: '2. Export ONNX et benchmark de latence',
          instructions: `\`\`\`python
import tf2onnx, onnxruntime as ort, numpy as np, time

# Export ONNX
model = tf.keras.models.load_model('best_model.keras')
# tf2onnx.convert.from_keras(model, ...)

# Benchmark : mesurer latence fp32 vs int8
session = ort.InferenceSession('model.onnx')
dummy   = np.random.randn(1, 224, 224, 3).astype(np.float32)
times   = []
for _ in range(200):
    t0 = time.perf_counter()
    session.run(None, {'image': dummy})
    times.append(time.perf_counter() - t0)
print(f"Latence moyenne : {np.mean(times)*1000:.1f} ms")
\`\`\``,
        },
        {
          title: '3. API FastAPI + Docker',
          instructions: `\`\`\`python
# main.py
from fastapi import FastAPI, File, UploadFile
import onnxruntime as ort, numpy as np
from PIL import Image
import io

app    = FastAPI(title="Radiology AI API v1.0")
sess   = ort.InferenceSession("model.onnx")
LABELS = ['Normal', 'Pneumonie bactérienne', 'Pneumonie virale']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await file.read())).resize((224,224)).convert('RGB')
    x   = np.array(img, dtype=np.float32)[np.newaxis] / 255.0
    out = sess.run(None, {'image': x})[0]
    return {"label": LABELS[out.argmax()], "confidence": float(out.max())}
\`\`\``,
        },
        {
          title: '4. Sweep d\'hyperparamètres W&B (20 trials)',
          instructions: `\`\`\`python
import wandb

sweep_config = {
    'method': 'bayes',
    'metric': {'name': 'val/auc', 'goal': 'maximize'},
    'parameters': {
        'lr':           {'distribution': 'log_uniform_values', 'min': 1e-5, 'max': 1e-3},
        'batch_size':   {'values': [16, 32, 64]},
        'dropout':      {'distribution': 'uniform', 'min': 0.1, 'max': 0.5},
        'fine_tune_n':  {'values': [0, 20, 50]},
    }
}
sweep_id = wandb.sweep(sweep_config, project='radiology-capstone')
# wandb.agent(sweep_id, function=train, count=20)
\`\`\``,
        },
        {
          title: '5. Versionner avec DVC et enregistrer dans W&B Registry',
          instructions: `\`\`\`bash
# DVC
dvc init
dvc add data/chest_xray/
git add data/chest_xray.dvc .dvcignore
git commit -m "feat: track chest X-ray dataset v1"
dvc push

# W&B Model Registry
\`\`\`

\`\`\`python
import wandb
with wandb.init(project='radiology-capstone') as run:
    artifact = wandb.Artifact('radiology-classifier', type='model',
                               metadata={'val_auc': 0.97, 'arch': 'efficientnet_b0'})
    artifact.add_file('model.onnx')
    run.log_artifact(artifact)
\`\`\``,
        },
      ],
      skills: ['Transfer Learning', 'ONNX export', 'FastAPI', 'Docker', 'W&B Sweeps', 'DVC', 'Model Registry'],
      links: [
        { label: 'W&B — documentation', url: 'https://docs.wandb.ai/' },
        { label: 'ONNX Runtime — documentation', url: 'https://onnxruntime.ai/' },
        { label: 'DVC — documentation', url: 'https://dvc.org/doc' },
      ],
    },
  },
];

export default TRACKS;
