/**
 * Modules Machine Learning — From Zero to Practitioner
 *
 * Pédagogie : accessible aux grands débutants. Chaque module alterne
 * une partie théorique (leçons) et une partie pratique (exercices guidés
 * sur la propre machine de l'apprenant, avec code Python fourni clé en main).
 *
 * IDs 300-399 réservés au track Machine Learning.
 */

const ML_MODULES = [
  // ═══════════════════════════════════════════════════════════
  // MODULE 1 — C'est quoi le Machine Learning ?
  // ═══════════════════════════════════════════════════════════
  {
    id: 301, level: 'Débutant', icon: '🧠', title: "C'est quoi le Machine Learning ?",
    desc: "Comprendre en douceur ce qu'est le ML, pourquoi il existe, et comment il s'insère dans le monde réel.",
    color: 'green', colorHex: '#59CD90',
    lessons: [
      {
        title: "Le problème que le ML résout",
        content: `### La programmation classique vs le Machine Learning

Imagine que tu dois écrire un programme pour détecter si un email est du spam.

**En programmation classique**, tu écrirais des règles :
\`\`\`python
if "gagné" in email and "cliquez ici" in email and expediteur_inconnu:
    return "spam"
\`\`\`

Le problème ? Les spammeurs s'adaptent. Il y a des millions de combinaisons possibles. Écrire toutes les règles à la main est **impossible**.

**En Machine Learning**, tu montres des exemples au programme :
\`\`\`
Email 1 : "Tu as gagné un iPhone !" → spam
Email 2 : "Réunion de projet lundi" → pas spam
Email 3 : "Cliquez pour gagner 1000€" → spam
...
10 000 exemples plus tard...
\`\`\`

Le programme **apprend lui-même les règles** à partir des données. C'est ça, le Machine Learning.

> 🎯 **Définition simple** : Le Machine Learning, c'est apprendre à partir d'exemples plutôt que de programmer des règles à la main.

### La recette universelle du ML

Quel que soit le problème, le processus est toujours le même :

\`\`\`
1. Données        →  Des exemples (passé)
2. Algorithme     →  Trouve des patterns dans les données
3. Modèle         →  Le résultat de l'apprentissage
4. Prédiction     →  Applique ce qu'il a appris au futur
\`\`\`

### Où le ML est-il utilisé dans la vraie vie ?

| Domaine | Application concrète |
|---------|---------------------|
| 📧 Email | Filtrage du spam (Gmail) |
| 🎵 Musique | Recommandations (Spotify, Deezer) |
| 🏦 Banque | Détection de fraude sur ta carte bancaire |
| 🏥 Médecine | Détection de cancer sur des radios |
| 🚗 Transport | Prévision des prix Uber, voitures autonomes |
| 📸 Photo | Reconnaissance de visages (iPhone Face ID) |
| 💬 Chat | Traduction automatique (Google Translate) |

Dans **tous** ces cas, personne n'a écrit les règles à la main. Le modèle les a apprises à partir de données.`,
        links: [
          { label: 'Machine Learning (Wikipedia FR)', url: 'https://fr.wikipedia.org/wiki/Apprentissage_automatique' },
          { label: 'Introduction au ML — Google Developers', url: 'https://developers.google.com/machine-learning/crash-course/ml-intro' },
          { label: 'ML for Beginners — Microsoft', url: 'https://microsoft.github.io/ML-For-Beginners/' },
        ],
      },
      {
        title: "Le vocabulaire fondamental",
        content: `### Les mots que tu entendras partout

Avant d'aller plus loin, voilà les termes clés du ML avec des analogies simples.

#### Données (dataset)
C'est la **matière première** du ML. Un dataset est un tableau de données, comme un fichier Excel.

Exemple — dataset de maisons :
| Surface (m²) | Nb chambres | Ville | Prix (€) |
|-------------|-------------|-------|---------|
| 45 | 2 | Lyon | 180 000 |
| 80 | 3 | Paris | 450 000 |
| 120 | 4 | Lyon | 280 000 |

#### Features (caractéristiques / variables d'entrée)
Ce sont les **colonnes d'entrée** : surface, nb chambres, ville. Ce sont les informations données au modèle pour faire sa prédiction.

#### Label / Target (cible)
C'est la **colonne de sortie** qu'on veut prédire : le prix. C'est la réponse correcte dans les exemples d'entraînement.

#### Modèle
C'est la "boîte" qui a appris à partir des données. Elle prend des features en entrée et produit une prédiction en sortie.

\`\`\`
Features → [ MODÈLE ] → Prédiction
(surface, chambres, ville) → (prix estimé)
\`\`\`

#### Entraînement (training)
C'est la phase où l'algorithme lit les données et ajuste ses paramètres internes pour minimiser ses erreurs. Comme un étudiant qui révise avant un examen.

#### Prédiction (inference)
C'est quand le modèle répond à de **nouvelles données** qu'il n'a jamais vues. Comme un étudiant qui passe l'examen.

#### Overfitting (surapprentissage)
Le modèle a trop bien mémorisé les données d'entraînement et se plante sur des données nouvelles. Comme un étudiant qui apprend les réponses par cœur sans comprendre : il réussit les exercices vus en cours mais échoue à l'examen.

#### Underfitting (sous-apprentissage)
Le modèle est trop simple et ne capture même pas les patterns de base. Comme un étudiant qui n'a pas assez révisé.`,
        links: [
          { label: 'Glossaire ML — Google', url: 'https://developers.google.com/machine-learning/glossary' },
          { label: 'Overfitting expliqué', url: 'https://fr.wikipedia.org/wiki/Surapprentissage' },
        ],
      },
      {
        title: "La carte du Machine Learning",
        content: `### Les grandes familles du ML

Le ML se divise en 3 grandes familles selon **comment** l'algorithme apprend.

\`\`\`
                   Machine Learning
                         │
         ┌───────────────┼────────────────┐
         ▼               ▼                ▼
    Supervisé      Non supervisé    Semi-supervisé
         │               │
    ┌────┴────┐      ┌────┴────┐
    ▼         ▼      ▼         ▼
Régression Classification Clustering Réduction
                              de dimension
\`\`\`

#### 1. Apprentissage supervisé
On donne au modèle des exemples **avec les réponses correctes** (les labels).
→ *"Voici 10 000 emails étiquetés spam/pas spam. Apprends à les distinguer."*

Deux grands types :
- **Régression** → prédire un nombre (prix, température, score)
- **Classification** → prédire une catégorie (spam/pas spam, chien/chat, malade/sain)

#### 2. Apprentissage non supervisé
On donne des données **sans réponses**. Le modèle trouve lui-même des structures cachées.
→ *"Voici 100 000 clients. Trouve des groupes qui se ressemblent."*

- **Clustering** → regrouper des données similaires
- **Réduction de dimension** → simplifier des données complexes

#### 3. Apprentissage semi-supervisé
Un mix : peu de données étiquetées + beaucoup de données sans étiquettes.
→ *Très utile quand étiqueter manuellement coûte cher* (médecine, droit...)

### Ce que tu vas apprendre dans ce parcours

| Module | Sujet | Famille |
|--------|-------|---------|
| 302 | Supervisé, non supervisé, semi-supervisé | Fondations |
| 303 | La Régression | Supervisé |
| 304 | La Classification | Supervisé |
| 305 | Le Clustering | Non supervisé |
| 306 | Choisir ses métriques | Transversal |
| 307 | Premiers pas avec scikit-learn | Pratique |`,
        links: [
          { label: 'Types de ML — IBM', url: 'https://www.ibm.com/fr-fr/topics/machine-learning' },
          { label: 'Roadmap ML — roadmap.sh', url: 'https://roadmap.sh/ai-data-scientist' },
        ],
      },
    ],
    exercises: [
      {
        title: "Installer ton environnement Python ML",
        scenario: "Avant de coder, il faut préparer ton environnement. Tu vas installer Python, les bibliothèques essentielles, et vérifier que tout fonctionne.",
        steps: [
          {
            title: "Installer Python (si pas déjà fait)",
            instructions: `Va sur [python.org/downloads](https://www.python.org/downloads/) et installe la dernière version Python 3.x.

**Windows** : coche ✅ "Add Python to PATH" pendant l'installation.

**macOS/Linux** : Python est souvent déjà là. Vérifie avec :
\`\`\`bash
python3 --version
\`\`\``,
          },
          {
            title: "Installer les bibliothèques ML essentielles",
            instructions: `Dans un terminal, tape :

\`\`\`bash
pip install numpy pandas matplotlib seaborn scikit-learn jupyter
\`\`\`

Ces 6 bibliothèques sont la **boîte à outils standard** de tout data scientist :

| Bibliothèque | Rôle |
|-------------|------|
| **numpy** | Calculs mathématiques rapides |
| **pandas** | Manipulation de données (tableaux) |
| **matplotlib** | Graphiques de base |
| **seaborn** | Graphiques statistiques avancés |
| **scikit-learn** | Algorithmes ML (la star du cours) |
| **jupyter** | Notebooks interactifs |`,
          },
          {
            title: "Vérifier l'installation",
            instructions: `Ouvre Python (tape \`python\` dans le terminal) et colle ce code :

\`\`\`python
import numpy as np
import pandas as pd
import sklearn

print("numpy :", np.__version__)
print("pandas :", pd.__version__)
print("scikit-learn :", sklearn.__version__)
print("✅ Tout est installé !")
\`\`\`

Si tu vois les numéros de version sans erreur, tu es prêt.`,
          },
          {
            title: "Lancer Jupyter Notebook",
            instructions: `Dans le terminal, navigue vers un dossier de travail puis lance Jupyter :

\`\`\`bash
mkdir mon-cours-ml && cd mon-cours-ml
jupyter notebook
\`\`\`

Un navigateur s'ouvre. Clique sur **"New" → "Python 3"** pour créer un premier notebook.

> 💡 Un notebook Jupyter, c'est un document interactif où tu mélanges du code et du texte. C'est l'outil préféré des data scientists.`,
          },
        ],
        hints: [
          "Si 'pip' n'est pas reconnu, essaie 'pip3' ou 'python -m pip'.",
          "Sur Windows, si Python n'est pas trouvé, désinstalle et réinstalle en cochant bien 'Add to PATH'.",
          "Si une bibliothèque manque, réinstalle-la individuellement : 'pip install nom-bibliotheque'.",
        ],
        solution: `# Code de vérification — tout doit s'afficher sans erreur
import numpy as np
import pandas as pd
import sklearn
import matplotlib
import seaborn

print("numpy :", np.__version__)
print("pandas :", pd.__version__)
print("scikit-learn :", sklearn.__version__)
print("matplotlib :", matplotlib.__version__)
print("seaborn :", seaborn.__version__)
print("✅ Environnement ML prêt !")`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 2 — Supervisé, Non supervisé, Semi-supervisé
  // ═══════════════════════════════════════════════════════════
  {
    id: 302, level: 'Débutant', icon: '🗂️', title: "Les 3 familles d'apprentissage",
    desc: "Supervisé, non supervisé, semi-supervisé : comprendre les différences, quand les utiliser, et leurs métriques clés.",
    color: 'blue', colorHex: '#3FA7D6',
    lessons: [
      {
        title: "L'apprentissage supervisé",
        content: `### Principe : apprendre avec un professeur

Dans l'apprentissage supervisé, chaque exemple dans les données d'entraînement vient avec **la bonne réponse** (le label). L'algorithme apprend en comparant ses prédictions aux vraies réponses, et corrige ses erreurs.

\`\`\`
Données d'entrée     Réponse connue
─────────────────    ──────────────
Email #1 (texte)  →  spam
Email #2 (texte)  →  pas spam
Photo #1 (pixels) →  chat
Photo #2 (pixels) →  chien
\`\`\`

**L'algorithme ajuste ses paramètres** pour que ses prédictions se rapprochent le plus possible des bonnes réponses. C'est comme apprendre à conduire avec un moniteur qui dit "trop à droite !", "trop vite !" à chaque erreur.

### Les deux types de tâches supervisées

#### Régression → prédire un nombre continu
- Prix d'une maison (150 000 €, 320 000 €...)
- Température demain (21.3°C, 18.7°C...)
- Chiffre d'affaires prévu (500 K€, 1.2 M€...)

#### Classification → prédire une catégorie
- Email : spam ou pas spam (2 catégories = binaire)
- Chiffre écrit à la main : 0, 1, 2... 9 (10 catégories = multiclasse)
- Sentiment : positif, négatif, neutre (3 catégories)

### Quand utiliser le supervisé ?

✅ **Tu as des données étiquetées** (avec les réponses)
✅ **Tu sais ce que tu veux prédire**
✅ **Tu peux évaluer les erreurs** (tu connais les bonnes réponses)

❌ **Ne pas utiliser si** : étiqueter les données est trop coûteux ou impossible

### Dans un contexte professionnel

| Secteur | Tâche supervisée | Business value |
|---------|-----------------|---------------|
| Banque | Prédire si un client va faire défaut | Réduire les pertes sur crédit |
| E-commerce | Prédire la valeur à vie d'un client | Optimiser les acquisitions |
| RH | Prédire les départs volontaires | Réduire le turnover |
| Marketing | Prédire le taux de clic | Améliorer les campagnes |`,
        links: [
          { label: 'Supervised Learning — scikit-learn', url: 'https://scikit-learn.org/stable/supervised_learning.html' },
          { label: 'Cours Andrew Ng (Stanford) — gratuit', url: 'https://www.coursera.org/learn/machine-learning' },
        ],
      },
      {
        title: "L'apprentissage non supervisé",
        content: `### Principe : apprendre sans professeur

Dans l'apprentissage non supervisé, les données n'ont **pas de labels**. L'algorithme doit trouver lui-même des **structures, patterns ou groupes** cachés dans les données.

Imagine 10 000 clients dans ta base de données. Tu ne sais pas à l'avance combien de "types" de clients il y a, ni comment les définir. Un algorithme non supervisé va **découvrir automatiquement** que certains clients se ressemblent :

\`\`\`
Données brutes (sans labels)     Résultat découvert
────────────────────────────     ──────────────────
Client 1 : 25 ans, achète peu  →  Groupe A (jeunes occasionnels)
Client 2 : 45 ans, achète bcp  →  Groupe B (clients fidèles)
Client 3 : 28 ans, achète peu  →  Groupe A
Client 4 : 50 ans, achète bcp  →  Groupe B
\`\`\`

### Les principales techniques non supervisées

| Technique | Ce qu'elle fait | Exemple |
|-----------|-----------------|---------|
| **Clustering** | Regroupe les données similaires | Segmentation clients |
| **Réduction de dimension** | Simplifie des données complexes | Visualiser des données en 2D |
| **Détection d'anomalies** | Trouve les points "bizarres" | Fraude, pannes machine |
| **Association rules** | Trouve des co-occurrences | "Les clients qui achètent X achètent aussi Y" |

### Quand utiliser le non supervisé ?

✅ **Tu n'as pas de labels** (trop coûteux à créer, ou question inconnue)
✅ **Tu veux explorer tes données** sans idée préconçue
✅ **Tu veux découvrir des groupes naturels**

❌ **Plus difficile à évaluer** : sans bonne réponse de référence, comment savoir si le résultat est bon ?

### Dans un contexte professionnel

| Secteur | Application | Pourquoi non supervisé |
|---------|-------------|----------------------|
| Marketing | Segmentation clients | On ne sait pas a priori combien de segments existent |
| Cybersécurité | Détection d'intrusion | Les nouvelles attaques sont par définition inconnues |
| Médecine | Découverte de sous-types de cancer | Les chercheurs ne connaissent pas encore toutes les catégories |
| Retail | Analyse du panier d'achat | Trouver des associations produits non évidentes |`,
        links: [
          { label: 'Unsupervised Learning — scikit-learn', url: 'https://scikit-learn.org/stable/unsupervised_learning.html' },
          { label: 'Clustering expliqué', url: 'https://fr.wikipedia.org/wiki/Partitionnement_de_donn%C3%A9es' },
        ],
      },
      {
        title: "L'apprentissage semi-supervisé",
        content: `### Le meilleur des deux mondes

L'apprentissage semi-supervisé combine :
- **Un petit peu** de données étiquetées (coûteuses à obtenir)
- **Beaucoup** de données non étiquetées (faciles à collecter)

\`\`\`
100 images étiquetées      (coûteux : médecin requis)
+
10 000 images sans label   (facile : scanner automatique)
↓
Modèle qui apprend des deux
\`\`\`

### Pourquoi c'est utile ?

**Étiqueter des données coûte cher.** Dans certains domaines :
- 🏥 **Médecine** : il faut un radiologue (expert) pour annoter une radio
- ⚖️ **Droit** : un juriste pour annoter des contrats
- 🌍 **Satellites** : des géographes pour annoter des images

Le semi-supervisé permet de tirer parti des **millions de données non étiquetées** disponibles avec seulement quelques centaines d'exemples annotés.

### Comment ça fonctionne ?

**Idée principale** : les données proches dans l'espace des features partagent probablement le même label.

1. Entraîne un modèle sur les données étiquetées
2. Utilise ce modèle pour prédire les labels des données non étiquetées
3. Ajoute les prédictions les plus sûres à l'ensemble d'entraînement
4. Répète

Cette technique s'appelle le **self-training** (auto-apprentissage).

### Exemples concrets en entreprise

| Cas | Données étiquetées | Données non étiquetées |
|-----|-------------------|------------------------|
| Modération de contenu | 500 posts annotés manuellement | 5 millions de posts utilisateurs |
| Détection de fraude | 200 fraudes confirmées | 10 M de transactions |
| Traduction | 10 K paires de phrases traduites | 1 milliard de phrases |

### Les grandes tendances actuelles

Les **LLMs (Large Language Models)** comme GPT utilisent massivement le semi-supervisé : pré-entraînement non supervisé sur Internet entier, puis fine-tuning supervisé sur des exemples annotés. C'est la recette de ChatGPT.`,
        links: [
          { label: 'Semi-supervised Learning — Wikipedia', url: 'https://en.wikipedia.org/wiki/Semi-supervised_learning' },
          { label: 'Self-training expliqué', url: 'https://scikit-learn.org/stable/modules/semi_supervised.html' },
        ],
      },
      {
        title: "Choisir la bonne approche",
        content: `### L'arbre de décision pour choisir

\`\`\`
Tu as un problème ML → As-tu des données étiquetées ?
                              │
              ┌───────────────┴───────────────┐
             OUI                              NON
              │                               │
    Beaucoup de labels ?           → Non supervisé
              │                    (clustering, anomalies...)
     ┌────────┴────────┐
    OUI               PEU
     │                 │
 Supervisé      Semi-supervisé
     │
 Prédire un nombre ?
     │
 ┌───┴───┐
OUI     NON
 │       │
Régression  Classification
\`\`\`

### Résumé rapide

| | Supervisé | Non supervisé | Semi-supervisé |
|-|-----------|--------------|----------------|
| **Labels requis** | ✅ Tous | ❌ Aucun | ✅ Quelques-uns |
| **Objectif** | Prédire une cible connue | Découvrir des structures | Tirer parti des deux |
| **Évaluation** | Facile (compare aux vrais labels) | Difficile | Intermédiaire |
| **Cas d'usage pro** | Churn, fraude, prix | Segmentation, anomalies | NLP, médecine |
| **Exemples d'algos** | Random Forest, SVM, XGBoost | K-Means, DBSCAN | Self-training, MixMatch |`,
        links: [
          { label: 'Choisir son algorithme — scikit-learn cheat sheet', url: 'https://scikit-learn.org/stable/tutorial/machine_learning_map/' },
        ],
      },
    ],
    exercises: [
      {
        title: "Identifier la bonne approche ML",
        scenario: "En entreprise, on te présente 4 problèmes business. À toi de déterminer quelle famille ML utiliser et pourquoi. Ensuite, explore un dataset réel avec pandas.",
        steps: [
          {
            title: "Analyse des 4 cas business",
            instructions: `Pour chacun des cas suivants, réfléchis et note ta réponse :

**Cas 1** : Une banque veut savoir si un nouveau client va rembourser son prêt. Elle a 50 000 dossiers historiques avec la mention "remboursé" ou "défaut".
→ Quelle approche ? Pourquoi ?

**Cas 2** : Un retailer veut regrouper ses 200 000 clients pour personnaliser ses emails. Il n'a aucune idée a priori des groupes qui existent.
→ Quelle approche ? Pourquoi ?

**Cas 3** : Une startup médicale veut détecter des tumeurs sur des radios. Elle a 300 radios annotées par des médecins (coûteux) et 50 000 radios non annotées.
→ Quelle approche ? Pourquoi ?

**Cas 4** : Un site immobilier veut estimer le prix d'un appartement à partir de sa surface, son quartier et son nombre de pièces.
→ Quelle approche ? Pourquoi ?`,
          },
          {
            title: "Explorer un dataset réel",
            instructions: `Ouvre Jupyter Notebook et colle ce code pour explorer le dataset Iris (un classique du ML) :

\`\`\`python
import pandas as pd
from sklearn.datasets import load_iris

# Charger le dataset
iris = load_iris(as_frame=True)
df = iris.frame

# Explorer les données
print("=== Aperçu des données ===")
print(df.head(10))

print("\\n=== Infos générales ===")
print(df.info())

print("\\n=== Statistiques descriptives ===")
print(df.describe())

print("\\n=== Distribution de la target ===")
print(df['target'].value_counts())
print("0=setosa, 1=versicolor, 2=virginica")
\`\`\`

**Questions à réfléchir après l'exécution :**
- Combien d'exemples y a-t-il ?
- Combien de features ?
- Quelle est la target ?
- S'agit-il de supervisé ou non supervisé ?`,
          },
          {
            title: "Visualiser les données",
            instructions: `Continue dans le même notebook :

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Scatter plot : longueur vs largeur des pétales
plt.figure(figsize=(10, 6))
sns.scatterplot(
    data=df,
    x='petal length (cm)',
    y='petal width (cm)',
    hue='target',
    palette=['#59CD90', '#3FA7D6', '#AA7DCE'],
    s=80
)
plt.title("Dataset Iris — les 3 espèces de fleurs")
plt.legend(title="Espèce", labels=['Setosa', 'Versicolor', 'Virginica'])
plt.tight_layout()
plt.show()
\`\`\`

> 📊 Tu vois 3 groupes distincts ? C'est ce qu'un algorithme supervisé va apprendre à distinguer — et ce qu'un algorithme de clustering devrait retrouver sans labels.`,
          },
        ],
        hints: [
          "Cas 1 : il y a des labels ('remboursé'/'défaut') et on veut prédire une catégorie.",
          "Cas 2 : pas de labels, on veut découvrir des groupes → non supervisé.",
          "Cas 3 : peu de labels + beaucoup de données non étiquetées → semi-supervisé.",
          "Cas 4 : on veut prédire un nombre (prix) avec des labels historiques → supervisé, régression.",
        ],
        solution: `# Réponses
# Cas 1 → Supervisé, Classification binaire (remboursé/défaut)
# Cas 2 → Non supervisé, Clustering (ex: K-Means)
# Cas 3 → Semi-supervisé (peu de labels médicaux + beaucoup de radios brutes)
# Cas 4 → Supervisé, Régression (prédire un prix = valeur continue)

# Code complet exploration Iris
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame
print(df.head())
print(df.describe())

sns.scatterplot(data=df, x='petal length (cm)', y='petal width (cm)',
                hue='target', palette=['#59CD90', '#3FA7D6', '#AA7DCE'])
plt.title("Iris — 3 espèces")
plt.show()`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 3 — La Régression
  // ═══════════════════════════════════════════════════════════
  {
    id: 303, level: 'Débutant', icon: '📈', title: "La Régression",
    desc: "Prédire des valeurs numériques continues. Théorie, algorithmes clés, métriques essentielles et cas pro.",
    color: 'orange', colorHex: '#F3752B',
    lessons: [
      {
        title: "Qu'est-ce que la régression ?",
        content: `### Définition

La **régression** est une tâche supervisée dont l'objectif est de **prédire une valeur numérique continue**.

| Tâche | Output |
|-------|--------|
| Régression | Un nombre : 250 000€, 21.3°C, 0.87... |
| Classification | Une catégorie : spam, chat, positif... |

### Exemples concrets

\`\`\`
Features (entrées)                 →  Prédiction (sortie numérique)
──────────────────────────────────────────────────────────────────
Surface 80m², 3 pièces, Paris     →  Prix : 420 000€
Température, humidité, pression   →  Pluie demain : 14.2mm
Score de crédit, salaire, âge     →  Taux d'intérêt : 3.7%
Publicité TV + radio + web (€)    →  Ventes : 1 240 unités
\`\`\`

### La régression linéaire — l'algorithme de base

La **régression linéaire** est le modèle le plus simple. Il suppose que la relation entre les features et la target est une ligne droite (ou un hyperplan en plusieurs dimensions).

**Exemple simple — 1 feature :**
\`\`\`
Prix = a × Surface + b

   Prix
    │                        /
    │                    ·  /
    │                  · · /
    │              · ·    /
    │          · ·      ·
    │      · ·   ·
    └──────────────────────── Surface
\`\`\`

Le modèle apprend les valeurs de **a** (pente) et **b** (ordonnée à l'origine) qui minimisent l'erreur globale.

**Avec plusieurs features (régression multiple) :**
\`\`\`
Prix = a₁×Surface + a₂×Chambres + a₃×Etage + b
\`\`\`

### Les algorithmes de régression courants

| Algorithme | Complexité | Quand l'utiliser |
|-----------|-----------|-----------------|
| **Régression linéaire** | ⭐ Simple | Relations linéaires, interprétabilité requise |
| **Régression polynomiale** | ⭐⭐ | Relations courbes |
| **Ridge / Lasso** | ⭐⭐ | Nombreuses features, éviter l'overfitting |
| **Random Forest Regressor** | ⭐⭐⭐ | Relations complexes, bonne performance |
| **Gradient Boosting (XGBoost)** | ⭐⭐⭐⭐ | Top performance en compétition |
| **Réseaux de neurones** | ⭐⭐⭐⭐⭐ | Données très complexes (images, texte) |`,
        links: [
          { label: 'Régression linéaire — scikit-learn', url: 'https://scikit-learn.org/stable/modules/linear_model.html' },
          { label: 'Introduction à la régression — Statquest (YouTube)', url: 'https://www.youtube.com/watch?v=7ArmBVF2dCs' },
        ],
      },
      {
        title: "Les métriques de la régression",
        content: `### Pourquoi des métriques ?

Une métrique permet de **quantifier la qualité** de ton modèle. En régression, on mesure l'**erreur** entre ce que le modèle prédit et la vraie valeur.

### MAE — Mean Absolute Error (Erreur Absolue Moyenne)

\`\`\`
MAE = moyenne( |valeur_réelle - prédiction| )
\`\`\`

**Exemple :**
| Vrai prix | Prédiction | Erreur absolue |
|-----------|-----------|---------------|
| 200 000 € | 210 000 € | 10 000 € |
| 350 000 € | 330 000 € | 20 000 € |
| 150 000 € | 155 000 € | 5 000 € |
**MAE = (10 000 + 20 000 + 5 000) / 3 = 11 667 €**

✅ **Avantages** : facile à comprendre (même unité que la target), robuste aux outliers
❌ **Inconvénient** : ne pénalise pas fortement les grosses erreurs

**Dans quel cas l'utiliser en pro** : quand toutes les erreurs ont la même importance, quand ton dataset a des outliers (valeurs extrêmes), quand tu dois expliquer la performance à des non-techniciens ("en moyenne, on se trompe de 11 667 €").

---

### MSE — Mean Squared Error (Erreur Quadratique Moyenne)

\`\`\`
MSE = moyenne( (valeur_réelle - prédiction)² )
\`\`\`

| Vrai prix | Prédiction | Erreur² |
|-----------|-----------|---------|
| 200 000 € | 210 000 € | 100 000 000 |
| 350 000 € | 330 000 € | 400 000 000 |
| 150 000 € | 155 000 € | 25 000 000 |
**MSE = 175 000 000 €²**

✅ **Avantage** : pénalise fortement les grosses erreurs (une erreur de 20K pèse 4× plus qu'une de 10K)
❌ **Inconvénient** : unité en €² (difficile à interpréter directement)

**Dans quel cas l'utiliser en pro** : quand les grandes erreurs sont très coûteuses (ex: prévoir la demande d'énergie — une grande sous-estimation = blackout).

---

### RMSE — Root Mean Squared Error

\`\`\`
RMSE = √MSE
\`\`\`

RMSE = √175 000 000 ≈ **13 229 €**

✅ **Avantage** : même unité que la target (€), pénalise les grosses erreurs
❌ **Inconvénient** : sensible aux outliers

**Dans quel cas l'utiliser en pro** : c'est la métrique par défaut en régression. Quand tu dois comparer des modèles et que les grosses erreurs te coûtent cher.

---

### R² — Coefficient de Détermination

\`\`\`
R² = 1 - (MSE du modèle) / (variance de la target)
\`\`\`

**Interprétation :**
- **R² = 1.0** → Prédictions parfaites (impossible en pratique)
- **R² = 0.85** → Le modèle explique 85% de la variabilité des prix
- **R² = 0.0** → Le modèle n'est pas mieux que de prédire la moyenne tout le temps
- **R² < 0** → Le modèle est pire que de prédire la moyenne (problème sérieux)

✅ **Avantage** : sans unité, entre 0 et 1, universel (tout le monde comprend 85%)
❌ **Inconvénient** : peut être trompeur si la distribution est très particulière

**Dans quel cas l'utiliser en pro** : pour communiquer la performance globale à la direction ou aux clients. "Notre modèle de prévision explique 87% de la variation des ventes."

---

### Tableau récapitulatif

| Métrique | Unité | Pénalise les grosses erreurs | Interprétabilité | Usage pro recommandé |
|---------|-------|------------------------------|-----------------|---------------------|
| MAE | Même que target | Non | ✅ Très élevée | Rapports business, outliers |
| MSE | Unité² | ✅ Oui | Faible | Optimisation interne |
| RMSE | Même que target | ✅ Oui | Élevée | Standard industrie |
| R² | Sans unité (0-1) | Non | ✅ Très élevée | Communication direction |

> 💼 **En pratique pro** : on rapporte toujours **au moins MAE ou RMSE + R²**. Le RMSE dit "de combien on se trompe", le R² dit "quelle part de la réalité on capture".`,
        links: [
          { label: 'Métriques de régression — scikit-learn', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics' },
          { label: 'R² expliqué — Statquest', url: 'https://www.youtube.com/watch?v=2AQKmw14mHM' },
        ],
      },
    ],
    exercises: [
      {
        title: "Ton premier modèle de régression",
        scenario: "Tu travailles dans une agence immobilière. Le directeur veut un outil pour estimer automatiquement le prix d'un bien à partir de ses caractéristiques. Tu vas construire ton premier modèle de régression.",
        steps: [
          {
            title: "Charger et explorer les données",
            instructions: `\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing

# Charger le dataset immobilier californien (réel)
housing = fetch_california_housing(as_frame=True)
df = housing.frame

print("=== Aperçu ===")
print(df.head())

print("\\n=== Infos ===")
print(df.info())

print("\\n=== Statistiques ===")
print(df.describe())

print("\\n=== Target (prix médian en 100k$) ===")
print(df['MedHouseVal'].describe())
\`\`\`

Le dataset contient des informations sur des quartiers de Californie. La target est le **prix médian des maisons** (en 100K$).`,
          },
          {
            title: "Préparer les données et entraîner le modèle",
            instructions: `\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler

# Séparer features et target
X = df.drop('MedHouseVal', axis=1)
y = df['MedHouseVal']

# Diviser en train / test (80% / 20%)
# Important : ne jamais évaluer sur les données d'entraînement !
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train: {len(X_train)} exemples | Test: {len(X_test)} exemples")

# Normaliser les features (important pour la régression linéaire)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Attention : transform seulement, pas fit !

# Entraîner le modèle
model = LinearRegression()
model.fit(X_train_scaled, y_train)
print("✅ Modèle entraîné !")
print(f"Coefficients : {model.coef_}")
print(f"Intercept : {model.intercept_:.2f}")
\`\`\``,
          },
          {
            title: "Évaluer avec les métriques",
            instructions: `\`\`\`python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Prédire sur le jeu de test
y_pred = model.predict(X_test_scaled)

# Calculer les métriques
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("=== Performances du modèle ===")
print(f"MAE  : {mae:.3f} (×100K$) → en moyenne, erreur de {mae*100:.0f}$")
print(f"RMSE : {rmse:.3f} (×100K$)")
print(f"R²   : {r2:.3f} → le modèle explique {r2*100:.1f}% de la variabilité")

# Visualiser : prédictions vs réalité
plt.figure(figsize=(8, 6))
plt.scatter(y_test, y_pred, alpha=0.3, color='#3FA7D6', s=10)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()],
         'r--', lw=2, label='Prédiction parfaite')
plt.xlabel('Prix réel (×100K$)')
plt.ylabel('Prix prédit (×100K$)')
plt.title('Régression linéaire — Réel vs Prédit')
plt.legend()
plt.tight_layout()
plt.show()
\`\`\`

**Interprétation attendue :**
- MAE ≈ 0.53 → en moyenne, on se trompe de 53 000$
- R² ≈ 0.60 → le modèle explique 60% de la variabilité des prix
- Le graphique montre que les points s'éloignent de la diagonale pour les prix élevés`,
          },
          {
            title: "Améliorer avec Random Forest",
            instructions: `La régression linéaire a ses limites. Essaie un modèle plus puissant :

\`\`\`python
from sklearn.ensemble import RandomForestRegressor

# Random Forest (pas besoin de normaliser)
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)
y_pred_rf = rf_model.predict(X_test)

mae_rf = mean_absolute_error(y_test, y_pred_rf)
rmse_rf = np.sqrt(mean_squared_error(y_test, y_pred_rf))
r2_rf = r2_score(y_test, y_pred_rf)

print("=== Comparaison ===")
print(f"{'Métrique':<10} {'Linéaire':>15} {'Random Forest':>15}")
print(f"{'MAE':<10} {mae:>15.3f} {mae_rf:>15.3f}")
print(f"{'RMSE':<10} {rmse:>15.3f} {rmse_rf:>15.3f}")
print(f"{'R²':<10} {r2:>15.3f} {r2_rf:>15.3f}")

# Feature importance
feat_imp = pd.Series(rf_model.feature_importances_, index=X.columns).sort_values(ascending=False)
print("\\n=== Features les plus importantes ===")
print(feat_imp)
\`\`\`

**Interprétation attendue :**
- Random Forest devrait avoir un R² ≈ 0.80+ (bien mieux que linéaire !)
- La feature la plus importante est généralement "MedInc" (revenu médian du quartier)`,
          },
        ],
        hints: [
          "Si fetch_california_housing échoue, essaie 'pip install scikit-learn --upgrade'.",
          "Le train_test_split est crucial : on évalue toujours sur des données que le modèle n'a jamais vues.",
          "StandardScaler : fit_transform sur le train, SEULEMENT transform sur le test. Ne pas fitter sur le test (data leakage).",
          "Un R² de 0.60 n'est pas terrible pour l'immobilier — Random Forest va montrer que c'est améliorable.",
        ],
        solution: `from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

housing = fetch_california_housing(as_frame=True)
df = housing.frame
X = df.drop('MedHouseVal', axis=1)
y = df['MedHouseVal']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

lr = LinearRegression().fit(X_train_s, y_train)
y_pred = lr.predict(X_test_s)
print("R² linéaire :", r2_score(y_test, y_pred).round(3))

rf = RandomForestRegressor(n_estimators=100, random_state=42).fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)
print("R² RF :", r2_score(y_test, y_pred_rf).round(3))`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 4 — La Classification
  // ═══════════════════════════════════════════════════════════
  {
    id: 304, level: 'Intermédiaire', icon: '🏷️', title: "La Classification",
    desc: "Prédire des catégories. Les algorithmes, les métriques (accuracy, precision, recall, F1, AUC) et quand les utiliser.",
    color: 'purple', colorHex: '#AA7DCE',
    lessons: [
      {
        title: "Qu'est-ce que la classification ?",
        content: `### Définition

La **classification** est une tâche supervisée dont l'objectif est de **prédire à quelle catégorie appartient un exemple**.

| | Régression | Classification |
|--|-----------|---------------|
| Output | Nombre continu (prix, température) | Catégorie (spam/pas spam, chien/chat) |
| Exemple | "Ce bien vaut 280 000€" | "Cet email est du spam" |

### Types de classification

#### Binaire (2 classes)
- Spam / Pas spam
- Fraude / Pas fraude
- Malade / Sain

#### Multiclasse (N classes)
- Chiffre écrit à la main : {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
- Espèce de fleur : {Setosa, Versicolor, Virginica}
- Sentiment : {Positif, Négatif, Neutre}

#### Multi-label (plusieurs labels possibles en même temps)
- Un article peut avoir les tags {sport, foot, france} simultanément

### Les algorithmes de classification courants

| Algorithme | Complexité | Points forts |
|-----------|-----------|--------------|
| **Régression logistique** | ⭐ | Interprétable, rapide, bon baseline |
| **K-Nearest Neighbors (KNN)** | ⭐⭐ | Intuitif, bon pour débuter |
| **Arbre de décision** | ⭐⭐ | Très interprétable, visualisable |
| **Random Forest** | ⭐⭐⭐ | Robuste, performant, peu de tuning |
| **SVM** | ⭐⭐⭐ | Excellent sur données petites/moyennes |
| **XGBoost / LightGBM** | ⭐⭐⭐⭐ | State-of-the-art données tabulaires |
| **Réseau de neurones** | ⭐⭐⭐⭐⭐ | Images, texte, audio |

### La matrice de confusion — comprendre les erreurs

Pour une classification binaire (positif / négatif) :

\`\`\`
                    Prédit
                Positif  Négatif
Réel  Positif │   TP   │   FN   │  ← Vrais positifs / Faux négatifs
      Négatif │   FP   │   TN   │  ← Faux positifs / Vrais négatifs
\`\`\`

- **TP (True Positive)** : "Fraude" prédit, c'est bien une fraude ✅
- **TN (True Negative)** : "Pas fraude" prédit, c'est bien légitime ✅
- **FP (False Positive)** : "Fraude" prédit, mais c'était légitime ❌ (fausse alarme)
- **FN (False Negative)** : "Pas fraude" prédit, mais c'était une fraude ❌ (raté !)

> 💡 Selon le contexte pro, les FP et FN n'ont PAS la même gravité. En détection de cancer, rater un cancer (FN) est catastrophique. En spam, bloquer un email légitime (FP) est gênant. C'est pour ça qu'on a plusieurs métriques.`,
        links: [
          { label: 'Classification — scikit-learn', url: 'https://scikit-learn.org/stable/supervised_learning.html' },
          { label: 'Matrice de confusion expliquée', url: 'https://www.youtube.com/watch?v=Kdsp6soqA7o' },
        ],
      },
      {
        title: "Les métriques de classification",
        content: `### Accuracy (Précision globale)

\`\`\`
Accuracy = (TP + TN) / Total = Nombre de bonnes prédictions / Total
\`\`\`

**Exemple** : sur 1000 emails, le modèle en classe correctement 950 → Accuracy = 95%

✅ **Simple et intuitive**
❌ **PIÈGE : trompeuse sur les classes déséquilibrées !**

> Imagine un dataset de fraude : 99% des transactions sont légitimes, 1% sont des fraudes. Un modèle qui prédit TOUJOURS "pas fraude" a 99% d'accuracy... mais détecte 0 fraude. L'accuracy est inutile ici.

**Quand l'utiliser en pro** : uniquement quand les classes sont équilibrées (même nombre d'exemples par catégorie).

---

### Precision (Précision)

\`\`\`
Precision = TP / (TP + FP)
\`\`\`

**Parmi tous les cas que le modèle a prédit "positif", combien l'étaient vraiment ?**

Exemple détection de fraude :
- Modèle dit "fraude" 100 fois
- 80 étaient vraiment des fraudes, 20 étaient légitimes
- Precision = 80 / 100 = **80%**

✅ **Optimiser la precision** → réduire les fausses alarmes (FP)

**Quand l'utiliser en pro** :
- Système de recommandation (ne pas recommander des articles hors sujet)
- Détection de spam (ne pas bloquer d'emails légitimes)
- Publicité ciblée (ne pas dépenser de budget sur les mauvaises cibles)

---

### Recall / Sensibilité (Rappel)

\`\`\`
Recall = TP / (TP + FN)
\`\`\`

**Parmi tous les vrais positifs, combien le modèle en a-t-il détectés ?**

Exemple détection cancer :
- 100 vrais cas de cancer dans les données
- Le modèle en détecte 90, en rate 10
- Recall = 90 / 100 = **90%**

✅ **Optimiser le recall** → ne rater aucun cas positif (réduire les FN)

**Quand l'utiliser en pro** :
- Détection de cancer / maladie grave (rater un cas = grave)
- Détection de fraude (rater une fraude = perte financière)
- Détection d'anomalies industrielles (rater une panne = accident)

---

### F1-Score

\`\`\`
F1 = 2 × (Precision × Recall) / (Precision + Recall)
\`\`\`

Le F1-Score est la **moyenne harmonique** entre precision et recall. Il pénalise les cas extrêmes (ex: precision=100% et recall=1% → F1 très bas).

- F1 = 1.0 → parfait
- F1 = 0.0 → nul

✅ **Bon compromis quand les deux importent**
**Quand l'utiliser en pro** : classe déséquilibrée, quand precision ET recall comptent, comparaison de modèles.

---

### AUC-ROC — Area Under the Curve

La **courbe ROC** trace le Recall vs le taux de faux positifs pour tous les seuils de décision possibles.

**L'AUC** (aire sous cette courbe) mesure la capacité globale du modèle à distinguer les classes :
- **AUC = 1.0** → parfait
- **AUC = 0.5** → aléatoire (aussi bon qu'un tirage de pièce)
- **AUC = 0.8** → bon modèle

✅ **Avantage** : ne dépend pas d'un seuil de décision, comparable entre modèles
**Quand l'utiliser en pro** : scoring (credit scoring, scoring client), quand on veut évaluer la capacité de ranking du modèle.

---

### Le tableau de bord des métriques en pro

| Contexte | Métrique prioritaire | Pourquoi |
|----------|---------------------|---------|
| Classes équilibrées | Accuracy | Simple et représentative |
| Détection de maladie | **Recall** | Rater un cas = catastrophe |
| Anti-spam | **Precision** | Bloquer un email légitime = gênant |
| Fraude bancaire | **F1** ou **AUC** | Équilibre détection / fausses alarmes |
| Credit scoring | **AUC** | On veut un bon ranking |
| Recommandation | Precision@K | Top K résultats pertinents |`,
        links: [
          { label: 'Métriques de classification — scikit-learn', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics' },
          { label: 'AUC-ROC expliqué — Statquest', url: 'https://www.youtube.com/watch?v=4jRBRDbJemM' },
          { label: 'Precision vs Recall — Google ML Crash Course', url: 'https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall' },
        ],
      },
    ],
    exercises: [
      {
        title: "Détecter le spam — classification binaire complète",
        scenario: "Tu es data scientist dans une startup email. Ta mission : construire un modèle capable de détecter les emails spam et analyser ses performances avec toutes les métriques vues en cours.",
        steps: [
          {
            title: "Charger et explorer le dataset spam",
            instructions: `\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_breast_cancer

# On utilise le dataset cancer du sein (classification binaire réelle)
# 0 = malin (cancer), 1 = bénin (pas de cancer)
cancer = load_breast_cancer(as_frame=True)
df = cancer.frame

print("=== Aperçu ===")
print(df.head())
print(f"\\nNombre d'exemples : {len(df)}")
print(f"Nombre de features : {df.shape[1]-1}")

print("\\n=== Distribution des classes ===")
print(df['target'].value_counts())
print("0 = malin (cancer) | 1 = bénin (sain)")

# Visualiser la distribution
plt.figure(figsize=(6, 4))
df['target'].value_counts().plot(kind='bar', color=['#F3752B', '#59CD90'])
plt.title("Distribution des classes")
plt.xlabel("Classe (0=malin, 1=bénin)")
plt.ylabel("Nombre d'exemples")
plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
\`\`\``,
          },
          {
            title: "Entraîner et prédire",
            instructions: `\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X = df.drop('target', axis=1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
# stratify=y : s'assurer que le ratio de classes est préservé dans train et test

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

model = LogisticRegression(random_state=42, max_iter=10000)
model.fit(X_train_s, y_train)

y_pred = model.predict(X_test_s)
y_proba = model.predict_proba(X_test_s)[:, 1]  # Probabilité de la classe 1

print(f"Taille train : {len(X_train)}")
print(f"Taille test  : {len(X_test)}")
print("✅ Modèle entraîné !")
\`\`\``,
          },
          {
            title: "Analyser toutes les métriques",
            instructions: `\`\`\`python
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                              f1_score, roc_auc_score, confusion_matrix,
                              classification_report, RocCurveDisplay)

# === Métriques ===
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_proba)

print("=" * 45)
print(f"{'Accuracy':<15} : {accuracy:.3f} ({accuracy*100:.1f}%)")
print(f"{'Precision':<15} : {precision:.3f}")
print(f"{'Recall':<15} : {recall:.3f}")
print(f"{'F1-Score':<15} : {f1:.3f}")
print(f"{'AUC-ROC':<15} : {auc:.3f}")
print("=" * 45)

# === Matrice de confusion ===
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Prédit Malin', 'Prédit Bénin'],
            yticklabels=['Vrai Malin', 'Vrai Bénin'])
plt.title("Matrice de Confusion")
plt.tight_layout()
plt.show()

print("\\n=== Rapport complet ===")
print(classification_report(y_test, y_pred, target_names=['Malin', 'Bénin']))

# === Courbe ROC ===
RocCurveDisplay.from_predictions(y_test, y_proba)
plt.title("Courbe ROC")
plt.plot([0, 1], [0, 1], 'k--', label='Aléatoire')
plt.legend()
plt.tight_layout()
plt.show()
\`\`\`

**Questions de réflexion :**
- Regardez les FN (Vrai Malin / Prédit Bénin) dans la matrice. Combien de cancers le modèle a-t-il ratés ?
- Serait-il acceptable de rater ces cas dans un contexte médical réel ?
- Que faudrait-il changer pour réduire ces FN (hint : recall)?`,
          },
        ],
        hints: [
          "Le 'stratify=y' dans train_test_split est important pour les classes déséquilibrées.",
          "predict_proba retourne les probabilités pour chaque classe — la colonne [:, 1] est la proba de la classe positive.",
          "Pour réduire les FN en médecine : baisser le seuil de décision (ex: classer comme cancer si proba > 0.3 au lieu de 0.5).",
        ],
        solution: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

cancer = load_breast_cancer(as_frame=True)
df = cancer.frame
X = df.drop('target', axis=1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

model = LogisticRegression(random_state=42, max_iter=10000).fit(X_train_s, y_train)
y_pred = model.predict(X_test_s)
y_proba = model.predict_proba(X_test_s)[:, 1]

print(f"Accuracy : {accuracy_score(y_test, y_pred):.3f}")
print(f"Precision: {precision_score(y_test, y_pred):.3f}")
print(f"Recall   : {recall_score(y_test, y_pred):.3f}")
print(f"F1       : {f1_score(y_test, y_pred):.3f}")
print(f"AUC      : {roc_auc_score(y_test, y_proba):.3f}")`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 5 — Le Clustering
  // ═══════════════════════════════════════════════════════════
  {
    id: 305, level: 'Intermédiaire', icon: '🫧', title: "Le Clustering",
    desc: "Regrouper des données similaires sans labels. K-Means, DBSCAN, métriques d'évaluation et cas d'usage pro.",
    color: 'green', colorHex: '#59CD90',
    lessons: [
      {
        title: "Qu'est-ce que le clustering ?",
        content: `### Définition

Le **clustering** (ou partitionnement) est une technique d'apprentissage **non supervisé** qui consiste à regrouper automatiquement des données similaires en **groupes homogènes** (appelés clusters), sans connaître les groupes à l'avance.

\`\`\`
Avant clustering :        Après clustering :
  · · · · · · ·             🟢 🟢 🔵 🟣
  · · · · · · ·     →       🟢 🔵 🔵 🟣
  · · · · · · ·             🟢 🔵 🟣 🟣
\`\`\`

La différence fondamentale avec la classification :
| | Classification | Clustering |
|--|---------------|-----------|
| Labels | ✅ Requis (supervisé) | ❌ Aucun (non supervisé) |
| Groupes | Connus à l'avance | Découverts automatiquement |
| Évaluation | Facile (compare aux vrais labels) | Plus difficile |

### Cas d'usage professionnels

| Secteur | Application | Ce qu'on découvre |
|---------|-------------|-------------------|
| **Marketing** | Segmentation clients | Groupes de clients similaires pour personnaliser |
| **E-commerce** | Recommandation | Utilisateurs similaires (collaborative filtering) |
| **Santé** | Sous-types de maladie | Groupes de patients répondant différemment aux traitements |
| **Cybersécurité** | Détection d'anomalies | Comportements inhabituels = hors de tous les clusters |
| **NLP** | Clustering de documents | Regrouper des articles similaires |
| **Logistique** | Optimisation de tournées | Regrouper des livraisons géographiquement proches |

### K-Means — l'algorithme le plus populaire

**Principe** : regrouper les données en **K groupes** en minimisant la distance entre chaque point et le centre de son cluster.

**Algorithme :**
1. Choisir K (nombre de clusters à créer)
2. Placer K centroïdes aléatoirement
3. Assigner chaque point au centroïde le plus proche
4. Recalculer chaque centroïde (moyenne de ses points)
5. Répéter 3-4 jusqu'à convergence

\`\`\`
Étape 1       Étape 2       Étape 3 (convergé)
  K centroïdes   Assign        Centroïdes stables
  aléatoires     points
  ★ · · ·       🟢★ 🔵         🟢★ 🔵★
  · · ★ ·   →  🟢 🔵 🔵  →    🟢 🔵 🔵
  · ★ · ·       🟢🟣 🔵        🟣★ 🔵
\`\`\`

**Limites de K-Means :**
- Il faut choisir K à l'avance
- Sensible aux outliers (un point isolé peut créer un cluster à lui seul)
- Suppose des clusters sphériques et de taille similaire

### DBSCAN — pour les clusters de forme complexe

**DBSCAN** (Density-Based Spatial Clustering of Applications with Noise) identifie des clusters basés sur la **densité** de points, pas sur des centroïdes.

✅ **Avantages** : clusters de forme quelconque, détecte automatiquement les outliers (points de "bruit"), pas besoin de spécifier K
❌ **Inconvénients** : sensible aux paramètres (epsilon, min_samples), moins efficace sur des données de haute dimension`,
        links: [
          { label: 'Clustering — scikit-learn', url: 'https://scikit-learn.org/stable/modules/clustering.html' },
          { label: 'K-Means expliqué visuellement', url: 'https://www.naftaliharris.com/blog/visualizing-k-means-clustering/' },
          { label: 'DBSCAN expliqué', url: 'https://www.youtube.com/watch?v=RDZUdRSDOok' },
        ],
      },
      {
        title: "Les métriques du clustering",
        content: `### Le défi de l'évaluation non supervisée

En classification, c'est facile : tu compares les prédictions aux vrais labels. En clustering, **il n'y a pas de vrais labels de référence**. Donc comment savoir si les clusters sont "bons" ?

On utilise deux types de métriques :

**1. Métriques internes** : évaluent la qualité des clusters sans labels (inertie, silhouette...)
**2. Métriques externes** : comparent aux labels si on en a quelques-uns (ARI, NMI...)

---

### Inertie (Within-Cluster Sum of Squares — WCSS)

\`\`\`
Inertie = Σ (distance² entre chaque point et son centroïde)
\`\`\`

**Interprétation :**
- Inertie **faible** → points proches de leur centroïde → clusters compacts ✅
- Inertie **élevée** → points dispersés dans leur cluster ❌

**Limite** : l'inertie diminue TOUJOURS quand K augmente. Avec K = nombre de points, chaque point est son propre cluster → inertie = 0. Inutile !

**Utilisation pro** : la **méthode du coude (Elbow Method)** — on trace l'inertie en fonction de K et on cherche le "coude" (point où l'amélioration ralentit).

\`\`\`
Inertie
 │
 │ ●
 │   ●
 │     ●
 │       ●  ← Coude ici → K=4 est le bon choix
 │          ● ●
 └──────────────── K
   2  3  4  5  6
\`\`\`

---

### Score de Silhouette

\`\`\`
Silhouette(i) = (b - a) / max(a, b)

a = distance moyenne entre i et les autres points du même cluster
b = distance moyenne entre i et les points du cluster le plus proche
\`\`\`

**Interprétation :**
- **Silhouette ≈ +1** → le point est bien dans son cluster, loin des autres clusters ✅
- **Silhouette ≈ 0** → le point est à la frontière entre deux clusters
- **Silhouette < 0** → le point est peut-être dans le mauvais cluster ❌

Le **score de silhouette moyen** (entre -1 et 1) évalue la qualité globale du clustering.

**En pratique pro :**
- > 0.7 → Excellent clustering
- 0.5 – 0.7 → Raisonnable
- 0.25 – 0.5 → Faible
- < 0.25 → Mauvais ou données peu séparables

---

### Davies-Bouldin Index

\`\`\`
DBI = moyenne des ratios (distance_intra_cluster / distance_inter_cluster)
\`\`\`

- **DBI faible** → clusters compacts et bien séparés ✅
- **DBI élevé** → clusters diffus ou trop proches ❌

---

### Tableau récapitulatif des métriques clustering

| Métrique | Besoin de labels ? | Idéal | Usage |
|---------|-------------------|-------|-------|
| **Inertie** | Non | Faible | Choisir K (méthode du coude) |
| **Silhouette** | Non | Proche de 1 | Évaluer la qualité globale |
| **Davies-Bouldin** | Non | Faible | Comparaison de configurations |
| **ARI** | Oui (partiel) | Proche de 1 | Benchmark si quelques labels |

> 💼 **Workflow pro** : Utilise la **méthode du coude** pour trouver K, puis **le score de silhouette** pour valider que le clustering est de bonne qualité. Complète avec une analyse métier des clusters trouvés.`,
        links: [
          { label: 'Score de silhouette — scikit-learn', url: 'https://scikit-learn.org/stable/modules/clustering.html#silhouette-coefficient' },
          { label: 'Méthode du coude expliquée', url: 'https://www.youtube.com/watch?v=4b5d3muPQmA' },
        ],
      },
    ],
    exercises: [
      {
        title: "Segmentation clients avec K-Means",
        scenario: "Tu travailles pour une boutique en ligne. Le responsable marketing veut personnaliser les campagnes email selon le profil des clients. Ta mission : segmenter automatiquement la base clients et interpréter les groupes trouvés.",
        steps: [
          {
            title: "Créer et explorer le dataset clients",
            instructions: `\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
n = 500

# Générer 4 types de clients simulés
clients_data = {
    'age': np.concatenate([
        np.random.normal(25, 3, 100),   # Jeunes
        np.random.normal(35, 4, 150),   # Adultes actifs
        np.random.normal(55, 5, 150),   # Seniors
        np.random.normal(45, 4, 100),   # Cadres
    ]),
    'revenu_annuel_k': np.concatenate([
        np.random.normal(22, 4, 100),   # Faible revenu
        np.random.normal(45, 8, 150),   # Revenu moyen
        np.random.normal(38, 6, 150),   # Revenu moyen-haut
        np.random.normal(80, 12, 100),  # Haut revenu
    ]),
    'score_depenses': np.concatenate([
        np.random.normal(75, 10, 100),  # Dépensiers
        np.random.normal(50, 12, 150),  # Modérés
        np.random.normal(35, 10, 150),  # Économes
        np.random.normal(65, 10, 100),  # Dépensiers premium
    ]),
}

df = pd.DataFrame(clients_data).clip(lower=0)
print("=== Dataset clients ===")
print(df.head())
print(f"\\nNombre de clients : {len(df)}")
print("\\n=== Statistiques ===")
print(df.describe().round(1))

# Visualisation
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
for ax, col in zip(axes, df.columns):
    df[col].hist(bins=30, ax=ax, color='#3FA7D6', alpha=0.7)
    ax.set_title(col)
plt.tight_layout()
plt.show()
\`\`\``,
          },
          {
            title: "Trouver le bon K avec la méthode du coude",
            instructions: `\`\`\`python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Normaliser les données (important pour K-Means)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

# Tester K de 2 à 10
inertias = []
silhouettes = []
K_range = range(2, 11)

for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    inertias.append(km.inertia_)
    silhouettes.append(silhouette_score(X_scaled, km.labels_))

# Graphique du coude + silhouette
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

ax1.plot(K_range, inertias, 'o-', color='#F3752B', lw=2, ms=8)
ax1.set_title('Méthode du Coude (Elbow Method)')
ax1.set_xlabel('Nombre de clusters K')
ax1.set_ylabel('Inertie')
ax1.grid(True, alpha=0.3)

ax2.plot(K_range, silhouettes, 's-', color='#59CD90', lw=2, ms=8)
ax2.set_title('Score de Silhouette')
ax2.set_xlabel('Nombre de clusters K')
ax2.set_ylabel('Silhouette Score')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("\\n=== Scores de silhouette ===")
for k, s in zip(K_range, silhouettes):
    print(f"K={k} : silhouette = {s:.3f}")
\`\`\`

**Observe les graphiques :** Où est le "coude" ? Quel K maximise le score de silhouette ?`,
          },
          {
            title: "Appliquer K-Means et interpréter les clusters",
            instructions: `\`\`\`python
# Appliquer avec le K optimal (probablement 4)
K_OPTIMAL = 4
km = KMeans(n_clusters=K_OPTIMAL, random_state=42, n_init=10)
df['cluster'] = km.fit_predict(X_scaled)

print(f"=== K-Means avec K={K_OPTIMAL} ===")
print(f"Score de silhouette : {silhouette_score(X_scaled, df['cluster']):.3f}")

# Profil de chaque cluster
print("\\n=== Profil moyen par cluster ===")
profil = df.groupby('cluster')[['age', 'revenu_annuel_k', 'score_depenses']].mean().round(1)
print(profil)

# Distribution des clusters
print("\\n=== Taille des clusters ===")
print(df['cluster'].value_counts().sort_index())

# Visualisation 2D
colors = ['#59CD90', '#3FA7D6', '#AA7DCE', '#F3752B']
plt.figure(figsize=(10, 6))
for cluster_id in range(K_OPTIMAL):
    mask = df['cluster'] == cluster_id
    plt.scatter(
        df.loc[mask, 'revenu_annuel_k'],
        df.loc[mask, 'score_depenses'],
        c=colors[cluster_id], alpha=0.7, s=60,
        label=f'Cluster {cluster_id}'
    )
plt.xlabel('Revenu annuel (K€)')
plt.ylabel('Score de dépenses')
plt.title(f'Segmentation clients — K-Means (K={K_OPTIMAL})')
plt.legend()
plt.tight_layout()
plt.show()

# Nommer les clusters (analyse métier)
print("\\n=== Interprétation métier ===")
for idx, row in profil.iterrows():
    if row['revenu_annuel_k'] > 60:
        nom = "💎 Clients Premium"
    elif row['score_depenses'] > 60:
        nom = "🛍️ Dépensiers"
    elif row['score_depenses'] < 40:
        nom = "💰 Économes"
    else:
        nom = "👔 Standard"
    print(f"Cluster {idx} ({nom}) : âge={row['age']:.0f}ans, revenu={row['revenu_annuel_k']:.0f}K€, dépenses={row['score_depenses']:.0f}/100")
\`\`\``,
          },
        ],
        hints: [
          "Toujours normaliser les données avant K-Means — sinon les features avec les plus grandes valeurs dominent le calcul de distance.",
          "La méthode du coude est subjective. Combine-la avec le score de silhouette pour plus de rigueur.",
          "K=4 devrait bien fonctionner car le dataset a été généré avec 4 profils distincts.",
          "L'interprétation métier des clusters est aussi importante que les métriques techniques — c'est ce que la direction regardera.",
        ],
        solution: `import numpy as np, pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

np.random.seed(42)
df = pd.DataFrame({
    'age': np.concatenate([np.random.normal(25,3,100), np.random.normal(35,4,150),
                           np.random.normal(55,5,150), np.random.normal(45,4,100)]),
    'revenu_annuel_k': np.concatenate([np.random.normal(22,4,100), np.random.normal(45,8,150),
                                        np.random.normal(38,6,150), np.random.normal(80,12,100)]),
    'score_depenses': np.concatenate([np.random.normal(75,10,100), np.random.normal(50,12,150),
                                       np.random.normal(35,10,150), np.random.normal(65,10,100)]),
}).clip(lower=0)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(df)

km = KMeans(n_clusters=4, random_state=42, n_init=10)
df['cluster'] = km.fit_predict(X_scaled)
print(f"Silhouette : {silhouette_score(X_scaled, df['cluster']):.3f}")
print(df.groupby('cluster').mean().round(1))`,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE 6 — Choisir ses métriques
  // ═══════════════════════════════════════════════════════════
  {
    id: 306, level: 'Avancé', icon: '🎯', title: "Choisir ses métriques comme un pro",
    desc: "Guide pratique pour choisir la bonne métrique selon le contexte business — le choix le plus important et le plus sous-estimé en ML.",
    color: 'purple', colorHex: '#AA7DCE',
    lessons: [
      {
        title: "Pourquoi le choix des métriques est crucial",
        content: `### La métrique mal choisie peut tout gâcher

Un modèle excellent selon une métrique peut être catastrophique en production. Voici des exemples réels de mauvais choix.

#### Cas 1 — Le piège de l'accuracy (fraude bancaire)

Dataset : 99 000 transactions légitimes, 1 000 fraudes.

Un modèle "idiot" qui prédit TOUJOURS "légitime" :
- **Accuracy : 99%** ← Semble excellent !
- **Recall : 0%** ← Rate 100% des fraudes
- **Pertes : 100% des fraudes non détectées**

**Leçon** : avec des classes déséquilibrées, l'accuracy est inutile.

#### Cas 2 — Optimiser le recall à l'excès (spam)

Un modèle qui classe TOUT en spam pour ne rien rater :
- **Recall : 100%** ← Rate 0 spam !
- **Precision : 1%** ← 99% des emails légitimes bloqués
- **Résultat** : tous les emails importants dans les spams

**Leçon** : optimiser une seule métrique sans contrainte peut créer des monstres.

### La règle d'or : aligner la métrique sur le coût des erreurs

Avant de choisir une métrique, demande-toi :

1. **Quelle erreur coûte le plus cher ?**
   - FP (fausse alarme) ?
   - FN (cas manqué) ?
   - Les deux également ?

2. **Quel est l'équilibre des classes ?**
   - Équilibré → accuracy OK
   - Déséquilibré → F1, AUC, precision ou recall

3. **Est-ce qu'on a besoin d'un score ou d'une décision binaire ?**
   - Score (ranking) → AUC
   - Décision → precision, recall, F1

### L'arbre de décision des métriques

\`\`\`
Quel type de problème ?
       │
  ┌────┴────────────┐
Régression     Classification
  │                 │
MAE / RMSE     Classes équilibrées ?
R²              │
           ┌────┴──────────┐
          OUI             NON (déséquilibre)
           │               │
        Accuracy        FN coûteux ?
                     ┌────┴──────┐
                    OUI         NON
                     │           │
                  Recall    FP coûteux ?
                         ┌────┴──────┐
                        OUI         NON
                         │           │
                      Precision   F1 / AUC
\`\`\``,
        links: [
          { label: 'Choisir ses métriques — scikit-learn guide', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html' },
          { label: 'Precision vs Recall tradeoff', url: 'https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall' },
        ],
      },
      {
        title: "Guide par secteur d'activité",
        content: `### Les métriques par contexte professionnel

#### 🏥 Santé — médecine, diagnostic

**Priorité absolue : Recall (ne rater aucun cas)**

| Application | Métrique principale | Raison |
|-------------|--------------------|----|
| Détection cancer | Recall ≥ 0.95 | Un FN = cancer non traité = mort |
| Diagnostic maladie rare | Recall + F1 | Maladie rare = classe déséquilibrée |
| Triage urgences | AUC | Ranking des patients par criticité |

> En santé, on accepte des FP (fausses alarmes → bilan complémentaire) plutôt que des FN (cas manqués → décès).

---

#### 🏦 Finance — banque, assurance, fintech

| Application | Métrique principale | Raison |
|-------------|--------------------|----|
| Détection fraude | F1 ou AUC | Équilibre détection / fausses alarmes |
| Credit scoring | AUC | Ranking des risques |
| Prévision de défaut | Recall + contrainte FPR | Rater un défaut = perte, fausse alarme = client perdu |
| Prévision cours boursier | MAE, RMSE | Régression |

---

#### 📧 Marketing — CRM, email, pub

| Application | Métrique principale | Raison |
|-------------|--------------------|----|
| Détection spam | Precision | FP inacceptable (bloquer un email légitime) |
| Churn prediction | Recall + ROI | Rater un fuyard = perte client |
| Recommandation produit | Precision@K | Top K recommandations pertinentes |
| LTV prediction | MAE, R² | Régression sur la valeur client |

---

#### 🏭 Industrie — maintenance, qualité

| Application | Métrique principale | Raison |
|-------------|--------------------|----|
| Détection panne machine | Recall | Rater une panne = arrêt de production |
| Contrôle qualité | F1 | FP (arrêter une bonne machine) et FN (passer une pièce défectueuse) coûtent chers |
| Prévision consommation énergie | MAPE, RMSE | Régression |

---

### Comment reporter les métriques en entreprise

**À l'équipe technique :** toutes les métriques (confusion matrix, classification report, AUC, RMSE...)

**Au management / client :**
- Simplifie au maximum
- Traduis en impact business
- "Notre modèle détecte 94% des fraudes, avec seulement 3% de fausses alarmes, soit 2M€ de fraudes évitées par mois"

**Évite de dire** : "Notre F1-score est de 0.87"
**Dis plutôt** : "On capture 87% des cas de fraude avec 12% de fausses alertes"

### Le problème du seuil de décision

Les modèles de classification produisent des **probabilités** (ex: 0.73 = 73% de chance que ce soit une fraude). La décision finale dépend d'un **seuil** (threshold).

- Seuil par défaut : 0.5 (standard)
- Seuil bas (ex: 0.3) → Plus de recall, moins de precision
- Seuil haut (ex: 0.7) → Plus de precision, moins de recall

**En production**, le seuil est souvent calibré sur la contrainte business, pas sur les métriques par défaut.`,
        links: [
          { label: 'Calibration du seuil de décision', url: 'https://scikit-learn.org/stable/modules/calibration.html' },
          { label: 'Precision-Recall tradeoff — article', url: 'https://machinelearningmastery.com/threshold-moving-for-imbalanced-classification/' },
        ],
      },
    ],
    exercises: [
      {
        title: "Analyse coût-bénéfice des métriques",
        scenario: "Trois entreprises te présentent leurs modèles ML. Pour chacune, tu dois analyser les métriques, identifier ce qui cloche et proposer la métrique adaptée.",
        steps: [
          {
            title: "Cas 1 — Hôpital : modèle de détection de sepsis",
            instructions: `Le sepsis est une infection généralisée mortelle si non traitée rapidement. Un hôpital a développé un modèle de détection.

**Résultats rapportés :**
\`\`\`
Accuracy  : 96%
Precision : 78%
Recall    : 52%
F1-Score  : 0.62
\`\`\`

**Matrice de confusion :**
\`\`\`
              Prédit Sain  Prédit Sepsis
Vrai Sain  |     9 500   |      200     |
Vrai Sepsis|       240   |      260     |
\`\`\`

Réponds à ces questions dans ton notebook :
1. Combien de vrais cas de sepsis le modèle rate-t-il ?
2. L'accuracy de 96% est-elle trompeuse ? Pourquoi ?
3. Quelle métrique devrait être la priorité absolue ici ?
4. Le recall de 52% est-il acceptable en contexte médical ?

\`\`\`python
# Calcule les métriques toi-même
TP = 260   # Vrais sepsis détectés
FN = 240   # Sepsis ratés (DANGEREUX)
FP = 200   # Fausses alarmes (coûteux mais pas mortel)
TN = 9500  # Vrais sains

total = TP + FN + FP + TN

accuracy = (TP + TN) / total
precision = TP / (TP + FP)
recall = TP / (TP + FN)
f1 = 2 * precision * recall / (precision + recall)

print(f"Accuracy  : {accuracy:.2%}")
print(f"Precision : {precision:.2%}")
print(f"Recall    : {recall:.2%}")
print(f"F1        : {f1:.2f}")

print(f"\\nSepsis ratés : {FN} patients → conséquences potentiellement mortelles")
print(f"Fausses alarmes : {FP} patients → examens complémentaires inutiles")
\`\`\``,
          },
          {
            title: "Cas 2 — Banque : credit scoring",
            instructions: `Une banque veut prédire si un client va rembourser son crédit. Elle a 2 modèles :

\`\`\`python
import numpy as np
from sklearn.metrics import roc_auc_score, f1_score

# Vraies valeurs (0=défaut, 1=remboursé)
np.random.seed(42)
y_true = np.array([0]*200 + [1]*800)  # 20% de défauts

# Modèle A : conservateur (peu de faux négatifs, beaucoup de faux positifs)
# Modèle B : agressif (accepte plus de risques)
np.random.seed(0)
y_proba_A = np.where(y_true == 1,
                     np.random.beta(8, 2, len(y_true)),
                     np.random.beta(2, 5, len(y_true)))
y_proba_B = np.where(y_true == 1,
                     np.random.beta(6, 3, len(y_true)),
                     np.random.beta(3, 4, len(y_true)))

# Seuil 0.5
y_pred_A = (y_proba_A > 0.5).astype(int)
y_pred_B = (y_proba_B > 0.5).astype(int)

print("=== Comparaison des deux modèles (seuil=0.5) ===")
print(f"{'Métrique':<15} {'Modèle A':>12} {'Modèle B':>12}")
print(f"{'AUC':<15} {roc_auc_score(y_true, y_proba_A):>12.3f} {roc_auc_score(y_true, y_proba_B):>12.3f}")
print(f"{'F1':<15} {f1_score(y_true, y_pred_A):>12.3f} {f1_score(y_true, y_pred_B):>12.3f}")

# Analyse du coût
taux_interet = 0.05  # 5% de profit par crédit remboursé
perte_defaut = 0.40  # 40% de perte par défaut

from sklearn.metrics import confusion_matrix
for nom, y_pred in [("Modèle A", y_pred_A), ("Modèle B", y_pred_B)]:
    cm = confusion_matrix(y_true, y_pred)
    TN, FP, FN, TP = cm.ravel()
    profit = TP * taux_interet - FN * perte_defaut - FP * 0  # FP = crédit refusé = 0 gain
    print(f"\\n{nom} :")
    print(f"  Crédits accordés (TP+FP) : {TP+FP} | Défauts non détectés (FN) : {FN}")
    print(f"  Profit estimé (simplifié) : {profit:.2f} unités")
\`\`\`

**Questions :** Quel modèle choisirais-tu ? L'AUC ou le profit simulé est-il plus pertinent ?`,
          },
          {
            title: "Cas 3 — Jouer avec le seuil de décision",
            instructions: `Reprends le modèle de classification du module précédent (cancer) et explore l'effet du seuil :

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score, f1_score

cancer = load_breast_cancer(as_frame=True)
df = cancer.frame
X = df.drop('target', axis=1)
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)
model = LogisticRegression(random_state=42, max_iter=10000).fit(X_train_s, y_train)
y_proba = model.predict_proba(X_test_s)[:, 1]

# Tester différents seuils
thresholds = np.arange(0.1, 1.0, 0.05)
precisions, recalls, f1s = [], [], []

for t in thresholds:
    y_pred_t = (y_proba >= t).astype(int)
    if y_pred_t.sum() == 0:
        continue
    precisions.append(precision_score(y_test, y_pred_t, zero_division=0))
    recalls.append(recall_score(y_test, y_pred_t, zero_division=0))
    f1s.append(f1_score(y_test, y_pred_t, zero_division=0))

thresholds_valid = thresholds[:len(precisions)]

plt.figure(figsize=(10, 5))
plt.plot(thresholds_valid, precisions, 'o-', color='#3FA7D6', label='Precision')
plt.plot(thresholds_valid, recalls, 's-', color='#F3752B', label='Recall')
plt.plot(thresholds_valid, f1s, '^-', color='#59CD90', label='F1')
plt.axvline(x=0.5, color='gray', linestyle='--', label='Seuil=0.5 (défaut)')
plt.xlabel('Seuil de décision')
plt.ylabel('Score')
plt.title('Impact du seuil sur precision / recall / F1')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

print("\\nConclusion : dans un contexte médical, on choisirait un seuil BAS (~0.3)")
print("pour maximiser le recall (ne rater aucun cancer), même si la precision baisse.")
\`\`\``,
          },
        ],
        hints: [
          "Cas 1 : avec 500 vrais cas de sepsis et recall=52%, combien de patients en danger sont ratés ?",
          "Cas 2 : l'AUC mesure la capacité de ranking, pas la performance à un seuil donné — utile pour comparer des modèles.",
          "Cas 3 : baisser le seuil → plus de recall, moins de precision. C'est le fameux precision-recall tradeoff.",
        ],
        solution: `# Cas 1 — réponses
TP, FN, FP, TN = 260, 240, 200, 9500
recall = TP / (TP + FN)
print(f"Sepsis ratés : {FN} ({FN/(TP+FN):.0%} des vrais cas)")
print(f"Recall = {recall:.0%} → INACCEPTABLE en contexte médical, doit être > 95%")
print("Métrique prioritaire : Recall avec contrainte precision > 50%")`,
      },
    ],
  },

  // ─── MODULE 307 ───────────────────────────────────────────────────────────
  {
    id: 307,
    level: 'Débutant',
    icon: '🔍',
    title: 'Préparer ses données',
    desc: 'Nettoyage, exploration (EDA) et traitement des valeurs manquantes — les fondations de tout projet ML.',
    color: 'green',
    colorHex: '#59CD90',
    lessons: [
      {
        title: 'Pourquoi la préparation des données ?',
        content: `## "Garbage in, garbage out"

Le modèle ML le plus sophistiqué ne peut rien faire avec des données sales. En pratique, **60 à 80 % du temps** d'un data scientist est consacré à préparer les données.

### Les problèmes courants

| Problème | Exemple | Impact |
|----------|---------|--------|
| Valeurs manquantes | NaN dans une colonne âge | Erreur d'entraînement |
| Doublons | Même ligne deux fois | Biais du modèle |
| Types incorrects | Âge stocké en string | Impossibilité de calculer |
| Outliers | Salaire = 999 999 999 | Fausse la moyenne/variance |
| Encodage incohérent | "oui", "Oui", "OUI" | 3 catégories au lieu d'1 |

### L'Analyse Exploratoire (EDA)

Avant tout traitement, il faut **comprendre** ses données :

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('data.csv')

# Vue d'ensemble
print(df.shape)          # (lignes, colonnes)
print(df.dtypes)         # types de chaque colonne
print(df.describe())     # stats descriptives (count, mean, std, min, max…)
print(df.isnull().sum()) # nombre de valeurs manquantes par colonne
\`\`\`

### Distribution des données

\`\`\`python
# Histogramme pour les colonnes numériques
df.hist(figsize=(12, 8))
plt.tight_layout()
plt.show()

# Valeurs uniques pour les colonnes catégorielles
for col in df.select_dtypes(include='object').columns:
    print(f"{col}: {df[col].nunique()} valeurs uniques")
    print(df[col].value_counts().head())
    print()
\`\`\`

### Corrélations

\`\`\`python
# Matrice de corrélation
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(numeric_only=True), annot=True, fmt='.2f', cmap='coolwarm')
plt.title('Corrélations entre variables')
plt.show()
\`\`\``,
        links: [
          { label: 'Pandas documentation', url: 'https://pandas.pydata.org/docs/' },
          { label: 'Seaborn — visualisation statistique', url: 'https://seaborn.pydata.org/' },
        ],
      },
      {
        title: 'Valeurs manquantes & nettoyage',
        content: `## Traiter les valeurs manquantes

### Les stratégies

**1. Suppression** — quand il y en a très peu (< 5 %)
\`\`\`python
df_clean = df.dropna()                    # supprime toutes les lignes avec NaN
df_clean = df.dropna(subset=['colonne'])  # seulement si NaN dans 'colonne'
\`\`\`

**2. Imputation par une constante**
\`\`\`python
df['age'].fillna(0, inplace=True)         # remplace par 0
df['ville'].fillna('Inconnu', inplace=True)
\`\`\`

**3. Imputation par la médiane/moyenne** — pour les numériques
\`\`\`python
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy='median')  # ou 'mean', 'most_frequent'
df[['age', 'salaire']] = imputer.fit_transform(df[['age', 'salaire']])
\`\`\`

> **Préférer la médiane à la moyenne** pour les colonnes avec des outliers (revenus, prix).

### Nettoyage des types

\`\`\`python
# Corriger les types
df['date'] = pd.to_datetime(df['date'])
df['prix'] = pd.to_numeric(df['prix'], errors='coerce')  # NaN si impossible

# Nettoyer les strings
df['categorie'] = df['categorie'].str.strip().str.lower()

# Supprimer les doublons
df = df.drop_duplicates()
print(f"Doublons supprimés : {len(df_orig) - len(df)}")
\`\`\`

### Outliers

\`\`\`python
# Méthode IQR (Interquartile Range)
Q1 = df['salaire'].quantile(0.25)
Q3 = df['salaire'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

# Voir les outliers
outliers = df[(df['salaire'] < lower) | (df['salaire'] > upper)]
print(f"Outliers détectés : {len(outliers)}")

# Options : supprimer, cliper, ou garder selon le contexte
df['salaire'] = df['salaire'].clip(lower, upper)
\`\`\``,
        links: [
          { label: 'SimpleImputer — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'EDA sur un dataset réel',
        scenario: 'Tu reçois un dataset de ventes avec des colonnes manquantes, des doublons et des types incorrects. Objectif : le nettoyer et comprendre sa structure.',
        steps: [
          {
            title: 'Installer les dépendances & charger les données',
            instructions: `\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Créer un dataset simulé avec des problèmes réalistes
np.random.seed(42)
n = 500

df = pd.DataFrame({
    'id': range(n),
    'age': np.random.choice([np.nan, 25, 30, 35, 40, 45, 50, 200], n,
                             p=[0.1, 0.15, 0.2, 0.2, 0.15, 0.1, 0.05, 0.05]),
    'salaire': np.random.choice([np.nan, 30000, 45000, 60000, 80000, 999999], n,
                                 p=[0.08, 0.2, 0.3, 0.25, 0.12, 0.05]),
    'ville': np.random.choice(['Paris', 'paris', 'PARIS', 'Lyon', 'lyon', None], n,
                               p=[0.2, 0.1, 0.05, 0.25, 0.1, 0.3]),
    'score': np.random.normal(70, 15, n),
    'categorie': np.random.choice(['A', 'B', 'C', None], n, p=[0.3, 0.3, 0.3, 0.1]),
})

# Ajouter des doublons
df = pd.concat([df, df.sample(20)], ignore_index=True)

print("Shape:", df.shape)
print("\\nValeurs manquantes:")
print(df.isnull().sum())
print("\\nTypes:")
print(df.dtypes)
\`\`\``,
          },
          {
            title: 'Exploration visuelle',
            instructions: `\`\`\`python
# Stats descriptives
print(df.describe())

# Distribution des colonnes numériques
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
df['age'].hist(ax=axes[0], bins=20)
axes[0].set_title('Distribution Age')
df['salaire'].hist(ax=axes[1], bins=20)
axes[1].set_title('Distribution Salaire')
df['score'].hist(ax=axes[2], bins=20)
axes[2].set_title('Distribution Score')
plt.tight_layout()
plt.show()

# Valeurs de 'ville'
print("\\nValeurs uniques 'ville':", df['ville'].unique())
\`\`\``,
          },
          {
            title: 'Nettoyage complet',
            instructions: `\`\`\`python
df_clean = df.copy()

# 1. Supprimer les doublons
before = len(df_clean)
df_clean = df_clean.drop_duplicates()
print(f"Doublons supprimés : {before - len(df_clean)}")

# 2. Normaliser 'ville'
df_clean['ville'] = df_clean['ville'].str.strip().str.lower()
df_clean['ville'].fillna('inconnu', inplace=True)
print("Villes après nettoyage:", df_clean['ville'].unique())

# 3. Corriger les outliers d'âge (âge > 120 = erreur)
df_clean.loc[df_clean['age'] > 120, 'age'] = np.nan

# 4. Imputer les valeurs manquantes
from sklearn.impute import SimpleImputer

num_cols = ['age', 'salaire', 'score']
imputer = SimpleImputer(strategy='median')
df_clean[num_cols] = imputer.fit_transform(df_clean[num_cols])

# 5. Imputer les catégorielles
df_clean['categorie'].fillna(df_clean['categorie'].mode()[0], inplace=True)
df_clean['ville'].fillna('inconnu', inplace=True)

# 6. Traiter les outliers de salaire
Q1, Q3 = df_clean['salaire'].quantile([0.25, 0.75])
IQR = Q3 - Q1
df_clean['salaire'] = df_clean['salaire'].clip(Q1 - 1.5*IQR, Q3 + 1.5*IQR)

print("\\nAprès nettoyage:")
print(df_clean.isnull().sum())
print(df_clean.describe())
\`\`\``,
          },
        ],
        hints: [
          'La médiane est plus robuste que la moyenne pour les données avec outliers',
          'Toujours normaliser les strings avant de compter les catégories uniques',
          'Inspecter visuellement avant de décider quoi faire des outliers',
        ],
        solution: `# Résumé du pipeline de nettoyage
def clean_dataframe(df):
    df = df.copy()
    df = df.drop_duplicates()
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.strip().str.lower()
        df[col].fillna('inconnu', inplace=True)
    from sklearn.impute import SimpleImputer
    num_cols = df.select_dtypes(include='number').columns.tolist()
    df[num_cols] = SimpleImputer(strategy='median').fit_transform(df[num_cols])
    return df`,
      },
    ],
  },

  // ─── MODULE 308 ───────────────────────────────────────────────────────────
  {
    id: 308,
    level: 'Intermédiaire',
    icon: '✅',
    title: 'Valider ses modèles',
    desc: 'Cross-validation, split train/val/test, courbes d\'apprentissage — éviter le surapprentissage.',
    color: 'blue',
    colorHex: '#3FA7D6',
    lessons: [
      {
        title: 'Le problème du surapprentissage',
        content: `## Overfitting vs Underfitting

### Le problème central

Un modèle ML peut apprendre **par cœur** les données d'entraînement sans comprendre les patterns réels.

\`\`\`
          Underfitting        Bon équilibre       Overfitting
              |                    |                   |
         ~~~~~~~~~~           /‾‾‾‾‾‾‾\\           /\\/\\/\\/\\
          trop simple           juste bien         trop complexe
     erreur train : haute   erreur train : ok   erreur train : ~0
     erreur test  : haute   erreur test  : ok   erreur test  : haute
\`\`\`

### La règle d'or : toujours évaluer sur des données non vues

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier()
model.fit(X_train, y_train)

train_score = model.score(X_train, y_train)
test_score  = model.score(X_test, y_test)

print(f"Train accuracy : {train_score:.3f}")
print(f"Test accuracy  : {test_score:.3f}")
# Si train >> test → overfitting !
\`\`\`

### Split train / validation / test

\`\`\`python
# Répartition recommandée : 60/20/20
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25, random_state=42)

# train = 60%, val = 20%, test = 20%
print(f"Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")
\`\`\`

> **Le test set ne doit JAMAIS être utilisé pour les décisions d'entraînement.** Il sert uniquement à l'évaluation finale.`,
        links: [
          { label: 'train_test_split — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html' },
        ],
      },
      {
        title: 'Cross-Validation',
        content: `## K-Fold Cross-Validation

### Pourquoi la cross-validation ?

Avec un seul split, l'évaluation dépend de **quel 20 % on a choisi comme test**. La CV répète l'évaluation sur différents folds.

\`\`\`python
from sklearn.model_selection import cross_val_score, KFold
from sklearn.ensemble import RandomForestClassifier
import numpy as np

model = RandomForestClassifier(n_estimators=100, random_state=42)

# 5-Fold CV : divise en 5 parts, évalue 5 fois
cv = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring='accuracy')

print(f"Scores par fold : {scores}")
print(f"Moyenne : {scores.mean():.3f} ± {scores.std():.3f}")
\`\`\`

### Stratified K-Fold — pour la classification

Garantit que chaque fold a la même proportion de classes.

\`\`\`python
from sklearn.model_selection import StratifiedKFold

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=cv, scoring='f1_macro')
print(f"F1 macro : {scores.mean():.3f} ± {scores.std():.3f}")
\`\`\`

### Courbes d'apprentissage

Elles visualisent l'overfitting et l'underfitting.

\`\`\`python
from sklearn.model_selection import learning_curve
import matplotlib.pyplot as plt

train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, train_sizes=np.linspace(0.1, 1.0, 10), scoring='accuracy'
)

plt.figure(figsize=(8, 5))
plt.plot(train_sizes, train_scores.mean(axis=1), label='Train')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation')
plt.fill_between(train_sizes, train_scores.mean(axis=1) - train_scores.std(axis=1),
                              train_scores.mean(axis=1) + train_scores.std(axis=1), alpha=0.2)
plt.fill_between(train_sizes, val_scores.mean(axis=1) - val_scores.std(axis=1),
                              val_scores.mean(axis=1) + val_scores.std(axis=1), alpha=0.2)
plt.xlabel('Taille du training set')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Courbe d\'apprentissage')
plt.show()
\`\`\`

**Interprétation :**
- Les deux courbes convergent vers une valeur haute → bon modèle
- Train haute, Val basse → overfitting (besoin de régularisation ou plus de données)
- Les deux basses → underfitting (modèle trop simple)`,
        links: [
          { label: 'Cross-validation — scikit-learn guide', url: 'https://scikit-learn.org/stable/modules/cross_validation.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Diagnostiquer overfitting et underfitting',
        scenario: 'Tu entraînes deux modèles sur le même dataset et tu dois diagnostiquer lequel souffre d\'overfitting, lequel d\'underfitting, et comment corriger.',
        steps: [
          {
            title: 'Créer le dataset et entraîner les modèles',
            instructions: `\`\`\`python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
import numpy as np

X, y = make_classification(n_samples=1000, n_features=20, n_informative=10,
                            random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Modèle 1 : arbre sans limite de profondeur → risque overfitting
tree_deep = DecisionTreeClassifier(max_depth=None, random_state=42)
tree_deep.fit(X_train, y_train)

# Modèle 2 : régression logistique simple → risque underfitting
lr = LogisticRegression(max_iter=100, random_state=42)
lr.fit(X_train, y_train)

for name, model in [('Arbre profond', tree_deep), ('Logistique', lr)]:
    train_acc = model.score(X_train, y_train)
    test_acc  = model.score(X_test, y_test)
    cv_scores = cross_val_score(model, X_train, y_train, cv=5)
    print(f"{name}:")
    print(f"  Train: {train_acc:.3f}  Test: {test_acc:.3f}  CV: {cv_scores.mean():.3f}±{cv_scores.std():.3f}")
\`\`\``,
          },
          {
            title: 'Corriger l\'overfitting',
            instructions: `\`\`\`python
# Régulariser l'arbre avec max_depth
from sklearn.model_selection import validation_curve
import matplotlib.pyplot as plt

depths = range(1, 20)
train_scores, val_scores = validation_curve(
    DecisionTreeClassifier(random_state=42), X_train, y_train,
    param_name='max_depth', param_range=depths, cv=5, scoring='accuracy'
)

plt.figure(figsize=(8, 5))
plt.plot(depths, train_scores.mean(axis=1), label='Train')
plt.plot(depths, val_scores.mean(axis=1), label='Validation')
plt.xlabel('max_depth')
plt.ylabel('Accuracy')
plt.legend()
plt.title('Validation Curve — max_depth')
plt.show()

# Choisir la profondeur optimale
best_depth = depths[val_scores.mean(axis=1).argmax()]
print(f"Meilleure profondeur : {best_depth}")

tree_opt = DecisionTreeClassifier(max_depth=best_depth, random_state=42)
tree_opt.fit(X_train, y_train)
print(f"Test accuracy optimisé : {tree_opt.score(X_test, y_test):.3f}")
\`\`\``,
          },
        ],
        hints: [
          'Un écart train/test > 10% est souvent signe d\'overfitting',
          'La validation curve montre le point optimal d\'un hyperparamètre',
        ],
        solution: `# Résumé diagnostic
# Overfitting : train >> test → régulariser (max_depth, C, alpha…)
# Underfitting : train ≈ test mais tous deux bas → modèle plus complexe
# Bonne pratique : utiliser CV pour toute décision d'hyperparamètre`,
      },
    ],
  },

  // ─── MODULE 309 ───────────────────────────────────────────────────────────
  {
    id: 309,
    level: 'Intermédiaire',
    icon: '⚙️',
    title: 'Feature Engineering',
    desc: 'Encodage catégoriel, normalisation, création et sélection de features — transformer les données brutes en signal.',
    color: 'purple',
    colorHex: '#AA7DCE',
    lessons: [
      {
        title: 'Encodage et normalisation',
        content: `## Pourquoi transformer les features ?

Les algorithmes ML travaillent avec des **nombres**. Il faut donc :
1. Convertir les variables catégorielles en nombres
2. Mettre les variables numériques sur la même échelle

### Encodage catégoriel

**Label Encoding** — pour les catégories ordinales (ordre logique)
\`\`\`python
from sklearn.preprocessing import LabelEncoder

# ✅ Adapté : Débutant=0, Intermédiaire=1, Expert=2
le = LabelEncoder()
df['niveau_encoded'] = le.fit_transform(df['niveau'])
\`\`\`

**One-Hot Encoding** — pour les catégories nominales (pas d'ordre)
\`\`\`python
import pandas as pd

# ✅ Adapté : ville_Paris, ville_Lyon, ville_Marseille
df_encoded = pd.get_dummies(df, columns=['ville'], drop_first=True)
\`\`\`

**Ordinal Encoding** — catégories avec ordre explicite
\`\`\`python
from sklearn.preprocessing import OrdinalEncoder

enc = OrdinalEncoder(categories=[['faible', 'moyen', 'fort']])
df['niveau_enc'] = enc.fit_transform(df[['niveau']])
\`\`\`

### Normalisation / Standardisation

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# StandardScaler : moyenne=0, écart-type=1 → pour algos linéaires, PCA
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)

# MinMaxScaler : [0, 1] → pour réseaux de neurones, KNN
scaler2 = MinMaxScaler()
X_scaled2 = scaler2.fit_transform(X_train)
\`\`\`

> **Règle critique** : toujours \`fit\` sur le train set, puis \`transform\` sur train ET test. Ne jamais \`fit\` sur le test — ce serait du **data leakage**.

\`\`\`python
# ✅ Correct
scaler.fit(X_train)
X_train_s = scaler.transform(X_train)
X_test_s  = scaler.transform(X_test)

# ❌ INTERDIT — data leakage
scaler.fit(X)  # utilise info du test set
\`\`\``,
        links: [
          { label: 'Preprocessing — scikit-learn', url: 'https://scikit-learn.org/stable/modules/preprocessing.html' },
        ],
      },
      {
        title: 'Création et sélection de features',
        content: `## Feature Engineering avancé

### Créer de nouvelles features

\`\`\`python
import pandas as pd
import numpy as np

# Interactions entre features
df['age_x_salaire'] = df['age'] * df['salaire']

# Transformations non-linéaires
df['log_salaire'] = np.log1p(df['salaire'])  # log(1+x) pour éviter log(0)
df['salaire_sq']  = df['salaire'] ** 2

# Features temporelles (si datetime)
df['date'] = pd.to_datetime(df['date'])
df['mois']        = df['date'].dt.month
df['jour_semaine'] = df['date'].dt.dayofweek
df['est_weekend']  = df['jour_semaine'].isin([5, 6]).astype(int)

# Binning (discrétisation)
df['tranche_age'] = pd.cut(df['age'], bins=[0, 25, 35, 50, 100],
                            labels=['jeune', 'adulte', 'senior', 'aine'])
\`\`\`

### Sélection de features

Trop de features → overfitting + lenteur.

\`\`\`python
from sklearn.feature_selection import SelectKBest, f_classif, RFE
from sklearn.ensemble import RandomForestClassifier

# Méthode 1 : Score statistique (ANOVA F-test)
selector = SelectKBest(score_func=f_classif, k=10)
X_new = selector.fit_transform(X_train, y_train)
selected_features = X.columns[selector.get_support()]
print("Features sélectionnées:", selected_features.tolist())

# Méthode 2 : Importance par Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

importances = pd.Series(rf.feature_importances_, index=X.columns)
importances.nlargest(10).plot(kind='barh')
plt.title('Top 10 Features Importantes')
plt.show()

# Méthode 3 : Élimination récursive (RFE)
rfe = RFE(estimator=rf, n_features_to_select=10)
rfe.fit(X_train, y_train)
print("Features RFE:", X.columns[rfe.support_].tolist())
\`\`\``,
        links: [
          { label: 'Feature selection — scikit-learn', url: 'https://scikit-learn.org/stable/modules/feature_selection.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Pipeline d\'encodage complet',
        scenario: 'Tu as un dataset mixte (numériques + catégorielles). Tu dois l\'encoder et sélectionner les meilleures features.',
        steps: [
          {
            title: 'Créer et explorer le dataset',
            instructions: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 800
df = pd.DataFrame({
    'age':      np.random.randint(20, 65, n),
    'salaire':  np.random.randint(25000, 120000, n),
    'ville':    np.random.choice(['Paris', 'Lyon', 'Marseille', 'Bordeaux'], n),
    'niveau':   np.random.choice(['Débutant', 'Intermédiaire', 'Expert'], n),
    'nb_projets': np.random.poisson(5, n),
    'certifie': np.random.choice([0, 1], n, p=[0.7, 0.3]),
})
# Target : probabilité d'être promu
df['promu'] = ((df['salaire'] > 70000) & (df['nb_projets'] > 4) | (df['niveau'] == 'Expert')).astype(int)

print(df.head())
print("\\nTaux de promotion:", df['promu'].mean().round(2))
\`\`\``,
          },
          {
            title: 'Encodage complet',
            instructions: `\`\`\`python
from sklearn.preprocessing import StandardScaler, OrdinalEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd

# Définir les colonnes par type
num_cols = ['age', 'salaire', 'nb_projets']
ord_cols = ['niveau']
ohe_cols = ['ville']

X = df.drop('promu', axis=1)
y = df['promu']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Préprocesseur avec ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), num_cols),
    ('ord', OrdinalEncoder(categories=[['Débutant', 'Intermédiaire', 'Expert']]), ord_cols),
    ('ohe', OneHotEncoder(drop='first', sparse_output=False), ohe_cols),
], remainder='passthrough')

X_train_t = preprocessor.fit_transform(X_train)
X_test_t  = preprocessor.transform(X_test)
print("Shape après encodage:", X_train_t.shape)
\`\`\``,
          },
        ],
        hints: [
          'OrdinalEncoder pour les catégories avec ordre, OneHotEncoder pour les nominales',
          'Ne jamais fit le scaler sur les données de test',
        ],
        solution: `# Le ColumnTransformer permet d'appliquer des transformations différentes
# selon le type de colonne, en une seule étape cohérente.
# Toujours utiliser fit_transform sur train, transform seulement sur test.`,
      },
    ],
  },

  // ─── MODULE 310 ───────────────────────────────────────────────────────────
  {
    id: 310,
    level: 'Intermédiaire',
    icon: '🎛️',
    title: 'Hyperparameter Tuning',
    desc: 'GridSearchCV, RandomizedSearchCV et Optuna — trouver les meilleurs réglages pour tes modèles.',
    color: 'orange',
    colorHex: '#F3752B',
    lessons: [
      {
        title: 'Hyperparamètres vs paramètres',
        content: `## Paramètres vs Hyperparamètres

### La différence fondamentale

| | Paramètres | Hyperparamètres |
|---|---|---|
| **Qui les fixe ?** | L'algorithme (pendant le fit) | Toi (avant le fit) |
| **Exemples** | Poids d'un réseau de neurones, coefficients régression | \`max_depth\`, \`n_estimators\`, \`learning_rate\` |
| **Optimisation** | Automatique (gradient descent, etc.) | Manuelle ou via grid search |

### Pourquoi c'est important ?

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import cross_val_score

X, y = make_classification(n_samples=1000, random_state=42)

# Modèle par défaut
rf_default = RandomForestClassifier(random_state=42)
score_default = cross_val_score(rf_default, X, y, cv=5).mean()

# Modèle avec bons hyperparamètres
rf_tuned = RandomForestClassifier(n_estimators=200, max_depth=8,
                                   min_samples_leaf=5, random_state=42)
score_tuned = cross_val_score(rf_tuned, X, y, cv=5).mean()

print(f"Défaut  : {score_default:.3f}")
print(f"Tuned   : {score_tuned:.3f}")
\`\`\``,
        links: [
          { label: 'Hyperparameter tuning — scikit-learn', url: 'https://scikit-learn.org/stable/modules/grid_search.html' },
        ],
      },
      {
        title: 'GridSearch, RandomizedSearch et Optuna',
        content: `## Les 3 approches de tuning

### 1. GridSearchCV — exhaustif

Teste toutes les combinaisons.

\`\`\`python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, None],
    'min_samples_leaf': [1, 5, 10],
}

gs = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='f1',
    n_jobs=-1,     # utilise tous les cœurs
    verbose=1
)
gs.fit(X_train, y_train)

print("Meilleurs paramètres:", gs.best_params_)
print("Meilleur score CV:", gs.best_score_.round(3))
print("Score test:", gs.score(X_test, y_test).round(3))
\`\`\`

> Problème : 3×3×3 = 27 combinaisons × 5 folds = **135 entraînements** !

### 2. RandomizedSearchCV — rapide

Tire aléatoirement N combinaisons.

\`\`\`python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint

param_dist = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_leaf': randint(1, 20),
    'max_features': ['sqrt', 'log2', None],
}

rs = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_dist,
    n_iter=50,     # 50 combinaisons aléatoires
    cv=5, scoring='f1', n_jobs=-1, random_state=42
)
rs.fit(X_train, y_train)
print("Meilleurs paramètres:", rs.best_params_)
\`\`\`

### 3. Optuna — optimisation bayésienne (recommandé)

Apprend quelles zones explorer en priorité.

\`\`\`python
import optuna
optuna.logging.set_verbosity(optuna.logging.WARNING)

def objective(trial):
    params = {
        'n_estimators':    trial.suggest_int('n_estimators', 50, 500),
        'max_depth':       trial.suggest_int('max_depth', 3, 20),
        'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 20),
    }
    model = RandomForestClassifier(**params, random_state=42)
    return cross_val_score(model, X_train, y_train, cv=5, scoring='f1').mean()

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50, show_progress_bar=True)

print("Meilleurs params:", study.best_params)
print("Meilleur score:", study.best_value.round(3))
\`\`\``,
        links: [
          { label: 'Optuna — documentation', url: 'https://optuna.readthedocs.io/' },
          { label: 'RandomizedSearchCV — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Optimiser un Random Forest avec RandomizedSearch',
        scenario: 'Tu as un modèle de classification qui plafonne à 82% d\'accuracy. Utilise RandomizedSearchCV pour dépasser cette limite.',
        steps: [
          {
            title: 'Baseline et tuning',
            instructions: `\`\`\`python
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, RandomizedSearchCV, cross_val_score
from scipy.stats import randint
import numpy as np

X, y = make_classification(n_samples=2000, n_features=20, n_informative=12, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Baseline
baseline = RandomForestClassifier(random_state=42)
baseline.fit(X_train, y_train)
print(f"Baseline test accuracy: {baseline.score(X_test, y_test):.3f}")

# Tuning
param_dist = {
    'n_estimators':    randint(100, 600),
    'max_depth':       randint(3, 25),
    'min_samples_leaf': randint(1, 15),
    'max_features':    ['sqrt', 'log2', 0.5],
    'bootstrap':       [True, False],
}

rs = RandomizedSearchCV(
    RandomForestClassifier(random_state=42),
    param_dist, n_iter=60, cv=5,
    scoring='accuracy', n_jobs=-1, random_state=42, verbose=1
)
rs.fit(X_train, y_train)

print(f"Meilleur score CV : {rs.best_score_:.3f}")
print(f"Meilleur score test : {rs.score(X_test, y_test):.3f}")
print(f"Meilleurs params : {rs.best_params_}")
\`\`\``,
          },
        ],
        hints: [
          'n_iter=60 offre un bon compromis vitesse/qualité',
          'n_jobs=-1 utilise tous les cœurs disponibles',
          'Le scoring doit correspondre à ta métrique métier',
        ],
        solution: `# Résumé : GridSearch = exhaustif mais lent, RandomizedSearch = rapide et proche de l'optimal
# Pour les projets pro : Optuna (bayésien) > RandomizedSearch > GridSearch`,
      },
    ],
  },

  // ─── MODULE 311 ───────────────────────────────────────────────────────────
  {
    id: 311,
    level: 'Intermédiaire',
    icon: '🌲',
    title: 'Méthodes d\'ensemble',
    desc: 'Random Forest, XGBoost, LightGBM et stacking — combiner les modèles pour battre l\'état de l\'art.',
    color: 'green',
    colorHex: '#59CD90',
    lessons: [
      {
        title: 'Bagging et Random Forest',
        content: `## L'intelligence collective des modèles

### Le principe : "Wisdom of the Crowd"

Un seul arbre de décision se trompe souvent. Mais si on fait voter **100 arbres différents**, leurs erreurs se compensent.

### Bagging — Bootstrap Aggregating

\`\`\`
Dataset original → [échantillon 1] → Arbre 1 → prédiction 1
                 → [échantillon 2] → Arbre 2 → prédiction 2  →  Vote majoritaire
                 → [échantillon N] → Arbre N → prédiction N
\`\`\`

### Random Forest

Bagging + sélection aléatoire de features à chaque split.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=2000, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

rf = RandomForestClassifier(
    n_estimators=200,    # nombre d'arbres
    max_depth=10,        # profondeur max de chaque arbre
    max_features='sqrt', # nb features à chaque split
    n_jobs=-1,           # parallélisation
    random_state=42
)
rf.fit(X_train, y_train)
print(f"Accuracy: {rf.score(X_test, y_test):.3f}")

# Importance des features
import pandas as pd
feat_imp = pd.Series(rf.feature_importances_).nlargest(5)
print("Top 5 features:", feat_imp)
\`\`\``,
        links: [
          { label: 'Random Forest — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html' },
        ],
      },
      {
        title: 'Boosting — XGBoost et LightGBM',
        content: `## Boosting : apprendre de ses erreurs

### Principe du Boosting

Contrairement au Bagging (parallèle), le Boosting est **séquentiel** :
- Modèle 1 apprend sur les données → fait des erreurs
- Modèle 2 se concentre sur les erreurs du modèle 1
- Modèle 3 se concentre sur les erreurs des modèles 1+2
- …

### XGBoost

\`\`\`python
import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,   # plus faible = moins d'overfitting mais plus lent
    max_depth=6,
    subsample=0.8,        # fraction de données par arbre
    colsample_bytree=0.8, # fraction de features par arbre
    use_label_encoder=False,
    eval_metric='logloss',
    random_state=42
)
model.fit(X_train, y_train,
          eval_set=[(X_test, y_test)],
          verbose=False)
print(f"XGBoost accuracy: {model.score(X_test, y_test):.3f}")
\`\`\`

### LightGBM — plus rapide que XGBoost

\`\`\`python
import lightgbm as lgb

lgb_model = lgb.LGBMClassifier(
    n_estimators=300,
    learning_rate=0.05,
    num_leaves=31,    # complexité du modèle (< 2^max_depth)
    random_state=42,
    verbose=-1
)
lgb_model.fit(X_train, y_train)
print(f"LightGBM accuracy: {lgb_model.score(X_test, y_test):.3f}")
\`\`\`

### Stacking — combiner des modèles hétérogènes

\`\`\`python
from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

estimators = [
    ('rf',  RandomForestClassifier(n_estimators=100, random_state=42)),
    ('xgb', xgb.XGBClassifier(n_estimators=100, use_label_encoder=False,
                                eval_metric='logloss', random_state=42)),
]

stack = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression(),
    cv=5
)
stack.fit(X_train, y_train)
print(f"Stacking accuracy: {stack.score(X_test, y_test):.3f}")
\`\`\``,
        links: [
          { label: 'XGBoost documentation', url: 'https://xgboost.readthedocs.io/' },
          { label: 'LightGBM documentation', url: 'https://lightgbm.readthedocs.io/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Benchmark des méthodes d\'ensemble',
        scenario: 'Comparer Random Forest, XGBoost et LightGBM sur un même dataset pour comprendre leurs différences.',
        steps: [
          {
            title: 'Benchmark complet',
            instructions: `\`\`\`python
# pip install xgboost lightgbm
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
import xgboost as xgb
import lightgbm as lgb
import time

X, y = make_classification(n_samples=5000, n_features=30, n_informative=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

models = {
    'Random Forest': RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1),
    'Gradient Boosting': GradientBoostingClassifier(n_estimators=200, random_state=42),
    'XGBoost': xgb.XGBClassifier(n_estimators=200, use_label_encoder=False,
                                   eval_metric='logloss', random_state=42),
    'LightGBM': lgb.LGBMClassifier(n_estimators=200, random_state=42, verbose=-1),
}

for name, model in models.items():
    t0 = time.time()
    model.fit(X_train, y_train)
    elapsed = time.time() - t0
    cv = cross_val_score(model, X_train, y_train, cv=5).mean()
    test_acc = model.score(X_test, y_test)
    print(f"{name:22s}  CV={cv:.3f}  Test={test_acc:.3f}  Temps={elapsed:.1f}s")
\`\`\``,
          },
        ],
        hints: [
          'LightGBM est généralement le plus rapide sur les gros datasets',
          'XGBoost et LightGBM nécessitent un pip install séparé',
        ],
        solution: `# Règle générale :
# - Démarrer avec Random Forest (robuste, peu d'hyperparamètres)
# - Passer à LightGBM/XGBoost pour les compétitions ou performances max
# - Stacking = dernier recours (gain marginal, complexité max)`,
      },
    ],
  },

  // ─── MODULE 312 ───────────────────────────────────────────────────────────
  {
    id: 312,
    level: 'Intermédiaire',
    icon: '⚖️',
    title: 'Données déséquilibrées',
    desc: 'SMOTE, class_weight, threshold tuning — gérer les classes rares comme la fraude ou les maladies.',
    color: 'orange',
    colorHex: '#F3752B',
    lessons: [
      {
        title: 'Comprendre le déséquilibre',
        content: `## Le piège du déséquilibre de classes

### Le problème

Imagine un dataset de détection de fraude : 99% de transactions légitimes, 1% de fraudes.

Un modèle qui prédit **toujours "légitime"** aura 99% d'accuracy... mais détecte 0 fraude !

\`\`\`python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import numpy as np

# Dataset très déséquilibré : 5% de positifs
X, y = make_classification(n_samples=10000, weights=[0.95, 0.05],
                            n_informative=5, random_state=42)

print(f"Classe 0 : {(y==0).sum()} ({(y==0).mean():.0%})")
print(f"Classe 1 : {(y==1).sum()} ({(y==1).mean():.0%})")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Modèle naïf
lr = LogisticRegression()
lr.fit(X_train, y_train)
print("\\n--- Modèle naïf ---")
print(classification_report(y_test, lr.predict(X_test)))
\`\`\`

### Les métriques adaptées

Avec des classes déséquilibrées, **ignorer accuracy** :
- **Precision** : parmi les alarmes, combien sont vraies ?
- **Recall** : parmi les vrais positifs, combien on capte ?
- **F1-score** : compromis entre precision et recall
- **AUC-ROC** : capacité à discriminer les classes`,
        links: [
          { label: 'imbalanced-learn documentation', url: 'https://imbalanced-learn.org/' },
        ],
      },
      {
        title: 'Techniques de rééquilibrage',
        content: `## 4 solutions au déséquilibre

### 1. class_weight — le plus simple

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

# Pénalise les erreurs sur la classe minoritaire
lr_balanced = LogisticRegression(class_weight='balanced')
lr_balanced.fit(X_train, y_train)
print(classification_report(y_test, lr_balanced.predict(X_test)))
\`\`\`

### 2. SMOTE — surééchantillonnage synthétique

Crée de nouvelles observations synthétiques de la classe minoritaire.

\`\`\`python
# pip install imbalanced-learn
from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X_train, y_train)
print(f"Avant SMOTE : {y_train.sum()} positifs / {len(y_train)}")
print(f"Après SMOTE : {y_res.sum()} positifs / {len(y_res)}")

from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(random_state=42)
rf.fit(X_res, y_res)
print(classification_report(y_test, rf.predict(X_test)))
\`\`\`

### 3. Undersampling — sous-échantillonner la majorité

\`\`\`python
from imblearn.under_sampling import RandomUnderSampler

rus = RandomUnderSampler(random_state=42)
X_res, y_res = rus.fit_resample(X_train, y_train)
print(f"Après undersampling : {len(y_res)} observations équilibrées")
\`\`\`

### 4. Ajuster le seuil de décision

\`\`\`python
import numpy as np
from sklearn.metrics import f1_score

# Probabilités du modèle
y_proba = lr_balanced.predict_proba(X_test)[:, 1]

# Tester différents seuils
thresholds = np.arange(0.1, 0.9, 0.05)
f1_scores = [f1_score(y_test, (y_proba >= t).astype(int)) for t in thresholds]

best_threshold = thresholds[np.argmax(f1_scores)]
print(f"Meilleur seuil : {best_threshold:.2f}  F1 : {max(f1_scores):.3f}")

y_pred_opt = (y_proba >= best_threshold).astype(int)
print(classification_report(y_test, y_pred_opt))
\`\`\``,
        links: [
          { label: 'SMOTE — imbalanced-learn', url: 'https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Détection de fraude déséquilibrée',
        scenario: 'Dataset de 10 000 transactions, 3% de fraudes. Tu dois maximiser le recall sur les fraudes tout en gardant une precision acceptable.',
        steps: [
          {
            title: 'Comparer les stratégies de rééquilibrage',
            instructions: `\`\`\`python
# pip install imbalanced-learn
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from imblearn.over_sampling import SMOTE
import numpy as np

X, y = make_classification(n_samples=10000, weights=[0.97, 0.03],
                            n_features=20, n_informative=8, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

strategies = {
    'Naïf': (X_train, y_train, {}),
    'class_weight': (X_train, y_train, {'class_weight': 'balanced'}),
}

# Ajouter SMOTE
X_smote, y_smote = SMOTE(random_state=42).fit_resample(X_train, y_train)
strategies['SMOTE'] = (X_smote, y_smote, {})

for name, (X_tr, y_tr, kwargs) in strategies.items():
    rf = RandomForestClassifier(n_estimators=100, random_state=42, **kwargs)
    rf.fit(X_tr, y_tr)
    y_pred = rf.predict(X_test)
    y_proba = rf.predict_proba(X_test)[:, 1]
    print(f"\\n=== {name} ===")
    print(classification_report(y_test, y_pred, digits=3))
    print(f"AUC-ROC : {roc_auc_score(y_test, y_proba):.3f}")
\`\`\``,
          },
        ],
        hints: [
          'En détection de fraude, le recall (ne pas rater les fraudes) est prioritaire',
          'SMOTE s\'applique uniquement sur le train set, jamais sur le test',
          'class_weight="balanced" est souvent suffisant et plus simple que SMOTE',
        ],
        solution: `# Règle pro :
# 1. Commencer par class_weight='balanced' (simple et efficace)
# 2. Si recall insuffisant → SMOTE ou ajustement du seuil
# 3. Toujours évaluer avec F1/Recall/AUC, jamais avec accuracy seule`,
      },
    ],
  },

  // ─── MODULE 313 ───────────────────────────────────────────────────────────
  {
    id: 313,
    level: 'Avancé',
    icon: '🔧',
    title: 'Pipelines scikit-learn',
    desc: 'Pipeline, ColumnTransformer — automatiser et sécuriser le flux de données de bout en bout.',
    color: 'blue',
    colorHex: '#3FA7D6',
    lessons: [
      {
        title: 'Pourquoi les Pipelines ?',
        content: `## Le problème sans Pipeline

Sans Pipeline, tu dois répéter chaque transformation :

\`\`\`python
# ❌ Code fragile — le data leakage guette
scaler.fit(X_train)
X_train_s = scaler.transform(X_train)
X_test_s = scaler.transform(X_test)

model.fit(X_train_s, y_train)
pred = model.predict(X_test_s)

# Et si tu changes quelque chose, il faut refaire toutes les étapes...
\`\`\`

### La solution : Pipeline

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

# Un seul objet encapsule tout
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  RandomForestClassifier(n_estimators=100, random_state=42)),
])

# fit = transforme + entraîne
pipe.fit(X_train, y_train)

# predict = transforme + prédit (automatiquement)
y_pred = pipe.predict(X_test)

# cross_val_score gère tout correctement sans data leakage
scores = cross_val_score(pipe, X, y, cv=5)
print(f"CV accuracy: {scores.mean():.3f}")
\`\`\`

### Pipeline + GridSearchCV

\`\`\`python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'model__n_estimators': [100, 200],
    'model__max_depth':    [5, 10],
    # Notation : nom_étape__hyperparamètre
}

gs = GridSearchCV(pipe, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
gs.fit(X_train, y_train)
print("Meilleurs params:", gs.best_params_)
print("Score test:", gs.score(X_test, y_test).round(3))
\`\`\``,
        links: [
          { label: 'Pipeline — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html' },
        ],
      },
      {
        title: 'ColumnTransformer — données mixtes',
        content: `## Traiter les colonnes par type

### ColumnTransformer

Applique des transformations **différentes** selon le type de colonne.

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingClassifier
import pandas as pd

# Définir les types de colonnes
num_features = ['age', 'salaire', 'nb_projets']
cat_features = ['ville', 'departement']

# Pipeline pour les numériques : imputer puis scaler
num_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler',  StandardScaler()),
])

# Pipeline pour les catégorielles : imputer puis encoder
cat_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False)),
])

# Combiner dans un ColumnTransformer
preprocessor = ColumnTransformer(transformers=[
    ('num', num_transformer, num_features),
    ('cat', cat_transformer, cat_features),
])

# Pipeline final : préprocesseur + modèle
full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', GradientBoostingClassifier(n_estimators=200, random_state=42)),
])

full_pipeline.fit(X_train, y_train)
print(f"Score test: {full_pipeline.score(X_test, y_test):.3f}")
\`\`\`

### Sauvegarder le Pipeline

\`\`\`python
import joblib

# Sauvegarder (inclut le scaler + le modèle)
joblib.dump(full_pipeline, 'model_pipeline.pkl')

# Charger et prédire directement sur des données brutes
loaded_pipe = joblib.load('model_pipeline.pkl')
predictions = loaded_pipe.predict(new_data_raw)  # pas besoin de re-transformer !
\`\`\``,
        links: [
          { label: 'ColumnTransformer — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Pipeline complet sur données mixtes',
        scenario: 'Construire un pipeline de bout en bout sur un dataset avec colonnes numériques et catégorielles, puis le sauvegarder.',
        steps: [
          {
            title: 'Construire et valider le pipeline',
            instructions: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
import joblib

np.random.seed(42)
n = 1000
df = pd.DataFrame({
    'age':      np.random.randint(20, 65, n).astype(float),
    'salaire':  np.random.randint(25000, 120000, n).astype(float),
    'exp_ans':  np.random.randint(0, 40, n).astype(float),
    'ville':    np.random.choice(['Paris', 'Lyon', 'Marseille', None], n, p=[0.35, 0.25, 0.3, 0.1]),
    'contrat':  np.random.choice(['CDI', 'CDD', 'Freelance'], n),
    'promu':    np.random.choice([0, 1], n, p=[0.7, 0.3]),
})
# Ajouter quelques NaN
df.loc[df.sample(50).index, 'age'] = np.nan
df.loc[df.sample(30).index, 'salaire'] = np.nan

X = df.drop('promu', axis=1)
y = df['promu']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

num_cols = ['age', 'salaire', 'exp_ans']
cat_cols = ['ville', 'contrat']

num_transformer = Pipeline([('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())])
cat_transformer = Pipeline([('imputer', SimpleImputer(strategy='most_frequent')),
                             ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))])

preprocessor = ColumnTransformer([('num', num_transformer, num_cols), ('cat', cat_transformer, cat_cols)])

pipeline = Pipeline([('preprocessor', preprocessor), ('model', RandomForestClassifier(n_estimators=100, random_state=42))])
pipeline.fit(X_train, y_train)

cv_scores = cross_val_score(pipeline, X, y, cv=5)
print(f"CV accuracy: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
print(f"Test accuracy: {pipeline.score(X_test, y_test):.3f}")

joblib.dump(pipeline, 'pipeline_promo.pkl')
print("Pipeline sauvegardé !")

# Test de rechargement
loaded = joblib.load('pipeline_promo.pkl')
print(f"Score après rechargement: {loaded.score(X_test, y_test):.3f}")
\`\`\``,
          },
        ],
        hints: [
          'Le Pipeline évite toute fuite de données entre train et test',
          'joblib.dump sauvegarde scaler + modèle ensemble — parfait pour la production',
        ],
        solution: `# Le Pipeline est la bonne pratique #1 en ML pro :
# - Évite le data leakage
# - Simplifie le GridSearch
# - Permet de sauvegarder/charger sans perte de transformation`,
      },
    ],
  },

  // ─── MODULE 314 ───────────────────────────────────────────────────────────
  {
    id: 314,
    level: 'Avancé',
    icon: '📉',
    title: 'Réduction de dimension',
    desc: 'PCA, t-SNE et UMAP — visualiser et compresser les données haute dimension.',
    color: 'purple',
    colorHex: '#AA7DCE',
    lessons: [
      {
        title: 'PCA — Analyse en Composantes Principales',
        content: `## Pourquoi réduire la dimension ?

Avec des dizaines ou centaines de features :
- **Malédiction de la dimension** : les modèles peinent à trouver des patterns
- **Visualisation impossible** en > 3D
- **Corrélations redondantes** entre features similaires

### PCA — la méthode linéaire de référence

PCA trouve les axes de **maximum de variance** dans les données.

\`\`\`python
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import numpy as np

# ⚠️ Toujours standardiser avant PCA
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# PCA pour conserver 95% de la variance
pca = PCA(n_components=0.95)  # ou n_components=2 pour visualisation
X_pca = pca.fit_transform(X_scaled)

print(f"Dimensions originales : {X.shape[1]}")
print(f"Dimensions après PCA  : {X_pca.shape[1]}")
print(f"Variance expliquée    : {pca.explained_variance_ratio_.sum():.2%}")

# Visualiser la variance expliquée cumulée
plt.figure(figsize=(8, 5))
plt.plot(np.cumsum(pca.explained_variance_ratio_))
plt.axhline(0.95, color='r', linestyle='--', label='95%')
plt.xlabel('Nombre de composantes')
plt.ylabel('Variance expliquée cumulée')
plt.legend()
plt.title('Scree plot')
plt.show()

# Visualisation 2D (si n_components=2)
pca2 = PCA(n_components=2)
X_2d = pca2.fit_transform(X_scaled)
plt.figure(figsize=(8, 6))
scatter = plt.scatter(X_2d[:, 0], X_2d[:, 1], c=y, cmap='viridis', alpha=0.6)
plt.colorbar(scatter)
plt.title('PCA — 2 composantes')
plt.show()
\`\`\``,
        links: [
          { label: 'PCA — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html' },
        ],
      },
      {
        title: 't-SNE et UMAP — visualisation non-linéaire',
        content: `## t-SNE : visualiser les clusters

t-SNE est conçu **uniquement pour la visualisation** (pas la réduction avant modèle).

\`\`\`python
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

# t-SNE sur un sous-ensemble (lent sur grands datasets)
tsne = TSNE(n_components=2, perplexity=30, random_state=42, n_iter=1000)
X_tsne = tsne.fit_transform(X_scaled[:2000])  # limiter à 2000 points

plt.figure(figsize=(10, 7))
scatter = plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=y[:2000], cmap='tab10', alpha=0.6, s=20)
plt.colorbar(scatter)
plt.title('t-SNE — visualisation 2D')
plt.axis('off')
plt.show()
\`\`\`

### UMAP : plus rapide et plus fidèle

\`\`\`python
# pip install umap-learn
import umap

reducer = umap.UMAP(n_components=2, random_state=42)
X_umap = reducer.fit_transform(X_scaled)

plt.figure(figsize=(10, 7))
scatter = plt.scatter(X_umap[:, 0], X_umap[:, 1], c=y, cmap='Spectral', alpha=0.6, s=10)
plt.colorbar(scatter)
plt.title('UMAP — visualisation 2D')
plt.show()
\`\`\`

### Quand utiliser quoi ?

| Méthode | Linéaire | Vitesse | Usage |
|---------|----------|---------|-------|
| **PCA** | ✅ Oui | ⚡ Rapide | Réduction avant modèle, débruitage |
| **t-SNE** | ❌ Non | 🐌 Lent | Visualisation des clusters uniquement |
| **UMAP** | ❌ Non | ⚡ Rapide | Visualisation + peut servir en feature |`,
        links: [
          { label: 'UMAP documentation', url: 'https://umap-learn.readthedocs.io/' },
          { label: 't-SNE — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Visualiser des clusters avec PCA et t-SNE',
        scenario: 'Tu as un dataset haute dimension (50 features) et tu veux comprendre sa structure avant de modéliser.',
        steps: [
          {
            title: 'PCA puis t-SNE',
            instructions: `\`\`\`python
from sklearn.datasets import load_digits
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

# Dataset : chiffres manuscrits (1797 images 8x8 = 64 features)
digits = load_digits()
X, y = digits.data, digits.target
print(f"Shape: {X.shape}, Classes: {len(set(y))}")

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# PCA : 95% de variance
pca = PCA(n_components=0.95)
X_pca = pca.fit_transform(X_scaled)
print(f"PCA: {X.shape[1]} → {X_pca.shape[1]} dimensions ({pca.explained_variance_ratio_.sum():.1%} variance)")

# Visualisation PCA 2D
pca2 = PCA(n_components=2)
X_2d_pca = pca2.fit_transform(X_scaled)

# Visualisation t-SNE
tsne = TSNE(n_components=2, perplexity=30, random_state=42)
X_2d_tsne = tsne.fit_transform(X_pca)  # t-SNE sur les composantes PCA (plus rapide)

fig, axes = plt.subplots(1, 2, figsize=(16, 6))
for ax, X_2d, title in [(axes[0], X_2d_pca, 'PCA'), (axes[1], X_2d_tsne, 't-SNE sur PCA')]:
    sc = ax.scatter(X_2d[:, 0], X_2d[:, 1], c=y, cmap='tab10', alpha=0.7, s=20)
    plt.colorbar(sc, ax=ax)
    ax.set_title(title)
    ax.axis('off')
plt.tight_layout()
plt.show()
\`\`\``,
          },
        ],
        hints: [
          'Appliquer t-SNE sur les composantes PCA (PCA → t-SNE) est plus rapide et souvent meilleur',
          't-SNE ne doit pas être utilisé comme feature pour un modèle — seulement pour visualiser',
        ],
        solution: `# Workflow recommandé :
# 1. PCA pour réduire la dimension avant modélisation (garder 95% variance)
# 2. t-SNE ou UMAP pour visualiser et comprendre la structure des données`,
      },
    ],
  },

  // ─── MODULE 315 ───────────────────────────────────────────────────────────
  {
    id: 315,
    level: 'Avancé',
    icon: '🧠',
    title: 'Introduction au Deep Learning',
    desc: 'Réseaux de neurones, MLP avec Keras/TensorFlow — comprendre les fondations du deep learning.',
    color: 'green',
    colorHex: '#59CD90',
    lessons: [
      {
        title: 'Comment fonctionne un réseau de neurones ?',
        content: `## Les fondations du Deep Learning

### Un neurone artificiel

\`\`\`
Entrées (x1, x2, x3)
     ↓       ↓       ↓
   × w1    × w2    × w3   → Somme → + biais → Activation → Sortie
\`\`\`

Le neurone **apprend** les poids w1, w2, w3 et le biais b pendant l'entraînement.

### Multi-Layer Perceptron (MLP)

\`\`\`
Couche d'entrée → Couche cachée 1 → Couche cachée 2 → Couche de sortie
   (features)      (64 neurones)      (32 neurones)      (classes)
\`\`\`

### Fonctions d'activation

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 100)

activations = {
    'ReLU':    np.maximum(0, x),                      # couches cachées
    'Sigmoid': 1 / (1 + np.exp(-x)),                  # sortie binaire
    'Tanh':    np.tanh(x),                             # couches cachées
    'Softmax': 'np.exp(x)/sum(np.exp(x))',             # sortie multi-classe
}

fig, axes = plt.subplots(1, 3, figsize=(12, 4))
for ax, (name, vals) in zip(axes, list(activations.items())[:3]):
    ax.plot(x, vals)
    ax.set_title(name)
    ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
\`\`\`

### L'entraînement : Rétropropagation

1. **Forward pass** : calcule la prédiction
2. **Calcul du loss** : compare prédiction vs réalité (ex. Cross-Entropy)
3. **Backward pass** : calcule le gradient du loss par rapport à chaque poids
4. **Update** : ajuste les poids avec un optimizer (Adam, SGD...)`,
        links: [
          { label: 'Keras — documentation officielle', url: 'https://keras.io/' },
          { label: 'TensorFlow — tutoriels', url: 'https://www.tensorflow.org/tutorials' },
        ],
      },
      {
        title: 'MLP avec Keras',
        content: `## Construire un réseau de neurones avec Keras

### Installation

\`\`\`bash
pip install tensorflow  # inclut Keras
# ou
pip install keras
\`\`\`

### Classification binaire

\`\`\`python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

X, y = make_classification(n_samples=5000, n_features=20, n_informative=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# Définir le modèle
model = keras.Sequential([
    layers.Dense(64, activation='relu', input_shape=(X_train_s.shape[1],)),
    layers.Dropout(0.3),      # régularisation : désactive 30% des neurones
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(1, activation='sigmoid')  # sortie binaire
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

model.summary()
\`\`\`

### Entraînement et visualisation

\`\`\`python
history = model.fit(
    X_train_s, y_train,
    epochs=50,
    batch_size=64,
    validation_split=0.2,  # 20% du train pour valider
    verbose=1
)

# Visualiser loss et accuracy
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(history.history['loss'], label='Train')
axes[0].plot(history.history['val_loss'], label='Validation')
axes[0].set_title('Loss')
axes[0].legend()

axes[1].plot(history.history['accuracy'], label='Train')
axes[1].plot(history.history['val_accuracy'], label='Validation')
axes[1].set_title('Accuracy')
axes[1].legend()
plt.show()

test_loss, test_acc = model.evaluate(X_test_s, y_test, verbose=0)
print(f"Test accuracy: {test_acc:.3f}")
\`\`\``,
        links: [
          { label: 'Keras Sequential API', url: 'https://keras.io/guides/sequential_model/' },
          { label: 'Dropout regularization', url: 'https://keras.io/api/layers/regularization_layers/dropout/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Classifier des chiffres manuscrits',
        scenario: 'Utiliser un MLP pour reconnaître les chiffres 0-9 du dataset MNIST (benchmark classique du deep learning).',
        steps: [
          {
            title: 'Charger et préparer MNIST',
            instructions: `\`\`\`python
# pip install tensorflow
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt
import numpy as np

# Charger MNIST (70 000 images 28×28)
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()

# Normaliser [0, 255] → [0, 1] et aplatir 28×28 → 784
X_train = X_train.reshape(-1, 784).astype('float32') / 255.0
X_test  = X_test.reshape(-1, 784).astype('float32') / 255.0

print(f"Train: {X_train.shape}, Test: {X_test.shape}")
print(f"Classes: {len(set(y_train))}")

# Visualiser quelques exemples
fig, axes = plt.subplots(2, 5, figsize=(12, 5))
for i, ax in enumerate(axes.flat):
    ax.imshow(X_train[i].reshape(28, 28), cmap='gray')
    ax.set_title(f"Label: {y_train[i]}")
    ax.axis('off')
plt.suptitle("Exemples MNIST")
plt.show()
\`\`\``,
          },
          {
            title: 'Construire et entraîner le MLP',
            instructions: `\`\`\`python
model = keras.Sequential([
    layers.Dense(256, activation='relu', input_shape=(784,)),
    layers.Dropout(0.3),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(10, activation='softmax')  # 10 classes (0-9)
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',  # pour les labels entiers
    metrics=['accuracy']
)

model.summary()

history = model.fit(
    X_train, y_train,
    epochs=20,
    batch_size=128,
    validation_split=0.1,
    verbose=1
)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTest accuracy: {test_acc:.3f}")  # doit atteindre ~98%

# Prédictions
y_pred = model.predict(X_test[:10]).argmax(axis=1)
print("Prédictions:", y_pred)
print("Réel:       ", y_test[:10])
\`\`\``,
          },
        ],
        hints: [
          'MNIST est le "Hello World" du deep learning — cible 98%+ d\'accuracy',
          'Dropout réduit l\'overfitting en désactivant des neurones aléatoirement',
          'sparse_categorical_crossentropy quand les labels sont des entiers (0, 1, 2...)',
        ],
        solution: `# Architecture MLP typique pour classification :
# Input → Dense(ReLU) → Dropout → Dense(ReLU) → Dropout → Dense(Softmax/Sigmoid)
# Adam optimizer + bon learning rate = 0.001 (par défaut) est souvent optimal`,
      },
    ],
  },

  // ─── MODULE 316 ───────────────────────────────────────────────────────────
  {
    id: 316,
    level: 'Avancé',
    icon: '📝',
    title: 'NLP — Traitement du texte',
    desc: 'TF-IDF, embeddings, classification de texte — extraire du signal depuis des données textuelles.',
    color: 'orange',
    colorHex: '#F3752B',
    lessons: [
      {
        title: 'Du texte brut aux features numériques',
        content: `## Comment les machines lisent le texte

Les modèles ML ne comprennent pas les mots — il faut les **vectoriser**.

### Bag of Words et TF-IDF

\`\`\`python
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

corpus = [
    "Le machine learning est fascinant",
    "Le deep learning utilise des réseaux de neurones",
    "Les réseaux de neurones apprennent automatiquement",
    "Python est parfait pour le machine learning",
]

# Bag of Words : compte les occurrences
bow = CountVectorizer()
X_bow = bow.fit_transform(corpus)
print("Bag of Words shape:", X_bow.shape)
print("Vocabulaire (extrait):", list(bow.vocabulary_.keys())[:10])

# TF-IDF : pondère par la rareté des mots
tfidf = TfidfVectorizer(max_features=1000, ngram_range=(1, 2))
X_tfidf = tfidf.fit_transform(corpus)
print("\\nTF-IDF shape:", X_tfidf.shape)
\`\`\`

**TF-IDF = Term Frequency × Inverse Document Frequency**
- Un mot fréquent dans UN document mais rare globalement → poids élevé
- Un mot fréquent partout ("le", "est") → poids faible

### Prétraitement du texte

\`\`\`python
import re

def preprocess(text):
    text = text.lower()                        # minuscules
    text = re.sub(r'[^a-zàéèêëîïôùûü ]+', ' ', text)  # enlever ponctuation
    text = re.sub(r'\\s+', ' ', text).strip()    # espaces multiples
    return text

# Stopwords (mots vides) avec NLTK
import nltk
nltk.download('stopwords', quiet=True)
from nltk.corpus import stopwords

stop_fr = set(stopwords.words('french'))
tfidf_fr = TfidfVectorizer(
    preprocessor=preprocess,
    stop_words=list(stop_fr),
    max_features=5000,
    ngram_range=(1, 2)
)
\`\`\``,
        links: [
          { label: 'TfidfVectorizer — scikit-learn', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html' },
          { label: 'NLTK — Natural Language Toolkit', url: 'https://www.nltk.org/' },
        ],
      },
      {
        title: 'Classification de texte et embeddings',
        content: `## Pipeline de classification de texte

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

# Pipeline complet texte → modèle
text_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=10000, ngram_range=(1, 2))),
    ('model', LogisticRegression(max_iter=1000, C=1.0)),
])

# Entraîner et évaluer
text_pipeline.fit(X_train_text, y_train)
y_pred = text_pipeline.predict(X_test_text)

from sklearn.metrics import classification_report
print(classification_report(y_test, y_pred))

# Voir les features les plus importantes
feature_names = text_pipeline['tfidf'].get_feature_names_out()
coefs = text_pipeline['model'].coef_[0]

import pandas as pd
top_pos = pd.Series(coefs, index=feature_names).nlargest(10)
top_neg = pd.Series(coefs, index=feature_names).nsmallest(10)
print("Mots positifs:", top_pos.index.tolist())
print("Mots négatifs:", top_neg.index.tolist())
\`\`\`

### Word Embeddings (représentation dense)

TF-IDF crée des vecteurs creux. Les **embeddings** capturent le sens des mots.

\`\`\`python
# Sentence Transformers — embeddings pré-entraînés (puissants)
# pip install sentence-transformers
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

sentences = [
    "J'adore ce produit, excellent !",
    "Ce produit est mauvais, déçu.",
    "Livraison rapide, très satisfait.",
]

embeddings = model.encode(sentences)
print(f"Shape des embeddings: {embeddings.shape}")  # (3, 384)

# Utiliser les embeddings comme features
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression()
clf.fit(embeddings_train, y_train)
\`\`\``,
        links: [
          { label: 'Sentence Transformers', url: 'https://www.sbert.net/' },
          { label: 'Hugging Face — modèles NLP', url: 'https://huggingface.co/models' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Analyse de sentiment avec TF-IDF',
        scenario: 'Classifier des avis clients (positif / négatif) avec un pipeline TF-IDF + Logistic Regression.',
        steps: [
          {
            title: 'Créer le dataset et entraîner',
            instructions: `\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report
import numpy as np

# Dataset simulé d'avis clients
np.random.seed(42)
positifs = [
    "Excellent produit, je recommande vivement !",
    "Très satisfait de mon achat, livraison rapide.",
    "Qualité parfaite, conforme à la description.",
    "Super rapport qualité/prix, vraiment top.",
    "Je suis ravi, produit fantastique et service au top.",
    "Parfait, exactement ce que je cherchais.",
    "Magnifique produit, très bonne qualité.",
    "Satisfait à 100%, livraison impeccable.",
] * 30

négatifs = [
    "Déçu, produit de mauvaise qualité.",
    "Ne fonctionne pas du tout, à éviter.",
    "Livraison très lente et produit abîmé.",
    "Arnaque totale, ne commandez pas !",
    "Terrible, rien ne correspond à la description.",
    "Service client inexistant, problème non résolu.",
    "Qualité médiocre, ne dure pas.",
    "Vraiment décevant, je regrette mon achat.",
] * 30

texts = positifs + négatifs
labels = [1] * len(positifs) + [0] * len(négatifs)

X_train, X_test, y_train, y_test = train_test_split(
    texts, labels, test_size=0.2, random_state=42, stratify=labels
)

# Pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2), max_features=5000)),
    ('clf',   LogisticRegression(max_iter=1000, C=1.0)),
])

pipeline.fit(X_train, y_train)
cv_scores = cross_val_score(pipeline, texts, labels, cv=5)
print(f"CV accuracy: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
print(classification_report(y_test, pipeline.predict(X_test)))

# Test sur de nouvelles phrases
nouvelles = [
    "Super produit, livraison impeccable !",
    "Vraiment nul, je regrette.",
    "Correct mais pas exceptionnel.",
]
for text, pred in zip(nouvelles, pipeline.predict(nouvelles)):
    print(f"{'✅ Positif' if pred == 1 else '❌ Négatif'} : {text}")
\`\`\``,
          },
        ],
        hints: [
          'ngram_range=(1,2) capture aussi les bigrammes ("pas bien", "très satisfait")',
          'LogisticRegression est souvent très performant sur du texte TF-IDF',
        ],
        solution: `# TF-IDF + Logistic Regression = baseline solide pour la classification de texte
# Pour aller plus loin : Sentence Transformers ou BERT (Hugging Face)`,
      },
    ],
  },

  // ─── MODULE 317 ───────────────────────────────────────────────────────────
  {
    id: 317,
    level: 'Expert',
    icon: '🚀',
    title: 'Déployer un modèle ML',
    desc: 'joblib, FastAPI, Docker — mettre un modèle en production et exposer une API REST.',
    color: 'blue',
    colorHex: '#3FA7D6',
    lessons: [
      {
        title: 'Sauvegarder et charger un modèle',
        content: `## De l'entraînement à la production

Un modèle entraîné ne vaut rien s'il reste dans un notebook. Il faut le **déployer**.

### Sauvegarder avec joblib (recommandé pour sklearn)

\`\`\`python
import joblib
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

# Entraîner
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  RandomForestClassifier(n_estimators=200, random_state=42))
])
pipeline.fit(X_train, y_train)
print(f"Score test: {pipeline.score(X_test, y_test):.3f}")

# Sauvegarder TOUT le pipeline (scaler inclus)
joblib.dump(pipeline, 'model.pkl')
print("Modèle sauvegardé : model.pkl")

# Charger et utiliser directement
loaded_model = joblib.load('model.pkl')
predictions = loaded_model.predict([[25, 50000, 3]])  # données brutes non scalées
print("Prédiction:", predictions)
\`\`\`

> **Toujours sauvegarder le Pipeline complet**, pas juste le modèle — sinon le scaler sera absent en production.

### Versionner le modèle

\`\`\`python
import datetime, os

# Nom avec version et date
version = "v1.0"
date = datetime.date.today().strftime("%Y%m%d")
filename = f"model_{version}_{date}.pkl"

joblib.dump(pipeline, filename)
print(f"Sauvegardé : {filename}")

# Sauvegarder aussi les métadonnées
import json
metadata = {
    "version": version,
    "date": date,
    "train_score": pipeline.score(X_train, y_train),
    "test_score":  pipeline.score(X_test, y_test),
    "features": ["age", "salaire", "nb_projets"],
    "model_type": type(pipeline['model']).__name__,
}
with open(f"metadata_{version}_{date}.json", "w") as f:
    json.dump(metadata, f, indent=2)
\`\`\``,
        links: [
          { label: 'joblib — persistence', url: 'https://joblib.readthedocs.io/en/stable/persistence.html' },
          { label: 'FastAPI — documentation', url: 'https://fastapi.tiangolo.com/' },
        ],
      },
      {
        title: 'API REST avec FastAPI',
        content: `## Exposer le modèle via une API

### Structure du projet

\`\`\`
ml_api/
  ├── model.pkl          ← ton pipeline sauvegardé
  ├── main.py            ← l'API FastAPI
  └── requirements.txt
\`\`\`

### main.py — l'API

\`\`\`python
# pip install fastapi uvicorn pydantic joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="ML Prediction API", version="1.0")

# Charger le modèle au démarrage
model = joblib.load("model.pkl")

# Schéma d'entrée (validation automatique)
class PredictionRequest(BaseModel):
    age: float
    salaire: float
    nb_projets: int

class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    label: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        features = np.array([[request.age, request.salaire, request.nb_projets]])
        pred = model.predict(features)[0]
        proba = model.predict_proba(features)[0].max()
        return {
            "prediction": int(pred),
            "probability": round(float(proba), 3),
            "label": "Promu" if pred == 1 else "Non promu"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
\`\`\`

### Lancer l'API

\`\`\`bash
uvicorn main:app --reload --port 8000
\`\`\`

### Tester l'API

\`\`\`python
import requests

response = requests.post(
    "http://localhost:8000/predict",
    json={"age": 35, "salaire": 75000, "nb_projets": 8}
)
print(response.json())
# → {"prediction": 1, "probability": 0.87, "label": "Promu"}
\`\`\`

### Documentation automatique

FastAPI génère une doc interactive sur **http://localhost:8000/docs** (Swagger UI).`,
        links: [
          { label: 'FastAPI — getting started', url: 'https://fastapi.tiangolo.com/tutorial/' },
          { label: 'Pydantic — validation', url: 'https://docs.pydantic.dev/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Déployer une API de prédiction',
        scenario: 'Tu as entraîné un modèle de classification. L\'objectif est de le déployer via FastAPI pour que d\'autres services puissent l\'utiliser.',
        steps: [
          {
            title: 'Entraîner et sauvegarder le modèle',
            instructions: `\`\`\`python
# Étape 1 : train_model.py
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import joblib, json, datetime

X, y = make_classification(n_samples=2000, n_features=5, n_informative=4,
                            feature_names=['age', 'salaire', 'exp', 'score', 'projets'],
                            random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  RandomForestClassifier(n_estimators=200, random_state=42))
])
pipeline.fit(X_train, y_train)

test_score = pipeline.score(X_test, y_test)
print(f"Test accuracy: {test_score:.3f}")

joblib.dump(pipeline, 'model.pkl')
print("Modèle sauvegardé")
\`\`\``,
          },
          {
            title: 'Créer et tester l\'API FastAPI',
            instructions: `\`\`\`python
# Étape 2 : Créer main.py avec ce contenu

main_py = """
from fastapi import FastAPI
from pydantic import BaseModel
import joblib, numpy as np

app = FastAPI(title="Promo Prediction API")
model = joblib.load("model.pkl")

class Features(BaseModel):
    age: float
    salaire: float
    exp: float
    score: float
    projets: float

@app.get("/health")
def health():
    return {"status": "ok", "model": "loaded"}

@app.post("/predict")
def predict(features: Features):
    X = np.array([[features.age, features.salaire, features.exp,
                    features.score, features.projets]])
    pred = model.predict(X)[0]
    proba = model.predict_proba(X)[0].max()
    return {"prediction": int(pred), "probability": round(float(proba), 3)}
"""

with open('main.py', 'w') as f:
    f.write(main_py)
print("main.py créé")
print("\\nLancer l'API avec :")
print("  pip install fastapi uvicorn")
print("  uvicorn main:app --reload --port 8000")
print("\\nTester avec :")
print("  curl -X POST http://localhost:8000/predict -H 'Content-Type: application/json' \\\\")
print("       -d '{\\\"age\\\": 35, \\\"salaire\\\": 70000, \\\"exp\\\": 10, \\\"score\\\": 85, \\\"projets\\\": 6}'")
\`\`\``,
          },
        ],
        hints: [
          'FastAPI génère automatiquement la documentation Swagger sur /docs',
          'Toujours sauvegarder le Pipeline complet — pas seulement le modèle',
          'Pydantic valide automatiquement les types d\'entrée',
        ],
        solution: `# Architecture de déploiement ML standard :
# 1. train.py → model.pkl
# 2. main.py (FastAPI) → expose /predict
# 3. Docker → conteneurise l'API
# 4. Cloud (Render, Railway, HuggingFace Spaces) → héberge`,
      },
    ],
  },

  // ─── MODULE 318 ───────────────────────────────────────────────────────────
  {
    id: 318,
    level: 'Expert',
    icon: '📊',
    title: 'MLOps — Suivre ses expériences',
    desc: 'MLflow, reproductibilité, bonnes pratiques production — industrialiser ses projets ML.',
    color: 'purple',
    colorHex: '#AA7DCE',
    lessons: [
      {
        title: 'Pourquoi MLOps ?',
        content: `## Le fossé entre notebook et production

En entreprise, un modèle ML doit être :
- **Reproductible** : quelqu'un d'autre peut re-entraîner exactement le même modèle
- **Traçable** : on sait quels hyperparamètres ont donné quel résultat
- **Déployable** : le passage de dev à prod est automatisé
- **Monitorable** : on détecte quand le modèle se dégrade

### Les problèmes sans MLOps

\`\`\`
"Ce modèle marchait il y a 3 mois, maintenant il plante..."
"Quel learning_rate j'avais utilisé pour ce modèle en prod ?"
"La data a changé mais on s'en est rendu compte 2 semaines après."
\`\`\`

### MLflow — tracker d'expériences

MLflow est l'outil open-source de référence pour :
- Logger les **paramètres et métriques** de chaque run
- **Comparer** plusieurs expériences visuellement
- **Sauvegarder** les modèles avec leurs métadonnées

\`\`\`bash
pip install mlflow
mlflow ui  # lance l'interface web sur http://localhost:5000
\`\`\``,
        links: [
          { label: 'MLflow — documentation', url: 'https://mlflow.org/docs/latest/' },
          { label: 'MLflow — guide de démarrage', url: 'https://mlflow.org/docs/latest/getting-started/' },
        ],
      },
      {
        title: 'MLflow en pratique',
        content: `## Tracker ses expériences avec MLflow

### Logging basique

\`\`\`python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.datasets import make_classification
import numpy as np

X, y = make_classification(n_samples=2000, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Démarrer une expérience MLflow
mlflow.set_experiment("classification-experiment")

with mlflow.start_run(run_name="random_forest_v1"):
    # Paramètres
    params = {"n_estimators": 200, "max_depth": 10, "min_samples_leaf": 5}
    mlflow.log_params(params)

    # Entraînement
    model = RandomForestClassifier(**params, random_state=42)
    model.fit(X_train, y_train)

    # Métriques
    train_acc = model.score(X_train, y_train)
    test_acc  = model.score(X_test, y_test)
    cv_acc    = cross_val_score(model, X_train, y_train, cv=5).mean()

    mlflow.log_metric("train_accuracy", train_acc)
    mlflow.log_metric("test_accuracy",  test_acc)
    mlflow.log_metric("cv_accuracy",    cv_acc)

    # Sauvegarder le modèle
    mlflow.sklearn.log_model(model, "random_forest_model")

    print(f"Run ID: {mlflow.active_run().info.run_id}")
    print(f"Test accuracy: {test_acc:.3f}")
\`\`\`

### Comparer plusieurs runs

\`\`\`python
# Tester plusieurs configurations automatiquement
configs = [
    {"n_estimators": 100, "max_depth": 5},
    {"n_estimators": 200, "max_depth": 10},
    {"n_estimators": 300, "max_depth": 15},
]

mlflow.set_experiment("rf-hyperparameter-search")

for config in configs:
    with mlflow.start_run():
        mlflow.log_params(config)
        model = RandomForestClassifier(**config, random_state=42)
        model.fit(X_train, y_train)
        mlflow.log_metric("test_accuracy", model.score(X_test, y_test))
        mlflow.sklearn.log_model(model, "model")

print("Ouvrir http://localhost:5000 pour comparer les runs !")
\`\`\`

### Charger un modèle depuis MLflow

\`\`\`python
# Récupérer le meilleur run
from mlflow.tracking import MlflowClient

client = MlflowClient()
experiment = client.get_experiment_by_name("rf-hyperparameter-search")
runs = client.search_runs(experiment.experiment_id,
                           order_by=["metrics.test_accuracy DESC"])

best_run = runs[0]
print(f"Meilleur run: {best_run.info.run_id}")
print(f"Test accuracy: {best_run.data.metrics['test_accuracy']:.3f}")
print(f"Params: {best_run.data.params}")

# Charger le modèle du meilleur run
model_uri = f"runs:/{best_run.info.run_id}/model"
best_model = mlflow.sklearn.load_model(model_uri)
print(f"Modèle chargé — accuracy vérifiée: {best_model.score(X_test, y_test):.3f}")
\`\`\``,
        links: [
          { label: 'MLflow Tracking', url: 'https://mlflow.org/docs/latest/tracking.html' },
          { label: 'DVC — versioning de données', url: 'https://dvc.org/' },
        ],
      },
    ],
    exercises: [
      {
        title: 'Tracker une recherche d\'hyperparamètres avec MLflow',
        scenario: 'Tu dois comparer 5 configurations de modèles et retrouver la meilleure automatiquement via MLflow.',
        steps: [
          {
            title: 'Setup et tracking complet',
            instructions: `\`\`\`python
# pip install mlflow
import mlflow
import mlflow.sklearn
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import f1_score
import numpy as np

X, y = make_classification(n_samples=3000, n_features=20, n_informative=12,
                            weights=[0.7, 0.3], random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,
                                                      stratify=y, random_state=42)

mlflow.set_experiment("model-comparison")

experiments = [
    ("RF-small",  RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)),
    ("RF-medium", RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)),
    ("RF-large",  RandomForestClassifier(n_estimators=300, max_depth=15, random_state=42)),
    ("GBM-slow",  GradientBoostingClassifier(n_estimators=200, learning_rate=0.05, random_state=42)),
    ("GBM-fast",  GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, random_state=42)),
]

for run_name, model in experiments:
    with mlflow.start_run(run_name=run_name):
        # Log des paramètres du modèle
        mlflow.log_params(model.get_params())

        # Entraînement
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        # Métriques
        metrics = {
            "test_accuracy": model.score(X_test, y_test),
            "test_f1":       f1_score(y_test, y_pred),
            "cv_accuracy":   cross_val_score(model, X_train, y_train, cv=5).mean(),
        }
        mlflow.log_metrics(metrics)
        mlflow.sklearn.log_model(model, "model")

        print(f"{run_name:12s}  accuracy={metrics['test_accuracy']:.3f}  f1={metrics['test_f1']:.3f}")

print("\\n✅ Ouvrir http://localhost:5000 pour visualiser et comparer tous les runs !")
print("   Lancer d'abord : mlflow ui")
\`\`\``,
          },
        ],
        hints: [
          'mlflow ui doit tourner en arrière-plan pour voir le dashboard',
          'model.get_params() récupère automatiquement tous les hyperparamètres',
          'MLflow stocke tout localement dans ./mlruns par défaut',
        ],
        solution: `# Workflow MLOps minimal :
# 1. mlflow.set_experiment("nom") — crée/sélectionne une expérience
# 2. with mlflow.start_run() — démarre un run
# 3. mlflow.log_params() + mlflow.log_metrics() — trace tout
# 4. mlflow.sklearn.log_model() — sauvegarde le modèle
# 5. mlflow ui — visualise et compare`,
      },
    ],
  },
];

export default ML_MODULES;
