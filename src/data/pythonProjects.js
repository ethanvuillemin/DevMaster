/**
 * Exercices piscine Python — 4-5 exercices par module
 * Structure : { sector (difficulté), title, context, objective, starter }
 */

const PYTHON_PROJECTS = {
  601: [
    {
      title: "Calculatrice simple",
      sector: "⭐ Niveau 1",
      context: "Tu dois créer une calculatrice en ligne de commande qui demande deux nombres et une opération.",
      objective: "Demander à l'utilisateur deux nombres et un opérateur (+, -, *, /), puis afficher le résultat. Gérer la division par zéro.",
      starter: `# Calculatrice simple
a = float(input("Premier nombre : "))
b = float(input("Deuxième nombre : "))
op = input("Opérateur (+, -, *, /) : ")

# TODO: calculer le résultat selon l'opérateur
# TODO: gérer la division par zéro
result = None
print(f"Résultat : {result}")`,
    },
    {
      title: "Convertisseur de températures",
      sector: "⭐ Niveau 1",
      context: "Les températures peuvent être en Celsius, Fahrenheit ou Kelvin.",
      objective: "Écrire un programme qui demande une température en Celsius et affiche l'équivalent en Fahrenheit (×9/5+32) et Kelvin (+273.15).",
      starter: `celsius = float(input("Température en Celsius : "))

# TODO: calculer Fahrenheit et Kelvin
fahrenheit = None
kelvin = None

print(f"{celsius}°C = {fahrenheit:.1f}°F = {kelvin:.2f}K")`,
    },
    {
      title: "Pair ou impair",
      sector: "⭐ Niveau 1",
      context: "Exercice classique sur les types et l'opérateur modulo.",
      objective: "Demander 5 nombres à l'utilisateur et compter combien sont pairs et combien sont impairs. Afficher le résumé.",
      starter: `pairs = 0
impairs = 0

for i in range(5):
    n = int(input(f"Nombre {i+1} : "))
    # TODO: tester si pair ou impair et incrémenter le compteur

print(f"Pairs : {pairs}, Impairs : {impairs}")`,
    },
    {
      title: "IMC (Indice de Masse Corporelle)",
      sector: "⭐⭐ Niveau 2",
      context: "L'IMC = poids(kg) / taille(m)². Catégories : < 18.5 maigre, 18.5-25 normal, 25-30 surpoids, > 30 obèse.",
      objective: "Calculer l'IMC d'une personne et afficher sa catégorie. Utiliser des f-strings avec 2 décimales.",
      starter: `poids = float(input("Poids (kg) : "))
taille = float(input("Taille (m) : "))

# TODO: calculer l'IMC
imc = None

# TODO: déterminer la catégorie
categorie = None

print(f"IMC : {imc:.2f} — Catégorie : {categorie}")`,
    },
    {
      title: "Table de multiplication",
      sector: "⭐⭐ Niveau 2",
      context: "Les tables de multiplication sont utiles pour maîtriser les boucles et le formatage.",
      objective: "Demander un nombre n et afficher sa table de multiplication de 1 à 10. Formater proprement l'affichage avec f-strings.",
      starter: `n = int(input("Quelle table de multiplication ? "))

print(f"\\n--- Table de {n} ---")
for i in range(1, 11):
    # TODO: afficher "n x i = résultat" bien formaté
    pass`,
    },
  ],

  602: [
    {
      title: "Inverser une chaîne",
      sector: "⭐ Niveau 1",
      context: "Le slicing Python permet d'inverser facilement une chaîne.",
      objective: "Écrire une fonction `inverser(s)` qui retourne la chaîne inversée. Tester avec plusieurs exemples.",
      starter: `def inverser(s):
    # TODO: retourner s à l'envers avec le slicing [::-1]
    pass

# Tests
print(inverser("python"))    # "nohtyp"
print(inverser("bonjour"))   # "ruojnob"
print(inverser("racecar"))   # "racecar" (palindrome !)`,
    },
    {
      title: "Compter les voyelles",
      sector: "⭐ Niveau 1",
      context: "Itérer sur les caractères d'une chaîne est une opération de base.",
      objective: "Écrire `compter_voyelles(texte)` qui retourne le nombre de voyelles (a, e, i, o, u, y — minuscules et majuscules).",
      starter: `def compter_voyelles(texte):
    voyelles = "aeiouyAEIOUY"
    # TODO: compter les voyelles dans texte
    pass

print(compter_voyelles("Python"))        # 2
print(compter_voyelles("Hello World"))   # 3
print(compter_voyelles("AEIOU"))         # 5`,
    },
    {
      title: "Palindrome",
      sector: "⭐⭐ Niveau 2",
      context: "Un palindrome se lit pareil dans les deux sens ('kayak', 'racecar').",
      objective: "Écrire `est_palindrome(s)` qui ignore les espaces, la casse et la ponctuation. Retourne True/False.",
      starter: `import re

def est_palindrome(s):
    # TODO: nettoyer la chaîne (lower, supprimer non-alphanumériques)
    # TODO: vérifier si la chaîne nettoyée == son inverse
    pass

print(est_palindrome("Kayak"))               # True
print(est_palindrome("A man a plan a canal Panama"))  # True
print(est_palindrome("Python"))              # False`,
    },
    {
      title: "Formater un tableau",
      sector: "⭐⭐ Niveau 2",
      context: "Le formatage de strings est essentiel pour afficher des données lisibles.",
      objective: "Afficher un tableau de produits {nom, prix, quantité} sous forme de tableau aligné en utilisant le formatage f-string avec largeur fixe.",
      starter: `produits = [
    {"nom": "Pomme", "prix": 1.50, "qte": 100},
    {"nom": "Banane", "prix": 0.99, "qte": 250},
    {"nom": "Framboise", "prix": 4.99, "qte": 50},
]

# TODO: afficher un tableau formaté :
# Nom          Prix    Qté
# ----------   ------  ----
# Pomme        1.50    100
# ...

print(f"{'Nom':<12} {'Prix':>6} {'Qté':>5}")
print("-" * 25)
for p in produits:
    # TODO: formater chaque ligne
    pass`,
    },
    {
      title: "Générateur de mot de passe",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Générer des mots de passe sécurisés est une compétence pratique.",
      objective: "Créer `generer_mdp(longueur=12, majuscules=True, chiffres=True, speciaux=True)` qui génère un mot de passe aléatoire.",
      starter: `import random
import string

def generer_mdp(longueur=12, majuscules=True, chiffres=True, speciaux=True):
    chars = string.ascii_lowercase
    # TODO: ajouter majuscules si True
    # TODO: ajouter chiffres si True
    # TODO: ajouter caractères spéciaux si True
    # TODO: générer le mot de passe avec random.choices
    pass

print(generer_mdp())                     # ex: "aB3!kR2#mNpQ"
print(generer_mdp(8, speciaux=False))    # 8 chars sans spéciaux`,
    },
  ],

  603: [
    {
      title: "Minimum et Maximum",
      sector: "⭐ Niveau 1",
      context: "Parcourir une liste pour trouver des valeurs extrêmes.",
      objective: "Sans utiliser min()/max(), écrire `trouver_min_max(lst)` qui retourne un tuple (minimum, maximum).",
      starter: `def trouver_min_max(lst):
    if not lst:
        return None, None
    mini = lst[0]
    maxi = lst[0]
    # TODO: parcourir la liste pour trouver min et max
    return mini, maxi

print(trouver_min_max([3, 1, 8, 2, 5]))     # (1, 8)
print(trouver_min_max([42]))                 # (42, 42)
print(trouver_min_max([]))                   # (None, None)`,
    },
    {
      title: "Aplatir une liste imbriquée",
      sector: "⭐⭐ Niveau 2",
      context: "Les listes peuvent contenir d'autres listes. Il faut les aplatir.",
      objective: "Écrire `aplatir(lst)` qui transforme une liste imbriquée (un seul niveau) en liste plate.",
      starter: `def aplatir(lst):
    resultat = []
    for element in lst:
        # TODO: si element est une liste, étendre résultat
        # sinon, ajouter l'élément
        pass
    return resultat

print(aplatir([[1,2],[3,4],[5]]))         # [1,2,3,4,5]
print(aplatir([["a","b"],["c"]]))        # ["a","b","c"]
print(aplatir([[1],[2,3],[4,5,6]]))      # [1,2,3,4,5,6]`,
    },
    {
      title: "Supprimer les doublons",
      sector: "⭐⭐ Niveau 2",
      context: "Conserver l'ordre en supprimant les doublons.",
      objective: "Écrire `unique(lst)` qui retourne une nouvelle liste sans doublons, en conservant l'ordre d'apparition.",
      starter: `def unique(lst):
    vu = []
    # TODO: parcourir lst et n'ajouter que les éléments non encore vus
    return vu

print(unique([1,2,2,3,1,4]))             # [1,2,3,4]
print(unique(["a","b","a","c","b"]))     # ["a","b","c"]
print(unique([]))                         # []`,
    },
    {
      title: "Rotation de liste",
      sector: "⭐⭐ Niveau 2",
      context: "Décaler les éléments d'une liste vers la gauche ou la droite.",
      objective: "Écrire `rotation(lst, n)` qui décale la liste de n positions vers la gauche (n positif) ou droite (n négatif).",
      starter: `def rotation(lst, n):
    if not lst:
        return lst
    # TODO: utiliser le slicing pour effectuer la rotation
    # rotation gauche de n: lst[n:] + lst[:n]
    pass

print(rotation([1,2,3,4,5], 2))    # [3,4,5,1,2]
print(rotation([1,2,3,4,5], -1))   # [5,1,2,3,4]
print(rotation([1,2,3], 0))        # [1,2,3]`,
    },
    {
      title: "Fusion de listes triées",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Algorithme classique de merge sort — fusionner deux listes triées.",
      objective: "Écrire `fusionner(a, b)` qui fusionne deux listes triées en une seule liste triée, sans utiliser sorted().",
      starter: `def fusionner(a, b):
    resultat = []
    i = j = 0
    # TODO: comparer a[i] et b[j], ajouter le plus petit
    # TODO: ajouter les éléments restants
    return resultat

print(fusionner([1,3,5], [2,4,6]))       # [1,2,3,4,5,6]
print(fusionner([1,2], [3,4,5,6]))       # [1,2,3,4,5,6]
print(fusionner([], [1,2,3]))            # [1,2,3]`,
    },
  ],

  604: [
    {
      title: "Fréquence des mots",
      sector: "⭐ Niveau 1",
      context: "Les dictionnaires sont parfaits pour compter des occurrences.",
      objective: "Écrire `frequence(texte)` qui retourne un dict {mot: count} trié par fréquence décroissante.",
      starter: `def frequence(texte):
    mots = texte.lower().split()
    freq = {}
    # TODO: compter chaque mot dans freq
    # TODO: retourner un dict trié par valeur décroissante
    return freq

texte = "le chat mange le poisson le chat dort"
print(frequence(texte))
# {"le": 3, "chat": 2, "mange": 1, "poisson": 1, "dort": 1}`,
    },
    {
      title: "Grouper par catégorie",
      sector: "⭐⭐ Niveau 2",
      context: "Regrouper des données par clé est un pattern très fréquent.",
      objective: "Écrire `grouper_par(liste, cle)` qui groupe une liste de dicts par la valeur d'une clé.",
      starter: `def grouper_par(liste, cle):
    groupes = {}
    for item in liste:
        # TODO: utiliser item[cle] comme clé du dict groupes
        # TODO: initialiser la liste si absent, puis ajouter l'item
        pass
    return groupes

personnes = [
    {"nom": "Alice", "ville": "Paris"},
    {"nom": "Bob", "ville": "Lyon"},
    {"nom": "Charlie", "ville": "Paris"},
]
print(grouper_par(personnes, "ville"))
# {"Paris": [{Alice...}, {Charlie...}], "Lyon": [{Bob...}]}`,
    },
    {
      title: "Intersection de sets",
      sector: "⭐ Niveau 1",
      context: "Les opérations sur les ensembles sont très efficaces.",
      objective: "Écrire `amis_communs(a, b)` qui retourne les amis en commun de deux listes. Utiliser les sets. Comparer avec une approche boucle.",
      starter: `def amis_communs(a, b):
    # TODO: convertir en sets et retourner l'intersection
    pass

alice = ["Bob", "Charlie", "Diana", "Eve"]
bob = ["Charlie", "Frank", "Diana", "Alice"]

communs = amis_communs(alice, bob)
print(sorted(communs))    # ["Charlie", "Diana"]`,
    },
    {
      title: "Cache LRU simplifié",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Un cache LRU (Least Recently Used) garde les N données les plus récentes.",
      objective: "Implémenter un cache LRU simple avec un dict: `get(key)` retourne la valeur ou None, `put(key, val)` ajoute et supprime le plus ancien si capacité dépassée.",
      starter: `class CacheLRU:
    def __init__(self, capacite):
        self.capacite = capacite
        self.cache = {}  # garder l'ordre d'insertion avec dict Python 3.7+

    def get(self, cle):
        # TODO: si cle présente, la "rafraîchir" (supprimer et réinsérer)
        pass

    def put(self, cle, valeur):
        # TODO: si cle existe, la supprimer d'abord
        # TODO: ajouter la nouvelle valeur
        # TODO: si capacité dépassée, supprimer la plus ancienne
        pass

cache = CacheLRU(3)
cache.put("a", 1); cache.put("b", 2); cache.put("c", 3)
print(cache.get("a"))   # 1
cache.put("d", 4)       # "b" doit être évincé (le plus ancien non-accédé)
print(cache.get("b"))   # None`,
    },
    {
      title: "Annuaire téléphonique",
      sector: "⭐⭐ Niveau 2",
      context: "Construire un mini-CRUD en mémoire avec un dictionnaire.",
      objective: "Créer un annuaire avec les opérations: ajouter(nom, tel), rechercher(nom), supprimer(nom), lister_tous(). Gérer les cas d'erreur.",
      starter: `class Annuaire:
    def __init__(self):
        self.contacts = {}

    def ajouter(self, nom, telephone):
        # TODO: ajouter ou mettre à jour le contact
        pass

    def rechercher(self, nom):
        # TODO: retourner le téléphone ou "Introuvable"
        pass

    def supprimer(self, nom):
        # TODO: supprimer si existe, sinon message d'erreur
        pass

    def lister_tous(self):
        # TODO: afficher tous les contacts triés par nom
        pass

a = Annuaire()
a.ajouter("Alice", "06 12 34 56 78")
a.ajouter("Bob", "07 98 76 54 32")
print(a.rechercher("Alice"))
a.lister_tous()`,
    },
  ],

  605: [
    {
      title: "FizzBuzz",
      sector: "⭐ Niveau 1",
      context: "Classique des entretiens techniques.",
      objective: "Afficher les nombres de 1 à 100. Remplacer les multiples de 3 par 'Fizz', de 5 par 'Buzz', de 3 et 5 par 'FizzBuzz'.",
      starter: `for i in range(1, 101):
    # TODO: vérifier divisibilité et afficher le bon texte
    # Attention: vérifier FizzBuzz en premier !
    pass`,
    },
    {
      title: "Classement des notes",
      sector: "⭐ Niveau 1",
      context: "Convertir des notes numériques en mentions.",
      objective: "Pour une liste de notes, afficher: < 10 'Insuffisant', 10-12 'Passable', 12-14 'Assez bien', 14-16 'Bien', >= 16 'Très bien'.",
      starter: `notes = [8, 12, 15, 10, 17, 9, 13, 11, 16, 14]

for note in notes:
    # TODO: assigner la mention
    mention = None
    print(f"{note}/20 → {mention}")`,
    },
    {
      title: "Jeu de devinette",
      sector: "⭐⭐ Niveau 2",
      context: "Utiliser une boucle while avec conditions de sortie.",
      objective: "Générer un nombre aléatoire entre 1 et 100. Permettre à l'utilisateur de deviner avec des indices 'Trop haut'/'Trop bas'. Compter les essais.",
      starter: `import random

nombre_secret = random.randint(1, 100)
essais = 0

print("Je pense à un nombre entre 1 et 100...")

while True:
    essais += 1
    proposition = int(input("Ta proposition : "))

    # TODO: comparer et afficher indice ou victoire
    # si correct: afficher le nb d'essais et break
    # sinon: "Trop haut !" ou "Trop bas !"`,
    },
    {
      title: "Validateur de mot de passe",
      sector: "⭐⭐ Niveau 2",
      context: "Vérifier qu'un mot de passe respecte plusieurs critères.",
      objective: "Écrire `valider_mdp(mdp)` qui vérifie: 8+ chars, au moins une majuscule, un chiffre, un caractère spécial (!@#$%^&*). Retourner (bool, liste_erreurs).",
      starter: `def valider_mdp(mdp):
    erreurs = []

    if len(mdp) < 8:
        erreurs.append("Minimum 8 caractères")

    # TODO: vérifier majuscule (any(c.isupper() for c in mdp))
    # TODO: vérifier chiffre
    # TODO: vérifier caractère spécial

    return len(erreurs) == 0, erreurs

ok, erreurs = valider_mdp("abc")
print(ok, erreurs)
ok, erreurs = valider_mdp("MonMdp123!")
print(ok, erreurs)`,
    },
    {
      title: "Calculateur de notes final",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Système de notes pondérées avec plusieurs matières.",
      objective: "Calculer la moyenne pondérée d'un étudiant. Chaque matière a un coefficient. Afficher le détail + la mention finale.",
      starter: `matieres = [
    {"nom": "Maths", "note": 14, "coef": 4},
    {"nom": "Physique", "note": 12, "coef": 3},
    {"nom": "Français", "note": 16, "coef": 3},
    {"nom": "Sport", "note": 18, "coef": 1},
]

# TODO: calculer la somme des notes*coef et la somme des coefs
total_points = 0
total_coefs = 0

for m in matieres:
    # TODO: afficher "Matière: note/20 (coef X)"
    pass

# TODO: calculer et afficher la moyenne pondérée
# TODO: afficher la mention`,
    },
  ],

  606: [
    {
      title: "Somme des chiffres",
      sector: "⭐ Niveau 1",
      context: "Itérer sur les chiffres d'un nombre.",
      objective: "Écrire `somme_chiffres(n)` qui retourne la somme des chiffres de n. Ex: somme_chiffres(1234) → 10.",
      starter: `def somme_chiffres(n):
    # TODO: convertir en str, itérer sur les caractères, convertir en int et sommer
    pass

print(somme_chiffres(1234))    # 10
print(somme_chiffres(999))     # 27
print(somme_chiffres(0))       # 0`,
    },
    {
      title: "Carré d'étoiles",
      sector: "⭐ Niveau 1",
      context: "Générer des patterns avec des boucles imbriquées.",
      objective: "Écrire `afficher_carre(n)` qui affiche un carré n×n d'étoiles, et `triangle(n)` pour un triangle rectangle.",
      starter: `def afficher_carre(n):
    for i in range(n):
        # TODO: afficher n étoiles sur la même ligne
        pass

def triangle(n):
    for i in range(1, n+1):
        # TODO: afficher i étoiles
        pass

afficher_carre(4)
print()
triangle(4)`,
    },
    {
      title: "Suite de Fibonacci",
      sector: "⭐⭐ Niveau 2",
      context: "La suite de Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13...",
      objective: "Écrire `fibonacci(n)` qui retourne une liste des n premiers termes de Fibonacci. Puis `fibonacci_infini()` générateur qui yield les termes à l'infini.",
      starter: `def fibonacci(n):
    # TODO: construire la liste des n premiers termes
    pass

def fibonacci_infini():
    a, b = 0, 1
    while True:
        # TODO: yield a, puis avancer a et b
        pass

print(fibonacci(10))   # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Utilisation du générateur infini (prendre les 10 premiers)
gen = fibonacci_infini()
print([next(gen) for _ in range(10)])`,
    },
    {
      title: "Matrice — Transposée",
      sector: "⭐⭐ Niveau 2",
      context: "Opérations matricielles avec des listes imbriquées.",
      objective: "Écrire `transposer(matrice)` qui transpose une matrice (lignes ↔ colonnes). Afficher joliment la matrice avant et après.",
      starter: `def transposer(matrice):
    # TODO: créer la matrice transposée
    # Si matrice a n lignes et m colonnes, la transposée a m lignes et n colonnes
    pass

def afficher_matrice(m):
    for ligne in m:
        print(" ".join(f"{x:3}" for x in ligne))

m = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]

print("Matrice originale:")
afficher_matrice(m)
print("\\nTransposée:")
afficher_matrice(transposer(m))`,
    },
    {
      title: "Recherche binaire",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Algorithme de recherche O(log n) sur une liste triée.",
      objective: "Implémenter `recherche_binaire(lst, cible)` qui retourne l'index de la cible ou -1. Compter et afficher le nombre d'étapes.",
      starter: `def recherche_binaire(lst, cible):
    gauche, droite = 0, len(lst) - 1
    etapes = 0

    while gauche <= droite:
        etapes += 1
        milieu = (gauche + droite) // 2

        # TODO: comparer lst[milieu] avec cible
        # si égal: retourner milieu (et afficher nb étapes)
        # si cible > milieu: chercher à droite
        # sinon: chercher à gauche

    print(f"Non trouvé en {etapes} étapes")
    return -1

lst = list(range(0, 100, 2))   # [0, 2, 4, ..., 98]
print(recherche_binaire(lst, 42))   # index 21
print(recherche_binaire(lst, 43))   # -1`,
    },
  ],

  607: [
    {
      title: "Factorielle",
      sector: "⭐ Niveau 1",
      context: "Implémenter une fonction mathématique classique.",
      objective: "Écrire `factorielle(n)` en version itérative ET récursive. Vérifier qu'elles donnent le même résultat.",
      starter: `def factorielle_iterative(n):
    # TODO: utiliser une boucle for et accumuler le produit
    pass

def factorielle_recursive(n):
    # TODO: cas de base n <= 1, sinon n * factorielle(n-1)
    pass

for i in range(8):
    it = factorielle_iterative(i)
    rec = factorielle_recursive(i)
    print(f"{i}! = {it} (iter) = {rec} (rec) → {'✓' if it == rec else '✗'}") `,
    },
    {
      title: "Décorateur de validation",
      sector: "⭐⭐ Niveau 2",
      context: "Les fonctions sont des objets de première classe en Python.",
      objective: "Écrire une fonction `appliquer(func, *args)` qui appelle func avec les arguments. Puis créer `composer(f, g)` qui retourne une fonction h telle que h(x) = f(g(x)).",
      starter: `def appliquer(func, *args):
    # TODO: appeler func avec les arguments et retourner le résultat
    pass

def composer(f, g):
    # TODO: retourner une fonction qui fait f(g(x))
    pass

double = lambda x: x * 2
ajouter_un = lambda x: x + 1

double_puis_ajouter = composer(ajouter_un, double)
print(double_puis_ajouter(5))    # 11 = ajouter_un(double(5))

print(appliquer(sum, [1, 2, 3, 4, 5]))  # 15`,
    },
    {
      title: "Statistiques",
      sector: "⭐⭐ Niveau 2",
      context: "Implémenter des fonctions statistiques sans bibliothèque externe.",
      objective: "Écrire: moyenne(lst), mediane(lst), mode(lst), ecart_type(lst). Tester sur une liste de notes.",
      starter: `def moyenne(lst):
    # TODO: somme / longueur
    pass

def mediane(lst):
    # TODO: trier, prendre le milieu (ou moyenne des deux centraux si pair)
    pass

def mode(lst):
    # TODO: retourner l'élément le plus fréquent
    pass

def ecart_type(lst):
    # TODO: sqrt(moyenne des (xi - moyenne)^2)
    import math
    pass

notes = [12, 15, 8, 17, 12, 14, 9, 15, 12, 16]
print(f"Moyenne : {moyenne(notes):.2f}")
print(f"Médiane : {mediane(notes)}")
print(f"Mode    : {mode(notes)}")
print(f"Écart-type : {ecart_type(notes):.2f}")`,
    },
    {
      title: "Memoïsation manuelle",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Optimiser des fonctions récursives avec un cache.",
      objective: "Implémenter `memoize(func)` qui met en cache les résultats. Comparer fib(35) avec et sans cache — mesurer le temps.",
      starter: `import time

def memoize(func):
    cache = {}
    def wrapper(*args):
        # TODO: si args dans cache, retourner le résultat
        # TODO: sinon calculer, stocker et retourner
        pass
    return wrapper

def fib_lent(n):
    if n < 2: return n
    return fib_lent(n-1) + fib_lent(n-2)

@memoize
def fib_rapide(n):
    if n < 2: return n
    return fib_rapide(n-1) + fib_rapide(n-2)

# Comparer les temps
t0 = time.time()
print(fib_rapide(35), f"→ {time.time()-t0:.4f}s")

t0 = time.time()
print(fib_lent(35), f"→ {time.time()-t0:.4f}s")`,
    },
    {
      title: "Pipeline de fonctions",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Enchaîner des transformations de données est un pattern fonctionnel puissant.",
      objective: "Écrire `pipeline(*fonctions)` qui retourne une fonction qui applique toutes les fonctions dans l'ordre. Tester sur du texte.",
      starter: `from functools import reduce

def pipeline(*fonctions):
    # TODO: retourner une fonction qui applique toutes les fonctions en séquence
    # Utiliser functools.reduce ou une boucle
    pass

# Fonctions de transformation
nettoyer = lambda s: s.strip()
minuscule = lambda s: s.lower()
supprimer_ponctuation = lambda s: ''.join(c for c in s if c.isalnum() or c.isspace())
split_mots = lambda s: s.split()

traiter = pipeline(nettoyer, minuscule, supprimer_ponctuation, split_mots)

texte = "  Bonjour, Monde! Comment ça va?  "
print(traiter(texte))   # ["bonjour", "monde", "comment", "ça", "va"]`,
    },
  ],

  608: [
    {
      title: "Classe BankAccount",
      sector: "⭐ Niveau 1",
      context: "Modéliser un compte bancaire simple.",
      objective: "Créer une classe `CompteBancaire` avec: solde, titulaire, deposer(montant), retirer(montant), __str__. Gérer les montants négatifs.",
      starter: `class CompteBancaire:
    def __init__(self, titulaire, solde_initial=0):
        # TODO: initialiser les attributs
        pass

    def deposer(self, montant):
        # TODO: vérifier montant > 0, ajouter au solde
        pass

    def retirer(self, montant):
        # TODO: vérifier montant > 0 et solde suffisant
        pass

    def __str__(self):
        return f"Compte de {self.titulaire} : {self.solde:.2f}€"

compte = CompteBancaire("Alice", 1000)
compte.deposer(500)
compte.retirer(200)
print(compte)   # Compte de Alice : 1300.00€
compte.retirer(2000)   # Doit afficher une erreur`,
    },
    {
      title: "Classe Vecteur 2D",
      sector: "⭐⭐ Niveau 2",
      context: "Implémenter une classe mathématique avec des méthodes spéciales.",
      objective: "Créer `Vecteur2D(x, y)` avec: __add__, __sub__, __mul__ (scalaire), __abs__ (norme), __repr__. Tester les opérations.",
      starter: `import math

class Vecteur2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        # TODO: retourner Vecteur2D(self.x + other.x, ...)
        pass

    def __sub__(self, other):
        pass

    def __mul__(self, scalaire):
        # TODO: multiplication par un scalaire (float)
        pass

    def __abs__(self):
        # TODO: retourner la norme √(x²+y²)
        pass

    def __repr__(self):
        return f"Vecteur2D({self.x}, {self.y})"

v1 = Vecteur2D(3, 4)
v2 = Vecteur2D(1, 2)
print(v1 + v2)     # Vecteur2D(4, 6)
print(v1 - v2)     # Vecteur2D(2, 2)
print(v1 * 2)      # Vecteur2D(6, 8)
print(abs(v1))     # 5.0 (3-4-5 triangle)`,
    },
    {
      title: "Classe Pile (Stack)",
      sector: "⭐⭐ Niveau 2",
      context: "Implémenter une structure de données classique.",
      objective: "Créer `Pile` avec: push(item), pop(), peek(), is_empty(), __len__, __repr__. Tester avec l'algorithme de vérification de parenthèses.",
      starter: `class Pile:
    def __init__(self):
        self._data = []

    def push(self, item):
        pass

    def pop(self):
        # TODO: lever IndexError si vide
        pass

    def peek(self):
        # TODO: voir le sommet sans dépiler
        pass

    def is_empty(self):
        pass

    def __len__(self):
        pass

def parentheses_valides(expr):
    """Vérifie que les (), [] et {} sont bien équilibrés."""
    pile = Pile()
    pairs = {")": "(", "]": "[", "}": "{"}
    for c in expr:
        if c in "([{":
            pile.push(c)
        elif c in ")]}":
            if pile.is_empty() or pile.pop() != pairs[c]:
                return False
    return pile.is_empty()

print(parentheses_valides("((a+b) * [c-d])"))  # True
print(parentheses_valides("((a+b)"))            # False`,
    },
    {
      title: "Classe Fraction",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Représenter les fractions avec simplification automatique.",
      objective: "Créer `Fraction(num, den)` avec: simplification via PGCD, __add__, __sub__, __mul__, __truediv__, __eq__, __str__.",
      starter: `from math import gcd

class Fraction:
    def __init__(self, numerateur, denominateur):
        if denominateur == 0:
            raise ValueError("Dénominateur ne peut pas être 0")
        # TODO: gérer le signe, puis simplifier avec gcd
        self.num = numerateur
        self.den = denominateur

    def _simplifier(self):
        # TODO: diviser num et den par leur PGCD
        pass

    def __add__(self, other):
        # a/b + c/d = (a*d + c*b) / (b*d)
        pass

    def __mul__(self, other):
        pass

    def __eq__(self, other):
        pass

    def __str__(self):
        if self.den == 1: return str(self.num)
        return f"{self.num}/{self.den}"

    def __repr__(self):
        return f"Fraction({self.num}, {self.den})"

f1 = Fraction(1, 2)
f2 = Fraction(1, 3)
print(f1 + f2)    # 5/6
print(f1 * f2)    # 1/6
print(Fraction(4, 8))  # 1/2 (simplifiée)`,
    },
    {
      title: "Classe Chronomètre",
      sector: "⭐⭐ Niveau 2",
      context: "Utiliser le module time pour mesurer des durées.",
      objective: "Créer `Chronometre` avec: start(), stop(), reset(), elapsed() → secondes, __enter__/__exit__ (context manager). Tester avec `with`.",
      starter: `import time

class Chronometre:
    def __init__(self):
        self._debut = None
        self._temps_total = 0
        self._actif = False

    def start(self):
        if not self._actif:
            self._debut = time.time()
            self._actif = True

    def stop(self):
        # TODO: accumuler le temps écoulé
        pass

    def reset(self):
        pass

    def elapsed(self):
        # TODO: temps total + temps depuis dernier start si actif
        pass

    def __enter__(self):
        self.start()
        return self

    def __exit__(self, *args):
        self.stop()

with Chronometre() as c:
    time.sleep(0.1)
    print(f"Temps écoulé : {c.elapsed():.3f}s")`,
    },
  ],

  609: [
    {
      title: "Hiérarchie de véhicules",
      sector: "⭐ Niveau 1",
      context: "Modéliser une hiérarchie avec héritage.",
      objective: "Créer: `Vehicule(marque, vitesse_max)` → `Voiture(marque, portes)` → `VoitureElectrique(marque, batterie_kwh)`. Chaque classe a une méthode `description()`.",
      starter: `class Vehicule:
    def __init__(self, marque, vitesse_max):
        self.marque = marque
        self.vitesse_max = vitesse_max

    def description(self):
        return f"{self.marque} — vmax {self.vitesse_max} km/h"

class Voiture(Vehicule):
    def __init__(self, marque, vitesse_max, nb_portes):
        # TODO: appeler super().__init__
        pass

    def description(self):
        # TODO: ajouter le nb de portes à la description
        pass

class VoitureElectrique(Voiture):
    def __init__(self, marque, vitesse_max, nb_portes, batterie_kwh):
        # TODO: super().__init__ + batterie
        pass

    def autonomie(self, conso_kwh_100km=15):
        # TODO: retourner batterie_kwh / conso_kwh_100km * 100
        pass

tesla = VoitureElectrique("Tesla", 250, 4, 100)
print(tesla.description())
print(f"Autonomie : {tesla.autonomie():.0f} km")`,
    },
    {
      title: "Formes géométriques",
      sector: "⭐⭐ Niveau 2",
      context: "Polymorphisme avec des formes géométriques.",
      objective: "Créer `Forme` (abc) avec méthodes abstraites `aire()` et `perimetre()`. Implémenter: Cercle, Rectangle, Triangle. Afficher les stats pour une liste de formes.",
      starter: `from abc import ABC, abstractmethod
import math

class Forme(ABC):
    @abstractmethod
    def aire(self): ...

    @abstractmethod
    def perimetre(self): ...

    def __str__(self):
        return f"{type(self).__name__}: aire={self.aire():.2f}, périmètre={self.perimetre():.2f}"

class Cercle(Forme):
    def __init__(self, rayon):
        self.rayon = rayon
    # TODO: implémenter aire et perimetre

class Rectangle(Forme):
    def __init__(self, largeur, hauteur):
        self.largeur = largeur
        self.hauteur = hauteur
    # TODO: implémenter aire et perimetre

formes = [Cercle(5), Rectangle(4, 6), Cercle(3)]
for f in formes:
    print(f)
print(f"\\nAire totale: {sum(f.aire() for f in formes):.2f}")`,
    },
    {
      title: "Iterator personnalisé",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Créer des objets itérables avec __iter__ et __next__.",
      objective: "Créer `Compte(debut, fin, pas=1)` itérable qui compte de debut à fin (exclu) par pas. Tester dans une boucle for et avec list().",
      starter: `class Compte:
    def __init__(self, debut, fin, pas=1):
        self.debut = debut
        self.fin = fin
        self.pas = pas
        self.courant = debut

    def __iter__(self):
        # TODO: réinitialiser courant et retourner self
        pass

    def __next__(self):
        # TODO: si courant >= fin, raise StopIteration
        # sinon retourner courant et avancer de pas
        pass

for n in Compte(1, 10, 2):
    print(n, end=" ")   # 1 3 5 7 9

print()
print(list(Compte(0, 1, 0.2)))   # [0, 0.2, 0.4, 0.6, 0.8]`,
    },
    {
      title: "Mixin de sérialisation",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Les mixins ajoutent des fonctionnalités sans héritage principal.",
      objective: "Créer un `JsonMixin` qui ajoute `to_json()` et `from_json()` à n'importe quelle classe. Tester avec `Personne` et `Produit`.",
      starter: `import json
from dataclasses import dataclass, asdict

class JsonMixin:
    def to_json(self):
        # TODO: sérialiser self.__dict__ en JSON indenté
        pass

    @classmethod
    def from_json(cls, json_str):
        # TODO: désérialiser et créer une instance avec **kwargs
        pass

class Personne(JsonMixin):
    def __init__(self, nom, age, email):
        self.nom = nom
        self.age = age
        self.email = email

p = Personne("Alice", 30, "alice@example.com")
json_str = p.to_json()
print(json_str)

p2 = Personne.from_json(json_str)
print(p2.nom, p2.age)  # Alice 30`,
    },
    {
      title: "Chaîne de responsabilité",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Pattern de conception pour traiter des requêtes en chaîne.",
      objective: "Créer un système de validation en chaîne: ValidateurLongueur → ValidateurMajuscule → ValidateurChiffre. Chaque validateur passe au suivant si OK.",
      starter: `class Validateur:
    def __init__(self, suivant=None):
        self.suivant = suivant

    def valider(self, mdp):
        # TODO: appeler self._verifier(mdp)
        # si OK et self.suivant: appeler self.suivant.valider(mdp)
        # retourner (bool, message)
        pass

    def _verifier(self, mdp):
        raise NotImplementedError

class ValidateurLongueur(Validateur):
    def _verifier(self, mdp):
        # TODO: retourner (bool, message) — minimum 8 chars
        pass

class ValidateurMajuscule(Validateur):
    def _verifier(self, mdp):
        pass

class ValidateurChiffre(Validateur):
    def _verifier(self, mdp):
        pass

chaine = ValidateurLongueur(ValidateurMajuscule(ValidateurChiffre()))
print(chaine.valider("abc"))          # False
print(chaine.valider("Abcdefgh"))     # False (pas de chiffre)
print(chaine.valider("Abcdefg1"))     # True`,
    },
  ],

  610: [
    {
      title: "Division sécurisée",
      sector: "⭐ Niveau 1",
      context: "Gérer les erreurs courantes de façon robuste.",
      objective: "Écrire `diviser_securise(a, b)` qui gère ZeroDivisionError et TypeError. Tester avec des types incorrects.",
      starter: `def diviser_securise(a, b):
    try:
        # TODO: effectuer la division
        pass
    except ZeroDivisionError:
        # TODO: retourner None et afficher un message
        pass
    except TypeError as e:
        # TODO: gérer les mauvais types
        pass

print(diviser_securise(10, 2))    # 5.0
print(diviser_securise(10, 0))    # None (avec message)
print(diviser_securise("a", 2))   # None (avec message)`,
    },
    {
      title: "Lecteur de fichier robuste",
      sector: "⭐⭐ Niveau 2",
      context: "Lire un fichier peut échouer de plusieurs façons.",
      objective: "Écrire `lire_json(chemin)` qui retourne le contenu parsé ou None. Gérer: fichier absent, JSON invalide, permission refusée.",
      starter: `import json

def lire_json(chemin):
    try:
        with open(chemin, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Fichier '{chemin}' introuvable")
    except json.JSONDecodeError as e:
        print(f"JSON invalide : {e.msg} à la ligne {e.lineno}")
    except PermissionError:
        print(f"Permission refusée pour '{chemin}'")
    # TODO: ajouter un except générique en dernier recours
    return None

# Tester avec différents cas
print(lire_json("inexistant.json"))    # FileNotFoundError
# Créer un fichier invalide pour tester JSONDecodeError`,
    },
    {
      title: "Exceptions personnalisées",
      sector: "⭐⭐ Niveau 2",
      context: "Créer une hiérarchie d'exceptions pour une API fictive.",
      objective: "Créer: `ApiError` → `AuthError(status=401)` et `NotFoundError(resource)`. Écrire `simuler_api(endpoint, token)` qui lève les bonnes exceptions.",
      starter: `class ApiError(Exception):
    def __init__(self, message, code=500):
        super().__init__(message)
        self.code = code

class AuthError(ApiError):
    def __init__(self):
        super().__init__("Non autorisé", code=401)

class NotFoundError(ApiError):
    def __init__(self, resource):
        super().__init__(f"'{resource}' introuvable", code=404)
        self.resource = resource

def simuler_api(endpoint, token=None):
    if token is None:
        raise AuthError()
    if endpoint == "/users/999":
        raise NotFoundError("user:999")
    return {"data": "ok", "endpoint": endpoint}

# TODO: appeler simuler_api et gérer chaque exception
for args in [("/users", None), ("/users/999", "token123"), ("/users", "token123")]:
    try:
        print(simuler_api(*args))
    except AuthError as e:
        print(f"Auth [{e.code}]: {e}")
    except NotFoundError as e:
        print(f"404: {e.resource}")`,
    },
    {
      title: "Context manager",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Créer un context manager pour la gestion de ressources.",
      objective: "Créer `GestionnaireDB` context manager qui simule une connexion DB: __enter__ ouvre (affiche 'Connexion'), __exit__ ferme (affiche 'Déconnexion') même en cas d'erreur.",
      starter: `class GestionnaireDB:
    def __init__(self, nom_db):
        self.nom_db = nom_db
        self.connecte = False

    def __enter__(self):
        # TODO: simuler l'ouverture de connexion
        # self.connecte = True, afficher message
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        # TODO: fermer la connexion quoi qu'il arrive
        # Retourner False pour ne pas supprimer l'exception
        pass

    def query(self, sql):
        if not self.connecte:
            raise RuntimeError("Non connecté !")
        return f"Résultat de: {sql}"

with GestionnaireDB("production") as db:
    print(db.query("SELECT * FROM users"))

# Tester avec une exception
try:
    with GestionnaireDB("test") as db:
        print(db.query("SELECT 1"))
        raise ValueError("Erreur simulée")
except ValueError:
    print("Exception capturée après fermeture DB")`,
    },
  ],

  611: [
    {
      title: "Journal de log",
      sector: "⭐ Niveau 1",
      context: "Écrire et lire des logs dans un fichier texte.",
      objective: "Écrire `Logger` qui append des entrées horodatées dans un fichier. Méthodes: info(msg), erreur(msg), lire_logs().",
      starter: `from datetime import datetime

class Logger:
    def __init__(self, fichier="app.log"):
        self.fichier = fichier

    def _ecrire(self, niveau, message):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ligne = f"[{timestamp}] [{niveau}] {message}\\n"
        # TODO: ouvrir le fichier en mode 'a' et écrire la ligne
        pass

    def info(self, message):
        self._ecrire("INFO", message)

    def erreur(self, message):
        self._ecrire("ERREUR", message)

    def lire_logs(self):
        # TODO: lire et retourner toutes les lignes du fichier
        pass

log = Logger("test.log")
log.info("Application démarrée")
log.erreur("Connexion échouée")
log.info("Nouvelle tentative...")
print("\\n".join(log.lire_logs()))`,
    },
    {
      title: "Traitement CSV",
      sector: "⭐⭐ Niveau 2",
      context: "Lire et analyser des données tabulaires.",
      objective: "Créer un fichier CSV de ventes (produit, prix, quantite, date), le lire avec csv.DictReader, calculer le CA total et le produit best-seller.",
      starter: `import csv
from collections import defaultdict

# D'abord, créer le fichier de données
with open("ventes.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["produit", "prix", "quantite", "date"])
    writer.writeheader()
    writer.writerows([
        {"produit": "Laptop", "prix": "999", "quantite": "5", "date": "2025-01"},
        {"produit": "Souris", "prix": "29", "quantite": "50", "date": "2025-01"},
        {"produit": "Laptop", "prix": "999", "quantite": "3", "date": "2025-02"},
        {"produit": "Clavier", "prix": "79", "quantite": "20", "date": "2025-02"},
    ])

# TODO: lire le fichier et calculer:
# - CA total (somme prix * quantite)
# - CA par produit
# - Produit best-seller (par quantité)
ca_total = 0
ca_par_produit = defaultdict(float)

with open("ventes.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        # TODO: calculer
        pass

print(f"CA total : {ca_total:.2f}€")`,
    },
    {
      title: "Gestionnaire de config JSON",
      sector: "⭐⭐ Niveau 2",
      context: "Les fichiers de configuration JSON sont omniprésents.",
      objective: "Créer `Config` qui charge/sauvegarde un JSON. Méthodes: get(cle, defaut), set(cle, valeur), delete(cle). Gérer le fichier absent (créer par défaut).",
      starter: `import json
from pathlib import Path

class Config:
    def __init__(self, fichier="config.json"):
        self.fichier = Path(fichier)
        self._data = self._charger()

    def _charger(self):
        # TODO: lire le fichier s'il existe, sinon retourner {}
        pass

    def _sauvegarder(self):
        # TODO: écrire self._data dans le fichier avec json.dump
        pass

    def get(self, cle, defaut=None):
        return self._data.get(cle, defaut)

    def set(self, cle, valeur):
        self._data[cle] = valeur
        self._sauvegarder()

    def delete(self, cle):
        self._data.pop(cle, None)
        self._sauvegarder()

cfg = Config("settings.json")
cfg.set("theme", "dark")
cfg.set("langue", "fr")
print(cfg.get("theme"))       # dark
print(cfg.get("port", 8080))  # 8080 (defaut)`,
    },
    {
      title: "Analyseur de logs Apache",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Parser des logs réels est une compétence DevOps/Data.",
      objective: "Parser des lignes de log au format Apache Combined (`IP - - [date] \"METHOD /path HTTP/1.1\" status bytes`). Extraire: top 5 IPs, nb d'erreurs 4xx/5xx, endpoints les plus visités.",
      starter: `import re
from collections import Counter

LOG_SAMPLE = """
127.0.0.1 - - [01/Jan/2025:10:00:01 +0000] "GET /home HTTP/1.1" 200 1234
192.168.1.1 - - [01/Jan/2025:10:00:02 +0000] "POST /api/users HTTP/1.1" 201 89
127.0.0.1 - - [01/Jan/2025:10:00:03 +0000] "GET /home HTTP/1.1" 200 1234
10.0.0.1 - - [01/Jan/2025:10:00:04 +0000] "GET /admin HTTP/1.1" 403 45
127.0.0.1 - - [01/Jan/2025:10:00:05 +0000] "GET /api/items HTTP/1.1" 500 123
""".strip()

PATTERN = re.compile(
    r'(\\S+) .* "\\w+ (\\S+) .*" (\\d+) (\\d+)'
)

ips = []
statuts = []
endpoints = []

for ligne in LOG_SAMPLE.split("\\n"):
    match = PATTERN.match(ligne)
    if match:
        ip, endpoint, statut, _ = match.groups()
        # TODO: ajouter aux listes
        pass

# TODO: afficher top 5 IPs, top 5 endpoints, nb d'erreurs 4xx et 5xx
print("Top IPs:", Counter(ips).most_common(5))`,
    },
  ],

  612: [
    {
      title: "Nombres premiers",
      sector: "⭐ Niveau 1",
      context: "Filtrer des nombres avec une comprehension.",
      objective: "Générer la liste des 50 premiers nombres premiers avec une list comprehension et une fonction `est_premier(n)`.",
      starter: `def est_premier(n):
    if n < 2: return False
    # TODO: tester la divisibilité jusqu'à sqrt(n)
    pass

# Générer les 50 premiers nombres premiers avec une list comprehension
premiers = [n for n in range(2, ???) if est_premier(n)][:50]
print(premiers)
print(f"50ème premier : {premiers[-1]}")`,
    },
    {
      title: "Transposer une matrice",
      sector: "⭐⭐ Niveau 2",
      context: "Les comprehensions imbriquées permettent des transformations matricielles.",
      objective: "Transposer une matrice avec une list comprehension en une seule ligne. Comparer avec la version boucle.",
      starter: `matrice = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]

# Version boucle
def transposer_boucle(m):
    resultat = []
    for j in range(len(m[0])):
        ligne = []
        for i in range(len(m)):
            ligne.append(m[i][j])
        resultat.append(ligne)
    return resultat

# TODO: version comprehension en UNE LIGNE
transposer_comp = lambda m: [...]

t = transposer_comp(matrice)
for ligne in t:
    print(ligne)
# [1, 5, 9]
# [2, 6, 10]
# ...`,
    },
    {
      title: "Dictionnaire inversé",
      sector: "⭐ Niveau 1",
      context: "Dict comprehension pour inverser clés et valeurs.",
      objective: "Écrire `inverser_dict(d)` avec une dict comprehension. Gérer les valeurs dupliquées (garder la dernière). Écrire aussi `grouper_par_valeur(d)` qui groupe les clés par valeur.",
      starter: `def inverser_dict(d):
    # TODO: {v: k for k, v in ...}
    pass

def grouper_par_valeur(d):
    # TODO: {v: [k for k, val in d.items() if val == v] for v in set(d.values())}
    pass

d = {"a": 1, "b": 2, "c": 1, "d": 3}
print(inverser_dict(d))         # {1: "c", 2: "b", 3: "d"}
print(grouper_par_valeur(d))    # {1: ["a","c"], 2: ["b"], 3: ["d"]}`,
    },
    {
      title: "Générateur de grille",
      sector: "⭐⭐ Niveau 2",
      context: "Générer des structures 2D avec des comprehensions.",
      objective: "Générer une grille de multiplication n×n avec une list comprehension imbriquée. Afficher proprement.",
      starter: `def grille_multiplication(n):
    # TODO: [[i*j for j in range(1, n+1)] for i in range(1, n+1)]
    pass

grille = grille_multiplication(5)

# Afficher sous forme de tableau
print("   " + "  ".join(f"{j:2}" for j in range(1, 6)))
for i, ligne in enumerate(grille, 1):
    print(f"{i:2} " + "  ".join(f"{x:2}" for x in ligne))`,
    },
    {
      title: "Pipeline de traitement de texte",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Chaîner des comprehensions pour analyser du texte.",
      objective: "À partir d'un texte, extraire les 10 mots les plus fréquents (> 3 chars, sans stopwords) avec des comprehensions et Counter.",
      starter: `from collections import Counter

texte = """
Python est un langage de programmation interprété, multi-paradigme et
multiplateformes. Il favorise la programmation impérative structurée,
fonctionnelle et orientée objet. Il est doté d'un typage dynamique fort,
d'une gestion automatique de la mémoire par ramasse-miettes et d'un
système de gestion d'exceptions.
"""

STOPWORDS = {"est", "un", "une", "de", "le", "la", "les", "et", "il", "par", "en", "du", "des", "d", "l"}

# TODO avec des comprehensions:
# 1. nettoyer le texte (lower, supprimer ponctuation)
# 2. extraire les mots > 3 chars non-stopwords
# 3. compter avec Counter
# 4. afficher le top 10

import re
mots = [...]   # TODO: comprehension

freq = Counter(mots)
print("Top 10 mots:")
for mot, count in freq.most_common(10):
    print(f"  {mot}: {count}")`,
    },
  ],

  613: [
    {
      title: "Tri avec key",
      sector: "⭐ Niveau 1",
      context: "La fonction sorted() avec key= permet des tris complexes.",
      objective: "Trier une liste de personnes par: 1) âge croissant, 2) nom alphabétique, 3) âge puis nom. Utiliser des lambdas comme key.",
      starter: `personnes = [
    {"nom": "Charlie", "age": 30},
    {"nom": "Alice", "age": 25},
    {"nom": "Bob", "age": 30},
    {"nom": "Diana", "age": 25},
]

# TODO: trier par âge
par_age = sorted(personnes, key=lambda p: ...)

# TODO: trier par nom
par_nom = sorted(personnes, key=lambda p: ...)

# TODO: trier par âge puis par nom (tuple)
par_age_nom = sorted(personnes, key=lambda p: (..., ...))

for p in par_age_nom:
    print(f"{p['nom']}, {p['age']}")`,
    },
    {
      title: "Map + Filter chaînés",
      sector: "⭐⭐ Niveau 2",
      context: "Enchaîner des transformations fonctionnelles.",
      objective: "À partir d'une liste de chaînes représentant des prix ('€12.50', '€7.99'...), extraire les prix > 10€, les convertir en float et les multiplier par une TVA de 20%.",
      starter: `prix_strings = ["€12.50", "€7.99", "€24.00", "€5.49", "€18.75", "€3.00"]

# Étape 1: extraire les valeurs float (supprimer le €)
valeurs = list(map(lambda s: ..., prix_strings))

# Étape 2: filtrer > 10
superieurs = list(filter(lambda x: ..., valeurs))

# Étape 3: appliquer TVA 20%
avec_tva = list(map(lambda x: ..., superieurs))

print("Valeurs extraites:", valeurs)
print("Supérieurs à 10€:", superieurs)
print("Avec TVA 20%:", [f"{x:.2f}€" for x in avec_tva])`,
    },
    {
      title: "Reduce pour statistiques",
      sector: "⭐⭐ Niveau 2",
      context: "functools.reduce agrège une séquence en une valeur.",
      objective: "Utiliser reduce pour calculer: max, min, somme cumulée, et produit d'une liste. Ne pas utiliser les fonctions intégrées.",
      starter: `from functools import reduce

nombres = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# TODO: utiliser reduce pour chacun
maximum = reduce(lambda a, b: ..., nombres)
minimum = reduce(lambda a, b: ..., nombres)
somme = reduce(lambda a, b: ..., nombres)
produit = reduce(lambda a, b: ..., nombres)

# Somme cumulée — retourne une liste
cumul = reduce(lambda acc, x: acc + [acc[-1] + x], nombres[1:], [nombres[0]])

print(f"Max: {maximum}")       # 9
print(f"Min: {minimum}")       # 1
print(f"Somme: {somme}")       # 39
print(f"Produit: {produit}")
print(f"Cumul: {cumul}")`,
    },
    {
      title: "Partial & Currying",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Créer des fonctions spécialisées depuis des fonctions génériques.",
      objective: "Utiliser functools.partial pour créer des fonctions spécialisées. Implémenter manuellement `curry(func)` pour une fonction à 2 arguments.",
      starter: `from functools import partial

def puissance(base, exposant):
    return base ** exposant

def formater_nombre(nombre, decimales=2, separateur=","):
    return f"{nombre:.{decimales}f}".replace(".", separateur)

# TODO: créer avec partial
carre = partial(puissance, exposant=2)
cube = partial(puissance, exposant=3)
formater_fr = partial(formater_nombre, decimales=2, separateur=",")
formater_us = partial(formater_nombre, decimales=2, separateur=".")

print(carre(5), cube(3))
print(formater_fr(1234.567))  # "1234,57"

# TODO: implémenter curry(func) pour f(a, b) → f(a)(b)
def curry(func):
    def premier(a):
        def deuxieme(b):
            return func(a, b)
        return deuxieme
    return premier

ajouter = curry(lambda a, b: a + b)
ajouter_5 = ajouter(5)
print(ajouter_5(3))   # 8
print(ajouter_5(10))  # 15`,
    },
    {
      title: "Générateur infini",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Les générateurs permettent de créer des séquences infinies économes en mémoire.",
      objective: "Créer: `compter(debut=0, pas=1)` générateur infini, `prendre(n, gen)` qui prend n éléments, `filtrer_gen(pred, gen)`, `mapper_gen(fn, gen)`. Composer pour obtenir les 10 premiers carrés pairs.",
      starter: `def compter(debut=0, pas=1):
    n = debut
    while True:
        yield n
        n += pas

def prendre(n, gen):
    # TODO: yield les n premiers éléments
    pass

def filtrer_gen(pred, gen):
    # TODO: yield les éléments pour lesquels pred est True
    pass

def mapper_gen(fn, gen):
    # TODO: yield fn(x) pour chaque x
    pass

# 10 premiers carrés pairs
entiers = compter(1)
carres = mapper_gen(lambda x: x**2, entiers)
carres_pairs = filtrer_gen(lambda x: x % 2 == 0, carres)
print(list(prendre(10, carres_pairs)))
# [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]`,
    },
  ],

  614: [
    {
      title: "Décorateur timer",
      sector: "⭐ Niveau 1",
      context: "Mesurer le temps d'exécution est utile pour le profiling.",
      objective: "Créer `@timer` qui affiche le temps d'exécution de la fonction. Tester sur des fonctions de tri.",
      starter: `import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # TODO: mesurer le temps et afficher après l'appel
        pass
    return wrapper

@timer
def tri_bulles(lst):
    lst = lst.copy()
    n = len(lst)
    for i in range(n):
        for j in range(n-i-1):
            if lst[j] > lst[j+1]:
                lst[j], lst[j+1] = lst[j+1], lst[j]
    return lst

import random
donnees = random.sample(range(10000), 1000)
tri_bulles(donnees)`,
    },
    {
      title: "Décorateur retry",
      sector: "⭐⭐ Niveau 2",
      context: "Réessayer automatiquement en cas d'erreur est un pattern courant.",
      objective: "Créer `@retry(n, exceptions, delai=0)` qui réessaie n fois si les exceptions spécifiées sont levées. Loguer chaque tentative.",
      starter: `import time
from functools import wraps

def retry(n, exceptions=(Exception,), delai=0):
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for tentative in range(1, n+1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    print(f"Tentative {tentative}/{n} échouée: {e}")
                    if tentative < n and delai:
                        time.sleep(delai)
            # TODO: lever une exception finale si tout a échoué
            raise RuntimeError(f"Échec après {n} tentatives")
        return wrapper
    return decorateur

import random

@retry(3, exceptions=(ValueError,), delai=0.1)
def operation_instable():
    if random.random() < 0.7:
        raise ValueError("Erreur aléatoire")
    return "Succès !"

print(operation_instable())`,
    },
    {
      title: "Décorateur de validation",
      sector: "⭐⭐ Niveau 2",
      context: "Valider les arguments d'une fonction automatiquement.",
      objective: "Créer `@valider(**types)` qui vérifie que les arguments correspondent aux types donnés. Lever TypeError si invalide.",
      starter: `from functools import wraps

def valider(**types):
    def decorateur(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            import inspect
            sig = inspect.signature(func)
            params = list(sig.parameters.keys())

            # Lier les arguments positionnels aux noms
            toutes_args = dict(zip(params, args))
            toutes_args.update(kwargs)

            # TODO: vérifier les types spécifiés
            for param, type_attendu in types.items():
                if param in toutes_args:
                    if not isinstance(toutes_args[param], type_attendu):
                        raise TypeError(
                            f"'{param}' doit être {type_attendu.__name__}, "
                            f"reçu {type(toutes_args[param]).__name__}"
                        )

            return func(*args, **kwargs)
        return wrapper
    return decorateur

@valider(nom=str, age=int)
def creer_profil(nom, age):
    return {"nom": nom, "age": age}

print(creer_profil("Alice", 30))
try:
    creer_profil("Bob", "trente")  # TypeError !
except TypeError as e:
    print(e)`,
    },
    {
      title: "Décorateur de rate limiting",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Limiter le nombre d'appels dans une fenêtre de temps.",
      objective: "Créer `@rate_limit(max_appels, fenetre_secondes)` qui bloque si la limite est dépassée. Utiliser une deque pour la fenêtre glissante.",
      starter: `from functools import wraps
from collections import deque
import time

def rate_limit(max_appels, fenetre_secondes):
    def decorateur(func):
        historique = deque()

        @wraps(func)
        def wrapper(*args, **kwargs):
            maintenant = time.time()
            # TODO: supprimer les appels trop anciens (> fenetre_secondes)
            while historique and maintenant - historique[0] > fenetre_secondes:
                historique.popleft()

            # TODO: si limite atteinte, lever une exception
            if len(historique) >= max_appels:
                attente = fenetre_secondes - (maintenant - historique[0])
                raise RuntimeError(f"Rate limit atteint. Attendre {attente:.1f}s")

            historique.append(maintenant)
            return func(*args, **kwargs)
        return wrapper
    return decorateur

@rate_limit(3, 2)   # max 3 appels par 2 secondes
def api_call(endpoint):
    return f"Réponse de {endpoint}"

for i in range(5):
    try:
        print(api_call(f"/endpoint/{i}"))
    except RuntimeError as e:
        print(f"Bloqué: {e}")`,
    },
  ],

  615: [
    {
      title: "Explorateur de fichiers",
      sector: "⭐⭐ Niveau 2",
      context: "Le module pathlib simplifie la manipulation de chemins.",
      objective: "Écrire `explorer(dossier, extension=None)` qui liste récursivement les fichiers. Afficher: nom, taille, date de modification.",
      starter: `from pathlib import Path
from datetime import datetime

def explorer(dossier, extension=None):
    p = Path(dossier)
    if not p.exists():
        print(f"'{dossier}' n'existe pas")
        return

    pattern = f"**/*.{extension}" if extension else "**/*"

    for fichier in p.glob(pattern):
        if fichier.is_file():
            # TODO: afficher nom, taille en KB, date de modif
            stat = fichier.stat()
            taille = stat.st_size / 1024
            date = datetime.fromtimestamp(stat.st_mtime)
            print(f"{fichier.name:30} {taille:8.1f} KB  {date:%Y-%m-%d %H:%M}")

explorer(".", "py")  # Tous les fichiers .py dans le dossier courant`,
    },
    {
      title: "Regex — Extracteur de données",
      sector: "⭐⭐ Niveau 2",
      context: "Les expressions régulières permettent d'extraire des données structurées.",
      objective: "Écrire des fonctions qui extraient: emails, URLs, numéros de téléphone, dates (DD/MM/YYYY) d'un texte.",
      starter: `import re

texte = """
Contactez Alice à alice@example.com ou visitez https://www.example.com
Bob peut être joint au 06 12 34 56 78 ou bob.martin@company.fr
Réunion le 15/03/2025. Voir aussi http://doc.example.org/guide
Téléphone alternatif: +33 1 23 45 67 89
"""

def extraire_emails(texte):
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
    return re.findall(pattern, texte)

def extraire_urls(texte):
    # TODO: pattern pour http:// et https://
    pass

def extraire_telephones(texte):
    # TODO: pattern pour formats français (06/07, +33, etc.)
    pass

def extraire_dates(texte):
    # TODO: pattern DD/MM/YYYY
    pass

print("Emails:", extraire_emails(texte))
print("URLs:", extraire_urls(texte))
print("Téléphones:", extraire_telephones(texte))
print("Dates:", extraire_dates(texte))`,
    },
    {
      title: "Module utilitaire",
      sector: "⭐⭐ Niveau 2",
      context: "Organiser son code en modules réutilisables.",
      objective: "Créer un module `math_utils.py` avec des fonctions utiles. L'importer depuis un script principal. Ajouter un bloc `if __name__ == '__main__':` avec des tests.",
      starter: `# Fichier: math_utils.py

def est_premier(n):
    """Vérifie si n est un nombre premier."""
    # TODO
    pass

def premiers_jusqu_a(n):
    """Retourne tous les premiers <= n (Crible d'Ératosthène)."""
    if n < 2: return []
    crible = [True] * (n + 1)
    crible[0] = crible[1] = False
    # TODO: implémenter le crible
    return [i for i, v in enumerate(crible) if v]

def pgcd(a, b):
    """Plus Grand Commun Diviseur (algorithme d'Euclide)."""
    while b:
        a, b = b, a % b
    return a

def ppcm(a, b):
    """Plus Petit Commun Multiple."""
    return a * b // pgcd(a, b)

if __name__ == "__main__":
    # Tests — s'exécute seulement si ce fichier est lancé directement
    assert est_premier(7) == True
    assert est_premier(4) == False
    assert pgcd(48, 18) == 6
    assert ppcm(4, 6) == 12
    print("Tous les tests passent !")
    print("Premiers jusqu'à 50:", premiers_jusqu_a(50))`,
    },
    {
      title: "Mini CLI avec argparse",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Créer un outil en ligne de commande professionnel.",
      objective: "Créer un script CLI `calculatrice.py` avec argparse: sous-commandes add/mul/stats, option --verbose, --output-file.",
      starter: `import argparse
import sys

def cmd_add(args):
    resultat = sum(args.nombres)
    if args.verbose:
        print(f"Addition de {args.nombres}")
    return resultat

def cmd_mul(args):
    from functools import reduce
    resultat = reduce(lambda a, b: a*b, args.nombres)
    return resultat

def cmd_stats(args):
    n = args.nombres
    return {
        "count": len(n),
        "somme": sum(n),
        "moyenne": sum(n)/len(n),
        "min": min(n),
        "max": max(n),
    }

def main():
    parser = argparse.ArgumentParser(description="Calculatrice CLI")
    parser.add_argument("--verbose", "-v", action="store_true")
    parser.add_argument("--output", "-o", help="Fichier de sortie")

    sub = parser.add_subparsers(dest="commande", required=True)

    # TODO: ajouter sous-commandes 'add', 'mul', 'stats'
    # chacune avec argument 'nombres' (nargs='+', type=float)

    args = parser.parse_args()

    if args.commande == "add":
        print(cmd_add(args))
    elif args.commande == "mul":
        print(cmd_mul(args))
    elif args.commande == "stats":
        for k, v in cmd_stats(args).items():
            print(f"{k}: {v}")

if __name__ == "__main__":
    main()
# Usage: python calculatrice.py add 1 2 3 4 5`,
    },
    {
      title: "Téléchargeur de données API",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Combiner requests, json, pathlib et datetime pour un vrai outil.",
      objective: "Créer un script qui: récupère des données de l'API JSONPlaceholder, les sauvegarde en JSON/CSV, affiche des stats. Utiliser requests, json, csv, pathlib.",
      starter: `import requests
import json
import csv
from pathlib import Path
from datetime import datetime
from collections import Counter

BASE_URL = "https://jsonplaceholder.typicode.com"

def telecharger_posts():
    """Télécharger tous les posts."""
    resp = requests.get(f"{BASE_URL}/posts")
    resp.raise_for_status()
    return resp.json()

def sauvegarder_json(data, fichier):
    """Sauvegarder en JSON."""
    # TODO
    pass

def sauvegarder_csv(data, fichier):
    """Sauvegarder en CSV (id, userId, title)."""
    # TODO
    pass

def analyser(posts):
    """Afficher des stats sur les posts."""
    par_user = Counter(p["userId"] for p in posts)
    print(f"Total posts: {len(posts)}")
    print(f"Utilisateurs: {len(par_user)}")
    print(f"Top 3 auteurs: {par_user.most_common(3)}")
    longueurs = [len(p["body"]) for p in posts]
    print(f"Longueur moyenne du body: {sum(longueurs)/len(longueurs):.0f} chars")

posts = telecharger_posts()
analyser(posts)
sauvegarder_json(posts, "posts.json")
sauvegarder_csv(posts, "posts.csv")`,
    },
  ],

  616: [
    {
      title: "Arrays NumPy — Operations",
      sector: "⭐ Niveau 1",
      context: "NumPy est la base du calcul scientifique Python.",
      objective: "Créer des arrays, appliquer des opérations vectorisées, utiliser les fonctions universelles (ufuncs). Comparer les performances avec des listes Python.",
      starter: `import numpy as np
import time

# Créer des arrays
a = np.array([1, 2, 3, 4, 5])
m = np.arange(1, 10).reshape(3, 3)

print("Array:", a)
print("Matrice 3x3:\\n", m)

# TODO: calculer et afficher
# - somme, moyenne, min, max, std de a
# - produit matriciel m @ m
# - array des carrés de a (vectorisé)
# - masque booléen: éléments > 3

# Comparaison de performances
n = 1_000_000

# Version liste Python
t0 = time.time()
lst = list(range(n))
result_lst = [x**2 for x in lst]
temps_lst = time.time() - t0

# Version NumPy
t0 = time.time()
arr = np.arange(n)
result_np = arr ** 2
temps_np = time.time() - t0

print(f"\\nListe Python: {temps_lst:.4f}s")
print(f"NumPy: {temps_np:.4f}s")
print(f"NumPy est {temps_lst/temps_np:.1f}x plus rapide")`,
    },
    {
      title: "Analyse de données Pandas",
      sector: "⭐⭐ Niveau 2",
      context: "Analyser un jeu de données réaliste avec Pandas.",
      objective: "Créer un DataFrame de ventes, calculer des statistiques par groupe, filtrer, trier, et exporter les résultats.",
      starter: `import pandas as pd
import numpy as np

# Générer des données de ventes simulées
np.random.seed(42)
n = 100
df = pd.DataFrame({
    "date": pd.date_range("2025-01-01", periods=n, freq="D"),
    "produit": np.random.choice(["Laptop", "Souris", "Clavier", "Écran"], n),
    "region": np.random.choice(["Nord", "Sud", "Est", "Ouest"], n),
    "quantite": np.random.randint(1, 20, n),
    "prix_unitaire": np.random.uniform(10, 1000, n).round(2),
})
df["ca"] = df["quantite"] * df["prix_unitaire"]

print("Aperçu:")
print(df.head())
print("\\nInfos:", df.shape)

# TODO:
# 1. CA total
# 2. CA par produit (groupby + sum), trié décroissant
# 3. Mois avec le plus de CA
# 4. Top 5 transactions (plus grand CA)
# 5. % de CA par région`,
    },
    {
      title: "Nettoyage de données",
      sector: "⭐⭐ Niveau 2",
      context: "Les données réelles ont toujours des problèmes.",
      objective: "Nettoyer un DataFrame avec des valeurs manquantes, des doublons, des formats incorrects. Documenter chaque étape.",
      starter: `import pandas as pd
import numpy as np

# Données sales
data = {
    "nom": ["Alice", "bob", "CHARLIE", "Alice", None, "Eve"],
    "age": [30, "vingt-cinq", 35, 30, 28, -5],
    "email": ["alice@ok.com", "bob@ok", "charlie@ok.com", "alice@ok.com", "diana@ok.com", "eve@ok.com"],
    "salaire": [50000, 45000, None, 50000, 42000, 48000],
}
df = pd.DataFrame(data)
print("Données brutes:")
print(df)
print()

# TODO: nettoyer le DataFrame
# 1. Supprimer les doublons exacts
# 2. Capitaliser les noms (str.title())
# 3. Gérer les ages invalides (non-int → NaN, négatifs → NaN)
# 4. Valider les emails (doivent contenir '@' et '.')
# 5. Remplir les salaires manquants avec la médiane
# 6. Supprimer les lignes avec nom manquant
print("Données nettoyées:")`,
    },
    {
      title: "Visualisation ASCII",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Créer des graphiques en mode texte sans bibliothèque de visualisation.",
      objective: "Créer `histogramme(data, bins=10, largeur=50)` qui affiche un histogramme ASCII. Tester sur des données normalement distribuées.",
      starter: `import numpy as np

def histogramme(data, bins=10, largeur=50, titre="Histogramme"):
    data = np.array(data)
    # Calculer les bins
    mini, maxi = data.min(), data.max()
    largeur_bin = (maxi - mini) / bins

    # Compter les éléments par bin
    comptes = []
    etiquettes = []
    for i in range(bins):
        bas = mini + i * largeur_bin
        haut = bas + largeur_bin
        count = np.sum((data >= bas) & (data < haut if i < bins-1 else data <= haut))
        comptes.append(count)
        etiquettes.append(f"{bas:6.2f}-{haut:.2f}")

    # TODO: normaliser et afficher avec des barres '█'
    max_count = max(comptes)
    print(f"\\n{titre}")
    print("=" * (largeur + 20))
    for etiquette, count in zip(etiquettes, comptes):
        barres = int(count / max_count * largeur)
        print(f"{etiquette} │ {'█' * barres} {count}")
    print("=" * (largeur + 20))

# Test
np.random.seed(42)
donnees = np.random.normal(100, 15, 1000)   # QI simulé
histogramme(donnees, bins=10, titre="Distribution des QI simulés")`,
    },
  ],

  617: [
    {
      title: "Client API simple",
      sector: "⭐ Niveau 1",
      context: "Consommer une API publique est une compétence essentielle.",
      objective: "Utiliser l'API JSONPlaceholder pour: lister les utilisateurs, récupérer les posts d'un user, afficher proprement les données.",
      starter: `import requests

BASE = "https://jsonplaceholder.typicode.com"

def lister_users():
    resp = requests.get(f"{BASE}/users")
    resp.raise_for_status()
    return resp.json()

def posts_de_user(user_id):
    resp = requests.get(f"{BASE}/posts", params={"userId": user_id})
    resp.raise_for_status()
    return resp.json()

# TODO: récupérer les users et afficher: id, nom, email
users = lister_users()
print(f"{'ID':>3} {'Nom':<20} {'Email':<30}")
print("-" * 55)
for user in users:
    # TODO: formater et afficher
    pass

# TODO: afficher le nombre de posts de chaque user`,
    },
    {
      title: "Gestion d'erreurs HTTP",
      sector: "⭐⭐ Niveau 2",
      context: "Une API robuste doit gérer tous les cas d'erreur.",
      objective: "Écrire `appel_api_robuste(url, **kwargs)` avec: timeout configurable, retry automatique (3x), gestion de tous les codes HTTP, logging.",
      starter: `import requests
import time
import logging

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

def appel_api_robuste(url, methode="GET", max_retries=3, timeout=10, **kwargs):
    """
    Appel HTTP robuste avec retry, timeout et gestion d'erreurs.
    Retourne (data, status_code) ou (None, error_code).
    """
    for tentative in range(1, max_retries + 1):
        try:
            logging.info(f"[{tentative}/{max_retries}] {methode} {url}")
            resp = requests.request(methode, url, timeout=timeout, **kwargs)

            if resp.status_code == 429:   # Rate limited
                attente = int(resp.headers.get("Retry-After", 5))
                logging.warning(f"Rate limited. Attente {attente}s")
                time.sleep(attente)
                continue

            resp.raise_for_status()
            return resp.json(), resp.status_code

        except requests.Timeout:
            logging.error(f"Timeout après {timeout}s")
        except requests.ConnectionError:
            logging.error("Erreur de connexion")
        except requests.HTTPError as e:
            if e.response.status_code < 500:   # 4xx : pas la peine de retry
                return None, e.response.status_code
            logging.error(f"Erreur serveur {e.response.status_code}")

        if tentative < max_retries:
            time.sleep(2 ** tentative)  # backoff exponentiel

    return None, None

data, code = appel_api_robuste("https://jsonplaceholder.typicode.com/todos/1")
print(f"Status: {code}, Data: {data}")`,
    },
    {
      title: "Scraper météo",
      sector: "⭐⭐ Niveau 2",
      context: "Récupérer et afficher des données météo en temps réel.",
      objective: "Utiliser l'API Open-Meteo (gratuite, sans clé) pour récupérer la météo d'une ville par ses coordonnées GPS. Afficher: température, vent, pluie.",
      starter: `import requests

def meteo(latitude, longitude, ville="Ville inconnue"):
    """
    API Open-Meteo : https://open-meteo.com/
    Gratuite, pas de clé requise.
    """
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,wind_speed_10m,precipitation,weather_code",
        "timezone": "Europe/Paris"
    }

    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()

    current = data["current"]
    # TODO: afficher proprement les données météo
    print(f"\\n🌤 Météo actuelle — {ville}")
    print(f"  Température : {current['temperature_2m']}°C")
    # TODO: afficher vent, précipitations

    return current

# Tester avec Paris, Lyon, Marseille
villes = [
    (48.8566, 2.3522, "Paris"),
    (45.7640, 4.8357, "Lyon"),
    (43.2965, 5.3698, "Marseille"),
]

for lat, lon, nom in villes:
    meteo(lat, lon, nom)`,
    },
    {
      title: "Mini client GitHub",
      sector: "⭐⭐⭐ Niveau 3",
      context: "L'API GitHub est bien documentée et utilisée dans de nombreux outils.",
      objective: "Créer `GitHubClient` qui: récupère les infos d'un user, liste ses repos (triés par stars), affiche les langages utilisés.",
      starter: `import requests
from collections import Counter

class GitHubClient:
    BASE = "https://api.github.com"

    def __init__(self, token=None):
        self.session = requests.Session()
        self.session.headers.update({
            "Accept": "application/vnd.github.v3+json",
            **({"Authorization": f"Bearer {token}"} if token else {})
        })

    def get_user(self, username):
        resp = self.session.get(f"{self.BASE}/users/{username}")
        resp.raise_for_status()
        return resp.json()

    def get_repos(self, username, max_repos=30):
        resp = self.session.get(
            f"{self.BASE}/users/{username}/repos",
            params={"per_page": max_repos, "sort": "stars", "direction": "desc"}
        )
        resp.raise_for_status()
        return resp.json()

    def analyser(self, username):
        user = self.get_user(username)
        repos = self.get_repos(username)

        print(f"\\n👤 {user['name'] or username}")
        print(f"   {user.get('bio', 'Pas de bio')}")
        print(f"   📍 {user.get('location', 'N/A')}")
        print(f"   ⭐ Followers: {user['followers']}")

        # TODO: afficher top 5 repos (nom, stars, language)
        # TODO: afficher la distribution des langages
        langages = Counter(r["language"] for r in repos if r["language"])
        print(f"\\nLanguages: {dict(langages.most_common(5))}")

client = GitHubClient()
client.analyser("torvalds")  # ou tout autre utilisateur public`,
    },
    {
      title: "Webhook listener",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Recevoir et traiter des webhooks est essentiel pour les intégrations.",
      objective: "Créer un serveur Flask minimal qui reçoit des webhooks POST, valide une signature HMAC, enregistre les événements.",
      starter: `from flask import Flask, request, jsonify
import hashlib
import hmac
import json
from datetime import datetime

# pip install flask

app = Flask(__name__)
SECRET = "mon_secret_webhook"
evenements = []

def valider_signature(payload, signature_header):
    """Valider la signature HMAC-SHA256."""
    if not signature_header:
        return False
    # TODO: calculer hmac.new(SECRET.encode(), payload, sha256).hexdigest()
    # comparer avec signature_header (format "sha256=...")
    pass

@app.route("/webhook", methods=["POST"])
def recevoir_webhook():
    payload = request.get_data()
    signature = request.headers.get("X-Hub-Signature-256", "")

    if not valider_signature(payload, signature):
        return jsonify({"error": "Signature invalide"}), 401

    data = request.json
    evenement = {
        "id": len(evenements) + 1,
        "timestamp": datetime.now().isoformat(),
        "type": request.headers.get("X-Event-Type", "unknown"),
        "data": data
    }
    evenements.append(evenement)
    print(f"Webhook reçu: {evenement['type']}")

    return jsonify({"status": "ok", "id": evenement["id"]})

@app.route("/events", methods=["GET"])
def lister_evenements():
    return jsonify(evenements)

if __name__ == "__main__":
    app.run(debug=True, port=5000)`,
    },
  ],

  618: [
    {
      title: "Hello FastAPI",
      sector: "⭐ Niveau 1",
      context: "Créer ta première API REST avec FastAPI.",
      objective: "Créer une API avec: GET / (accueil), GET /ping (healthcheck), GET /items/{id} avec paramètre query optionnel. Tester avec curl ou le Swagger auto.",
      starter: `from fastapi import FastAPI, Query
from typing import Optional

app = FastAPI(title="Mon API", version="1.0.0")

# Base de données factice
items_db = {
    1: {"nom": "Laptop", "prix": 999.0},
    2: {"nom": "Souris", "prix": 29.99},
    3: {"nom": "Clavier", "prix": 79.0},
}

@app.get("/")
def accueil():
    return {"message": "Bienvenue sur mon API !", "version": "1.0.0"}

# TODO: ajouter GET /ping qui retourne {"status": "ok", "timestamp": ...}

# TODO: ajouter GET /items/{item_id} qui retourne l'item
# Si absent → HTTPException 404

# TODO: ajouter GET /items avec paramètre ?search= optionnel
# Retourne tous les items ou filtrés par nom

# Lancer : uvicorn main:app --reload
# Swagger : http://localhost:8000/docs`,
    },
    {
      title: "CRUD avec Pydantic",
      sector: "⭐⭐ Niveau 2",
      context: "Pydantic valide automatiquement les données entrantes.",
      objective: "Créer un CRUD complet /users avec Pydantic: créer (POST), lire (GET), mettre à jour (PUT), supprimer (DELETE). Valider email et age.",
      starter: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

# pip install fastapi uvicorn pydantic[email]

app = FastAPI()

class UserCreate(BaseModel):
    nom: str = Field(min_length=2, max_length=50)
    email: str = Field(pattern=r'^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$')
    age: int = Field(ge=0, le=150)

class UserResponse(UserCreate):
    id: int
    created_at: datetime

# Stockage en mémoire
users: dict[int, dict] = {}
counter = 0

@app.post("/users", response_model=UserResponse, status_code=201)
def creer_user(user: UserCreate):
    global counter
    counter += 1
    # TODO: créer et stocker l'utilisateur

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    # TODO: retourner l'user ou 404

@app.put("/users/{user_id}", response_model=UserResponse)
def modifier_user(user_id: int, user: UserCreate):
    # TODO: mettre à jour ou 404

@app.delete("/users/{user_id}", status_code=204)
def supprimer_user(user_id: int):
    # TODO: supprimer ou 404`,
    },
    {
      title: "Middleware & Auth",
      sector: "⭐⭐ Niveau 2",
      context: "Sécuriser une API avec des headers d'authentification.",
      objective: "Ajouter: middleware de logging (durée + status), dépendance d'auth par API key (header X-API-Key), route protégée et route publique.",
      starter: `from fastapi import FastAPI, Request, HTTPException, Depends, Header
from fastapi.responses import JSONResponse
import time
import logging
from typing import Optional

logging.basicConfig(level=logging.INFO)
app = FastAPI()

# API Keys valides (en prod: utiliser une DB)
API_KEYS = {"secret-key-123", "admin-key-456"}

# Middleware de logging
@app.middleware("http")
async def log_requetes(request: Request, call_next):
    t0 = time.time()
    response = await call_next(request)
    duree = (time.time() - t0) * 1000
    logging.info(f"{request.method} {request.url.path} → {response.status_code} ({duree:.1f}ms)")
    return response

# Dépendance d'authentification
async def verifier_api_key(x_api_key: Optional[str] = Header(None)):
    # TODO: vérifier que x_api_key est dans API_KEYS
    # Sinon lever HTTPException 401
    pass

@app.get("/public")
def route_publique():
    return {"message": "Accessible à tous"}

@app.get("/prive", dependencies=[Depends(verifier_api_key)])
def route_privee():
    return {"message": "Accès autorisé !", "secret": "42"}

# Tester avec :
# curl -H "X-API-Key: secret-key-123" http://localhost:8000/prive`,
    },
    {
      title: "API avec base de données SQLite",
      sector: "⭐⭐⭐ Niveau 3",
      context: "Persister les données avec SQLite et sqlite3.",
      objective: "Créer une API de todos avec persistance SQLite: créer la table au démarrage, CRUD complet, filtre par statut.",
      starter: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Literal
import sqlite3
from contextlib import contextmanager
from datetime import datetime

app = FastAPI()
DB_PATH = "todos.db"

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()

def init_db():
    with get_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titre TEXT NOT NULL,
                fait BOOLEAN DEFAULT FALSE,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

init_db()

class TodoCreate(BaseModel):
    titre: str
    fait: bool = False

class Todo(TodoCreate):
    id: int
    created_at: str

@app.get("/todos", response_model=list[Todo])
def lister_todos(fait: Optional[bool] = None):
    with get_db() as db:
        # TODO: SELECT avec filtre optionnel sur 'fait'
        pass

@app.post("/todos", response_model=Todo, status_code=201)
def creer_todo(todo: TodoCreate):
    with get_db() as db:
        # TODO: INSERT et retourner le todo créé
        pass

# TODO: PUT /todos/{id} pour marquer comme fait
# TODO: DELETE /todos/{id}`,
    },
    {
      title: "API asynchrone + WebSocket",
      sector: "⭐⭐⭐ Niveau 3",
      context: "FastAPI supporte nativement async/await et les WebSockets.",
      objective: "Créer: des routes async qui simulent du I/O, un endpoint WebSocket de chat simple, et tester la concurrence avec asyncio.gather.",
      starter: `from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import aiohttp
from typing import List

app = FastAPI()

# Routes asynchrones
@app.get("/lent")
async def route_lente():
    await asyncio.sleep(1)  # Simule I/O lent
    return {"message": "Réponse lente", "delai": "1s"}

@app.get("/parallele")
async def routes_paralleles():
    # TODO: lancer 3 tâches asyncio.sleep(1) en parallèle avec gather
    # Mesurer que ça prend ~1s au lieu de 3s
    import time
    t0 = time.time()
    await asyncio.gather(
        asyncio.sleep(1),
        asyncio.sleep(1),
        asyncio.sleep(1),
    )
    return {"duree": f"{time.time()-t0:.2f}s", "taches": 3}

# Gestionnaire de connexions WebSocket
class GestionnaireConnexions:
    def __init__(self):
        self.connexions: List[WebSocket] = []

    async def connecter(self, ws: WebSocket):
        await ws.accept()
        self.connexions.append(ws)

    def deconnecter(self, ws: WebSocket):
        self.connexions.remove(ws)

    async def diffuser(self, message: str):
        for connexion in self.connexions:
            await connexion.send_text(message)

gestionnaire = GestionnaireConnexions()

@app.websocket("/ws/{client_id}")
async def websocket_chat(ws: WebSocket, client_id: str):
    await gestionnaire.connecter(ws)
    await gestionnaire.diffuser(f"✅ {client_id} a rejoint le chat")
    try:
        while True:
            msg = await ws.receive_text()
            await gestionnaire.diffuser(f"{client_id}: {msg}")
    except WebSocketDisconnect:
        gestionnaire.deconnecter(ws)
        await gestionnaire.diffuser(f"❌ {client_id} a quitté le chat")`,
    },
  ],
};

export default PYTHON_PROJECTS;
