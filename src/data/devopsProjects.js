/**
 * Mini-projets métier — Parcours DevOps / MLOps / LLMOps
 * Clé = moduleId (501–515)
 *
 * Fil rouge : une startup SaaS française (MonitAI) qui passe de
 * "scripts à la main" à une plateforme industrialisée avec IA embarquée.
 *
 * 501 → automatiser le déploiement avec Bash
 * 502 → conteneuriser l'app
 * 503 → orchestrer sur K8s local (kind/minikube)
 * 504 → Helm chart + RBAC de l'app
 * 505 → provisionner l'infra avec Terraform
 * 506 → monitoring Prometheus + Grafana
 * 507 → GitOps avec ArgoCD
 * 508 → pipeline DevSecOps avec Trivy + Gitleaks
 * 509 → semantic release + canary deployment
 * 510 → EKS sur AWS avec Terraform
 * 511 → pipeline ML avec MLflow + Prefect
 * 512 → serving BentoML + data drift Evidently
 * 513 → déployer Mistral-7B avec vLLM sur K8s
 * 514 → RAG sur la documentation interne
 * 515 → observabilité LLM + multi-agents
 */

const DEVOPS_PROJECTS = {

  // ── 501 — Linux & Shell ───────────────────────────────────────────────
  501: [
    {
      title: 'Script de déploiement automatisé pour une API Flask',
      sector: '🚀 DevOps / Automatisation',
      context:
        'MonitAI, une startup qui développe une API de monitoring, déploie encore ses releases à la main via SSH. Ton rôle : écrire un script Bash robuste qui automatise le déploiement (pull, build, restart, healthcheck).',
      objective:
        'Écris un script deploy.sh qui : 1) vérifie que les dépendances sont installées, 2) pull la dernière version Git, 3) installe les dépendances Python, 4) redémarre le service systemd, 5) attend que le /health réponde 200, 6) rollback automatiquement si échec. Gère les erreurs avec set -euo pipefail et trap.',
      dataset: {
        label: 'Aucun dataset — exercice de scripting Bash',
        url: 'https://www.shellcheck.net/',
      },
      skills: ['bash', 'set -euo pipefail', 'trap', 'systemctl', 'curl healthcheck', 'rollback'],
      connectedFrom: null,
      connectedTo: 'Conteneuriser l\'API (Module 2)',
      starter: `\`\`\`bash
#!/usr/bin/env bash
# deploy.sh — Déploiement automatisé MonitAI API
set -euo pipefail

APP_DIR="/opt/monitai-api"
SERVICE="monitai-api"
HEALTH_URL="http://localhost:8000/health"
MAX_RETRIES=10
GIT_BRANCH="\${1:-main}"

# --- Fonctions utilitaires ---
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
die() { log "❌ ERREUR : $*" >&2; exit 1; }

check_deps() {
  for cmd in git pip systemctl curl; do
    command -v "$cmd" >/dev/null 2>&1 || die "Dépendance manquante : $cmd"
  done
}

wait_healthy() {
  local retries=0
  until curl -sf "$HEALTH_URL" >/dev/null 2>&1; do
    ((retries++))
    [ $retries -ge $MAX_RETRIES ] && return 1
    log "⏳ Attente du service... ($retries/$MAX_RETRIES)"
    sleep 3
  done
  return 0
}

# TODO : implémenter rollback(), la logique git pull, pip install, systemctl restart
\`\`\``,
    },
  ],

  // ── 502 — Docker avancé ───────────────────────────────────────────────
  502: [
    {
      title: 'Conteneuriser et sécuriser l\'API MonitAI',
      sector: '🐳 DevOps / Conteneurisation',
      context:
        'Le script de déploiement fonctionne, mais l\'équipe veut conteneuriser l\'API pour garantir la reproductibilité entre les environnements dev/staging/production. Tu dois créer une image Docker optimisée et sécurisée.',
      objective:
        'Crée un Dockerfile multi-stage pour une API FastAPI Python. Image finale < 150 MB, utilisateur non-root, healthcheck intégré. Écris un docker-compose.yml avec l\'API + PostgreSQL + Redis. Scanner l\'image avec Trivy et corriger les CVE critiques. Comparer la taille avant/après optimisation.',
      dataset: {
        label: 'Aucun dataset — exercice Docker',
        url: 'https://aquasecurity.github.io/trivy/',
      },
      skills: ['multi-stage build', 'non-root user', 'HEALTHCHECK', 'docker-compose', 'Trivy scan'],
      connectedFrom: 'Script Bash (Module 1)',
      connectedTo: 'Déployer sur Kubernetes (Module 3)',
      starter: `\`\`\`dockerfile
# TODO: Dockerfile multi-stage
# Stage 1 : builder — installer les dépendances
# Stage 2 : runtime — image minimale non-root

FROM python:3.11-alpine AS builder
# ...

FROM python:3.11-alpine AS runtime
# Créer un utilisateur non-root
RUN addgroup -g 1001 app && adduser -u 1001 -G app -D app
USER app
# ...
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8000/health || exit 1
\`\`\`

\`\`\`bash
# Après le build :
trivy image monitai-api:latest --severity HIGH,CRITICAL
docker images monitai-api  # comparer la taille
\`\`\``,
    },
  ],

  // ── 503 — Kubernetes fondamentaux ─────────────────────────────────────
  503: [
    {
      title: 'Déployer MonitAI sur Kubernetes (kind/minikube)',
      sector: '☸️ DevOps / Orchestration',
      context:
        'L\'image Docker est prête. Il faut maintenant déployer l\'app sur un cluster Kubernetes local, avec un Deployment de 3 replicas, un Service ClusterIP, un Ingress, des probes de santé et un HPA.',
      objective:
        'Installe kind ou minikube. Écris les manifests : Namespace, Deployment (3 replicas, readiness + liveness probes, resources limits), Service, Ingress (nginx), HPA (scale 2–10 sur CPU 70%). Démontre le rolling update sans downtime en changeant la version de l\'image.',
      dataset: {
        label: 'Aucun dataset — exercice Kubernetes',
        url: 'https://kubernetes.io/docs/home/',
      },
      skills: ['Deployment', 'Service', 'Ingress', 'HPA', 'readinessProbe', 'rolling update'],
      connectedFrom: 'Docker (Module 2)',
      connectedTo: 'Helm + RBAC (Module 4)',
      starter: `\`\`\`bash
# Créer le cluster local
kind create cluster --name monitai --config kind-config.yaml
# ou : minikube start --cpus 4 --memory 8g

kubectl apply -f namespace.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Vérifier
kubectl get pods -n monitai -w
kubectl describe pod -n monitai
\`\`\`

\`\`\`yaml
# deployment.yaml (à compléter)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monitai-api
  namespace: monitai
spec:
  replicas: 3
  # TODO : selector, template, containers, resources, probes
\`\`\``,
    },
  ],

  // ── 504 — Kubernetes avancé ───────────────────────────────────────────
  504: [
    {
      title: 'Packager MonitAI avec un Helm chart',
      sector: '☸️ DevOps / Packaging',
      context:
        'Les 5 fichiers YAML se multiplient et sont difficiles à maintenir entre staging et production. Tu dois créer un Helm chart réutilisable avec des values différentes selon l\'environnement.',
      objective:
        'Crée un Helm chart complet pour MonitAI (Deployment, Service, Ingress, HPA, ServiceAccount, RBAC). Fais un values-staging.yaml (1 replica, ingress.host=staging.monitai.io) et values-prod.yaml (3 replicas, ingress.host=monitai.io). Déploie les deux releases avec helm upgrade --install. Documente chaque paramètre.',
      dataset: {
        label: 'Aucun dataset — exercice Helm',
        url: 'https://helm.sh/docs/',
      },
      skills: ['helm create', 'values.yaml', 'templates', 'helm upgrade --install', 'helm lint', 'RBAC'],
      connectedFrom: 'Kubernetes (Module 3)',
      connectedTo: 'Terraform infra (Module 5)',
      starter: `\`\`\`bash
helm create monitai
# Adapter les templates générés...

helm lint ./monitai
helm template monitai ./monitai -f values-staging.yaml

helm upgrade --install monitai-staging ./monitai \\
  -f values-staging.yaml \\
  --namespace staging \\
  --create-namespace

helm upgrade --install monitai-prod ./monitai \\
  -f values-prod.yaml \\
  --namespace production \\
  --create-namespace
\`\`\``,
    },
  ],

  // ── 505 — Terraform ───────────────────────────────────────────────────
  505: [
    {
      title: 'Provisionner l\'infrastructure cloud avec Terraform',
      sector: '☁️ Cloud / Infrastructure as Code',
      context:
        'MonitAI veut migrer vers AWS. Tu dois provisionner toute l\'infrastructure (VPC, subnets, ECS ou EC2, RDS PostgreSQL, S3, IAM) avec Terraform — rien à la main, tout dans le code.',
      objective:
        'Utilise les modules terraform-aws-modules pour créer : VPC 3 AZs, RDS PostgreSQL t3.micro (staging) / t3.medium (prod), S3 bucket chiffré, IAM role pour l\'app. Configure le remote state sur S3 + DynamoDB lock. Utilise des workspaces pour staging et production. Atteins un terraform plan propre (0 erreur, 0 warning).',
      dataset: {
        label: 'Terraform Registry — modules AWS officiels',
        url: 'https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/',
      },
      skills: ['terraform init/plan/apply', 'remote state S3', 'workspaces', 'modules', 'variables', 'outputs'],
      connectedFrom: 'Helm K8s (Module 4)',
      connectedTo: 'Monitoring (Module 6)',
      starter: `\`\`\`hcl
# versions.tf
terraform {
  required_version = ">= 1.7"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket = "monitai-tfstate-XXXX"   # Remplacer par un nom unique
    key    = "infra/terraform.tfstate"
    region = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt = true
  }
}

provider "aws" { region = "eu-west-1" }

# TODO : module vpc, module rds, module s3, iam_role
\`\`\``,
    },
  ],

  // ── 506 — Monitoring ──────────────────────────────────────────────────
  506: [
    {
      title: 'Stack Prometheus + Grafana pour MonitAI',
      sector: '📊 Observabilité',
      context:
        'L\'API est en production mais l\'équipe est aveugle : aucune métrique, aucune alerte, aucun dashboard. Tu dois mettre en place la stack d\'observabilité complète.',
      objective:
        'Déploie Prometheus + Grafana avec le kube-prometheus-stack (Helm). Instrumente l\'API FastAPI avec prometheus-client (métriques custom : latence, taux d\'erreur, nombre de prédictions). Crée un dashboard Grafana avec les 4 golden signals (latency, traffic, errors, saturation). Configure une alerte AlertManager qui envoie sur Slack si error rate > 5%.',
      dataset: {
        label: 'kube-prometheus-stack — ArtifactHub',
        url: 'https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack',
      },
      skills: ['prometheus-client', 'Counter', 'Histogram', 'Grafana dashboards', 'PromQL', 'AlertManager'],
      connectedFrom: 'Terraform AWS (Module 5)',
      connectedTo: 'GitOps ArgoCD (Module 7)',
      starter: `\`\`\`bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm upgrade --install kube-prom prometheus-community/kube-prometheus-stack \\
  --namespace monitoring --create-namespace \\
  --set grafana.adminPassword=admin123

kubectl port-forward -n monitoring svc/kube-prom-grafana 3000:80
\`\`\`

\`\`\`python
# Dans ton API FastAPI :
from prometheus_client import Counter, Histogram

PREDICTIONS = Counter('monitai_predictions_total', 'Total predictions', ['model', 'status'])
LATENCY     = Histogram('monitai_latency_seconds', 'Prediction latency', ['endpoint'])

# TODO : middleware pour logger automatiquement les métriques
\`\`\``,
    },
  ],

  // ── 507 — GitOps ArgoCD ───────────────────────────────────────────────
  507: [
    {
      title: 'Déploiements GitOps avec ArgoCD',
      sector: '🔄 GitOps / Déploiement',
      context:
        'Chaque déploiement nécessite encore un kubectl apply manuel. Tu dois mettre en place ArgoCD pour que toute modification dans le repo Git déclenche automatiquement un déploiement sur le cluster.',
      objective:
        'Installe ArgoCD sur le cluster. Crée un repo infra-k8s avec Kustomize (base + overlay staging/production). Configure deux Applications ArgoCD (staging et production) avec syncPolicy automated. Démontre qu\'un commit dans infra-k8s déclenche un rolling update automatique. Configure les sync waves pour les migrations DB avant l\'app.',
      dataset: {
        label: 'ArgoCD — documentation officielle',
        url: 'https://argo-cd.readthedocs.io/',
      },
      skills: ['ArgoCD', 'Kustomize', 'Application CR', 'syncPolicy automated', 'sync waves', 'GitOps'],
      connectedFrom: 'Monitoring (Module 6)',
      connectedTo: 'DevSecOps (Module 8)',
      starter: `\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Récupérer le mdp initial
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
\`\`\`

\`\`\`yaml
# Structure infra-k8s à créer :
# infra-k8s/apps/monitai-api/base/kustomization.yaml
# infra-k8s/apps/monitai-api/staging/kustomization.yaml  ← replicas: 1
# infra-k8s/apps/monitai-api/production/kustomization.yaml ← replicas: 3
\`\`\``,
    },
  ],

  // ── 508 — DevSecOps ───────────────────────────────────────────────────
  508: [
    {
      title: 'Pipeline DevSecOps complet avec GitHub Actions',
      sector: '🔒 Sécurité / DevSecOps',
      context:
        'Un audit de sécurité a révélé des secrets commités dans l\'historique Git et des CVE critiques dans les dépendances. Tu dois mettre en place un pipeline de sécurité automatique.',
      objective:
        'Crée un pipeline GitHub Actions avec 5 jobs : 1) Gitleaks (scan secrets dans tout l\'historique), 2) Semgrep SAST, 3) Snyk scan dépendances Python, 4) Trivy scan image Docker (fail sur CRITICAL), 5) OPA conftest sur les manifests K8s (interdire :latest, exiger resource limits). Le PR ne merge pas si un job échoue.',
      dataset: {
        label: 'Gitleaks — détection de secrets',
        url: 'https://github.com/gitleaks/gitleaks',
      },
      skills: ['GitHub Actions', 'Gitleaks', 'Semgrep', 'Trivy', 'OPA conftest', 'SARIF upload'],
      connectedFrom: 'GitOps (Module 7)',
      connectedTo: 'Semantic Release (Module 9)',
      starter: `\`\`\`yaml
# .github/workflows/security.yml
name: Security Pipeline
on: [push, pull_request]

jobs:
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      with: { fetch-depth: 0 }
    - uses: gitleaks/gitleaks-action@v2

  trivy-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - run: docker build -t test .
    - uses: aquasecurity/trivy-action@master
      with:
        image-ref: test
        severity: CRITICAL
        exit-code: 1
    # TODO : ajouter SAST, Snyk, OPA conftest
\`\`\``,
    },
  ],

  // ── 509 — CI/CD avancé ────────────────────────────────────────────────
  509: [
    {
      title: 'Semantic Release et déploiement canary',
      sector: '🚀 CI/CD / Release Engineering',
      context:
        'MonitAI veut automatiser complètement le cycle de release : versioning sémantique, CHANGELOG, image Docker taguée et déploiement progressif avec canary release à 10% puis 100%.',
      objective:
        'Configure semantic-release pour générer automatiquement les versions SemVer et le CHANGELOG à partir des Conventional Commits. Intègre Argo Rollouts pour un déploiement canary (10% → analyse métriques → 30% → 100% ou rollback). Configure une AnalysisTemplate qui rollback si success-rate < 99%.',
      dataset: {
        label: 'Argo Rollouts — documentation',
        url: 'https://argoproj.github.io/rollouts/',
      },
      skills: ['semantic-release', 'Conventional Commits', 'Argo Rollouts', 'canary', 'AnalysisTemplate', 'rollback auto'],
      connectedFrom: 'DevSecOps (Module 8)',
      connectedTo: 'EKS Terraform (Module 10)',
      starter: `\`\`\`json
// .releaserc.json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github"
  ]
}
\`\`\`

\`\`\`yaml
# rollout.yaml (à compléter)
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: monitai-api
spec:
  strategy:
    canary:
      steps:
      - setWeight: 10
      - pause: {}    # pause manuelle — observer les métriques
      # TODO : ajouter les étapes et l'AnalysisTemplate
\`\`\``,
    },
  ],

  // ── 510 — Cloud EKS ───────────────────────────────────────────────────
  510: [
    {
      title: 'Cluster EKS de production avec Terraform',
      sector: '☁️ Cloud / AWS',
      context:
        'MonitAI scale. Le cluster kind local ne suffit plus. Tu dois provisionner un cluster EKS production-ready sur AWS avec Terraform : multi-AZ, Spot instances pour les workloads batch, Karpenter pour l\'autoscaling, et Cluster Autoscaler.',
      objective:
        'Utilise le module terraform-aws-modules/eks pour créer un cluster EKS 1.29 avec 3 node groups (system on-demand, api on-demand, batch spot). Configure l\'ALB Ingress Controller, External DNS, Cluster Autoscaler et Karpenter. Migre l\'app depuis le cluster kind vers EKS. Compare les coûts Spot vs On-Demand.',
      dataset: {
        label: 'terraform-aws-modules/eks — GitHub',
        url: 'https://github.com/terraform-aws-modules/terraform-aws-eks',
      },
      skills: ['EKS', 'Karpenter', 'Spot instances', 'ALB Ingress', 'IRSA', 'Cluster Autoscaler', 'cost optimization'],
      connectedFrom: 'Semantic Release (Module 9)',
      connectedTo: 'MLOps Pipelines (Module 11)',
      starter: `\`\`\`hcl
# eks.tf
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "monitai-production"
  cluster_version = "1.29"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  # TODO : configurer les node groups (system, api, batch)
  # TODO : enable_irsa = true
  # TODO : cluster_addons (coredns, kube-proxy, vpc-cni, aws-ebs-csi-driver)
}
\`\`\``,
    },
  ],

  // ── 511 — MLOps Pipelines ─────────────────────────────────────────────
  511: [
    {
      title: 'Pipeline ML de détection d\'anomalie avec MLflow + Prefect',
      sector: '🤖 MLOps / Data Science',
      context:
        'MonitAI ajoute une feature IA : détecter les anomalies dans les métriques des serveurs clients. Tu dois industrialiser le pipeline ML : données → preprocessing → entraînement → évaluation → registre → ré-entraînement automatique mensuel.',
      objective:
        'Crée un pipeline Prefect complet avec 5 tâches (load, preprocess, train, evaluate, register). Logger tous les runs dans MLflow (params, métriques, modèle, confusion matrix). Configurer le Model Registry avec les stages (None → Staging → Production). Déployer le serveur MLflow sur le cluster K8s. Démontrer le ré-entraînement sur les 30 derniers jours.',
      dataset: {
        label: 'Server Metrics Anomaly Detection — Kaggle',
        url: 'https://www.kaggle.com/datasets/dracos/server-metric-dataset-for-anomaly-detection',
      },
      skills: ['MLflow', 'Prefect', 'IsolationForest', 'Model Registry', 'run tracking', 'experiment comparison'],
      connectedFrom: 'EKS AWS (Module 10)',
      connectedTo: 'BentoML Serving (Module 12)',
      starter: `\`\`\`python
from prefect import flow, task
import mlflow, pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

mlflow.set_tracking_uri("http://mlflow.monitai.svc.cluster.local:5000")
mlflow.set_experiment("anomaly-detection-v1")

@task(retries=3)
def load_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)

@task
def preprocess(df: pd.DataFrame):
    # TODO : feature engineering des métriques serveur
    pass

@task
def train_model(X_train, params: dict):
    with mlflow.start_run():
        mlflow.log_params(params)
        # TODO : entraîner IsolationForest, logger métriques, enregistrer modèle
        pass

@flow(name="anomaly-detection-training")
def training_pipeline(data_path: str = "s3://monitai/metrics/latest/"):
    df = load_data(data_path)
    # TODO : compléter le pipeline
\`\`\``,
    },
  ],

  // ── 512 — MLOps Serving ───────────────────────────────────────────────
  512: [
    {
      title: 'Servir le modèle d\'anomalie avec BentoML + alertes drift',
      sector: '🤖 MLOps / Serving',
      context:
        'Le modèle d\'anomalie est en prod depuis 3 mois. Les métriques des serveurs clients évoluent (nouveaux types de serveurs, charge différente). Tu dois monitorer le data drift et déclencher automatiquement un ré-entraînement si nécessaire.',
      objective:
        'Crée un service BentoML qui expose le modèle IsolationForest avec adaptive batching. Calcule chaque semaine le data drift (Evidently) entre les données d\'entraînement et les données de production. Si drift > 0.15 sur > 3 features → déclencher le pipeline Prefect de ré-entraînement + notifier Slack. Déploie sur K8s.',
      dataset: {
        label: 'Server Metrics — mêmes données du Module 11',
        url: 'https://www.kaggle.com/datasets/dracos/server-metric-dataset-for-anomaly-detection',
      },
      skills: ['BentoML', 'adaptive batching', 'Evidently', 'data drift', 'Prefect trigger', 'Slack webhook'],
      connectedFrom: 'MLflow Prefect (Module 11)',
      connectedTo: 'Déployer un LLM (Module 13)',
      starter: `\`\`\`python
import bentoml
import numpy as np
from bentoml.io import NumpyNdarray, JSON
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset

runner = bentoml.sklearn.get("anomaly-detector:latest").to_runner()
svc    = bentoml.Service("anomaly-detection-api", runners=[runner])

@svc.api(input=NumpyNdarray(), output=JSON())
async def predict(metrics: np.ndarray) -> dict:
    scores  = await runner.score_samples.async_run(metrics)
    is_anomaly = scores < -0.1   # threshold IsolationForest
    return {
        "anomaly_flags": is_anomaly.tolist(),
        "anomaly_scores": scores.tolist(),
    }

# TODO : ajouter le job de monitoring drift hebdomadaire avec Prefect
\`\`\``,
    },
  ],

  // ── 513 — LLMOps Déploiement ──────────────────────────────────────────
  513: [
    {
      title: 'Déployer Mistral-7B avec vLLM sur EKS GPU',
      sector: '🦙 LLMOps / Inference',
      context:
        'MonitAI veut ajouter un assistant IA pour aider les équipes ops à interpréter les alertes. Les données clients sont confidentielles → on ne peut pas utiliser OpenAI. Tu dois déployer Mistral-7B en interne sur un nœud GPU AWS.',
      objective:
        'Déploie vLLM avec Mistral-7B-Instruct-v0.2 sur un nœud GPU (g5.xlarge, 1× A10G). Crée un Deployment K8s avec ressource nvidia.com/gpu:1, PVC de 20 GB pour le cache HuggingFace, ConfigMap pour les paramètres vLLM. Mesure la latence (TTFB, tokens/s) avec wrk ou locust. Compare les coûts avec l\'API OpenAI sur 1M tokens.',
      dataset: {
        label: 'Mistral-7B-Instruct-v0.2 — HuggingFace',
        url: 'https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2',
      },
      skills: ['vLLM', 'Kubernetes GPU', 'nvidia.com/gpu', 'PVC model cache', 'TTFB benchmark', 'cost comparison'],
      connectedFrom: 'BentoML serving (Module 12)',
      connectedTo: 'RAG documentation (Module 14)',
      starter: `\`\`\`yaml
# vllm-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm-mistral
  namespace: ai
spec:
  replicas: 1
  template:
    spec:
      containers:
      - name: vllm
        image: vllm/vllm-openai:latest
        args:
        - "--model"
        - "mistralai/Mistral-7B-Instruct-v0.2"
        - "--dtype"
        - "bfloat16"
        # TODO : ajouter resources (nvidia.com/gpu: 1), volumeMounts, env HF_TOKEN
      # TODO : nodeSelector pour nœud GPU, tolerations
\`\`\`

\`\`\`python
# Test avec l'API compatible OpenAI
from openai import OpenAI
client = OpenAI(api_key="EMPTY", base_url="http://vllm-service/v1")
response = client.chat.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    messages=[{"role": "user", "content": "Analyse cette alerte : CPU 95% pendant 10 min"}]
)
print(response.choices[0].message.content)
\`\`\``,
    },
  ],

  // ── 514 — LLMOps RAG ─────────────────────────────────────────────────
  514: [
    {
      title: 'RAG sur la documentation technique de MonitAI',
      sector: '🔗 LLMOps / RAG',
      context:
        'L\'équipe passe 2h/jour à chercher dans la documentation (Confluence, runbooks, post-mortems). Tu dois créer un assistant RAG qui répond aux questions ops en s\'appuyant sur la doc interne.',
      objective:
        'Construis un pipeline RAG complet : charger les PDF/Markdown de la doc, chunker (512 tokens, overlap 64), créer les embeddings avec nomic-embed-text, stocker dans pgvector (PostgreSQL), récupérer les top-5 chunks avec MMR, générer la réponse avec Mistral-7B (Module 13). Évalue avec RAGAs (answer_relevancy > 0.85, faithfulness > 0.80). Expose via FastAPI avec streaming.',
      dataset: {
        label: 'Kubernetes documentation — github.com/kubernetes/website',
        url: 'https://github.com/kubernetes/website/tree/main/content/en/docs',
      },
      skills: ['LangChain', 'pgvector', 'nomic-embed-text', 'MMR retrieval', 'RAGAs', 'streaming', 'FastAPI'],
      connectedFrom: 'vLLM Mistral (Module 13)',
      connectedTo: 'Observabilité LLM (Module 15)',
      starter: `\`\`\`python
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import PGVector
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI  # pointe vers vLLM

# 1. Charger la documentation
loader = DirectoryLoader("docs/", glob="**/*.md")
docs   = loader.load()

# 2. Chunker
splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=64)
chunks   = splitter.split_documents(docs)

# 3. Embeddings + pgvector
embeddings = HuggingFaceEmbeddings(model_name="nomic-ai/nomic-embed-text-v1",
                                    model_kwargs={"trust_remote_code": True})

CONNECTION = "postgresql://user:pass@postgres:5432/monitai_rag"
vectordb = PGVector.from_documents(chunks, embeddings, connection_string=CONNECTION)

# 4. RAG Chain
llm      = ChatOpenAI(api_key="EMPTY", base_url="http://vllm-service/v1",
                       model="mistralai/Mistral-7B-Instruct-v0.2")
retriever = vectordb.as_retriever(search_type="mmr", search_kwargs={"k": 5})
rag_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

# TODO : évaluation RAGAs, endpoint FastAPI streaming
\`\`\``,
    },
  ],

  // ── 515 — LLMOps Observabilité ────────────────────────────────────────
  515: [
    {
      title: 'Observabilité LLM et assistant multi-agents pour le SRE',
      sector: '🏆 LLMOps / Production',
      context:
        'Le RAG est en prod depuis 2 semaines. L\'équipe constate des réponses lentes (> 8s) et parfois hors-sujet. Tu dois mettre en place l\'observabilité complète avec LangFuse, optimiser les coûts et construire un agent multi-étapes capable d\'analyser une alerte, récupérer le runbook associé, et proposer une remédiation.',
      objective:
        'Intègre LangFuse pour tracer chaque requête RAG (latence par étape, coût en tokens, scores de qualité). Configure des alertes si latence p95 > 5s ou faithfulness < 0.7. Implémente un semantic cache (GPTCache) pour réduire les appels LLM de 40%. Construit un agent LangGraph en 3 noeuds : analyse_alerte → récupère_runbook → propose_remediation. Déploie le tout sur K8s.',
      dataset: {
        label: 'LangFuse — self-hosted (Docker Compose)',
        url: 'https://langfuse.com/docs/deployment/self-host',
      },
      skills: ['LangFuse', 'tracing', 'semantic cache', 'LangGraph', 'multi-agents', 'cost optimization', 'prompt versioning'],
      connectedFrom: 'RAG documentation (Module 14)',
      connectedTo: null,
      starter: `\`\`\`python
from langfuse.decorators import observe, langfuse_context
from langfuse import Langfuse
from langgraph.graph import StateGraph, END
from typing import TypedDict

langfuse = Langfuse(
    public_key="pk-lf-xxx",
    secret_key="sk-lf-xxx",
    host="http://langfuse.monitai.svc.cluster.local:3000",
)

# Agent multi-étapes
class SREState(TypedDict):
    alert: str
    runbook: str
    remediation: str

@observe(name="analyze-alert")
def analyze_alert(state: SREState) -> SREState:
    # TODO : analyser l'alerte avec Mistral, identifier le type de problème
    pass

@observe(name="fetch-runbook")
def fetch_runbook(state: SREState) -> SREState:
    # TODO : récupérer le runbook pertinent via RAG (Module 14)
    pass

@observe(name="propose-remediation")
def propose_remediation(state: SREState) -> SREState:
    # TODO : générer la remédiation à partir de l'alerte + runbook
    pass

workflow = StateGraph(SREState)
workflow.add_node("analyze",    analyze_alert)
workflow.add_node("fetch",      fetch_runbook)
workflow.add_node("remediate",  propose_remediation)
workflow.set_entry_point("analyze")
workflow.add_edge("analyze",   "fetch")
workflow.add_edge("fetch",     "remediate")
workflow.add_edge("remediate", END)

sre_agent = workflow.compile()
\`\`\``,
    },
  ],
};

export default DEVOPS_PROJECTS;
