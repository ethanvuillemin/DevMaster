/**
 * Modules Python
 * IDs réservés : 900–999
 */

const PYTHON_MODULES = [
  {
    id: 901, level: 'Débutant', title: "Introduction à Python",
    desc: "Découvre Python : installation, premier script, REPL et bonnes pratiques PEP8.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Pourquoi Python ?",
        content: `### Pourquoi apprendre Python ?

Python est l'un des langages de programmation les plus populaires au monde. En 2024, il trône régulièrement en tête des classements comme le TIOBE Index ou le Stack Overflow Developer Survey. Mais pourquoi un tel engouement ?

#### Une syntaxe lisible et intuitive

Python a été conçu pour être lisible. Son créateur, Guido van Rossum, voulait un langage qui ressemble presque à de l'anglais. Compare ce code Python avec un équivalent en Java :

\`\`\`python
# Python
noms = ["Alice", "Bob", "Charlie"]
for nom in noms:
    print(f"Bonjour, {nom} !")
\`\`\`

Le code parle presque de lui-même : "pour chaque nom dans la liste des noms, affiche bonjour suivi du nom."

#### Un langage polyvalent

Python s'utilise dans des domaines très variés :

| Domaine | Exemples d'utilisation |
|---|---|
| Data Science / IA | NumPy, Pandas, TensorFlow, PyTorch |
| Développement web | Django, Flask, FastAPI |
| Automatisation | Scripts, bots, tests automatisés |
| DevOps | Ansible, scripts de déploiement |
| Cybersécurité | Outils de pentest, analyse de logs |

#### Une communauté immense

Avec plus de 400 000 paquets disponibles sur PyPI (Python Package Index), il existe presque toujours une bibliothèque pour ce que tu veux faire. Tu n'as pas à réinventer la roue.

#### Python dans le monde professionnel

Des entreprises comme Google, Instagram, Netflix, Spotify et la NASA utilisent Python au quotidien. C'est aussi le langage de prédilection des data scientists et des ingénieurs en machine learning.

En bref : apprendre Python, c'est ouvrir des portes vers l'automatisation, la data, le web et bien plus encore.`,
        links: [
          { label: 'Site officiel Python', url: 'https://www.python.org' },
          { label: 'Index TIOBE', url: 'https://www.tiobe.com/tiobe-index/' }
        ]
      },
      {
        title: "Installation et premier script",
        content: `### Installer Python et écrire ton premier script

#### Installer Python

Rends-toi sur [python.org/downloads](https://www.python.org/downloads/) et télécharge la dernière version stable (3.11 ou supérieure). Lors de l'installation sur Windows, coche impérativement **"Add Python to PATH"**.

Vérifie l'installation en ouvrant un terminal :

\`\`\`bash
python --version
# ou sur macOS/Linux :
python3 --version
\`\`\`

Tu devrais voir quelque chose comme \`Python 3.11.4\`.

#### L'interpréteur REPL

Python dispose d'un REPL (Read-Eval-Print Loop) : un mode interactif où tu tapes du code et obtiens immédiatement le résultat. Lance-le en tapant \`python\` dans ton terminal :

\`\`\`python
>>> 2 + 2
4
>>> "Bonjour" + " " + "monde"
'Bonjour monde'
>>> print("Hello, World!")
Hello, World!
\`\`\`

Le REPL est parfait pour tester rapidement des idées. Tape \`exit()\` pour quitter.

#### Ton premier fichier .py

Crée un fichier \`bonjour.py\` et écris :

\`\`\`python
# Mon premier script Python
prenom = input("Quel est ton prénom ? ")
print(f"Bonjour, {prenom} ! Bienvenue dans Python.")
\`\`\`

Lance-le avec :

\`\`\`bash
python bonjour.py
\`\`\`

#### Les fonctions print() et input()

- **print()** affiche du texte dans le terminal. Tu peux lui passer plusieurs arguments séparés par des virgules.
- **input()** demande une saisie à l'utilisateur et renvoie toujours une **chaîne de caractères (str)**.

\`\`\`python
age = input("Quel est ton âge ? ")
print("Type de la variable age :", type(age))
# Affiche : Type de la variable age : <class 'str'>
\`\`\`

#### Les conventions PEP8

PEP8 est le guide de style officiel de Python. Quelques règles essentielles :

- Indentation : **4 espaces** (pas de tabulations)
- Noms de variables : **snake_case** (ex: \`mon_prenom\`, \`age_utilisateur\`)
- Noms de constantes : **MAJUSCULES** (ex: \`PI = 3.14\`)
- Lignes de max **79 caractères**
- Deux lignes vides entre les fonctions de haut niveau

\`\`\`python
# Mauvais style
x=input("nom:")
print("bonjour "+x)

# Bon style (PEP8)
nom = input("Quel est ton nom ? ")
print(f"Bonjour, {nom} !")
\`\`\`

Utilise l'outil \`flake8\` ou un éditeur comme VS Code avec l'extension Python pour respecter automatiquement PEP8.`,
        links: [
          { label: 'Télécharger Python', url: 'https://www.python.org/downloads/' },
          { label: 'PEP8 — Guide de style', url: 'https://pep8.org/' },
          { label: 'VS Code + Python', url: 'https://code.visualstudio.com/docs/languages/python' }
        ]
      }
    ],
    exercises: [
      {
        title: "Mon premier script interactif",
        scenario: "Tu rejoins une petite startup et ton responsable te demande de créer un script de bienvenue pour les nouveaux employés. Le script doit demander le prénom, le nom et le poste de la personne, puis afficher un message d'accueil personnalisé.",
        steps: [
          {
            title: "Demander les informations",
            instructions: `Commence par demander trois informations à l'utilisateur avec \`input()\` :\n- Le prénom\n- Le nom de famille\n- Le poste occupé\n\nStocke chaque réponse dans une variable bien nommée (respecte PEP8 : snake_case).\n\n\`\`\`python\n# À toi de compléter :\nprenom = input("...")\n# ... complète pour nom et poste\n\`\`\``
          },
          {
            title: "Afficher le message d'accueil",
            instructions: `Utilise une **f-string** pour afficher un message formaté. La f-string te permet d'insérer des variables directement dans une chaîne de caractères avec la syntaxe \`{variable}\`.\n\n\`\`\`python\nprint(f"Bienvenue, {prenom} {nom} !")\nprint(f"Ton poste : {poste}")\n\`\`\`\n\nAjoute également la date du jour en utilisant la bibliothèque \`datetime\` :\n\n\`\`\`python\nfrom datetime import date\ntoday = date.today()\nprint(f"Date d\\'arrivée : {today}")\n\`\`\``
          },
          {
            title: "Améliorer la présentation",
            instructions: `Ajoute une ligne de séparation visuelle avec des tirets pour rendre le script plus lisible. Utilise la multiplication de chaîne : \`"-" * 40\` affiche 40 tirets.\n\nTon script doit ressembler à :\n\n\`\`\`\n========================================\n    BIENVENUE CHEZ STARTUP XYZ\n========================================\nBonjour, Alice Dupont !\nPoste : Développeuse Backend\nDate d\\'arrivée : 2024-01-15\n========================================\n\`\`\``
          }
        ],
        hints: [
          "Pour centrer du texte, tu peux utiliser la méthode .center() : 'texte'.center(40)",
          "La multiplication de chaîne : '=' * 40 produit une ligne de 40 signes égal",
          "N'oublie pas d'importer datetime avant de l'utiliser : from datetime import date"
        ],
        solution: `from datetime import date

# Séparateur visuel
separateur = "=" * 40

# En-tête
print(separateur)
print("    BIENVENUE CHEZ STARTUP XYZ".center(40))
print(separateur)

# Saisie des informations
prenom = input("Ton prénom : ")
nom = input("Ton nom de famille : ")
poste = input("Ton poste : ")

# Affichage du message d'accueil
today = date.today()
print(f"\\nBonjour, {prenom} {nom} !")
print(f"Poste : {poste}")
print(f"Date d'arrivée : {today}")
print(separateur)`
      }
    ]
  },

  {
    id: 902, level: 'Débutant', title: "Variables & types de données",
    desc: "Maîtrise les types fondamentaux de Python : int, float, str, bool, et apprends à les manipuler.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Les types fondamentaux",
        content: `### Variables et types de données en Python

#### Qu'est-ce qu'une variable ?

Une variable est une boîte qui stocke une valeur. En Python, tu n'as pas besoin de déclarer le type à l'avance : Python le devine automatiquement. C'est ce qu'on appelle le **typage dynamique**.

\`\`\`python
age = 25            # int (entier)
taille = 1.75       # float (décimal)
prenom = "Alice"    # str (chaîne de caractères)
est_actif = True    # bool (booléen)
valeur_nulle = None # NoneType (absence de valeur)
\`\`\`

Pour connaître le type d'une variable, utilise \`type()\` :

\`\`\`python
print(type(age))       # <class 'int'>
print(type(taille))    # <class 'float'>
print(type(prenom))    # <class 'str'>
print(type(est_actif)) # <class 'bool'>
\`\`\`

#### Les entiers (int)

Les entiers n'ont pas de limite de taille en Python. Tu peux faire des calculs sur de très grands nombres :

\`\`\`python
a = 10
b = 3
print(a + b)   # 13 — addition
print(a - b)   # 7  — soustraction
print(a * b)   # 30 — multiplication
print(a / b)   # 3.333... — division (retourne un float)
print(a // b)  # 3  — division entière
print(a % b)   # 1  — modulo (reste de la division)
print(a ** b)  # 1000 — puissance (10³)
\`\`\`

#### Les flottants (float)

Les floats représentent les nombres décimaux. Attention à la précision :

\`\`\`python
print(0.1 + 0.2)  # 0.30000000000000004 — surprise !
# Pour contourner ça, utilise round() :
print(round(0.1 + 0.2, 2))  # 0.3
\`\`\`

#### Les chaînes de caractères (str)

Les strings peuvent être délimitées par des guillemets simples ou doubles :

\`\`\`python
message1 = "Bonjour le monde"
message2 = 'Bonjour le monde'
message_long = """Ceci est
une chaîne
sur plusieurs lignes"""
\`\`\`

Opérations courantes sur les strings :

\`\`\`python
s = "Python"
print(len(s))          # 6 — longueur
print(s.upper())       # PYTHON
print(s.lower())       # python
print(s[0])            # P — premier caractère
print(s[-1])           # n — dernier caractère
print(s[0:3])          # Pyt — slice (tranche)
print(s.replace("y", "Y"))  # PYthon
print("  espaces  ".strip())  # "espaces" — supprime espaces
\`\`\`

#### Les booléens (bool)

Un booléen vaut soit \`True\` soit \`False\`. C'est la base de toute logique conditionnelle :

\`\`\`python
est_majeur = True
a_un_compte = False

print(est_majeur and a_un_compte)  # False
print(est_majeur or a_un_compte)   # True
print(not est_majeur)              # False
\`\`\`

#### None — l'absence de valeur

\`None\` représente l'absence de valeur (l'équivalent de \`null\` dans d'autres langages) :

\`\`\`python
resultat = None
if resultat is None:
    print("Pas encore de résultat")
\`\`\``,
        links: [
          { label: 'Documentation Python — Types intégrés', url: 'https://docs.python.org/fr/3/library/stdtypes.html' }
        ]
      },
      {
        title: "Conversions et f-strings",
        content: `### Conversion de types et formatage de chaînes

#### Convertir entre types

Python ne convertit pas automatiquement les types. Si tu essaies d'additionner un int et un str, tu obtiens une erreur. Tu dois convertir explicitement :

\`\`\`python
age_str = input("Quel est ton âge ? ")  # retourne une str
# age_str + 1  --> TypeError !

age = int(age_str)  # conversion en entier
print(age + 1)      # maintenant ça fonctionne
\`\`\`

Les fonctions de conversion principales :

| Fonction | Description | Exemple |
|---|---|---|
| \`int(x)\` | Convertit en entier | \`int("42")\` → \`42\` |
| \`float(x)\` | Convertit en flottant | \`float("3.14")\` → \`3.14\` |
| \`str(x)\` | Convertit en chaîne | \`str(42)\` → \`"42"\` |
| \`bool(x)\` | Convertit en booléen | \`bool(0)\` → \`False\` |

Valeurs considérées comme \`False\` (falsy) : \`0\`, \`0.0\`, \`""\`, \`[]\`, \`{}\`, \`None\`.
Tout le reste est \`True\` (truthy).

\`\`\`python
print(bool(0))    # False
print(bool(1))    # True
print(bool(""))   # False
print(bool("a"))  # True
\`\`\`

#### Les f-strings (Python 3.6+)

Les f-strings sont la façon moderne de formater du texte en Python. Tu préfixes la chaîne avec \`f\` et utilises \`{}\` pour insérer des expressions :

\`\`\`python
prenom = "Alice"
age = 28
taille = 1.68

# F-string basique
print(f"Je m'appelle {prenom} et j'ai {age} ans.")

# Expression dans une f-string
print(f"Dans 10 ans, j'aurai {age + 10} ans.")

# Formatage de nombres
print(f"Ma taille est {taille:.2f} m")     # 2 décimales
print(f"Mon âge en binaire : {age:b}")      # binaire
print(f"Valeur alignée : {age:>10}")        # aligné à droite sur 10 chars
\`\`\`

#### Exemple complet : fiche d'identité

\`\`\`python
nom = input("Nom : ")
prenom = input("Prénom : ")
annee_naissance = int(input("Année de naissance : "))

age = 2024 - annee_naissance
imc = float(input("Poids (kg) : ")) / float(input("Taille (m) : ")) ** 2

print("\\n" + "=" * 35)
print(f"  Fiche de {prenom} {nom.upper()}")
print("=" * 35)
print(f"  Âge estimé    : {age} ans")
print(f"  IMC           : {imc:.1f}")
print("=" * 35)
\`\`\``,
        links: [
          { label: 'F-strings — Réal Python', url: 'https://realpython.com/python-f-strings/' }
        ]
      }
    ],
    exercises: [
      {
        title: "Calculateur de BMI",
        scenario: "Une clinique médicale veut un petit outil en ligne de commande pour calculer l'IMC (Indice de Masse Corporelle) de ses patients. L'outil doit afficher le résultat avec interprétation et un affichage soigné.",
        steps: [
          {
            title: "Saisir les données patient",
            instructions: `Demande le prénom du patient, son poids en kg et sa taille en mètres. Pense à convertir les saisies numériques avec \`float()\`.\n\n\`\`\`python\nprenom = input("Prénom du patient : ")\npoids = float(input("Poids (kg) : "))\n# ... complète pour la taille\n\`\`\``
          },
          {
            title: "Calculer l'IMC",
            instructions: `L'IMC se calcule avec la formule : **poids / taille²**\n\nEn Python : \`imc = poids / taille ** 2\`\n\nUtilise \`round(imc, 1)\` pour arrondir à 1 décimale.`
          },
          {
            title: "Déterminer la catégorie",
            instructions: `Selon l'OMS, voici les catégories d'IMC :\n\n| IMC | Catégorie |\n|---|---|\n| < 18.5 | Sous-poids |\n| 18.5 – 24.9 | Poids normal |\n| 25 – 29.9 | Surpoids |\n| ≥ 30 | Obésité |\n\nUtilise des conditions \`if/elif/else\` pour déterminer et stocker la catégorie dans une variable \`categorie\`.`
          },
          {
            title: "Afficher le rapport",
            instructions: `Affiche un rapport formaté avec f-strings :\n\n\`\`\`\n===================================\n   RAPPORT IMC — Alice\n===================================\n   Poids    : 70.0 kg\n   Taille   : 1.75 m\n   IMC      : 22.9\n   Statut   : Poids normal\n===================================\n\`\`\``
          }
        ],
        hints: [
          "La puissance en Python s'écrit ** : taille ** 2 calcule taille au carré",
          "Pour les conditions IMC, commence par le cas le plus petit (< 18.5) et remonte",
          "Pour aligner les valeurs dans le rapport, utilise le formatage f-string : {valeur:<10} pour aligner à gauche sur 10 caractères"
        ],
        solution: `# Calculateur d'IMC
prenom = input("Prénom du patient : ")
poids = float(input("Poids (kg) : "))
taille = float(input("Taille (m) : "))

# Calcul de l'IMC
imc = round(poids / taille ** 2, 1)

# Détermination de la catégorie
if imc < 18.5:
    categorie = "Sous-poids"
elif imc < 25:
    categorie = "Poids normal"
elif imc < 30:
    categorie = "Surpoids"
else:
    categorie = "Obésité"

# Affichage du rapport
sep = "=" * 35
print(f"\\n{sep}")
print(f"   RAPPORT IMC — {prenom}".center(35))
print(sep)
print(f"   Poids    : {poids} kg")
print(f"   Taille   : {taille} m")
print(f"   IMC      : {imc}")
print(f"   Statut   : {categorie}")
print(sep)`
      }
    ]
  },

  {
    id: 903, level: 'Débutant', title: "Conditions & boucles",
    desc: "Contrôle le flux de tes programmes avec if/elif/else, for, while et les opérateurs logiques.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Conditions avec if/elif/else",
        content: `### Prendre des décisions avec les conditions

#### La structure if/elif/else

Les conditions permettent à ton programme de prendre des décisions. La syntaxe Python est :

\`\`\`python
if condition:
    # code si condition est vraie
elif autre_condition:
    # code si autre_condition est vraie
else:
    # code si aucune condition n'est vraie
\`\`\`

**L'indentation est obligatoire** : Python utilise les espaces pour délimiter les blocs de code.

\`\`\`python
temperature = 22

if temperature < 0:
    print("Il gèle ! Reste chez toi.")
elif temperature < 10:
    print("Il fait froid, prends un manteau.")
elif temperature < 20:
    print("Temps frais, une veste suffira.")
elif temperature < 30:
    print("Beau temps, profites-en !")
else:
    print("Canicule ! Reste au frais.")
\`\`\`

#### Les opérateurs de comparaison

| Opérateur | Signification | Exemple |
|---|---|---|
| \`==\` | Égal à | \`age == 18\` |
| \`!=\` | Différent de | \`nom != ""\` |
| \`<\` | Inférieur à | \`prix < 100\` |
| \`>\` | Supérieur à | \`score > 50\` |
| \`<=\` | Inférieur ou égal | \`age <= 17\` |
| \`>=\` | Supérieur ou égal | \`stock >= 1\` |
| \`in\` | Contenu dans | \`"a" in "chat"\` |
| \`is\` | Identique à | \`x is None\` |

#### Les opérateurs logiques

Tu peux combiner plusieurs conditions avec \`and\`, \`or\`, \`not\` :

\`\`\`python
age = 20
a_un_billet = True
est_vip = False

# and : les deux conditions doivent être vraies
if age >= 18 and a_un_billet:
    print("Entrée autorisée")

# or : au moins une condition doit être vraie
if age >= 18 or est_vip:
    print("Peut entrer")

# not : inverse la condition
if not est_vip:
    print("Pas de file VIP pour toi")
\`\`\`

#### L'opérateur ternaire

Pour les cas simples, Python propose une syntaxe compacte :

\`\`\`python
age = 20
statut = "majeur" if age >= 18 else "mineur"
print(f"Tu es {statut}.")
\`\`\``,
        links: [
          { label: 'Conditions Python — Documentation', url: 'https://docs.python.org/fr/3/tutorial/controlflow.html' }
        ]
      },
      {
        title: "Boucles for et while",
        content: `### Répéter des actions avec les boucles

#### La boucle for

La boucle \`for\` itère sur une séquence (liste, chaîne, range, etc.) :

\`\`\`python
# Itérer sur une liste
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(f"J'aime les {fruit}s")

# Itérer sur une chaîne
for lettre in "Python":
    print(lettre)

# Itérer avec range()
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):   # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8 (pas de 2)
    print(i)
\`\`\`

#### La fonction range()

\`range(start, stop, step)\` génère une séquence de nombres :
- \`range(5)\` → 0, 1, 2, 3, 4
- \`range(1, 6)\` → 1, 2, 3, 4, 5
- \`range(10, 0, -2)\` → 10, 8, 6, 4, 2 (compte à rebours)

#### La boucle while

La boucle \`while\` répète tant qu'une condition est vraie :

\`\`\`python
compteur = 0
while compteur < 5:
    print(f"Compteur : {compteur}")
    compteur += 1

print("Boucle terminée !")
\`\`\`

**Attention** aux boucles infinies ! Assure-toi que la condition finit par devenir fausse.

#### break et continue

- \`break\` : quitte immédiatement la boucle
- \`continue\` : passe à l'itération suivante

\`\`\`python
# break : chercher le premier nombre pair
for n in range(1, 20):
    if n % 2 == 0:
        print(f"Premier nombre pair trouvé : {n}")
        break

# continue : afficher uniquement les impairs
for n in range(10):
    if n % 2 == 0:
        continue  # saute les pairs
    print(n)
\`\`\`

#### enumerate() et zip()

\`\`\`python
# enumerate() donne l'index en plus de la valeur
fruits = ["pomme", "banane", "cerise"]
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")

# zip() itère sur plusieurs listes en parallèle
noms = ["Alice", "Bob"]
scores = [95, 87]
for nom, score in zip(noms, scores):
    print(f"{nom} : {score}/100")
\`\`\``,
        links: [
          { label: 'Boucles Python — W3Schools', url: 'https://www.w3schools.com/python/python_for_loops.asp' }
        ]
      }
    ],
    exercises: [
      {
        title: "Jeu de devinette",
        scenario: "Tu dois créer un mini-jeu en ligne de commande pour une équipe qui veut animer une pause déjeuner. Le jeu choisit un nombre aléatoire et le joueur doit le deviner. Il dispose d'un nombre limité de tentatives et reçoit des indices.",
        steps: [
          {
            title: "Générer le nombre secret",
            instructions: `Utilise le module \`random\` pour générer un nombre aléatoire entre 1 et 100 :\n\n\`\`\`python\nimport random\nnombre_secret = random.randint(1, 100)\nmax_tentatives = 7\n\`\`\`\n\nInitialise aussi un compteur \`tentatives = 0\` et une variable \`gagne = False\`.`
          },
          {
            title: "Créer la boucle de jeu",
            instructions: `Crée une boucle \`while\` qui continue tant que le joueur n'a pas gagné ET qu'il lui reste des tentatives :\n\n\`\`\`python\nwhile tentatives < max_tentatives and not gagne:\n    # demander la supposition\n    # incrémenter le compteur\n    # comparer et afficher l'indice\n    pass  # remplace pass par ton code\n\`\`\``
          },
          {
            title: "Comparer et donner des indices",
            instructions: `À chaque tentative, compare la supposition du joueur avec le nombre secret :\n- Si c'est égal : affiche "Bravo !" et mets \`gagne = True\`\n- Si c'est trop petit : affiche "Trop petit !"\n- Si c'est trop grand : affiche "Trop grand !"\n\nAffiche aussi le nombre de tentatives restantes.`
          },
          {
            title: "Message de fin",
            instructions: `Après la boucle, affiche un message selon l'issue :\n- Si \`gagne\` est True : félicite le joueur avec le nombre de tentatives utilisées\n- Sinon : révèle le nombre secret\n\nBonus : propose de rejouer.`
          }
        ],
        hints: [
          "random.randint(1, 100) génère un entier entre 1 et 100 inclus",
          "N'oublie pas de convertir la saisie en int() : supposition = int(input(...))",
          "Pour rejouer, enveloppe tout dans une boucle while True et utilise break quand le joueur ne veut plus jouer"
        ],
        solution: `import random

def jouer():
    nombre_secret = random.randint(1, 100)
    max_tentatives = 7
    tentatives = 0
    gagne = False

    print("\\n=== JEU DE DEVINETTE ===")
    print(f"Devine le nombre entre 1 et 100 ({max_tentatives} tentatives)")
    print("=" * 25)

    while tentatives < max_tentatives and not gagne:
        restantes = max_tentatives - tentatives
        print(f"\\nTentatives restantes : {restantes}")

        try:
            supposition = int(input("Ton nombre : "))
        except ValueError:
            print("Entre un nombre entier !")
            continue

        tentatives += 1

        if supposition == nombre_secret:
            gagne = True
        elif supposition < nombre_secret:
            print("Trop petit !")
        else:
            print("Trop grand !")

    if gagne:
        print(f"\\nBravo ! Tu as trouvé {nombre_secret} en {tentatives} tentatives !")
    else:
        print(f"\\nPerdu ! Le nombre était {nombre_secret}.")

while True:
    jouer()
    rejouer = input("\\nUne autre partie ? (o/n) : ")
    if rejouer.lower() != "o":
        print("À bientôt !")
        break`
      }
    ]
  },

  {
    id: 904, level: 'Débutant', title: "Fonctions",
    desc: "Organise ton code avec les fonctions : paramètres, valeurs de retour, portée des variables et lambdas.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Définir et appeler des fonctions",
        content: `### Les fonctions : organiser et réutiliser ton code

#### Pourquoi utiliser des fonctions ?

Sans fonctions, tu répètes le même code partout. Les fonctions permettent de :
- **Éviter la répétition** (principe DRY : Don't Repeat Yourself)
- **Organiser** le code en blocs logiques
- **Tester** chaque partie indépendamment
- **Réutiliser** du code dans d'autres projets

#### Définir une fonction avec def

\`\`\`python
def saluer(prenom):
    """Affiche un message de bienvenue."""
    message = f"Bonjour, {prenom} !"
    print(message)

# Appel de la fonction
saluer("Alice")   # Bonjour, Alice !
saluer("Bob")     # Bonjour, Bob !
\`\`\`

La docstring (entre \`"""\`) est facultative mais très recommandée.

#### Retourner une valeur avec return

\`\`\`python
def calculer_carre(nombre):
    """Retourne le carré d'un nombre."""
    return nombre ** 2

resultat = calculer_carre(5)
print(resultat)  # 25

print(calculer_carre(10) + calculer_carre(3))  # 109
\`\`\`

Une fonction sans \`return\` retourne implicitement \`None\`.

#### Paramètres positionnels et valeurs par défaut

\`\`\`python
def creer_profil(nom, age, ville="Paris", actif=True):
    """Crée un profil utilisateur."""
    return {
        "nom": nom,
        "age": age,
        "ville": ville,
        "actif": actif
    }

p1 = creer_profil("Alice", 28)
p2 = creer_profil("Bob", 35, "Lyon")
p3 = creer_profil("Charlie", 22, actif=False)
\`\`\`

#### *args et **kwargs

Pour des fonctions qui acceptent un nombre variable d'arguments :

\`\`\`python
def additionner(*nombres):
    """Additionne tous les nombres passés en argument."""
    return sum(nombres)

print(additionner(1, 2))           # 3
print(additionner(1, 2, 3, 4, 5)) # 15

def afficher_infos(**infos):
    """Affiche des informations sous forme clé=valeur."""
    for cle, valeur in infos.items():
        print(f"  {cle}: {valeur}")

afficher_infos(nom="Alice", age=28, ville="Paris")
\`\`\`

#### Portée des variables (scope)

Les variables définies dans une fonction sont **locales**.

\`\`\`python
x = 10  # variable globale

def ma_fonction():
    x = 20  # variable locale
    print(f"Dans la fonction : x = {x}")

ma_fonction()
print(f"À l'extérieur : x = {x}")
# Dans la fonction : x = 20
# À l'extérieur : x = 10
\`\`\`

#### Fonctions lambda

Les lambdas sont des fonctions anonymes en une ligne :

\`\`\`python
doubler = lambda x: x * 2
print(doubler(5))  # 10

# Utile avec sorted(), map(), filter()
nombres = [3, 1, 4, 1, 5, 9, 2]
tries = sorted(nombres, key=lambda x: -x)  # tri décroissant
print(tries)  # [9, 5, 4, 3, 2, 1, 1]
\`\`\``,
        links: [
          { label: 'Fonctions Python — Documentation', url: 'https://docs.python.org/fr/3/tutorial/controlflow.html#defining-functions' }
        ]
      }
    ],
    exercises: [
      {
        title: "Bibliothèque de fonctions utilitaires",
        scenario: "Ton équipe DevOps a besoin d'un module Python réutilisable avec des fonctions de conversion et de calcul. Tu vas créer un fichier utils.py avec plusieurs fonctions bien documentées.",
        steps: [
          {
            title: "Fonctions de conversion de température",
            instructions: `Écris trois fonctions de conversion de température :\n\n\`\`\`python\ndef celsius_vers_fahrenheit(celsius):\n    """Convertit des degrés Celsius en Fahrenheit.\n    Formule : F = C * 9/5 + 32\n    """\n    # À compléter\n    pass\n\ndef fahrenheit_vers_celsius(fahrenheit):\n    # À compléter\n    pass\n\ndef celsius_vers_kelvin(celsius):\n    # À compléter (0°C = 273.15 K)\n    pass\n\`\`\``
          },
          {
            title: "Fonction de calcul de statistiques",
            instructions: `Écris une fonction qui prend une liste de nombres et retourne un dictionnaire de statistiques :\n\n\`\`\`python\ndef calculer_stats(nombres):\n    """Calcule min, max, moyenne et total d'une liste.\n    \n    Args:\n        nombres: liste de nombres\n    Returns:\n        dict avec les clés 'min', 'max', 'moyenne', 'total'\n    """\n    pass\n\`\`\`\n\nUtilise les fonctions intégrées \`min()\`, \`max()\`, \`sum()\`, \`len()\`.`
          },
          {
            title: "Fonction avec *args",
            instructions: `Écris une fonction \`resumer_texte(*args)\` qui accepte n'importe quel nombre de chaînes, les concatène et affiche un résumé :\n- Nombre de mots total\n- Nombre de caractères\n- Texte complet\n\nBonus : ajoute un paramètre \`separateur=" "\` avec valeur par défaut.`
          },
          {
            title: "Tester le module",
            instructions: `Ajoute un bloc de test avec \`if __name__ == "__main__":\` pour vérifier tes fonctions :\n\n\`\`\`python\nif __name__ == "__main__":\n    print(celsius_vers_fahrenheit(100))  # 212.0\n    print(fahrenheit_vers_celsius(32))   # 0.0\n    stats = calculer_stats([10, 20, 30, 40, 50])\n    print(stats)\n\`\`\``
          }
        ],
        hints: [
          "La formule Fahrenheit vers Celsius est : C = (F - 32) * 5/9",
          "Pour la moyenne : sum(nombres) / len(nombres)",
          "Le bloc if __name__ == '__main__': s'exécute seulement quand tu lances le fichier directement"
        ],
        solution: `"""Module utilitaire — fonctions de conversion et de calcul."""

def celsius_vers_fahrenheit(celsius):
    """Convertit des degrés Celsius en Fahrenheit."""
    return celsius * 9/5 + 32

def fahrenheit_vers_celsius(fahrenheit):
    """Convertit des degrés Fahrenheit en Celsius."""
    return (fahrenheit - 32) * 5/9

def celsius_vers_kelvin(celsius):
    """Convertit des degrés Celsius en Kelvin."""
    return celsius + 273.15

def calculer_stats(nombres):
    """Calcule les statistiques de base d'une liste de nombres."""
    if not nombres:
        return None
    return {
        "min": min(nombres),
        "max": max(nombres),
        "moyenne": round(sum(nombres) / len(nombres), 2),
        "total": sum(nombres)
    }

def resumer_texte(*args, separateur=" "):
    """Résume un ensemble de chaînes de texte."""
    texte_complet = separateur.join(args)
    mots = texte_complet.split()
    print(f"Texte     : {texte_complet}")
    print(f"Mots      : {len(mots)}")
    print(f"Caractères: {len(texte_complet)}")
    return texte_complet

if __name__ == "__main__":
    print("=== Tests conversions ===")
    print(f"100°C = {celsius_vers_fahrenheit(100)}°F")
    print(f"32°F  = {fahrenheit_vers_celsius(32)}°C")
    print(f"0°C   = {celsius_vers_kelvin(0)} K")
    print("\\n=== Tests stats ===")
    stats = calculer_stats([10, 20, 30, 40, 50])
    for cle, val in stats.items():
        print(f"  {cle}: {val}")
    print("\\n=== Test résumé ===")
    resumer_texte("Bonjour", "le", "monde", "Python")`
      }
    ]
  },

  {
    id: 905, level: 'Intermédiaire', title: "Structures de données",
    desc: "Maîtrise listes, dictionnaires, tuples, sets et list comprehensions pour gérer des données complexes.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Listes, dictionnaires, tuples et sets",
        content: `### Les structures de données essentielles de Python

#### Les listes

Une liste est une collection ordonnée et modifiable :

\`\`\`python
fruits = ["pomme", "banane", "cerise"]
nombres = [1, 2, 3, 4, 5]

# Accès par index
print(fruits[0])   # pomme
print(fruits[-1])  # cerise
print(fruits[1:3]) # ['banane', 'cerise']
\`\`\`

**Méthodes importantes :**

\`\`\`python
ma_liste = [3, 1, 4, 1, 5]

ma_liste.append(9)        # ajoute en fin
ma_liste.insert(0, 10)    # insère à l'index 0
ma_liste.remove(1)        # supprime la 1ère occurrence de 1
popped = ma_liste.pop()   # retire et retourne le dernier
ma_liste.sort()           # trie en place
ma_liste.reverse()        # inverse en place
print(len(ma_liste))      # longueur
print(1 in ma_liste)      # True si 1 est dedans
print(ma_liste.count(1))  # nombre d'occurrences
\`\`\`

#### Les dictionnaires

Un dictionnaire stocke des paires **clé: valeur** :

\`\`\`python
personne = {
    "nom": "Alice",
    "age": 28,
    "ville": "Paris"
}

print(personne["nom"])
print(personne.get("email", "non renseigné"))

personne["age"] = 29
personne["email"] = "alice@example.com"
del personne["ville"]

for cle, valeur in personne.items():
    print(f"{cle} → {valeur}")
\`\`\`

#### Tuples vs Listes

Les tuples sont **immuables** (non modifiables) :

\`\`\`python
point = (10, 20)
x, y = point  # déstructuration

couleurs = ("rouge", "vert", "bleu")
r, g, b = couleurs
\`\`\`

Utilise les tuples pour des données fixes (coordonnées, constantes).

#### Les sets (ensembles)

Un set est une collection non ordonnée **sans doublons** :

\`\`\`python
nombres = {1, 2, 3, 2, 1}  # {1, 2, 3}

a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a & b)  # {3, 4} — intersection
print(a | b)  # {1,2,3,4,5,6} — union
print(a - b)  # {1, 2} — différence

# Supprimer les doublons d'une liste
ma_liste = [1, 2, 2, 3, 3]
sans_doublons = list(set(ma_liste))
\`\`\`

#### List comprehensions

Syntaxe compacte pour créer des listes :

\`\`\`python
# [expression for element in iterable if condition]

carres = [x**2 for x in range(1, 6)]
# [1, 4, 9, 16, 25]

pairs = [x for x in range(20) if x % 2 == 0]

noms_majuscules = [n.upper() for n in ["alice", "bob"]]

# Dict comprehension
carres_dict = {x: x**2 for x in range(1, 6)}
\`\`\``,
        links: [
          { label: 'Structures de données — Documentation Python', url: 'https://docs.python.org/fr/3/tutorial/datastructures.html' }
        ]
      }
    ],
    exercises: [
      {
        title: "Gestionnaire de contacts",
        scenario: "Tu dois créer un carnet d'adresses en ligne de commande pour une PME. L'application permet d'ajouter, rechercher, modifier et supprimer des contacts stockés dans un dictionnaire.",
        steps: [
          {
            title: "Structure des données",
            instructions: `Définis la structure de données pour stocker les contacts. Les clés sont les emails (identifiants uniques) :\n\n\`\`\`python\ncontacts = {}\n\n# Un contact ressemble à :\n# contacts["alice@example.com"] = {\n#     "nom": "Alice Dupont",\n#     "telephone": "06 12 34 56 78",\n#     "entreprise": "TechCorp"\n# }\n\`\`\`\n\nÉcris une fonction \`ajouter_contact(contacts, email, nom, telephone, entreprise="")\`.`
          },
          {
            title: "Opérations CRUD",
            instructions: `Implémente les quatre opérations :\n\n\`\`\`python\ndef ajouter_contact(contacts, email, nom, telephone, entreprise=""):\n    # Vérifie si l'email existe déjà\n    # Ajoute le contact\n    pass\n\ndef rechercher_contact(contacts, terme):\n    # Cherche dans nom, email et entreprise\n    # Retourne une liste de contacts correspondants\n    pass\n\ndef modifier_contact(contacts, email, **modifications):\n    pass\n\ndef supprimer_contact(contacts, email):\n    pass\n\`\`\``
          },
          {
            title: "Affichage et menu",
            instructions: `Écris une fonction \`afficher_contact(email, infos)\` qui affiche joliment un contact, puis crée un menu interactif avec les options :\n1. Ajouter, 2. Rechercher, 3. Modifier, 4. Supprimer, 5. Lister tous, 6. Quitter`
          },
          {
            title: "Statistiques",
            instructions: `Ajoute une fonction \`statistiques(contacts)\` qui affiche :\n- Nombre total de contacts\n- Liste des entreprises uniques (utilise un set)\n\nBonus : trie les contacts par nom avec une list comprehension.`
          }
        ],
        hints: [
          "Pour vérifier si une clé existe dans un dict : if email in contacts",
          "Pour rechercher dans plusieurs champs : any(terme.lower() in str(v).lower() for v in infos.values())",
          "Pour lister triés par nom : sorted(contacts.items(), key=lambda x: x[1]['nom'])"
        ],
        solution: `contacts = {}

def ajouter_contact(contacts, email, nom, telephone, entreprise=""):
    if email in contacts:
        print(f"Contact {email} existe déjà.")
        return False
    contacts[email] = {"nom": nom, "telephone": telephone, "entreprise": entreprise}
    print(f"Contact {nom} ajouté.")
    return True

def rechercher_contact(contacts, terme):
    terme = terme.lower()
    return {
        email: infos for email, infos in contacts.items()
        if terme in email.lower() or any(terme in str(v).lower() for v in infos.values())
    }

def modifier_contact(contacts, email, **modifications):
    if email not in contacts:
        print("Contact introuvable.")
        return False
    contacts[email].update(modifications)
    print("Contact modifié.")
    return True

def supprimer_contact(contacts, email):
    if email in contacts:
        nom = contacts[email]["nom"]
        del contacts[email]
        print(f"Contact {nom} supprimé.")
        return True
    print("Contact introuvable.")
    return False

def afficher_contact(email, infos):
    print(f"  Email      : {email}")
    print(f"  Nom        : {infos['nom']}")
    print(f"  Téléphone  : {infos['telephone']}")
    print(f"  Entreprise : {infos.get('entreprise', 'N/A')}")

def statistiques(contacts):
    print(f"Total contacts : {len(contacts)}")
    entreprises = {i['entreprise'] for i in contacts.values() if i.get('entreprise')}
    print(f"Entreprises    : {', '.join(entreprises) if entreprises else 'Aucune'}")

# Données de test
ajouter_contact(contacts, "alice@test.com", "Alice Dupont", "06 11 22 33 44", "TechCorp")
ajouter_contact(contacts, "bob@test.com", "Bob Martin", "06 55 66 77 88")

print("\\n=== Contacts ===")
for email, infos in sorted(contacts.items(), key=lambda x: x[1]['nom']):
    afficher_contact(email, infos)
    print()

statistiques(contacts)`
      }
    ]
  },

  {
    id: 906, level: 'Intermédiaire', title: "Modules & bibliothèques standard",
    desc: "Importe et utilise les modules Python : os, sys, json, datetime, pathlib, et crée tes propres modules.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Importer et utiliser les modules",
        content: `### Modules et bibliothèques standard

#### Les imports en Python

\`\`\`python
import math                    # importe tout le module
from math import sqrt, pi      # importe des fonctions spécifiques
import numpy as np             # alias (raccourci)
from datetime import datetime as dt
\`\`\`

#### Le module os

\`\`\`python
import os

print(os.getcwd())             # répertoire courant
fichiers = os.listdir(".")     # liste les fichiers
os.makedirs("dossier/sous", exist_ok=True)  # crée un dossier
home = os.environ.get("HOME", "/home/user") # variable d'env
\`\`\`

#### Le module pathlib (Python 3.4+)

\`\`\`python
from pathlib import Path

p = Path("mon_dossier/fichier.txt")
print(p.name)       # fichier.txt
print(p.stem)       # fichier
print(p.suffix)     # .txt
print(p.parent)     # mon_dossier
print(p.exists())   # True/False

# Chemin portable Windows/Linux
chemin = Path.home() / "Documents" / "notes.txt"
\`\`\`

#### Le module json

\`\`\`python
import json

data = {"nom": "Alice", "age": 28, "hobbies": ["python", "lecture"]}

# Dict → JSON string
json_str = json.dumps(data, indent=2, ensure_ascii=False)

# JSON string → dict
retour = json.loads(json_str)

# Lire/écrire des fichiers JSON
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open("data.json", "r", encoding="utf-8") as f:
    data_lue = json.load(f)
\`\`\`

#### Le module datetime

\`\`\`python
from datetime import datetime, date, timedelta

maintenant = datetime.now()
print(maintenant.strftime("%d/%m/%Y %H:%M"))

dans_30_jours = date.today() + timedelta(days=30)

ts = datetime.fromisoformat("2024-01-15T14:30:00")
print(ts.year, ts.month, ts.day)
\`\`\`

#### Créer son propre module

Un module Python est simplement un fichier .py :

\`\`\`python
# utils.py
def saluer(nom):
    return f"Bonjour, {nom} !"

PI = 3.14159
\`\`\`

\`\`\`python
# main.py
from utils import saluer, PI
print(saluer("Alice"))
\`\`\``,
        links: [
          { label: 'Bibliothèque standard Python', url: 'https://docs.python.org/fr/3/library/index.html' },
          { label: 'pathlib — Documentation', url: 'https://docs.python.org/fr/3/library/pathlib.html' }
        ]
      }
    ],
    exercises: [
      {
        title: "Script de traitement JSON et dates",
        scenario: "Tu travailles pour une équipe RH qui gère des données d'employés dans des fichiers JSON. Tu dois créer un script qui lit ces données, les enrichit avec des calculs de dates, et génère un rapport.",
        steps: [
          {
            title: "Créer et lire un fichier JSON",
            instructions: `Crée un fichier \`employes.json\` avec quelques employés, puis écris du code pour le lire :\n\n\`\`\`python\nimport json\nfrom pathlib import Path\n\nemployes = [\n    {"nom": "Alice Dupont", "date_embauche": "2020-03-15", "salaire": 45000},\n    {"nom": "Bob Martin", "date_embauche": "2018-07-01", "salaire": 52000},\n    {"nom": "Charlie Durand", "date_embauche": "2022-11-30", "salaire": 38000}\n]\n\nfichier = Path("employes.json")\n# ... écris le code pour sauvegarder en JSON\n\`\`\``
          },
          {
            title: "Calculer l'ancienneté",
            instructions: `Pour chaque employé, calcule le nombre d'années d'ancienneté :\n\n\`\`\`python\nfrom datetime import date\n\ndef calculer_anciennete(date_str):\n    """Retourne l'ancienneté en années.\"\"\"\n    date_embauche = date.fromisoformat(date_str)\n    # calcule la différence\n    pass\n\`\`\`\n\nAstuce : \`(date.today() - date_embauche).days // 365\``
          },
          {
            title: "Enrichir et filtrer",
            instructions: `Enrichis chaque employé avec son ancienneté, puis filtre :\n- Les employés avec plus de 3 ans d'ancienneté\n- Les employés avec un salaire supérieur à 40 000€\n\nSauvegarde les résultats dans \`rapport.json\`.`
          }
        ],
        hints: [
          "json.dump(data, fichier, indent=2, ensure_ascii=False) pour sauvegarder avec formatage",
          "date.fromisoformat('2020-03-15') convertit une string ISO en objet date",
          "Pour filtrer : [e for e in employes if e['anciennete'] > 3]"
        ],
        solution: `import json
from pathlib import Path
from datetime import date

employes = [
    {"nom": "Alice Dupont", "date_embauche": "2020-03-15", "salaire": 45000},
    {"nom": "Bob Martin", "date_embauche": "2018-07-01", "salaire": 52000},
    {"nom": "Charlie Durand", "date_embauche": "2022-11-30", "salaire": 38000}
]

fichier = Path("employes.json")
with open(fichier, "w", encoding="utf-8") as f:
    json.dump(employes, f, indent=2, ensure_ascii=False)
print(f"Fichier créé : {fichier.absolute()}")

with open(fichier, "r", encoding="utf-8") as f:
    employes_lus = json.load(f)

def calculer_anciennete(date_str):
    debut = date.fromisoformat(date_str)
    return (date.today() - debut).days // 365

for emp in employes_lus:
    emp["anciennete_annees"] = calculer_anciennete(emp["date_embauche"])

anciens = [e for e in employes_lus if e["anciennete_annees"] >= 3]
bien_payes = [e for e in employes_lus if e["salaire"] > 40000]

rapport = {
    "date_generation": date.today().isoformat(),
    "total_employes": len(employes_lus),
    "employes": employes_lus,
    "anciens_3ans_plus": anciens,
    "salaire_sup_40k": bien_payes
}

with open("rapport.json", "w", encoding="utf-8") as f:
    json.dump(rapport, f, indent=2, ensure_ascii=False)

print("Rapport généré : rapport.json")
for emp in employes_lus:
    print(f"  {emp['nom']} : {emp['anciennete_annees']} ans")`
      }
    ]
  },

  {
    id: 907, level: 'Intermédiaire', title: "Fichiers & gestion d'erreurs",
    desc: "Lis et écris des fichiers avec Python, et gère les erreurs avec try/except pour du code robuste.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Lire et écrire des fichiers",
        content: `### Manipulation de fichiers en Python

#### Ouvrir un fichier avec open()

Toujours utiliser le gestionnaire de contexte \`with\` :

\`\`\`python
# Lecture complète
with open("mon_fichier.txt", "r", encoding="utf-8") as f:
    contenu = f.read()

# Lire ligne par ligne
with open("mon_fichier.txt", "r", encoding="utf-8") as f:
    for ligne in f:
        print(ligne.strip())

# Lire toutes les lignes dans une liste
with open("mon_fichier.txt", "r", encoding="utf-8") as f:
    lignes = f.readlines()
\`\`\`

Le \`with\` garantit que le fichier est fermé automatiquement, même en cas d'erreur.

#### Modes d'ouverture

| Mode | Description |
|---|---|
| \`"r"\` | Lecture (défaut) |
| \`"w"\` | Écriture — crée ou écrase |
| \`"a"\` | Ajout en fin de fichier |
| \`"x"\` | Création — erreur si fichier existe |
| \`"rb"\` | Lecture binaire |
| \`"wb"\` | Écriture binaire |

\`\`\`python
# Écriture
with open("sortie.txt", "w", encoding="utf-8") as f:
    f.write("Ligne 1\\n")
    f.writelines(["Ligne 2\\n", "Ligne 3\\n"])

# Ajout
with open("log.txt", "a", encoding="utf-8") as f:
    f.write("Nouvelle entrée\\n")
\`\`\``,
        links: [
          { label: 'Fichiers Python — Documentation', url: 'https://docs.python.org/fr/3/tutorial/inputoutput.html#reading-and-writing-files' }
        ]
      },
      {
        title: "Gestion des erreurs avec try/except",
        content: `### Écrire du code robuste

#### Pourquoi gérer les erreurs ?

Sans gestion d'erreurs, ton programme s'arrête brutalement. Avec \`try/except\`, tu anticipes les problèmes.

\`\`\`python
try:
    age = int(input("Ton âge : "))
    print(f"Tu as {age} ans.")
except ValueError:
    print("Erreur : entre un nombre entier !")
\`\`\`

#### La structure complète try/except/else/finally

\`\`\`python
try:
    fichier = open("data.csv", "r")
    contenu = fichier.read()
except FileNotFoundError:
    print("Fichier introuvable !")
except PermissionError:
    print("Permission refusée !")
except Exception as e:
    print(f"Erreur inattendue : {e}")
else:
    # exécuté SEULEMENT si aucune exception
    print(f"Fichier lu, {len(contenu)} caractères")
finally:
    # exécuté TOUJOURS
    print("Opération terminée.")
\`\`\`

#### Exceptions courantes

| Exception | Cause |
|---|---|
| \`ValueError\` | Valeur incorrecte (\`int("abc")\`) |
| \`TypeError\` | Type incorrect (\`"a" + 1\`) |
| \`FileNotFoundError\` | Fichier inexistant |
| \`KeyError\` | Clé absente dans un dict |
| \`IndexError\` | Index hors limites |
| \`ZeroDivisionError\` | Division par zéro |

#### Lever et créer des exceptions

\`\`\`python
def diviser(a, b):
    if b == 0:
        raise ValueError("Le diviseur ne peut pas être zéro !")
    return a / b

class AgeInvalideError(ValueError):
    """Exception levée quand un âge est invalide."""
    pass

def verifier_age(age):
    if age < 0 or age > 150:
        raise AgeInvalideError(f"Âge invalide : {age}")
    return True
\`\`\`

#### Logging basique

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

logging.info("Information normale")
logging.warning("Avertissement !")
logging.error("Une erreur s'est produite")
\`\`\``,
        links: [
          { label: 'Exceptions Python — Documentation', url: 'https://docs.python.org/fr/3/tutorial/errors.html' }
        ]
      }
    ],
    exercises: [
      {
        title: "Parser un fichier CSV avec gestion d'erreurs",
        scenario: "Ton équipe reçoit des fichiers CSV de données clients avec parfois des erreurs. Tu dois écrire un parser robuste qui lit le CSV, valide les données et génère un rapport d'erreurs.",
        steps: [
          {
            title: "Créer le fichier CSV de test",
            instructions: `Crée un fichier \`clients.csv\` avec des données valides et invalides :\n\n\`\`\`\nnom,email,age,chiffre_affaires\nAlice Dupont,alice@test.com,28,15000.50\nBob Martin,bob@test.com,abc,22000\n,charlie@test.com,35,8000\nDiana Prince,diana@test.com,29,-500\nEve Wilson,email_invalide,41,31000\n\`\`\`\n\nÉcris ce fichier avec Python.`
          },
          {
            title: "Lire et parser le CSV",
            instructions: `Lis le fichier ligne par ligne. Pour chaque ligne (après l'en-tête) :\n1. Sépare les champs avec \`.split(",")\`\n2. Tente de convertir l'âge en \`int\`\n3. Tente de convertir le CA en \`float\`\n\nEntoure chaque conversion de \`try/except\`.`
          },
          {
            title: "Valider les données",
            instructions: `Ajoute des validations métier :\n- Le nom ne doit pas être vide\n- L'email doit contenir "@"\n- L'âge doit être entre 18 et 120\n- Le chiffre d'affaires doit être positif\n\nCollecte les erreurs dans une liste sans bloquer le traitement.`
          },
          {
            title: "Générer le rapport",
            instructions: `Affiche et sauvegarde dans \`rapport_csv.txt\` :\n- Nombre de lignes traitées\n- Nombre de lignes valides et en erreur\n- Détail de chaque erreur avec numéro de ligne\n- Liste des clients valides`
          }
        ],
        hints: [
          "Utilise enumerate(lignes, start=2) pour avoir le numéro de ligne (en comptant depuis l'en-tête)",
          "Pour vérifier un email : '@' in email and '.' in email.split('@')[-1]",
          "Collecte les erreurs : erreurs.append((num_ligne, 'description'))"
        ],
        solution: `import logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

csv_contenu = """nom,email,age,chiffre_affaires
Alice Dupont,alice@test.com,28,15000.50
Bob Martin,bob@test.com,abc,22000
,charlie@test.com,35,8000
Diana Prince,diana@test.com,29,-500
Eve Wilson,email_invalide,41,31000
"""

with open("clients.csv", "w", encoding="utf-8") as f:
    f.write(csv_contenu)

clients_valides = []
erreurs = []

def valider_email(email):
    return "@" in email and "." in email.split("@")[-1]

with open("clients.csv", "r", encoding="utf-8") as f:
    lignes = f.readlines()

for num, ligne in enumerate(lignes[1:], start=2):
    ligne = ligne.strip()
    if not ligne:
        continue

    champs = ligne.split(",")
    if len(champs) != 4:
        erreurs.append((num, f"Nombre de colonnes incorrect"))
        continue

    nom, email, age_str, ca_str = champs
    ligne_erreurs = []

    if not nom.strip():
        ligne_erreurs.append("Nom vide")
    if not valider_email(email):
        ligne_erreurs.append(f"Email invalide : {email}")

    try:
        age = int(age_str)
        if not (18 <= age <= 120):
            ligne_erreurs.append(f"Âge hors plage : {age}")
    except ValueError:
        age = None
        ligne_erreurs.append(f"Âge non numérique : {age_str}")

    try:
        ca = float(ca_str)
        if ca < 0:
            ligne_erreurs.append(f"CA négatif : {ca}")
    except ValueError:
        ca = None
        ligne_erreurs.append(f"CA non numérique : {ca_str}")

    if ligne_erreurs:
        for err in ligne_erreurs:
            erreurs.append((num, err))
    else:
        clients_valides.append({"nom": nom, "email": email, "age": age, "ca": ca})

rapport = []
rapport.append("=== RAPPORT CSV ===")
rapport.append(f"Lignes traitées  : {len(lignes) - 1}")
rapport.append(f"Clients valides  : {len(clients_valides)}")
rapport.append(f"Erreurs          : {len(erreurs)}")
rapport.append("\\n--- Erreurs ---")
for num, err in erreurs:
    rapport.append(f"  Ligne {num}: {err}")
rapport.append("\\n--- Clients valides ---")
for c in clients_valides:
    rapport.append(f"  {c['nom']} ({c['email']})")

rapport_txt = "\\n".join(rapport)
print(rapport_txt)
with open("rapport_csv.txt", "w", encoding="utf-8") as f:
    f.write(rapport_txt)`
      }
    ]
  },

  {
    id: 908, level: 'Intermédiaire', title: "Programmation orientée objet",
    desc: "Crée des classes Python, utilise l'héritage et les méthodes spéciales pour modéliser le monde réel.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Classes, instances et héritage",
        content: `### Programmation orientée objet (POO) en Python

#### Pourquoi la POO ?

La POO permet de modéliser des entités sous forme d'**objets**. Chaque objet possède :
- Des **attributs** (données) : nom, âge, couleur
- Des **méthodes** (comportements) : démarrer(), calculer(), afficher()

#### Créer une classe avec __init__

\`\`\`python
class Chien:
    """Représente un chien."""

    espece = "Canis lupus familiaris"  # attribut de classe

    def __init__(self, nom, race, age):
        # attributs d'instance
        self.nom = nom
        self.race = race
        self.age = age

    def aboyer(self):
        print(f"{self.nom} dit : Woof !")

    def se_presenter(self):
        print(f"Je suis {self.nom}, un {self.race} de {self.age} ans.")

rex = Chien("Rex", "Berger Allemand", 3)
rex.aboyer()
rex.se_presenter()
\`\`\`

#### Les méthodes spéciales (dunder methods)

\`\`\`python
class Rectangle:
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur

    def __str__(self):
        return f"Rectangle {self.largeur}x{self.hauteur}"

    def __repr__(self):
        return f"Rectangle(largeur={self.largeur}, hauteur={self.hauteur})"

    def __eq__(self, autre):
        return self.largeur == autre.largeur and self.hauteur == autre.hauteur

    def aire(self):
        return self.largeur * self.hauteur

r1 = Rectangle(10, 5)
print(r1)        # Rectangle 10x5
print(r1.aire()) # 50
\`\`\`

#### L'héritage

\`\`\`python
class Animal:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def se_presenter(self):
        print(f"Je suis {self.nom}, j'ai {self.age} ans.")

    def faire_son(self):
        raise NotImplementedError("Chaque animal doit implémenter faire_son()")

class Chien(Animal):
    def __init__(self, nom, age, race):
        super().__init__(nom, age)
        self.race = race

    def faire_son(self):
        print(f"{self.nom} : Woof !")

class Chat(Animal):
    def faire_son(self):
        print(f"{self.nom} : Miaou !")

rex = Chien("Rex", 3, "Berger Allemand")
mimi = Chat("Mimi", 5)

rex.se_presenter()  # hérité de Animal
rex.faire_son()     # propre à Chien

print(isinstance(rex, Animal))  # True
\`\`\`

#### Méthodes statiques et de classe

\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @staticmethod
    def celsius_vers_fahrenheit(c):
        return c * 9/5 + 32

    @classmethod
    def depuis_fahrenheit(cls, fahrenheit):
        return cls((fahrenheit - 32) * 5/9)

t = Temperature.depuis_fahrenheit(212)
print(t.celsius)  # 100.0
\`\`\``,
        links: [
          { label: 'POO Python — Documentation', url: 'https://docs.python.org/fr/3/tutorial/classes.html' }
        ]
      }
    ],
    exercises: [
      {
        title: "Système de gestion d'animaux",
        scenario: "Un refuge pour animaux a besoin d'un système de gestion. Tu vas modéliser les animaux avec une hiérarchie de classes : Animal de base, puis Chien et Chat.",
        steps: [
          {
            title: "Créer la classe Animal",
            instructions: `Crée la classe de base avec les attributs communs :\n\n\`\`\`python\nclass Animal:\n    nombre_total = 0  # attribut de classe\n    \n    def __init__(self, nom, age, race):\n        self.nom = nom\n        self.age = age\n        self.race = race\n        self.sante = 100\n        Animal.nombre_total += 1\n    \n    def __str__(self):\n        pass  # à compléter\n    \n    def faire_son(self):\n        raise NotImplementedError\n    \n    def jouer(self):\n        self.sante = max(0, self.sante - 10)\n        print(f"{self.nom} joue ! Santé : {self.sante}%")\n\`\`\``
          },
          {
            title: "Créer les classes Chien et Chat",
            instructions: `Crée deux classes qui héritent d'Animal :\n\n- **Chien** : attribut \`dresse\` (bool), méthodes \`aboyer()\` et \`rapporter(objet)\`\n- **Chat** : attribut \`interieur\` (bool), méthodes \`miauler()\` et \`ronronner()\`\n\nChaque classe implémente \`faire_son()\`.`
          },
          {
            title: "Créer la classe Refuge",
            instructions: `Crée une classe \`Refuge\` pour gérer les animaux :\n\n\`\`\`python\nclass Refuge:\n    def __init__(self, nom):\n        self.nom = nom\n        self.animaux = []\n    \n    def accueillir(self, animal):\n        pass\n    \n    def liste_animaux(self):\n        pass\n    \n    def trouver_par_nom(self, nom):\n        pass\n\`\`\``
          },
          {
            title: "Tester le système",
            instructions: `Instancie quelques animaux, ajoute-les au refuge et teste les méthodes :\n\n\`\`\`python\nrefuge = Refuge("SPA de Paris")\nrefuge.accueillir(Chien("Rex", 3, "Berger Allemand", dresse=True))\nrefuge.accueillir(Chat("Mimi", 2, "Siamois", interieur=True))\nrefuge.liste_animaux()\nprint(f"Total créés : {Animal.nombre_total}")\n\`\`\``
          }
        ],
        hints: [
          "super().__init__(nom, age, race) appelle le constructeur de la classe parente",
          "isinstance(animal, Chien) retourne True si animal est un Chien",
          "Pour trouver par nom : next((a for a in self.animaux if a.nom == nom), None)"
        ],
        solution: `class Animal:
    nombre_total = 0

    def __init__(self, nom, age, race):
        self.nom = nom
        self.age = age
        self.race = race
        self.sante = 100
        Animal.nombre_total += 1

    def __str__(self):
        return f"{self.__class__.__name__} — {self.nom} ({self.race}, {self.age} ans) santé: {self.sante}%"

    def __repr__(self):
        return f"{self.__class__.__name__}(nom='{self.nom}', age={self.age})"

    def faire_son(self):
        raise NotImplementedError("Chaque animal doit implémenter faire_son()")

    def jouer(self):
        self.sante = max(0, self.sante - 10)
        print(f"{self.nom} joue ! Santé : {self.sante}%")


class Chien(Animal):
    def __init__(self, nom, age, race, dresse=False):
        super().__init__(nom, age, race)
        self.dresse = dresse

    def faire_son(self):
        print(f"{self.nom} : Woof woof !")

    def aboyer(self):
        self.faire_son()

    def rapporter(self, objet):
        if self.dresse:
            print(f"{self.nom} rapporte le {objet} !")
        else:
            print(f"{self.nom} ignore le {objet}...")


class Chat(Animal):
    def __init__(self, nom, age, race, interieur=True):
        super().__init__(nom, age, race)
        self.interieur = interieur

    def faire_son(self):
        print(f"{self.nom} : Miaou !")

    def miauler(self):
        self.faire_son()

    def ronronner(self):
        print(f"{self.nom} ronronne...")


class Refuge:
    def __init__(self, nom):
        self.nom = nom
        self.animaux = []

    def accueillir(self, animal):
        self.animaux.append(animal)
        print(f"{animal.nom} a rejoint {self.nom}.")

    def liste_animaux(self):
        print(f"\\n=== {self.nom} — {len(self.animaux)} animaux ===")
        for a in self.animaux:
            print(f"  {a}")

    def trouver_par_nom(self, nom):
        return next((a for a in self.animaux if a.nom.lower() == nom.lower()), None)


refuge = Refuge("SPA de Paris")
refuge.accueillir(Chien("Rex", 3, "Berger Allemand", dresse=True))
refuge.accueillir(Chat("Mimi", 2, "Siamois", interieur=True))
refuge.liste_animaux()

rex = refuge.trouver_par_nom("Rex")
rex.faire_son()
rex.rapporter("balle")
rex.jouer()

print(f"\\nTotal animaux créés : {Animal.nombre_total}")`
      }
    ]
  },

  {
    id: 909, level: 'Avancé', title: "NumPy — tableaux et calcul vectorisé",
    desc: "Maîtrise NumPy pour le calcul scientifique : ndarray, opérations vectorisées, indexing et broadcasting.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "Introduction à NumPy",
        content: `### NumPy : le cœur du calcul scientifique Python

#### Pourquoi NumPy ?

Les listes Python sont flexibles mais lentes pour les calculs numériques. NumPy introduit le \`ndarray\`, jusqu'à **100x plus rapide** grâce au calcul vectorisé.

\`\`\`bash
pip install numpy
\`\`\`

\`\`\`python
import numpy as np

liste = [1, 2, 3, 4, 5]
tableau = np.array([1, 2, 3, 4, 5])

# NumPy : opération vectorisée
tableau_x2 = tableau * 2  # [2, 4, 6, 8, 10]
\`\`\`

#### Créer des tableaux

\`\`\`python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([[1, 2, 3], [4, 5, 6]])  # 2D

zeros = np.zeros((3, 4))
uns = np.ones((2, 3))
identite = np.eye(3)
aleatoire = np.random.random((2, 3))

suite = np.arange(0, 10, 2)      # [0, 2, 4, 6, 8]
lineaire = np.linspace(0, 1, 5)  # [0. 0.25 0.5 0.75 1.]
\`\`\`

#### Attributs d'un tableau

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.shape)  # (2, 3)
print(arr.ndim)   # 2
print(arr.size)   # 6
print(arr.dtype)  # int64
\`\`\`

#### Opérations vectorisées

\`\`\`python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

print(a + b)       # [11 22 33 44]
print(a * b)       # [10 40 90 160]
print(a ** 2)      # [1 4 9 16]
print(np.sqrt(a))  # [1. 1.41 1.73 2.]

print(np.sum(a))   # 10
print(np.mean(a))  # 2.5
print(np.std(a))   # 1.118
\`\`\`

#### Indexing, slicing et boolean masking

\`\`\`python
arr = np.array([[10, 20, 30],
                [40, 50, 60],
                [70, 80, 90]])

print(arr[0, 1])    # 20
print(arr[1, :])    # [40 50 60]
print(arr[:, 2])    # [30 60 90]

notes = np.array([12, 8, 15, 18, 6, 14])
reussites = notes[notes >= 10]  # [12 15 18 14]
print(np.where(notes >= 10, "Réussi", "Échoué"))
\`\`\`

#### Broadcasting

\`\`\`python
matrice = np.array([[1, 2, 3], [4, 5, 6]])
vecteur = np.array([10, 20, 30])

resultat = matrice + vecteur
# [[11 22 33]
#  [14 25 36]]
\`\`\``,
        links: [
          { label: 'Documentation NumPy', url: 'https://numpy.org/doc/stable/' },
          { label: 'NumPy Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html' }
        ]
      }
    ],
    exercises: [
      {
        title: "Analyse statistique de notes d'étudiants",
        scenario: "Tu es data analyst dans une université. On te fournit un dataset de notes d'étudiants sur plusieurs matières. Tu dois calculer des statistiques, identifier les étudiants en difficulté et générer un rapport avec NumPy.",
        steps: [
          {
            title: "Créer le dataset",
            instructions: `Génère un dataset fictif : 30 étudiants, 5 matières, notes entre 0 et 20 :\n\n\`\`\`python\nimport numpy as np\nnp.random.seed(42)\n\nmatieres = ["Maths", "Python", "Stats", "Algo", "BDD"]\nnotes = np.random.randint(0, 21, size=(30, 5)).astype(float)\n\n# Introduis quelques mauvaises notes\nnotes[5, 2] = 3\nnotes[12, 0] = 4\nnotes[23, :] = np.random.randint(0, 8, 5)\n\`\`\``
          },
          {
            title: "Statistiques par matière",
            instructions: `Calcule pour chaque matière (chaque colonne) :\n- La moyenne : \`np.mean(notes, axis=0)\`\n- L'écart-type, min, max\n- Le taux de réussite (notes ≥ 10)\n\nUtilise \`axis=0\` pour calculer par colonne (= par matière).`
          },
          {
            title: "Identifier les étudiants en difficulté",
            instructions: `Calcule la moyenne de chaque étudiant avec \`axis=1\` (= par ligne).\n\nIdentifie avec boolean masking :\n- Les étudiants avec une moyenne < 8\n- Les étudiants avec au moins une note < 5 : \`np.any(notes < 5, axis=1)\``
          },
          {
            title: "Classement",
            instructions: `Crée un classement des étudiants par moyenne décroissante avec \`np.argsort(moyennes)[::-1]\`.\n\nAffiche le top 5 et identifie la matière la plus difficile (plus faible moyenne).`
          }
        ],
        hints: [
          "np.mean(notes, axis=0) calcule par colonne (par matière), axis=1 par ligne (par étudiant)",
          "np.argsort(moyennes)[::-1] retourne les indices du plus grand au plus petit",
          "np.any(notes < 5, axis=1) : True si l'étudiant a au moins une note < 5"
        ],
        solution: `import numpy as np

np.random.seed(42)
matieres = ["Maths", "Python", "Stats", "Algo", "BDD"]
notes = np.random.randint(0, 21, size=(30, 5)).astype(float)
notes[5, 2] = 3
notes[12, 0] = 4
notes[23, :] = np.random.randint(0, 8, 5)

print("=== STATISTIQUES PAR MATIÈRE ===")
moyennes_mat = np.mean(notes, axis=0)
std_mat = np.std(notes, axis=0)
taux_reussite = np.mean(notes >= 10, axis=0) * 100

for i, mat in enumerate(matieres):
    print(f"{mat:8s} | Moy: {moyennes_mat[i]:.1f} | Std: {std_mat[i]:.1f} | Réussite: {taux_reussite[i]:.0f}%")

print("\\n=== ÉTUDIANTS EN DIFFICULTÉ ===")
moyennes_etu = np.mean(notes, axis=1)
en_difficulte = np.where(moyennes_etu < 8)[0]
note_critique = np.where(np.any(notes < 5, axis=1))[0]

print(f"Moyenne < 8     : {len(en_difficulte)} étudiants → indices {en_difficulte}")
print(f"Note < 5 quelque part : {len(note_critique)} étudiants")

print("\\n=== TOP 5 ===")
classement = np.argsort(moyennes_etu)[::-1]
for rang, idx in enumerate(classement[:5], 1):
    print(f"  {rang}. Étudiant #{idx+1:02d} — Moyenne: {moyennes_etu[idx]:.1f}")

pire_mat = np.argmin(moyennes_mat)
print(f"\\nMatière la plus difficile : {matieres[pire_mat]} (moy: {moyennes_mat[pire_mat]:.1f})")`
      }
    ]
  },

  {
    id: 910, level: 'Avancé', title: "Pandas — manipulation de données",
    desc: "Analyse des données avec Pandas : DataFrame, filtrage, groupby, merge et visualisation basique.",
    color: 'blue', colorHex: '#3B82F6',
    lessons: [
      {
        title: "DataFrame et Series",
        content: `### Pandas : le couteau suisse de la data

#### Installer et importer

\`\`\`bash
pip install pandas matplotlib
\`\`\`

\`\`\`python
import pandas as pd
import numpy as np
\`\`\`

#### Les deux structures fondamentales

**Series** : tableau 1D avec index

\`\`\`python
s = pd.Series([10, 20, 30, 40], index=["a", "b", "c", "d"])
print(s["b"])    # 20
print(s[s > 15]) # b 20, c 30, d 40
\`\`\`

**DataFrame** : tableau 2D avec colonnes nommées

\`\`\`python
data = {
    "nom": ["Alice", "Bob", "Charlie", "Diana"],
    "age": [28, 35, 22, 31],
    "ville": ["Paris", "Lyon", "Paris", "Bordeaux"],
    "salaire": [45000, 52000, 38000, 61000]
}
df = pd.DataFrame(data)
print(df.info())     # types et valeurs nulles
print(df.describe()) # statistiques descriptives
\`\`\`

#### Lire des données

\`\`\`python
df = pd.read_csv("ventes.csv", sep=",", encoding="utf-8")
df = pd.read_json("data.json")
df.to_csv("sortie.csv", index=False)
\`\`\`

#### Sélectionner des données

\`\`\`python
print(df["nom"])             # une colonne
print(df[["nom", "age"]])    # plusieurs colonnes

# loc : sélection par étiquette
print(df.loc[0])
print(df.loc[0:2, "nom":"age"])

# iloc : sélection par position
print(df.iloc[0:3, 0:2])
\`\`\`

#### Filtrage

\`\`\`python
parisiens = df[df["ville"] == "Paris"]
bien_payes = df[df["salaire"] > 50000]

condition = (df["ville"] == "Paris") & (df["salaire"] > 40000)
parisiens_riches = df[condition]

grandes_villes = df[df["ville"].isin(["Paris", "Lyon"])]
commencent_par_a = df[df["nom"].str.startswith("A")]
\`\`\``,
        links: [
          { label: 'Documentation Pandas', url: 'https://pandas.pydata.org/docs/' },
          { label: 'Pandas Cheat Sheet', url: 'https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf' }
        ]
      },
      {
        title: "Groupby, merge et visualisation",
        content: `### Agrégation, jointures et visualisation

#### groupby() : agréger par groupe

\`\`\`python
# Moyenne des salaires par ville
salaire_par_ville = df.groupby("ville")["salaire"].mean()

# Plusieurs agrégations
stats = df.groupby("ville").agg({
    "salaire": ["mean", "min", "max", "count"],
    "age": "mean"
})

# reset_index() pour aplatir
resultat = df.groupby("ville")["salaire"].sum().reset_index()
\`\`\`

#### Nettoyage des données

\`\`\`python
print(df.isnull().sum())         # compter les NaN
df_propre = df.dropna()          # supprimer lignes avec NaN
df["age"] = df["age"].fillna(df["age"].mean())

df = df.drop_duplicates()
df = df.rename(columns={"nom": "name"})
df["date"] = pd.to_datetime(df["date"])
\`\`\`

#### merge() et concat()

\`\`\`python
clients = pd.DataFrame({
    "id_client": [1, 2, 3],
    "nom": ["Alice", "Bob", "Charlie"]
})

commandes = pd.DataFrame({
    "id_commande": [101, 102, 103],
    "id_client": [1, 1, 2],
    "montant": [150, 200, 80]
})

resultat = pd.merge(commandes, clients, on="id_client", how="left")
df_total = pd.concat([df_2023, df_2024], ignore_index=True)
\`\`\`

#### Visualisation basique

\`\`\`python
import matplotlib.pyplot as plt

df["salaire"].hist(bins=20)
plt.title("Distribution des salaires")
plt.savefig("histogramme.png")

ventes_par_mois = df.groupby("mois")["ca"].sum()
ventes_par_mois.plot(kind="bar", color="steelblue")
plt.title("CA par mois")
plt.tight_layout()
plt.savefig("ca_mensuel.png")
\`\`\``,
        links: [
          { label: 'Groupby Pandas', url: 'https://pandas.pydata.org/docs/user_guide/groupby.html' },
          { label: 'Matplotlib Gallery', url: 'https://matplotlib.org/stable/gallery/' }
        ]
      }
    ],
    exercises: [
      {
        title: "Analyse d'un dataset de ventes",
        scenario: "Tu es analyste chez un e-commerçant. On te donne un fichier CSV de transactions avec colonnes : date, produit, categorie, quantite, prix_unitaire, region. Tu dois nettoyer, analyser et extraire des insights.",
        steps: [
          {
            title: "Générer et charger les données",
            instructions: `Génère un dataset réaliste et sauvegarde-le :\n\n\`\`\`python\nimport pandas as pd\nimport numpy as np\nnp.random.seed(42)\n\nproduits = ["Laptop", "Souris", "Clavier", "Écran", "Casque"]\ncategories = {"Laptop": "Informatique", "Souris": "Périphériques",\n              "Clavier": "Périphériques", "Écran": "Informatique", "Casque": "Audio"}\nregions = ["Nord", "Sud", "Est", "Ouest", "Paris"]\n\nn = 500\nprod_col = np.random.choice(produits, n)\ndf = pd.DataFrame({\n    "date": pd.date_range("2024-01-01", periods=n, freq="12H"),\n    "produit": prod_col,\n    "categorie": [categories[p] for p in prod_col],\n    "quantite": np.random.randint(1, 10, n),\n    "prix_unitaire": np.random.uniform(10, 1500, n).round(2),\n    "region": np.random.choice(regions, n)\n})\ndf.to_csv("ventes.csv", index=False)\n\`\`\``
          },
          {
            title: "Nettoyer les données",
            instructions: `Charge le CSV et nettoie-le :\n1. Vérifie les valeurs manquantes\n2. Remplace les \`prix_unitaire\` NaN par la médiane du produit\n3. Convertis \`date\` en datetime\n4. Ajoute une colonne \`ca = quantite * prix_unitaire\`\n5. Ajoute une colonne \`mois\` extraite de la date`
          },
          {
            title: "Analyses et agrégations",
            instructions: `Réponds à ces questions :\n1. **Top 3 produits** par chiffre d'affaires total\n2. **CA par région et catégorie** (pivot_table)\n3. **Évolution mensuelle** du CA\n4. **Panier moyen** par région\n\n\`\`\`python\npivot = df.pivot_table(values="ca", index="region",\n                       columns="categorie", aggfunc="sum")\n\`\`\``
          },
          {
            title: "Visualisation et export",
            instructions: `Génère deux graphiques :\n1. Barplot horizontal du CA par produit (trié)\n2. Line plot de l'évolution mensuelle\n\nExporte un rapport CSV avec le top 5 produits et les stats par région.`
          }
        ],
        hints: [
          "Remplir NaN par médiane du groupe : df.groupby('produit')['prix_unitaire'].transform(lambda x: x.fillna(x.median()))",
          "Extraire le mois : df['mois'] = df['date'].dt.to_period('M')",
          "Barplot horizontal trié : top_produits.sort_values().plot(kind='barh')"
        ],
        solution: `import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

np.random.seed(42)
produits = ["Laptop", "Souris", "Clavier", "Écran", "Casque"]
categories = {"Laptop": "Informatique", "Souris": "Périphériques",
              "Clavier": "Périphériques", "Écran": "Informatique", "Casque": "Audio"}
regions = ["Nord", "Sud", "Est", "Ouest", "Paris"]

n = 500
prod_col = np.random.choice(produits, n)
df = pd.DataFrame({
    "date": pd.date_range("2024-01-01", periods=n, freq="12H"),
    "produit": prod_col,
    "categorie": [categories[p] for p in prod_col],
    "quantite": np.random.randint(1, 10, n),
    "prix_unitaire": np.random.uniform(10, 1500, n).round(2),
    "region": np.random.choice(regions, n)
})
df.loc[np.random.choice(n, 20), "prix_unitaire"] = np.nan
df.to_csv("ventes.csv", index=False)

# Chargement
df = pd.read_csv("ventes.csv")
print("Valeurs manquantes :", df.isnull().sum().to_dict())

# Nettoyage
df["prix_unitaire"] = df.groupby("produit")["prix_unitaire"].transform(
    lambda x: x.fillna(x.median())
)
df["date"] = pd.to_datetime(df["date"])
df["ca"] = df["quantite"] * df["prix_unitaire"]
df["mois"] = df["date"].dt.to_period("M")

# Analyses
print("\\n=== TOP 3 PRODUITS ===")
top_produits = df.groupby("produit")["ca"].sum().sort_values(ascending=False)
print(top_produits.head(3))

print("\\n=== PIVOT RÉGION / CATÉGORIE ===")
pivot = df.pivot_table(values="ca", index="region", columns="categorie", aggfunc="sum").round(0)
print(pivot)

print("\\n=== PANIER MOYEN PAR RÉGION ===")
panier = df.groupby("region")["ca"].mean().round(2)
print(panier)

# Graphiques
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

top_produits.sort_values().plot(kind="barh", ax=axes[0], color="steelblue")
axes[0].set_title("CA par produit")

ca_mensuel = df.groupby(df["date"].dt.month)["ca"].sum()
ca_mensuel.plot(kind="line", ax=axes[1], marker="o", color="orange")
axes[1].set_title("Évolution mensuelle du CA")

plt.tight_layout()
plt.savefig("rapport_ventes.png", dpi=100)
print("\\nGraphique sauvegardé : rapport_ventes.png")

top_produits.reset_index().rename(columns={"ca": "ca_total"}).to_csv(
    "rapport_top_produits.csv", index=False
)
print("Rapport exporté : rapport_top_produits.csv")`
      }
    ]
  }
];

export default PYTHON_MODULES;
