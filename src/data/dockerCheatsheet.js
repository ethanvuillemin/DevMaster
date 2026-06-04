/**
 * Données structurées pour la cheatsheet Docker.
 * Même format que la cheatsheet Git : { title, color, colorHex, commands:[{cmd, desc}] }
 */

const DOCKER_CHEATSHEET_SECTIONS = [
  {
    title: 'Images',
    color: 'accent-blue',
    colorHex: '#60a5fa',
    commands: [
      { cmd: 'docker build -t nom:tag .', desc: 'Construire une image' },
      { cmd: 'docker images', desc: 'Lister les images locales' },
      { cmd: 'docker pull nom:tag', desc: 'Télécharger une image' },
      { cmd: 'docker rmi nom:tag', desc: 'Supprimer une image' },
      { cmd: 'docker tag src cible', desc: 'Re-tagger une image' },
      { cmd: 'docker history nom', desc: 'Voir les couches' },
      { cmd: 'docker image prune', desc: 'Nettoyer les images orphelines' },
    ],
  },
  {
    title: 'Conteneurs',
    color: 'accent-green',
    colorHex: '#34d399',
    commands: [
      { cmd: 'docker run nom', desc: 'Créer + démarrer' },
      { cmd: 'docker ps', desc: 'Conteneurs actifs' },
      { cmd: 'docker ps -a', desc: 'Tous les conteneurs' },
      { cmd: 'docker stop <id>', desc: 'Arrêter proprement' },
      { cmd: 'docker start <id>', desc: 'Redémarrer' },
      { cmd: 'docker restart <id>', desc: 'Relancer' },
      { cmd: 'docker rm <id>', desc: 'Supprimer un conteneur' },
      { cmd: 'docker rm -f <id>', desc: '⚠️ Forcer la suppression' },
    ],
  },
  {
    title: 'Options de run',
    color: 'accent-purple',
    colorHex: '#a78bfa',
    commands: [
      { cmd: '-d', desc: 'Arrière-plan (détaché)' },
      { cmd: '-p 8080:80', desc: 'Mapping de port hôte:conteneur' },
      { cmd: '--name web', desc: 'Nommer le conteneur' },
      { cmd: '-it', desc: 'Interactif + terminal' },
      { cmd: '-e VAR=valeur', desc: "Variable d'environnement" },
      { cmd: '-v vol:/chemin', desc: 'Monter un volume' },
      { cmd: '--rm', desc: 'Supprimer à l\'arrêt' },
      { cmd: '--network net', desc: 'Attacher à un réseau' },
    ],
  },
  {
    title: 'Inspecter & Debug',
    color: 'accent-pink',
    colorHex: '#f472b6',
    commands: [
      { cmd: 'docker logs <id>', desc: 'Voir les logs' },
      { cmd: 'docker logs -f <id>', desc: 'Suivre en direct' },
      { cmd: 'docker exec -it <id> bash', desc: 'Entrer dans le conteneur' },
      { cmd: 'docker inspect <id>', desc: 'Détails (JSON)' },
      { cmd: 'docker stats', desc: 'Usage CPU / RAM' },
      { cmd: 'docker top <id>', desc: 'Processus du conteneur' },
      { cmd: 'docker cp <id>:/f .', desc: 'Copier un fichier' },
    ],
  },
  {
    title: 'Volumes',
    color: 'accent-orange',
    colorHex: '#fb923c',
    commands: [
      { cmd: 'docker volume create vol', desc: 'Créer un volume' },
      { cmd: 'docker volume ls', desc: 'Lister les volumes' },
      { cmd: 'docker volume inspect vol', desc: 'Détails d\'un volume' },
      { cmd: 'docker volume rm vol', desc: 'Supprimer un volume' },
      { cmd: '-v vol:/data', desc: 'Volume nommé (persistant)' },
      { cmd: '-v $(pwd):/app', desc: 'Bind mount (dev)' },
      { cmd: 'docker volume prune', desc: 'Nettoyer les volumes inutilisés' },
    ],
  },
  {
    title: 'Réseaux',
    color: 'accent-yellow',
    colorHex: '#fbbf24',
    commands: [
      { cmd: 'docker network create net', desc: 'Créer un réseau' },
      { cmd: 'docker network ls', desc: 'Lister les réseaux' },
      { cmd: 'docker network inspect net', desc: 'Détails d\'un réseau' },
      { cmd: 'docker network connect net <id>', desc: 'Connecter un conteneur' },
      { cmd: 'docker network rm net', desc: 'Supprimer un réseau' },
    ],
  },
  {
    title: 'Docker Compose',
    color: 'accent-blue',
    colorHex: '#22d3ee',
    commands: [
      { cmd: 'docker compose up -d', desc: 'Démarrer en arrière-plan' },
      { cmd: 'docker compose up --build', desc: 'Reconstruire + démarrer' },
      { cmd: 'docker compose down', desc: 'Arrêter + supprimer' },
      { cmd: 'docker compose down -v', desc: '... + supprimer les volumes' },
      { cmd: 'docker compose ps', desc: 'État des services' },
      { cmd: 'docker compose logs -f web', desc: 'Logs d\'un service' },
      { cmd: 'docker compose exec web sh', desc: 'Shell dans un service' },
      { cmd: 'docker compose up --scale web=3', desc: 'Mettre à l\'échelle' },
    ],
  },
  {
    title: 'Registry',
    color: 'accent-green',
    colorHex: '#4ade80',
    commands: [
      { cmd: 'docker login', desc: 'Se connecter (Docker Hub)' },
      { cmd: 'docker login ghcr.io', desc: 'Se connecter à GHCR' },
      { cmd: 'docker tag img user/img:1.0', desc: 'Préparer pour le push' },
      { cmd: 'docker push user/img:1.0', desc: 'Publier l\'image' },
      { cmd: 'docker pull user/img:1.0', desc: 'Récupérer l\'image' },
      { cmd: 'docker logout', desc: 'Se déconnecter' },
    ],
  },
  {
    title: 'Dockerfile (instructions)',
    color: 'text-secondary',
    colorHex: '#94a3b8',
    commands: [
      { cmd: 'FROM image:tag', desc: 'Image de base (obligatoire)' },
      { cmd: 'WORKDIR /app', desc: 'Dossier de travail' },
      { cmd: 'COPY src dest', desc: 'Copier des fichiers' },
      { cmd: 'RUN commande', desc: 'Exécuter pendant le build' },
      { cmd: 'ENV VAR=valeur', desc: "Variable d'environnement" },
      { cmd: 'EXPOSE 3000', desc: 'Documenter le port' },
      { cmd: 'USER node', desc: 'Utilisateur non-root' },
      { cmd: 'CMD ["node","app.js"]', desc: 'Commande au lancement' },
    ],
  },
  {
    title: 'Nettoyage',
    color: 'accent-red',
    colorHex: '#f87171',
    commands: [
      { cmd: 'docker system prune', desc: 'Nettoyer (arrêtés, dangling)' },
      { cmd: 'docker system prune -a', desc: '⚠️ Tout l\'inutilisé' },
      { cmd: 'docker container prune', desc: 'Conteneurs arrêtés' },
      { cmd: 'docker image prune', desc: 'Images orphelines' },
      { cmd: 'docker volume prune', desc: 'Volumes inutilisés' },
      { cmd: 'docker system df', desc: "Espace disque utilisé" },
    ],
  },
];

export default DOCKER_CHEATSHEET_SECTIONS;
