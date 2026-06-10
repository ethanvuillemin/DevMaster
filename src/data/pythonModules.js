const PYTHON_MODULES = [
  {
    id: 601,
    title: 'Variables & Types',
    icon: '🐍',
    level: 'Débutant',
    colorHex: '#3776AB',
    description: 'int, float, str, bool — les briques de base de Python.',
    lessons: [
      {
        title: 'Types primitifs',
        content: `## Variables & Types primitifs

Python est un langage à **typage dynamique** : pas besoin de déclarer le type, Python l'infère.

\`\`\`python
age = 25          # int
prix = 9.99       # float
nom = "Alice"     # str
actif = True      # bool
rien = None       # NoneType
\`\`\`

### Vérifier le type
\`\`\`python
type(age)    # <class 'int'>
type(prix)   # <class 'float'>
\`\`\`

### Conversion de types
\`\`\`python
int("42")      # 42
float("3.14")  # 3.14
str(100)       # "100"
bool(0)        # False
bool(1)        # True
\`\`\`

### Opérations arithmétiques
| Opérateur | Signification | Exemple |
|-----------|--------------|---------|
| \`+\` | Addition | \`3 + 2 = 5\` |
| \`-\` | Soustraction | \`5 - 2 = 3\` |
| \`*\` | Multiplication | \`3 * 4 = 12\` |
| \`/\` | Division (float) | \`7 / 2 = 3.5\` |
| \`//\` | Division entière | \`7 // 2 = 3\` |
| \`%\` | Modulo | \`7 % 2 = 1\` |
| \`**\` | Puissance | \`2 ** 8 = 256\` |
`,
        links: [{ url: 'https://docs.python.org/fr/3/library/stdtypes.html', label: 'Types intégrés Python' }],
      },
      {
        title: 'Entrées & Affichage',
        content: `## Entrées utilisateur & print

### print() — tout afficher
\`\`\`python
print("Hello World")
print("Nom :", nom, "| Age :", age)
print(f"Bonjour {nom}, tu as {age} ans")   # f-string (recommandé)
\`\`\`

### input() — lire depuis le terminal
\`\`\`python
prenom = input("Ton prénom ? ")
annee = int(input("Année de naissance ? "))
age = 2025 - annee
print(f"Tu as environ {age} ans")
\`\`\`

> ⚠️ **input() retourne toujours une str** — convertis si besoin.

### f-strings avancées
\`\`\`python
pi = 3.14159
print(f"Pi ≈ {pi:.2f}")        # Pi ≈ 3.14
print(f"{'centré':^20}")       # centré sur 20 chars
print(f"{1000000:,}")          # 1,000,000
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 602,
    title: 'Strings & Formatage',
    icon: '🔤',
    level: 'Débutant',
    colorHex: '#3776AB',
    description: 'Manipulation de chaînes, méthodes et f-strings.',
    lessons: [
      {
        title: 'Méthodes string',
        content: `## Chaînes de caractères

### Création
\`\`\`python
s = "Hello, World!"
s2 = 'simple quote'
multi = """
ligne 1
ligne 2
"""
\`\`\`

### Indexation & Slicing
\`\`\`python
s = "Python"
s[0]      # 'P'
s[-1]     # 'n'
s[1:4]    # 'yth'
s[::-1]   # 'nohtyP'  (renversé)
\`\`\`

### Méthodes essentielles
\`\`\`python
"  hello  ".strip()         # "hello"
"hello world".upper()       # "HELLO WORLD"
"PYTHON".lower()            # "python"
"hello world".split()       # ["hello", "world"]
" ".join(["a", "b", "c"])   # "a b c"
"hello".replace("l", "L")   # "heLLo"
"hello world".find("world") # 6
"hello".startswith("he")    # True
"python".count("p")         # 1
\`\`\`

### f-strings
\`\`\`python
nom = "Alice"
score = 98.5
print(f"Bravo {nom} ! Score : {score:.1f}/100")
\`\`\`
`,
        links: [{ url: 'https://docs.python.org/fr/3/library/string.html', label: 'Méthodes string Python' }],
      },
    ],
    exercises: [],
  },
  {
    id: 603,
    title: 'Listes & Tuples',
    icon: '📋',
    level: 'Débutant',
    colorHex: '#3776AB',
    description: 'Collections ordonnées, mutables et immutables.',
    lessons: [
      {
        title: 'Listes',
        content: `## Listes Python

Les listes sont **mutables** (modifiables), ordonnées et indexées.

\`\`\`python
fruits = ["pomme", "banane", "cerise"]
fruits[0]            # "pomme"
fruits[-1]           # "cerise"
fruits[1:3]          # ["banane", "cerise"]
\`\`\`

### Méthodes essentielles
\`\`\`python
fruits.append("kiwi")       # ajout en fin
fruits.insert(1, "mangue")  # insertion à index 1
fruits.remove("banane")     # supprime premier "banane"
fruits.pop()                # supprime et retourne le dernier
fruits.pop(0)               # supprime l'index 0
fruits.sort()               # tri en place
sorted(fruits)              # tri, retourne nouvelle liste
fruits.reverse()
len(fruits)
"pomme" in fruits           # True/False
\`\`\`

### Tuples — immuables
\`\`\`python
point = (3, 5)
x, y = point           # déstructuration
coord = (1, 2, 3)
coord[0]               # 1
# coord[0] = 10        # ❌ TypeError !
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 604,
    title: 'Dictionnaires & Sets',
    icon: '📖',
    level: 'Débutant',
    colorHex: '#3776AB',
    description: 'Clé/valeur avec dict, collections uniques avec set.',
    lessons: [
      {
        title: 'Dictionnaires',
        content: `## Dictionnaires

Structure **clé → valeur**, non ordonnée (mais stable depuis Python 3.7+).

\`\`\`python
personne = {
    "nom": "Alice",
    "age": 30,
    "ville": "Paris"
}

personne["nom"]              # "Alice"
personne.get("email", "N/A") # "N/A" si absent
personne["email"] = "a@b.fr" # ajout
del personne["age"]          # suppression

personne.keys()    # dict_keys(["nom", "ville", "email"])
personne.values()
personne.items()   # liste de tuples (clé, valeur)

# Itérer
for cle, valeur in personne.items():
    print(f"{cle}: {valeur}")
\`\`\`

### Sets — ensembles uniques
\`\`\`python
nombres = {1, 2, 3, 2, 1}   # {1, 2, 3}
nombres.add(4)
nombres.discard(2)
a = {1, 2, 3}
b = {2, 3, 4}
a & b   # {2, 3}  intersection
a | b   # {1, 2, 3, 4}  union
a - b   # {1}  différence
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 605,
    title: 'Conditions & Logique',
    icon: '🔀',
    level: 'Débutant',
    colorHex: '#3776AB',
    description: 'if/elif/else, opérateurs logiques, ternaire.',
    lessons: [
      {
        title: 'Branchements',
        content: `## Conditions

\`\`\`python
age = 18

if age >= 18:
    print("Majeur")
elif age >= 13:
    print("Ado")
else:
    print("Enfant")
\`\`\`

### Opérateurs de comparaison
\`\`\`
==  !=  >  <  >=  <=
\`\`\`

### Opérateurs logiques
\`\`\`python
a = True; b = False
a and b    # False
a or b     # True
not a      # False
\`\`\`

### Valeurs "falsy"
\`\`\`python
# Considérés False : 0, "", [], {}, None, False
if not []:
    print("liste vide !")
\`\`\`

### Ternaire (expression inline)
\`\`\`python
statut = "majeur" if age >= 18 else "mineur"
\`\`\`

### match/case (Python 3.10+)
\`\`\`python
commande = "start"
match commande:
    case "start":
        print("Démarrage")
    case "stop":
        print("Arrêt")
    case _:
        print("Commande inconnue")
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 606,
    title: 'Boucles',
    icon: '🔁',
    level: 'Débutant',
    colorHex: '#3776AB',
    description: 'for, while, break, continue, enumerate, zip.',
    lessons: [
      {
        title: 'for & while',
        content: `## Boucles Python

### for — itérer sur une séquence
\`\`\`python
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for fruit in ["pomme", "banane"]:
    print(fruit)

# enumerate — index + valeur
for i, fruit in enumerate(["a", "b", "c"]):
    print(i, fruit)  # 0 a / 1 b / 2 c

# zip — itérer deux listes en parallèle
noms = ["Alice", "Bob"]
ages = [30, 25]
for nom, age in zip(noms, ages):
    print(f"{nom} a {age} ans")
\`\`\`

### while
\`\`\`python
n = 0
while n < 5:
    print(n)
    n += 1
\`\`\`

### break & continue
\`\`\`python
for i in range(10):
    if i == 3: continue   # saute le 3
    if i == 7: break      # arrête tout
    print(i)
\`\`\`

### range()
\`\`\`python
range(10)        # 0..9
range(2, 8)      # 2..7
range(0, 10, 2)  # 0, 2, 4, 6, 8
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 607,
    title: 'Fonctions',
    icon: '⚙️',
    level: 'Intermédiaire',
    colorHex: '#FFD43B',
    description: 'def, arguments, valeurs par défaut, *args, **kwargs, return.',
    lessons: [
      {
        title: 'Définir & appeler',
        content: `## Fonctions

### Définition basique
\`\`\`python
def saluer(prenom):
    return f"Bonjour {prenom} !"

saluer("Alice")  # "Bonjour Alice !"
\`\`\`

### Paramètres par défaut
\`\`\`python
def puissance(base, exp=2):
    return base ** exp

puissance(3)      # 9
puissance(2, 10)  # 1024
\`\`\`

### *args & **kwargs
\`\`\`python
def somme(*nombres):
    return sum(nombres)

somme(1, 2, 3, 4)  # 10

def afficher(**infos):
    for cle, val in infos.items():
        print(f"{cle}: {val}")

afficher(nom="Alice", age=30)
\`\`\`

### Retour multiple
\`\`\`python
def min_max(lst):
    return min(lst), max(lst)

mini, maxi = min_max([3, 1, 8, 2])
\`\`\`

### Docstrings
\`\`\`python
def aire_cercle(r):
    """Calcule l'aire d'un cercle de rayon r."""
    import math
    return math.pi * r ** 2
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 608,
    title: 'POO — Classes',
    icon: '🏗️',
    level: 'Intermédiaire',
    colorHex: '#FFD43B',
    description: '__init__, attributs, méthodes, self, encapsulation.',
    lessons: [
      {
        title: 'Classes & Objets',
        content: `## Programmation Orientée Objet

### Définir une classe
\`\`\`python
class Chien:
    espece = "Canis lupus"   # attribut de classe

    def __init__(self, nom, age):
        self.nom = nom    # attribut d'instance
        self.age = age

    def aboyer(self):
        return f"{self.nom} : Woof !"

    def __repr__(self):
        return f"Chien(nom={self.nom!r}, age={self.age})"


rex = Chien("Rex", 3)
rex.aboyer()       # "Rex : Woof !"
print(rex)         # Chien(nom='Rex', age=3)
\`\`\`

### Méthodes spéciales utiles
| Méthode | Déclenchée par |
|---------|---------------|
| \`__init__\` | \`Chien()\` |
| \`__repr__\` | \`repr(obj)\`, debug |
| \`__str__\` | \`print(obj)\` |
| \`__len__\` | \`len(obj)\` |
| \`__eq__\` | \`obj1 == obj2\` |

### Propriétés (@property)
\`\`\`python
class Cercle:
    def __init__(self, rayon):
        self._rayon = rayon

    @property
    def rayon(self):
        return self._rayon

    @rayon.setter
    def rayon(self, val):
        if val < 0: raise ValueError("rayon négatif")
        self._rayon = val
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 609,
    title: 'Héritage & Polymorphisme',
    icon: '🧬',
    level: 'Intermédiaire',
    colorHex: '#FFD43B',
    description: 'super(), override, classes abstraites, isinstance.',
    lessons: [
      {
        title: 'Héritage',
        content: `## Héritage

\`\`\`python
class Animal:
    def __init__(self, nom):
        self.nom = nom

    def parler(self):
        raise NotImplementedError

class Chien(Animal):
    def parler(self):
        return "Woof !"

class Chat(Animal):
    def parler(self):
        return "Miaou !"

animaux = [Chien("Rex"), Chat("Whiskers")]
for a in animaux:
    print(a.nom, "dit", a.parler())
\`\`\`

### super()
\`\`\`python
class AnimalDomestique(Animal):
    def __init__(self, nom, proprietaire):
        super().__init__(nom)
        self.proprietaire = proprietaire
\`\`\`

### Classes abstraites
\`\`\`python
from abc import ABC, abstractmethod

class Forme(ABC):
    @abstractmethod
    def aire(self): ...

class Rectangle(Forme):
    def __init__(self, l, h):
        self.l, self.h = l, h
    def aire(self):
        return self.l * self.h
\`\`\`

### isinstance & issubclass
\`\`\`python
isinstance(rex, Chien)    # True
isinstance(rex, Animal)   # True
issubclass(Chien, Animal) # True
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 610,
    title: 'Exceptions',
    icon: '🚨',
    level: 'Intermédiaire',
    colorHex: '#FFD43B',
    description: 'try/except/finally, raise, exceptions personnalisées.',
    lessons: [
      {
        title: 'Gestion d\'erreurs',
        content: `## Exceptions

### try / except / else / finally
\`\`\`python
try:
    resultat = 10 / 0
except ZeroDivisionError as e:
    print(f"Erreur : {e}")
except (TypeError, ValueError) as e:
    print(f"Mauvais type : {e}")
else:
    print("Succès !")
finally:
    print("Toujours exécuté")
\`\`\`

### Exceptions courantes
| Exception | Cause |
|-----------|-------|
| \`ValueError\` | Valeur invalide |
| \`TypeError\` | Mauvais type |
| \`KeyError\` | Clé absente dans dict |
| \`IndexError\` | Index hors limites |
| \`FileNotFoundError\` | Fichier absent |
| \`ZeroDivisionError\` | Division par 0 |

### raise
\`\`\`python
def diviser(a, b):
    if b == 0:
        raise ValueError("Diviseur ne peut être 0")
    return a / b
\`\`\`

### Exception personnalisée
\`\`\`python
class AgeInvalideError(Exception):
    def __init__(self, age):
        super().__init__(f"Age {age} invalide (doit être >= 0)")

def verifier_age(age):
    if age < 0:
        raise AgeInvalideError(age)
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 611,
    title: 'Fichiers & I/O',
    icon: '📁',
    level: 'Intermédiaire',
    colorHex: '#FFD43B',
    description: 'Lire/écrire des fichiers texte, CSV et JSON.',
    lessons: [
      {
        title: 'Lecture & Écriture',
        content: `## Fichiers

### Ouvrir un fichier — with open()
\`\`\`python
# Lecture
with open("data.txt", "r", encoding="utf-8") as f:
    contenu = f.read()         # tout le fichier
    # ou
    lignes = f.readlines()     # liste de lignes
    # ou
    for ligne in f:            # ligne par ligne
        print(ligne.strip())

# Écriture (écrase)
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Hello !\\n")

# Ajout
with open("log.txt", "a") as f:
    f.write("nouvelle entrée\\n")
\`\`\`

### CSV
\`\`\`python
import csv

# Lecture
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["nom"], row["age"])

# Écriture
with open("out.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["nom", "age"])
    writer.writeheader()
    writer.writerow({"nom": "Alice", "age": 30})
\`\`\`

### JSON
\`\`\`python
import json

# Lire
with open("data.json") as f:
    data = json.load(f)

# Écrire
with open("out.json", "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# String ↔ dict
s = json.dumps({"a": 1})    # '{"a": 1}'
d = json.loads(s)           # {"a": 1}
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 612,
    title: 'Comprehensions',
    icon: '⚡',
    level: 'Intermédiaire',
    colorHex: '#FFD43B',
    description: 'List/dict/set comprehensions, expressions génératrices.',
    lessons: [
      {
        title: 'Syntaxe compacte',
        content: `## Comprehensions

### List comprehension
\`\`\`python
# Classique
carres = []
for i in range(10):
    carres.append(i**2)

# Comprehension
carres = [i**2 for i in range(10)]
pairs = [i for i in range(20) if i % 2 == 0]
mots_longs = [m.upper() for m in mots if len(m) > 4]
\`\`\`

### Dict comprehension
\`\`\`python
mots = ["chat", "chien", "oiseau"]
longueurs = {mot: len(mot) for mot in mots}
# {"chat": 4, "chien": 5, "oiseau": 6}

inverse = {v: k for k, v in {"a": 1, "b": 2}.items()}
# {1: "a", 2: "b"}
\`\`\`

### Set comprehension
\`\`\`python
doublons = [1, 2, 2, 3, 3, 3]
uniques = {x for x in doublons}  # {1, 2, 3}
\`\`\`

### Expressions génératrices (lazy)
\`\`\`python
# Pas de crochets → générateur (économise la RAM)
total = sum(i**2 for i in range(1_000_000))
\`\`\`

### Comprehensions imbriquées
\`\`\`python
matrice = [[1,2,3],[4,5,6],[7,8,9]]
plat = [n for ligne in matrice for n in ligne]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 613,
    title: 'Fonctions avancées',
    icon: '🔬',
    level: 'Avancé',
    colorHex: '#AA7DCE',
    description: 'lambda, map, filter, sorted, functools, closures.',
    lessons: [
      {
        title: 'Higher-order functions',
        content: `## Fonctions avancées

### lambda — fonctions anonymes
\`\`\`python
double = lambda x: x * 2
double(5)  # 10

carre = lambda x: x ** 2
\`\`\`

### map() & filter()
\`\`\`python
nombres = [1, 2, 3, 4, 5]
doubles = list(map(lambda x: x*2, nombres))
# [2, 4, 6, 8, 10]

pairs = list(filter(lambda x: x%2==0, nombres))
# [2, 4]
\`\`\`

### sorted() avec key
\`\`\`python
personnes = [{"nom": "Bob", "age": 25}, {"nom": "Alice", "age": 30}]
tries = sorted(personnes, key=lambda p: p["age"])
tries_desc = sorted(personnes, key=lambda p: p["age"], reverse=True)
\`\`\`

### functools
\`\`\`python
from functools import reduce, partial, lru_cache

# reduce — agréger
produit = reduce(lambda a, b: a*b, [1,2,3,4,5])  # 120

# partial — fixer des arguments
def puissance(base, exp): return base ** exp
carre = partial(puissance, exp=2)
carre(5)  # 25

# lru_cache — mémoïsation
@lru_cache(maxsize=None)
def fib(n):
    if n < 2: return n
    return fib(n-1) + fib(n-2)
\`\`\`

### Closures
\`\`\`python
def compteur(debut=0):
    n = [debut]
    def incrementer():
        n[0] += 1
        return n[0]
    return incrementer

c = compteur()
c()  # 1
c()  # 2
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 614,
    title: 'Décorateurs',
    icon: '🎭',
    level: 'Avancé',
    colorHex: '#AA7DCE',
    description: '@decorator, wraps, décorateurs avec arguments, stacking.',
    lessons: [
      {
        title: 'Décorateurs Python',
        content: `## Décorateurs

Un décorateur **enveloppe** une fonction pour modifier son comportement.

### Décorateur simple
\`\`\`python
from functools import wraps

def logger(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Appel de {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Retour : {result}")
        return result
    return wrapper

@logger
def additionner(a, b):
    return a + b

additionner(3, 4)
# Appel de additionner
# Retour : 7
\`\`\`

### Décorateur avec arguments
\`\`\`python
def repeter(n):
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorateur

@repeter(3)
def saluer():
    print("Bonjour !")

saluer()  # affiche 3 fois
\`\`\`

### Exemples pratiques
\`\`\`python
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0 = time.time()
        res = func(*args, **kwargs)
        print(f"{func.__name__} : {time.time()-t0:.4f}s")
        return res
    return wrapper

def cache(func):
    memo = {}
    @wraps(func)
    def wrapper(*args):
        if args not in memo:
            memo[args] = func(*args)
        return memo[args]
    return wrapper
\`\`\`
`,
        links: [],
      },
    ],
    exercises: [],
  },
  {
    id: 615,
    title: 'Modules & Packages',
    icon: '📦',
    level: 'Avancé',
    colorHex: '#AA7DCE',
    description: 'import, __init__.py, pip, venv, stdlib utile.',
    lessons: [
      {
        title: 'Organisation du code',
        content: `## Modules & Packages

### import
\`\`\`python
import math
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
import json as j
\`\`\`

### Créer son propre module
\`\`\`
mon_projet/
├── utils.py          # module
├── models/
│   ├── __init__.py   # → package
│   └── user.py
└── main.py
\`\`\`

\`\`\`python
# utils.py
def formater(texte):
    return texte.strip().lower()

# main.py
from utils import formater
from models.user import User
\`\`\`

### Bibliothèque standard utile
\`\`\`python
import os
os.path.exists("fichier.txt")
os.listdir(".")
os.makedirs("dossier/sous", exist_ok=True)

from pathlib import Path
p = Path("data") / "fichier.txt"
p.read_text()
p.write_text("contenu")

import re
re.findall(r"\\d+", "abc123def456")  # ["123", "456"]
re.sub(r"\\s+", " ", "trop   d espaces")

from collections import Counter, defaultdict
Counter("abracadabra")  # {"a": 5, "b": 2, ...}
\`\`\`

### Environnement virtuel
\`\`\`bash
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.venv\\Scripts\\activate     # Windows
pip install requests pandas
pip freeze > requirements.txt
\`\`\`
`,
        links: [{ url: 'https://docs.python.org/fr/3/library/', label: 'Bibliothèque standard Python' }],
      },
    ],
    exercises: [],
  },
  {
    id: 616,
    title: 'Numpy & Pandas',
    icon: '📊',
    level: 'Expert',
    colorHex: '#F3752B',
    description: 'Arrays Numpy, DataFrames Pandas, manipulation de données.',
    lessons: [
      {
        title: 'Numpy',
        content: `## NumPy — calcul numérique

\`\`\`python
import numpy as np

a = np.array([1, 2, 3, 4, 5])
m = np.array([[1,2],[3,4]])

np.zeros((3, 3))
np.ones((2, 4))
np.arange(0, 10, 0.5)
np.linspace(0, 1, 100)
np.random.randn(1000)

# Opérations vectorisées
a * 2            # [2,4,6,8,10]
a ** 2           # [1,4,9,16,25]
np.sqrt(a)
np.mean(a)       # 3.0
np.std(a)
np.sum(a)

# Indexation avancée
m[0, 1]          # 2
m[:, 0]          # [1, 3]  première colonne
a[a > 3]         # [4, 5]  masque booléen
\`\`\`
`,
        links: [{ url: 'https://numpy.org/doc/', label: 'Docs NumPy' }],
      },
      {
        title: 'Pandas',
        content: `## Pandas — DataFrames

\`\`\`python
import pandas as pd

# Créer
df = pd.DataFrame({
    "nom": ["Alice", "Bob", "Charlie"],
    "age": [30, 25, 35],
    "score": [88, 72, 95]
})

# Explorer
df.head()
df.info()
df.describe()
df.shape         # (3, 3)
df.columns

# Sélection
df["age"]                       # Series
df[["nom", "age"]]              # DataFrame
df[df["age"] > 28]              # filtre
df.loc[0, "nom"]                # label
df.iloc[1, 2]                   # position

# Modification
df["categorie"] = df["age"].apply(lambda x: "senior" if x > 30 else "junior")

# Agrégation
df.groupby("categorie")["score"].mean()

# Lecture fichiers
df = pd.read_csv("data.csv")
df = pd.read_json("data.json")
df.to_csv("out.csv", index=False)
\`\`\`
`,
        links: [{ url: 'https://pandas.pydata.org/docs/', label: 'Docs Pandas' }],
      },
    ],
    exercises: [],
  },
  {
    id: 617,
    title: 'APIs & Requests',
    icon: '🌐',
    level: 'Expert',
    colorHex: '#F3752B',
    description: 'HTTP avec requests, consommer des APIs REST, auth.',
    lessons: [
      {
        title: 'Requêtes HTTP',
        content: `## APIs avec requests

\`\`\`bash
pip install requests
\`\`\`

### GET
\`\`\`python
import requests

resp = requests.get("https://api.github.com/users/octocat")
resp.status_code   # 200
resp.json()        # dict Python
resp.headers

# Avec paramètres
resp = requests.get(
    "https://api.example.com/search",
    params={"q": "python", "page": 1}
)
\`\`\`

### POST / PUT / DELETE
\`\`\`python
data = {"nom": "Alice", "age": 30}
resp = requests.post(
    "https://api.example.com/users",
    json=data,
    headers={"Authorization": "Bearer TOKEN"}
)
resp.raise_for_status()   # lève exception si 4xx/5xx
\`\`\`

### Gestion d'erreurs
\`\`\`python
from requests.exceptions import HTTPError, ConnectionError, Timeout

try:
    resp = requests.get("https://api.example.com", timeout=5)
    resp.raise_for_status()
    return resp.json()
except Timeout:
    print("Délai dépassé")
except ConnectionError:
    print("Pas de connexion")
except HTTPError as e:
    print(f"HTTP {e.response.status_code}")
\`\`\`

### Session (connexion persistante)
\`\`\`python
with requests.Session() as s:
    s.headers.update({"Authorization": "Bearer TOKEN"})
    r1 = s.get("/endpoint1")
    r2 = s.get("/endpoint2")
\`\`\`
`,
        links: [{ url: 'https://docs.python-requests.org/', label: 'Docs requests' }],
      },
    ],
    exercises: [],
  },
  {
    id: 618,
    title: 'FastAPI — Créer une API',
    icon: '🚀',
    level: 'Expert',
    colorHex: '#F3752B',
    description: 'Créer une API REST avec FastAPI, Pydantic, routes, async.',
    lessons: [
      {
        title: 'FastAPI basics',
        content: `## FastAPI

\`\`\`bash
pip install fastapi uvicorn
\`\`\`

### Hello World
\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello FastAPI !"}

@app.get("/items/{item_id}")
def get_item(item_id: int, q: str = None):
    return {"id": item_id, "query": q}
\`\`\`

\`\`\`bash
uvicorn main:app --reload
# → http://localhost:8000/docs  (Swagger auto !)
\`\`\`

### Pydantic — validation
\`\`\`python
from pydantic import BaseModel, Field

class User(BaseModel):
    nom: str = Field(min_length=2)
    age: int = Field(ge=0, le=150)
    email: str

@app.post("/users", status_code=201)
def creer_user(user: User):
    return {"id": 42, **user.dict()}
\`\`\`

### Base de données simple
\`\`\`python
from fastapi import HTTPException

db: dict[int, User] = {}
counter = 0

@app.get("/users/{uid}")
def get_user(uid: int):
    if uid not in db:
        raise HTTPException(status_code=404, detail="User not found")
    return db[uid]

@app.delete("/users/{uid}", status_code=204)
def delete_user(uid: int):
    db.pop(uid, None)
\`\`\`
`,
        links: [{ url: 'https://fastapi.tiangolo.com/', label: 'Docs FastAPI' }],
      },
    ],
    exercises: [],
  },
];

export default PYTHON_MODULES;
