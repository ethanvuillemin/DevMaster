/**
 * Modules — Les bases de l'informatique
 * IDs réservés : 800–899
 */

const BASICS_MODULES = [
  {
    id: 801, level: 'Débutant', title: "Comment fonctionne un ordinateur ?",
    desc: "Comprends les composants essentiels de ton ordinateur et comment le code s'exécute réellement.",
    color: 'slate', colorHex: '#64748B',
    lessons: [
      {
        title: "Les composants essentiels : CPU, RAM, Stockage & OS",
        content: `### Comprendre les pièces de ton ordinateur

Avant d'apprendre à coder, il est essentiel de comprendre la machine sur laquelle ton code va tourner. Un ordinateur, c'est comme une cuisine professionnelle :

- **Le CPU (processeur)** = le chef cuisinier. Il exécute les instructions, une à une, à une vitesse folle (plusieurs milliards par seconde).
- **La RAM (mémoire vive)** = le plan de travail. C'est là où le chef pose les ingrédients qu'il utilise *en ce moment*. Rapide d'accès, mais tout disparaît quand on éteint.
- **Le disque dur / SSD** = le garde-manger. Stockage permanent. Beaucoup plus lent que la RAM, mais tout est conservé même sans électricité.
- **L'OS (système d'exploitation)** = le responsable de salle. Il gère les ressources, décide qui a le droit d'utiliser quoi, et fait l'interface entre toi et le matériel.

\`\`\`
[ Toi / Tes programmes ]
        ↓
[ Système d'exploitation (Windows / macOS / Linux) ]
        ↓
[ CPU ]  ←→  [ RAM ]  ←→  [ Disque / SSD ]
\`\`\`

### Le CPU en détail

Le CPU (Central Processing Unit) ne comprend qu'une seule chose : des **instructions binaires** (des 0 et des 1). Il effectue des opérations élémentaires :
- Additionner deux nombres
- Comparer deux valeurs
- Déplacer des données d'un endroit à un autre

Il le fait des **milliards de fois par seconde**. Un CPU à 3 GHz effectue environ 3 milliards de cycles par seconde.

| Composant | Vitesse d'accès | Capacité typique | Persistant ? |
|-----------|----------------|-----------------|--------------|
| CPU (cache L1) | ~1 ns | Quelques Ko | Non |
| RAM | ~100 ns | 8–32 Go | Non |
| SSD | ~0,1 ms | 256 Go – 2 To | Oui |
| Disque dur (HDD) | ~10 ms | 1–4 To | Oui |

### La RAM : la mémoire de travail

Quand tu ouvres un programme (comme ton navigateur), l'OS **charge son code depuis le disque vers la RAM**. Pourquoi ? Parce que la RAM est ~100 000 fois plus rapide que le disque.

C'est pour ça qu'un ordinateur avec 16 Go de RAM est plus rapide qu'un avec 4 Go : il peut garder plus de choses "sur le plan de travail" sans avoir à aller chercher dans le garde-manger.

### L'OS : le chef d'orchestre

Ton OS (Windows, macOS, Ubuntu…) fait des choses invisibles mais cruciales :
- **Gestion des processus** : il décide quel programme utilise le CPU à quel moment
- **Gestion de la mémoire** : il alloue de la RAM à chaque programme
- **Système de fichiers** : il organise tes fichiers sur le disque
- **Drivers** : il traduit les appels des programmes en instructions pour le matériel (carte graphique, souris, clavier…)

### Pourquoi c'est important pour toi ?

Quand ton programme "plante", c'est souvent parce qu'il demande plus de RAM que disponible, ou que le CPU est saturé. Comprendre ces concepts te permettra de diagnostiquer des problèmes et d'écrire du code plus efficace.`,
        links: [
          { label: 'Comment fonctionne un CPU ? (Vidéo)', url: 'https://www.youtube.com/watch?v=vqs_0W-MSB0' },
          { label: 'Différence RAM vs ROM', url: 'https://fr.wikipedia.org/wiki/M%C3%A9moire_vive' }
        ]
      },
      {
        title: "Comment le code s'exécute : du texte aux instructions machine",
        content: `### De ton fichier .py (ou .js) au CPU

Tu écris du code en français technique (Python, JavaScript…). Mais le CPU ne comprend que des 0 et des 1. Alors comment ça se passe ?

\`\`\`
Ton code source (texte)
        ↓
  Compilateur ou Interpréteur
        ↓
   Code machine (binaire)
        ↓
      CPU exécute
\`\`\`

Il existe deux grandes approches :

#### 1. La compilation

Un **compilateur** traduit *tout ton code d'un coup* en code machine **avant** de l'exécuter. C'est comme traduire un livre entier avant de le distribuer.

- Exemples : C, C++, Rust, Go
- Avantage : très rapide à l'exécution (tout est déjà traduit)
- Inconvénient : il faut recompiler à chaque modification

\`\`\`
code.c  →  [Compilateur]  →  programme.exe  →  [CPU]
\`\`\`

#### 2. L'interprétation

Un **interpréteur** lit ton code ligne par ligne et l'exécute au fur et à mesure. C'est comme un traducteur simultané.

- Exemples : Python, JavaScript, Ruby
- Avantage : plus flexible, facile à tester
- Inconvénient : plus lent (la traduction se fait en temps réel)

\`\`\`
script.py  →  [Interpréteur Python]  →  [CPU]
              (lit ligne par ligne)
\`\`\`

#### Et Java / C# ?

Ils utilisent une approche hybride : compilation vers un **bytecode** intermédiaire, puis exécution par une machine virtuelle (JVM pour Java, CLR pour C#). Le meilleur des deux mondes.

### Le rôle de la mémoire pendant l'exécution

Quand ton programme s'exécute, l'OS lui alloue de la mémoire RAM organisée en zones :

| Zone | Contenu | Durée de vie |
|------|---------|-------------|
| **Stack** (pile) | Variables locales, appels de fonctions | Le temps de la fonction |
| **Heap** (tas) | Objets créés dynamiquement | Jusqu'à libération |
| **Code segment** | Les instructions du programme | Toute l'exécution |

### Un exemple concret : x = 5 + 3

Voici ce qui se passe quand Python exécute cette ligne simple :

1. L'interpréteur **lit** \`x = 5 + 3\`
2. Il **demande de la RAM** pour stocker les nombres 5 et 3
3. Il **demande au CPU** d'additionner 5 + 3
4. Le CPU retourne 8
5. Le résultat 8 est **stocké en RAM** à l'adresse associée à \`x\`

Tout ça en quelques nanosecondes. Chaque ligne de code que tu écriras déclenchera des centaines d'opérations similaires.

### Les processus et les threads

Quand tu lances un programme, l'OS crée un **processus** : un espace isolé en mémoire avec ses propres ressources. Un processus peut avoir plusieurs **threads** : des fils d'exécution parallèles qui partagent la même mémoire.

C'est pour ça que ton navigateur peut télécharger un fichier *et* afficher une page web *en même temps*.

\`\`\`
Processus "Navigateur"
├── Thread 1 : affichage de l'interface
├── Thread 2 : téléchargement de fichier
└── Thread 3 : exécution de JavaScript
\`\`\`

Comprendre cela t'aidera plus tard quand tu écriras du code asynchrone ou multi-threadé.`,
        links: [
          { label: 'Compilation vs Interprétation', url: 'https://www.geeksforgeeks.org/difference-between-compiled-and-interpreted-language/' },
          { label: 'Comment fonctionne la mémoire RAM', url: 'https://fr.wikipedia.org/wiki/M%C3%A9moire_vive' }
        ]
      },
    ],
    exercises: [
      {
        title: "Explorer son propre ordinateur via le terminal",
        scenario: "Tu viens d'être embauché comme stagiaire dev dans une startup. Ton premier jour, ton manager te demande de lui envoyer les specs techniques de ton poste de travail. Tu vas utiliser le terminal pour collecter ces informations comme un vrai professionnel.",
        steps: [
          {
            title: "Ouvrir le terminal et découvrir son OS",
            instructions: `**Sur Windows :** Appuie sur Win + R, tape cmd puis Entrée. Ou cherche "PowerShell" dans le menu démarrer.
**Sur macOS :** Appuie sur Cmd + Espace, tape Terminal puis Entrée.
**Sur Linux :** Cherche "Terminal" dans tes applications ou appuie sur Ctrl + Alt + T.

Une fois le terminal ouvert, tape ces commandes :

**Windows (cmd) :**
\`\`\`
systeminfo | findstr /B /C:"Nom du système d'exploitation" /C:"Version du système"
\`\`\`

**macOS / Linux :**
\`\`\`bash
uname -a
\`\`\`

Tu devrais voir le nom et la version de ton OS. Note-les quelque part.`
          },
          {
            title: "Voir la RAM disponible",
            instructions: `Maintenant, vérifions combien de RAM ton ordinateur possède.

**Windows :**
\`\`\`
wmic memorychip get capacity
\`\`\`
(Le résultat est en octets — divise par 1 073 741 824 pour obtenir des Go)

**macOS :**
\`\`\`bash
system_profiler SPHardwareDataType | grep "Memory"
\`\`\`

**Linux :**
\`\`\`bash
free -h
\`\`\`

La colonne total t'indique la RAM totale. La colonne available te dit ce qui est disponible en ce moment.`
          },
          {
            title: "Inspecter l'espace disque",
            instructions: `Voyons maintenant l'espace de stockage disponible.

**Windows :**
\`\`\`
wmic logicaldisk get caption,size,freespace
\`\`\`

**macOS :**
\`\`\`bash
df -h /
\`\`\`

**Linux :**
\`\`\`bash
df -h
\`\`\`

Repère la ligne correspondant à ton disque principal (souvent C: sur Windows, / sur macOS/Linux). Note la taille totale et l'espace libre.`
          },
          {
            title: "Voir les processus en cours",
            instructions: `Enfin, regardons quels programmes tournent en ce moment et combien de CPU/RAM ils consomment.

**Windows :**
\`\`\`
tasklist | more
\`\`\`
(Appuie sur Espace pour défiler, Q pour quitter)

**macOS :**
\`\`\`bash
top -l 1 | head -20
\`\`\`

**Linux :**
\`\`\`bash
top -bn1 | head -20
\`\`\`

Tu vois la liste des processus avec leur PID (identifiant), leur nom, et leur consommation de ressources. Chaque application ouverte correspond à un ou plusieurs processus !`
          },
        ],
        hints: [
          "Si une commande ne fonctionne pas sur Windows, essaie PowerShell au lieu de cmd",
          "Sur Windows, les tailles de RAM sont affichées en octets (1 Go = 1 073 741 824 octets)",
          "Le terme PID signifie Process ID — c'est le numéro unique attribué à chaque programme en cours d'exécution",
          "Si tu vois 'Permission refusée', certaines commandes nécessitent d'être admin — ce n'est pas grave pour cet exercice"
        ],
        solution: `# Solution complète — Explorer son ordinateur

## Windows
\`\`\`cmd
:: OS
systeminfo | findstr /B /C:"Nom du système d'exploitation" /C:"Version du système"

:: RAM (en octets)
wmic memorychip get capacity

:: Disque
wmic logicaldisk get caption,size,freespace

:: Processus
tasklist | more
\`\`\`

## macOS
\`\`\`bash
# OS
uname -a
system_profiler SPHardwareDataType | grep -E "Model|Memory|Processor"

# RAM
vm_stat | head -5

# Disque
df -h /

# Processus
top -l 1 | head -20
\`\`\`

## Linux
\`\`\`bash
# OS
uname -a
cat /etc/os-release

# RAM
free -h

# Disque
df -h

# Processus
top -bn1 | head -20
\`\`\`

## Ce que tu aurais dû observer
- Ton OS avec sa version exacte
- Ta RAM totale (probablement 8, 16 ou 32 Go)
- Ton disque avec l'espace libre
- Des dizaines de processus en cours même avec "rien" d'ouvert — l'OS lui-même utilise des ressources !`
      }
    ],
  },

  {
    id: 802, level: 'Débutant', title: "La ligne de commande (CLI)",
    desc: "Maîtrise le terminal, l'outil incontournable de tout développeur. Navigation, fichiers, et productivité.",
    color: 'zinc', colorHex: '#71717A',
    lessons: [
      {
        title: "Pourquoi utiliser le terminal ? Premiers pas",
        content: `### Le terminal : l'outil secret des développeurs

Quand tu regardes des tutoriels de programmation, tu vois souvent les gens taper des commandes dans une fenêtre noire. Ça peut paraître intimidant. Mais c'est en réalité **plus rapide, plus précis et plus puissant** que l'interface graphique.

Imagine que tu veux déplacer 1000 fichiers dans différents dossiers selon leur extension. Avec l'explorateur Windows, ça prendrait des heures. En ligne de commande, c'est une seule commande.

**Le terminal = converser directement avec ton OS en texte.**

### Terminal, console, shell, CLI — c'est quoi la différence ?

| Terme | Définition |
|-------|-----------|
| **Terminal** | L'application fenêtre qui affiche du texte (ex: Windows Terminal, iTerm2) |
| **Shell** | Le programme qui interprète tes commandes (ex: bash, zsh, PowerShell) |
| **CLI** | Command Line Interface — toute interface en ligne de commande |
| **Console** | Terme générique, souvent synonyme de terminal |

En pratique, on dit souvent "terminal" pour tout ça.

### Ouvrir ton terminal

**Windows :**
- Cherche "Windows Terminal" ou "PowerShell" dans le menu démarrer
- Ou Win + X → "Windows PowerShell"

**macOS :**
- Cmd + Espace → tape "Terminal"
- Ou dans Applications → Utilitaires → Terminal

**Linux :**
- Ctrl + Alt + T (sur la plupart des distributions)
- Ou cherche "Terminal" dans les applications

### Anatomie d'une commande

\`\`\`
$ ls -la /home/ethan
│  │   │  └── argument : le chemin sur lequel agir
│  │   └────── option/flag : modifie le comportement
│  └────────── commande : l'action à effectuer
└───────────── prompt : indique que le shell attend ta commande
\`\`\`

Une commande a toujours cette structure :
\`\`\`
commande [options] [arguments]
\`\`\`

- **Commande** : ce que tu veux faire (ls, cd, mkdir…)
- **Options (flags)** : des modificateurs, souvent avec - ou -- (-l, --help…)
- **Arguments** : sur quoi appliquer la commande (un fichier, un dossier…)

### Commandes de base universelles

\`\`\`bash
# Afficher où tu es (Print Working Directory)
pwd

# Lister les fichiers du dossier actuel
ls          # Linux/macOS
dir         # Windows cmd
Get-ChildItem  # PowerShell

# Effacer l'écran
clear       # Linux/macOS
cls         # Windows

# Obtenir de l'aide sur une commande
man ls      # Linux/macOS (manual)
ls --help   # Linux/macOS
Get-Help ls # PowerShell
\`\`\`

### Le prompt : lire les informations

Selon ton shell, le prompt ressemble à :
\`\`\`
ethan@monpc:~/projets$    ← Linux/macOS (bash)
ethan@monpc ~/projets>    ← macOS (zsh)
PS C:\\Users\\Ethan>        ← Windows PowerShell
\`\`\`

Il t'indique :
- Ton nom d'utilisateur (ethan)
- Le nom de la machine (monpc)
- Ton dossier actuel (~/projets ou C:\\Users\\Ethan)
- Un $ (utilisateur normal) ou # (administrateur/root)

### Pourquoi les devs préfèrent le terminal

1. **Vitesse** : une commande fait en 2 secondes ce qui prend 2 minutes en GUI
2. **Automatisation** : tu peux mettre des commandes dans des scripts
3. **Accès SSH** : tu dois utiliser le terminal pour contrôler des serveurs distants
4. **Reproductibilité** : tu peux partager exactement ce que tu as fait
5. **Les outils dev** : Git, npm, pip, docker… tout s'utilise en ligne de commande

> **Astuce :** Appuie sur la flèche haut pour rappeler la commande précédente. Appuie sur Tab pour l'autocomplétion. Ces deux raccourcis vont te faire gagner énormément de temps !`,
        links: [
          { label: 'The Missing Semester — Shell Tools (MIT)', url: 'https://missing.csail.mit.edu/2020/shell-tools/' },
          { label: 'Bash Guide pour débutants', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/' }
        ]
      },
      {
        title: "Navigation et manipulation de fichiers : cd, ls, mkdir, cp, mv, rm",
        content: `### Se déplacer dans l'arborescence

La commande la plus importante est cd (Change Directory). Elle te permet de naviguer entre les dossiers.

\`\`\`bash
cd /home/ethan/projets    # Chemin absolu (depuis la racine)
cd projets                # Chemin relatif (depuis là où tu es)
cd ..                     # Remonter d'un niveau
cd ../..                  # Remonter de deux niveaux
cd ~                      # Aller dans ton dossier home
cd -                      # Retourner au dossier précédent
\`\`\`

**Sur Windows PowerShell, cd fonctionne aussi !** Les chemins utilisent \\ au lieu de /, mais PowerShell accepte les deux.

### Lister les fichiers : ls

\`\`\`bash
ls              # Liste simple
ls -l           # Liste détaillée (permissions, taille, date)
ls -a           # Affiche aussi les fichiers cachés (commençant par .)
ls -la          # Les deux combinés
ls -lh          # Tailles lisibles par l'humain (Ko, Mo, Go)
\`\`\`

Exemple de sortie de ls -l :
\`\`\`
drwxr-xr-x  3 ethan staff  96 Jan 15 10:23 projets/
-rw-r--r--  1 ethan staff 420 Jan 15 09:15 readme.txt
-rwxr-xr-x  1 ethan staff  89 Jan 14 16:42 script.sh
│            │ │     │      │  │             └─ nom
│            │ │     │      │  └─────────────── date de modification
│            │ │     │      └────────────────── taille en octets
│            │ │     └───────────────────────── groupe
│            │ └─────────────────────────────── propriétaire
│            └───────────────────────────────── nombre de liens
└────────────────────────────────────────────── permissions
\`\`\`

### Créer des dossiers et fichiers

\`\`\`bash
# Créer un dossier
mkdir mon-projet
mkdir -p mon-projet/src/components   # -p crée aussi les dossiers parents

# Créer un fichier vide
touch index.html      # Linux/macOS
New-Item index.html   # PowerShell

# Créer un fichier avec du contenu
echo "Hello World" > hello.txt       # Crée/écrase
echo "Deuxième ligne" >> hello.txt   # Ajoute à la fin

# Lire un fichier
cat fichier.txt       # Affiche tout
head -5 fichier.txt   # Affiche les 5 premières lignes
tail -5 fichier.txt   # Affiche les 5 dernières lignes
\`\`\`

### Copier et déplacer

\`\`\`bash
# Copier un fichier
cp source.txt destination.txt
cp fichier.txt dossier/           # Copie dans un dossier

# Copier un dossier entier
cp -r dossier-source/ dossier-dest/   # -r = récursif

# Déplacer / Renommer
mv ancien-nom.txt nouveau-nom.txt     # Renommer
mv fichier.txt dossier/               # Déplacer
mv dossier-a/ dossier-b/             # Déplacer un dossier
\`\`\`

### Supprimer (avec précaution !)

\`\`\`bash
rm fichier.txt              # Supprimer un fichier
rm -r dossier/              # Supprimer un dossier et son contenu
rm -ri dossier/             # -i = demande confirmation pour chaque fichier

# ATTENTION : ne jamais taper rm -rf / sur Linux/macOS
# Ça supprime TOUT le système sans confirmation !
\`\`\`

### Tableau récapitulatif Linux/macOS vs Windows

| Action | Linux/macOS | Windows (PowerShell) |
|--------|-------------|---------------------|
| Naviguer | cd dossier | cd dossier |
| Lister | ls -l | Get-ChildItem ou ls |
| Créer dossier | mkdir nom | mkdir nom |
| Créer fichier | touch nom | New-Item nom |
| Copier | cp src dst | Copy-Item src dst |
| Déplacer | mv src dst | Move-Item src dst |
| Supprimer | rm fichier | Remove-Item fichier |
| Lire fichier | cat fichier | Get-Content fichier |

### Astuces de productivité

\`\`\`bash
# Chercher un fichier
find . -name "*.txt"         # Linux/macOS
Get-ChildItem -Recurse *.txt # PowerShell

# Chercher dans un fichier
grep "mot" fichier.txt       # Linux/macOS
Select-String "mot" fichier  # PowerShell

# Voir l'historique des commandes
history     # Linux/macOS
Get-History # PowerShell
\`\`\`

> **Rappel :** Tab autocomplète les noms de fichiers et dossiers. Si tu tapes "cd pro" puis Tab, le shell complétera avec "projets/" si ce dossier existe !`,
        links: [
          { label: 'Commandes Linux essentielles', url: 'https://www.hostinger.fr/tutoriels/commandes-linux' },
          { label: 'PowerShell pour débutants', url: 'https://learn.microsoft.com/fr-fr/powershell/scripting/learn/ps101/01-getting-started' }
        ]
      },
    ],
    exercises: [
      {
        title: "Créer une arborescence de projet depuis le terminal",
        scenario: "Tu rejoins une équipe de développement web. Avant de commencer à coder, tu dois créer la structure de dossiers standard du projet en utilisant uniquement le terminal — pas d'interface graphique. C'est une pratique courante pour initialiser des projets rapidement et de façon reproductible.",
        steps: [
          {
            title: "Créer le dossier racine du projet",
            instructions: `Ouvre ton terminal et navigue vers ton Bureau (Desktop) ou ton dossier Documents.

\`\`\`bash
# macOS/Linux
cd ~/Desktop
# ou
cd ~/Documents

# Windows PowerShell
cd $HOME\\Desktop
# ou
cd $HOME\\Documents
\`\`\`

Maintenant crée le dossier du projet et navigue dedans :

\`\`\`bash
mkdir mon-premier-projet
cd mon-premier-projet
pwd   # Vérifie que tu es bien dans le bon dossier
\`\`\`

Tu devrais voir quelque chose comme /Users/ethan/Desktop/mon-premier-projet.`
          },
          {
            title: "Créer l'arborescence complète",
            instructions: `Maintenant crée la structure suivante en une seule commande :

\`\`\`
mon-premier-projet/
├── src/
│   ├── components/
│   └── pages/
├── public/
│   └── images/
└── docs/
\`\`\`

**Linux/macOS :**
\`\`\`bash
mkdir -p src/components src/pages public/images docs
\`\`\`

**Windows PowerShell :**
\`\`\`powershell
New-Item -ItemType Directory -Force src/components, src/pages, public/images, docs
\`\`\`

Vérifie le résultat :
\`\`\`bash
# Linux/macOS
ls -R

# Windows
Get-ChildItem -Recurse
\`\`\``
          },
          {
            title: "Créer les fichiers de base",
            instructions: `Crée les fichiers essentiels du projet :

**Linux/macOS :**
\`\`\`bash
touch src/index.js
touch src/styles.css
touch public/index.html
touch docs/README.txt
echo "# Mon Premier Projet" > docs/README.txt
echo "console.log('Hello World');" > src/index.js
\`\`\`

**Windows PowerShell :**
\`\`\`powershell
New-Item src/index.js
New-Item src/styles.css
New-Item public/index.html
New-Item docs/README.txt
Set-Content docs/README.txt "# Mon Premier Projet"
Set-Content src/index.js "console.log('Hello World');"
\`\`\`

Vérifie le contenu d'un fichier :
\`\`\`bash
cat src/index.js    # Linux/macOS
Get-Content src/index.js  # Windows
\`\`\``
          },
          {
            title: "Naviguer et explorer l'arborescence",
            instructions: `Pratique la navigation dans ta nouvelle arborescence :

\`\`\`bash
# Aller dans src/components
cd src/components
pwd  # Où es-tu ?

# Remonter à la racine du projet
cd ../..
pwd  # De retour à la racine ?

# Copier un fichier
cp docs/README.txt docs/README-backup.txt

# Lister avec détails
ls -la docs/    # Linux/macOS
dir docs/       # Windows cmd
\`\`\`

**Défi bonus :** Renomme README-backup.txt en CHANGELOG.txt en utilisant la commande mv (ou Rename-Item sur Windows).`
          },
        ],
        hints: [
          "Si tu te perds, utilise pwd pour savoir où tu es, puis ls pour voir ce qu'il y a autour",
          "L'option -p de mkdir crée automatiquement tous les dossiers parents manquants",
          "La touche Tab autocomplète les noms — utilise-la à fond pour éviter les fautes de frappe",
          "Pour remonter rapidement à ton dossier home depuis n'importe où : tape cd ~ (Linux/macOS) ou cd $HOME (PowerShell)"
        ],
        solution: `# Solution complète

## Linux/macOS
\`\`\`bash
# 1. Aller sur le Bureau
cd ~/Desktop

# 2. Créer et entrer dans le projet
mkdir mon-premier-projet
cd mon-premier-projet

# 3. Créer toute l'arborescence
mkdir -p src/components src/pages public/images docs

# 4. Créer les fichiers
touch src/index.js src/styles.css public/index.html docs/README.txt

# 5. Ajouter du contenu
echo "# Mon Premier Projet" > docs/README.txt
echo "console.log('Hello World');" > src/index.js

# 6. Vérifier
ls -R

# 7. Bonus : renommer
cp docs/README.txt docs/README-backup.txt
mv docs/README-backup.txt docs/CHANGELOG.txt
\`\`\`

## Windows PowerShell
\`\`\`powershell
# 1. Aller sur le Bureau
cd $HOME\\Desktop

# 2. Créer et entrer dans le projet
mkdir mon-premier-projet
cd mon-premier-projet

# 3. Créer toute l'arborescence
New-Item -ItemType Directory -Force src/components, src/pages, public/images, docs

# 4. Créer les fichiers
New-Item src/index.js, src/styles.css, public/index.html, docs/README.txt

# 5. Ajouter du contenu
Set-Content docs/README.txt "# Mon Premier Projet"
Set-Content src/index.js "console.log('Hello World');"

# 6. Vérifier
Get-ChildItem -Recurse

# 7. Bonus : renommer
Copy-Item docs/README.txt docs/README-backup.txt
Rename-Item docs/README-backup.txt CHANGELOG.txt
\`\`\`

## Structure finale attendue
\`\`\`
mon-premier-projet/
├── docs/
│   ├── CHANGELOG.txt
│   └── README.txt
├── public/
│   ├── images/
│   └── index.html
└── src/
    ├── components/
    ├── pages/
    ├── index.js
    └── styles.css
\`\`\``
      }
    ],
  },

  {
    id: 803, level: 'Débutant', title: "Fichiers, dossiers & arborescence",
    desc: "Comprends l'organisation des fichiers, les chemins absolus/relatifs, les extensions et les permissions.",
    color: 'amber', colorHex: '#F59E0B',
    lessons: [
      {
        title: "L'arborescence : Unix vs Windows, chemins absolus et relatifs",
        content: `### L'arborescence de fichiers : une forêt inversée

Tous les fichiers de ton ordinateur sont organisés dans une **arborescence** : une structure en forme d'arbre (renversé) où tout part d'une racine.

\`\`\`
/ (racine — Linux/macOS)        C:\\ (racine — Windows)
├── home/                        ├── Users\\
│   └── ethan/                   │   └── Ethan\\
│       ├── Documents/           │       ├── Documents\\
│       ├── Downloads/           │       ├── Downloads\\
│       └── projets/             │       └── projets\\
├── etc/                         ├── Windows\\
├── usr/                         └── Program Files\\
└── var/
\`\`\`

### Unix (Linux/macOS) vs Windows

| Caractéristique | Unix/Linux/macOS | Windows |
|----------------|-----------------|---------|
| **Racine** | / (unique) | C:\\, D:\\ (par lecteur) |
| **Séparateur** | / (slash) | \\ (backslash) |
| **Casse** | Sensible (fichier ≠ Fichier) | Insensible (fichier = Fichier) |
| **Dossier home** | /home/ethan ou ~ | C:\\Users\\Ethan |
| **Fichiers cachés** | Commencent par . | Attribut "caché" |
| **Exécutables** | Permission +x | Extension .exe, .bat |

### Chemins absolus vs relatifs

C'est l'une des notions les plus importantes à comprendre !

#### Chemin absolu

Un chemin absolu commence **depuis la racine**. Il est toujours valide peu importe où tu te trouves.

\`\`\`
/home/ethan/projets/mon-site/index.html   (Linux/macOS)
C:\\Users\\Ethan\\projets\\mon-site\\index.html  (Windows)
\`\`\`

Comme une adresse postale complète : "15 rue de la Paix, 75001 Paris, France" — tu sais exactement où c'est depuis n'importe où dans le monde.

#### Chemin relatif

Un chemin relatif commence **depuis là où tu es**. Il dépend de ton dossier courant.

Si tu es dans /home/ethan/projets/ :
\`\`\`
mon-site/index.html          # le sous-dossier mon-site
./mon-site/index.html        # ./ = dossier courant (identique)
../autre-projet/app.js       # ../ = dossier parent
../../Documents/notes.txt    # deux niveaux au-dessus
\`\`\`

Comme des directions relatives : "Tourne à droite au prochain feu, puis 200m tout droit" — ça dépend de là où tu es !

#### Raccourcis de chemins

| Raccourci | Signification | Exemple |
|-----------|--------------|---------|
| . | Dossier courant | ./script.sh |
| .. | Dossier parent | cd .. |
| ~ | Dossier home | cd ~/Documents |
| / seul | Racine du système | ls / |

### Pourquoi c'est crucial en dev ?

Quand tu codes, tu vas souvent référencer des fichiers. Si tu te trompes de chemin, ton programme ne trouvera pas le fichier !

\`\`\`html
<!-- Dans un fichier HTML, chemin relatif vers une image -->
<img src="images/logo.png">           <!-- relatif -->
<img src="/public/images/logo.png">   <!-- absolu depuis la racine web -->

<!-- Erreur classique : tu es dans /projet mais l'image est dans /projet/public/ -->
<img src="logo.png">  <!-- introuvable ! -->
<img src="public/images/logo.png">  <!-- correct -->
\`\`\`

### La variable PATH

Il existe une variable spéciale appelée **PATH** que ton OS utilise pour trouver les programmes. Quand tu tapes python dans le terminal, l'OS cherche un fichier nommé python dans tous les dossiers listés dans PATH.

\`\`\`bash
# Voir ton PATH
echo $PATH    # Linux/macOS
$env:PATH     # Windows PowerShell

# Exemple de PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
\`\`\`

C'est pour ça que quand tu installes Python ou Node.js, l'installateur te demande si tu veux "ajouter au PATH" — pour que tu puisses utiliser python depuis n'importe où dans le terminal !`,
        links: [
          { label: 'Arborescence Linux expliquée', url: 'https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/' },
          { label: 'Chemins relatifs vs absolus', url: 'https://www.computerhope.com/issues/ch001708.htm' }
        ]
      },
      {
        title: "Extensions, types de fichiers et permissions (chmod basique)",
        content: `### Les extensions de fichiers

Une **extension** est le suffixe après le dernier point dans un nom de fichier. Elle indique (mais ne garantit pas !) le type de contenu.

#### Extensions courantes en développement

| Extension | Type | Description |
|-----------|------|-------------|
| .js | Code | JavaScript |
| .py | Code | Python |
| .ts | Code | TypeScript |
| .html | Markup | Page web |
| .css | Style | Feuille de style |
| .json | Données | JavaScript Object Notation |
| .yaml / .yml | Config | Yet Another Markup Language |
| .env | Config | Variables d'environnement |
| .md | Doc | Markdown |
| .sh | Script | Script shell (Linux/macOS) |
| .bat | Script | Script batch (Windows) |
| .log | Journal | Fichiers de log |
| .sql | Base de données | Scripts SQL |
| .git | Dossier caché | Données Git |

> **Important :** Sur Linux/macOS, l'extension n'a pas de valeur technique — un fichier script sans extension peut très bien être exécutable. Sur Windows, l'extension détermine comment le fichier est ouvert.

### Les fichiers cachés

En Unix, tout fichier ou dossier dont le nom commence par . est **caché** par défaut.

\`\`\`bash
ls -a    # -a pour voir TOUS les fichiers, y compris cachés

# Fichiers cachés courants dans un projet dev
.git/          # Données Git
.gitignore     # Fichiers à ignorer par Git
.env           # Variables d'environnement (secrets !)
.DS_Store      # Métadonnées macOS (à ignorer)
.vscode/       # Config VS Code du projet
node_modules/  # Dépendances npm (souvent dans .gitignore)
\`\`\`

### Les permissions Unix (chmod)

Sur Linux et macOS, chaque fichier a des **permissions** qui contrôlent qui peut le lire, le modifier ou l'exécuter.

\`\`\`
-rwxr-xr--
│└──┘└──┘└──┘
│  │   │   └── Autres utilisateurs (r-- = lecture seule)
│  │   └────── Groupe (r-x = lecture + exécution)
│  └────────── Propriétaire (rwx = lecture + écriture + exécution)
└───────────── Type (- = fichier, d = dossier, l = lien)
\`\`\`

#### Les 3 permissions

| Lettre | Signification | Valeur numérique |
|--------|--------------|-----------------|
| r | Read (lecture) | 4 |
| w | Write (écriture) | 2 |
| x | Execute (exécution) | 1 |
| - | Permission absente | 0 |

#### Utiliser chmod

\`\`\`bash
# Méthode symbolique
chmod +x script.sh          # Ajouter l'exécution pour tous
chmod u+w fichier.txt       # Ajouter l'écriture pour le propriétaire
chmod go-w fichier.txt      # Retirer l'écriture pour groupe et autres
chmod a+r fichier.txt       # Lecture pour tous

# Méthode numérique (plus commune)
chmod 755 script.sh    # rwxr-xr-x (classique pour scripts)
chmod 644 fichier.txt  # rw-r--r-- (classique pour fichiers)
chmod 600 .env         # rw------- (fichier secret !)
\`\`\`

#### Calculer les permissions numériques

\`\`\`
755 = 7-5-5
      │ │ └── Autres : 4+1 = r-x
      │ └──── Groupe  : 4+1 = r-x
      └────── Propriétaire : 4+2+1 = rwx
\`\`\`

#### Permissions importantes à connaître

| Code | Permissions | Usage typique |
|------|------------|---------------|
| 755 | rwxr-xr-x | Scripts, programmes |
| 644 | rw-r--r-- | Fichiers texte |
| 600 | rw------- | Fichiers secrets (.env, clés SSH) |
| 400 | r-------- | Clés SSH (lecture seule) |

### Voir et changer le propriétaire

\`\`\`bash
# Voir le propriétaire
ls -l fichier.txt

# Changer le propriétaire (nécessite sudo)
chown ethan:staff fichier.txt    # proprietaire:groupe
chown -R ethan dossier/          # -R pour récursif
\`\`\`

Sur Windows, le système de permissions est différent (ACL — Access Control Lists) et se gère via l'interface graphique ou icacls en ligne de commande. Pour le développement quotidien, tu n'auras généralement pas besoin d'y toucher.`,
        links: [
          { label: 'chmod expliqué simplement', url: 'https://www.guru99.com/file-permissions.html' },
          { label: 'Extensions de fichiers pour devs', url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types' }
        ]
      },
    ],
    exercises: [
      {
        title: "Manipuler des fichiers et comprendre les chemins",
        scenario: "Tu travailles sur un projet web en équipe. Tu dois organiser les fichiers de configuration sensibles avec les bonnes permissions, et t'assurer que tu peux naviguer entre les dossiers en utilisant des chemins relatifs et absolus.",
        steps: [
          {
            title: "Créer une arborescence et pratiquer les chemins",
            instructions: `Crée cette structure depuis ton terminal :

\`\`\`bash
# Linux/macOS
mkdir -p ~/tp-chemins/{config,src/{js,css},public}
cd ~/tp-chemins

# Windows PowerShell
mkdir $HOME\\tp-chemins\\config, $HOME\\tp-chemins\\src\\js, $HOME\\tp-chemins\\src\\css, $HOME\\tp-chemins\\public
cd $HOME\\tp-chemins
\`\`\`

Maintenant pratique les chemins. Depuis ~/tp-chemins :
\`\`\`bash
# Chemin absolu
ls /home    # Linux
ls ~        # macOS/Linux

# Chemin relatif
ls src/js
ls ./config
ls ../      # Que vois-tu ?
\`\`\``
          },
          {
            title: "Créer des fichiers avec les bonnes extensions",
            instructions: `Crée les fichiers appropriés dans chaque dossier :

\`\`\`bash
# Linux/macOS
touch config/.env
touch config/config.yml
touch src/js/app.js
touch src/css/styles.css
touch public/index.html
echo "DB_PASSWORD=secret123" > config/.env
echo "PORT=3000" >> config/.env

# Windows PowerShell
New-Item config/.env, config/config.yml, src/js/app.js, src/css/styles.css, public/index.html
Set-Content config/.env "DB_PASSWORD=secret123"
Add-Content config/.env "PORT=3000"
\`\`\`

Vérifie que les fichiers cachés sont visibles :
\`\`\`bash
ls -la config/   # Linux/macOS (le .env doit apparaître)
\`\`\``
          },
          {
            title: "Appliquer les bonnes permissions (Linux/macOS)",
            instructions: `Cette étape est pour Linux/macOS uniquement. Sur Windows, passe à l'étape suivante.

Applique les permissions appropriées :

\`\`\`bash
# Le fichier .env contient des secrets : lecture/écriture pour toi seulement
chmod 600 config/.env

# Les fichiers JS et CSS : lisibles par tout le monde, modifiables seulement par toi
chmod 644 src/js/app.js
chmod 644 src/css/styles.css

# Vérifie les permissions
ls -la config/
ls -la src/js/

# Essaie de lire le .env
cat config/.env

# Calcule : quelles permissions en chiffres correspond à rw-r--r-- ?
# r=4, w=2, x=1 → rw-=6, r--=4, r--=4 → 644
\`\`\`

Quel code numérique correspond à rwxr-xr-x ? Calcule avant de vérifier.`
          },
          {
            title: "Navigation avancée avec chemins relatifs",
            instructions: `Depuis n'importe quel endroit de ton système, navigue vers ton projet en utilisant des chemins absolus, puis pratique les chemins relatifs.

\`\`\`bash
# Va dans le dossier home
cd ~

# Retourne dans le projet en chemin absolu
cd ~/tp-chemins/src/js    # Linux/macOS
cd $HOME\\tp-chemins\\src\\js  # Windows

# Maintenant utilise des chemins relatifs pour naviguer
cd ../../config           # Remonte 2 fois, puis va dans config
pwd                       # Vérifie où tu es

cd ../src/css             # Remonte puis descend dans css
pwd

# Créer un lien symbolique (Linux/macOS seulement)
cd ~/tp-chemins
ln -s config/.env .env-link
ls -la | grep env
\`\`\``
          },
        ],
        hints: [
          "Sur Windows, les fichiers commençant par '.' ne sont pas automatiquement cachés — c'est une convention Unix",
          "Pour voir la valeur d'une permission en chiffres : r=4, w=2, x=1, additionne les trois pour chaque catégorie (user/group/other)",
          "chmod ne fonctionne que sur Linux et macOS — sur Windows, utilise les propriétés du fichier dans l'explorateur",
          "Si tu te perds dans la navigation, tape cd seul (Linux/macOS) ou cd $HOME (Windows) pour retourner chez toi"
        ],
        solution: `# Solution complète

## Linux/macOS
\`\`\`bash
# Créer la structure
mkdir -p ~/tp-chemins/{config,src/{js,css},public}
cd ~/tp-chemins

# Créer les fichiers
touch config/.env config/config.yml src/js/app.js src/css/styles.css public/index.html
echo "DB_PASSWORD=secret123" > config/.env
echo "PORT=3000" >> config/.env

# Permissions
chmod 600 config/.env           # rw-------
chmod 644 src/js/app.js         # rw-r--r--
chmod 644 src/css/styles.css    # rw-r--r--

# Vérification
ls -la config/

# Navigation avec chemins relatifs depuis src/js
cd ~/tp-chemins/src/js
cd ../../config
pwd   # → ~/tp-chemins/config

# Lien symbolique
cd ~/tp-chemins
ln -s config/.env .env-link
ls -la .env-link
\`\`\`

## Réponse au calcul de permissions
- rwxr-xr-x = 7 (4+2+1) + 5 (4+0+1) + 5 (4+0+1) = 755
- rw-r--r-- = 6 (4+2+0) + 4 (4+0+0) + 4 (4+0+0) = 644
- rw------- = 6 (4+2+0) + 0 + 0 = 600`
      }
    ],
  },

  {
    id: 804, level: 'Débutant', title: "Les réseaux informatiques",
    desc: "Comprends comment les ordinateurs communiquent : IP, DNS, HTTP, ports et le voyage d'une requête web.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "IP, DNS, ports et protocoles : les fondamentaux du réseau",
        content: `### Comment les ordinateurs se trouvent sur Internet

Internet, c'est des millions d'ordinateurs connectés entre eux. Pour qu'ils puissent se parler, il faut un système d'adressage. C'est le rôle des **adresses IP**.

#### L'adresse IP

Une adresse IP (Internet Protocol) est l'identifiant unique d'un appareil sur un réseau. Comme ton adresse postale, mais pour les ordinateurs.

\`\`\`
IPv4 : 192.168.1.42
       └─┘ └───┘ └┘
        │    │    └── Identifiant de l'appareil
        │    └─────── Identifiant du sous-réseau
        └──────────── Identifiant du réseau
\`\`\`

**IPv4** : 4 nombres de 0 à 255, séparés par des points (~4 milliards d'adresses possibles)
**IPv6** : format plus long en hexadécimal (~340 sextillions d'adresses) : 2001:0db8:85a3::8a2e:0370:7334

Adresses IP spéciales à connaître :
- 127.0.0.1 = **localhost** = ton propre ordinateur
- 192.168.x.x = réseau local (chez toi, derrière ton box)
- 0.0.0.0 = toutes les interfaces réseau

#### Le DNS : l'annuaire d'Internet

Personne ne retient des adresses IP. On retient des noms : google.com, github.com…

Le **DNS (Domain Name System)** traduit les noms en adresses IP :

\`\`\`
Tu tapes : google.com
    ↓
Ton ordinateur demande au serveur DNS : "C'est quoi l'IP de google.com ?"
    ↓
DNS répond : "142.250.74.46"
    ↓
Ton navigateur se connecte à 142.250.74.46
\`\`\`

C'est comme l'annuaire téléphonique : tu cherches "Pizzeria du coin", l'annuaire te donne le numéro.

\`\`\`bash
# Faire une résolution DNS depuis le terminal
nslookup google.com    # Windows/Linux/macOS
dig google.com         # Linux/macOS (plus détaillé)
ping google.com        # Affiche aussi l'IP
\`\`\`

#### Les ports : les portes d'un bâtiment

L'adresse IP identifie l'ordinateur, mais le **port** identifie quel service sur cet ordinateur. Imagine un immeuble : l'adresse IP est l'adresse de l'immeuble, le port est le numéro d'appartement.

| Port | Protocole | Usage |
|------|-----------|-------|
| 80 | HTTP | Sites web non sécurisés |
| 443 | HTTPS | Sites web sécurisés (SSL/TLS) |
| 22 | SSH | Connexion distante sécurisée |
| 21 | FTP | Transfert de fichiers |
| 3306 | MySQL | Base de données MySQL |
| 5432 | PostgreSQL | Base de données PostgreSQL |
| 6379 | Redis | Cache Redis |
| 27017 | MongoDB | Base de données MongoDB |
| 3000 | — | Souvent utilisé par les apps Node.js en dev |
| 8080 | — | Alternative HTTP courante en dev |

Quand tu développes une app web, tu verras souvent http://localhost:3000 — c'est ton ordinateur (localhost) sur le port 3000.

#### Les protocoles : les langues de l'Internet

Un **protocole** est un ensemble de règles qui définit comment les ordinateurs communiquent.

| Protocole | Couche | Rôle |
|-----------|--------|------|
| **HTTP/HTTPS** | Application | Transfert de pages web |
| **TCP** | Transport | Connexion fiable, dans l'ordre |
| **UDP** | Transport | Rapide, sans garantie (jeux vidéo, streaming) |
| **IP** | Réseau | Adressage et routage |
| **DNS** | Application | Résolution de noms |
| **SSH** | Application | Connexion distante sécurisée |

Le modèle OSI organise ces protocoles en 7 couches, mais en pratique tu travailleras surtout avec HTTP, TCP et IP.`,
        links: [
          { label: 'Comment fonctionne Internet (expliqué simplement)', url: 'https://www.youtube.com/watch?v=TNQsmPf24go' },
          { label: 'Introduction au DNS', url: 'https://www.cloudflare.com/fr-fr/learning/dns/what-is-dns/' }
        ]
      },
      {
        title: "HTTP(S) : le voyage d'une requête web, client et serveur",
        content: `### Requête et réponse : la conversation du web

Chaque fois que tu ouvres une page web, ton navigateur envoie une **requête HTTP** au serveur, qui répond avec une **réponse HTTP**. C'est un dialogue très précis.

\`\`\`
[Ton navigateur]                    [Serveur Web]
      │                                   │
      │── GET /index.html HTTP/1.1 ──────→│
      │   Host: example.com               │
      │   User-Agent: Chrome/120          │
      │                                   │
      │←── HTTP/1.1 200 OK ───────────────│
      │    Content-Type: text/html        │
      │    Content-Length: 1234           │
      │                                   │
      │    <html>...</html>               │
      │                                   │
\`\`\`

### Les méthodes HTTP

HTTP définit plusieurs **méthodes** (ou verbes) qui indiquent l'action souhaitée :

| Méthode | Usage | Exemple |
|---------|-------|---------|
| **GET** | Récupérer une ressource | Charger une page web |
| **POST** | Créer une ressource | Envoyer un formulaire |
| **PUT** | Remplacer une ressource | Modifier un profil complet |
| **PATCH** | Modifier partiellement | Changer juste l'email |
| **DELETE** | Supprimer une ressource | Supprimer un compte |

### Les codes de réponse HTTP

Le serveur répond toujours avec un **code de statut** qui indique si tout s'est bien passé.

| Code | Signification | Exemples |
|------|--------------|---------|
| **2xx** | Succès | 200 OK, 201 Created, 204 No Content |
| **3xx** | Redirection | 301 Moved Permanently, 302 Found |
| **4xx** | Erreur du client | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found |
| **5xx** | Erreur du serveur | 500 Internal Server Error, 503 Service Unavailable |

Les plus courants :
- **200** : Tout va bien !
- **404** : Page introuvable (le serveur existe, mais pas cette URL)
- **401** : Non authentifié (tu dois te connecter)
- **403** : Interdit (tu es connecté mais n'as pas les droits)
- **500** : Le serveur a planté (bug côté serveur)

### HTTPS : la version sécurisée

HTTP envoie les données **en clair**. N'importe qui sur le réseau peut les lire. HTTPS ajoute une couche de chiffrement (SSL/TLS).

\`\`\`
HTTP  : Comme écrire sur une carte postale — le facteur peut lire
HTTPS : Comme envoyer une lettre dans une enveloppe scellée
\`\`\`

HTTPS fonctionne avec des **certificats** émis par des autorités de certification. C'est ce qui fait apparaître le cadenas dans ton navigateur.

### Anatomie d'une URL

\`\`\`
https://www.example.com:443/blog/article?page=2&lang=fr#section-3
│       │   │           │   │            │               │
│       │   │           │   │            │               └── Ancre (fragment)
│       │   │           │   │            └── Paramètres de requête
│       │   │           │   └── Chemin (path)
│       │   │           └── Port (optionnel si standard)
│       │   └── Domaine
│       └── Sous-domaine
└── Protocole (scheme)
\`\`\`

### Les en-têtes HTTP (headers)

Les requêtes et réponses HTTP incluent des **en-têtes** : des métadonnées sur la requête.

En-têtes de requête courants :
\`\`\`
Host: example.com
User-Agent: Mozilla/5.0...
Accept: text/html,application/json
Authorization: Bearer eyJhbGc...
Content-Type: application/json
Cookie: session=abc123
\`\`\`

En-têtes de réponse courants :
\`\`\`
Content-Type: text/html; charset=UTF-8
Set-Cookie: session=abc123; HttpOnly
Cache-Control: max-age=3600
Location: https://example.com/new-url
\`\`\`

### Le modèle client-serveur

\`\`\`
                   Internet
[Client]  ←────────────────→  [Serveur]
Navigateur                    nginx / Apache
Application mobile            Node.js / Django / Spring
Script Python (requests)      API REST
\`\`\`

Le **client** initie toujours la communication. Le **serveur** attend et répond. Un même ordinateur peut être à la fois client ET serveur (c'est ce qui se passe quand tu développes en local sur localhost).`,
        links: [
          { label: 'HTTP expliqué par MDN', url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Overview' },
          { label: 'Codes de statut HTTP', url: 'https://developer.mozilla.org/fr/docs/Web/HTTP/Status' }
        ]
      },
    ],
    exercises: [
      {
        title: "Inspecter des requêtes réseau avec curl",
        scenario: "En tant que développeur junior, tu dois vérifier que les APIs de ton application répondent correctement. Tu vas utiliser curl, l'outil en ligne de commande utilisé par tous les devs pour tester des requêtes HTTP.",
        steps: [
          {
            title: "Installer et tester curl",
            instructions: `curl est préinstallé sur macOS et Linux. Sur Windows, il est disponible dans PowerShell depuis Windows 10.

\`\`\`bash
# Vérifier que curl est disponible
curl --version

# Première requête : obtenir une page web
curl https://httpbin.org/get
\`\`\`

httpbin.org est un service public parfait pour tester des requêtes HTTP — il renvoie des infos sur la requête qu'il reçoit.

Que vois-tu ? Tu devrais voir un objet JSON avec des infos sur ta requête (ton IP, les en-têtes envoyés, etc.)`
          },
          {
            title: "Explorer les codes de réponse HTTP",
            instructions: `Utilise l'option -I (ou --head) pour voir uniquement les en-têtes de réponse :

\`\`\`bash
# Voir les en-têtes d'une réponse 200 OK
curl -I https://httpbin.org/status/200

# Voir une réponse 404
curl -I https://httpbin.org/status/404

# Voir une redirection 301
curl -I https://httpbin.org/status/301

# Suivre les redirections automatiquement
curl -L -I https://httpbin.org/redirect/1
\`\`\`

Pour chaque commande, note :
- Le code de statut HTTP (la ligne "HTTP/2 200", "HTTP/2 404"…)
- Les en-têtes de réponse importants`
          },
          {
            title: "Faire une requête POST avec des données",
            instructions: `Maintenant envoie des données JSON au serveur (comme un formulaire) :

\`\`\`bash
# Requête POST avec données JSON
curl -X POST https://httpbin.org/post \\
  -H "Content-Type: application/json" \\
  -d '{"nom": "Ethan", "role": "developpeur"}'

# Voir tous les détails (requête ET réponse)
curl -v https://httpbin.org/get 2>&1 | head -50
\`\`\`

L'option -v (verbose) affiche tous les détails : la connexion TCP, les en-têtes envoyés (lignes >) et reçus (lignes <).

Identifie dans la sortie de -v :
- L'adresse IP du serveur
- Les en-têtes de ta requête
- Le code de réponse`
          },
          {
            title: "Tester une vraie API publique",
            instructions: `Utilise l'API publique de JSONPlaceholder (une fausse API de test) :

\`\`\`bash
# Récupérer une liste d'utilisateurs
curl https://jsonplaceholder.typicode.com/users

# Récupérer un utilisateur spécifique (GET avec ID)
curl https://jsonplaceholder.typicode.com/users/1

# Créer un post (POST)
curl -X POST https://jsonplaceholder.typicode.com/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Mon premier post", "body": "Contenu du post", "userId": 1}'

# Afficher le résultat joliment (si python est installé)
curl https://jsonplaceholder.typicode.com/users/1 | python -m json.tool
\`\`\``
          },
        ],
        hints: [
          "Si curl n'est pas disponible sur Windows, ouvre PowerShell en tant qu'administrateur et installe-le, ou utilise Invoke-WebRequest à la place",
          "L'option -I affiche seulement les en-têtes (HEAD request), -v affiche tout en détail",
          "httpbin.org est un outil de test fantastique — il renvoie exactement ce qu'il reçoit, parfait pour apprendre",
          "Le \\ en fin de ligne (Linux/macOS) permet de continuer la commande à la ligne suivante — sur Windows PowerShell, utilise le backtick"
        ],
        solution: `# Solution complète

## Vérification de curl
\`\`\`bash
curl --version
# Attendu : curl 7.x.x ou supérieur
\`\`\`

## Codes de réponse
\`\`\`bash
curl -I https://httpbin.org/status/200
# → HTTP/2 200

curl -I https://httpbin.org/status/404
# → HTTP/2 404

curl -I https://httpbin.org/status/301
# → HTTP/2 301
# → location: /redirect/1
\`\`\`

## Requête POST
\`\`\`bash
curl -X POST https://httpbin.org/post \\
  -H "Content-Type: application/json" \\
  -d '{"nom": "Ethan", "role": "developpeur"}'

# Réponse attendue : JSON contenant ton payload dans "json":
# {
#   "json": {
#     "nom": "Ethan",
#     "role": "developpeur"
#   }
# }
\`\`\`

## API JSONPlaceholder
\`\`\`bash
curl https://jsonplaceholder.typicode.com/users/1
# → {"id":1,"name":"Leanne Graham","username":"Bret",...}

curl -X POST https://jsonplaceholder.typicode.com/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Mon premier post", "body": "Contenu du post", "userId": 1}'
# → {"id":101,...}
\`\`\`

## Ce que tu as appris
- curl envoie des requêtes HTTP depuis le terminal
- -I : voir uniquement les en-têtes
- -v : mode verbeux (tout voir)
- -X POST : choisir la méthode HTTP
- -H : ajouter un en-tête
- -d : envoyer des données dans le body
- -L : suivre les redirections`
      }
    ],
  },

  {
    id: 805, level: 'Débutant', title: "Termes techniques essentiels",
    desc: "Déchiffre le jargon du développement : API, JSON, binaire, encodage, variables d'environnement et plus encore.",
    color: 'violet', colorHex: '#7C3AED',
    lessons: [
      {
        title: "API, JSON, binaire et encodage : le vocabulaire du dev",
        content: `### API : l'interface entre les programmes

**API** signifie Application Programming Interface — c'est une interface qui permet à deux programmes de communiquer entre eux.

Imagine un restaurant :
- **Toi** = le programme client
- **La carte du menu** = l'API (ce que tu peux commander, comment)
- **La cuisine** = le serveur (la logique interne que tu ne vois pas)
- **Le serveur** = le transport des requêtes/réponses

\`\`\`
[Ton App]  ──── requête API ────→  [Service Externe]
           ←─── réponse JSON ────  (Météo, Paiement, Maps...)
\`\`\`

#### Types d'APIs

| Type | Description | Exemple |
|------|-------------|---------|
| **REST API** | HTTP + JSON, très répandu | GitHub API, Stripe |
| **GraphQL** | Requêtes flexibles | Shopify, GitHub v4 |
| **WebSocket** | Communication bidirectionnelle temps réel | Slack, chat |
| **SDK/Library** | Fonctions appelables directement | React, NumPy |

Une **API REST** est une API qui utilise les méthodes HTTP (GET, POST, PUT, DELETE) sur des URLs pour manipuler des ressources.

### JSON : le format universel des données

**JSON** (JavaScript Object Notation) est le format le plus utilisé pour échanger des données entre programmes. C'est du texte structuré que les humains ET les machines peuvent lire facilement.

\`\`\`json
{
  "nom": "Ethan",
  "age": 25,
  "actif": true,
  "adresse": {
    "ville": "Paris",
    "codePostal": "75001"
  },
  "competences": ["Python", "JavaScript", "Docker"],
  "telephone": null
}
\`\`\`

#### Les types de données en JSON

| Type | Exemple | Description |
|------|---------|-------------|
| String | "hello" | Texte entre guillemets doubles |
| Number | 42, 3.14 | Nombre entier ou décimal |
| Boolean | true, false | Vrai ou faux |
| Array | [1, 2, 3] | Liste ordonnée |
| Object | {"clé": "valeur"} | Ensemble de paires clé-valeur |
| Null | null | Valeur absente |

Règles importantes en JSON :
- Les clés doivent être entre guillemets doubles
- Pas de virgule après le dernier élément
- Pas de commentaires
- Utilise null (pas undefined ou None)

### Le binaire, les bits et les octets

Tout dans un ordinateur est stocké en **binaire** : des 0 et des 1.

\`\`\`
Système décimal (base 10) : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11...
Système binaire (base 2)  : 0, 1, 10, 11, 100, 101, 110, 111, 1000...
\`\`\`

| Terme | Définition | Exemple |
|-------|-----------|---------|
| **Bit** | Un 0 ou un 1 | 1 |
| **Octet (Byte)** | 8 bits | 01001000 |
| **Ko (Kilooctet)** | 1 024 octets | Un petit fichier texte |
| **Mo (Mégaoctet)** | 1 024 Ko | Une photo |
| **Go (Gigaoctet)** | 1 024 Mo | Un film HD |
| **To (Téraoctet)** | 1 024 Go | Un disque dur |

La lettre H en ASCII = 72 en décimal = 01001000 en binaire.

### L'encodage : UTF-8 et ASCII

Les ordinateurs ne stockent que des nombres. L'**encodage** est la convention qui dit "le nombre 65 représente la lettre A".

#### ASCII (7 bits, 128 caractères)

ASCII est l'encodage original (1963). Il gère les lettres anglaises, chiffres et symboles de base.

\`\`\`
A = 65, B = 66, C = 67...
a = 97, b = 98, c = 99...
0 = 48, 1 = 49, 2 = 50...
\`\`\`

**Problème :** ASCII ne gère pas les accents (é, à, ç), les caractères chinois, arabes, emoji…

#### UTF-8 : l'encodage universel

**UTF-8** peut représenter TOUS les caractères de toutes les langues (plus de 140 000 caractères). C'est l'encodage standard du web.

\`\`\`
'A' = 1 octet  (0x41)
'é' = 2 octets (0xC3 0xA9)
'中' = 3 octets (0xE4 0xB8 0xAD)
'😀' = 4 octets (0xF0 0x9F 0x98 0x80)
\`\`\`

UTF-8 est **rétrocompatible** avec ASCII : les 128 premiers caractères ASCII ont la même représentation.

**Toujours utiliser UTF-8** dans tes projets pour éviter les problèmes d'encodage (les fameux caractères incorrects à la place des accents).`,
        links: [
          { label: 'Introduction aux APIs REST', url: 'https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Introduction' },
          { label: 'JSON officiel', url: 'https://www.json.org/json-fr.html' },
          { label: 'UTF-8 expliqué', url: 'https://www.utf8.com/' }
        ]
      },
      {
        title: "Variables d'environnement, compilation vs interprétation, glossaire dev",
        content: `### Les variables d'environnement

Les **variables d'environnement** sont des valeurs de configuration stockées en dehors du code. Elles permettent de configurer un programme différemment selon l'environnement (dev, prod, test).

Pourquoi ne pas mettre la config directement dans le code ?

\`\`\`python
# MAUVAIS : clé API dans le code
API_KEY = "sk-abc123secret456"
DB_URL = "postgresql://user:motdepasse@prod.server.com/db"

# BIEN : depuis l'environnement
import os
API_KEY = os.environ.get("API_KEY")
DB_URL = os.environ.get("DATABASE_URL")
\`\`\`

Si ton code est sur GitHub, la clé API dans le code est visible de TOUS. Les variables d'environnement restent sur ta machine.

#### Voir et créer des variables d'environnement

\`\`\`bash
# Linux/macOS
env                          # Lister toutes les variables
echo $HOME                   # Voir la valeur d'une variable
echo $PATH
export MA_VAR="valeur"       # Créer une variable (pour la session)

# Windows PowerShell
Get-ChildItem Env:           # Lister toutes
$env:USERPROFILE             # Voir une variable
$env:MA_VAR = "valeur"       # Créer une variable
\`\`\`

#### Le fichier .env

Dans les projets, on utilise un fichier .env pour stocker les variables localement :

\`\`\`bash
# fichier .env (NE JAMAIS COMMITER SUR GIT !)
DATABASE_URL=postgresql://localhost/mabase
API_KEY=sk-abc123
PORT=3000
NODE_ENV=development
DEBUG=true
\`\`\`

Ce fichier est chargé automatiquement par des bibliothèques comme python-dotenv ou dotenv pour Node.js.

### Compilation vs Interprétation (révision et approfondissement)

On en a parlé dans le module 801. Voici un tableau plus complet :

| Critère | Compilation | Interprétation |
|---------|-------------|----------------|
| **Quand traduit ?** | Avant l'exécution | Pendant l'exécution |
| **Vitesse** | Très rapide | Plus lent |
| **Distribution** | Binaire exécutable | Nécessite l'interpréteur |
| **Débogage** | Erreurs à la compilation | Erreurs à l'exécution |
| **Exemples** | C, C++, Rust, Go | Python, Ruby, PHP |
| **Cas hybride** | Java, C# (bytecode + JVM) | JavaScript (JIT) |

**JIT (Just-In-Time)** : certains interpréteurs compilent le code pendant l'exécution pour l'accélérer. C'est ce que fait le moteur V8 de Chrome pour JavaScript.

### Glossaire essentiel du développeur

| Terme | Définition |
|-------|-----------|
| **Repository (repo)** | Dossier de projet versionné avec Git |
| **Commit** | Sauvegarde d'un état du code |
| **Branch** | Version parallèle du code |
| **Pull Request (PR)** | Proposition de fusion de code |
| **Bug** | Erreur dans le code |
| **Debug** | Processus de recherche et correction de bugs |
| **Refactoring** | Réécrire du code sans changer son comportement |
| **Déployer** | Mettre une application en production |
| **Framework** | Ensemble d'outils et conventions pour construire des apps |
| **Bibliothèque (lib)** | Ensemble de fonctions réutilisables |
| **Dépendance** | Bibliothèque externe utilisée par ton projet |
| **Package manager** | Outil pour gérer les dépendances (npm, pip, cargo…) |
| **CI/CD** | Intégration et déploiement continus |
| **Docker** | Outil pour packager une app dans un conteneur |
| **API endpoint** | URL précise d'une API |
| **Authentication** | Vérifier qui tu es |
| **Authorization** | Vérifier ce que tu as le droit de faire |
| **CRUD** | Create, Read, Update, Delete — les 4 opérations de base |
| **ORM** | Outil pour interagir avec une BDD via du code objet |
| **Stack** | L'ensemble des technologies utilisées dans un projet |
| **Frontend** | La partie visible par l'utilisateur (navigateur) |
| **Backend** | La partie serveur (logique métier, BDD) |
| **Full-stack** | Développeur qui fait les deux |
| **Open source** | Code source disponible publiquement |
| **MIT License** | Licence open source très permissive |

### Termes liés aux données

| Terme | Définition |
|-------|-----------|
| **BDD (base de données)** | Système de stockage organisé |
| **SQL** | Langage pour interroger des BDD relationnelles |
| **NoSQL** | BDD non relationnelle (MongoDB, Redis…) |
| **Schema** | Structure d'une BDD ou d'un objet |
| **Migration** | Script pour faire évoluer la structure d'une BDD |
| **Cache** | Stockage temporaire pour accélérer les accès |
| **Index** | Structure qui accélère les recherches en BDD |`,
        links: [
          { label: "Variables d'environnement expliquées", url: 'https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html' },
          { label: 'Glossaire dev (en anglais)', url: 'https://developer.mozilla.org/en-US/docs/Glossary' }
        ]
      },
    ],
    exercises: [
      {
        title: "Lire et manipuler du JSON, appeler une API publique",
        scenario: "Tu dois intégrer une API météo dans une application. Pour préparer cette intégration, tu vas d'abord pratiquer la lecture et la manipulation de JSON en ligne de commande, puis appeler une API publique réelle.",
        steps: [
          {
            title: "Créer et lire un fichier JSON",
            instructions: `Crée un fichier JSON représentant un utilisateur :

**Linux/macOS :**
\`\`\`bash
cat > utilisateur.json << 'EOF'
{
  "id": 1,
  "nom": "Ethan Vuillemin",
  "email": "ethan@example.com",
  "age": 25,
  "actif": true,
  "competences": ["Python", "JavaScript", "Git"],
  "adresse": {
    "ville": "Paris",
    "pays": "France"
  }
}
EOF
\`\`\`

**Windows PowerShell :**
\`\`\`powershell
$json = @'
{
  "id": 1,
  "nom": "Ethan Vuillemin",
  "email": "ethan@example.com",
  "age": 25,
  "actif": true,
  "competences": ["Python", "JavaScript", "Git"],
  "adresse": {
    "ville": "Paris",
    "pays": "France"
  }
}
'@
$json | Out-File utilisateur.json -Encoding utf8
\`\`\`

Valide le JSON :
\`\`\`bash
python -m json.tool utilisateur.json
\`\`\``
          },
          {
            title: "Parser du JSON avec Python",
            instructions: `Python est préinstallé sur macOS et Linux, et souvent sur Windows. Lance-le en mode interactif :

\`\`\`bash
python3   # Linux/macOS
python    # Windows
\`\`\`

Dans le prompt Python (>>>) :
\`\`\`python
import json

# Lire un fichier JSON
with open('utilisateur.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Accéder aux valeurs
print(data['nom'])
print(data['age'])
print(data['competences'])
print(data['adresse']['ville'])

# Modifier et sauvegarder
data['age'] = 26
data['competences'].append('Docker')

with open('utilisateur-v2.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Fichier sauvegardé !")
exit()
\`\`\``
          },
          {
            title: "Appeler une API publique et manipuler la réponse",
            instructions: `Utilise l'API Open-Meteo (gratuite, sans clé API) pour récupérer la météo de Paris :

\`\`\`bash
# Appel avec curl
curl "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,wind_speed_10m"
\`\`\`

Maintenant fais la même chose avec Python :

\`\`\`bash
python3   # ou python sur Windows
\`\`\`

\`\`\`python
import urllib.request
import json

url = "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,wind_speed_10m"

with urllib.request.urlopen(url) as response:
    data = json.loads(response.read())

temp = data['current']['temperature_2m']
vent = data['current']['wind_speed_10m']
print(f"Météo à Paris :")
print(f"  Température : {temp}°C")
print(f"  Vent : {vent} km/h")
exit()
\`\`\``
          },
          {
            title: "Variables d'environnement",
            instructions: `Pratique l'utilisation des variables d'environnement :

**Linux/macOS :**
\`\`\`bash
export MON_API_KEY="abc123secret"
export MON_PORT="3000"

echo $MON_API_KEY
echo $MON_PORT

python3 -c "import os; print(os.environ.get('MON_API_KEY', 'Non défini'))"
\`\`\`

**Windows PowerShell :**
\`\`\`powershell
$env:MON_API_KEY = "abc123secret"
$env:MON_PORT = "3000"

Write-Host $env:MON_API_KEY

python -c "import os; print(os.environ.get('MON_API_KEY', 'Non défini'))"
\`\`\``
          },
        ],
        hints: [
          "Si Python n'est pas installé, va sur python.org et installe la dernière version — coche bien 'Add Python to PATH' sur Windows",
          "Le module urllib.request est inclus dans Python, pas besoin d'installer quoi que ce soit",
          "Pour quitter le prompt Python (>>>), tape exit() ou appuie sur Ctrl+D (Linux/macOS) ou Ctrl+Z puis Entrée (Windows)",
          "Si l'API Open-Meteo ne répond pas, vérifie ta connexion internet et réessaie — c'est un service gratuit avec des limites"
        ],
        solution: `# Solution complète

## Créer et valider le JSON (Linux/macOS)
\`\`\`bash
cat > utilisateur.json << 'EOF'
{
  "id": 1,
  "nom": "Ethan Vuillemin",
  "email": "ethan@example.com",
  "age": 25,
  "actif": true,
  "competences": ["Python", "JavaScript", "Git"],
  "adresse": {"ville": "Paris", "pays": "France"}
}
EOF

python3 -m json.tool utilisateur.json
\`\`\`

## Script Python complet (sauvegarder en meteo.py)
\`\`\`python
import json
import urllib.request
import os

with open('utilisateur.json', 'r', encoding='utf-8') as f:
    user = json.load(f)

print(f"Utilisateur : {user['nom']}")
print(f"Ville : {user['adresse']['ville']}")
print(f"Compétences : {', '.join(user['competences'])}")

user['age'] += 1
user['competences'].append('Docker')

with open('utilisateur-v2.json', 'w', encoding='utf-8') as f:
    json.dump(user, f, indent=2, ensure_ascii=False)

url = "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,wind_speed_10m"
with urllib.request.urlopen(url) as response:
    meteo = json.loads(response.read())

temp = meteo['current']['temperature_2m']
vent = meteo['current']['wind_speed_10m']
print(f"Météo à Paris : {temp}°C, vent {vent} km/h")

api_key = os.environ.get('MON_API_KEY', 'Non configurée')
print(f"API Key depuis env : {api_key}")
\`\`\`

\`\`\`bash
export MON_API_KEY="abc123"
python3 meteo.py
\`\`\``
      }
    ],
  },

  {
    id: 806, level: 'Intermédiaire', title: "Configurer son environnement de dev",
    desc: "Setup complet : VS Code, extensions essentielles, terminal intégré, variables d'env, PATH et git config.",
    color: 'emerald', colorHex: '#10B981',
    lessons: [
      {
        title: "VS Code : installation, extensions essentielles et terminal intégré",
        content: `### Pourquoi VS Code ?

VS Code (Visual Studio Code) est l'éditeur de code le plus utilisé au monde (enquête Stack Overflow 2023 : 73% des développeurs). Ce n'est pas un IDE lourd comme Eclipse ou IntelliJ : c'est un éditeur léger, rapide et infiniment personnalisable via des extensions.

Il est **gratuit**, **open source**, disponible sur Windows, macOS et Linux, et développé par Microsoft.

### Installer VS Code

1. Va sur **https://code.visualstudio.com**
2. Clique sur "Download" — le site détecte ton OS automatiquement
3. Installe-le comme n'importe quelle application

**Sur Windows :** lors de l'installation, coche :
- Ajouter à PATH (important !)
- Ajouter au menu contextuel

**Sur macOS :** après installation, ouvre VS Code, fais Cmd+Shift+P, tape "Shell Command: Install 'code' command in PATH" et appuie sur Entrée.

**Vérification :**
\`\`\`bash
code --version   # Doit afficher le numéro de version
code .           # Ouvrir le dossier actuel dans VS Code
\`\`\`

### L'interface de VS Code

\`\`\`
┌─────────────────────────────────────────────┐
│ [Explorer] [Search] [Git] [Debug] [Ext]     │  ← Activity Bar (gauche)
├──────┬──────────────────────────────────────┤
│      │  index.js  x   style.css              │  ← Tabs (onglets)
│      ├──────────────────────────────────────┤
│      │  1  const app = require('express')   │
│ File │  2  const port = 3000                │  ← Éditeur principal
│ Tree │  3                                   │
│      │  4  app.get('/', (req, res) => {     │
│      │  5    res.send('Hello World')         │
│      │  6  })                               │
├──────┴──────────────────────────────────────┤
│ > Terminal intégré                          │  ← Terminal
│ $ node index.js                             │
└─────────────────────────────────────────────┘
\`\`\`

### Extensions essentielles à installer

Ouvre VS Code, clique sur l'icône Extensions dans la barre latérale (ou Ctrl+Shift+X), et installe :

#### Extensions universelles (tout le monde)

| Extension | Utilité |
|-----------|---------|
| **Prettier** | Formateur de code automatique |
| **ESLint** | Détection d'erreurs JavaScript |
| **GitLens** | Visualisation avancée de Git |
| **Error Lens** | Affiche les erreurs directement sur la ligne |
| **Auto Rename Tag** | Renomme les balises HTML fermantes automatiquement |
| **Path Intellisense** | Autocomplétion des chemins de fichiers |
| **Material Icon Theme** | Icônes colorées pour les fichiers |
| **One Dark Pro** | Thème sombre populaire |

#### Extensions par langage

| Langage | Extensions recommandées |
|---------|------------------------|
| **Python** | Python (Microsoft), Pylance |
| **JavaScript/TypeScript** | Déjà inclus dans VS Code |
| **HTML/CSS** | Live Server (pour preview en temps réel) |
| **Docker** | Docker (Microsoft) |
| **YAML** | YAML (Red Hat) |
| **Markdown** | Markdown All in One |

### Le terminal intégré

Le terminal intégré est l'une des features les plus utiles de VS Code. Il s'ouvre dans le contexte de ton projet (le bon dossier !).

**Raccourcis :**
- Ouvrir/fermer : Ctrl+J (ou Ctrl+backtick)
- Nouveau terminal : Ctrl+Shift+backtick
- Diviser le terminal : bouton "Split"

**Changer le shell par défaut :**
1. Ctrl+Shift+P → "Terminal: Select Default Profile"
2. Choisis ton shell préféré (bash, zsh, PowerShell…)

### Raccourcis VS Code indispensables

| Raccourci | Action |
|-----------|--------|
| Ctrl+P | Ouvrir un fichier rapidement |
| Ctrl+Shift+P | Palette de commandes (tout faire) |
| Ctrl+/ | Commenter/décommenter |
| Alt+flèche haut/bas | Déplacer une ligne |
| Ctrl+D | Sélectionner la prochaine occurrence |
| Ctrl+Shift+K | Supprimer une ligne |
| F2 | Renommer un symbole |
| Ctrl+B | Afficher/masquer la sidebar |
| Ctrl+Z | Annuler |`,
        links: [
          { label: 'VS Code — Site officiel', url: 'https://code.visualstudio.com/' },
          { label: 'VS Code Tips & Tricks', url: 'https://code.visualstudio.com/docs/getstarted/tips-and-tricks' },
          { label: 'Extensions VS Code populaires', url: 'https://marketplace.visualstudio.com/vscode' }
        ]
      },
      {
        title: "Variables d'env, PATH et git config initiale",
        content: `### Le PATH : comment ton terminal trouve les programmes

Quand tu tapes python dans le terminal, comment sait-il où Python est installé ? Grâce à la variable d'environnement **PATH** : une liste de dossiers dans lesquels le shell cherche les exécutables.

\`\`\`bash
# Voir ton PATH actuel
echo $PATH        # Linux/macOS
$env:PATH         # Windows PowerShell

# Exemple de PATH Linux/macOS
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/home/ethan/.local/bin

# Chaque chemin est séparé par : (Linux/macOS) ou ; (Windows)
\`\`\`

#### Ajouter un programme au PATH

Si tu installes un programme et qu'il n'est pas dans le PATH, le terminal dira "commande introuvable".

**Linux/macOS — Ajout permanent dans ~/.bashrc ou ~/.zshrc :**
\`\`\`bash
# Ouvre le fichier de config de ton shell
nano ~/.zshrc        # macOS avec zsh
nano ~/.bashrc       # Linux avec bash

# Ajoute cette ligne à la fin
export PATH="$HOME/.local/bin:$PATH"

# Recharge la config
source ~/.zshrc
\`\`\`

**Windows — Via l'interface graphique :**
1. Cherche "Variables d'environnement" dans le menu démarrer
2. Clique sur "Variables d'environnement système"
3. Sélectionne "Path" et clique "Modifier"
4. Ajoute le chemin de ton programme

### Configuration Git initiale

Git est l'outil de versioning incontournable. Avant de l'utiliser, tu dois le configurer avec ton identité.

\`\`\`bash
# Configuration minimale obligatoire
git config --global user.name "Ethan Vuillemin"
git config --global user.email "ethan@example.com"

# Configuration recommandée
git config --global core.editor "code --wait"    # VS Code comme éditeur Git
git config --global init.defaultBranch main       # "main" au lieu de "master"
git config --global pull.rebase false             # Comportement merge par défaut

# Voir ta configuration
git config --list
git config --global --list
\`\`\`

**Pourquoi --global ?** Cette config s'applique à TOUS tes projets Git. Tu peux surcharger projet par projet avec --local.

### Les niveaux de configuration Git

\`\`\`
Priorité (plus élevé = plus prioritaire)
┌─────────────────────────────────────────┐
│ --local  : .git/config dans le projet   │  ← Le plus prioritaire
├─────────────────────────────────────────┤
│ --global : ~/.gitconfig                 │  ← Ta config utilisateur
├─────────────────────────────────────────┤
│ --system : /etc/gitconfig               │  ← Toute la machine
└─────────────────────────────────────────┘
\`\`\`

### Le fichier .gitconfig

Git stocke ta config globale dans ~/.gitconfig. Tu peux l'éditer directement :

\`\`\`ini
[user]
    name = Ethan Vuillemin
    email = ethan@example.com

[core]
    editor = code --wait
    autocrlf = input

[init]
    defaultBranch = main

[pull]
    rebase = false

[alias]
    st = status
    co = checkout
    br = branch
    lg = log --oneline --graph --decorate
\`\`\`

### Le fichier .gitignore global

Certains fichiers ne doivent JAMAIS être versionnés : fichiers de config éditeur, fichiers secrets, etc. Tu peux créer un .gitignore global :

\`\`\`bash
# Linux/macOS
cat > ~/.gitignore_global << 'EOF'
.DS_Store
.AppleDouble
Thumbs.db
Desktop.ini
.vscode/settings.json
.env
.env.local
*.key
*.pem
node_modules/
__pycache__/
*.pyc
EOF

# Dire à Git d'utiliser ce fichier
git config --global core.excludesfile ~/.gitignore_global
\`\`\`

### Vérification complète de l'environnement

\`\`\`bash
git --version          # git version 2.x.x
code --version         # version de VS Code
python3 --version      # Python 3.x.x
node --version         # v18.x.x ou supérieur (si installé)

git config --list

echo $HOME
echo $PATH
echo $SHELL   # Linux/macOS
\`\`\``,
        links: [
          { label: 'Git — Première configuration', url: 'https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Param%C3%A9trage-%C3%A0-la-premi%C3%A8re-utilisation-de-Git' },
          { label: 'gitignore.io — Générateur de .gitignore', url: 'https://www.toptal.com/developers/gitignore' }
        ]
      },
    ],
    exercises: [
      {
        title: "Setup complet d'un environnement de dev de zéro",
        scenario: "Tu commences un nouveau job. Ton manager te donne un ordinateur vierge et te dit : 'Setup ton environnement, tu as une heure'. Tu vas configurer VS Code, Git, et créer ton premier projet correctement configuré.",
        steps: [
          {
            title: "Vérifier et configurer Git",
            instructions: `Vérifie que Git est installé et configure ton identité :

\`\`\`bash
# Vérifier Git
git --version
# Si pas installé : https://git-scm.com/downloads

# Configurer ton identité
git config --global user.name "Ton Prénom Ton Nom"
git config --global user.email "ton.email@example.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main

# Vérifier la configuration
git config --list --global
\`\`\`

Assure-toi que user.name et user.email sont bien configurés.`
          },
          {
            title: "Installer VS Code et les extensions",
            instructions: `Si VS Code n'est pas installé :
1. Va sur https://code.visualstudio.com
2. Télécharge et installe
3. Sur macOS : installe la commande code en ligne de commande (Cmd+Shift+P → "Shell Command")

Vérifie depuis le terminal :
\`\`\`bash
code --version
\`\`\`

Installe ces extensions depuis le terminal :
\`\`\`bash
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
code --install-extension PKief.material-icon-theme

# Vérifie les extensions installées
code --list-extensions
\`\`\``
          },
          {
            title: "Créer un projet avec bonne configuration",
            instructions: `Crée ton premier projet bien configuré :

**Linux/macOS :**
\`\`\`bash
mkdir ~/mon-env-dev-test
cd ~/mon-env-dev-test
git init

cat > .gitignore << 'EOF'
.env
.env.local
node_modules/
__pycache__/
*.pyc
.DS_Store
Thumbs.db
EOF

cat > .env << 'EOF'
APP_NAME=MonProjet
DEBUG=true
PORT=3000
SECRET_KEY=ma-cle-secrete-locale
EOF

cat > hello.py << 'EOF'
import os
app_name = os.environ.get('APP_NAME', 'Inconnu')
debug = os.environ.get('DEBUG', 'false')
print(f"Application : {app_name}")
print(f"Mode debug : {debug}")
EOF

code .
\`\`\`

**Windows PowerShell :**
\`\`\`powershell
mkdir $HOME\\mon-env-dev-test
cd $HOME\\mon-env-dev-test
git init
New-Item .gitignore, .env, hello.py
Set-Content .gitignore ".env\`nnode_modules/\`n__pycache__/\`n*.pyc\`nThumbs.db"
Set-Content .env "APP_NAME=MonProjet\`nDEBUG=true\`nPORT=3000"
Set-Content hello.py "import os\`nprint(f\"App : {os.environ.get('APP_NAME', 'Inconnu')}\")"
code .
\`\`\``
          },
          {
            title: "Premier commit et vérification complète",
            instructions: `Fais ton premier commit et vérifie que tout fonctionne :

\`\`\`bash
# Vérifier le statut Git
git status
# Tu dois voir .gitignore et hello.py (mais PAS .env !)

# Ajouter les fichiers
git add .gitignore hello.py

# Vérifier ce qui va être commité
git status

# Premier commit
git commit -m "Initial commit : setup environnement de dev"

# Voir le log
git log --oneline
\`\`\`

Teste le script Python :

\`\`\`bash
# Linux/macOS
export APP_NAME=MonProjet
export DEBUG=true
python3 hello.py

# Windows PowerShell
$env:APP_NAME = "MonProjet"
$env:DEBUG = "true"
python hello.py
\`\`\``
          },
        ],
        hints: [
          "Si 'code' n'est pas reconnu en ligne de commande après installation, redémarre ton terminal ou suis la procédure d'installation de la commande shell pour macOS",
          "Ne commite JAMAIS le fichier .env — vérifie toujours que .gitignore est correct avant git add",
          "La commande git status est ton meilleur ami — utilise-la avant chaque commit pour vérifier ce que tu commites",
          "Si git config --list montre des valeurs incorrectes, tu peux les modifier avec git config --global user.email 'nouveau@email.com'"
        ],
        solution: `# Solution complète — Setup environnement de dev

## 1. Configuration Git
\`\`\`bash
git config --global user.name "Ethan Vuillemin"
git config --global user.email "ethan@example.com"
git config --global core.editor "code --wait"
git config --global init.defaultBranch main
git config --global pull.rebase false
\`\`\`

## 2. Extensions VS Code
\`\`\`bash
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-eslint
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
code --install-extension PKief.material-icon-theme
\`\`\`

## 3. Projet complet (Linux/macOS)
\`\`\`bash
mkdir ~/mon-env-dev-test && cd ~/mon-env-dev-test
git init

cat > .gitignore << 'EOF'
.env
.env.local
node_modules/
__pycache__/
*.pyc
.DS_Store
EOF

echo "APP_NAME=MonProjet" > .env
echo "DEBUG=true" >> .env
echo "PORT=3000" >> .env

cat > hello.py << 'EOF'
import os
print(f"App : {os.environ.get('APP_NAME', 'Inconnu')}")
print(f"Debug : {os.environ.get('DEBUG', 'false')}")
EOF

git add .gitignore hello.py
git status   # .env ne doit PAS apparaître
git commit -m "Initial commit : setup environnement de dev"
git log --oneline
\`\`\`

## Vérification finale
\`\`\`bash
git --version       # 2.x.x ou +
code --version      # 1.8x.x ou +
git config --list   # user.name et user.email configurés
git log --oneline   # 1 commit visible
\`\`\``
      }
    ],
  },
];

export default BASICS_MODULES;
