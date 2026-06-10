/**
 * Parcours DevOps / MLOps / LLMOps — 15 modules de Débutant à Expert.
 * IDs : 501–515
 * Progression : Linux → Docker → Kubernetes → Terraform → Cloud →
 *               CI/CD avancé → Monitoring → GitOps → DevSecOps →
 *               MLOps pipelines → MLOps serving → LLMOps déploiement → LLMOps RAG prod
 */

const DEVOPS_MODULES = [

  // ── 501 ────────────────────────────────────────────────────────────────
  {
    id: 501, level: 'Débutant', icon: '🐧', color: 'green', colorHex: '#59CD90',
    title: 'Linux & Shell scripting',
    desc: "Les fondamentaux Linux indispensables au DevOps : navigation, permissions, processus, scripting Bash et automatisation.",
    lessons: [
      {
        title: 'Linux pour le DevOps',
        content: `## Linux — Le système d'exploitation du DevOps

95% des serveurs en production tournent sous Linux. Maîtriser le terminal est **non-négociable** pour tout ingénieur DevOps.

### Navigation et manipulation de fichiers

\`\`\`bash
# Navigation
pwd           # Où suis-je ?
ls -lah       # Lister (long + hidden + taille humaine)
cd /var/log   # Aller dans /var/log
cd ~          # Retour au home
cd -          # Répertoire précédent

# Manipulation
mkdir -p infra/terraform/modules  # Créer arborescence complète
cp -r src/ dst/                   # Copier récursivement
mv old.txt new.txt                # Déplacer / renommer
rm -rf dossier/                   # Supprimer récursivement
find /etc -name "*.conf" -type f  # Chercher des fichiers
\`\`\`

### Permissions Unix

\`\`\`bash
# Lire les permissions
ls -la fichier
# -rwxr-xr--  1 alice devops  4096 Jan 1 10:00 deploy.sh
#  ↑↑↑↑↑↑↑↑↑
#  |rwx  = owner (alice) : read+write+execute
#  |r-x  = group (devops): read+execute
#  |r--  = others        : read only

# Modifier les permissions
chmod 755 deploy.sh     # rwxr-xr-x
chmod +x deploy.sh      # ajouter exécution pour tous
chmod 600 ~/.ssh/id_rsa # clé privée SSH : owner only

# Modifier le propriétaire
chown alice:devops deploy.sh
chown -R www-data:www-data /var/www/

# sudo — exécuter en root
sudo apt update
sudo systemctl restart nginx
\`\`\`

### Processus et services

\`\`\`bash
# Voir les processus
ps aux | grep nginx
top              # monitoring temps réel
htop             # version améliorée (apt install htop)

# Gérer les services (systemd)
systemctl status nginx
systemctl start/stop/restart nginx
systemctl enable nginx   # démarrage automatique
journalctl -u nginx -f   # logs du service en temps réel

# Tuer un processus
kill -9 <PID>
pkill nginx
\`\`\`

### Réseau de base

\`\`\`bash
# Diagnostics réseau
ip a                    # interfaces réseau
ss -tlnp                # ports ouverts (remplace netstat)
curl -I https://api.example.com   # tester une API
wget -q -O - https://example.com  # télécharger
nc -zv 192.168.1.1 443            # tester connectivité port

# SSH
ssh user@server -p 2222
ssh -i ~/.ssh/id_rsa user@server
ssh -L 8080:localhost:80 user@server  # tunnel SSH
\`\`\``,
        links: [
          { label: 'The Linux Command Line (William Shotts — gratuit en ligne)', url: 'https://linuxcommand.org/tlcl.php' },
          { label: 'OverTheWire — Bandit (wargame Linux débutant)', url: 'https://overthewire.org/wargames/bandit/' },
        ],
      },
      {
        title: 'Bash scripting pour l\'automatisation',
        content: `## Bash scripting — Automatiser les tâches répétitives

### Structure d'un script Bash

\`\`\`bash
#!/usr/bin/env bash
# deploy.sh — Script de déploiement
set -euo pipefail   # e=exit on error, u=undefined vars, o=pipe error

# Variables
APP_NAME="myapp"
ENV=\${1:-staging}     # premier argument, défaut "staging"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/deploy_\${TIMESTAMP}.log"

echo "🚀 Deploying \${APP_NAME} to \${ENV}..."
\`\`\`

### Conditions et boucles

\`\`\`bash
# Condition
if [ "\$ENV" == "production" ]; then
    echo "⚠️ Production deploy — confirmer ?"
    read -r confirm
    [ "\$confirm" != "yes" ] && exit 1
fi

# Tester l'existence d'un fichier
if [ ! -f ".env.\${ENV}" ]; then
    echo "❌ Fichier .env.\${ENV} introuvable" >&2
    exit 1
fi

# Boucle sur des serveurs
SERVERS=("web-01" "web-02" "web-03")
for server in "\${SERVERS[@]}"; do
    echo "Deploying to \$server..."
    ssh "deploy@\$server" "cd /app && git pull && systemctl restart app"
done

# Boucle while avec timeout
RETRIES=0
until curl -sf http://localhost:8080/health; do
    ((RETRIES++))
    [ \$RETRIES -ge 10 ] && { echo "Timeout!" >&2; exit 1; }
    sleep 5
done
echo "✅ Service is healthy"
\`\`\`

### Fonctions et gestion d'erreurs

\`\`\`bash
# Fonction
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] \$*" | tee -a "\$LOG_FILE"
}

die() {
    log "❌ ERROR: \$*" >&2
    exit 1
}

check_deps() {
    for cmd in docker kubectl helm; do
        command -v "\$cmd" >/dev/null 2>&1 || die "\$cmd non installé"
    done
}

# Trap — nettoyer en cas d'erreur
cleanup() {
    log "Cleaning up temporary files..."
    rm -f /tmp/deploy_\$\$.tmp
}
trap cleanup EXIT  # s'exécute toujours, même en cas d'erreur

# Script complet
check_deps
log "Starting deployment..."
docker build -t "\${APP_NAME}:\${TIMESTAMP}" . || die "Docker build failed"
docker push "\${APP_NAME}:\${TIMESTAMP}"       || die "Docker push failed"
log "✅ Deployment successful"
\`\`\`

### Outils texte incontournables

\`\`\`bash
# grep — filtrer
grep -r "ERROR" /var/log/*.log
grep -E "^(GET|POST) /api" access.log

# sed — substituer
sed -i 's/version: 1.0/version: 2.0/g' chart.yaml

# awk — traiter des colonnes
awk '{print \$1, \$9}' access.log | sort | uniq -c | sort -rn | head -20
# → top 20 IPs avec leur code HTTP

# jq — manipuler du JSON
curl -s https://api.github.com/repos/user/repo | jq '.stargazers_count'
docker inspect container_id | jq '.[0].NetworkSettings.IPAddress'

# xargs — passer des arguments en pipe
docker ps -aq | xargs docker rm -f  # supprimer tous les containers
\`\`\``,
        links: [
          { label: 'Bash scripting guide (Bash Academy)', url: 'https://guide.bash.academy/' },
          { label: 'ShellCheck — linter Bash en ligne', url: 'https://www.shellcheck.net/' },
        ],
      },
    ],
  },

  // ── 502 ────────────────────────────────────────────────────────────────
  {
    id: 502, level: 'Débutant', icon: '🐳', color: 'green', colorHex: '#59CD90',
    title: 'Docker avancé en production',
    desc: "Au-delà de docker run : images optimisées multi-stage, Docker Compose prod, réseaux, volumes et sécurité des conteneurs.",
    lessons: [
      {
        title: 'Images Docker optimisées',
        content: `## Construire des images Docker de production

### Multi-stage builds — La clé de la légèreté

\`\`\`dockerfile
# ❌ Image naïve — 900 MB
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]

# ✅ Multi-stage — 120 MB
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copier seulement le nécessaire
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/dist         ./dist
COPY --from=builder /app/package.json .

# Sécurité : utilisateur non-root
RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -s /bin/sh -D appuser
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
\`\`\`

### .dockerignore — Ne pas copier l'inutile

\`\`\`
node_modules
.git
.env*
*.log
dist
coverage
.nyc_output
Dockerfile*
docker-compose*
README.md
\`\`\`

### BuildKit et layer caching

\`\`\`bash
# Activer BuildKit (cache monté, secrets, parallélisme)
export DOCKER_BUILDKIT=1

# Cache de dépendances (monté, pas dans l'image)
FROM node:20-alpine
RUN --mount=type=cache,target=/root/.npm \\
    npm ci --prefer-offline

# Passer des secrets sans les stocker dans l'image
RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc \\
    npm install @private-scope/package
# docker build --secret id=npmrc,src=.npmrc .

# Analyser la taille des layers
docker history --human --format "{{.Size}}\t{{.CreatedBy}}" myapp:latest
docker image inspect myapp:latest | jq '.[0].Size' | numfmt --to=iec
\`\`\`

### Bonnes pratiques de sécurité

\`\`\`bash
# Scanner les vulnérabilités
docker scout cves myapp:latest         # Docker Scout (intégré)
trivy image myapp:latest               # Trivy (open source)

# Lister les processus dans un container (doit être non-root)
docker exec container_id ps aux

# Content trust — vérifier les signatures
export DOCKER_CONTENT_TRUST=1
docker pull nginx:alpine  # refusera les images non signées
\`\`\``,
        links: [
          { label: 'Docker — Best practices for Dockerfiles', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/' },
          { label: 'Trivy — container scanner', url: 'https://aquasecurity.github.io/trivy/' },
        ],
      },
      {
        title: 'Docker Compose production & réseaux',
        content: `## Docker Compose pour les environnements complexes

### Compose avec override — dev vs prod

\`\`\`yaml
# docker-compose.yml — base commune
services:
  api:
    build: ./api
    environment:
      - NODE_ENV=\${NODE_ENV:-development}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB:       \${POSTGRES_DB}
      POSTGRES_USER:     \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER}"]
      interval: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes

volumes:
  pgdata:
\`\`\`

\`\`\`yaml
# docker-compose.prod.yml — override production
services:
  api:
    image: ghcr.io/monorg/api:1.2.3    # image fixée, pas de build
    restart: unless-stopped
    deploy:
      resources:
        limits:   { cpus: "2.0", memory: 1G }
        reservations: { cpus: "0.5", memory: 256M }
    logging:
      driver: "json-file"
      options: { max-size: "10m", max-file: "5" }

  db:
    volumes:
      - /mnt/data/postgres:/var/lib/postgresql/data   # volume host en prod
\`\`\`

\`\`\`bash
# Lancer en production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Mise à jour sans downtime (rolling update)
docker compose pull api
docker compose up -d --no-deps api
\`\`\`

### Réseaux Docker

\`\`\`yaml
# Réseau isolé par service
services:
  nginx:
    networks: [frontend, backend]
  api:
    networks: [backend, db_net]
  db:
    networks: [db_net]  # Uniquement accessible par l'API

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true   # Pas d'accès internet
  db_net:
    driver: bridge
    internal: true
\`\`\`

\`\`\`bash
# Inspecter un réseau
docker network ls
docker network inspect backend
docker exec container_id curl http://api:3000/health  # DNS automatique
\`\`\``,
        links: [
          { label: 'Docker Compose — documentation officielle', url: 'https://docs.docker.com/compose/' },
          { label: 'Awesome Compose — exemples', url: 'https://github.com/docker/awesome-compose' },
        ],
      },
    ],
  },

  // ── 503 ────────────────────────────────────────────────────────────────
  {
    id: 503, level: 'Débutant', icon: '☸️', color: 'green', colorHex: '#59CD90',
    title: 'Kubernetes fondamentaux',
    desc: "Pods, Deployments, Services, ConfigMaps, Secrets — comprendre l'orchestration de conteneurs avec Kubernetes.",
    lessons: [
      {
        title: 'Les objets Kubernetes essentiels',
        content: `## Kubernetes — L'orchestrateur de conteneurs

### Pourquoi Kubernetes ?

Docker Compose → parfait pour un seul serveur.
Kubernetes → pour les déploiements sur plusieurs nœuds avec :
- **Auto-healing** : redémarrer les pods qui crashent
- **Rolling updates** : mettre à jour sans downtime
- **Auto-scaling** : ajuster selon la charge
- **Load balancing** : répartir le trafic

### Architecture simplifiée

\`\`\`
Control Plane :
  API Server  → point d'entrée de toutes les commandes
  etcd        → base de données distribuée (état du cluster)
  Scheduler   → assigne les pods aux nœuds
  Controller  → maintient l'état désiré

Worker Nodes :
  kubelet     → agent sur chaque nœud
  kube-proxy  → gestion du réseau
  Container Runtime (containerd)
\`\`\`

### kubectl — L'outil de base

\`\`\`bash
# Configurer kubectl (kubeconfig)
export KUBECONFIG=~/.kube/config
kubectl config get-contexts
kubectl config use-context mon-cluster

# Explorer le cluster
kubectl get nodes
kubectl get all -n default
kubectl describe pod <nom-du-pod>
kubectl logs <pod> -f --previous   # logs en temps réel, container précédent
kubectl exec -it <pod> -- bash     # shell interactif

# Appliquer des manifests
kubectl apply -f deployment.yaml
kubectl apply -f k8s/               # dossier entier
kubectl delete -f deployment.yaml
kubectl diff -f deployment.yaml     # voir ce qui va changer avant apply
\`\`\`

### Pod et Deployment

\`\`\`yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: production
  labels:
    app: api
    version: "1.2.3"
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge:       1   # +1 pod pendant la mise à jour
      maxUnavailable: 0   # 0 pod indisponible → zero downtime
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: ghcr.io/monorg/api:1.2.3
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: database-url
        resources:
          requests: { cpu: "100m", memory: "128Mi" }
          limits:   { cpu: "500m", memory: "512Mi" }
        readinessProbe:
          httpGet: { path: /health, port: 3000 }
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet: { path: /health, port: 3000 }
          initialDelaySeconds: 15
          periodSeconds: 20
\`\`\`

### Service — Exposer un Deployment

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api          # sélectionne tous les pods avec label app=api
  ports:
  - port: 80          # port du service
    targetPort: 3000  # port du container
  type: ClusterIP     # interne uniquement (default)
---
# Ingress — exposer vers l'extérieur
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: api.monapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port: { number: 80 }
\`\`\``,
        links: [
          { label: 'Kubernetes — documentation officielle', url: 'https://kubernetes.io/docs/home/' },
          { label: 'Play with Kubernetes (terminal gratuit)', url: 'https://labs.play-with-k8s.com/' },
        ],
      },
      {
        title: 'ConfigMaps, Secrets et Auto-scaling',
        content: `## Configurer et scaler des applications Kubernetes

### ConfigMaps et Secrets

\`\`\`yaml
# ConfigMap — configuration non-sensible
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"
  config.yaml: |        # fichier monté
    server:
      port: 3000
      timeout: 30s
\`\`\`

\`\`\`bash
# Créer un Secret (encodé en base64 automatiquement)
kubectl create secret generic api-secrets \\
  --from-literal=database-url="postgres://user:pass@db:5432/prod" \\
  --from-literal=jwt-secret="$(openssl rand -base64 32)" \\
  --from-file=tls.crt=./cert.pem \\
  --from-file=tls.key=./key.pem

# En production → utiliser Sealed Secrets ou External Secrets Operator
# (éviter de committer des secrets en clair dans Git)
\`\`\`

\`\`\`yaml
# Utiliser ConfigMap et Secret dans un Pod
spec:
  containers:
  - name: api
    envFrom:
    - configMapRef:  { name: api-config }    # toutes les clés comme env vars
    env:
    - name: DATABASE_URL
      valueFrom:
        secretKeyRef: { name: api-secrets, key: database-url }
    volumeMounts:
    - name: config-vol
      mountPath: /app/config
      readOnly: true
  volumes:
  - name: config-vol
    configMap:
      name: api-config
      items:
      - key: config.yaml
        path: config.yaml
\`\`\`

### Horizontal Pod Autoscaler (HPA)

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70    # scaler si CPU > 70%
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
\`\`\`

\`\`\`bash
# Surveiller le scaling
kubectl get hpa -w
kubectl top pods
kubectl top nodes

# Test de charge pour voir le scaling
kubectl run -it --rm load-gen \\
  --image=busybox \\
  -- /bin/sh -c "while true; do wget -q -O- http://api-service/api; done"
\`\`\``,
        links: [
          { label: 'Kubernetes — HPA documentation', url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/' },
          { label: 'k9s — interface terminal pour Kubernetes', url: 'https://k9scli.io/' },
        ],
      },
    ],
  },

  // ── 504 ────────────────────────────────────────────────────────────────
  {
    id: 504, level: 'Intermédiaire', icon: '⛵', color: 'blue', colorHex: '#3FA7D6',
    title: 'Kubernetes avancé — Helm & RBAC',
    desc: "Helm charts pour packager des applications, RBAC pour la sécurité, Persistent Volumes, StatefulSets et CRDs.",
    lessons: [
      {
        title: 'Helm — Le package manager Kubernetes',
        content: `## Helm — Packager et déployer des applications Kubernetes

### Pourquoi Helm ?

Gérer 20 manifests YAML manuellement → erreur, pas de versionning, pas de réutilisabilité.

Helm = **package manager pour Kubernetes** — comme npm pour Node.js.

\`\`\`
Chart = template Helm (= package npm)
Release = instance déployée d'un chart
Repository = catalogue de charts (= npm registry)
\`\`\`

### Utiliser des charts existants

\`\`\`bash
# Ajouter des repositories
helm repo add stable       https://charts.helm.sh/stable
helm repo add bitnami      https://charts.bitnami.com/bitnami
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Chercher un chart
helm search repo postgres
helm show values bitnami/postgresql  # voir toutes les options

# Installer un chart
helm install mon-postgres bitnami/postgresql \\
  --namespace databases \\
  --create-namespace \\
  --set auth.postgresPassword=secret123 \\
  --set primary.persistence.size=50Gi

# Lister les releases
helm list -A  # toutes les namespaces

# Mettre à jour
helm upgrade mon-postgres bitnami/postgresql \\
  --reuse-values \\
  --set primary.persistence.size=100Gi

# Rollback
helm rollback mon-postgres 1  # revenir à la révision 1
\`\`\`

### Créer son propre chart

\`\`\`bash
helm create mon-api
# Crée :
# mon-api/
#   Chart.yaml          ← metadata
#   values.yaml         ← valeurs par défaut
#   templates/          ← templates YAML
#     deployment.yaml
#     service.yaml
#     ingress.yaml
#     _helpers.tpl       ← fonctions réutilisables
\`\`\`

\`\`\`yaml
# values.yaml
replicaCount: 2
image:
  repository: ghcr.io/monorg/api
  tag: "1.2.3"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  host: api.monapp.com

resources:
  limits:   { cpu: 500m, memory: 512Mi }
  requests: { cpu: 100m, memory: 128Mi }

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
\`\`\`

\`\`\`yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mon-api.fullname" . }}
  labels: {{ include "mon-api.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        resources: {{ toYaml .Values.resources | nindent 12 }}
\`\`\`

\`\`\`bash
# Tester sans déployer
helm template mon-api ./mon-api -f values-prod.yaml
helm lint ./mon-api

# Déployer
helm upgrade --install mon-api ./mon-api \\
  -f values-prod.yaml \\
  --namespace production \\
  --atomic             # rollback automatique si échec
\`\`\``,
        links: [
          { label: 'Helm — documentation officielle', url: 'https://helm.sh/docs/' },
          { label: 'ArtifactHub — catalogue de charts', url: 'https://artifacthub.io/' },
        ],
      },
      {
        title: 'RBAC, PV/PVC et StatefulSets',
        content: `## RBAC — Contrôle d'accès dans Kubernetes

### Principes

\`\`\`
ServiceAccount  → identité d'un Pod ou d'un utilisateur
Role / ClusterRole → liste de permissions (verbs sur resources)
RoleBinding / ClusterRoleBinding → associe Account ↔ Role
\`\`\`

\`\`\`yaml
# Service Account pour l'application
apiVersion: v1
kind: ServiceAccount
metadata:
  name: api-sa
  namespace: production
---
# Role — permissions dans un seul namespace
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: api-role
  namespace: production
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]      # lecture seule
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "patch"]  # peut patcher ses propres déploiements
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: api-binding
  namespace: production
subjects:
- kind: ServiceAccount
  name: api-sa
  namespace: production
roleRef:
  kind: Role
  name: api-role
  apiGroup: rbac.authorization.k8s.io
\`\`\`

### Persistent Volumes pour les applications stateful

\`\`\`yaml
# PersistentVolumeClaim — demande de stockage
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes: [ReadWriteOnce]
  storageClassName: standard      # dépend du cloud provider
  resources:
    requests: { storage: 50Gi }
\`\`\`

### StatefulSet — Pour les bases de données

\`\`\`yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres   # requis pour le DNS stable
  replicas: 1
  template:
    spec:
      containers:
      - name: postgres
        image: postgres:16
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef: { name: pg-secret, key: password }
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:   # PVC créé automatiquement par pod
  - metadata: { name: data }
    spec:
      accessModes: [ReadWriteOnce]
      resources:
        requests: { storage: 50Gi }
\`\`\`

\`\`\`bash
# Vérifier les RBAC
kubectl auth can-i list pods --as system:serviceaccount:production:api-sa
kubectl auth can-i delete pods --as system:serviceaccount:production:api-sa

# Analyser les permissions avec kubectl-who-can
kubectl-who-can delete pods -n production
\`\`\``,
        links: [
          { label: 'Kubernetes — RBAC documentation', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/' },
          { label: 'k9s — gestion du cluster en TUI', url: 'https://k9scli.io/' },
        ],
      },
    ],
  },

  // ── 505 ────────────────────────────────────────────────────────────────
  {
    id: 505, level: 'Intermédiaire', icon: '🏗️', color: 'blue', colorHex: '#3FA7D6',
    title: 'Infrastructure as Code — Terraform',
    desc: "Provisionner et gérer l'infrastructure cloud avec Terraform : providers, modules, state, workspaces et bonnes pratiques.",
    lessons: [
      {
        title: 'Terraform — Les fondamentaux',
        content: `## Terraform — Infrastructure as Code

### Pourquoi l'IaC ?

Sans IaC → infrastructure créée à la main → non-reproductible, difficile à auditer, risque d'erreur humaine.

Avec Terraform → infrastructure décrite en code → **versionnable, reproductible, testable**.

\`\`\`bash
# Installation
brew install terraform   # macOS
# ou
wget https://releases.hashicorp.com/terraform/1.7.0/terraform_1.7.0_linux_amd64.zip
unzip terraform_1.7.0_linux_amd64.zip && mv terraform /usr/local/bin/
terraform version
\`\`\`

### Structure d'un projet Terraform

\`\`\`
infra/
  main.tf          ← ressources principales
  variables.tf     ← déclaration des variables
  outputs.tf       ← valeurs exposées en sortie
  versions.tf      ← versions des providers
  terraform.tfvars ← valeurs des variables (ne pas committer si secrets)
  modules/
    vpc/
    eks/
    rds/
\`\`\`

### Exemple — Déployer un VPC sur AWS

\`\`\`hcl
# versions.tf
terraform {
  required_version = ">= 1.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  # Backend remote (state partagé en équipe)
  backend "s3" {
    bucket         = "mon-org-tfstate"
    key            = "prod/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = { Project = var.project_name, ManagedBy = "terraform" }
  }
}
\`\`\`

\`\`\`hcl
# variables.tf
variable "aws_region"    { default = "eu-west-1" }
variable "project_name"  { default = "monapp" }
variable "environment"   {
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Environment must be staging or production"
  }
}

# main.tf
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "\${var.project_name}-\${var.environment}-vpc" }
}

resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet("10.0.0.0/16", 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = { Name = "\${var.project_name}-public-\${count.index}" }
}

# outputs.tf
output "vpc_id"     { value = aws_vpc.main.id }
output "subnet_ids" { value = aws_subnet.public[*].id }
\`\`\`

### Workflow Terraform

\`\`\`bash
terraform init      # télécharger les providers
terraform fmt       # formater le code
terraform validate  # valider la syntaxe
terraform plan      # voir ce qui va changer (LIRE ATTENTIVEMENT)
terraform apply     # appliquer les changements
terraform destroy   # détruire l'infrastructure
\`\`\``,
        links: [
          { label: 'Terraform — documentation officielle', url: 'https://developer.hashicorp.com/terraform/docs' },
          { label: 'Terraform Registry — modules communautaires', url: 'https://registry.terraform.io/' },
        ],
      },
      {
        title: 'Modules Terraform et gestion du state',
        content: `## Modules et State Terraform

### Créer et utiliser des modules

\`\`\`hcl
# modules/eks_cluster/main.tf
variable "cluster_name"    {}
variable "node_group_size" { default = 3 }
variable "vpc_id"          {}
variable "subnet_ids"      { type = list(string) }

resource "aws_eks_cluster" "this" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  vpc_config {
    subnet_ids = var.subnet_ids
  }
}

output "cluster_endpoint" { value = aws_eks_cluster.this.endpoint }
output "cluster_name"     { value = aws_eks_cluster.this.name }
\`\`\`

\`\`\`hcl
# main.tf — utiliser le module
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"
  name    = "\${var.project}-\${var.env}-vpc"
  cidr    = "10.0.0.0/16"
  azs     = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  enable_nat_gateway = true
}

module "eks" {
  source         = "./modules/eks_cluster"
  cluster_name   = "\${var.project}-\${var.env}"
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.private_subnets
}
\`\`\`

### Gestion du State

\`\`\`bash
# Lister les ressources dans le state
terraform state list

# Voir le détail d'une ressource
terraform state show aws_vpc.main

# Importer une ressource existante dans le state
terraform import aws_vpc.main vpc-0a1b2c3d4e

# Déplacer une ressource dans le state (après refactoring)
terraform state mv aws_instance.web module.ec2.aws_instance.web

# Supprimer du state sans détruire la ressource
terraform state rm aws_s3_bucket.logs
\`\`\`

### Workspaces — Gérer staging et production

\`\`\`bash
# Créer des workspaces par environnement
terraform workspace new staging
terraform workspace new production

# Switcher
terraform workspace select production

# Dans le code — utiliser le workspace
locals {
  env_config = {
    staging    = { instance_type = "t3.micro",  replicas = 1 }
    production = { instance_type = "t3.medium", replicas = 3 }
  }
  config = local.env_config[terraform.workspace]
}

resource "aws_instance" "api" {
  instance_type = local.config.instance_type
  count         = local.config.replicas
}
\`\`\`

### Sécuriser les secrets avec Vault ou AWS SSM

\`\`\`hcl
# Récupérer un secret depuis AWS SSM Parameter Store
data "aws_ssm_parameter" "db_password" {
  name            = "/\${var.project}/\${var.env}/db_password"
  with_decryption = true
}

resource "aws_db_instance" "postgres" {
  password = data.aws_ssm_parameter.db_password.value
  # Ne jamais hardcoder dans terraform.tfvars !
}
\`\`\``,
        links: [
          { label: 'Terraform — State management', url: 'https://developer.hashicorp.com/terraform/language/state' },
          { label: 'tflint — linter Terraform', url: 'https://github.com/terraform-linters/tflint' },
        ],
      },
    ],
  },

  // ── 506 ────────────────────────────────────────────────────────────────
  {
    id: 506, level: 'Intermédiaire', icon: '📡', color: 'blue', colorHex: '#3FA7D6',
    title: 'Monitoring & Observabilité',
    desc: "Les 3 piliers de l'observabilité : métriques (Prometheus + Grafana), logs (Loki) et traces (Jaeger/Tempo).",
    lessons: [
      {
        title: 'Prometheus & Grafana',
        content: `## Les 3 piliers de l'observabilité

\`\`\`
Métriques  → QUOI va mal (CPU 95%, latence p99 > 500ms)  → Prometheus + Grafana
Logs       → POURQUOI ça va mal (stack traces, erreurs)   → Loki + Grafana
Traces     → OÙ ça ralentit (quelle requête, quel service) → Jaeger / Tempo
\`\`\`

### Prometheus — Collecte des métriques

Prometheus **scrape** (tire) les métriques des services via HTTP.

\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: 'true'

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'api'
    static_configs:
      - targets: ['api:3000']
    metrics_path: /metrics
\`\`\`

### Exposer des métriques depuis ton app

\`\`\`python
# pip install prometheus-client
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time

# Définir les métriques
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status_code']
)
REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint'],
    buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 5.0]
)
DB_CONNECTIONS = Gauge('db_connections_active', 'Active DB connections')

# Utiliser dans le code
@app.middleware("http")
async def metrics_middleware(request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start

    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.url.path,
        status_code=response.status_code
    ).inc()
    REQUEST_LATENCY.labels(
        method=request.method,
        endpoint=request.url.path
    ).observe(duration)

    return response

start_http_server(9090)  # expose /metrics sur le port 9090
\`\`\`

### PromQL — Requêter les métriques

\`\`\`promql
# Taux de requêtes par seconde (dernières 5 minutes)
rate(http_requests_total[5m])

# Latence p99
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Taux d'erreur (status 5xx)
sum(rate(http_requests_total{status_code=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m]))

# CPU par pod
sum(rate(container_cpu_usage_seconds_total{namespace="production"}[5m])) by (pod)

# Alertes
groups:
  - name: api_alerts
    rules:
    - alert: HighErrorRate
      expr: |
        rate(http_requests_total{status_code=~"5.."}[5m])
        / rate(http_requests_total[5m]) > 0.05
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "Taux d'erreur > 5% depuis 5 minutes"
\`\`\``,
        links: [
          { label: 'Prometheus — documentation', url: 'https://prometheus.io/docs/' },
          { label: 'Grafana — getting started', url: 'https://grafana.com/docs/grafana/latest/getting-started/' },
        ],
      },
      {
        title: 'Loki, alerting et SLOs',
        content: `## Logs avec Loki et SLOs

### Loki — Logs agrégés sans indexation lourde

Loki est conçu pour fonctionner avec Grafana. Contrairement à ElasticSearch, il **n'indexe que les labels** (pas le contenu) → moins cher.

\`\`\`yaml
# docker-compose pour stack Grafana + Loki + Promtail
services:
  grafana:
    image: grafana/grafana:latest
    ports: ["3000:3000"]
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin

  loki:
    image: grafana/loki:latest
    ports: ["3100:3100"]
    command: -config.file=/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    command: -config.file=/etc/promtail/config.yml
\`\`\`

### LogQL — Requêter les logs Loki

\`\`\`logql
# Filtrer les logs d'erreur de l'API en production
{namespace="production", app="api"} |= "ERROR"

# Parser les logs JSON
{app="api"} | json | level="error" | line_format "{{.message}}"

# Taux de logs d'erreur par minute
rate({app="api"} |= "ERROR" [1m])

# Top 10 des messages d'erreur
topk(10, sum by (message) (
  count_over_time({app="api"} | json | level="error" [1h])
))
\`\`\`

### SLOs — Service Level Objectives

\`\`\`
SLA = contrat (engagement externe) : "99.9% de disponibilité"
SLO = objectif interne : "99.95% des requêtes avec latence < 200ms"
SLI = indicateur = la métrique réelle (taux de succès mesuré)
Error Budget = 1 - SLO = ce qu'on peut "dépenser" en incidents

SLO 99.9% → Error Budget = 0.1% = 43.8 min/mois
SLO 99.99% → Error Budget = 0.01% = 4.38 min/mois
\`\`\`

\`\`\`yaml
# Règle Prometheus pour calculer l'Error Budget
record: slo:api_availability:ratio_rate5m
expr: |
  sum(rate(http_requests_total{status_code!~"5.."}[5m]))
  / sum(rate(http_requests_total[5m]))

# Alerte budget épuisé à 50%
alert: ErrorBudgetBurnRateHigh
expr: slo:api_availability:ratio_rate5m < 0.999
for: 2m
annotations:
  summary: "SLO breach — error budget burning at {{ $value | humanizePercentage }}"
\`\`\``,
        links: [
          { label: 'Grafana Loki — documentation', url: 'https://grafana.com/docs/loki/latest/' },
          { label: 'Google SRE Book — SLOs (gratuit)', url: 'https://sre.google/sre-book/service-level-objectives/' },
        ],
      },
    ],
  },

  // ── 507 ────────────────────────────────────────────────────────────────
  {
    id: 507, level: 'Intermédiaire', icon: '🔄', color: 'blue', colorHex: '#3FA7D6',
    title: 'GitOps avec ArgoCD',
    desc: "Déploiements déclaratifs et automatiques avec ArgoCD : ApplicationSets, sync waves, rollbacks et image updater.",
    lessons: [
      {
        title: 'GitOps — Les principes et ArgoCD',
        content: `## GitOps — Git comme source de vérité

### Principes GitOps

\`\`\`
1. Déclaratif    : l'état désiré est décrit dans Git (YAML)
2. Versionné     : tout changement = commit = historique, rollback possible
3. Pull-based    : le cluster TIRE les changements depuis Git (pas de push)
4. Réconciliation : l'opérateur vérifie et corrige en permanence
\`\`\`

**Avantage vs CI/CD push-based** : le cluster n'a jamais besoin de credentials externes. Le secret ne quitte pas le cluster.

### Installer ArgoCD

\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Accéder à l'UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Mot de passe initial
kubectl -n argocd get secret argocd-initial-admin-secret \\
  -o jsonpath="{.data.password}" | base64 -d && echo

# CLI
argocd login localhost:8080
argocd app list
\`\`\`

### Créer une Application ArgoCD

\`\`\`yaml
# application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mon-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/monorg/infra-k8s
    targetRevision: main
    path: apps/mon-api/production       # dossier dans le repo Git
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true       # supprimer les ressources supprimées de Git
      selfHeal: true    # corriger les dérives manuelles
    syncOptions:
    - CreateNamespace=true
    retry:
      limit: 3
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
\`\`\`

### Structure du repo infra-k8s

\`\`\`
infra-k8s/
  apps/
    mon-api/
      base/               ← Kustomize base
        deployment.yaml
        service.yaml
        kustomization.yaml
      staging/
        kustomization.yaml  ← override staging (replicas: 1)
      production/
        kustomization.yaml  ← override prod (replicas: 3)
  argocd/
    applications/
      staging.yaml
      production.yaml
\`\`\``,
        links: [
          { label: 'ArgoCD — documentation officielle', url: 'https://argo-cd.readthedocs.io/' },
          { label: 'GitOps — principes (OpenGitOps)', url: 'https://opengitops.dev/' },
        ],
      },
      {
        title: 'ApplicationSets, Sync Waves et Image Updater',
        content: `## ArgoCD avancé

### ApplicationSet — Déployer sur plusieurs clusters/envs

\`\`\`yaml
# applicationset.yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: mon-api-all-envs
  namespace: argocd
spec:
  generators:
  - list:
      elements:
      - env: staging
        cluster: https://staging.k8s.monorg.com
        replicas: "1"
      - env: production
        cluster: https://prod.k8s.monorg.com
        replicas: "3"
  template:
    metadata:
      name: "mon-api-{{env}}"
    spec:
      source:
        repoURL: https://github.com/monorg/infra-k8s
        targetRevision: main
        path: "apps/mon-api/{{env}}"
      destination:
        server: "{{cluster}}"
        namespace: "{{env}}"
\`\`\`

### Sync Waves — Ordre de déploiement

\`\`\`yaml
# Les objets avec la wave la plus basse se déploient en premier
# wave 0 → wave 1 → wave 2 ...

# 1. Créer le namespace et les ConfigMaps
apiVersion: v1
kind: Namespace
metadata:
  name: production
  annotations:
    argocd.argoproj.io/sync-wave: "-2"  # avant tout
---
# 2. Migrations de base de données
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migrate
  annotations:
    argocd.argoproj.io/sync-wave: "-1"  # avant le Deployment
---
# 3. Deployment de l'application
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  annotations:
    argocd.argoproj.io/sync-wave: "0"   # après les migrations
\`\`\`

### Argo CD Image Updater — Mettre à jour les images automatiquement

\`\`\`yaml
# Annoter l'Application pour la mise à jour automatique des images
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mon-api
  annotations:
    argocd-image-updater.argoproj.io/image-list: "api=ghcr.io/monorg/api"
    argocd-image-updater.argoproj.io/api.update-strategy: semver
    argocd-image-updater.argoproj.io/api.allow-tags: "^1\\.[0-9]+\\.[0-9]+$"
    argocd-image-updater.argoproj.io/write-back-method: git
    argocd-image-updater.argoproj.io/git-branch: main
\`\`\`

\`\`\`bash
# Workflow complet GitOps
# 1. Dev pousse du code → CI build image → tag semver → push registry
# 2. Image Updater détecte le nouveau tag → commit dans infra-k8s
# 3. ArgoCD détecte le commit → sync automatique → rolling update
# 4. ArgoCD Health Check → si échec → rollback automatique

# Vérifier la santé
argocd app get mon-api
argocd app sync mon-api --dry-run
argocd app rollback mon-api 5  # revenir à la révision 5
\`\`\``,
        links: [
          { label: 'ArgoCD Image Updater — documentation', url: 'https://argocd-image-updater.readthedocs.io/' },
          { label: 'Kustomize — documentation', url: 'https://kustomize.io/' },
        ],
      },
    ],
  },

  // ── 508 ────────────────────────────────────────────────────────────────
  {
    id: 508, level: 'Intermédiaire', icon: '🔒', color: 'blue', colorHex: '#3FA7D6',
    title: 'DevSecOps — Sécurité dans le pipeline',
    desc: "SAST, DAST, analyse des dépendances, secrets detection, Trivy, Snyk, OPA et policy-as-code.",
    lessons: [
      {
        title: 'Sécurité dans le pipeline CI/CD',
        content: `## DevSecOps — Shift Security Left

### Pourquoi "Shift Left" ?

Plus on détecte une vulnérabilité tard, plus elle coûte cher à corriger.

\`\`\`
Dev (détection immédiate) : 0.1×
Code review              : 0.5×
CI/CD                    : 1×  ← on veut être ici
Pre-production           : 5×
Production               : 30×
\`\`\`

### SAST — Analyse statique du code

\`\`\`yaml
# GitHub Actions — pipeline sécurité complet
name: Security Pipeline

on: [push, pull_request]

jobs:
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
      with: { fetch-depth: 0 }  # historique complet pour détecter les secrets passés
    - name: Scan secrets with Gitleaks
      uses: gitleaks/gitleaks-action@v2

  sast:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Semgrep SAST
      uses: returntocorp/semgrep-action@v1
      with:
        config: p/python p/security-audit p/owasp-top-ten

  dependency-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Snyk — scan dépendances
      uses: snyk/actions/python@master
      env:
        SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high

  container-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Build image
      run: docker build -t test-image .
    - name: Trivy — scan image
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: test-image
        severity: CRITICAL,HIGH
        exit-code: 1             # fail si vulnérabilité critique
        format: sarif
        output: trivy.sarif
    - name: Upload résultats GitHub Security
      uses: github/codeql-action/upload-sarif@v3
      with:
        sarif_file: trivy.sarif
\`\`\`

### Trivy en ligne de commande

\`\`\`bash
# Scanner une image
trivy image nginx:latest
trivy image --severity HIGH,CRITICAL python:3.11

# Scanner le filesystem (dépendances)
trivy fs --security-checks vuln,secret .

# Scanner un repo Git (commits inclus)
trivy repo https://github.com/monorg/monapp

# Scanner les manifests Kubernetes
trivy k8s --all-namespaces
\`\`\``,
        links: [
          { label: 'OWASP — Top 10 vulnerabilities', url: 'https://owasp.org/www-project-top-ten/' },
          { label: 'Trivy — documentation', url: 'https://aquasecurity.github.io/trivy/' },
        ],
      },
      {
        title: 'OPA / Gatekeeper — Policy as Code',
        content: `## Open Policy Agent — Enforcer de règles dans Kubernetes

### Pourquoi Policy as Code ?

Règles de sécurité dans la documentation → personne ne les lit.
Règles dans le code → enforced automatiquement, versionnable.

### OPA Gatekeeper — Contraintes Kubernetes

\`\`\`yaml
# Contrainte : tous les containers doivent avoir des limits
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLimits
metadata:
  name: require-resource-limits
spec:
  match:
    kinds:
    - apiGroups: [""]
      kinds: ["Pod"]
    excludedNamespaces: ["kube-system"]
  parameters:
    cpu: "500m"
    memory: "512Mi"
\`\`\`

\`\`\`yaml
# Contrainte : interdire les containers non-root
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sNoRootContainers
metadata:
  name: no-root-containers
spec:
  match:
    kinds:
    - apiGroups: [""]
      kinds: ["Pod"]
\`\`\`

### Régo — Langage de règles OPA

\`\`\`rego
# policy/no_latest_tag.rego
package kubernetes.admission

deny[msg] {
  input.request.kind.kind == "Deployment"
  container := input.request.object.spec.template.spec.containers[_]
  endswith(container.image, ":latest")
  msg := sprintf(
    "Container '%v' uses ':latest' tag — specify an explicit version",
    [container.name]
  )
}

deny[msg] {
  input.request.kind.kind == "Deployment"
  container := input.request.object.spec.template.spec.containers[_]
  not container.resources.limits
  msg := sprintf(
    "Container '%v' has no resource limits",
    [container.name]
  )
}
\`\`\`

\`\`\`bash
# Tester une règle OPA localement
opa eval -d policy/ -i deployment.json "data.kubernetes.admission.deny"

# Valider des manifests avant apply
kubectl apply --dry-run=server -f deployment.yaml
# Si la contrainte Gatekeeper existe → refusé avec le message de la règle
\`\`\``,
        links: [
          { label: 'OPA — documentation', url: 'https://www.openpolicyagent.org/docs/' },
          { label: 'Gatekeeper — documentation', url: 'https://open-policy-agent.github.io/gatekeeper/website/docs/' },
        ],
      },
    ],
  },

  // ── 509 ────────────────────────────────────────────────────────────────
  {
    id: 509, level: 'Avancé', icon: '🤖', color: 'purple', colorHex: '#AA7DCE',
    title: 'CI/CD avancé & release automatique',
    desc: "Semantic Release, Conventional Commits automatisés, GitHub Environments, déploiements canary/blue-green et feature flags.",
    lessons: [
      {
        title: 'Semantic Release et Conventional Commits',
        content: `## Automatiser les releases avec Semantic Release

### Conventional Commits → SemVer automatique

\`\`\`
feat:     → incrémente MINOR (1.2.0 → 1.3.0)
fix:      → incrémente PATCH (1.2.0 → 1.2.1)
feat!:    → incrémente MAJOR (1.2.0 → 2.0.0) [breaking change]
chore:    → pas de release
docs:     → pas de release
\`\`\`

\`\`\`bash
# Configuration
npm install --save-dev semantic-release @semantic-release/github @semantic-release/changelog @semantic-release/git
\`\`\`

\`\`\`json
// .releaserc.json
{
  "branches": ["main", {"name": "beta", "prerelease": true}],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],
    "@semantic-release/npm",
    ["@semantic-release/github", { "assets": [{"path": "dist/**", "label": "Distribution"}] }],
    ["@semantic-release/git", { "assets": ["CHANGELOG.md", "package.json"], "message": "chore(release): \${nextRelease.version} [skip ci]" }]
  ]
}
\`\`\`

\`\`\`yaml
# GitHub Actions — release automatique
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
      packages: write
    steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
        token: \${{ secrets.GITHUB_TOKEN }}
    - uses: actions/setup-node@v4
      with: { node-version: 20 }
    - run: npm ci
    - name: Semantic Release
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
      run: npx semantic-release
\`\`\``,
        links: [
          { label: 'Semantic Release — documentation', url: 'https://semantic-release.gitbook.io/semantic-release/' },
          { label: 'Commitlint — valider les commits', url: 'https://commitlint.js.org/' },
        ],
      },
      {
        title: 'Canary, Blue-Green et Feature Flags',
        content: `## Stratégies de déploiement avancées

### Blue-Green — Zéro downtime garanti

\`\`\`yaml
# Deux Deployments en parallèle (blue = actif, green = nouveau)
# blue deployment — version actuelle
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-blue
  labels: { version: blue }
spec:
  replicas: 3
  template:
    metadata: { labels: { app: api, version: blue } }
    spec:
      containers:
      - name: api
        image: ghcr.io/monorg/api:1.2.3

# green deployment — nouvelle version
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-green
  labels: { version: green }
spec:
  replicas: 3
  template:
    metadata: { labels: { app: api, version: green } }
    spec:
      containers:
      - name: api
        image: ghcr.io/monorg/api:1.3.0
\`\`\`

\`\`\`bash
# Basculer le trafic du Service blue → green
kubectl patch service api-service -p '{"spec": {"selector": {"version": "green"}}}'
# Si problème → rollback immédiat
kubectl patch service api-service -p '{"spec": {"selector": {"version": "blue"}}}'
\`\`\`

### Canary avec ArgoCD Rollouts

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: api
spec:
  replicas: 10
  strategy:
    canary:
      steps:
      - setWeight: 10      # 10% du trafic sur la nouvelle version
      - pause: { duration: 10m }   # attendre 10 min (observer les métriques)
      - setWeight: 30
      - pause: { duration: 10m }
      - setWeight: 60
      - pause: { duration: 5m }
      - setWeight: 100     # 100% → déploiement terminé
      analysis:            # rollback auto si dégradation des métriques
        templates:
        - templateName: success-rate-check
        startingStep: 2
\`\`\`

### Feature Flags avec Unleash / LaunchDarkly

\`\`\`python
# pip install UnleashClient
from UnleashClient import UnleashClient

client = UnleashClient(
    url="https://unleash.monorg.com/api",
    app_name="mon-api",
    custom_headers={'Authorization': 'API_TOKEN'}
)
client.initialize_client()

@app.get("/recommendations")
def get_recommendations(user_id: str):
    # Feature flag — activer progressivement la nouvelle feature
    if client.is_enabled("new-recommendations-algo", {"userId": user_id}):
        return new_algo_recommendations(user_id)
    return legacy_recommendations(user_id)
\`\`\``,
        links: [
          { label: 'Argo Rollouts — documentation', url: 'https://argoproj.github.io/rollouts/' },
          { label: 'Unleash — open source feature flags', url: 'https://www.getunleash.io/' },
        ],
      },
    ],
  },

  // ── 510 ────────────────────────────────────────────────────────────────
  {
    id: 510, level: 'Avancé', icon: '☁️', color: 'purple', colorHex: '#AA7DCE',
    title: 'Cloud & Kubernetes managé (EKS/GKE)',
    desc: "Déployer Kubernetes en production sur AWS EKS ou GCP GKE avec Terraform, IAM, ALB Ingress et Spot instances.",
    lessons: [
      {
        title: 'AWS EKS avec Terraform',
        content: `## Déployer un cluster EKS en production

### Architecture de référence

\`\`\`
VPC (10.0.0.0/16)
├── Public Subnets (3 AZs)  → ALB, NAT Gateway
└── Private Subnets (3 AZs) → EKS Worker Nodes

EKS Control Plane (managed by AWS)
├── Node Groups
│   ├── system (t3.medium, on-demand) → kube-system, monitoring
│   ├── api    (t3.large, on-demand)  → apps critiques
│   └── batch  (t3.xlarge, spot 70%) → jobs, ML inference
└── Add-ons : CoreDNS, kube-proxy, VPC CNI, EBS CSI
\`\`\`

\`\`\`hcl
# eks.tf — Cluster EKS avec Terraform
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "\${var.project}-\${var.env}"
  cluster_version = "1.29"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  # OIDC Provider pour IRSA (IAM Roles for Service Accounts)
  enable_irsa = true

  eks_managed_node_groups = {
    system = {
      instance_types = ["t3.medium"]
      min_size = 2; max_size = 4; desired_size = 2
      labels = { nodegroup = "system" }
      taints = [{ key = "CriticalAddonsOnly", effect = "NO_SCHEDULE" }]
    }

    api = {
      instance_types = ["t3.large", "t3a.large"]
      min_size = 2; max_size = 20; desired_size = 3
      labels = { nodegroup = "api" }
    }

    batch = {
      instance_types = ["t3.xlarge", "t3a.xlarge", "m5.xlarge"]
      capacity_type  = "SPOT"           # jusqu'à 70% moins cher
      min_size = 0; max_size = 50; desired_size = 0
      labels = { nodegroup = "batch" }
    }
  }
}

# IRSA — permissions AWS pour les pods (principe du moindre privilège)
module "s3_access_irsa" {
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  role_name = "\${var.project}-s3-access"
  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["production:api-sa"]
    }
  }
  role_policy_arns = {
    s3 = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
  }
}
\`\`\`

\`\`\`bash
# Configurer kubectl après création
aws eks update-kubeconfig --region eu-west-1 --name monapp-production
kubectl get nodes
kubectl get pods -A
\`\`\``,
        links: [
          { label: 'AWS EKS — documentation', url: 'https://docs.aws.amazon.com/eks/' },
          { label: 'terraform-aws-modules/eks', url: 'https://github.com/terraform-aws-modules/terraform-aws-eks' },
        ],
      },
      {
        title: 'Cluster Autoscaler et Cost Optimization',
        content: `## Optimiser les coûts Kubernetes en production

### Cluster Autoscaler — Ajuster les nœuds automatiquement

\`\`\`yaml
# Helm — Cluster Autoscaler pour EKS
helm upgrade --install cluster-autoscaler autoscaler/cluster-autoscaler \\
  --namespace kube-system \\
  --set autoDiscovery.clusterName=monapp-production \\
  --set awsRegion=eu-west-1 \\
  --set rbac.serviceAccount.annotations."eks\\.amazonaws\\.com/role-arn"=\\
    arn:aws:iam::123456789:role/cluster-autoscaler
\`\`\`

\`\`\`bash
# Annotations sur les Node Groups pour le Cluster Autoscaler
aws eks update-nodegroup-config \\
  --cluster-name monapp-production \\
  --nodegroup-name api \\
  --update-config minSize=2,maxSize=20,desiredSize=3
\`\`\`

### Karpenter — Provisioning ultra-rapide (alternative moderne)

\`\`\`yaml
# NodePool Karpenter
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: default
spec:
  template:
    spec:
      requirements:
      - key: karpenter.sh/capacity-type
        operator: In
        values: ["spot", "on-demand"]
      - key: node.kubernetes.io/instance-type
        operator: In
        values: ["t3.large", "t3a.large", "m5.large", "c5.large"]
  limits:
    cpu: 1000
    memory: 2000Gi
  disruption:
    consolidationPolicy: WhenUnderutilized
    consolidateAfter: 30s  # consolider les nœuds sous-utilisés rapidement
\`\`\`

### Kubecost — Visibilité des coûts par namespace/équipe

\`\`\`bash
helm install kubecost cost-analyzer \\
  --repo https://kubecost.github.io/cost-analyzer/ \\
  --namespace kubecost \\
  --create-namespace

kubectl port-forward -n kubecost svc/kubecost-cost-analyzer 9090:9090
# → http://localhost:9090 — coûts par namespace, workload, label
\`\`\`

\`\`\`yaml
# Requests/Limits bien calibrés = facteur principal d'optimisation
# Utiliser Vertical Pod Autoscaler (VPA) en recommendation mode
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: api-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  updatePolicy:
    updateMode: "Off"  # "Off" = juste recommander, ne pas changer automatiquement
\`\`\``,
        links: [
          { label: 'Karpenter — documentation', url: 'https://karpenter.sh/' },
          { label: 'Kubecost — cost optimization', url: 'https://www.kubecost.com/' },
        ],
      },
    ],
  },

  // ── 511 ────────────────────────────────────────────────────────────────
  {
    id: 511, level: 'Avancé', icon: '⚗️', color: 'purple', colorHex: '#AA7DCE',
    title: 'MLOps — Pipelines ML en production',
    desc: "MLflow pour le tracking, DVC pour les données, Prefect/Airflow pour l'orchestration — industrialiser les entraînements ML.",
    lessons: [
      {
        title: 'MLflow — Tracking et Registry',
        content: `## MLflow — La colonne vertébrale du MLOps

### Les 4 composants de MLflow

\`\`\`
Tracking   → logger métriques, paramètres, artefacts
Projects   → packager le code ML reproductible
Models     → standardiser le format des modèles
Registry   → versionner et gouverner les modèles
\`\`\`

### Installation et démarrage

\`\`\`bash
pip install mlflow scikit-learn pandas

# Lancer le serveur MLflow
mlflow server \\
  --backend-store-uri postgresql://mlflow:pass@localhost:5432/mlflow \\
  --default-artifact-root s3://mon-bucket/mlflow-artifacts \\
  --host 0.0.0.0 \\
  --port 5000
\`\`\`

### Logger un entraînement

\`\`\`python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from sklearn.model_selection import train_test_split
import pandas as pd

mlflow.set_tracking_uri("http://mlflow.monorg.com:5000")
mlflow.set_experiment("fraud-detection-v2")

with mlflow.start_run(run_name="random-forest-baseline"):
    # Paramètres
    params = {"n_estimators": 200, "max_depth": 10, "class_weight": "balanced"}
    mlflow.log_params(params)

    # Entraînement
    model = RandomForestClassifier(**params, random_state=42)
    model.fit(X_train, y_train)

    # Métriques
    y_pred  = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]

    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "f1":       f1_score(y_test, y_pred),
        "auc":      roc_auc_score(y_test, y_proba),
    }
    mlflow.log_metrics(metrics)

    # Artefacts
    import matplotlib.pyplot as plt
    from sklearn.metrics import ConfusionMatrixDisplay
    fig, ax = plt.subplots()
    ConfusionMatrixDisplay.from_predictions(y_test, y_pred, ax=ax)
    mlflow.log_figure(fig, "confusion_matrix.png")

    # Enregistrer le modèle avec sa signature
    signature = mlflow.models.infer_signature(X_train, y_pred)
    mlflow.sklearn.log_model(
        model,
        "model",
        signature=signature,
        registered_model_name="fraud-detector",
        input_example=X_train.head(5),
    )

print(f"Run ID : {mlflow.active_run().info.run_id}")
\`\`\`

### Model Registry — Gouvernance des modèles

\`\`\`python
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Promouvoir un modèle en Staging puis Production
client.transition_model_version_stage(
    name="fraud-detector",
    version=5,
    stage="Staging",
    archive_existing_versions=False,
)

# Après validation → Production
client.transition_model_version_stage(
    name="fraud-detector",
    version=5,
    stage="Production",
    archive_existing_versions=True,  # archiver la v4
)

# Charger le modèle de production pour l'inférence
model = mlflow.pyfunc.load_model("models:/fraud-detector/Production")
predictions = model.predict(new_data)
\`\`\``,
        links: [
          { label: 'MLflow — documentation officielle', url: 'https://mlflow.org/docs/latest/' },
          { label: 'MLflow — Model Registry guide', url: 'https://mlflow.org/docs/latest/model-registry.html' },
        ],
      },
      {
        title: 'Prefect — Orchestration de pipelines ML',
        content: `## Orchestrer les pipelines ML avec Prefect

### Pourquoi un orchestrateur ?

Scripts ML exécutés à la main → pas de retry, pas de scheduling, pas de monitoring, pas de dépendances entre étapes.

Prefect → pipeline déclaratif avec **flows, tasks, schedules, retry, alertes**.

### Transformer un script en pipeline Prefect

\`\`\`python
from prefect import flow, task
from prefect.task_runners import SequentialTaskRunner
import pandas as pd, mlflow
from sklearn.ensemble import GradientBoostingClassifier

@task(retries=3, retry_delay_seconds=60)
def load_data(source_path: str) -> pd.DataFrame:
    """Charge les données depuis S3 ou le filesystem."""
    df = pd.read_parquet(source_path)
    print(f"Données chargées : {len(df)} lignes")
    return df

@task
def preprocess(df: pd.DataFrame) -> tuple:
    """Feature engineering et split train/test."""
    # ... preprocessing ...
    return X_train, X_test, y_train, y_test

@task
def train_model(X_train, y_train, params: dict):
    """Entraîner et logger dans MLflow."""
    with mlflow.start_run():
        mlflow.log_params(params)
        model = GradientBoostingClassifier(**params)
        model.fit(X_train, y_train)
        mlflow.sklearn.log_model(model, "model",
                                  registered_model_name="fraud-detector")
    return model

@task
def evaluate_and_promote(model, X_test, y_test, threshold: float = 0.90):
    """Promouvoir en production si les métriques sont suffisantes."""
    score = model.score(X_test, y_test)
    mlflow.log_metric("test_accuracy", score)
    if score >= threshold:
        print(f"✅ Score {score:.3f} ≥ {threshold} → promotion en Production")
        # promote_to_production(model)
    else:
        raise ValueError(f"❌ Score {score:.3f} < {threshold} → modèle rejeté")

@flow(
    name="fraud-detection-retraining",
    task_runner=SequentialTaskRunner(),
)
def retrain_pipeline(data_path: str = "s3://bucket/data/latest/"):
    """Pipeline de ré-entraînement mensuel."""
    df = load_data(data_path)
    X_train, X_test, y_train, y_test = preprocess(df)
    model = train_model(X_train, y_train, {"n_estimators": 200, "max_depth": 8})
    evaluate_and_promote(model, X_test, y_test)

# Lancer manuellement
retrain_pipeline()

# Scheduler
from prefect.schedules import CronSchedule
retrain_pipeline.serve(
    name="monthly-retrain",
    cron="0 2 1 * *",   # 1er du mois à 2h
)
\`\`\`

### Déployer sur Prefect Cloud

\`\`\`bash
pip install prefect
prefect cloud login

# Déployer le flow
prefect deploy retrain.py:retrain_pipeline \\
  --name "fraud-monthly-retrain" \\
  --pool default-pool \\
  --cron "0 2 1 * *"

# Lancer manuellement depuis le CLI
prefect deployment run fraud-detection-retraining/fraud-monthly-retrain
\`\`\``,
        links: [
          { label: 'Prefect — documentation', url: 'https://docs.prefect.io/' },
          { label: 'Apache Airflow — alternative', url: 'https://airflow.apache.org/docs/' },
        ],
      },
    ],
  },

  // ── 512 ────────────────────────────────────────────────────────────────
  {
    id: 512, level: 'Avancé', icon: '📊', color: 'purple', colorHex: '#AA7DCE',
    title: 'MLOps — Serving & Monitoring de modèles',
    desc: "Servir des modèles ML en production avec BentoML / Seldon, surveiller la data drift avec Evidently et automatiser le ré-entraînement.",
    lessons: [
      {
        title: 'Serving ML avec BentoML',
        content: `## BentoML — Déployer des modèles ML rapidement

### Pourquoi BentoML ?

- FastAPI custom → réécrit pour chaque modèle, pas de standardisation
- BentoML → **framework opinioné** pour servir des modèles ML avec adaptive batching, health checks et métriques intégrés

### Créer un service BentoML

\`\`\`python
# service.py
import bentoml
import numpy as np
from bentoml.io import NumpyNdarray, JSON

# 1. Sauvegarder le modèle depuis MLflow → BentoML Store
import mlflow, bentoml as bml
mlflow_model = mlflow.sklearn.load_model("models:/fraud-detector/Production")
bml.sklearn.save_model("fraud-detector", mlflow_model)

# 2. Créer le Runner (charge le modèle, gère le batching)
runner = bentoml.sklearn.get("fraud-detector:latest").to_runner()

# 3. Définir le service
svc = bentoml.Service("fraud-detection-api", runners=[runner])

@svc.api(input=JSON(), output=JSON())
async def predict(input_data: dict) -> dict:
    features = np.array([[
        input_data["montant"],
        input_data["heure"],
        input_data["is_weekend"],
        # ...
    ]])

    proba = await runner.predict_proba.async_run(features)
    return {
        "fraud_probability": float(proba[0][1]),
        "decision": "FRAUD" if proba[0][1] > 0.5 else "LEGITIMATE",
        "confidence": float(max(proba[0])),
    }

@svc.api(input=NumpyNdarray(), output=NumpyNdarray())
async def predict_batch(features: np.ndarray) -> np.ndarray:
    """Endpoint batch pour les traitements en masse."""
    return await runner.predict_proba.async_run(features)
\`\`\`

\`\`\`bash
# Lancer en dev
bentoml serve service:svc --reload

# Builder l'image Docker
bentoml build
bentoml containerize fraud-detection-api:latest

# Déployer sur Kubernetes
bentoml deployment create fraud-api \\
  --bento fraud-detection-api:latest \\
  --namespace production \\
  --replicas 3
\`\`\``,
        links: [
          { label: 'BentoML — documentation', url: 'https://docs.bentoml.org/' },
          { label: 'Seldon Core — serving Kubernetes natif', url: 'https://docs.seldon.io/projects/seldon-core/' },
        ],
      },
      {
        title: 'Data Drift et ré-entraînement automatique',
        content: `## Monitorer les modèles ML en production

### Les types de dérives

\`\`\`
Data Drift      : la distribution des features change (X change)
Concept Drift   : la relation X → y change (le modèle devient obsolète)
Label Drift     : la distribution des labels change
\`\`\`

### Evidently — Monitoring de data drift

\`\`\`python
# pip install evidently
import pandas as pd
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, TargetDriftPreset
from evidently.metrics import DatasetSummaryMetric

# Données de référence (entraînement) vs production récente
reference_data = pd.read_parquet("data/train_reference.parquet")
current_data   = pd.read_parquet("data/production_last_7_days.parquet")

# Rapport de drift
report = Report(metrics=[
    DatasetSummaryMetric(),
    DataDriftPreset(stattest="ks", stattest_threshold=0.05),
    TargetDriftPreset(),
])

report.run(reference_data=reference_data, current_data=current_data)
report.save_html("drift_report.html")

# Accéder aux résultats programmatiquement
results = report.as_dict()
drift_detected = results["metrics"][1]["result"]["dataset_drift"]
drifted_features = [
    f["column_name"]
    for f in results["metrics"][1]["result"]["drift_by_columns"].values()
    if f["drift_detected"]
]

print(f"Data Drift : {drift_detected}")
print(f"Features driftées : {drifted_features}")

# Déclencher un ré-entraînement si drift > seuil
if drift_detected and len(drifted_features) > 3:
    print("🚨 Drift significatif — déclenchement du ré-entraînement")
    # prefect_client.run_deployment("fraud-detection-retraining/monthly")
\`\`\`

### Pipeline de monitoring automatique

\`\`\`python
from prefect import flow, task
import datetime

@task
def compute_drift_metrics(days_back: int = 7) -> dict:
    """Calculer les métriques de drift hebdomadaires."""
    # Charger les données de prod des N derniers jours
    # Comparer avec les données de référence
    # Retourner les métriques
    pass

@task
def alert_if_drift(metrics: dict, threshold: float = 0.05):
    """Envoyer une alerte Slack si drift détecté."""
    if metrics["drift_score"] > threshold:
        # send_slack_alert(f"🚨 Data drift détecté : {metrics}")
        pass

@task
def trigger_retraining_if_needed(metrics: dict):
    """Déclencher le ré-entraînement si performance dégradée."""
    if metrics["f1_current"] < metrics["f1_reference"] * 0.95:
        print("Performance dégradée → ré-entraînement")

@flow(name="model-monitoring")
def monitoring_pipeline():
    metrics = compute_drift_metrics(days_back=7)
    alert_if_drift(metrics)
    trigger_retraining_if_needed(metrics)

# Scheduler hebdomadaire
monitoring_pipeline.serve(cron="0 9 * * 1")  # Lundi 9h
\`\`\``,
        links: [
          { label: 'Evidently AI — documentation', url: 'https://docs.evidentlyai.com/' },
          { label: 'Whylogs — data profiling', url: 'https://whylogs.readthedocs.io/' },
        ],
      },
    ],
  },

  // ── 513 ────────────────────────────────────────────────────────────────
  {
    id: 513, level: 'Expert', icon: '🦙', color: 'orange', colorHex: '#F3752B',
    title: 'LLMOps — Déployer des LLMs',
    desc: "vLLM, Ollama, Text Generation Inference — servir des LLMs open-source (Mistral, LLaMA, Phi) à haute performance en production.",
    lessons: [
      {
        title: 'Servir des LLMs avec vLLM',
        content: `## LLMOps — Déployer des LLMs open-source

### Pourquoi déployer son propre LLM ?

- **Coût** : GPT-4 = ~15 $/M tokens. Mistral-7B sur GPU A10G = ~0.10 $/M tokens
- **Confidentialité** : données sensibles ne quittent pas le SI
- **Latence** : on-prem ou cloud privé = moins de round-trips
- **Customisation** : fine-tuning sur ses données métier

### vLLM — Le serveur LLM haute performance

vLLM utilise **PagedAttention** → gestion du KV cache comme un OS gère la RAM → throughput 2-24× supérieur à Hugging Face Inference naïf.

\`\`\`bash
# Installation (GPU requis — NVIDIA CUDA)
pip install vllm

# Servir Mistral-7B-Instruct
python -m vllm.entrypoints.openai.api_server \\
  --model mistralai/Mistral-7B-Instruct-v0.2 \\
  --dtype bfloat16 \\
  --max-model-len 8192 \\
  --tensor-parallel-size 1 \\
  --gpu-memory-utilization 0.90 \\
  --host 0.0.0.0 --port 8000

# vLLM expose une API compatible OpenAI !
curl http://localhost:8000/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "mistralai/Mistral-7B-Instruct-v0.2",
    "messages": [{"role": "user", "content": "Explique le DevOps en 3 lignes"}],
    "temperature": 0.7,
    "max_tokens": 500
  }'
\`\`\`

### Déployer vLLM sur Kubernetes

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm-mistral
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
        - "--max-model-len"
        - "8192"
        ports:
        - containerPort: 8000
        resources:
          limits:
            nvidia.com/gpu: 1       # A10G ou A100
            memory: "24Gi"
          requests:
            nvidia.com/gpu: 1
        env:
        - name: HUGGING_FACE_HUB_TOKEN
          valueFrom:
            secretKeyRef: { name: hf-token, key: token }
        volumeMounts:
        - name: model-cache
          mountPath: /root/.cache/huggingface  # modèles cachés
      volumes:
      - name: model-cache
        persistentVolumeClaim:
          claimName: model-cache-pvc
      nodeSelector:
        node.kubernetes.io/instance-type: g5.xlarge   # AWS A10G GPU
\`\`\`

### Ollama — LLM en local (CPU + GPU)

\`\`\`bash
# Installation macOS/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Télécharger et servir un modèle
ollama pull llama3.2:3b      # 2 GB — fonctionne sur CPU
ollama pull mistral:7b        # 4 GB quantisé
ollama pull phi3:mini         # 2 GB — excellent rapport qualité/poids

# API REST compatible
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "Hello"}],
  "stream": false
}'

# Docker
docker run -d -v ollama:/root/.ollama -p 11434:11434 \\
  --name ollama --gpus all ollama/ollama
\`\`\``,
        links: [
          { label: 'vLLM — documentation', url: 'https://docs.vllm.ai/' },
          { label: 'Ollama — site officiel', url: 'https://ollama.com/' },
          { label: 'Text Generation Inference (HuggingFace)', url: 'https://huggingface.co/docs/text-generation-inference/' },
        ],
      },
      {
        title: 'Fine-tuning et quantization LLM',
        content: `## Fine-tuner et optimiser un LLM

### LoRA / QLoRA — Fine-tuning efficace en mémoire

Entraîner tous les poids d'un LLM 7B = 80 GB de VRAM minimum.
LoRA (Low-Rank Adaptation) = entraîner **<1% des paramètres** → 6-8 GB de VRAM.

\`\`\`python
# pip install transformers peft bitsandbytes datasets trl
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer, SFTConfig
from datasets import load_dataset

MODEL_NAME = "mistralai/Mistral-7B-v0.1"

# Quantization 4-bit (QLoRA) — réduire l'empreinte mémoire
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype="bfloat16",
)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME, quantization_config=bnb_config, device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# LoRA config — quels modules adapter
lora_config = LoraConfig(
    r=16,               # rank (16 = bon compromis)
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM,
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 41,943,040 || all params: 7,283,826,688 || trainable%: 0.58%

# Dataset de fine-tuning (format instruction)
dataset = load_dataset("json", data_files={"train": "data/instructions.jsonl"})

# Entraînement
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset["train"],
    args=SFTConfig(
        output_dir="./fine-tuned-mistral",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,   # batch effectif = 16
        learning_rate=2e-4,
        bf16=True,
    ),
    dataset_text_field="text",
    max_seq_length=2048,
)

trainer.train()
trainer.save_model("./fine-tuned-mistral")
\`\`\`

### Évaluer un LLM fine-tuné

\`\`\`python
# pip install lm-eval
# EleutherAI LM Evaluation Harness — benchmarks standardisés
lm_eval --model hf --model_args "pretrained=./fine-tuned-mistral" \\
  --tasks hellaswag,arc_easy,truthfulqa_mc \\
  --device cuda:0 \\
  --batch_size 8

# Évaluation custom avec DeepEval
from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric, FaithfulnessMetric
from deepeval.test_case import LLMTestCase

test_cases = [
    LLMTestCase(
        input="Comment configurer un pipeline CI/CD ?",
        actual_output=llm_response,
        expected_output=expected,
    )
]
evaluate(test_cases, [AnswerRelevancyMetric(threshold=0.7)])
\`\`\``,
        links: [
          { label: 'Unsloth — fine-tuning LLM ultra-rapide', url: 'https://github.com/unslothai/unsloth' },
          { label: 'DeepEval — LLM evaluation framework', url: 'https://docs.confident-ai.com/' },
        ],
      },
    ],
  },

  // ── 514 ────────────────────────────────────────────────────────────────
  {
    id: 514, level: 'Expert', icon: '🔗', color: 'orange', colorHex: '#F3752B',
    title: 'LLMOps — RAG en production',
    desc: "LangChain, LlamaIndex, pgvector, évaluation RAG, guardrails, caching sémantique — construire des pipelines RAG robustes.",
    lessons: [
      {
        title: 'Construire un pipeline RAG robuste',
        content: `## RAG — Retrieval-Augmented Generation

### Architecture RAG

\`\`\`
Documents → Chunking → Embeddings → Vector Store (pgvector / Qdrant)
                                           ↓
Query → Embedding → Similarité → Top-K chunks → LLM → Réponse
\`\`\`

### Stack RAG recommandée en 2024

\`\`\`
Embeddings   : nomic-embed-text (open source, 8k ctx)
Vector Store : pgvector (PostgreSQL) ou Qdrant
Reranker     : Cohere Rerank / BGE-reranker (qualité ++)
LLM          : Mistral-7B (local) ou Claude/GPT-4 (API)
Framework    : LangChain ou LlamaIndex
\`\`\`

### Implémentation complète avec LangChain

\`\`\`python
# pip install langchain langchain-community chromadb sentence-transformers
from langchain.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

# 1. Charger les documents
loader = DirectoryLoader("docs/", glob="**/*.pdf", loader_cls=PyPDFLoader)
documents = loader.load()
print(f"{len(documents)} documents chargés")

# 2. Chunking — taille critique pour la qualité
splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=64,     # chevauchement pour ne pas couper le contexte
    separators=["\n\n", "\n", ". ", " "],  # ordre de priorité
)
chunks = splitter.split_documents(documents)
print(f"{len(chunks)} chunks créés")

# 3. Embeddings
embeddings = HuggingFaceEmbeddings(
    model_name="nomic-ai/nomic-embed-text-v1",
    model_kwargs={"trust_remote_code": True},
    encode_kwargs={"normalize_embeddings": True},
)

# 4. Vector Store
vectordb = Chroma.from_documents(
    chunks,
    embeddings,
    persist_directory="./chroma_db",
    collection_name="documentation",
)

# 5. Pipeline RAG
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
retriever = vectordb.as_retriever(
    search_type="mmr",      # Maximum Marginal Relevance (diversité)
    search_kwargs={"k": 5, "fetch_k": 20}
)

rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
)

result = rag_chain.invoke({"query": "Comment configurer un Ingress Kubernetes ?"})
print(result["result"])
print("\nSources :")
for doc in result["source_documents"]:
    print(f"  - {doc.metadata['source']} (page {doc.metadata.get('page')})")
\`\`\`

### pgvector — Vector Store en PostgreSQL

\`\`\`sql
-- Extension pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Table de documents
CREATE TABLE documents (
    id          BIGSERIAL PRIMARY KEY,
    content     TEXT NOT NULL,
    source      TEXT,
    embedding   VECTOR(768),   -- dimension dépend du modèle
    metadata    JSONB,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Index IVFFLAT (rapide, approximatif)
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Recherche par similarité cosinus (top-5)
SELECT content, source, 1 - (embedding <=> $1) AS similarity
FROM documents
ORDER BY embedding <=> $1
LIMIT 5;
\`\`\``,
        links: [
          { label: 'LangChain — documentation', url: 'https://python.langchain.com/' },
          { label: 'LlamaIndex — documentation', url: 'https://docs.llamaindex.ai/' },
          { label: 'pgvector — extension PostgreSQL', url: 'https://github.com/pgvector/pgvector' },
        ],
      },
      {
        title: 'Évaluation RAG, Guardrails et Caching',
        content: `## RAG en production — Qualité et Performance

### RAGAs — Évaluer un pipeline RAG

\`\`\`python
# pip install ragas
from ragas import evaluate
from ragas.metrics import (
    answer_relevancy,  # réponse pertinente par rapport à la question ?
    faithfulness,      # réponse fidèle aux documents récupérés ?
    context_recall,    # les documents récupérés contiennent la réponse ?
    context_precision, # les documents récupérés sont-ils tous pertinents ?
)
from datasets import Dataset

# Collecter des questions, contextes et réponses
eval_data = {
    "question": [
        "Comment configurer un Ingress Kubernetes ?",
        "Quelle est la différence entre Deployment et StatefulSet ?",
    ],
    "answer": [answers],           # réponses générées par le RAG
    "contexts": [retrieved_chunks], # chunks récupérés pour chaque question
    "ground_truth": [expert_answers], # réponses de référence
}

dataset = Dataset.from_dict(eval_data)
results = evaluate(dataset, metrics=[
    answer_relevancy, faithfulness, context_recall, context_precision
])
print(results.to_pandas())
# answer_relevancy: 0.91 | faithfulness: 0.85 | context_recall: 0.78
\`\`\`

### Guardrails — Contrôler les inputs/outputs LLM

\`\`\`python
# pip install guardrails-ai
import guardrails as gd
from guardrails.hub import ToxicLanguage, RestrictToTopic

guard = gd.Guard().use_many(
    ToxicLanguage(threshold=0.5, on_fail="exception"),
    RestrictToTopic(
        valid_topics=["DevOps", "Kubernetes", "Docker", "CI/CD"],
        on_fail="filter",
    ),
)

# Valider l'input utilisateur
try:
    validated_input = guard.validate(user_question)
    response = rag_chain.invoke({"query": validated_input})
except Exception as e:
    return {"error": "Question non conforme à la politique d'utilisation"}

# Valider l'output LLM
response_guard = gd.Guard().use(ToxicLanguage(on_fail="exception"))
validated_output = response_guard.validate(response["result"])
\`\`\`

### Caching sémantique avec GPTCache

\`\`\`python
# pip install gptcache
from gptcache import cache
from gptcache.adapter.langchain_models import LangChainLLMs
from gptcache.embedding import Onnx
from gptcache.similarity_evaluation.distance import SearchDistanceEvaluation

# Cache sémantique : questions similaires → même réponse sans appel LLM
onnx = Onnx()
cache.init(
    embedding_func=onnx.to_embeddings,
    similarity_evaluation=SearchDistanceEvaluation(max_distance=0.15),
)

# Wrapper le LLM
cached_llm = LangChainLLMs(llm=ChatOpenAI(model="gpt-4o-mini"))

# Première requête → appel API LLM
r1 = cached_llm("Comment configurer un Ingress Kubernetes ?")
# Deuxième requête similaire → CACHE HIT (0ms, 0$)
r2 = cached_llm("Comment fonctionne un Ingress dans Kubernetes ?")
\`\`\``,
        links: [
          { label: 'RAGAs — évaluation RAG', url: 'https://docs.ragas.io/' },
          { label: 'Guardrails AI — documentation', url: 'https://www.guardrailsai.com/docs' },
          { label: 'LangFuse — LLM observability', url: 'https://langfuse.com/docs' },
        ],
      },
    ],
  },

  // ── 515 ────────────────────────────────────────────────────────────────
  {
    id: 515, level: 'Expert', icon: '🏆', color: 'orange', colorHex: '#F3752B',
    title: 'LLMOps — Observabilité et Industrialisation',
    desc: "LangFuse, Phoenix/Arize, latence P99, gestion des coûts, versioning de prompts et architecture LLM multi-agents en production.",
    lessons: [
      {
        title: 'Observabilité LLM avec LangFuse',
        content: `## Monitorer les LLMs en production

### Pourquoi l'observabilité LLM est différente

\`\`\`
API classique : latence, throughput, error rate
LLM en prod   : latence + coût/requête + qualité réponse + hallucinations
               + taux de cache hit + longueur de contexte + usage par user
\`\`\`

### LangFuse — Tracer les pipelines LLM

\`\`\`python
# pip install langfuse
from langfuse import Langfuse
from langfuse.openai import openai  # drop-in replacement
from langfuse.decorators import observe, langfuse_context

langfuse = Langfuse(
    public_key="pk-lf-xxx",
    secret_key="sk-lf-xxx",
    host="https://cloud.langfuse.com",
)

# Tracer une conversation complète
@observe(name="rag-pipeline")
def rag_query(user_question: str, user_id: str) -> str:
    # Tracer la récupération
    with langfuse.span(name="retrieval") as span:
        chunks = retriever.invoke(user_question)
        span.update(metadata={"chunks_retrieved": len(chunks)})

    # Tracer la génération
    with langfuse.generation(name="llm-generation") as gen:
        gen.update(
            model="mistral-7b",
            input=user_question,
            prompt=SYSTEM_PROMPT,
        )
        response = llm.invoke(user_question)
        gen.update(
            output=response.content,
            usage={"input": 150, "output": 80},  # tokens
        )

    # Ajouter le score de qualité (feedback utilisateur)
    langfuse_context.score_current_trace(
        name="user-feedback",
        value=1,  # 1 = thumbs up, 0 = thumbs down
        comment="Réponse pertinente et bien sourcée",
    )

    return response.content
\`\`\`

### Dashboard LangFuse — Métriques clés

\`\`\`python
# Analyser les coûts par feature
traces = langfuse.get_traces(name="rag-pipeline", limit=1000)
total_cost = sum(t.total_cost for t in traces)
avg_latency = sum(t.latency for t in traces) / len(traces)

print(f"Coût total (7j) : {total_cost:.2f} $")
print(f"Latence moyenne : {avg_latency:.0f} ms")

# Identifier les requêtes lentes
slow_traces = [t for t in traces if t.latency > 5000]
print(f"Requêtes > 5s : {len(slow_traces)}")
\`\`\`

### Versionner les prompts

\`\`\`python
# Gérer les prompts comme du code avec LangFuse
prompt_v2 = langfuse.create_prompt(
    name="rag-system-prompt",
    prompt="""Tu es un expert DevOps. Utilise UNIQUEMENT les informations
du contexte fourni pour répondre. Si l'information n'est pas dans le contexte,
dis-le explicitement.

Contexte : {{context}}

Réponds en français, de manière concise et structurée.""",
    labels=["production"],  # promouvoir cette version
)

# Utiliser le prompt versionné
prompt = langfuse.get_prompt("rag-system-prompt", label="production")
formatted = prompt.compile(context=chunks)
\`\`\``,
        links: [
          { label: 'LangFuse — documentation', url: 'https://langfuse.com/docs' },
          { label: 'Arize Phoenix — LLM observability', url: 'https://docs.arize.com/phoenix' },
        ],
      },
      {
        title: 'Architecture multi-agents et optimisation des coûts',
        content: `## LLM Multi-agents et cost management

### Architecture multi-agents avec LangGraph

\`\`\`python
# pip install langgraph
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage
from typing import TypedDict, Annotated, Sequence
import operator

# État partagé entre les agents
class AgentState(TypedDict):
    messages: Annotated[Sequence[HumanMessage | AIMessage], operator.add]
    current_agent: str
    final_answer: str

# Agents spécialisés
def code_agent(state: AgentState) -> AgentState:
    """Agent spécialisé en génération de code DevOps."""
    response = code_llm.invoke(state["messages"])
    return {"messages": [response], "current_agent": "reviewer"}

def review_agent(state: AgentState) -> AgentState:
    """Agent qui vérifie la sécurité et les bonnes pratiques."""
    last_code = state["messages"][-1].content
    review_prompt = f"Analyse ce code Kubernetes pour des problèmes de sécurité:\n{last_code}"
    review = security_llm.invoke([HumanMessage(content=review_prompt)])
    return {"messages": [review], "current_agent": "done"}

def router(state: AgentState) -> str:
    """Router — décide quel agent appeler ensuite."""
    return state["current_agent"]

# Construire le graphe
workflow = StateGraph(AgentState)
workflow.add_node("code_agent",   code_agent)
workflow.add_node("review_agent", review_agent)

workflow.set_entry_point("code_agent")
workflow.add_conditional_edges("code_agent",   router, {"reviewer": "review_agent"})
workflow.add_conditional_edges("review_agent", router, {"done": END})

app = workflow.compile()

result = app.invoke({
    "messages": [HumanMessage(content="Écris un Deployment Kubernetes sécurisé pour une API Python")],
    "current_agent": "reviewer",
    "final_answer": "",
})
\`\`\`

### Optimiser les coûts LLM

\`\`\`python
# 1. Router les requêtes par complexité
def smart_router(query: str) -> str:
    """Envoyer les questions simples vers un modèle moins cher."""
    # Classifier la complexité avec un petit modèle (0.001$/1k tokens)
    complexity = classify_complexity(query)  # simple / complex

    if complexity == "simple":
        return "mistral-7b-local"   # gratuit, on-prem
    elif complexity == "medium":
        return "gpt-4o-mini"        # 0.15$/1M tokens
    else:
        return "gpt-4o"             # 5$/1M tokens — seulement si nécessaire

# 2. Prompt compression — réduire les tokens d'entrée
# pip install llmlingua
from llmlingua import PromptCompressor

compressor = PromptCompressor(model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank")
compressed = compressor.compress_prompt(
    long_context,
    instruction="Résume les informations clés",
    ratio=0.5,  # 50% de réduction des tokens
)

# 3. Budgets par feature
LLM_BUDGETS = {
    "chat":         0.05,  # $ max par session
    "batch-summary": 0.10,
    "code-review":  0.20,
}

def check_budget(feature: str, estimated_cost: float) -> bool:
    if estimated_cost > LLM_BUDGETS.get(feature, 0.01):
        log_cost_exceeded(feature, estimated_cost)
        return False
    return True
\`\`\``,
        links: [
          { label: 'LangGraph — documentation', url: 'https://langchain-ai.github.io/langgraph/' },
          { label: 'LLMLingua — prompt compression', url: 'https://llmlingua.com/' },
          { label: 'OpenRouter — routage multi-modèles', url: 'https://openrouter.ai/' },
        ],
      },
    ],
  },
];

export default DEVOPS_MODULES;
