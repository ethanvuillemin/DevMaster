/**
 * Mini-projets métier — Parcours Deep Learning
 * Clé = moduleId (401–415)
 * Structure identique à mlProjects.js
 *
 * Fil rouge : classification de radiographies (chest X-ray)
 *   401 → découverte DL
 *   402 → MLP sur données tabulaires patient
 *   403 → améliorer avec Adam + scheduling
 *   404 → régularisation du MLP
 *   405 → CNN chest X-ray
 *   406 → Transfer learning (EfficientNet) chest X-ray
 *   407 → LSTM conso électrique RTE
 *   408 → Transformer de classification d'avis
 *   409 → Fine-tuning CamemBERT
 *   410 → Prévision multivariée énergie
 *   411 → Détection de défauts industriels YOLO
 *   412 → GAN génération de données synthétiques
 *   413 → Déploiement API ONNX
 *   414 → Optimisation inférence
 *   415 → MLOps W&B sweep
 */

const DL_PROJECTS = {

  // ── 401 — C'est quoi le DL ────────────────────────────────────────────
  401: [
    {
      title: 'Ton premier réseau — classifier des tumeurs du sein',
      sector: '🏥 Santé / Médical',
      context:
        'Tu rejoins une startup MedTech qui développe des outils d\'aide au diagnostic. Première mission : implémenter un réseau de neurones basique pour classer des tumeurs mammaires comme bénignes ou malignes, à partir de features extraites par imagerie.',
      objective:
        'Utilise le dataset Wisconsin Breast Cancer (sklearn) pour construire ton premier réseau Keras. Compare avec une régression logistique. Objectif : accuracy > 95% sur le test set.',
      dataset: {
        label: 'Breast Cancer Wisconsin — sklearn.datasets',
        url: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html',
      },
      skills: ['keras.Sequential', 'Dense', 'sigmoid', 'binary_crossentropy', 'accuracy'],
      connectedFrom: null,
      connectedTo: 'MLP avancé (Module 2)',
      starter: `\`\`\`python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras

# 1. Charger les données
data = load_breast_cancer()
X, y = data.data, data.target  # 569 exemples, 30 features

# 2. Prétraitement
scaler = StandardScaler()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# 3. Ton modèle Keras ici...
# model = keras.Sequential([...])
# model.compile(...)
# model.fit(...)
\`\`\``,
    },
  ],

  // ── 402 — MLP ─────────────────────────────────────────────────────────
  402: [
    {
      title: 'Prédire le risque cardiaque avec un MLP',
      sector: '🏥 Santé / Médical',
      context:
        'L\'équipe data science d\'un hôpital veut automatiser le tri des patients à risque cardiovasculaire. Tu dois construire un MLP robuste sur des données cliniques réelles.',
      objective:
        'Entraîne un MLP à 3 couches sur le Heart Disease UCI dataset. Explore l\'impact du nombre de neurones et des fonctions d\'activation. Atteins un F1-score > 0.82.',
      dataset: {
        label: 'Heart Disease UCI — Kaggle',
        url: 'https://www.kaggle.com/datasets/ronitf/heart-disease-uci',
      },
      skills: ['Dense', 'ReLU', 'BatchNormalization', 'Dropout', 'F1-score', 'model.summary()'],
      connectedFrom: 'Premier réseau (Module 1)',
      connectedTo: 'Optimiseurs (Module 3)',
      starter: `\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow import keras
from tensorflow.keras import layers

df = pd.read_csv('heart.csv')
X = df.drop('target', axis=1).values
y = df['target'].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

# Construire ton MLP ici
# model = keras.Sequential([
#     layers.Dense(???, activation='relu', input_shape=(X.shape[1],)),
#     ...
# ])
\`\`\``,
    },
  ],

  // ── 403 — Backprop & Optimiseurs ──────────────────────────────────────
  403: [
    {
      title: 'Optimiser la prédiction de consommation électrique',
      sector: '⚡ Énergie',
      context:
        'RTE (Réseau de Transport d\'Électricité) a besoin de prédire la consommation à court terme pour équilibrer le réseau. Tu es data scientist et tu dois comparer différents optimiseurs pour maximiser la précision.',
      objective:
        'Compare SGD, Adam et AdamW sur la prévision de conso électrique horaire. Implémente un LR scheduler cosine decay. Visualise les courbes de convergence avec matplotlib. Objectif : MAE < 2000 MW.',
      dataset: {
        label: 'Consommation électrique régionale RTE — data.gouv.fr',
        url: 'https://www.data.gouv.fr/fr/datasets/consommation-quotidienne-brute-regionale/',
      },
      skills: ['Adam', 'AdamW', 'SGD', 'ReduceLROnPlateau', 'CosineDecay', 'MAE'],
      connectedFrom: 'MLP (Module 2)',
      connectedTo: 'Régularisation (Module 4)',
      starter: `\`\`\`python
import pandas as pd, numpy as np, matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras

# Télécharger le CSV depuis data.gouv.fr et charger
# df = pd.read_csv('eco2mix-regional-cons-def.csv', sep=';')

# TODO: construire les features (heure, jour, température...) et séquences
# puis comparer les 3 optimiseurs avec des courbes d'entraînement superposées
\`\`\``,
    },
  ],

  // ── 404 — Régularisation ──────────────────────────────────────────────
  404: [
    {
      title: 'Régulariser un réseau sur données financières bruitées',
      sector: '💰 Finance',
      context:
        'Une fintech veut détecter les entreprises à risque de faillite à 1 an, avec seulement 1 000 exemples étiquetés — un cas typique d\'overfitting. Tu dois expérimenter les techniques de régularisation.',
      objective:
        'Sur le Altman Z-score / bankruptcy dataset, compare les effets de Dropout (0.3 vs 0.5), L2 weight decay et BatchNormalization. Trace les courbes train/val loss. Objectif : réduire l\'écart train/val accuracy en dessous de 5 points.',
      dataset: {
        label: 'Company Bankruptcy Prediction — Kaggle',
        url: 'https://www.kaggle.com/datasets/fedesoriano/company-bankruptcy-prediction',
      },
      skills: ['Dropout', 'BatchNormalization', 'L2 regularization', 'EarlyStopping', 'learning curves'],
      connectedFrom: 'Optimiseurs (Module 3)',
      connectedTo: 'CNN (Module 5)',
      starter: `\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras import layers, regularizers

df = pd.read_csv('data.csv')
X = df.drop('Bankrupt?', axis=1).fillna(0).values
y = df['Bankrupt?'].values

X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_val   = scaler.transform(X_val)

# Construire 3 modèles : sans régularisation, avec Dropout, avec L2+BatchNorm
# Comparer les courbes avec matplotlib
\`\`\``,
    },
  ],

  // ── 405 — CNN ─────────────────────────────────────────────────────────
  405: [
    {
      title: 'Classifier des radiographies pulmonaires (pneumonie vs normal)',
      sector: '🏥 Santé / Médical',
      context:
        'Tu travailles pour une startup d\'imagerie médicale qui développe un outil de triage des radiographies thoraciques. Premier prototype : détecter une pneumonie à partir d\'un chest X-ray. C\'est le début du fil rouge "radiology AI".',
      objective:
        'Entraîne un CNN from scratch (3 blocs Conv+Pool+BN) sur le dataset Chest X-Ray Images (Kaggle). Atteins accuracy > 88% et ROC-AUC > 0.92. Visualise les feature maps de la première couche Conv.',
      dataset: {
        label: 'Chest X-Ray Images (Pneumonia) — Kaggle',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
      skills: ['Conv2D', 'MaxPooling2D', 'BatchNormalization', 'GlobalAveragePooling2D', 'ROC-AUC', 'feature maps'],
      connectedFrom: 'Régularisation (Module 4)',
      connectedTo: 'Transfer Learning (Module 6)',
      starter: `\`\`\`python
import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np, matplotlib.pyplot as plt

IMG_SIZE   = 150
BATCH_SIZE = 32

train_ds = tf.keras.utils.image_dataset_from_directory(
    'chest_xray/train', image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE, label_mode='binary'
)
val_ds = tf.keras.utils.image_dataset_from_directory(
    'chest_xray/val', image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE, label_mode='binary'
)

AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.map(lambda x, y: (x / 255.0, y)).prefetch(AUTOTUNE)
val_ds   = val_ds.map(lambda x, y: (x / 255.0, y)).prefetch(AUTOTUNE)

# Construire ton CNN 3 blocs ici
\`\`\``,
    },
  ],

  // ── 406 — Transfer Learning ───────────────────────────────────────────
  406: [
    {
      title: 'Transfer Learning EfficientNet sur chest X-ray (multi-classes)',
      sector: '🏥 Santé / Médical',
      context:
        'Fort du premier prototype CNN (Module 5), l\'équipe veut maintenant distinguer 3 pathologies : Normal, Pneumonie bactérienne, Pneumonie virale. Tu vas utiliser EfficientNetB0 pré-entraîné sur ImageNet pour dépasser les performances du CNN from scratch.',
      objective:
        'Applique la recette Transfer Learning en 2 phases (feature extraction puis fine-tuning) avec EfficientNetB0. Atteins accuracy > 93% sur le test set. Compare avec le CNN from scratch du Module 5.',
      dataset: {
        label: 'Chest X-Ray Images (Pneumonia) — Kaggle',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
      skills: ['EfficientNetB0', 'transfer learning', 'fine-tuning', 'GlobalAveragePooling2D', 'confusion matrix'],
      connectedFrom: 'CNN from scratch (Module 5)',
      connectedTo: 'LSTM séries temporelles (Module 7)',
      starter: `\`\`\`python
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0

IMG_SIZE   = 224
NUM_CLASSES = 3  # normal, bacterial, viral

# Reconstruire les datasets avec image_size=(224,224)
train_ds = tf.keras.utils.image_dataset_from_directory(
    'chest_xray/train', image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=32, label_mode='int'
)

# Phase 1 : feature extraction — geler EfficientNetB0
base_model = EfficientNetB0(weights='imagenet', include_top=False,
                              input_shape=(IMG_SIZE, IMG_SIZE, 3))
base_model.trainable = False

# Construire la tête de classification...
\`\`\``,
    },
  ],

  // ── 407 — RNN & LSTM ──────────────────────────────────────────────────
  407: [
    {
      title: 'Prévision de consommation électrique horaire avec LSTM',
      sector: '⚡ Énergie',
      context:
        'Suite du projet énergie (Module 3). RTE veut maintenant une prévision J+1 heure par heure, avec des features multivariées : température, jour de la semaine, heure, et la conso des 48 dernières heures.',
      objective:
        'Construis un LSTM bivarié (conso + features temporelles cycliques) avec fenêtre de 48h pour prédire les 24 prochaines heures. Implémente le walk-forward validation. Objectif : MAPE < 3% en période hivernale.',
      dataset: {
        label: 'Consommation électrique régionale RTE — data.gouv.fr',
        url: 'https://www.data.gouv.fr/fr/datasets/consommation-quotidienne-brute-regionale/',
      },
      skills: ['LSTM', 'GRU', 'return_sequences', 'MinMaxScaler', 'walk-forward', 'MAPE'],
      connectedFrom: 'Optimiseurs / énergie (Module 3)',
      connectedTo: 'Transformer / NLP (Module 8)',
      starter: `\`\`\`python
import pandas as pd, numpy as np, tensorflow as tf

# Charger les données RTE
df = pd.read_csv('eco2mix-regional-cons-def.csv', sep=';', parse_dates=['Date - Heure'])
df = df[df['Région'] == 'Île-de-France'].copy()
df = df.sort_values('Date - Heure').reset_index(drop=True)

# Feature engineering temporel
df['heure_sin'] = np.sin(2*np.pi*df['Date - Heure'].dt.hour / 24)
df['heure_cos'] = np.cos(2*np.pi*df['Date - Heure'].dt.hour / 24)
df['dow_sin']   = np.sin(2*np.pi*df['Date - Heure'].dt.dayofweek / 7)
df['dow_cos']   = np.cos(2*np.pi*df['Date - Heure'].dt.dayofweek / 7)

# TODO: windowing, LSTM, walk-forward validation
\`\`\``,
    },
  ],

  // ── 408 — Attention & Transformers ────────────────────────────────────
  408: [
    {
      title: 'Classificateur de dépêches AFP avec un mini-Transformer',
      sector: '📰 Médias / NLP',
      context:
        'Une agence presse veut automatiser la catégorisation de ses dépêches (économie, sport, politique, culture...). Tu dois implémenter un Transformer simple from scratch pour comprendre son fonctionnement avant d\'utiliser des modèles pré-entraînés.',
      objective:
        'Implémente un Transformer Encoder avec PyTorch (3 couches, 4 têtes d\'attention) sur le dataset 20 Newsgroups. Visualise les poids d\'attention. Atteins accuracy > 80% en classification multi-classes.',
      dataset: {
        label: '20 Newsgroups — sklearn.datasets',
        url: 'https://scikit-learn.org/stable/datasets/real_world.html#newsgroups-dataset',
      },
      skills: ['MultiheadAttention', 'Transformer', 'positional encoding', 'attention visualization', 'TextVectorization'],
      connectedFrom: 'LSTM (Module 7)',
      connectedTo: 'HuggingFace BERT (Module 9)',
      starter: `\`\`\`python
from sklearn.datasets import fetch_20newsgroups
import torch, torch.nn as nn, numpy as np

# 4 catégories pour simplifier
categories = ['talk.politics.guns', 'sci.med', 'rec.sport.hockey', 'comp.graphics']
train = fetch_20newsgroups(subset='train', categories=categories)
test  = fetch_20newsgroups(subset='test',  categories=categories)

print(f"Train : {len(train.data)} exemples, {len(categories)} classes")
print(train.data[0][:200])

# TODO: tokenisation, embedding, TransformerBlock, boucle entraînement PyTorch
\`\`\``,
    },
  ],

  // ── 409 — NLP HuggingFace ─────────────────────────────────────────────
  409: [
    {
      title: 'Analyser les avis cinéma Allociné avec CamemBERT',
      sector: '🎬 Médias / Entertainment',
      context:
        'Une plateforme de streaming français veut classer automatiquement les avis utilisateurs en positif/négatif pour personnaliser les recommandations. Tu vas fine-tuner CamemBERT sur le dataset Allociné francophone.',
      objective:
        'Fine-tune CamemBERT sur le dataset Allociné (HuggingFace). Atteins accuracy > 96% et F1 > 0.96 sur le test set. Analyse les erreurs de classification et propose des pistes d\'amélioration.',
      dataset: {
        label: 'Allociné dataset (avis FR) — HuggingFace',
        url: 'https://huggingface.co/datasets/allocine',
      },
      skills: ['CamemBERT', 'AutoTokenizer', 'AutoModelForSequenceClassification', 'Trainer', 'F1-score'],
      connectedFrom: 'Transformer from scratch (Module 8)',
      connectedTo: 'Séries temporelles DL (Module 10)',
      starter: `\`\`\`python
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments

dataset = load_dataset('allocine')
print(dataset)
# DatasetDict avec train (160k), validation (20k), test (20k)
# colonnes : review (texte), label (0=négatif, 1=positif)

model_name = 'camembert-base'
tokenizer  = AutoTokenizer.from_pretrained(model_name)

def tokenize(batch):
    return tokenizer(batch['review'], truncation=True, max_length=256, padding='max_length')

# TODO: tokeniser, créer le modèle, configurer TrainingArguments, lancer Trainer
\`\`\``,
    },
  ],

  // ── 410 — Séries temporelles DL ───────────────────────────────────────
  410: [
    {
      title: 'Prévision multivariée de qualité de l\'air avec TCN',
      sector: '🌿 Environnement',
      context:
        'Atmo France collecte des données sur la qualité de l\'air dans les grandes villes. Tu dois construire un modèle de prévision 24h de la concentration en PM2.5 à Paris, en utilisant plusieurs capteurs comme features.',
      objective:
        'Implémente et compare LSTM vs TCN sur les données de qualité de l\'air AirBase. Utilise le walk-forward validation sur 3 splits temporels. Objectif : sMAPE < 12% sur PM2.5. Analyse les erreurs par saison.',
      dataset: {
        label: 'Qualité de l\'air — Atmo France Open Data',
        url: 'https://www.atmo-france.org/article/open-data',
      },
      skills: ['TCN', 'LSTM multivarié', 'walk-forward', 'sMAPE', 'temporal features cycliques'],
      connectedFrom: 'LSTM énergie (Module 7)',
      connectedTo: 'Détection d\'objets (Module 11)',
      starter: `\`\`\`python
# pip install keras-tcn
import pandas as pd, numpy as np, tensorflow as tf
from tcn import TCN

# Alternative open : dataset UCI Beijing PM2.5
# https://archive.ics.uci.edu/ml/datasets/Beijing+PM2.5+Data
df = pd.read_csv('PRSA_data_2010.1.1-2014.12.31.csv')

# Features : DEWP (rosée), TEMP, PRES, cbwd (vent), Iws, Is, Ir
features = ['DEWP', 'TEMP', 'PRES', 'Iws', 'Is', 'Ir']
target   = 'pm2.5'

df = df.dropna().reset_index(drop=True)
print(df[features + [target]].describe())

# TODO: windowing 48h → prédire 24h, LSTM vs TCN, walk-forward
\`\`\``,
    },
  ],

  // ── 411 — Détection d'objets ───────────────────────────────────────────
  411: [
    {
      title: 'Détecter des défauts sur des pièces industrielles avec YOLO',
      sector: '🏭 Industrie / Contrôle qualité',
      context:
        'Une usine automobile veut automatiser le contrôle qualité visuel de ses pièces métalliques. Tu dois construire un détecteur de défauts (rayures, fissures, trous) à partir d\'un dataset de 600 images annotées.',
      objective:
        'Fine-tune YOLOv8s sur le dataset NEU-DET (défauts acier). Configure le YAML de dataset, lance l\'entraînement sur 100 epochs. Atteins mAP@50 > 0.75. Génère un rapport de performance par classe de défaut.',
      dataset: {
        label: 'NEU-DET — Steel Surface Defect Detection (Kaggle)',
        url: 'https://www.kaggle.com/datasets/yatinpatel1/neu-surface-defect-detection',
      },
      skills: ['YOLOv8', 'mAP@50', 'IoU', 'data.yaml', 'Label Studio', 'bounding boxes'],
      connectedFrom: null,
      connectedTo: 'GANs (Module 12)',
      starter: `\`\`\`python
# pip install ultralytics
from ultralytics import YOLO

# Le dataset NEU-DET contient 6 défauts : crazing, inclusion, patches, pitted_surface, rolled-in_scale, scratches
# Structure attendue par YOLO :
# neu_det/
#   images/train/ (*.jpg)
#   labels/train/ (*.txt — format YOLO)
#   images/val/
#   labels/val/

# Créer le fichier YAML
import yaml
config = {
    'path': './neu_det',
    'train': 'images/train',
    'val':   'images/val',
    'nc':    6,
    'names': ['crazing','inclusion','patches','pitted_surface','rolled-in_scale','scratches']
}
with open('neu_det.yaml', 'w') as f:
    yaml.dump(config, f)

model = YOLO('yolov8s.pt')
# model.train(data='neu_det.yaml', epochs=100, imgsz=640, batch=16, ...)
\`\`\``,
    },
  ],

  // ── 412 — GANs ────────────────────────────────────────────────────────
  412: [
    {
      title: 'Générer des données synthétiques pour augmenter un dataset médical',
      sector: '🏥 Santé / Data augmentation',
      context:
        'Le dataset de radiographies du Module 5 est déséquilibré (beaucoup de normaux, peu de cas rares). Tu vas entraîner un GAN conditionnel (CGAN) pour générer des exemples synthétiques de la classe minoritaire.',
      objective:
        'Implémente un DCGAN conditionné sur la classe sur les chest X-ray. Entraîne pendant 100 epochs. Évalue la qualité avec le FID score (Fréchet Inception Distance). Montre que l\'ajout de données synthétiques améliore le F1 de la classe minoritaire.',
      dataset: {
        label: 'Chest X-Ray Images (Pneumonia) — Kaggle',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
      skills: ['DCGAN', 'Generator', 'Discriminator', 'BCELoss', 'FID score', 'conditional GAN'],
      connectedFrom: 'Défauts industriels YOLO (Module 11)',
      connectedTo: 'Déploiement ONNX (Module 13)',
      starter: `\`\`\`python
import torch, torch.nn as nn, torch.optim as optim
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder

transform = transforms.Compose([
    transforms.Resize(64),
    transforms.CenterCrop(64),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5]),  # images N&B
])

# Charger seulement les NORMAL pour commencer
dataset = ImageFolder('chest_xray/train', transform=transform)
loader  = DataLoader(dataset, batch_size=64, shuffle=True, num_workers=2)

Z_DIM = 100

# TODO: définir Generator, Discriminator, boucle d'entraînement, sauvegarder des exemples
\`\`\``,
    },
  ],

  // ── 413 — Déploiement ─────────────────────────────────────────────────
  413: [
    {
      title: 'API de classification radiologique en production (ONNX + FastAPI)',
      sector: '🏥 Santé / MLOps',
      context:
        'Le modèle EfficientNet du Module 6 est validé cliniquement. Il faut maintenant l\'exposer comme API REST pour l\'intégrer dans le logiciel de l\'hôpital. Tu dois exporter en ONNX, construire une API FastAPI et la Dockeriser.',
      objective:
        'Export le modèle Keras en ONNX. Construis une API FastAPI avec endpoint POST /predict acceptant une image. Mesure et compare la latence PyTorch vs ONNX Runtime (doit être 2-4× plus rapide). Écrire un Dockerfile et tester avec Docker.',
      dataset: {
        label: 'Chest X-Ray Images — Kaggle (modèle du Module 6)',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
      skills: ['ONNX export', 'onnxruntime', 'FastAPI', 'Docker', 'latency benchmark', 'PIL.Image'],
      connectedFrom: 'EfficientNet (Module 6)',
      connectedTo: 'Optimisation inférence (Module 14)',
      starter: `\`\`\`python
# Export depuis Keras
import tensorflow as tf
import tf2onnx, onnx

model = tf.keras.models.load_model('efficientnet_chest.keras')

# Convertir en ONNX
input_signature = [tf.TensorSpec([None, 224, 224, 3], tf.float32, name='image')]
onnx_model, _  = tf2onnx.convert.from_keras(model, input_signature=input_signature)
onnx.save(onnx_model, 'chest_classifier.onnx')
print("Modèle exporté !")

# Tester avec ONNX Runtime
import onnxruntime as ort, numpy as np, time

session = ort.InferenceSession('chest_classifier.onnx')
dummy   = np.random.randn(1, 224, 224, 3).astype(np.float32)

# Benchmark
start = time.perf_counter()
for _ in range(100):
    session.run(None, {'image': dummy})
print(f"ONNX Runtime latence : {(time.perf_counter()-start)/100*1000:.1f} ms")
\`\`\``,
    },
  ],

  // ── 414 — Optimiser l'inférence ───────────────────────────────────────
  414: [
    {
      title: 'Quantifier EfficientNet pour déploiement mobile (TFLite)',
      sector: '📱 Mobile / Edge AI',
      context:
        'L\'hôpital veut une app mobile permettant au médecin de faire une pré-analyse en déconnecté depuis une tablette. Le modèle doit tenir en 5 MB et s\'exécuter en < 50 ms sur CPU Android.',
      objective:
        'Convertis le modèle EfficientNetB0 en TFLite avec quantization int8 (post-training static). Mesure la taille avant/après et la latence sur CPU. Applique aussi la Knowledge Distillation pour entraîner un MobileNetV2 student guidé par EfficientNet teacher.',
      dataset: {
        label: 'Chest X-Ray Images — Kaggle (modèle du Module 6)',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
      skills: ['TFLite', 'int8 quantization', 'Knowledge Distillation', 'MobileNetV2', 'benchmark CPU'],
      connectedFrom: 'ONNX FastAPI (Module 13)',
      connectedTo: 'W&B MLOps (Module 15)',
      starter: `\`\`\`python
import tensorflow as tf, numpy as np, os

model = tf.keras.models.load_model('efficientnet_chest.keras')

# Convertir en TFLite fp32 (baseline)
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
with open('chest_fp32.tflite', 'wb') as f:
    f.write(tflite_model)

# Quantization int8
converter.optimizations = [tf.lite.Optimize.DEFAULT]
# Données de représentation pour calibration statique
def representative_data_gen():
    for batch, _ in calibration_ds.take(100):
        yield [tf.cast(batch, tf.float32)]
converter.representative_dataset = representative_data_gen
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
tflite_int8 = converter.convert()
with open('chest_int8.tflite', 'wb') as f:
    f.write(tflite_int8)

print(f"FP32 : {os.path.getsize('chest_fp32.tflite')/1e6:.1f} MB")
print(f"INT8 : {os.path.getsize('chest_int8.tflite')/1e6:.1f} MB")
\`\`\``,
    },
  ],

  // ── 415 — MLOps DL ────────────────────────────────────────────────────
  415: [
    {
      title: 'Industrialiser le pipeline radiology AI avec W&B et DVC',
      sector: '🏥 Santé / MLOps',
      context:
        'Le projet radiology AI est maintenant mature. Tu dois mettre en place les pratiques MLOps pour que l\'équipe puisse reproduire les expériences, versionner les datasets et modèles, et automatiser l\'optimisation des hyperparamètres.',
      objective:
        'Configure W&B pour tracker toutes les expériences (métriques, images d\'exemples, confusion matrix). Lance un Sweep bayésien sur 20 trials pour optimiser lr, batch_size, dropout et architecture. Versionne les datasets avec DVC (remote Git LFS ou GDrive). Enregistre le meilleur modèle dans le Model Registry W&B.',
      dataset: {
        label: 'Chest X-Ray Images — Kaggle (projet fil rouge)',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
      skills: ['W&B', 'wandb.sweep', 'DVC', 'Model Registry', 'artifact', 'reproducibility'],
      connectedFrom: 'Quantization (Module 14)',
      connectedTo: null,
      starter: `\`\`\`python
import wandb

# 1. Définir le sweep
sweep_config = {
    'method': 'bayes',
    'metric': {'name': 'val/auc', 'goal': 'maximize'},
    'parameters': {
        'learning_rate': {'distribution': 'log_uniform_values', 'min': 1e-5, 'max': 1e-3},
        'batch_size':    {'values': [16, 32, 64]},
        'dropout':       {'distribution': 'uniform', 'min': 0.1, 'max': 0.5},
        'architecture':  {'values': ['efficientnet_b0', 'mobilenet_v2', 'resnet50']},
        'fine_tune_layers': {'values': [0, 20, 50]},
    }
}

sweep_id = wandb.sweep(sweep_config, project='radiology-ai')

def train_sweep():
    with wandb.init() as run:
        cfg = wandb.config
        # Construire le modèle selon cfg.architecture, cfg.dropout
        # Entraîner et logger les métriques
        # Sauvegarder le meilleur modèle comme artifact
        pass

wandb.agent(sweep_id, function=train_sweep, count=20)
\`\`\``,
    },
  ],
};

export default DL_PROJECTS;
