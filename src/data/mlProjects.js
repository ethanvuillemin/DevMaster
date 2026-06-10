/**
 * Mini-projets métier pour le parcours ML.
 * Clé = moduleId. Chaque projet remplace les exercices Python synthétiques.
 * Datasets issus de sources fiables : data.gouv.fr, INSEE, Kaggle officiel, etc.
 * Les projets sont connectés entre eux pour simuler un workflow réel de A à Z.
 */

const ML_PROJECTS = {

  // ── Module 303 — Régression ──────────────────────────────────────────────
  303: [
    {
      title: 'Estimer le prix de vente des appartements parisiens',
      sector: '🏘️ Immobilier',
      context:
        "Tu rejoins une startup proptech qui veut automatiser les estimations immobilières. " +
        "Le département commercial reçoit des centaines de demandes par semaine et ne peut plus " +
        "traiter manuellement chaque bien. Ta mission : entraîner un modèle de régression sur les " +
        "transactions réelles pour prédire le prix de vente au m².",
      objective:
        "Construire un modèle de régression (LinearRegression + RandomForest) sur les DVF Paris 2023. " +
        "Mesurer et comparer MAE, RMSE et R². Identifier les variables les plus influentes.",
      dataset: {
        label: 'DVF 2023 — Demandes de Valeurs Foncières (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['LinearRegression', 'RandomForestRegressor', 'MAE', 'RMSE', 'R²'],
      connectedFrom: null,
      connectedTo: 'Préparer ses données (Module 7)',
      starter: `\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

# Télécharger le fichier DVF depuis data.gouv.fr (format CSV)
# Lien direct : https://files.data.gouv.fr/geo-dvf/latest/csv/2023/departements/75.csv.gz
df = pd.read_csv('75.csv.gz', compression='gzip', low_memory=False)

# Filtrer : appartements uniquement, Paris
df = df[
    (df['type_local'] == 'Appartement') &
    (df['surface_reelle_bati'].between(9, 300)) &
    (df['valeur_fonciere'].between(50_000, 5_000_000))
].copy()

df['prix_m2'] = df['valeur_fonciere'] / df['surface_reelle_bati']

features = ['surface_reelle_bati', 'nombre_pieces_principales', 'code_postal']
df = df[features + ['prix_m2']].dropna()
df = pd.get_dummies(df, columns=['code_postal'], drop_first=True)

X = df.drop('prix_m2', axis=1)
y = df['prix_m2']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

for name, model in [('LinearRegression', LinearRegression()),
                     ('RandomForest',     RandomForestRegressor(n_estimators=100, random_state=42))]:
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    print(f"\\n{name}")
    print(f"  MAE  : {mean_absolute_error(y_test, y_pred):,.0f} €/m²")
    print(f"  RMSE : {np.sqrt(mean_squared_error(y_test, y_pred)):,.0f} €/m²")
    print(f"  R²   : {r2_score(y_test, y_pred):.3f}")
\`\`\``,
    },
    {
      title: 'Prévoir la consommation électrique régionale',
      sector: '⚡ Énergie',
      context:
        "Un bureau d'études travaille pour un gestionnaire de réseau électrique régional. " +
        "Anticiper la demande en électricité est critique : une sous-estimation provoque des coupures, " +
        "une surestimation entraîne du gaspillage. " +
        "Ta mission : modéliser la consommation journalière à partir de données historiques et de features temporelles.",
      objective:
        "Entraîner un modèle de régression sur la consommation quotidienne brute par région. " +
        "Créer des features temporelles (jour de semaine, mois, saison). " +
        "Comparer LinearRegression et GradientBoosting. Mesurer le RMSE en MW.",
      dataset: {
        label: 'Consommation quotidienne brute régionale — RTE (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/consommation-quotidienne-brute-regionale/',
      },
      skills: ['features temporelles', 'GradientBoostingRegressor', 'RMSE', 'feature_importances'],
      connectedFrom: null,
      connectedTo: null,
      starter: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

df = pd.read_csv('consommation-quotidienne-brute-regionale.csv', sep=';')
df['date'] = pd.to_datetime(df['date'])

# Feature engineering temporel
df['jour_semaine'] = df['date'].dt.dayofweek
df['mois']         = df['date'].dt.month
df['saison']       = df['mois'].map({12:0,1:0,2:0, 3:1,4:1,5:1, 6:2,7:2,8:2, 9:3,10:3,11:3})
df['est_weekend']  = (df['jour_semaine'] >= 5).astype(int)

target = 'consommation_brute_totale'
features = ['jour_semaine', 'mois', 'saison', 'est_weekend']
df = df[features + [target]].dropna()

X_train, X_test, y_train, y_test = train_test_split(
    df[features], df[target], test_size=0.2, random_state=42)

for name, model in [
    ('LinearRegression', LinearRegression()),
    ('GradientBoosting', GradientBoostingRegressor(n_estimators=200, random_state=42)),
]:
    model.fit(X_train, y_train)
    rmse = np.sqrt(mean_squared_error(y_test, model.predict(X_test)))
    print(f"{name:22s}  RMSE : {rmse:,.0f} MW")
\`\`\``,
    },
    {
      title: 'Prédire le loyer des annonces Airbnb à Paris',
      sector: '🏨 Tourisme & Location',
      context:
        "Une agence de gestion locative gère des appartements sur Airbnb. " +
        "Les propriétaires demandent souvent quel prix fixer pour leur logement. " +
        "L'agence veut automatiser cette recommandation avec un modèle ML " +
        "qui prend en compte la localisation, la taille, les équipements et le type de bien.",
      objective:
        "Prédire le prix par nuit d'une annonce Airbnb. " +
        "Encoder les variables catégorielles (quartier, type de chambre). " +
        "Comparer RMSE entre LinearRegression et RandomForest. " +
        "Identifier les 5 features les plus influentes.",
      dataset: {
        label: 'Inside Airbnb — listings Paris (CSV open data)',
        url: 'http://insideairbnb.com/get-the-data/',
      },
      skills: ['OneHotEncoding', 'RandomForestRegressor', 'feature_importances', 'log-transform'],
      connectedFrom: null,
      connectedTo: null,
      starter: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv('listings.csv.gz', compression='gzip', low_memory=False)

# Nettoyage du prix
df['price'] = df['price'].str.replace('[$,]', '', regex=True).astype(float)
df = df[df['price'].between(10, 1000)].copy()

# Features pertinentes
features_num = ['accommodates', 'bathrooms', 'bedrooms', 'minimum_nights']
features_cat = ['neighbourhood_cleansed', 'room_type']
df = df[features_num + features_cat + ['price']].dropna()

X = pd.get_dummies(df.drop('price', axis=1), columns=features_cat, drop_first=True)
y = np.log1p(df['price'])  # log-transform pour stabiliser

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=200, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

y_pred = np.expm1(model.predict(X_test))
y_true = np.expm1(y_test)
print(f"RMSE   : {np.sqrt(mean_squared_error(y_true, y_pred)):.1f} €/nuit")
print(f"R²     : {r2_score(y_true, y_pred):.3f}")

import pandas as pd
feat_imp = pd.Series(model.feature_importances_, index=X.columns).nlargest(5)
print("\\nTop 5 features:", feat_imp)
\`\`\``,
    },
  ],

  // ── Module 304 — Classification ─────────────────────────────────────────
  304: [
    {
      title: 'Prédire la gravité des accidents de la route',
      sector: '🚗 Sécurité routière',
      context:
        "Tu travailles pour un assureur automobile qui veut affiner son scoring de risque. " +
        "En analysant les accidents passés, le modèle doit prédire si un accident sera " +
        "grave (blessé hospitalisé ou tué) ou bénin (indemne / blessé léger). " +
        "Ce modèle alimentera directement la tarification des nouveaux contrats.",
      objective:
        "Classifier la gravité des accidents routiers français. " +
        "Entraîner RandomForest et évaluer avec accuracy, F1-macro, matrice de confusion. " +
        "Comparer avec et sans class_weight='balanced'.",
      dataset: {
        label: 'Accidents corporels de la circulation 2023 (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2023/',
      },
      skills: ['RandomForestClassifier', 'accuracy', 'F1-macro', 'confusion_matrix', 'class_weight'],
      connectedFrom: null,
      connectedTo: 'Préparer ses données (Module 7)',
      starter: `\`\`\`python
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns, matplotlib.pyplot as plt

# Télécharger les 4 fichiers 2023 : caracteristiques, lieux, vehicules, usagers
# https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-...
carac = pd.read_csv('carcteristiques-2023.csv', sep=';', low_memory=False)
usag  = pd.read_csv('usagers-2023.csv',         sep=';', low_memory=False)

# Fusionner et construire la cible
df = carac.merge(usag, on='Num_Acc', how='inner')
# grav : 1=indemne, 2=tué, 3=blessé hospit., 4=blessé léger
df['grave'] = df['grav'].isin([2, 3]).astype(int)

features = ['lum', 'agg', 'int', 'atm', 'col', 'catr', 'vosp', 'prof', 'plan']
df = df[features + ['grave']].dropna()

X_train, X_test, y_train, y_test = train_test_split(
    df[features], df['grave'], test_size=0.2, stratify=df['grave'], random_state=42)

for label, kw in [('Sans équilibre', {}), ('Avec class_weight', {'class_weight': 'balanced'})]:
    clf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1, **kw)
    clf.fit(X_train, y_train)
    print(f"\\n=== {label} ===")
    print(classification_report(y_test, clf.predict(X_test)))
\`\`\``,
    },
    {
      title: 'Détecter les défauts de crédit bancaire',
      sector: '🏦 Finance & Risque',
      context:
        "Une banque de détail veut améliorer son processus d'octroi de crédit. " +
        "Actuellement, les conseillers décident manuellement, ce qui est long et inconsistant. " +
        "Ta mission : construire un classifieur qui prédit si un emprunteur va faire défaut " +
        "dans les 24 mois, en maximisant le recall pour ne pas rater les mauvais payeurs.",
      objective:
        "Prédire le défaut de crédit (classification binaire). " +
        "Optimiser le recall sur la classe 'défaut' sans trop dégrader la précision. " +
        "Comparer LogisticRegression, RandomForest, XGBoost sur AUC-ROC.",
      dataset: {
        label: 'Credit Risk Dataset — Kaggle (Laotse)',
        url: 'https://www.kaggle.com/datasets/laotse/credit-risk-dataset',
      },
      skills: ['LogisticRegression', 'XGBClassifier', 'AUC-ROC', 'recall', 'seuil'],
      connectedFrom: null,
      connectedTo: 'Données déséquilibrées (Module 12)',
      starter: `\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv('credit_risk_dataset.csv').dropna()

# Encodage
for col in df.select_dtypes(include='object').columns:
    df[col] = LabelEncoder().fit_transform(df[col])

X = df.drop('loan_status', axis=1)
y = df['loan_status']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

for name, clf in [
    ('LogisticRegression', LogisticRegression(max_iter=1000, class_weight='balanced')),
    ('RandomForest',       RandomForestClassifier(100, class_weight='balanced', random_state=42)),
]:
    clf.fit(X_train, y_train)
    y_pred  = clf.predict(X_test)
    y_proba = clf.predict_proba(X_test)[:, 1]
    print(f"\\n{name}")
    print(classification_report(y_test, y_pred))
    print(f"AUC-ROC : {roc_auc_score(y_test, y_proba):.3f}")
\`\`\``,
    },
    {
      title: 'Prédire le churn client d\'un opérateur télécom',
      sector: '📱 Télécom & CRM',
      context:
        "Le service marketing d'un opérateur télécom constate une fuite de clients vers la concurrence. " +
        "Retenir un client coûte 5× moins cher qu'en acquérir un nouveau. " +
        "Ta mission : identifier les clients susceptibles de partir dans les 30 jours " +
        "pour déclencher une campagne de rétention ciblée.",
      objective:
        "Classifier les clients 'churn' vs 'non-churn'. " +
        "Analyser les features les plus discriminantes (contrat, ancienneté, service). " +
        "Optimiser le F1-score. Produire une liste des top 100 clients à risque.",
      dataset: {
        label: 'Telco Customer Churn — IBM (Kaggle)',
        url: 'https://www.kaggle.com/datasets/blastchar/telco-customer-churn',
      },
      skills: ['GradientBoostingClassifier', 'feature_importances', 'F1', 'predict_proba', 'top-k scoring'],
      connectedFrom: null,
      connectedTo: null,
      starter: `\`\`\`python
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv('WA_Fn-UseC_-Telco-Customer-Churn.csv')
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df.dropna(inplace=True)
df.drop('customerID', axis=1, inplace=True)

for col in df.select_dtypes(include='object').columns:
    df[col] = LabelEncoder().fit_transform(df[col])

X = df.drop('Churn', axis=1)
y = df['Churn']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)

clf = GradientBoostingClassifier(n_estimators=200, learning_rate=0.05, random_state=42)
clf.fit(X_train, y_train)
print(classification_report(y_test, clf.predict(X_test)))

# Top 100 clients les plus à risque
X_test_df = X_test.copy()
X_test_df['churn_proba'] = clf.predict_proba(X_test)[:, 1]
top100 = X_test_df.nlargest(100, 'churn_proba')
print(f"\\nTop 100 clients à risque — churn_proba min : {top100['churn_proba'].min():.2%}")
\`\`\``,
    },
  ],

  // ── Module 305 — Clustering ──────────────────────────────────────────────
  305: [
    {
      title: 'Segmenter les communes françaises par profil socio-économique',
      sector: '🗺️ Secteur public & Urbanisme',
      context:
        "Un cabinet de conseil accompagne des collectivités locales dans leur stratégie de développement. " +
        "Pour benchmarker les communes entre elles et orienter les investissements publics, " +
        "ils veulent regrouper les communes de France en profils homogènes " +
        "(communes rurales pauvres, périurbaines dynamiques, métropoles, etc.).",
      objective:
        "Appliquer K-Means sur les données socio-économiques des communes françaises. " +
        "Choisir le bon K avec la méthode Elbow et le score de silhouette. " +
        "Caractériser chaque cluster et le visualiser sur une carte.",
      dataset: {
        label: 'Base des communes — INSEE / data.gouv.fr',
        url: 'https://www.data.gouv.fr/fr/datasets/base-des-communes-de-france/',
      },
      skills: ['KMeans', 'silhouette_score', 'méthode Elbow', 'StandardScaler', 'visualisation clusters'],
      connectedFrom: null,
      connectedTo: 'Réduction de dimension (Module 14)',
      starter: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt

# Télécharger la base communes enrichie avec données INSEE
df = pd.read_csv('communes-france.csv', sep=';', low_memory=False)

features = ['pop_totale', 'superficie', 'revenus_medians', 'taux_chomage', 'part_logements_sociaux']
df = df[features].dropna()

scaler = StandardScaler()
X = scaler.fit_transform(df)

# Méthode Elbow + silhouette
inertias, silhouettes = [], []
for k in range(2, 11):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = km.fit_predict(X)
    inertias.append(km.inertia_)
    silhouettes.append(silhouette_score(X, labels, sample_size=5000))

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(range(2, 11), inertias, 'o-')
axes[0].set_title('Elbow — inertie')
axes[1].plot(range(2, 11), silhouettes, 'o-', color='orange')
axes[1].set_title('Silhouette score')
plt.show()

best_k = 5  # À ajuster selon les courbes
km = KMeans(n_clusters=best_k, random_state=42, n_init=10)
df['cluster'] = km.fit_predict(X)
print(df.groupby('cluster')[features].mean().round(1))
\`\`\``,
    },
    {
      title: 'Créer des personas clients pour un e-commerce',
      sector: '🛒 E-commerce & Marketing',
      context:
        "Le département marketing d'une enseigne de mode en ligne veut personnaliser " +
        "ses campagnes email. Actuellement tout le monde reçoit les mêmes offres. " +
        "Ta mission : segmenter la base clients en personas (grands acheteurs, occasionnels, " +
        "chasseurs de promo...) pour adapter les messages et les offres.",
      objective:
        "Appliquer K-Means et DBSCAN sur des métriques RFM (Récence, Fréquence, Montant). " +
        "Comparer les deux approches. " +
        "Nommer et décrire chaque segment de façon actionnable pour le marketing.",
      dataset: {
        label: 'Mall Customer Segmentation Dataset — Kaggle',
        url: 'https://www.kaggle.com/datasets/vjchoudhary7/customer-segmentation-tutorial-in-python',
      },
      skills: ['KMeans', 'DBSCAN', 'métriques RFM', 'silhouette_score', 'personas'],
      connectedFrom: null,
      connectedTo: null,
      starter: `\`\`\`python
import pandas as pd
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt

df = pd.read_csv('Mall_Customers.csv')
df.columns = df.columns.str.lower().str.replace(' ', '_')

features = ['annual_income_(k$)', 'spending_score_(1-100)']
X = StandardScaler().fit_transform(df[features])

# K-Means
km = KMeans(n_clusters=5, random_state=42, n_init=10)
df['cluster_km'] = km.fit_predict(X)
print(f"KMeans silhouette : {silhouette_score(X, df['cluster_km']):.3f}")

# DBSCAN
db = DBSCAN(eps=0.5, min_samples=5)
df['cluster_db'] = db.fit_predict(X)
n_clusters = len(set(df['cluster_db'])) - (1 if -1 in df['cluster_db'].values else 0)
print(f"DBSCAN : {n_clusters} clusters, {(df['cluster_db']==-1).sum()} outliers")

# Visualisation K-Means
plt.figure(figsize=(8, 6))
for c in df['cluster_km'].unique():
    sub = df[df['cluster_km'] == c]
    plt.scatter(sub[features[0]], sub[features[1]], label=f'Cluster {c}', s=40)
plt.xlabel('Revenu annuel (k$)')
plt.ylabel('Score d\'achat (1-100)')
plt.legend()
plt.title('Segmentation clients K-Means')
plt.show()

print("\\nProfil moyen par cluster K-Means:")
print(df.groupby('cluster_km')[features].mean().round(1))
\`\`\``,
    },
  ],

  // ── Module 307 — Préparer ses données ───────────────────────────────────
  307: [
    {
      title: 'Nettoyer et explorer le dataset DVF immobilier',
      sector: '🏘️ Immobilier',
      context:
        "Suite au projet du module Régression, tu reçois le fichier DVF brut. " +
        "Avant de pouvoir modéliser, il faut affronter la réalité : " +
        "doublons, valeurs aberrantes (prix à 1 €, surfaces nulles), " +
        "colonnes inutiles, encodages incohérents. " +
        "Un pipeline de nettoyage reproductible est indispensable.",
      objective:
        "Réaliser un EDA complet du fichier DVF (stats, distributions, corrélations). " +
        "Supprimer les doublons et lignes incohérentes. " +
        "Traiter les valeurs manquantes par imputation médiane. " +
        "Détecter et gérer les outliers de prix avec la méthode IQR.",
      dataset: {
        label: 'DVF 2023 — Demandes de Valeurs Foncières (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['EDA', 'dropna', 'IQR outliers', 'SimpleImputer', 'doublons'],
      connectedFrom: 'Régression (Module 3)',
      connectedTo: 'Feature Engineering (Module 9)',
      starter: `\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

df_raw = pd.read_csv('75.csv.gz', compression='gzip', low_memory=False)
df = df_raw[df_raw['type_local'] == 'Appartement'].copy()

print("=== 1. Vue d'ensemble ===")
print(f"Shape : {df.shape}")
print(f"Doublons : {df.duplicated().sum()}")
print(df.isnull().sum()[df.isnull().sum() > 0])

# Doublons
df = df.drop_duplicates()

# Outliers prix et surface
for col, lo, hi in [('valeur_fonciere', 10_000, 10_000_000),
                     ('surface_reelle_bati', 5, 500)]:
    avant = len(df)
    df = df[df[col].between(lo, hi)]
    print(f"{col}: {avant - len(df)} lignes supprimées")

# Imputation médiane
from sklearn.impute import SimpleImputer
num_cols = ['surface_reelle_bati', 'nombre_pieces_principales']
df[num_cols] = SimpleImputer(strategy='median').fit_transform(df[num_cols])

df['prix_m2'] = df['valeur_fonciere'] / df['surface_reelle_bati']
print(f"\\nDataset nettoyé : {df.shape}")
print(df['prix_m2'].describe())

# Heatmap corrélations
plt.figure(figsize=(8, 5))
sns.heatmap(df[['prix_m2','surface_reelle_bati','nombre_pieces_principales','valeur_fonciere']].corr(),
            annot=True, fmt='.2f', cmap='coolwarm')
plt.title('Corrélations DVF — appartements Paris 2023')
plt.show()
\`\`\``,
    },
    {
      title: 'EDA sur les accidents corporels de la route',
      sector: '🚗 Sécurité routière',
      context:
        "Avant de construire ton modèle de prédiction de gravité (module Classification), " +
        "le responsable data de l'assureur te demande de livrer un rapport d'exploration. " +
        "Où les accidents graves se produisent-ils le plus ? Quelles conditions météo ? " +
        "Quelles tranches horaires ? Ce rapport servira aussi au département actuariel.",
      objective:
        "Charger et fusionner les 4 fichiers accidents 2023. " +
        "Analyser la distribution de la gravité, des conditions météo, des heures et des types de route. " +
        "Identifier les valeurs manquantes et les coder correctement. " +
        "Produire 4 graphiques actionnables pour la direction.",
      dataset: {
        label: 'Accidents corporels de la circulation 2023 (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2023/',
      },
      skills: ['merge', 'value_counts', 'barplot', 'heatmap', 'missing values'],
      connectedFrom: 'Classification (Module 4)',
      connectedTo: 'Feature Engineering (Module 9)',
      starter: `\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

carac  = pd.read_csv('carcteristiques-2023.csv', sep=';', low_memory=False)
lieux  = pd.read_csv('lieux-2023.csv',           sep=';', low_memory=False)
usag   = pd.read_csv('usagers-2023.csv',          sep=';', low_memory=False)
veh    = pd.read_csv('vehicules-2023.csv',         sep=';', low_memory=False)

df = carac.merge(lieux, on='Num_Acc').merge(usag, on='Num_Acc')
print(f"Shape fusionné : {df.shape}")
print(f"Colonnes : {df.columns.tolist()}")

# Valeurs manquantes
missing = df.isnull().mean().sort_values(ascending=False)
print("\\nTop 10 colonnes avec NaN :")
print(missing[missing > 0].head(10))

# Distribution gravité
df['grave'] = df['grav'].isin([2, 3]).astype(int)
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

df['grave'].value_counts().plot(kind='bar', ax=axes[0,0], title='Gravité (1=grave)')
df['lum'].value_counts().plot(kind='bar', ax=axes[0,1], title='Conditions lumineuses')
df['atm'].value_counts().plot(kind='bar', ax=axes[1,0], title='Conditions atmosphériques')
df['catr'].value_counts().plot(kind='bar', ax=axes[1,1], title='Catégorie de route')
plt.tight_layout()
plt.show()
\`\`\``,
    },
  ],

  // ── Module 308 — Valider ses modèles ────────────────────────────────────
  308: [
    {
      title: 'Cross-valider le modèle de prix immobilier DVF',
      sector: '🏘️ Immobilier',
      context:
        "Ton manager veut savoir si le score R²=0.82 que tu affiches est fiable ou si " +
        "tu as juste eu de la chance sur un split favorable. " +
        "Avec les DVF, les prix varient fortement selon les périodes (hausse/baisse post-COVID). " +
        "Il faut valider le modèle de façon robuste avant de le mettre en production.",
      objective:
        "Appliquer 5-Fold Cross-Validation sur le modèle DVF. " +
        "Tracer la learning curve pour diagnostiquer overfitting ou underfitting. " +
        "Comparer LinearRegression vs RandomForest en CV. " +
        "Calculer l'intervalle de confiance du R² (moyenne ± 2 écart-types).",
      dataset: {
        label: 'DVF 2023 — Demandes de Valeurs Foncières (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['KFold', 'cross_val_score', 'learning_curve', 'intervalle de confiance'],
      connectedFrom: 'Préparer ses données (Module 7)',
      connectedTo: 'Feature Engineering (Module 9)',
      starter: `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import cross_val_score, KFold, learning_curve
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor

# Reprendre le dataset DVF nettoyé (module 307)
# X, y déjà préparés...

cv = KFold(n_splits=5, shuffle=True, random_state=42)

for name, model in [('LinearRegression', LinearRegression()),
                     ('RandomForest', RandomForestRegressor(100, random_state=42))]:
    scores = cross_val_score(model, X, y, cv=cv, scoring='r2')
    print(f"{name:22s}  R² = {scores.mean():.3f} ± {scores.std()*2:.3f}")

# Learning curve sur RandomForest
sizes, train_s, val_s = learning_curve(
    RandomForestRegressor(100, random_state=42), X, y,
    cv=5, train_sizes=np.linspace(0.1, 1.0, 10), scoring='r2')

plt.figure(figsize=(8, 5))
plt.plot(sizes, train_s.mean(axis=1), label='Train')
plt.plot(sizes, val_s.mean(axis=1),   label='Validation')
plt.fill_between(sizes, val_s.mean(axis=1)-val_s.std(axis=1),
                        val_s.mean(axis=1)+val_s.std(axis=1), alpha=0.2)
plt.xlabel('Taille du dataset d\'entraînement')
plt.ylabel('R²')
plt.legend()
plt.title('Learning Curve — Modèle DVF')
plt.show()
\`\`\``,
    },
    {
      title: 'Valider le classifieur d\'accidents avec courbes ROC',
      sector: '🚗 Sécurité routière',
      context:
        "Ton modèle de prédiction de gravité affiche un F1=0.71. " +
        "L'équipe actuarielle veut savoir si le modèle discrimine vraiment les cas graves " +
        "ou s'il profite juste du déséquilibre de classes. " +
        "Tu dois produire les courbes ROC et Precision-Recall pour le comité technique.",
      objective:
        "Évaluer le classifieur accidents avec StratifiedKFold. " +
        "Tracer la courbe ROC et calculer l'AUC moyen sur 5 folds. " +
        "Tracer la courbe Precision-Recall. " +
        "Identifier le seuil optimal F1 et justifier le choix métier.",
      dataset: {
        label: 'Accidents corporels de la circulation 2023 (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2023/',
      },
      skills: ['StratifiedKFold', 'roc_auc_score', 'courbe ROC', 'Precision-Recall', 'seuil optimal'],
      connectedFrom: 'Préparer ses données (Module 7)',
      connectedTo: 'Feature Engineering (Module 9)',
      starter: `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_curve, auc, precision_recall_curve

# Reprendre X, y depuis le dataset accidents nettoyé (module 307)

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
clf = RandomForestClassifier(100, class_weight='balanced', random_state=42)

# AUC par fold
aucs = cross_val_score(clf, X, y, cv=cv, scoring='roc_auc')
print(f"AUC-ROC : {aucs.mean():.3f} ± {aucs.std()*2:.3f}")

# Courbe ROC sur un split
from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
clf.fit(X_tr, y_tr)
proba = clf.predict_proba(X_te)[:, 1]

fpr, tpr, _ = roc_curve(y_te, proba)
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].plot(fpr, tpr, label=f'AUC={auc(fpr,tpr):.3f}')
axes[0].plot([0,1],[0,1],'k--')
axes[0].set_title('Courbe ROC — Accidents graves')
axes[0].legend()

p, r, thresholds = precision_recall_curve(y_te, proba)
f1 = 2*p*r/(p+r+1e-9)
best_t = thresholds[f1[:-1].argmax()]
axes[1].plot(r, p)
axes[1].set_title(f'Precision-Recall (seuil optimal={best_t:.2f})')
plt.show()
\`\`\``,
    },
  ],

  // ── Module 309 — Feature Engineering ────────────────────────────────────
  309: [
    {
      title: 'Enrichir le dataset DVF avec des features métier',
      sector: '🏘️ Immobilier',
      context:
        "Ton modèle DVF plafonne à R²=0.78. Le chief data officer pense " +
        "que les features brutes (surface, pièces, code postal) ne capturent pas " +
        "les nuances du marché parisien. Tu dois créer de nouvelles variables " +
        "pertinentes pour débloquer la performance.",
      objective:
        "Créer des features immobilières : prix/m² historique par arrondissement, " +
        "ratio surface/pièces, mois de vente, densité de transactions. " +
        "Normaliser les numériques, encoder les catégorielles. " +
        "Mesurer le gain de R² avant/après feature engineering.",
      dataset: {
        label: 'DVF 2023 — Demandes de Valeurs Foncières (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['feature creation', 'OrdinalEncoder', 'StandardScaler', 'SelectKBest', 'gain de performance'],
      connectedFrom: 'Valider ses modèles (Module 8)',
      connectedTo: 'Hyperparameter Tuning (Module 10)',
      starter: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler

# Reprendre df DVF nettoyé (module 307)

# Features brutes (baseline)
baseline_features = ['surface_reelle_bati', 'nombre_pieces_principales']

# Nouvelles features métier
df['ratio_surface_pieces'] = df['surface_reelle_bati'] / (df['nombre_pieces_principales'].clip(1))
df['mois_vente'] = pd.to_datetime(df['date_mutation']).dt.month
df['arrondissement'] = df['code_postal'].astype(str).str[-2:].astype(int)

# Prix médian par arrondissement (feature agrégée)
prix_med = df.groupby('arrondissement')['prix_m2'].transform('median')
df['prix_med_arrt'] = prix_med

new_features = baseline_features + ['ratio_surface_pieces', 'mois_vente', 'prix_med_arrt']
df_clean = df[new_features + ['prix_m2']].dropna()

X_base = df_clean[baseline_features]
X_new  = df_clean[new_features]
y      = df_clean['prix_m2']

rf = RandomForestRegressor(100, random_state=42)
r2_base = cross_val_score(rf, X_base, y, cv=5, scoring='r2').mean()
r2_new  = cross_val_score(rf, X_new,  y, cv=5, scoring='r2').mean()
print(f"R² baseline     : {r2_base:.3f}")
print(f"R² avec FE      : {r2_new:.3f}")
print(f"Gain            : +{r2_new - r2_base:.3f}")
\`\`\``,
    },
    {
      title: 'Créer des features temporelles et contextuelles pour les accidents',
      sector: '🚗 Sécurité routière',
      context:
        "L'équipe data de l'assureur te demande d'enrichir le dataset accidents " +
        "avec des variables de contexte. Un accident à 3h du matin un vendredi " +
        "n'a pas le même profil de risque qu'un accident à 8h un mercredi. " +
        "Ces nuances doivent être capturées par le modèle.",
      objective:
        "Créer des features : heure de la journée (tranche), " +
        "est_heure_de_pointe, est_weekend, est_nuit, interaction atm×lum. " +
        "Encoder ordinalement les variables ordonnées (gravité conditions météo). " +
        "Mesurer le gain de F1 avant/après.",
      dataset: {
        label: 'Accidents corporels de la circulation 2023 (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2023/',
      },
      skills: ['feature creation', 'interaction features', 'OrdinalEncoder', 'F1 gain'],
      connectedFrom: 'Valider ses modèles (Module 8)',
      connectedTo: 'Hyperparameter Tuning (Module 10)',
      starter: `\`\`\`python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

# Reprendre df accidents nettoyé (module 307)
df['hrmn'] = df['hrmn'].astype(str).str.zfill(4)
df['heure'] = df['hrmn'].str[:2].astype(int, errors='ignore')

df['heure_pointe'] = df['heure'].isin([7,8,9,17,18,19]).astype(int)
df['est_nuit']     = df['heure'].between(22, 6) if False else df['heure'].apply(
                        lambda h: 1 if h >= 22 or h <= 6 else 0)
df['jour']         = pd.to_datetime(df['date_acc']).dt.dayofweek
df['est_weekend']  = (df['jour'] >= 5).astype(int)

# Interaction conditions lumineuses × météo
df['lum_atm'] = df['lum'].astype(str) + '_' + df['atm'].astype(str)
from sklearn.preprocessing import LabelEncoder
df['lum_atm_enc'] = LabelEncoder().fit_transform(df['lum_atm'].astype(str))

features_old = ['lum', 'agg', 'atm', 'col', 'catr']
features_new = features_old + ['heure_pointe', 'est_nuit', 'est_weekend', 'lum_atm_enc']
df_m = df[features_new + ['grave']].dropna()

rf = RandomForestClassifier(100, class_weight='balanced', random_state=42)
f1_old = cross_val_score(rf, df_m[features_old], df_m['grave'], cv=5, scoring='f1').mean()
f1_new = cross_val_score(rf, df_m[features_new], df_m['grave'], cv=5, scoring='f1').mean()
print(f"F1 baseline     : {f1_old:.3f}")
print(f"F1 avec FE      : {f1_new:.3f}")
print(f"Gain            : +{f1_new - f1_old:.3f}")
\`\`\``,
    },
  ],

  // ── Module 310 — Hyperparameter Tuning ──────────────────────────────────
  310: [
    {
      title: 'Optimiser le modèle DVF avec Optuna',
      sector: '🏘️ Immobilier',
      context:
        "Ton RandomForest DVF est bon (R²=0.81) mais le client veut aller plus loin. " +
        "Avant de déployer, tu dois t'assurer que les hyperparamètres sont optimaux. " +
        "L'équipe a un budget de calcul limité : tu dois trouver le meilleur modèle " +
        "en 50 trials maximum.",
      objective:
        "Utiliser Optuna pour optimiser RandomForest et XGBoost sur le dataset DVF. " +
        "Logger chaque trial et visualiser la convergence. " +
        "Comparer le gain par rapport aux paramètres par défaut. " +
        "Exporter les meilleurs paramètres en JSON.",
      dataset: {
        label: 'DVF 2023 — Demandes de Valeurs Foncières (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['Optuna', 'RandomizedSearchCV', 'XGBRegressor', 'convergence', 'export JSON'],
      connectedFrom: 'Feature Engineering (Module 9)',
      connectedTo: 'Méthodes d\'ensemble (Module 11)',
      starter: `\`\`\`python
# pip install optuna xgboost
import optuna, json
optuna.logging.set_verbosity(optuna.logging.WARNING)
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

# X, y = dataset DVF avec features enrichies (module 309)

def objective(trial):
    params = {
        'n_estimators':     trial.suggest_int('n_estimators', 50, 500),
        'max_depth':        trial.suggest_int('max_depth', 3, 20),
        'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 20),
        'max_features':     trial.suggest_categorical('max_features', ['sqrt', 'log2', 0.5]),
    }
    model = RandomForestRegressor(**params, random_state=42, n_jobs=-1)
    r2 = cross_val_score(model, X, y, cv=5, scoring='r2').mean()
    return r2

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=50, show_progress_bar=True)

print(f"Meilleur R² : {study.best_value:.3f}")
print(f"Meilleurs params : {study.best_params}")

# Exporter
with open('best_params_dvf.json', 'w') as f:
    json.dump(study.best_params, f, indent=2)
print("Paramètres sauvegardés dans best_params_dvf.json")
\`\`\``,
    },
    {
      title: 'Tuner le classifieur d\'accidents avec RandomizedSearchCV',
      sector: '🚗 Sécurité routière',
      context:
        "Le comité technique de l'assureur a validé l'approche. " +
        "Avant la mise en production, tu dois obtenir les meilleurs hyperparamètres " +
        "pour le classifieur de gravité. Le contrainte : doit tourner en moins de 30 min " +
        "sur un laptop standard.",
      objective:
        "Appliquer RandomizedSearchCV sur GradientBoosting et XGBoost. " +
        "Scorer avec F1-macro (métrique métier). " +
        "Tracer la validation curve pour learning_rate. " +
        "Comparer le meilleur modèle au baseline.",
      dataset: {
        label: 'Accidents corporels de la circulation 2023 (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2023/',
      },
      skills: ['RandomizedSearchCV', 'GradientBoostingClassifier', 'F1-macro', 'validation_curve'],
      connectedFrom: 'Feature Engineering (Module 9)',
      connectedTo: 'Méthodes d\'ensemble (Module 11)',
      starter: `\`\`\`python
from sklearn.model_selection import RandomizedSearchCV, validation_curve
from sklearn.ensemble import GradientBoostingClassifier
from scipy.stats import randint, uniform
import numpy as np, matplotlib.pyplot as plt

# X, y = accidents avec features enrichies (module 309)

param_dist = {
    'n_estimators':  randint(100, 400),
    'learning_rate': uniform(0.01, 0.2),
    'max_depth':     randint(3, 8),
    'subsample':     uniform(0.6, 0.4),
}

rs = RandomizedSearchCV(
    GradientBoostingClassifier(random_state=42),
    param_dist, n_iter=40, cv=5,
    scoring='f1_macro', n_jobs=-1, random_state=42, verbose=1
)
rs.fit(X_train, y_train)
print(f"Meilleur F1-macro : {rs.best_score_:.3f}")
print(f"Meilleurs params  : {rs.best_params_}")
print(f"Score test        : {rs.score(X_test, y_test):.3f}")
\`\`\``,
    },
  ],

  // ── Module 311 — Méthodes d'ensemble ────────────────────────────────────
  311: [
    {
      title: 'Comparer les ensembles pour la prédiction immobilière',
      sector: '🏘️ Immobilier',
      context:
        "Ton model DVF est presque prêt. Avant de choisir l'algorithme définitif, " +
        "tu veux comparer toutes les méthodes d'ensemble. " +
        "Le data lead te demande un benchmark rigoureux avec les mêmes données " +
        "et une comparaison juste sur cross-validation.",
      objective:
        "Benchmarker RandomForest, GradientBoosting, XGBoost, LightGBM et Stacking " +
        "sur le dataset DVF enrichi. Mesurer R², RMSE et temps d'entraînement. " +
        "Identifier le meilleur rapport performance/vitesse pour la production.",
      dataset: {
        label: 'DVF 2023 — Demandes de Valeurs Foncières (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['RandomForest', 'XGBoost', 'LightGBM', 'StackingRegressor', 'benchmark', 'temps'],
      connectedFrom: 'Hyperparameter Tuning (Module 10)',
      connectedTo: 'Pipeline scikit-learn (Module 13)',
      starter: `\`\`\`python
# pip install xgboost lightgbm
import time
import numpy as np
from sklearn.ensemble import (RandomForestRegressor, GradientBoostingRegressor,
                               StackingRegressor)
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score
import xgboost as xgb
import lightgbm as lgb

# X, y = dataset DVF avec features enrichies (module 309)

models = {
    'Random Forest':       RandomForestRegressor(200, random_state=42, n_jobs=-1),
    'Gradient Boosting':   GradientBoostingRegressor(200, random_state=42),
    'XGBoost':             xgb.XGBRegressor(200, random_state=42, verbosity=0),
    'LightGBM':            lgb.LGBMRegressor(200, random_state=42, verbose=-1),
    'Stacking (RF+XGB)':   StackingRegressor(
        estimators=[('rf', RandomForestRegressor(100, random_state=42)),
                    ('xgb', xgb.XGBRegressor(100, verbosity=0))],
        final_estimator=Ridge()
    ),
}

print(f"{'Modèle':<25}  {'R² (CV)':>10}  {'Temps':>8}")
print('-' * 50)
for name, model in models.items():
    t0 = time.time()
    r2 = cross_val_score(model, X, y, cv=5, scoring='r2').mean()
    elapsed = time.time() - t0
    print(f"{name:<25}  {r2:>10.3f}  {elapsed:>6.1f}s")
\`\`\``,
    },
  ],

  // ── Module 312 — Données déséquilibrées ──────────────────────────────────
  312: [
    {
      title: 'Détecter les fraudes bancaires : 0.17% de fraudes',
      sector: '🏦 Finance & Fraude',
      context:
        "Un département fraude d'une banque traite des millions de transactions. " +
        "Le dataset contient 284 807 transactions dont seulement 492 fraudes (0.17%). " +
        "Un modèle naïf prédit 'légitime' à 100% et obtient 99.83% d'accuracy... " +
        "mais détecte 0 fraude. Ta mission : faire mieux.",
      objective:
        "Comparer 4 stratégies : modèle naïf, class_weight, SMOTE, seuil ajusté. " +
        "Mesurer Recall, Precision et F1 sur la classe fraude. " +
        "Visualiser les courbes Precision-Recall. " +
        "Justifier le choix de stratégie pour un contexte bancaire.",
      dataset: {
        label: 'Credit Card Fraud Detection — ULB Machine Learning Group (Kaggle)',
        url: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
      },
      skills: ['SMOTE', 'class_weight', 'seuil', 'Precision-Recall', 'AUC-PR'],
      connectedFrom: 'Classification (Module 4)',
      connectedTo: null,
      starter: `\`\`\`python
# pip install imbalanced-learn
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, average_precision_score
from imblearn.over_sampling import SMOTE

df = pd.read_csv('creditcard.csv')
print(f"Fraudes : {df['Class'].sum()} / {len(df)} ({df['Class'].mean():.3%})")

X = df.drop('Class', axis=1)
y = df['Class']
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

strategies = {
    'Naïf':          (X_tr, y_tr, {}),
    'class_weight':  (X_tr, y_tr, {'class_weight': 'balanced'}),
}
X_sm, y_sm = SMOTE(random_state=42).fit_resample(X_tr, y_tr)
strategies['SMOTE'] = (X_sm, y_sm, {})

for name, (Xtr, ytr, kw) in strategies.items():
    clf = LogisticRegression(max_iter=500, **kw)
    clf.fit(Xtr, ytr)
    y_pred = clf.predict(X_te)
    proba  = clf.predict_proba(X_te)[:, 1]
    ap     = average_precision_score(y_te, proba)
    print(f"\\n=== {name} (AUC-PR={ap:.3f}) ===")
    print(classification_report(y_te, y_pred, digits=3))
\`\`\``,
    },
    {
      title: 'Optimiser le seuil de décision sur le crédit bancaire',
      sector: '🏦 Finance & Risque',
      context:
        "Suite au projet défaut de crédit (module Classification), " +
        "le risk manager te demande d'aller plus loin que le seuil par défaut 0.5. " +
        "En contexte bancaire, rater un défaut coûte 10× plus cher qu'une fausse alarme. " +
        "Tu dois trouver le seuil qui minimise le coût total.",
      objective:
        "Calculer le coût métier pour chaque seuil (0.1 à 0.9). " +
        "Minimiser coût = 10×FN + 1×FP. " +
        "Comparer avec le seuil maximisant le F1. " +
        "Tracer la courbe coût vs seuil et identifier le point optimal.",
      dataset: {
        label: 'Credit Risk Dataset — Kaggle (Laotse)',
        url: 'https://www.kaggle.com/datasets/laotse/credit-risk-dataset',
      },
      skills: ['seuil optimal', 'coût métier', 'courbe coût vs seuil', 'FN vs FP tradeoff'],
      connectedFrom: 'Classification (Module 4)',
      connectedTo: null,
      starter: `\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import f1_score, confusion_matrix

# clf = meilleur modèle crédit (module 304)
# y_proba = clf.predict_proba(X_test)[:, 1]
# y_test  = labels réels

cout_fn = 10  # manquer un défaut : -10 000 €
cout_fp = 1   # fausse alarme (rejet inutile) : -1 000 €
thresholds = np.arange(0.05, 0.95, 0.02)

couts, f1s = [], []
for t in thresholds:
    y_pred = (y_proba >= t).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()
    couts.append(fn * cout_fn + fp * cout_fp)
    f1s.append(f1_score(y_test, y_pred))

t_cout_opt = thresholds[np.argmin(couts)]
t_f1_opt   = thresholds[np.argmax(f1s)]

fig, axes = plt.subplots(1, 2, figsize=(12, 5))
axes[0].plot(thresholds, couts)
axes[0].axvline(t_cout_opt, color='red', label=f'Seuil optimal coût={t_cout_opt:.2f}')
axes[0].set_title('Coût métier vs Seuil')
axes[0].legend()

axes[1].plot(thresholds, f1s)
axes[1].axvline(t_f1_opt, color='green', label=f'Seuil optimal F1={t_f1_opt:.2f}')
axes[1].set_title('F1-score vs Seuil')
axes[1].legend()
plt.show()

print(f"Seuil optimal (coût) : {t_cout_opt:.2f}  — coût={min(couts):.0f} unités")
print(f"Seuil optimal (F1)   : {t_f1_opt:.2f}  — F1={max(f1s):.3f}")
\`\`\``,
    },
  ],

  // ── Module 313 — Pipelines scikit-learn ──────────────────────────────────
  313: [
    {
      title: 'Pipeline de production end-to-end pour la prédiction immobilière',
      sector: '🏘️ Immobilier',
      context:
        "Ton client demande un livrable clé en main : un fichier .pkl qui prend " +
        "en entrée les données brutes DVF (pas prétraitées) et sort un prix estimé. " +
        "Ce pipeline sera intégré dans l'outil interne de l'agence immobilière. " +
        "Il doit être reproductible, testable et versionné.",
      objective:
        "Construire un Pipeline complet : ColumnTransformer (imputer + scaler + encoder) " +
        "+ LightGBM (meilleur modèle du benchmark). " +
        "Valider en CV, sauvegarder avec joblib. " +
        "Tester le rechargement sur des données brutes non vues.",
      dataset: {
        label: 'DVF 2023 — Demandes de Valeurs Foncières (data.gouv.fr)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['Pipeline', 'ColumnTransformer', 'LGBMRegressor', 'joblib', 'end-to-end'],
      connectedFrom: 'Méthodes d\'ensemble (Module 11)',
      connectedTo: 'Déploiement (Module 17)',
      starter: `\`\`\`python
# pip install lightgbm joblib
import joblib
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score
import lightgbm as lgb

# DataFrame brut DVF (avant tout prétraitement)
num_features = ['surface_reelle_bati', 'nombre_pieces_principales',
                 'ratio_surface_pieces']  # créée en amont
cat_features = ['code_postal', 'nature_mutation']

num_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler',  StandardScaler()),
])
cat_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False)),
])

preprocessor = ColumnTransformer([
    ('num', num_pipe, num_features),
    ('cat', cat_pipe, cat_features),
])

full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model',        lgb.LGBMRegressor(n_estimators=300, random_state=42, verbose=-1)),
])

cv_r2 = cross_val_score(full_pipeline, X_raw, y, cv=5, scoring='r2').mean()
print(f"CV R² pipeline complet : {cv_r2:.3f}")

full_pipeline.fit(X_raw, y)
joblib.dump(full_pipeline, 'pipeline_dvf_v1.pkl')
print("Pipeline sauvegardé → pipeline_dvf_v1.pkl")

# Test rechargement
loaded = joblib.load('pipeline_dvf_v1.pkl')
sample = X_raw.sample(3, random_state=0)
print("\\nPrédictions sur 3 biens :", loaded.predict(sample).round(0))
\`\`\``,
    },
  ],

  // ── Module 314 — Réduction de dimension ──────────────────────────────────
  314: [
    {
      title: 'Visualiser les clusters de communes avec PCA et UMAP',
      sector: '🗺️ Secteur public',
      context:
        "Suite au projet clustering communes (module 305), le cabinet de conseil " +
        "veut présenter les résultats au client (une région). " +
        "Un tableau de chiffres ne parle pas à des élus. " +
        "Tu dois créer des visualisations 2D qui montrent clairement " +
        "la structure et la cohérence des groupes de communes.",
      objective:
        "Appliquer PCA, t-SNE et UMAP sur le dataset communes. " +
        "Colorer les points par cluster K-Means (module 305). " +
        "Comparer les 3 projections. " +
        "Identifier quel algorithme révèle le mieux la structure des données.",
      dataset: {
        label: 'Base des communes — INSEE / data.gouv.fr',
        url: 'https://www.data.gouv.fr/fr/datasets/base-des-communes-de-france/',
      },
      skills: ['PCA', 't-SNE', 'UMAP', 'visualisation 2D', 'explained_variance_ratio'],
      connectedFrom: 'Clustering (Module 5)',
      connectedTo: null,
      starter: `\`\`\`python
# pip install umap-learn
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from sklearn.preprocessing import StandardScaler
import umap

# X = features communes standardisées, labels = clusters K-Means (module 305)
X_scaled = StandardScaler().fit_transform(X)

# PCA — variance expliquée
pca_full = PCA()
pca_full.fit(X_scaled)
plt.figure(figsize=(6, 4))
plt.plot(np.cumsum(pca_full.explained_variance_ratio_))
plt.axhline(0.95, color='red', linestyle='--')
plt.xlabel('Composantes')
plt.ylabel('Variance expliquée cumulée')
plt.title('Scree plot — Communes France')
plt.show()

# Projections 2D
pca2  = PCA(n_components=2).fit_transform(X_scaled)
tsne2 = TSNE(n_components=2, perplexity=30, random_state=42).fit_transform(X_scaled[:3000])
umap2 = umap.UMAP(n_components=2, random_state=42).fit_transform(X_scaled)

fig, axes = plt.subplots(1, 3, figsize=(18, 5))
for ax, X2, title in [(axes[0], pca2, 'PCA'), (axes[1], tsne2[:3000], 't-SNE'),
                       (axes[2], umap2, 'UMAP')]:
    sc = ax.scatter(X2[:, 0], X2[:, 1], c=labels[:len(X2)], cmap='tab10', s=8, alpha=0.6)
    ax.set_title(title)
    ax.axis('off')
plt.suptitle('Visualisation des clusters de communes françaises')
plt.tight_layout()
plt.show()
\`\`\``,
    },
  ],

  // ── Module 315 — Deep Learning ───────────────────────────────────────────
  315: [
    {
      title: 'Classifier les sinistres assurance avec un MLP',
      sector: '🏦 Assurance',
      context:
        "Un assureur veut automatiser la classification de dossiers sinistres " +
        "pour les router vers le bon service : auto, habitation, santé, responsabilité. " +
        "Le dataset contient des vecteurs de features extraits de formulaires numérisés. " +
        "L'objectif est de comparer un MLP Keras avec le Random Forest (baseline).",
      objective:
        "Construire un MLP (2 couches cachées + Dropout) avec Keras. " +
        "Comparer avec RandomForest sur accuracy et F1-macro. " +
        "Tracer les courbes loss/accuracy. " +
        "Tester l'impact du nombre de neurones et du taux de Dropout.",
      dataset: {
        label: 'Telco Customer Churn (proxy multi-classe) — IBM (Kaggle)',
        url: 'https://www.kaggle.com/datasets/blastchar/telco-customer-churn',
      },
      skills: ['Keras Sequential', 'Dense', 'Dropout', 'early stopping', 'courbes loss'],
      connectedFrom: 'Classification (Module 4)',
      connectedTo: null,
      starter: `\`\`\`python
# pip install tensorflow
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# Reprendre X, y du dataset churn (module 304)
scaler = StandardScaler()
X_tr_s = scaler.fit_transform(X_train)
X_te_s = scaler.transform(X_test)

# Baseline Random Forest
rf = RandomForestClassifier(100, random_state=42)
rf.fit(X_train, y_train)
print("Random Forest:")
print(classification_report(y_test, rf.predict(X_test)))

# MLP Keras
model = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(X_tr_s.shape[1],)),
    layers.Dropout(0.3),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(1, activation='sigmoid'),
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

early_stop = keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True)
history = model.fit(X_tr_s, y_train, epochs=100, batch_size=64,
                    validation_split=0.2, callbacks=[early_stop], verbose=0)

_, acc = model.evaluate(X_te_s, y_test, verbose=0)
print(f"\\nMLP Keras — Test accuracy : {acc:.3f}")

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(history.history['loss'], label='Train')
axes[0].plot(history.history['val_loss'], label='Val')
axes[0].set_title('Loss')
axes[1].plot(history.history['accuracy'], label='Train')
axes[1].plot(history.history['val_accuracy'], label='Val')
axes[1].set_title('Accuracy')
for ax in axes: ax.legend()
plt.show()
\`\`\``,
    },
  ],

  // ── Module 316 — NLP ─────────────────────────────────────────────────────
  316: [
    {
      title: 'Classifier la tonalité des avis clients Allocine',
      sector: '📝 Media & CRM',
      context:
        "Une plateforme de streaming veut analyser automatiquement les milliers d'avis " +
        "laissés chaque jour par ses utilisateurs pour détecter les tendances négatives " +
        "avant qu'elles n'explosent sur les réseaux sociaux. " +
        "Tu dois construire un classifieur de sentiment (positif/négatif) sur des avis en français.",
      objective:
        "Entraîner un pipeline TF-IDF + LogisticRegression sur des avis Allociné. " +
        "Atteindre > 90% d'accuracy. " +
        "Identifier les mots les plus discriminants (positifs vs négatifs). " +
        "Tester sur 10 phrases inventées.",
      dataset: {
        label: 'Allocine French Sentiment Dataset — HuggingFace (Théophile Blard)',
        url: 'https://huggingface.co/datasets/allocine',
      },
      skills: ['TfidfVectorizer', 'ngrams', 'LogisticRegression', 'feature coefficients', 'pipeline NLP'],
      connectedFrom: null,
      connectedTo: null,
      starter: `\`\`\`python
# pip install datasets
from datasets import load_dataset
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import pandas as pd, re

dataset = load_dataset('allocine')
train_df = pd.DataFrame(dataset['train'])
test_df  = pd.DataFrame(dataset['test'])

def clean(text):
    text = text.lower()
    text = re.sub(r'[^a-zàâäéèêëîïôùûü\\s]', ' ', text)
    return re.sub(r'\\s+', ' ', text).strip()

train_df['clean'] = train_df['review'].apply(clean)
test_df['clean']  = test_df['review'].apply(clean)

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2), max_features=30_000,
                               min_df=3, sublinear_tf=True)),
    ('clf',   LogisticRegression(C=1.0, max_iter=1000)),
])
pipeline.fit(train_df['clean'], train_df['label'])

print(classification_report(test_df['label'], pipeline.predict(test_df['clean'])))

# Mots les plus influents
import numpy as np
features = pipeline['tfidf'].get_feature_names_out()
coefs    = pipeline['clf'].coef_[0]
print("\\nTop mots positifs :", pd.Series(coefs, index=features).nlargest(10).index.tolist())
print("Top mots négatifs :", pd.Series(coefs, index=features).nsmallest(10).index.tolist())
\`\`\``,
    },
    {
      title: 'Classifier des signalements citoyens par catégorie',
      sector: '🏛️ Service public',
      context:
        "Une grande métropole reçoit des milliers de signalements citoyens chaque mois " +
        "(voirie, propreté, éclairage, bruit...). Actuellement un agent les lit et les trie. " +
        "Ta mission : automatiser cette classification pour réduire le délai de traitement " +
        "et router chaque signalement vers le bon service.",
      objective:
        "Construire un classifieur multi-classes de signalements. " +
        "Comparer TF-IDF + LR vs TF-IDF + Random Forest vs embeddings Sentence Transformers. " +
        "Mesurer accuracy et F1-macro. " +
        "Analyser les erreurs de classification.",
      dataset: {
        label: 'Open311 / Signalements — data.gouv.fr (Paris)',
        url: 'https://www.data.gouv.fr/fr/datasets/dan-signalements/',
      },
      skills: ['TF-IDF multi-classes', 'RandomForest', 'Sentence Transformers', 'F1-macro', 'analyse erreurs'],
      connectedFrom: null,
      connectedTo: null,
      starter: `\`\`\`python
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Charger le fichier des signalements (champ 'description' + 'categorie')
df = pd.read_csv('signalements.csv').dropna(subset=['description', 'categorie'])
print(df['categorie'].value_counts())

X_train, X_test, y_train, y_test = train_test_split(
    df['description'], df['categorie'], test_size=0.2, stratify=df['categorie'], random_state=42)

for name, clf in [
    ('LR',  LogisticRegression(max_iter=1000, C=1.0)),
    ('RF',  RandomForestClassifier(200, random_state=42)),
]:
    pipe = Pipeline([('tfidf', TfidfVectorizer(ngram_range=(1,2), max_features=20_000)), ('clf', clf)])
    pipe.fit(X_train, y_train)
    print(f"\\n=== {name} ===")
    print(classification_report(y_test, pipe.predict(X_test)))
\`\`\``,
    },
  ],

  // ── Module 317 — Déploiement ─────────────────────────────────────────────
  317: [
    {
      title: 'Exposer le pipeline DVF comme API REST avec FastAPI',
      sector: '🏘️ Immobilier — Production',
      context:
        "Le pipeline DVF est prêt (module 313). L'équipe frontend veut l'intégrer dans " +
        "l'outil d'estimation de l'agence immobilière. " +
        "Ils ont besoin d'une API REST : tu envoies les caractéristiques d'un bien, " +
        "tu reçois le prix estimé en JSON. " +
        "L'API doit être documentée, robuste et déployable sur n'importe quel serveur.",
      objective:
        "Créer une API FastAPI qui charge pipeline_dvf_v1.pkl. " +
        "Définir le schéma d'entrée avec Pydantic (validation automatique). " +
        "Exposer /predict et /health. " +
        "Tester avec requests et vérifier la documentation Swagger /docs.",
      dataset: {
        label: 'DVF 2023 — pipeline_dvf_v1.pkl (module 13)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['FastAPI', 'Pydantic', 'joblib.load', 'uvicorn', 'Swagger UI'],
      connectedFrom: 'Pipeline scikit-learn (Module 13)',
      connectedTo: 'MLOps (Module 18)',
      starter: `\`\`\`python
# pip install fastapi uvicorn pydantic joblib
# Créer main.py :

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib, numpy as np, pandas as pd

app = FastAPI(title="API Estimation Immobilière DVF", version="1.0")
pipeline = joblib.load("pipeline_dvf_v1.pkl")

class Bien(BaseModel):
    surface_reelle_bati:        float = Field(..., gt=5, lt=500, example=65.0)
    nombre_pieces_principales:  int   = Field(..., ge=1, le=20,  example=3)
    code_postal:                str   = Field(..., example="75011")
    nature_mutation:            str   = Field(default="Vente", example="Vente")

class Prediction(BaseModel):
    prix_m2_estime: float
    prix_total_estime: float

@app.get("/health")
def health():
    return {"status": "ok", "model": "pipeline_dvf_v1"}

@app.post("/predict", response_model=Prediction)
def predict(bien: Bien):
    try:
        df = pd.DataFrame([bien.dict()])
        df['ratio_surface_pieces'] = df['surface_reelle_bati'] / df['nombre_pieces_principales']
        prix_m2 = float(pipeline.predict(df)[0])
        return {
            "prix_m2_estime":    round(prix_m2, 0),
            "prix_total_estime": round(prix_m2 * bien.surface_reelle_bati, 0),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Lancer : uvicorn main:app --reload --port 8000
# Docs   : http://localhost:8000/docs
\`\`\``,
    },
  ],

  // ── Module 318 — MLOps ───────────────────────────────────────────────────
  318: [
    {
      title: 'Tracker toutes tes expériences DVF avec MLflow',
      sector: '🏘️ Immobilier — MLOps',
      context:
        "Après des semaines d'itérations sur le projet DVF, tu as du mal à te souvenir " +
        "quel modèle donnait quoi avec quels hyperparamètres. " +
        "Le lead data te demande de ré-entraîner tous les modèles du benchmark (module 311) " +
        "en les trackant cette fois avec MLflow pour comparer les runs de façon reproductible.",
      objective:
        "Instrumenter les 5 modèles du benchmark DVF avec MLflow. " +
        "Logger params, métriques (R², RMSE) et modèles pour chaque run. " +
        "Ouvrir le dashboard MLflow et identifier le meilleur modèle. " +
        "Charger et réutiliser le meilleur run sans re-coder.",
      dataset: {
        label: 'DVF 2023 — pipeline_dvf_v1.pkl (module 13)',
        url: 'https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/',
      },
      skills: ['mlflow.log_params', 'mlflow.log_metrics', 'mlflow.sklearn.log_model', 'MlflowClient', 'best run'],
      connectedFrom: 'Déploiement (Module 17)',
      connectedTo: null,
      starter: `\`\`\`python
# pip install mlflow
# Lancer le dashboard : mlflow ui  (http://localhost:5000)
import mlflow, mlflow.sklearn, time, numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import cross_val_score
import xgboost as xgb, lightgbm as lgb

# X, y = dataset DVF enrichi (module 309)

mlflow.set_experiment("dvf-benchmark-final")

models = {
    "random_forest":   RandomForestRegressor(200, random_state=42, n_jobs=-1),
    "gradient_boost":  GradientBoostingRegressor(200, random_state=42),
    "xgboost":         xgb.XGBRegressor(200, random_state=42, verbosity=0),
    "lightgbm":        lgb.LGBMRegressor(200, random_state=42, verbose=-1),
}

for run_name, model in models.items():
    with mlflow.start_run(run_name=run_name):
        mlflow.log_params({"model_type": run_name, **model.get_params()})
        t0 = time.time()
        scores = cross_val_score(model, X, y, cv=5, scoring='r2')
        elapsed = time.time() - t0
        model.fit(X, y)
        mlflow.log_metrics({
            "cv_r2_mean": scores.mean(),
            "cv_r2_std":  scores.std(),
            "train_time": elapsed,
        })
        mlflow.sklearn.log_model(model, run_name)
        print(f"{run_name:18s}  R²={scores.mean():.3f} ± {scores.std():.3f}  ({elapsed:.1f}s)")

# Récupérer le meilleur run
from mlflow.tracking import MlflowClient
client = MlflowClient()
exp    = client.get_experiment_by_name("dvf-benchmark-final")
runs   = client.search_runs(exp.experiment_id, order_by=["metrics.cv_r2_mean DESC"])
best   = runs[0]
print(f"\\n🏆 Meilleur modèle : {best.data.tags['mlflow.runName']}")
print(f"   R² = {best.data.metrics['cv_r2_mean']:.3f}")
best_model = mlflow.sklearn.load_model(f"runs:/{best.info.run_id}/{best.data.tags['mlflow.runName']}")
\`\`\``,
    },
  ],
};

export default ML_PROJECTS;
