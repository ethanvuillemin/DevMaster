/**
 * Modules Docker — From Zero to Hero
 *
 * Démarche : l'étudiant est ACTEUR. Il réalise chaque exercice sur SA propre
 * machine. L'app le guide (scénario + étapes) et garde l'accès aux indices et
 * à la solution de référence — mais SANS terminal ni validation automatique.
 *
 * Forme d'un exercice : { title, scenario, steps[], hints[], solution }
 *
 * Pédagogie : courbe TRÈS progressive, pensée pour un débutant. Chaque notion
 * Docker est découpée en petits modules avec beaucoup de mini-exercices.
 * Dès qu'il faut du code, le code est FOURNI tout prêt à copier-coller :
 * l'apprenant se concentre sur Docker, pas sur la programmation.
 *
 * IDs 200-299 réservés au track Docker.
 */

const DOCKER_MODULES = [
  // ═══════════════════════════════════════════════════════════
  // MODULE 1 — Docker, c'est quoi ?
  // ═══════════════════════════════════════════════════════════
  {
    id: 201, level: 'Grand débutant', icon: '🐳', title: 'Docker, c\'est quoi ?',
    desc: 'Comprendre en douceur l\'idée des conteneurs, des images et du registry — avec des images de la vie de tous les jours.',
    color: 'cyan', colorHex: '#22d3ee',
    lessons: [
      {
        title: 'Le problème que Docker résout',
        content: `### « Pourtant, ça marchait sur mon ordinateur ! »

Imagine que tu prépares un super plat chez toi. Tu l'apportes chez un ami pour le refaire dans **sa** cuisine… mais il n'a pas le même four, pas les mêmes ingrédients, pas les mêmes ustensiles. Résultat : le plat ne ressort pas pareil.

En informatique, c'est le même souci : un programme qui marche sur l'ordinateur du développeur **plante** sur un autre, parce que l'environnement (les outils installés, les versions…) est différent.

### L'idée géniale de Docker

**Docker** met ton programme **et tout ce dont il a besoin** dans une « boîte » hermétique et portable. Cette boîte fonctionne **de la même façon partout** : sur ton ordinateur, sur celui d'un collègue, sur un serveur dans le cloud.

> 🧠 En une phrase : Docker, c'est emporter toute ta cuisine avec ton plat, pour que ça marche à l'identique n'importe où.

Cette boîte qui tourne, on l'appelle un **conteneur**. C'est le mot le plus important du cours.`,
        links: [
          { label: 'Docker — Get Started (officiel)', url: 'https://docs.docker.com/get-started/' },
          { label: 'Qu\'est-ce qu\'un conteneur ?', url: 'https://www.docker.com/resources/what-container/' },
        ],
      },
      {
        title: 'Les 3 mots à retenir (image, conteneur, registry)',
        content: `### Trois mots, une analogie de cuisine 🍽️

| Mot Docker | Analogie | Ce que c'est vraiment |
|------------|----------|------------------------|
| **Image** | La **recette** écrite | Un modèle figé : ton programme + son environnement |
| **Conteneur** | Le **plat cuisiné** à partir de la recette | Une image **en train de tourner** |
| **Registry** | Le **livre de recettes** partagé en ligne | Un endroit où l'on stocke et télécharge les images |

À partir d'**une seule recette** (image), tu peux cuisiner **autant de plats que tu veux** (conteneurs). Et tu peux télécharger les recettes des autres depuis un registry comme **Docker Hub**.

\`\`\`
   Image  ──(on lance)──►  Conteneur
     ▲
     └──(on télécharge)── Registry (Docker Hub)
\`\`\`

### Conteneur vs machine virtuelle (en une image)

Tu as peut-être entendu parler de « machines virtuelles ». Retiens juste ceci : une machine virtuelle simule **un ordinateur entier** (lourd, lent à démarrer). Un conteneur n'emballe que **ton programme** (léger, démarre en une seconde). C'est ce qui rend Docker si pratique.`,
        links: [
          { label: 'Conteneurs vs VMs (officiel)', url: 'https://www.docker.com/resources/what-container/' },
        ],
      },
      {
        title: 'Docker Hub : la bibliothèque d\'images',
        content: `### Tu n'es jamais seul : des milliers d'images existent déjà

Avant même d'installer quoi que ce soit, sache ceci : tu n'as **presque jamais** besoin de tout construire toi-même. Des entreprises et des communautés publient des images **toutes prêtes** sur **Docker Hub** (le registry public le plus connu).

Quelques exemples d'images très utilisées :

| Image | À quoi ça sert |
|-------|----------------|
| \`nginx\` | Un serveur web (affiche des pages) |
| \`postgres\` | Une base de données |
| \`python\` | L'environnement Python prêt à l'emploi |
| \`hello-world\` | Une mini-image de test |

### Anatomie d'un nom d'image

\`\`\`
nginx:1.27
└─┬─┘ └─┬─┘
 nom    version (on dit "tag")
\`\`\`

Si tu ne précises pas de version, Docker prend \`latest\` (la plus récente). On verra plus tard pourquoi, en vrai, on préfère préciser une version.

> 💡 Tu peux explorer Docker Hub dans ton navigateur, comme un magasin : tu cherches un logiciel, tu lis sa fiche, et tu sauras le lancer en une commande dès le module suivant.`,
        links: [
          { label: 'Explorer Docker Hub', url: 'https://hub.docker.com/' },
          { label: 'Image officielle nginx', url: 'https://hub.docker.com/_/nginx' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Explorer Docker Hub comme un magasin',
        scenario: "Avant d'installer Docker, on regarde la « bibliothèque » d'où viennent les images. Aucun logiciel à installer : tout se passe dans ton navigateur.",
        steps: [
          "Ouvre ton navigateur sur **https://hub.docker.com**.",
          "Dans la barre de recherche, tape `nginx` et ouvre la fiche de l'image officielle.",
          "Repère le bloc « docker pull nginx » : c'est la commande que tu utiliseras bientôt pour la télécharger.",
          "Cherche aussi `postgres` et `hello-world` pour voir qu'il existe une image pour à peu près tout.",
        ],
        hints: [
          "Les images « officielles » ont un badge vérifié et un nom court (sans barre oblique), comme `nginx` ou `postgres`.",
          "Pas besoin de créer un compte pour explorer et lire les fiches.",
        ],
        solution: `# Rien à taper ici — c'est une exploration dans le navigateur :
# 1. https://hub.docker.com
# 2. chercher "nginx" → lire la fiche
# 3. repérer la commande : docker pull nginx
# 4. chercher aussi "postgres" et "hello-world"`,
      },
      {
        title: 'Relier les mots aux bonnes idées',
        scenario: "Petit exercice de mémoire pour ancrer le vocabulaire. Écris tes réponses dans ton fichier notes.txt, puis compare avec la solution.",
        steps: [
          "Dans ton dossier `docker-cours`, ouvre (ou crée) `notes.txt`.",
          "Écris la définition, avec tes propres mots, de : **image**, **conteneur**, **registry**.",
          "Pour chacun, note l'analogie de cuisine correspondante.",
          "Compare avec la solution ci-dessous : tu n'as pas besoin du mot exact, juste de l'idée juste.",
        ],
        hints: [
          "Pense « recette / plat / livre de recettes ».",
          "Le mot qui « tourne » (qui s'exécute), c'est le conteneur.",
        ],
        solution: `Image     = la recette figée (ton programme + son environnement)
Conteneur = la recette en train de tourner (le plat cuisiné)
Registry  = la bibliothèque d'images en ligne (Docker Hub = le livre de recettes partagé)`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 2 — Installer Docker
  // ═══════════════════════════════════════════════════════════
  {
    id: 202, level: 'Débutant', icon: '⬇️', title: 'Installer Docker',
    desc: 'Installer Docker pas à pas selon ton système, le démarrer, et vérifier que tout fonctionne avec une image de test.',
    color: 'sky', colorHex: '#38bdf8',
    lessons: [
      {
        title: 'Choisir et installer la bonne version',
        content: `### Une seule chose à installer : Docker Desktop (ou Engine)

Sur **Windows** et **Mac**, on installe **Docker Desktop** : un seul programme avec une interface graphique qui installe tout le nécessaire. Sur **Linux**, on installe **Docker Engine** en ligne de commande.

| Ton système | À installer | Lien officiel |
|-------------|-------------|---------------|
| **Windows** | Docker Desktop | [Installer sur Windows](https://docs.docker.com/desktop/install/windows-install/) |
| **macOS** | Docker Desktop | [Installer sur Mac](https://docs.docker.com/desktop/install/mac-install/) |
| **Linux** | Docker Engine | [Installer sur Linux](https://docs.docker.com/engine/install/) |

### Les étapes (Windows / Mac)

1. Va sur le lien correspondant à ton système.
2. Télécharge l'installeur, lance-le, et **laisse-toi guider** (clique « Suivant », accepte les valeurs par défaut).
3. Redémarre l'ordinateur si on te le demande.

> 💡 Sur **Windows**, Docker a besoin de **WSL 2** (un mini-Linux intégré à Windows). L'installeur l'active pour toi dans la plupart des cas — laisse-le faire.

Prends ton temps : cette étape ne se fait qu'une fois.`,
        links: [
          { label: 'Docker Desktop — Windows', url: 'https://docs.docker.com/desktop/install/windows-install/' },
          { label: 'Docker Desktop — Mac', url: 'https://docs.docker.com/desktop/install/mac-install/' },
          { label: 'Docker Engine — Linux', url: 'https://docs.docker.com/engine/install/' },
          { label: 'Installer WSL 2 (Windows)', url: 'https://learn.microsoft.com/fr-fr/windows/wsl/install' },
        ],
      },
      {
        title: 'Démarrer Docker et vérifier',
        content: `### Lancer Docker

Sur **Windows / Mac** : ouvre l'application **Docker Desktop**. Une petite **baleine 🐳** apparaît (barre des tâches Windows, ou barre du haut sur Mac). Attends qu'elle arrête de « bouger » : ça veut dire que Docker est prêt.

Sur **Linux** : le service démarre tout seul après l'installation.

### Les deux commandes de vérification

Ouvre un terminal et tape :

\`\`\`bash
docker --version
\`\`\`

Tu dois voir une ligne du genre \`Docker version 27.x.x\`. Cela confirme que Docker est **installé**.

\`\`\`bash
docker run hello-world
\`\`\`

Cette commande télécharge une mini-image de test et la lance. Si tu vois **« Hello from Docker! »**, alors tout fonctionne : installé **et** opérationnel. 🎉

### Si ça coince

| Message | Cause probable | Solution |
|---------|----------------|----------|
| \`docker: command not found\` | Docker pas installé / terminal à redémarrer | Ferme et rouvre le terminal |
| \`Cannot connect to the Docker daemon\` | Docker n'est pas lancé | Ouvre Docker Desktop 🐳 et attends qu'il soit prêt |
| Erreur de virtualisation (Windows) | WSL 2 / virtualisation désactivée | Active WSL 2 (lien dans les ressources) |`,
        links: [
          { label: 'Docker — Premiers pas', url: 'https://docs.docker.com/get-started/' },
          { label: 'Dépannage Docker Desktop', url: 'https://docs.docker.com/desktop/troubleshoot/overview/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Installer Docker sur ta machine',
        scenario: "On met en place l'outil. Suis le guide officiel correspondant à ton système, puis démarre Docker.",
        steps: [
          "Ouvre le lien d'installation correspondant à **ton système** (voir la leçon).",
          "Télécharge, lance l'installeur et **laisse-toi guider** jusqu'au bout.",
          "Sur Windows/Mac, ouvre ensuite **Docker Desktop** et attends que la baleine 🐳 soit stable.",
          "Tu n'as encore rien à taper : l'objectif est juste d'avoir Docker installé et lancé.",
        ],
        hints: [
          "Sur Windows, accepte l'activation de **WSL 2** si elle est proposée.",
          "La baleine qui « bouge » signifie que Docker démarre encore : patiente quelques secondes.",
        ],
        solution: `# Pas de commande : suivre l'installeur officiel selon l'OS, puis
# lancer Docker Desktop (Windows/Mac). Sur Linux, le service démarre seul.`,
      },
      {
        title: 'Vérifier que Docker répond',
        scenario: "On confirme que Docker est bien installé en lui demandant sa version.",
        steps: [
          "Ouvre un terminal.",
          "Tape `docker --version` puis Entrée.",
          "Tu dois voir une ligne commençant par `Docker version ...`.",
          "Si tu vois `Cannot connect to the Docker daemon`, c'est que Docker Desktop n'est pas lancé : ouvre-le et réessaie.",
        ],
        hints: [
          "Deux tirets avant `version` : `--version`.",
          "Pas de réponse du tout ? Ferme et rouvre le terminal après l'installation.",
        ],
        solution: `docker --version
# → Docker version 27.x.x, build xxxxxxx`,
      },
      {
        title: 'Lancer hello-world (le grand moment)',
        scenario: "Ton tout premier conteneur ! Une image de test minuscule, juste pour voir le cycle complet fonctionner.",
        steps: [
          "Dans le terminal, tape `docker run hello-world`.",
          "Docker télécharge l'image (la première fois), puis la lance.",
          "Lis le message : tu dois voir **« Hello from Docker! »** suivi d'une explication de ce qui vient de se passer.",
          "Bravo : tu as téléchargé une image et lancé un conteneur. 🎉",
        ],
        hints: [
          "La première fois, Docker affiche « Unable to find image locally » puis le télécharge : c'est normal.",
          "Si ça bloque, vérifie que la baleine 🐳 est bien active (Docker lancé).",
        ],
        solution: `docker run hello-world
# → "Hello from Docker!" + explication du fonctionnement`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 3 — Ton premier conteneur
  // ═══════════════════════════════════════════════════════════
  {
    id: 203, level: 'Débutant', icon: '▶️', title: 'Ton premier conteneur',
    desc: 'Lancer un vrai serveur web depuis une image toute prête, comprendre les ports, et ouvrir le résultat dans ton navigateur.',
    color: 'teal', colorHex: '#2dd4bf',
    lessons: [
      {
        title: 'La commande docker run',
        content: `### Une seule commande pour tout lancer

\`docker run\` **crée et démarre** un conteneur à partir d'une image. C'est la commande que tu utiliseras le plus.

\`\`\`bash
docker run nginx
\`\`\`

Ici, Docker télécharge l'image \`nginx\` (un serveur web très répandu) si tu ne l'as pas, puis la lance. Mais tel quel, le conteneur « occupe » ton terminal et tu ne peux pas encore voir la page web. On va arranger ça avec deux options.

### Les options de base

| Option | Rôle | Mot-mémo |
|--------|------|----------|
| \`-d\` | Tourne **en arrière-plan** (te rend ton terminal) | « detached » |
| \`-p 8080:80\` | Relie un port de ta machine au conteneur | « port » |
| \`--name web\` | Donne un **nom** au conteneur | — |

\`\`\`bash
docker run -d -p 8080:80 --name web nginx
\`\`\`

Traduction : « lance nginx en arrière-plan, appelle-le *web*, et rends-le accessible sur le port 8080 de ma machine ».`,
        links: [
          { label: 'docker run — Référence', url: 'https://docs.docker.com/reference/cli/docker/container/run/' },
        ],
      },
      {
        title: 'Comprendre les ports (sans jargon)',
        content: `### Un port, c'est une « porte numérotée »

Ton ordinateur peut faire tourner plusieurs services en même temps. Pour ne pas les confondre, chacun écoute derrière une **porte numérotée** : c'est un **port**. Quand tu ouvres une page web, ton navigateur frappe à une de ces portes.

### Le mapping \`-p 8080:80\`

\`\`\`
   -p 8080:80
      │    │
      │    └── la porte DANS le conteneur (nginx écoute sur la 80)
      └─────── la porte SUR TA MACHINE (tu ouvres http://localhost:8080)
\`\`\`

À gauche : la porte que **tu** utilises dans ton navigateur. À droite : la porte que le programme utilise **à l'intérieur** du conteneur. Docker fait le lien entre les deux.

> 🧠 Sans \`-p\`, le conteneur tourne mais reste injoignable depuis ton navigateur : c'est comme un magasin ouvert dont la porte d'entrée n'est reliée à aucune rue.

### localhost ?

\`localhost\` veut dire « cet ordinateur-ci, le mien ». Donc **http://localhost:8080** signifie « frappe à la porte 8080 de mon propre ordinateur ». C'est là que ton conteneur répond.`,
        links: [
          { label: 'Publier des ports (officiel)', url: 'https://docs.docker.com/engine/network/#published-ports' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Lancer un serveur web et le voir dans le navigateur',
        scenario: "Le moment satisfaisant : faire tourner un vrai serveur web en une commande, et voir sa page s'afficher dans ton navigateur.",
        steps: [
          "Tape : `docker run -d -p 8080:80 --name web nginx`.",
          "Ouvre ton navigateur sur **http://localhost:8080**.",
          "Tu dois voir la page d'accueil de nginx (« Welcome to nginx! »). 🎉",
          "Laisse-le tourner pour l'instant : on s'en occupera au module suivant.",
        ],
        hints: [
          "`-d` = arrière-plan, `-p 8080:80` = porte 8080 chez toi → 80 dans le conteneur, `--name web` = nom.",
          "Page introuvable ? Vérifie que tu as bien tapé `8080` dans l'URL et que la commande n'a pas renvoyé d'erreur.",
        ],
        solution: `docker run -d -p 8080:80 --name web nginx
# puis ouvrir http://localhost:8080 dans le navigateur`,
      },
      {
        title: 'Changer la porte d\'entrée',
        scenario: "On rejoue le même conteneur mais sur une autre porte, pour bien comprendre que la partie de gauche, c'est toi qui la choisis.",
        steps: [
          "Lance un second nginx sur le port **8081** avec un autre nom : `docker run -d -p 8081:80 --name web2 nginx`.",
          "Ouvre **http://localhost:8081** : la même page nginx apparaît, mais via une autre porte.",
          "Tu as maintenant deux serveurs qui tournent en parallèle, sur 8080 et 8081.",
          "Constate : seul le numéro de **gauche** a changé ; à droite, nginx écoute toujours sur 80.",
        ],
        hints: [
          "Il faut un nom différent (`--name web2`) car deux conteneurs ne peuvent pas porter le même nom.",
          "Si le port 8081 est déjà pris, essaie 8082.",
        ],
        solution: `docker run -d -p 8081:80 --name web2 nginx
# ouvrir http://localhost:8081
# (web sur 8080 et web2 sur 8081 tournent en même temps)`,
      },
      {
        title: 'Un conteneur jetable avec --rm',
        scenario: "Parfois on veut juste lancer un truc vite fait, sans laisser de trace. L'option --rm supprime le conteneur dès qu'il a fini.",
        steps: [
          "Tape : `docker run --rm alpine echo \"Salut depuis un conteneur jetable\"`.",
          "Docker télécharge `alpine` (un mini-système Linux), affiche ton message, puis le conteneur s'arrête.",
          "Grâce à `--rm`, il est aussi **supprimé** automatiquement : aucune trace laissée.",
          "Relance-le : le message s'affiche à nouveau, instantanément (l'image est déjà téléchargée).",
        ],
        hints: [
          "`alpine` est une image Linux minuscule (~7 Mo), parfaite pour les tests rapides.",
          "Tout ce qui suit le nom de l'image est la commande à exécuter dans le conteneur (ici `echo ...`).",
        ],
        solution: `docker run --rm alpine echo "Salut depuis un conteneur jetable"
# → affiche le message, le conteneur démarre, finit, et se supprime tout seul`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 4 — Gérer ses conteneurs
  // ═══════════════════════════════════════════════════════════
  {
    id: 204, level: 'Débutant', icon: '🎛️', title: 'Gérer ses conteneurs',
    desc: 'Lister, lire les logs, entrer dans un conteneur, l\'arrêter, le relancer et le supprimer. Le quotidien de Docker.',
    color: 'blue', colorHex: '#3FA7D6',
    lessons: [
      {
        title: 'Voir ce qui tourne et lire les logs',
        content: `### Lister les conteneurs

\`\`\`bash
docker ps        # les conteneurs EN COURS
docker ps -a     # TOUS les conteneurs (même arrêtés)
\`\`\`

\`docker ps\` te montre un tableau : l'identifiant, l'image, le nom, l'état, les ports. C'est ton tableau de bord.

### Lire les logs (ce que le conteneur « raconte »)

Un programme écrit des messages pendant qu'il tourne (démarrage, requêtes reçues, erreurs…). Docker capture tout ça : ce sont les **logs**.

\`\`\`bash
docker logs web          # affiche les messages du conteneur "web"
docker logs -f web       # -f = suit en direct (comme un flux continu)
\`\`\`

> 💡 Les logs sont ton premier outil de diagnostic : quand quelque chose ne marche pas, c'est la première chose à regarder.`,
        links: [
          { label: 'docker ps — Référence', url: 'https://docs.docker.com/reference/cli/docker/container/ls/' },
          { label: 'docker logs — Référence', url: 'https://docs.docker.com/reference/cli/docker/container/logs/' },
        ],
      },
      {
        title: 'Entrer dans un conteneur',
        content: `### Ouvrir une porte vers l'intérieur

Un conteneur est comme une petite machine isolée. Parfois tu veux **entrer dedans** pour regarder les fichiers ou lancer une commande. On utilise \`docker exec\`.

\`\`\`bash
docker exec -it web bash
\`\`\`

- \`exec\` = exécuter une commande dans un conteneur **déjà lancé**
- \`-it\` = mode interactif + terminal (pour pouvoir taper dedans)
- \`web\` = le nom du conteneur
- \`bash\` = le programme à lancer (un shell, pour explorer)

Une fois dedans, l'invite change. Tu peux taper \`ls\`, te promener… Pour **ressortir**, tape \`exit\`.

> ⚠️ Certaines images minimalistes (comme \`alpine\`) n'ont pas \`bash\` : utilise \`sh\` à la place (\`docker exec -it nom sh\`).

### Pourquoi c'est utile ?

Pour vérifier qu'un fichier est bien là, regarder une configuration, ou diagnostiquer un souci — sans rien installer sur ta vraie machine.`,
        links: [
          { label: 'docker exec — Référence', url: 'https://docs.docker.com/reference/cli/docker/container/exec/' },
        ],
      },
      {
        title: 'Arrêter, relancer, supprimer',
        content: `### Le cycle de vie

\`\`\`
docker run    → crée ET démarre
docker stop   → arrête proprement
docker start  → redémarre un conteneur arrêté
docker rm     → supprime (le conteneur doit être arrêté)
\`\`\`

\`\`\`bash
docker stop web      # arrête "web" (il reste dans la liste docker ps -a)
docker start web     # le relance
docker rm web        # le supprime définitivement
\`\`\`

### Astuce : supprimer un conteneur encore en marche

\`\`\`bash
docker rm -f web     # -f force : arrête ET supprime d'un coup
\`\`\`

### Récapitulatif des commandes du quotidien

| Commande | Action |
|----------|--------|
| \`docker ps\` / \`docker ps -a\` | Lister (en cours / tous) |
| \`docker logs <nom>\` | Voir les messages |
| \`docker exec -it <nom> bash\` | Entrer dedans |
| \`docker stop <nom>\` | Arrêter |
| \`docker start <nom>\` | Redémarrer |
| \`docker rm <nom>\` | Supprimer |`,
        links: [
          { label: 'Cycle de vie des conteneurs', url: 'https://docs.docker.com/engine/containers/run/' },
          { label: 'Aide-mémoire Docker CLI (PDF)', url: 'https://docs.docker.com/get-started/docker_cheatsheet.pdf' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Faire l\'inventaire de tes conteneurs',
        scenario: "Tu as lancé plusieurs conteneurs aux modules précédents. On apprend à les retrouver et à lire le tableau de bord.",
        steps: [
          "Tape `docker ps` : tu vois les conteneurs **en cours** (ex. `web`, `web2`).",
          "Tape `docker ps -a` : tu vois aussi ceux qui sont **arrêtés** (ex. le `hello-world`).",
          "Repère les colonnes : `NAMES` (le nom), `STATUS` (l'état), `PORTS` (les portes).",
          "Note dans `notes.txt` combien de conteneurs sont en cours et combien sont arrêtés.",
        ],
        hints: [
          "`-a` veut dire « all » : montre absolument tout, même les conteneurs terminés.",
          "Un `hello-world` apparaît comme « Exited » : c'est normal, il a fini son travail et s'est arrêté.",
        ],
        solution: `docker ps        # conteneurs en cours
docker ps -a     # tous les conteneurs (même arrêtés)`,
      },
      {
        title: 'Lire les logs de ton serveur web',
        scenario: "Ton conteneur nginx écrit des messages à chaque visite. On va les regarder, puis les suivre en direct.",
        steps: [
          "Assure-toi que `web` tourne (sinon relance-le : `docker start web`).",
          "Tape `docker logs web` pour voir les messages déjà enregistrés.",
          "Lance le suivi en direct : `docker logs -f web`.",
          "Pendant ce temps, rafraîchis **http://localhost:8080** plusieurs fois : de nouvelles lignes apparaissent. Quitte le suivi avec **Ctrl + C**.",
        ],
        hints: [
          "`-f` = « follow » : reste à l'écoute et affiche les nouveaux messages au fur et à mesure.",
          "Ctrl + C arrête seulement le **suivi des logs**, pas le conteneur.",
        ],
        solution: `docker logs web        # messages enregistrés
docker logs -f web     # suivi en direct (rafraîchis la page pour voir des lignes)
# Ctrl + C pour arrêter le suivi`,
      },
      {
        title: 'Entrer dans le conteneur et explorer',
        scenario: "On ouvre une porte vers l'intérieur du conteneur nginx pour voir le fichier de la page d'accueil.",
        steps: [
          "Entre dans le conteneur : `docker exec -it web bash`.",
          "Une fois dedans (l'invite change), tape `ls /usr/share/nginx/html` : tu vois le fichier `index.html`.",
          "Affiche-le : `cat /usr/share/nginx/html/index.html` — c'est la page que tu vois dans le navigateur.",
          "Ressors du conteneur en tapant `exit`.",
        ],
        hints: [
          "`-it` rend la session interactive. Si `bash` ne marche pas, essaie `sh`.",
          "`cat` affiche le contenu d'un fichier. `exit` te ramène à ton terminal normal.",
        ],
        solution: `docker exec -it web bash
# dans le conteneur :
ls /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
exit`,
      },
      {
        title: 'Arrêter et faire le ménage',
        scenario: "On range : arrêter les conteneurs qui tournent et supprimer ceux dont on n'a plus besoin.",
        steps: [
          "Arrête `web` : `docker stop web`. Vérifie avec `docker ps` qu'il a disparu de la liste des actifs.",
          "Relance-le pour voir : `docker start web`, puis `docker ps`.",
          "Supprime `web2` (encore actif) d'un coup : `docker rm -f web2`.",
          "Vérifie avec `docker ps -a` que `web2` n'apparaît plus.",
        ],
        hints: [
          "Pour supprimer un conteneur arrêté : `docker rm <nom>`. S'il tourne encore, ajoute `-f`.",
          "`docker start` réutilise le même conteneur ; `docker run` en créerait un nouveau.",
        ],
        solution: `docker stop web
docker ps          # web n'est plus listé
docker start web   # il revient
docker rm -f web2  # supprime web2 même s'il tourne
docker ps -a       # web2 a disparu`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 5 — Les images Docker
  // ═══════════════════════════════════════════════════════════
  {
    id: 205, level: 'Débutant', icon: '🗂️', title: 'Les images Docker',
    desc: 'Télécharger, lister et nettoyer les images. Comprendre les versions (tags) et l\'espace disque.',
    color: 'indigo', colorHex: '#818cf8',
    lessons: [
      {
        title: 'Télécharger et lister des images',
        content: `### Télécharger sans lancer : docker pull

Jusqu'ici, \`docker run\` téléchargeait l'image automatiquement. Tu peux aussi la télécharger **à l'avance**, sans la lancer :

\`\`\`bash
docker pull python:3.12      # télécharge Python 3.12
docker pull nginx            # télécharge nginx (version latest par défaut)
\`\`\`

### Lister ce que tu as déjà

\`\`\`bash
docker images
\`\`\`

Tu obtiens un tableau : nom du dépôt (\`REPOSITORY\`), version (\`TAG\`), identifiant et **taille**. Chaque image occupe de l'espace sur ton disque.

### Les versions (tags) en clair

\`\`\`
python : 3.12
└──┬──┘  └─┬─┘
  nom    version (tag)
\`\`\`

Préciser une version (\`python:3.12\`) te garantit toujours **la même** image. \`latest\` prend la plus récente du moment — pratique pour bricoler, mais imprévisible sur le long terme.`,
        links: [
          { label: 'docker pull — Référence', url: 'https://docs.docker.com/reference/cli/docker/image/pull/' },
          { label: 'docker images — Référence', url: 'https://docs.docker.com/reference/cli/docker/image/ls/' },
        ],
      },
      {
        title: 'Faire le ménage dans les images',
        content: `### Les images s'accumulent

À force de tester, les images remplissent ton disque. Heureusement, le ménage est simple.

\`\`\`bash
docker rmi nginx         # supprime l'image nginx (rmi = remove image)
\`\`\`

> ⚠️ Tu ne peux pas supprimer une image si un conteneur l'utilise encore. Supprime d'abord le conteneur (\`docker rm\`), puis l'image.

### Le grand nettoyage

\`\`\`bash
docker image prune        # supprime les images "dangling" (orphelines)
docker image prune -a     # supprime TOUTES les images non utilisées
\`\`\`

\`prune\` veut dire « élaguer ». C'est la commande pour récupérer de l'espace disque d'un coup.

### Voir l'espace utilisé

\`\`\`bash
docker system df          # résumé de l'espace pris par Docker
\`\`\`

Cette commande te montre combien de place prennent les images, les conteneurs et les volumes.`,
        links: [
          { label: 'Nettoyer (prune) — officiel', url: 'https://docs.docker.com/engine/manage-resources/pruning/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Télécharger une image à l\'avance',
        scenario: "On récupère une image sans la lancer, puis on vérifie qu'elle est bien arrivée sur la machine.",
        steps: [
          "Tape `docker pull python:3.12` et observe le téléchargement par « couches ».",
          "Liste tes images : `docker images`.",
          "Repère la ligne `python` avec le tag `3.12` et regarde sa taille.",
          "Compare avec une version allégée : `docker pull python:3.12-alpine`, puis `docker images` — la variante alpine est bien plus petite.",
        ],
        hints: [
          "Le format est `nom:tag`. Sans tag, Docker prend `latest`.",
          "Les variantes `-alpine` sont des versions minimalistes, donc plus légères.",
        ],
        solution: `docker pull python:3.12
docker images
docker pull python:3.12-alpine
docker images     # compare les tailles des deux variantes`,
      },
      {
        title: 'Inspecter ce que tu as et l\'espace pris',
        scenario: "On fait le point : quelles images sont présentes, et combien de place Docker occupe.",
        steps: [
          "Tape `docker images` pour la liste complète.",
          "Tape `docker system df` pour voir l'espace total utilisé par Docker (images, conteneurs, volumes).",
          "Note dans `notes.txt` l'image la plus volumineuse que tu possèdes.",
          "Repère la différence de taille entre une image complète et sa variante `-alpine`.",
        ],
        hints: [
          "`docker system df` = « disk free » version Docker : un résumé clair de l'espace.",
          "La colonne SIZE de `docker images` donne la taille de chaque image.",
        ],
        solution: `docker images
docker system df
# → identifier l'image la plus lourde et comparer avec les variantes alpine`,
      },
      {
        title: 'Récupérer de l\'espace disque',
        scenario: "On nettoie les images devenues inutiles pour libérer de la place.",
        steps: [
          "Supprime une image précise dont tu n'as plus besoin, par ex. : `docker rmi python:3.12`.",
          "Si Docker refuse (un conteneur l'utilise), supprime d'abord ce conteneur avec `docker rm -f <nom>`, puis réessaie.",
          "Lance le grand nettoyage des images inutilisées : `docker image prune -a` (tape `y` pour confirmer).",
          "Refais `docker images` et `docker system df` pour constater l'espace récupéré.",
        ],
        hints: [
          "`rmi` = remove image. `prune -a` supprime toutes les images qu'aucun conteneur n'utilise.",
          "Le ménage ne touche pas aux images utilisées par un conteneur existant : c'est sans risque.",
        ],
        solution: `docker rmi python:3.12        # supprime une image précise
# si bloqué : docker rm -f <conteneur> puis réessaie
docker image prune -a         # nettoie tout l'inutilisé (confirme avec y)
docker images                 # vérifie le résultat`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 6 — Ta première image maison (HTML fourni)
  // ═══════════════════════════════════════════════════════════
  {
    id: 206, level: 'Débutant +', icon: '📦', title: 'Ta première image maison',
    desc: 'Construire ta propre image avec un Dockerfile simple : une page web personnalisée servie par nginx. Tout le code est fourni.',
    color: 'green', colorHex: '#59CD90',
    lessons: [
      {
        title: 'Le Dockerfile, ta recette',
        content: `### Jusqu'ici tu utilisais les recettes des autres

Tu as lancé des images toutes prêtes (nginx, alpine…). Maintenant tu vas **écrire ta propre recette** pour fabriquer **ta** image. Cette recette s'écrit dans un fichier texte nommé exactement \`Dockerfile\` (avec un D majuscule, sans extension).

### La recette la plus simple du monde

On part de nginx, et on remplace sa page d'accueil par la nôtre :

\`\`\`dockerfile
# On part de l'image nginx déjà toute prête
FROM nginx

# On copie NOTRE page dans le dossier que nginx affiche
COPY index.html /usr/share/nginx/html/index.html
\`\`\`

Deux instructions, c'est tout :

| Instruction | Rôle |
|-------------|------|
| \`FROM\` | L'image de départ (on construit par-dessus) |
| \`COPY\` | Copie un fichier de ta machine **vers** l'image |

> 🧠 Tu ne pars jamais de rien : \`FROM\` te donne une base solide, et tu ajoutes juste ta touche.`,
        links: [
          { label: 'Dockerfile — Référence', url: 'https://docs.docker.com/reference/dockerfile/' },
        ],
      },
      {
        title: 'Construire (build) puis lancer',
        content: `### De la recette à l'image : docker build

\`\`\`bash
docker build -t ma-page .
\`\`\`

Décortiquons :

| Élément | Signification |
|---------|---------------|
| \`build\` | « construis une image à partir du Dockerfile » |
| \`-t ma-page\` | donne le **nom** \`ma-page\` à l'image (\`-t\` = tag) |
| \`.\` | le **point** = « le Dockerfile est dans le dossier courant » |

> ⚠️ N'oublie pas le **point** à la fin : il indique à Docker où chercher. C'est l'oubli n°1 des débutants.

### Lancer ton image

\`\`\`bash
docker run -d -p 8080:80 --name page ma-page
\`\`\`

Puis ouvre **http://localhost:8080** : tu vois **ta** page, pas celle de nginx par défaut. Tu viens de fabriquer et lancer ta propre image. 🎉

### Modifier et reconstruire

Change ton \`index.html\`, puis **reconstruis** : \`docker build -t ma-page .\`. Supprime l'ancien conteneur (\`docker rm -f page\`) et relance. Tes changements apparaissent. C'est la boucle de base du développement avec Docker.`,
        links: [
          { label: 'docker build — Référence', url: 'https://docs.docker.com/reference/cli/docker/buildx/build/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Créer les deux fichiers (code fourni)',
        scenario: "On prépare le dossier : une page HTML toute prête et son Dockerfile. Copie-colle simplement le contenu fourni — tu n'as rien à inventer.",
        steps: [
          "Dans `docker-cours`, crée un dossier `ma-page` et entre dedans (`mkdir ma-page` puis `cd ma-page`).",
          "Crée un fichier `index.html` et colle dedans le code HTML fourni dans la solution.",
          "Crée un fichier `Dockerfile` (sans extension) et colle dedans les deux lignes fournies.",
          "Vérifie avec `ls` que les deux fichiers sont bien présents côte à côte.",
        ],
        hints: [
          "Pour créer/éditer un fichier, tu peux utiliser un éditeur de texte (Bloc-notes, TextEdit, VS Code) et l'enregistrer dans le dossier `ma-page`.",
          "Le Dockerfile s'appelle exactement `Dockerfile`, sans `.txt` à la fin.",
        ],
        solution: `<!-- index.html -->
<!DOCTYPE html>
<html lang="fr">
  <head><meta charset="utf-8"><title>Ma première image</title></head>
  <body style="font-family:sans-serif;text-align:center;padding:4rem">
    <h1>🐳 Bravo !</h1>
    <p>Cette page est servie par MON image Docker.</p>
  </body>
</html>

# Dockerfile
FROM nginx
COPY index.html /usr/share/nginx/html/index.html`,
      },
      {
        title: 'Construire ton image et l\'ouvrir',
        scenario: "On transforme la recette en image, puis on lance un conteneur pour admirer le résultat dans le navigateur.",
        steps: [
          "Depuis le dossier `ma-page`, construis l'image : `docker build -t ma-page .` (n'oublie pas le point !).",
          "Vérifie qu'elle existe : `docker images` (cherche `ma-page`).",
          "Lance-la : `docker run -d -p 8080:80 --name page ma-page`.",
          "Ouvre **http://localhost:8080** : ta page personnalisée s'affiche. 🎉",
        ],
        hints: [
          "Le point final de `docker build -t ma-page .` est obligatoire : il indique où est le Dockerfile.",
          "Si le port 8080 est occupé, choisis-en un autre (ex. `-p 8090:80` et ouvre 8090).",
        ],
        solution: `docker build -t ma-page .
docker images                 # ma-page apparaît
docker run -d -p 8080:80 --name page ma-page
# ouvrir http://localhost:8080`,
      },
      {
        title: 'Modifier la page et reconstruire',
        scenario: "On boucle le cycle de développement : changer le contenu, reconstruire l'image, relancer, et voir la différence.",
        steps: [
          "Ouvre `index.html` et change le texte du titre (par ex. mets ton prénom).",
          "Reconstruis l'image : `docker build -t ma-page .`.",
          "Supprime l'ancien conteneur : `docker rm -f page`.",
          "Relance : `docker run -d -p 8080:80 --name page ma-page` et rafraîchis le navigateur : ton nouveau texte apparaît.",
        ],
        hints: [
          "Un conteneur garde la version de l'image au moment où il a été lancé : il faut le recréer pour voir les changements.",
          "L'ordre : modifier → build → rm -f l'ancien → run le nouveau.",
        ],
        solution: `# 1. modifier index.html (changer le titre)
docker build -t ma-page .
docker rm -f page
docker run -d -p 8080:80 --name page ma-page
# rafraîchir http://localhost:8080`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 7 — Une image pour une vraie app (code Node fourni)
  // ═══════════════════════════════════════════════════════════
  {
    id: 207, level: 'Intermédiaire', icon: '🍳', title: 'Une image pour une vraie app',
    desc: 'Conteneuriser une petite application (code fourni) : WORKDIR, dépendances, ordre du cache et .dockerignore.',
    color: 'emerald', colorHex: '#10b981',
    lessons: [
      {
        title: 'Les instructions d\'un vrai Dockerfile',
        content: `### Une app a besoin de plus que « copier un fichier »

Une vraie application doit : partir d'un environnement (ici Node.js), installer ses **dépendances**, copier son code, puis être **lancée**. Voici la recette complète, que tu n'as qu'à comprendre dans les grandes lignes (le code de l'app est fourni) :

\`\`\`dockerfile
# Environnement de départ : Node.js, version légère
FROM node:20-alpine

# Le dossier de travail à l'intérieur de l'image
WORKDIR /app

# On copie d'abord la liste des dépendances
COPY package*.json ./

# On installe les dépendances
RUN npm install

# Puis on copie le reste du code
COPY . .

# On documente le port utilisé
EXPOSE 3000

# La commande lancée au démarrage du conteneur
CMD ["node", "server.js"]
\`\`\`

### À quoi sert chaque ligne

| Instruction | Rôle |
|-------------|------|
| \`WORKDIR /app\` | Définit le dossier de travail dans l'image |
| \`COPY\` | Copie des fichiers vers l'image |
| \`RUN\` | Exécute une commande **pendant la construction** (ex. installer) |
| \`EXPOSE\` | Documente le port (purement indicatif) |
| \`CMD\` | La commande lancée **quand le conteneur démarre** |`,
        links: [
          { label: 'Dockerfile — Référence', url: 'https://docs.docker.com/reference/dockerfile/' },
          { label: 'Bonnes pratiques Dockerfile', url: 'https://docs.docker.com/build/building/best-practices/' },
        ],
      },
      {
        title: 'L\'ordre des lignes et le cache',
        content: `### Pourquoi copier package.json AVANT le reste ?

Docker garde en mémoire (en **cache**) chaque étape. Si une étape ne change pas, il la réutilise au lieu de tout refaire — donc des builds beaucoup plus rapides. Mais dès qu'une étape change, **toutes les suivantes** sont refaites.

❌ **Mauvais ordre** — la moindre modif du code réinstalle toutes les dépendances :

\`\`\`dockerfile
COPY . .
RUN npm install
\`\`\`

✅ **Bon ordre** — les dépendances ne se réinstallent que si \`package.json\` change :

\`\`\`dockerfile
COPY package*.json ./
RUN npm install
COPY . .
\`\`\`

> 🧠 Règle d'or : place ce qui change **rarement** (les dépendances) **avant** ce qui change **souvent** (ton code).

### Le fichier .dockerignore

Comme un \`.gitignore\`, il évite de copier des fichiers inutiles ou sensibles dans l'image :

\`\`\`
node_modules
.git
.env
*.log
\`\`\`

Résultat : build plus rapide, image plus légère, et pas de fuite de secrets.`,
        links: [
          { label: 'Build cache', url: 'https://docs.docker.com/build/cache/' },
          { label: '.dockerignore', url: 'https://docs.docker.com/build/concepts/context/#dockerignore-files' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Préparer l\'app (tout le code est fourni)',
        scenario: "On crée une mini-application web. Copie-colle simplement les trois fichiers fournis : tu n'as pas besoin de savoir programmer.",
        steps: [
          "Dans `docker-cours`, crée un dossier `mon-app` et entre dedans.",
          "Crée `package.json` et colle le contenu fourni dans la solution.",
          "Crée `server.js` et colle le contenu fourni (un mini-serveur qui répond « Bonjour »).",
          "Crée le `Dockerfile` avec le contenu fourni. Vérifie avec `ls` que les trois fichiers sont là.",
        ],
        hints: [
          "Ces fichiers sont volontairement minuscules : ils utilisent uniquement Node, sans dépendance externe.",
          "Respecte bien les noms : `package.json`, `server.js`, `Dockerfile`.",
        ],
        solution: `// package.json
{
  "name": "mon-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": { "start": "node server.js" }
}

// server.js
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Bonjour depuis mon app conteneurisée ! 🐳\\n");
});
server.listen(3000, () => console.log("App à l'écoute sur le port 3000"));

# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        title: 'Construire et lancer ton app',
        scenario: "On fabrique l'image de l'application et on vérifie qu'elle répond dans le navigateur.",
        steps: [
          "Depuis `mon-app`, construis : `docker build -t mon-app .`.",
          "Lance : `docker run -d -p 3000:3000 --name app mon-app`.",
          "Ouvre **http://localhost:3000** : tu dois lire « Bonjour depuis mon app conteneurisée ! ».",
          "Regarde les logs de démarrage : `docker logs app` (tu verras « App à l'écoute sur le port 3000 »).",
        ],
        hints: [
          "Ici le port interne **et** externe valent 3000 : `-p 3000:3000`.",
          "Si « port already allocated », un autre conteneur occupe 3000 : change à gauche, ex. `-p 3001:3000`.",
        ],
        solution: `docker build -t mon-app .
docker run -d -p 3000:3000 --name app mon-app
# ouvrir http://localhost:3000
docker logs app`,
      },
      {
        title: 'Ajouter un .dockerignore',
        scenario: "On évite de copier des fichiers inutiles dans l'image, pour des builds plus rapides et plus propres.",
        steps: [
          "À la racine de `mon-app`, crée un fichier nommé `.dockerignore`.",
          "Colle dedans la liste fournie (un motif par ligne).",
          "Reconstruis : `docker build -t mon-app .`.",
          "Vérifie la taille avec `docker images` : l'image reste légère car les fichiers inutiles ne sont pas embarqués.",
        ],
        hints: [
          "Un `.dockerignore` se rédige comme un `.gitignore` : un motif par ligne, sans virgule.",
          "Le point au début du nom est important : `.dockerignore`.",
        ],
        solution: `# .dockerignore
node_modules
.git
.env
*.log
Dockerfile`,
      },
      {
        title: 'Comprendre le cache en réordonnant',
        scenario: "On observe concrètement l'effet de l'ordre des lignes sur la vitesse de reconstruction.",
        steps: [
          "Reconstruis une fois : `docker build -t mon-app .` (Docker met les étapes en cache).",
          "Modifie une ligne dans `server.js` (par ex. change le texte « Bonjour »).",
          "Reconstruis : `docker build -t mon-app .`. Observe que `npm install` est marqué `CACHED` (réutilisé) : seules les étapes après le `COPY . .` sont refaites.",
          "Compare mentalement avec le « mauvais ordre » de la leçon : là, chaque modif du code réinstallerait tout.",
        ],
        hints: [
          "Le mot `CACHED` dans la sortie du build signifie « étape réutilisée, non refaite ».",
          "C'est parce que `COPY package*.json` est avant `COPY . .` que l'installation reste en cache.",
        ],
        solution: `docker build -t mon-app .     # 1er build : tout s'exécute
# modifier server.js
docker build -t mon-app .     # 2e build : "npm install" est CACHED
# → seules les étapes après COPY . . sont reconstruites`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 8 — Alléger ses images : le multi-stage
  // ═══════════════════════════════════════════════════════════
  {
    id: 208, level: 'Intermédiaire', icon: '🪶', title: 'Alléger ses images',
    desc: 'Images plus légères et plus sûres : choisir sa base, réduire les couches, et le multi-stage build.',
    color: 'lime', colorHex: '#a3e635',
    lessons: [
      {
        title: 'Pourquoi viser léger ?',
        content: `### Une grosse image coûte cher

Une image \`node:20\` complète pèse ~1 Go. La même en \`node:20-alpine\` pèse ~130 Mo. La différence compte :

- **Téléchargements plus rapides** (déploiements, CI)
- **Moins de failles** (moins de logiciels installés = moins de surface d'attaque)
- **Moins d'espace** de stockage

### Choisir la bonne base

| Image de base | Taille | Usage typique |
|---------------|--------|---------------|
| \`ubuntu\` | ~75 Mo | Besoin d'un OS complet |
| \`debian-slim\` | ~30 Mo | Bon compromis |
| \`alpine\` | ~7 Mo | Minimaliste (très répandu) |
| \`distroless\` | ~2 Mo | Sans shell, ultra-sécurisé |

> 💡 Pour débuter, garde le réflexe \`-alpine\` : c'est le meilleur rapport simplicité / légèreté.

### Regrouper les commandes RUN

Chaque \`RUN\` crée une couche. On combine et on nettoie dans la **même** couche :

\`\`\`dockerfile
# ✅ une seule couche, propre
RUN apt-get update && \\
    apt-get install -y curl && \\
    rm -rf /var/lib/apt/lists/*
\`\`\``,
        links: [
          { label: 'Choisir son image de base', url: 'https://docs.docker.com/build/building/best-practices/#choose-the-right-base-image' },
        ],
      },
      {
        title: 'Le multi-stage build',
        content: `### L'idée : construire dans un atelier, livrer une boîte vide

Souvent, tu as besoin d'outils **pour construire** ton app (compilateur, npm, dépendances de dev) que tu ne veux **pas** garder dans l'image finale. Le **multi-stage build** sépare l'étape de construction de l'étape d'exécution.

\`\`\`dockerfile
# ─── Étape 1 : CONSTRUCTION ───
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build         # produit le dossier /app/dist

# ─── Étape 2 : EXÉCUTION ───
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

L'image finale ne contient **que** nginx + les fichiers construits. Tout l'environnement Node (lourd) est jeté.

### Le mot-clé COPY --from

\`COPY --from=builder\` récupère des fichiers d'une étape précédente. On nomme une étape avec \`AS nom\`.

> 🧠 En une phrase : on bricole dans le premier étage, et on n'emporte que le résultat fini dans le second.`,
        links: [
          { label: 'Multi-stage builds', url: 'https://docs.docker.com/build/building/multi-stage/' },
        ],
      },
      {
        title: 'Sécurité : ne pas tourner en root',
        content: `### Par défaut, un conteneur est administrateur

C'est risqué : si un attaquant s'y introduit, il a tous les droits. On bascule sur un utilisateur sans privilèges :

\`\`\`dockerfile
FROM node:20-alpine
WORKDIR /app
COPY --chown=node:node . .
RUN npm ci --omit=dev
USER node                  # ← bascule en utilisateur non-privilégié
CMD ["node", "server.js"]
\`\`\`

L'image \`node\` fournit déjà un utilisateur \`node\` prêt à l'emploi.

### Épingler les versions

\`\`\`dockerfile
FROM node:20.11.1-alpine3.19   # ✅ reproductible, stable
FROM node:latest                # ❌ peut changer du jour au lendemain
\`\`\`

### Petite checklist sécurité

| Règle | Pourquoi |
|-------|----------|
| Tag de version précis | Reproductibilité |
| \`USER\` non-root | Limite les dégâts en cas d'attaque |
| Aucun secret dans l'image | Les couches sont lisibles par tous |
| Image de base minimale | Moins de failles |`,
        links: [
          { label: 'Bonnes pratiques de sécurité', url: 'https://docs.docker.com/build/building/best-practices/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Comparer deux bases : complète vs alpine',
        scenario: "Avant le multi-stage, on touche du doigt l'impact de la base choisie sur la taille de l'image.",
        steps: [
          "Crée un dossier `compare`, et dedans deux fichiers Dockerfile : `Dockerfile.full` avec `FROM node:20` et `Dockerfile.slim` avec `FROM node:20-alpine` (ajoute `CMD [\"node\", \"-v\"]` aux deux).",
          "Construis les deux : `docker build -f Dockerfile.full -t demo:full .` puis `docker build -f Dockerfile.slim -t demo:slim .`.",
          "Compare avec `docker images | grep demo` : l'écart de taille est énorme.",
          "Note la différence dans `notes.txt`.",
        ],
        hints: [
          "L'option `-f` permet de choisir quel fichier Dockerfile utiliser.",
          "`node:20` ≈ 1 Go, `node:20-alpine` ≈ 130 Mo.",
        ],
        solution: `# Dockerfile.full
FROM node:20
CMD ["node", "-v"]

# Dockerfile.slim
FROM node:20-alpine
CMD ["node", "-v"]

docker build -f Dockerfile.full -t demo:full .
docker build -f Dockerfile.slim -t demo:slim .
docker images | grep demo`,
      },
      {
        title: 'Construire une image multi-stage (code fourni)',
        scenario: "Tu sers une app web en production via nginx. On utilise un Dockerfile multi-stage : Node construit, nginx sert. Le Dockerfile complet est fourni.",
        steps: [
          "Dans un projet front (ou un dossier avec un `npm run build` qui produit `dist/`), crée le `Dockerfile` fourni dans la solution.",
          "Construis : `docker build -t front .`.",
          "Compare la taille avec `docker images` : bien plus petite qu'une image Node complète.",
          "Lance : `docker run -d -p 8080:80 --name front front` et ouvre http://localhost:8080.",
        ],
        hints: [
          "La première étape est nommée `AS builder` pour pouvoir la référencer ensuite.",
          "`COPY --from=builder` ne récupère que le dossier construit, pas tout Node.",
        ],
        solution: `FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
      },
      {
        title: 'Durcir ton image (utilisateur non-root)',
        scenario: "Un audit signale que ton image tourne en root. On la fait tourner en utilisateur non-privilégié, puis on vérifie.",
        steps: [
          "Reprends le Dockerfile de ton app Node (module 7) et ajoute `USER node` avant le `CMD`.",
          "Utilise `COPY --chown=node:node` pour que les fichiers appartiennent à cet utilisateur.",
          "Reconstruis l'image : `docker build -t mon-app .`.",
          "Vérifie : `docker run --rm mon-app whoami` doit afficher `node`, pas `root`.",
        ],
        hints: [
          "L'image officielle `node` fournit déjà un utilisateur nommé `node`.",
          "Place `USER node` après les installations qui nécessitent les droits root.",
        ],
        solution: `FROM node:20-alpine
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]

# Vérifier : docker run --rm mon-app whoami  → node`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 9 — Garder ses données : les volumes
  // ═══════════════════════════════════════════════════════════
  {
    id: 209, level: 'Intermédiaire', icon: '🗄️', title: 'Garder ses données : les volumes',
    desc: 'Empêcher la perte de données quand un conteneur est supprimé, grâce aux volumes.',
    color: 'purple', colorHex: '#AA7DCE',
    lessons: [
      {
        title: 'Le problème de l\'éphémère',
        content: `### Quand un conteneur meurt, ses données aussi

Par défaut, tout ce qu'un conteneur écrit disparaît avec lui. Pour une base de données, c'est inacceptable : tu ne veux pas perdre tes clients à chaque redémarrage.

Les **volumes** conservent les données **en dehors** du cycle de vie du conteneur. Le conteneur peut être supprimé et recréé : les données restent.

### Les types de stockage

| Type | Géré par | Usage |
|------|----------|-------|
| **Volume nommé** | Docker | Bases de données, données de production |
| **Bind mount** | Toi (un dossier de ta machine) | Développement (modif en direct) |
| **tmpfs** | La mémoire vive | Données temporaires sensibles |

### Volume nommé (le plus courant)

\`\`\`bash
docker volume create pgdata
docker run -d --name db \\
  -v pgdata:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:16
\`\`\`

Le \`-v pgdata:/chemin\` relie le volume \`pgdata\` au dossier où Postgres range ses données.`,
        links: [
          { label: 'Volumes', url: 'https://docs.docker.com/engine/storage/volumes/' },
        ],
      },
      {
        title: 'Bind mount : ton dossier dans le conteneur',
        content: `### Travailler en direct depuis ta machine

En développement, tu veux voir tes modifications **immédiatement**, sans reconstruire l'image. Le **bind mount** relie un dossier de ta machine à un dossier du conteneur.

\`\`\`bash
# Monte le dossier courant dans le conteneur
docker run -v $(pwd):/app -p 3000:3000 mon-app
\`\`\`

Toute modification d'un fichier local est vue **instantanément** à l'intérieur du conteneur. Parfait pour coder.

### Volume nommé vs bind mount

| | Volume nommé | Bind mount |
|--|--------------|------------|
| Où sont les données | Géré par Docker | Un dossier précis de ta machine |
| Idéal pour | Production, bases de données | Développement |

### Inspecter et nettoyer

\`\`\`bash
docker volume ls               # lister les volumes
docker volume inspect pgdata   # détails d'un volume
docker volume rm pgdata        # supprimer un volume
docker volume prune            # nettoyer les volumes inutilisés
\`\`\``,
        links: [
          { label: 'Bind mounts', url: 'https://docs.docker.com/engine/storage/bind-mounts/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Une base de données qui garde ses données',
        scenario: "On lance PostgreSQL avec un volume, on crée une table, on supprime le conteneur, on le relance : la table doit toujours être là.",
        steps: [
          "Lance Postgres avec un volume : `docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16`.",
          "Crée une table : `docker exec -it db psql -U postgres -c \"CREATE TABLE test(id int);\"`.",
          "Supprime le conteneur : `docker rm -f db`.",
          "Relance exactement la même commande `run` : la table `test` existe toujours (vérifie avec `\\dt` dans psql). 🎉",
        ],
        hints: [
          "Le dossier de données de Postgres est `/var/lib/postgresql/data`.",
          "Comme le volume `pgdata` survit à la suppression du conteneur, les données persistent.",
        ],
        solution: `docker run -d --name db \\
  -v pgdata:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:16
docker exec -it db psql -U postgres -c "CREATE TABLE test(id int);"
docker rm -f db
# relancer la même commande run → la table "test" est toujours là`,
      },
      {
        title: 'Voir la différence SANS volume',
        scenario: "Pour bien comprendre, on refait l'expérience mais sans volume : cette fois, les données disparaissent.",
        steps: [
          "Lance Postgres **sans** volume : `docker run -d --name db2 -e POSTGRES_PASSWORD=secret postgres:16`.",
          "Crée une table : `docker exec -it db2 psql -U postgres -c \"CREATE TABLE temp(id int);\"`.",
          "Supprime et recrée le conteneur (même commande `run`), puis liste les tables : `docker exec -it db2 psql -U postgres -c \"\\dt\"`.",
          "Constat : la table `temp` a disparu. Sans volume, rien ne survit.",
        ],
        hints: [
          "C'est la même manip qu'avant, mais sans l'option `-v`.",
          "Ce contraste est la meilleure façon de retenir l'utilité des volumes.",
        ],
        solution: `docker run -d --name db2 -e POSTGRES_PASSWORD=secret postgres:16
docker exec -it db2 psql -U postgres -c "CREATE TABLE temp(id int);"
docker rm -f db2
docker run -d --name db2 -e POSTGRES_PASSWORD=secret postgres:16
docker exec -it db2 psql -U postgres -c "\\dt"   # → temp a disparu`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 10 — Réseaux : faire dialoguer les conteneurs
  // ═══════════════════════════════════════════════════════════
  {
    id: 210, level: 'Intermédiaire', icon: '🔌', title: 'Réseaux : faire dialoguer les conteneurs',
    desc: 'Connecter plusieurs conteneurs entre eux et les faire se joindre par leur nom.',
    color: 'violet', colorHex: '#8b5cf6',
    lessons: [
      {
        title: 'Mettre des conteneurs sur un même réseau',
        content: `### Par défaut, chaque conteneur est isolé

Pour qu'une API parle à sa base de données, il faut les placer sur un **réseau commun**.

\`\`\`bash
# Créer un réseau
docker network create app-net

# Lancer deux conteneurs sur ce réseau
docker run -d --name db --network app-net -e POSTGRES_PASSWORD=secret postgres:16
docker run -d --name api --network app-net mon-api
\`\`\`

### La résolution par nom (l'annuaire interne)

Sur un réseau personnalisé, Docker fournit un **annuaire** : un conteneur peut joindre un autre **par son nom**.

\`\`\`
postgres://db:5432/mabase
            ↑
   "db" = nom du conteneur, résolu automatiquement par Docker
\`\`\`

> 🧠 C'est pour ça que dans la config d'une API on écrit \`host: db\` (le nom du conteneur) et **non** \`localhost\`. Entre conteneurs, \`localhost\` voudrait dire « moi-même ».

### Les types de réseaux

| Type | Usage |
|------|-------|
| \`bridge\` | Par défaut, conteneurs sur une même machine |
| \`host\` | Partage le réseau de la machine (pas d'isolation) |
| \`none\` | Aucun réseau |
| \`overlay\` | Plusieurs machines (cluster) |`,
        links: [
          { label: 'Networking', url: 'https://docs.docker.com/engine/network/' },
          { label: 'Réseaux bridge', url: 'https://docs.docker.com/engine/network/drivers/bridge/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Deux conteneurs qui se voient par leur nom',
        scenario: "On crée un réseau, on y place une base et un conteneur de test, et on vérifie qu'ils se joignent par leur nom (sans adresse IP).",
        steps: [
          "Crée le réseau : `docker network create app-net`.",
          "Lance la base dessus : `docker run -d --name db --network app-net -e POSTGRES_PASSWORD=secret postgres:16`.",
          "Lance un conteneur de test sur le même réseau : `docker run --rm -it --network app-net busybox`.",
          "Depuis busybox, tape `ping db` : le nom `db` est résolu et répond. Quitte avec Ctrl + C puis `exit`.",
        ],
        hints: [
          "Chaque `docker run` doit contenir `--network app-net`.",
          "`busybox` est une mini-image avec des outils réseau de base comme `ping`.",
        ],
        solution: `docker network create app-net
docker run -d --name db --network app-net -e POSTGRES_PASSWORD=secret postgres:16
docker run --rm -it --network app-net busybox
# dans busybox :
ping db        # → répond, le nom est résolu
exit`,
      },
      {
        title: 'Vérifier l\'isolation par défaut',
        scenario: "On montre l'inverse : sans réseau commun, deux conteneurs ne se voient pas par leur nom.",
        steps: [
          "Lance un conteneur de test SANS `--network` : `docker run --rm -it busybox`.",
          "Tente `ping db` : cette fois, le nom n'est **pas** résolu (échec ou inconnu).",
          "Quitte avec `exit`. Conclusion : la résolution par nom n'existe que sur un réseau personnalisé partagé.",
          "Inspecte ton réseau pour voir qui y est connecté : `docker network inspect app-net`.",
        ],
        hints: [
          "Sans réseau commun, les conteneurs sont isolés les uns des autres.",
          "`docker network inspect` liste les conteneurs rattachés à un réseau.",
        ],
        solution: `docker run --rm -it busybox
ping db        # → ne résout pas (pas de réseau commun)
exit
docker network inspect app-net   # voir les conteneurs rattachés`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 11 — Docker Compose
  // ═══════════════════════════════════════════════════════════
  {
    id: 211, level: 'Intermédiaire', icon: '🎼', title: 'Docker Compose',
    desc: 'Décrire et lancer toute une stack (plusieurs conteneurs) avec un seul fichier et une seule commande.',
    color: 'pink', colorHex: '#AA7DCE',
    lessons: [
      {
        title: 'Pourquoi Compose ?',
        content: `### Lancer 4 conteneurs à la main, c'est pénible

Une vraie application, c'est plusieurs services : un front, une API, une base, un cache… Les lancer un par un (réseaux, volumes, variables…) devient vite ingérable.

**Docker Compose** décrit toute la « stack » dans **un seul fichier** \`compose.yaml\`, et tout démarre avec **une seule commande**.

\`\`\`bash
docker compose up -d      # tout démarre
docker compose down       # tout s'arrête et se nettoie
\`\`\`

### Structure d'un fichier compose

\`\`\`yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://db:5432/app

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
\`\`\`

> 🧠 Compose crée **automatiquement** un réseau commun : tes services se joignent par leur nom (\`db\`, \`web\`…), sans config réseau manuelle.`,
        links: [
          { label: 'Docker Compose', url: 'https://docs.docker.com/compose/' },
          { label: 'Référence du fichier compose', url: 'https://docs.docker.com/reference/compose-file/' },
        ],
      },
      {
        title: 'Commandes & cycle de vie',
        content: `### Les commandes du quotidien

\`\`\`bash
docker compose up -d          # démarrer en arrière-plan
docker compose up --build     # reconstruire avant de démarrer
docker compose ps             # état des services
docker compose logs -f web    # suivre les logs d'un service
docker compose exec web sh    # ouvrir un shell dans un service
docker compose down           # arrêter + supprimer
docker compose down -v        # ... + supprimer les volumes
\`\`\`

### depends_on et healthcheck

\`depends_on\` contrôle l'**ordre** de démarrage, mais **n'attend pas** que le service soit prêt. Pour ça, on ajoute un \`healthcheck\` (un test de santé) :

\`\`\`yaml
services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

  web:
    build: .
    depends_on:
      db:
        condition: service_healthy   # ← attend que db soit prête
\`\`\``,
        links: [
          { label: 'Compose CLI', url: 'https://docs.docker.com/reference/cli/docker/compose/' },
          { label: 'Healthchecks', url: 'https://docs.docker.com/reference/compose-file/services/#healthcheck' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Une mini-stack en douceur (2 services tout prêts)',
        scenario: "Premier compose, sans rien construire : juste deux images toutes prêtes lancées ensemble par un seul fichier.",
        steps: [
          "Dans un dossier `compose-demo`, crée `compose.yaml` avec le contenu fourni (un nginx + un postgres).",
          "Lance le tout : `docker compose up -d`.",
          "Vérifie l'état : `docker compose ps` (les deux services tournent).",
          "Ouvre http://localhost:8080 (nginx), puis arrête tout : `docker compose down`.",
        ],
        hints: [
          "Aucune image à construire ici : on utilise `image:` pour les deux services.",
          "`docker compose up -d` lit le fichier `compose.yaml` du dossier courant.",
        ],
        solution: `services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret

# docker compose up -d
# docker compose ps
# docker compose down`,
      },
      {
        title: 'Stack web (build) + base, en une commande',
        scenario: "On assemble une vraie petite stack : ton app construite localement + une base Postgres avec volume.",
        steps: [
          "Dans ton projet `mon-app` (avec son Dockerfile), crée le `compose.yaml` fourni.",
          "Lance : `docker compose up -d --build`.",
          "Vérifie avec `docker compose ps`, puis ouvre http://localhost:3000.",
          "Arrête et nettoie : `docker compose down`.",
        ],
        hints: [
          "`web` utilise `build: .`, `db` utilise `image: postgres:16`.",
          "N'oublie pas la section `volumes:` à la racine pour déclarer `pgdata`.",
        ],
        solution: `services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

# docker compose up -d --build`,
      },
      {
        title: 'Attendre que la base soit prête (healthcheck)',
        scenario: "Ton app démarre avant Postgres et plante. On ajoute un test de santé à la base et on fait attendre l'app.",
        steps: [
          "Reprends ton `compose.yaml` et ajoute un `healthcheck` au service `db` (avec `pg_isready`).",
          "Sur `web`, remplace le `depends_on` simple par une condition `service_healthy`.",
          "Relance `docker compose up -d` et observe que `web` ne démarre qu'une fois `db` saine.",
          "Vérifie avec `docker compose ps` (colonne STATUS → `healthy`).",
        ],
        hints: [
          "Le test : `test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]` avec `interval`, `timeout`, `retries`.",
          "Sur `web` : `depends_on:` → `db:` → `condition: service_healthy`.",
        ],
        solution: `services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5
  web:
    build: .
    depends_on:
      db:
        condition: service_healthy`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 12 — Publier son image (registry & CI)
  // ═══════════════════════════════════════════════════════════
  {
    id: 212, level: 'Avancé', icon: '🚀', title: 'Publier son image',
    desc: 'Tagger, pousser une image sur un registry, et automatiser la publication avec un pipeline.',
    color: 'orange', colorHex: '#F3752B',
    lessons: [
      {
        title: 'Tags & registries',
        content: `### Anatomie d'un nom d'image complet

\`\`\`
ghcr.io/mon-org/mon-app:1.2.0
└──┬──┘ └───┬──┘ └──┬──┘ └─┬─┘
registry   org    nom    tag
\`\`\`

Sans registry précisé, Docker utilise **Docker Hub** (\`docker.io\`).

### Tagger, pousser, tirer

\`\`\`bash
docker build -t mon-app:1.0.0 .
docker tag mon-app:1.0.0 ghcr.io/mon-org/mon-app:1.0.0

docker login ghcr.io -u TON_PSEUDO
docker push ghcr.io/mon-org/mon-app:1.0.0
docker pull ghcr.io/mon-org/mon-app:1.0.0   # depuis une autre machine
\`\`\`

### Les registries courants

| Registry | Hôte | Note |
|----------|------|------|
| Docker Hub | \`docker.io\` | Public par défaut |
| GitHub | \`ghcr.io\` | Intégré aux dépôts GitHub |
| GitLab | \`registry.gitlab.com\` | Intégré à GitLab |
| AWS ECR | \`*.amazonaws.com\` | Cloud AWS |

> 🧠 Évite \`latest\` seul en production : tague avec la **version** ET le **SHA du commit** pour savoir exactement ce qui tourne.`,
        links: [
          { label: 'Docker Hub', url: 'https://docs.docker.com/docker-hub/' },
          { label: 'GitHub Container Registry', url: 'https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry' },
        ],
      },
      {
        title: 'Publier automatiquement (CI/CD)',
        content: `### Faire publier l'image par un robot à chaque push

Tu peux faire construire et publier ton image automatiquement à chaque modification, avec GitHub Actions :

\`\`\`yaml
# .github/workflows/docker.yml
name: Build & Push
on:
  push:
    branches: [main]

jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:latest
            ghcr.io/\${{ github.repository }}:\${{ github.sha }}
\`\`\`

C'est le pont avec le CI/CD : chaque push produit une image taguée, prête à déployer.`,
        links: [
          { label: 'build-push-action', url: 'https://github.com/docker/build-push-action' },
          { label: 'Publishing Docker images', url: 'https://docs.github.com/en/actions/publishing-packages/publishing-docker-images' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Publier ta première image sur un registry',
        scenario: "On publie une de tes images en ligne pour pouvoir la récupérer depuis n'importe où.",
        steps: [
          "Crée un compte gratuit sur **Docker Hub** (ou utilise GHCR avec ton compte GitHub).",
          "Connecte-toi : `docker login` (ou `docker login ghcr.io`).",
          "Re-tague ton image : `docker tag mon-app:1.0.0 TON_PSEUDO/mon-app:1.0.0`.",
          "Pousse-la : `docker push TON_PSEUDO/mon-app:1.0.0`, puis vérifie qu'elle apparaît sur le site.",
        ],
        hints: [
          "Re-tag : `docker tag <image_locale> <pseudo>/mon-app:1.0.0`.",
          "Pour GHCR, le mot de passe est un token GitHub avec la permission `write:packages`.",
        ],
        solution: `# Docker Hub :
docker login
docker tag mon-app:1.0.0 monpseudo/mon-app:1.0.0
docker push monpseudo/mon-app:1.0.0

# GitHub Container Registry :
docker login ghcr.io -u monpseudo
docker tag mon-app:1.0.0 ghcr.io/monpseudo/mon-app:1.0.0
docker push ghcr.io/monpseudo/mon-app:1.0.0`,
      },
      {
        title: 'Automatiser le build/push (GitHub Actions)',
        scenario: "On relie Docker au CI/CD : un workflow construit et publie ton image sur GHCR à chaque push sur main.",
        steps: [
          "Dans ton dépôt GitHub, crée `.github/workflows/docker.yml` avec le contenu fourni.",
          "Configure le déclenchement `on: push` sur `main` et la permission `packages: write`.",
          "Ajoute les étapes `checkout`, `login-action` (vers `ghcr.io`) puis `build-push-action` avec `push: true`.",
          "Fais un push de test et vérifie l'exécution dans l'onglet **Actions** de GitHub.",
        ],
        hints: [
          "Le `password` du login est `${{ secrets.GITHUB_TOKEN }}` (fourni automatiquement par GitHub).",
          "Tague l'image avec `${{ github.sha }}` pour la traçabilité.",
        ],
        solution: `name: Build & Push
on:
  push:
    branches: [main]
jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 13 — Docker en production
  // ═══════════════════════════════════════════════════════════
  {
    id: 213, level: 'Avancé', icon: '🛡️', title: 'Docker en production',
    desc: 'Redémarrage automatique, limites de ressources, logs maîtrisés et test de santé.',
    color: 'red', colorHex: '#f87171',
    lessons: [
      {
        title: 'Robustesse & ressources',
        content: `### Redémarrage automatique (restart policy)

En production, un conteneur qui plante doit redémarrer tout seul :

\`\`\`bash
docker run -d --restart unless-stopped mon-app
\`\`\`

| Politique | Comportement |
|-----------|--------------|
| \`no\` | Ne redémarre jamais (défaut) |
| \`on-failure\` | Redémarre seulement en cas d'erreur |
| \`always\` | Redémarre toujours |
| \`unless-stopped\` | Toujours, sauf si tu l'as arrêté à la main |

### Limiter les ressources

Un conteneur sans limite peut consommer **toute** la mémoire et faire planter les autres.

\`\`\`bash
docker run -d --memory="512m" --cpus="1.5" mon-app
\`\`\`

### Healthcheck dans le Dockerfile

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

Docker marque le conteneur \`healthy\` ou \`unhealthy\`, ce qui permet aux outils de surveillance de réagir.`,
        links: [
          { label: 'Restart policies', url: 'https://docs.docker.com/engine/containers/start-containers-automatically/' },
          { label: 'Limites de ressources', url: 'https://docs.docker.com/engine/containers/resource_constraints/' },
        ],
      },
      {
        title: 'Logs & au-delà d\'une machine',
        content: `### Maîtriser les logs

\`\`\`bash
docker logs -f --tail 100 mon-app
\`\`\`

> ⚠️ Sans limite, les logs finissent par remplir le disque. Configure une rotation :

\`\`\`yaml
services:
  web:
    image: mon-app
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

### Un conteneur « prêt pour la prod »

Configuration via **variables d'environnement**, logs vers la **sortie standard**, conteneur **sans état** (les données dans des volumes ou une base externe), démarrage et arrêt rapides.

### L'orchestration (la suite logique)

Compose gère **une** machine. En production réelle, on utilise un **orchestrateur** pour plusieurs serveurs, la mise à l'échelle et l'auto-réparation :

| Outil | Pour qui |
|-------|----------|
| **Docker Swarm** | Simple, intégré à Docker |
| **Kubernetes** | Standard de l'industrie |
| **Nomad** | Léger (HashiCorp) |

Kubernetes reprend les mêmes concepts (image, conteneur, volume, réseau) à l'échelle d'un cluster : c'est la suite de ton apprentissage.`,
        links: [
          { label: 'Pilotes de logs', url: 'https://docs.docker.com/engine/logging/configure/' },
          { label: 'Kubernetes — Introduction', url: 'https://kubernetes.io/fr/docs/concepts/overview/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Lancer un conteneur prêt pour la production',
        scenario: "On déploie une app comme en vrai : redémarrage automatique si elle plante, et limites de mémoire/CPU.",
        steps: [
          "Lance ton image avec `--restart unless-stopped` pour le redémarrage automatique.",
          "Ajoute `--memory=512m` et `--cpus=1` pour borner les ressources.",
          "Vérifie la politique : `docker inspect <conteneur>` (cherche `RestartPolicy`).",
          "Teste : tue le processus dans le conteneur et observe qu'il redémarre seul (`docker ps`).",
        ],
        hints: [
          "Redémarrage : `--restart unless-stopped`. Limites : `--memory=512m` et `--cpus=1`.",
          "`docker inspect` donne tous les réglages détaillés d'un conteneur.",
        ],
        solution: `docker run -d --name api \\
  --restart unless-stopped \\
  --memory=512m \\
  --cpus=1 \\
  mon-app

# Vérifier : docker inspect api | grep -A3 RestartPolicy`,
      },
      {
        title: 'Ajouter un test de santé à ton image',
        scenario: "On rend l'image auto-surveillée : un HEALTHCHECK interroge l'endpoint /health, et le statut passe à « healthy ».",
        steps: [
          "Dans ton Dockerfile, ajoute un `HEALTHCHECK` qui teste `http://localhost:3000/health` toutes les 30 s.",
          "Reconstruis l'image et lance le conteneur.",
          "Attends quelques secondes puis fais `docker ps` : la colonne STATUS doit afficher `(healthy)`.",
          "Pour creuser : `docker inspect --format '{{json .State.Health}}' <conteneur>`.",
        ],
        hints: [
          "Syntaxe : `HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD ...`.",
          "Commande de test classique : `curl -f http://localhost:3000/health || exit 1`.",
        ],
        solution: `FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "server.js"]

# docker ps  → STATUS: Up X seconds (healthy)`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 14 — Projets pro & concrets
  // ═══════════════════════════════════════════════════════════
  {
    id: 214, level: 'Hero', icon: '🏆', title: 'Projets Pro & Concrets',
    desc: 'Mettre en pratique sur des stacks réelles : MERN, microservices et reverse proxy.',
    color: 'yellow', colorHex: '#fbbf24',
    lessons: [
      {
        title: 'Projet A — Stack full-stack MERN',
        content: `### Le scénario

Tu rejoins une startup. L'app est un **MERN** : front React, API Node/Express, base MongoDB. Ta mission : tout conteneuriser pour que n'importe quel développeur démarre le projet avec **une seule commande**.

### Architecture cible

\`\`\`
        ┌──────────┐
        │  client  │  React (build → Nginx) :80
        └────┬─────┘
             │ /api →
        ┌────┴─────┐
        │   api    │  Node/Express :5000
        └────┬─────┘
             │
        ┌────┴─────┐
        │  mongo   │  MongoDB :27017 (+ volume)
        └──────────┘
\`\`\`

### Le compose.yaml de référence

\`\`\`yaml
services:
  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - api

  api:
    build: ./api
    environment:
      MONGO_URL: mongodb://mongo:27017/app
    depends_on:
      mongo:
        condition: service_healthy

  mongo:
    image: mongo:7
    volumes:
      - mongodata:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      retries: 5

volumes:
  mongodata:
\`\`\`

### Compétences mobilisées

Dockerfile multi-stage (client), réseau Compose (l'API joint \`mongo\` par son nom), volume persistant, healthcheck et ordre de démarrage. C'est le scénario d'onboarding le plus courant en entreprise.`,
        links: [
          { label: 'Awesome Compose (exemples réels)', url: 'https://github.com/docker/awesome-compose' },
        ],
      },
      {
        title: 'Projet B — Microservices + reverse proxy',
        content: `### Le scénario

Une plateforme expose **plusieurs microservices** (auth, commandes, paiements) derrière **un seul point d'entrée**. Un **reverse proxy** (Nginx ou Traefik) route chaque requête vers le bon service selon l'URL.

### Architecture

\`\`\`
Internet → :80 ┌─────────────┐
                │   proxy     │  Nginx / Traefik
                └──┬───┬───┬──┘
       /auth ──────┘   │   └────── /pay
                   /orders
        ┌────────┐ ┌────────┐ ┌────────┐
        │  auth  │ │ orders │ │  pay   │
        └────────┘ └────────┘ └────────┘
\`\`\`

### Extrait compose avec Traefik

\`\`\`yaml
services:
  proxy:
    image: traefik:v3
    command:
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  auth:
    build: ./auth
    labels:
      - "traefik.http.routers.auth.rule=PathPrefix(\`/auth\`)"

  orders:
    build: ./orders
    labels:
      - "traefik.http.routers.orders.rule=PathPrefix(\`/orders\`)"
\`\`\`

Traefik **découvre** automatiquement les services via les « labels » Docker : aucune config statique à maintenir.

### Compétences mobilisées

Multi-services, réseau interne, reverse proxy, routage par labels, mise à l'échelle (\`--scale orders=3\`). C'est l'architecture type d'une plateforme SaaS moderne.`,
        links: [
          { label: 'Traefik & Docker', url: 'https://doc.traefik.io/traefik/providers/docker/' },
          { label: 'Reverse proxy Nginx', url: 'https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/' },
        ],
      },
      {
        title: 'Projet C — Pipeline complet (du code au registry)',
        content: `### Le scénario

Boucler la boucle : ton app est conteneurisée, et chaque push doit **construire, scanner et publier** l'image automatiquement. C'est la jonction avec le CI/CD.

### Le flux

\`\`\`
git push → CI : lint + test → docker build → scan (Scout/Trivy)
        → docker push (GHCR) → déploiement (pull + compose up)
\`\`\`

### Le pipeline GitHub Actions

\`\`\`yaml
name: Deliver
on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
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
          context: .
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:latest
            ghcr.io/\${{ github.repository }}:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

### Sur le serveur de déploiement

\`\`\`bash
docker compose pull       # récupère la nouvelle image
docker compose up -d       # redémarre avec la nouvelle version
docker image prune -f      # nettoie les anciennes images
\`\`\`

### Le résultat

Tu maîtrises désormais le cycle complet : **écrire** un Dockerfile optimisé → **orchestrer** avec Compose → **durcir** pour la prod → **automatiser** la livraison. C'est exactement ce qu'on attend d'un profil DevOps junior. 🎯`,
        links: [
          { label: 'GitHub Actions — Publier des images', url: 'https://docs.github.com/en/actions/publishing-packages/publishing-docker-images' },
          { label: 'Docker Scout', url: 'https://docs.docker.com/scout/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Projet MERN — démarrer toute la stack',
        scenario: "Joue le rôle de l'ingénieur DevOps : conteneurise une app MERN (client React, API Node, MongoDB) pour qu'elle démarre entièrement avec une seule commande.",
        steps: [
          "Récupère (ou crée) un projet MERN avec un dossier `client/` et un dossier `api/`, chacun avec son Dockerfile.",
          "À la racine, écris un `compose.yaml` avec trois services : `client` (build, port 80), `api` (build) et `mongo` (`mongo:7` + volume `mongodata`).",
          "Configure l'API pour parler à la base via `mongodb://mongo:27017/app` (le **nom** du service).",
          "Lance `docker compose up -d --build` et ouvre **http://localhost** : l'app complète doit fonctionner.",
        ],
        hints: [
          "`client` et `api` utilisent `build:` (avec le chemin du dossier), `mongo` utilise `image: mongo:7`.",
          "L'API joint la base par son nom de service `mongo`, jamais par `localhost`.",
        ],
        solution: `services:
  client:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - api
  api:
    build: ./api
    environment:
      MONGO_URL: mongodb://mongo:27017/app
    depends_on:
      - mongo
  mongo:
    image: mongo:7
    volumes:
      - mongodata:/data/db

volumes:
  mongodata:

# docker compose up -d --build → http://localhost`,
      },
      {
        title: 'Microservices — un point d\'entrée unique',
        scenario: "Construis le point d'entrée d'une plateforme : un reverse proxy Traefik qui route /auth et /orders vers deux microservices distincts.",
        steps: [
          "Crée un `compose.yaml` avec un service `proxy` (`traefik:v3`) exposant le port 80 et montant le socket Docker en lecture seule.",
          "Ajoute deux services applicatifs `auth` et `orders` (chacun avec son `build:`).",
          "Sur chaque service, ajoute un `labels:` Traefik avec une règle `PathPrefix` (`/auth` et `/orders`).",
          "Lance la stack, puis teste **http://localhost/auth** et **http://localhost/orders** : chaque URL doit atteindre le bon service.",
        ],
        hints: [
          "Le proxy a besoin de `/var/run/docker.sock:/var/run/docker.sock:ro` pour découvrir les services.",
          "Format du label : `traefik.http.routers.<nom>.rule=PathPrefix(`/chemin`)`.",
        ],
        solution: `services:
  proxy:
    image: traefik:v3
    command:
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
  auth:
    build: ./auth
    labels:
      - "traefik.http.routers.auth.rule=PathPrefix(\`/auth\`)"
  orders:
    build: ./orders
    labels:
      - "traefik.http.routers.orders.rule=PathPrefix(\`/orders\`)"

# Teste http://localhost/auth et http://localhost/orders`,
      },
    ],
  },

];

export default DOCKER_MODULES;
