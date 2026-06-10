/**
 * Parcours Deep Learning — 15 modules de Débutant à Expert.
 * IDs : 401–415
 * Structure identique au ML track : lessons (théorie) uniquement.
 * Les projets métier sont dans dlProjects.js.
 */

const DL_MODULES = [

  // ── 401 ────────────────────────────────────────────────────────────────
  {
    id: 401, level: 'Débutant', icon: '🧠', color: 'green', colorHex: '#59CD90',
    title: "C'est quoi le Deep Learning ?",
    desc: "Comprendre la différence entre ML classique et DL, l'intuition derrière les réseaux de neurones et pourquoi le DL a révolutionné l'IA depuis 2012.",
    lessons: [
      {
        title: 'DL vs ML classique',
        content: `## Deep Learning — De quoi parle-t-on ?

### ML classique : l'ingénieur crée les features

Dans le ML classique (Random Forest, SVM, etc.), **tu dois construire toi-même les bonnes features** :

\`\`\`
Image brute → [Ingénieur extrait : bords, coins, textures...] → Classifieur
\`\`\`

C'est lent, coûteux et limité à ce que l'humain sait abstraire.

### Deep Learning : le réseau apprend ses propres features

\`\`\`
Image brute → [Réseau apprend automatiquement] → Prédiction
             couche 1 : bords
             couche 2 : formes
             couche 3 : visages
             couche 4 : identité
\`\`\`

**Chaque couche apprend une représentation de plus en plus abstraite.**

### Quand utiliser le DL plutôt que le ML classique ?

| Critère | ML classique | Deep Learning |
|---------|-------------|---------------|
| Volume de données | Fonctionne avec peu | Nécessite beaucoup |
| Données tabulaires | ✅ Excellent | Souvent inutile |
| Images / Audio / Texte | Limité | ✅ État de l'art |
| Interprétabilité | Bonne | Difficile |
| Temps d'entraînement | Rapide | Lent (GPU conseillé) |
| Feature engineering | Manuel | Automatique |

### Les 3 grandes percées historiques

1. **2012 — AlexNet** gagne ImageNet avec un CNN profond. Le DL démarre.
2. **2017 — Transformers** (papier "Attention is All You Need"). Révolution NLP.
3. **2022 — ChatGPT / Stable Diffusion** — le DL entre dans le grand public.

### L'équation de base

Un réseau de neurones n'est qu'une **fonction paramétrique** :

\`\`\`
f(x ; θ) = y
\`\`\`

- **x** = les données d'entrée
- **θ** = les millions de paramètres (poids)
- **y** = la prédiction
- L'entraînement = trouver θ qui minimise l'erreur sur les données

> **En résumé** : le Deep Learning, c'est du ML classique avec des modèles tellement expressifs qu'ils n'ont plus besoin de feature engineering manuel.`,
        links: [
          { label: '3Blue1Brown — Neural Networks serie (YouTube)', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi' },
          { label: 'Deep Learning book — Goodfellow (gratuit en ligne)', url: 'https://www.deeplearningbook.org/' },
        ],
      },
      {
        title: "L'écosystème Python DL",
        content: `## Les outils du Deep Learning en Python

### TensorFlow / Keras vs PyTorch

Les deux frameworks dominent le marché. Voici leurs différences :

| | TensorFlow / Keras | PyTorch |
|---|---|---|
| **Popularité recherche** | Moins | ✅ Dominant |
| **Popularité production** | ✅ Fort | Croissant |
| **Courbe d'apprentissage** | Plus douce (Keras) | Plus pythonicienne |
| **Débug** | Plus difficile | ✅ Très facile |
| **Déploiement** | TFServing, TFLite | ONNX, TorchServe |

**Recommandation 2024 :** apprendre PyTorch pour la recherche/flexibilité, Keras pour la productivité et les débutants.

### Installation

\`\`\`bash
# TensorFlow / Keras
pip install tensorflow

# PyTorch (CPU)
pip install torch torchvision

# PyTorch (GPU CUDA 12.x)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121

# HuggingFace (NLP)
pip install transformers datasets

# Outils complémentaires
pip install matplotlib numpy pandas scikit-learn
\`\`\`

### Ton premier réseau en 10 lignes — Keras

\`\`\`python
import tensorflow as tf
from tensorflow import keras

# Chargement MNIST (chiffres manuscrits)
(X_train, y_train), (X_test, y_test) = keras.datasets.mnist.load_data()
X_train = X_train.reshape(-1, 784) / 255.0
X_test  = X_test.reshape(-1, 784) / 255.0

# Modèle
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10,  activation='softmax'),
])
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=5, validation_split=0.1, verbose=1)
print(f"Test accuracy : {model.evaluate(X_test, y_test, verbose=0)[1]:.3f}")
\`\`\`

### Ton premier réseau en PyTorch

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim

class MLP(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(784, 128), nn.ReLU(),
            nn.Linear(128, 10),
        )
    def forward(self, x):
        return self.net(x)

model     = MLP()
optimizer = optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()
# ... boucle d'entraînement → voir module suivant
\`\`\`

> **Convention du cours** : on utilise **Keras** pour les modules débutant/intermédiaire (code plus concis), puis on bascule sur **PyTorch** pour les modules avancés et production.`,
        links: [
          { label: 'PyTorch — documentation officielle', url: 'https://pytorch.org/docs/stable/index.html' },
          { label: 'Keras — getting started', url: 'https://keras.io/getting_started/' },
        ],
      },
    ],
  },

  // ── 402 ────────────────────────────────────────────────────────────────
  {
    id: 402, level: 'Débutant', icon: '⚡', color: 'green', colorHex: '#59CD90',
    title: 'Le perceptron et les MLP',
    desc: "Le neurone artificiel, les couches cachées, les fonctions d'activation — comprendre comment un réseau transforme des données.",
    lessons: [
      {
        title: 'Du neurone biologique au perceptron',
        content: `## Le neurone artificiel

### Analogie biologique

\`\`\`
Neurone biologique :          Neurone artificiel :
  dendrites (entrées)           x1, x2, x3 (inputs)
  corps cellulaire              somme pondérée + biais
  axone (sortie)                fonction d'activation → sortie
\`\`\`

### Formule mathématique

$$y = f\\left(\\sum_{i} w_i x_i + b\\right)$$

- **x_i** : les entrées (features)
- **w_i** : les poids (appris pendant l'entraînement)
- **b** : le biais (seuil d'activation)
- **f** : la fonction d'activation

\`\`\`python
import numpy as np

def neurone(x, w, b, activation='relu'):
    z = np.dot(w, x) + b          # combinaison linéaire
    if activation == 'relu':
        return np.maximum(0, z)   # sortie
    elif activation == 'sigmoid':
        return 1 / (1 + np.exp(-z))

# Exemple : un seul neurone
x = np.array([2.0, 3.0, -1.0])
w = np.array([0.5, -0.2, 0.8])
b = 0.1
print(neurone(x, w, b))  # ReLU → 0.9
\`\`\`

### Les fonctions d'activation

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 200)

activations = {
    'ReLU':    np.maximum(0, x),
    'Sigmoid': 1 / (1 + np.exp(-x)),
    'Tanh':    np.tanh(x),
    'Leaky ReLU': np.where(x > 0, x, 0.01 * x),
}

fig, axes = plt.subplots(2, 2, figsize=(10, 8))
for ax, (name, y) in zip(axes.flat, activations.items()):
    ax.plot(x, y, lw=2)
    ax.axhline(0, color='gray', lw=0.5)
    ax.axvline(0, color='gray', lw=0.5)
    ax.set_title(name)
    ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
\`\`\`

| Activation | Usage | Avantage | Inconvénient |
|------------|-------|----------|--------------|
| **ReLU** | Couches cachées (standard) | Simple, rapide | Neurones morts |
| **Leaky ReLU** | Couches cachées | Corrige neurons morts | — |
| **Sigmoid** | Sortie binaire | Sortie [0,1] | Vanishing gradient |
| **Softmax** | Sortie multi-classe | Probabilités | — |
| **Tanh** | RNN | Centré en 0 | Vanishing gradient |

> **Règle pratique** : utilise **ReLU** dans toutes les couches cachées. Jamais de sigmoid sauf en sortie binaire.`,
        links: [
          { label: 'Activation functions — Towards Data Science', url: 'https://towardsdatascience.com/activation-functions-neural-networks-1cbd9f8d91d6' },
        ],
      },
      {
        title: 'Multi-Layer Perceptron (MLP)',
        content: `## Le réseau à plusieurs couches

### Architecture MLP

\`\`\`
Couche entrée  →  Couche cachée 1  →  Couche cachée 2  →  Couche sortie
  (features)        (n neurones)        (m neurones)        (classes)
      x               h1 = f(W1·x)        h2 = f(W2·h1)       ŷ = f(W3·h2)
\`\`\`

### Pourquoi plusieurs couches ?

Une seule couche = **frontière de décision linéaire** → impossible de résoudre XOR.

Avec 2 couches = **frontière non-linéaire** → peut approximer n'importe quelle fonction (théorème universel d'approximation).

### Construire un MLP avec Keras

\`\`\`python
from tensorflow import keras
from tensorflow.keras import layers

# Architecture standard pour données tabulaires
model = keras.Sequential([
    # Couche d'entrée implicite (input_shape)
    layers.Dense(256, activation='relu', input_shape=(20,)),  # 20 features
    layers.Dense(128, activation='relu'),
    layers.Dense(64,  activation='relu'),
    layers.Dense(1,   activation='sigmoid'),  # sortie binaire
])

model.summary()
# Total params: 20 * 256 + 256 + 256 * 128 + ... = ~36 000 paramètres
\`\`\`

### Comprendre model.summary()

\`\`\`
Layer (type)         Output Shape    Param #
=================================================
dense (Dense)        (None, 256)     5376        ← 20×256 + 256 biais
dense_1 (Dense)      (None, 128)     32896       ← 256×128 + 128 biais
dense_2 (Dense)      (None, 64)      8256        ← 128×64 + 64 biais
dense_3 (Dense)      (None, 1)       65          ← 64×1 + 1 biais
=================================================
Total params: 46,593
\`\`\`

### Combien de couches / neurones ?

**Règle empirique :**
- Données tabulaires : 2-3 couches, 64–512 neurones → suffit presque toujours
- Images : CNN (module 5)
- Texte : Transformer (module 8)

\`\`\`python
# Recette universelle pour données tabulaires
def creer_mlp(input_dim, output_dim, task='binary'):
    activation_out = 'sigmoid' if task == 'binary' else (
                     'softmax' if task == 'multiclass' else 'linear')
    loss = 'binary_crossentropy' if task == 'binary' else (
           'sparse_categorical_crossentropy' if task == 'multiclass' else 'mse')

    model = keras.Sequential([
        layers.Dense(256, activation='relu', input_shape=(input_dim,)),
        layers.Dense(128, activation='relu'),
        layers.Dense(output_dim, activation=activation_out),
    ])
    model.compile(optimizer='adam', loss=loss, metrics=['accuracy'])
    return model
\`\`\``,
        links: [
          { label: 'Keras — Sequential model guide', url: 'https://keras.io/guides/sequential_model/' },
          { label: 'CS231n — Neural Networks Part 1', url: 'https://cs231n.github.io/neural-networks-1/' },
        ],
      },
    ],
  },

  // ── 403 ────────────────────────────────────────────────────────────────
  {
    id: 403, level: 'Débutant', icon: '🔄', color: 'green', colorHex: '#59CD90',
    title: 'Backpropagation & Optimiseurs',
    desc: "Comment un réseau apprend : fonctions de loss, descente de gradient, rétropropagation, Adam — les mécanismes fondamentaux de l'entraînement.",
    lessons: [
      {
        title: 'Loss et descente de gradient',
        content: `## Comment le réseau apprend

### La fonction de loss (erreur)

La loss mesure **à quel point les prédictions sont mauvaises**.

| Tâche | Loss | Formule |
|-------|------|---------|
| Régression | MSE | mean((ŷ - y)²) |
| Classification binaire | Binary Cross-Entropy | -mean(y·log(ŷ) + (1-y)·log(1-ŷ)) |
| Classification multi-classe | Categorical Cross-Entropy | -mean(Σ y_c·log(ŷ_c)) |

### L'objectif : minimiser la loss

\`\`\`
Paramètres θ → prédiction ŷ → loss L(ŷ, y) → gradient ∂L/∂θ → mise à jour θ
                ←────────────────────────────────────────────────────────────
\`\`\`

### Descente de gradient

\`\`\`python
# Intuition : bille qui roule vers le bas d'une vallée
# Le gradient indique la pente → on va dans le sens opposé

theta = theta - learning_rate * gradient

# Exemple à la main (régression linéaire simple)
import numpy as np

X = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

w, b = 0.0, 0.0
lr = 0.01

for epoch in range(1000):
    y_hat = w * X + b
    loss  = np.mean((y_hat - y) ** 2)

    dw = np.mean(2 * (y_hat - y) * X)  # gradient par rapport à w
    db = np.mean(2 * (y_hat - y))       # gradient par rapport à b

    w -= lr * dw
    b -= lr * db

print(f"w={w:.2f}, b={b:.2f}")  # → w≈2.0, b≈0.0
\`\`\`

### Les 3 variantes de gradient descent

\`\`\`
Batch GD :       utilise TOUS les exemples → lent mais stable
Stochastic GD :  utilise 1 exemple à la fois → rapide mais bruité
Mini-batch GD :  utilise N exemples (batch_size) → compromis ✅
\`\`\`

\`\`\`python
# En Keras, le batch_size contrôle ce compromis
model.fit(X_train, y_train,
          batch_size=32,    # mini-batch size (32 ou 64 = standard)
          epochs=50)
\`\`\`

> **Règle pratique** : batch_size=32 ou 64 est un bon défaut. Plus grand = plus stable mais moins régularisant.`,
        links: [
          { label: 'CS231n — Optimization (Stanford)', url: 'https://cs231n.github.io/optimization-1/' },
        ],
      },
      {
        title: 'Backpropagation et optimiseurs modernes',
        content: `## La rétropropagation

### Principe : appliquer la règle de la chaîne

Pour mettre à jour chaque poids, on calcule **comment la loss change quand on modifie ce poids**. La backprop propage ce signal d'erreur de la sortie vers l'entrée.

\`\`\`
Layer 3 (sortie) → calcule gradient de loss par rapport à W3
       ↓
Layer 2          → calcule gradient par rapport à W2 (en utilisant le gradient de la couche 3)
       ↓
Layer 1          → calcule gradient par rapport à W1
\`\`\`

### En pratique — PyTorch (autograd)

PyTorch calcule la backprop **automatiquement** :

\`\`\`python
import torch
import torch.nn as nn

model     = nn.Linear(10, 1)  # modèle simple
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.MSELoss()

x = torch.randn(32, 10)
y = torch.randn(32, 1)

# Boucle d'entraînement type
for epoch in range(100):
    optimizer.zero_grad()       # 1. Réinitialiser les gradients
    y_pred = model(x)           # 2. Forward pass
    loss   = criterion(y_pred, y)  # 3. Calculer la loss
    loss.backward()             # 4. Backprop (calcule les gradients)
    optimizer.step()            # 5. Mise à jour des poids

    if epoch % 20 == 0:
        print(f"Epoch {epoch:3d}  Loss: {loss.item():.4f}")
\`\`\`

### Les optimiseurs modernes

\`\`\`python
# SGD classique — simple mais nécessite du réglage
optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Adam — le standard actuel
optim.Adam(model.parameters(), lr=1e-3)  # lr par défaut = 0.001

# AdamW — Adam + weight decay (meilleur pour Transformers)
optim.AdamW(model.parameters(), lr=1e-4, weight_decay=1e-2)

# RMSprop — souvent utilisé pour les RNN
optim.RMSprop(model.parameters(), lr=1e-3)
\`\`\`

| Optimiseur | Learning rate typique | Usage |
|-----------|----------------------|-------|
| **Adam** | 1e-3 à 1e-4 | Standard (CNN, MLP, DL général) |
| **AdamW** | 1e-4 à 1e-5 | Transformers, BERT, GPT |
| **SGD + Momentum** | 0.01 à 0.1 | CNN vision (souvent meilleur sur CIFAR/ImageNet) |

### Learning Rate Scheduling

\`\`\`python
from tensorflow.keras.callbacks import ReduceLROnPlateau, CosineDecayRestarts

# Réduire le LR quand la validation stagne
reduce_lr = ReduceLROnPlateau(
    monitor='val_loss', factor=0.5, patience=5, min_lr=1e-6, verbose=1
)

model.fit(X_train, y_train,
          epochs=100,
          callbacks=[reduce_lr])
\`\`\`

> **Règle d'or** : commence avec **Adam lr=1e-3**. Si ça diverge → divise par 10. Si ça stagne → cosine decay ou ReduceLROnPlateau.`,
        links: [
          { label: 'Adam optimizer paper (arXiv)', url: 'https://arxiv.org/abs/1412.6980' },
          { label: 'Andrej Karpathy — Backprop Ninja (YouTube)', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0' },
        ],
      },
    ],
  },

  // ── 404 ────────────────────────────────────────────────────────────────
  {
    id: 404, level: 'Débutant', icon: '🛡️', color: 'green', colorHex: '#59CD90',
    title: 'Régularisation & Bonnes pratiques',
    desc: "Dropout, Batch Normalization, Early Stopping, Weight Decay — éviter l'overfitting et entraîner des réseaux stables.",
    lessons: [
      {
        title: 'Overfitting en Deep Learning',
        content: `## Le danger de l'overfitting

Un réseau de neurones avec des millions de paramètres peut **mémoriser** le dataset d'entraînement sans rien généraliser.

### Diagnostiquer avec les courbes

\`\`\`python
import matplotlib.pyplot as plt

history = model.fit(X_train, y_train, validation_split=0.2, epochs=100)

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].plot(history.history['loss'],     label='Train')
axes[0].plot(history.history['val_loss'], label='Val')
axes[0].set_title('Loss')

axes[1].plot(history.history['accuracy'],     label='Train')
axes[1].plot(history.history['val_accuracy'], label='Val')
axes[1].set_title('Accuracy')

for ax in axes: ax.legend()
plt.show()
\`\`\`

**Interprétation :**
- Train loss ↓ mais Val loss ↑ → **overfitting** → besoin de régularisation
- Les deux losses restent hautes → **underfitting** → réseau trop simple ou LR trop faible
- Les deux descendent ensemble → **bon signal**

### Early Stopping — Stop avant l'overfitting

\`\`\`python
from tensorflow.keras.callbacks import EarlyStopping

early_stop = EarlyStopping(
    monitor='val_loss',       # surveiller la val_loss
    patience=10,              # attendre 10 epochs sans amélioration
    restore_best_weights=True # revenir aux meilleurs poids
)

model.fit(X_train, y_train,
          epochs=500,  # large → early stopping s'en charge
          validation_split=0.2,
          callbacks=[early_stop])
\`\`\`

> **Toujours utiliser EarlyStopping** avec \`restore_best_weights=True\`. C'est la régularisation la plus simple et efficace.

### Dropout

Pendant l'entraînement, désactive aléatoirement **p%** des neurones à chaque forward pass.

\`\`\`
Sans Dropout : tous les neurones s'appuient les uns sur les autres → co-adaptation
Avec Dropout : chaque neurone doit être utile seul → généralisation
\`\`\`

\`\`\`python
from tensorflow.keras import layers

model = keras.Sequential([
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.3),   # désactive 30% des neurones aléatoirement
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(1, activation='sigmoid'),
])

# Important : Dropout est automatiquement désactivé en mode inference (predict)
\`\`\`

**Taux de Dropout typiques :**
- Couches larges (512+) : 0.4–0.5
- Couches moyennes (128–256) : 0.2–0.3
- Couches finales : 0.1–0.2`,
        links: [
          { label: 'Dropout paper (Srivastava et al., 2014)', url: 'https://jmlr.org/papers/v15/srivastava14a.html' },
        ],
      },
      {
        title: 'Batch Normalization et Weight Decay',
        content: `## Batch Normalization — Stabiliser l'entraînement

### Le problème : Internal Covariate Shift

À chaque couche, la distribution des activations change → les couches profondes doivent sans cesse s'adapter.

**Batch Norm** : normalise les activations de chaque couche pour qu'elles aient **moyenne ≈ 0 et variance ≈ 1**.

\`\`\`python
from tensorflow.keras import layers

# BatchNorm se place APRÈS la couche Dense/Conv, AVANT l'activation
model = keras.Sequential([
    layers.Dense(256),
    layers.BatchNormalization(),  # normalise
    layers.Activation('relu'),    # puis activation

    layers.Dense(128),
    layers.BatchNormalization(),
    layers.Activation('relu'),

    layers.Dense(10, activation='softmax'),
])
\`\`\`

**Avantages de BatchNorm :**
- Permet des learning rates plus élevés
- Réduit la sensibilité à l'initialisation
- Légèrement régularisant (peut remplacer Dropout dans les CNN)
- Accélère la convergence

### Weight Decay (L2 Regularization)

Pénalise les poids trop grands en ajoutant leur norme à la loss.

\`\`\`python
from tensorflow.keras import regularizers

# Keras — L2 par couche
model = keras.Sequential([
    layers.Dense(256, activation='relu',
                 kernel_regularizer=regularizers.l2(1e-4)),
    layers.Dense(10, activation='softmax'),
])

# PyTorch — weight_decay dans l'optimiseur
optimizer = torch.optim.AdamW(model.parameters(),
                               lr=1e-3,
                               weight_decay=1e-4)  # équivalent L2
\`\`\`

### Checklist complète anti-overfitting

\`\`\`python
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint

callbacks = [
    EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True),
    ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=7),
    ModelCheckpoint('best_model.keras', save_best_only=True),
]

model = keras.Sequential([
    layers.Dense(256), layers.BatchNormalization(), layers.Activation('relu'),
    layers.Dropout(0.3),
    layers.Dense(128), layers.BatchNormalization(), layers.Activation('relu'),
    layers.Dropout(0.2),
    layers.Dense(1, activation='sigmoid'),
])

model.compile(optimizer=keras.optimizers.Adam(1e-3),
              loss='binary_crossentropy', metrics=['accuracy'])

history = model.fit(X_train, y_train, epochs=300, batch_size=64,
                    validation_split=0.2, callbacks=callbacks)
\`\`\`

### Récapitulatif

| Technique | Quand l'utiliser | Hyperparamètre |
|-----------|-----------------|----------------|
| **Early Stopping** | Toujours | patience=10–20 |
| **Dropout** | MLP, Transformers | rate=0.2–0.4 |
| **BatchNorm** | CNN, MLP profonds | — |
| **Weight Decay** | Toujours (AdamW) | 1e-4 à 1e-2 |
| **Data Augmentation** | Images / Texte | voir CNN module |`,
        links: [
          { label: 'Batch Normalization paper (Ioffe & Szegedy, 2015)', url: 'https://arxiv.org/abs/1502.03167' },
        ],
      },
    ],
  },

  // ── 405 ────────────────────────────────────────────────────────────────
  {
    id: 405, level: 'Intermédiaire', icon: '👁️', color: 'blue', colorHex: '#3FA7D6',
    title: 'CNN — Réseaux convolutifs',
    desc: "Comprendre les convolutions, les feature maps, le pooling et les architectures classiques (VGG, ResNet). La base de la vision par ordinateur.",
    lessons: [
      {
        title: "L'opération de convolution",
        content: `## Les CNN — Pourquoi pas un simple MLP pour les images ?

### Le problème du MLP sur les images

Une image 224×224 RGB = 224×224×3 = **150 528 pixels**. Avec un MLP de 512 neurones, la première couche aurait 150 528 × 512 = **77 millions de paramètres**. Et le MLP **ne capture pas la localité spatiale** (un bord peut être n'importe où dans l'image).

### La convolution — partager les poids

Un **filtre** (kernel) de taille 3×3 est appliqué à chaque position de l'image :

\`\`\`
Image 8×8 :         Filtre 3×3 :     Feature map (6×6) :
┌──────────┐        ┌───────┐         ┌──────────┐
│ . . . . .│   ⊗   │w w w  │    →    │ . . . .  │
│ . . . . .│        │w w w  │         │ . . . .  │
│ . . . . .│        │w w w  │         │ . . . .  │
└──────────┘        └───────┘         └──────────┘
\`\`\`

**Le même filtre est appliqué partout** → le réseau détecte le même motif quel que soit son emplacement.

### En code — Keras CNN minimal

\`\`\`python
from tensorflow.keras import layers, models

# Architecture CNN pour images 32×32 (ex: CIFAR-10)
model = models.Sequential([
    # Bloc 1
    layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(32, 32, 3)),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),   # 32×32 → 16×16

    # Bloc 2
    layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),   # 16×16 → 8×8

    # Bloc 3
    layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),   # 8×8 → 4×4

    # Classifier
    layers.GlobalAveragePooling2D(),  # 4×4×128 → 128
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax'),  # 10 classes
])

model.summary()
\`\`\`

### Que voient les différentes couches ?

\`\`\`
Couche 1 (Conv2D 32 filtres)  : bords, contours, orientations
Couche 2 (Conv2D 64 filtres)  : formes simples, coins, cercles
Couche 3 (Conv2D 128 filtres) : textures, parties d'objets
Couche finale (Dense)          : concepts de haut niveau (chien, voiture...)
\`\`\`

### MaxPooling vs GlobalAveragePooling

\`\`\`python
# MaxPooling2D : garde la valeur max dans chaque fenêtre (réduction spatiale)
# 4×4 feature map → MaxPool(2,2) → 2×2

# GlobalAveragePooling2D : moyenne sur tout le spatial → vecteur 1D
# Remplace Flatten + Dense, moins d'overfitting ✅
\`\`\``,
        links: [
          { label: 'CS231n — Convolutional Networks (Stanford)', url: 'https://cs231n.github.io/convolutional-networks/' },
        ],
      },
      {
        title: 'Architectures CNN et Data Augmentation',
        content: `## Architectures CNN classiques

### L'évolution des architectures

\`\`\`
1998 : LeNet-5          (6 couches)  → chiffres manuscrits
2012 : AlexNet          (8 couches)  → ImageNet (-10% erreur vs ML)
2014 : VGG-16/19        (16-19 cou.) → blocs 3×3 uniformes
2015 : ResNet-50/101    (50-101 cou.) → residual connections
2019 : EfficientNet     (variable)   → scaling intelligent
2020 : Vision Transformer (ViT)      → attention pure
\`\`\`

### Residual Connections (ResNet) — L'innovation clé

Sans residual : les gradients disparaissent dans les réseaux profonds.

\`\`\`python
# PyTorch — Residual Block
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)
        self.bn1   = nn.BatchNorm2d(channels)
        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)
        self.bn2   = nn.BatchNorm2d(channels)
        self.relu  = nn.ReLU()

    def forward(self, x):
        residual = x                         # identité
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        return self.relu(out + residual)     # x + F(x) → skip connection
\`\`\`

### Data Augmentation — Augmenter artificiellement le dataset

\`\`\`python
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Augmentation standard pour entraînement
datagen_train = ImageDataGenerator(
    rotation_range=20,          # rotation aléatoire ±20°
    width_shift_range=0.1,      # décalage horizontal
    height_shift_range=0.1,     # décalage vertical
    horizontal_flip=True,       # miroir horizontal
    zoom_range=0.1,             # zoom aléatoire
    fill_mode='nearest'
)

# Pas d'augmentation sur le test/validation !
datagen_val = ImageDataGenerator()  # rien

# Générer les batches augmentés
train_gen = datagen_train.flow(X_train, y_train, batch_size=32)
val_gen   = datagen_val.flow(X_val, y_val, batch_size=32)

model.fit(train_gen,
          validation_data=val_gen,
          epochs=50)
\`\`\`

### PyTorch — torchvision transforms

\`\`\`python
import torchvision.transforms as transforms

train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

val_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])
\`\`\``,
        links: [
          { label: 'ResNet paper (He et al., 2015)', url: 'https://arxiv.org/abs/1512.03385' },
          { label: 'torchvision transforms', url: 'https://pytorch.org/vision/stable/transforms.html' },
        ],
      },
    ],
  },

  // ── 406 ────────────────────────────────────────────────────────────────
  {
    id: 406, level: 'Intermédiaire', icon: '🔁', color: 'blue', colorHex: '#3FA7D6',
    title: 'Transfer Learning & Fine-tuning',
    desc: "Réutiliser des modèles pré-entraînés sur ImageNet (ResNet, EfficientNet, ViT) pour résoudre tes problèmes métier avec peu de données.",
    lessons: [
      {
        title: "Principes du Transfer Learning",
        content: `## Pourquoi le Transfer Learning change tout

### Le problème

Entraîner un ResNet-50 from scratch sur ImageNet prend **des semaines sur plusieurs GPU**. La plupart des projets n'ont pas ces ressources.

### La solution : réutiliser les features apprises

Les premières couches d'un CNN entraîné sur ImageNet ont appris des features **universelles** (bords, textures, formes) qui sont utiles pour **n'importe quel problème de vision**.

\`\`\`
ResNet-50 pré-entraîné ImageNet :
  couches 1-40  → features universelles (réutiliser)
  couches 41-50 → features spécifiques ImageNet (remplacer)
  dernière couche → 1000 classes ImageNet (remplacer par tes classes)
\`\`\`

### Deux stratégies

**Feature Extraction** (gel des poids) — quand tu as peu de données :

\`\`\`python
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0

# 1. Charger le backbone pré-entraîné SANS la tête de classification
base_model = EfficientNetB0(weights='imagenet', include_top=False,
                              input_shape=(224, 224, 3))

# 2. Geler toutes les couches du backbone
base_model.trainable = False

# 3. Ajouter ta propre tête
x = base_model.output
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dropout(0.3)(x)
output = tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')(x)

model = tf.keras.Model(inputs=base_model.input, outputs=output)
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.fit(train_gen, epochs=10)  # rapide !
\`\`\`

**Fine-tuning** (dégel progressif) — quand tu as plus de données :

\`\`\`python
# Après la phase feature extraction :

# 1. Dégeler les dernières couches du backbone
base_model.trainable = True
for layer in base_model.layers[:-30]:  # geler les 30 premières couches
    layer.trainable = False

# 2. Utiliser un learning rate TRÈS faible pour ne pas écraser les features
model.compile(optimizer=tf.keras.optimizers.Adam(1e-5),  # 100x plus faible
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(train_gen, epochs=20)
\`\`\`

### Modèles disponibles dans Keras / torchvision

\`\`\`python
# Keras / TF
from tensorflow.keras.applications import (
    VGG16, VGG19,             # Classiques, lourds
    ResNet50, ResNet101,      # Robustes, bien connus
    EfficientNetB0,  EfficientNetB7,  # Meilleur trade-off params/perf
    MobileNetV2, MobileNetV3Small,    # Légère, embarqué/mobile
    InceptionV3,                       # Multi-scale
)

# PyTorch / torchvision
import torchvision.models as models
resnet50 = models.resnet50(pretrained=True)
efficientnet = models.efficientnet_b0(pretrained=True)
vit_b16 = models.vit_b_16(pretrained=True)
\`\`\``,
        links: [
          { label: 'HuggingFace — timm (PyTorch Image Models)', url: 'https://huggingface.co/docs/timm/index' },
        ],
      },
      {
        title: 'Recette Transfer Learning complète',
        content: `## Workflow complet Transfer Learning

### Étape 1 — Préparer les données

\`\`\`python
import tensorflow as tf

IMG_SIZE    = 224
BATCH_SIZE  = 32
NUM_CLASSES = 5

# Dataset organisé en dossiers : data/train/classe1/, data/train/classe2/, ...
train_ds = tf.keras.utils.image_dataset_from_directory(
    'data/train',
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    label_mode='int',
)
val_ds = tf.keras.utils.image_dataset_from_directory(
    'data/val',
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
)

# Normalisation + Augmentation
augmentation = tf.keras.Sequential([
    tf.keras.layers.RandomFlip('horizontal'),
    tf.keras.layers.RandomRotation(0.1),
    tf.keras.layers.RandomZoom(0.1),
])

# Normalisation ImageNet
AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.map(lambda x, y: (augmentation(x) / 255.0, y)).prefetch(AUTOTUNE)
val_ds   = val_ds.map(lambda x, y: (x / 255.0, y)).prefetch(AUTOTUNE)
\`\`\`

### Étape 2 — Construire le modèle

\`\`\`python
def build_model(backbone_name='efficientnet', num_classes=5, dropout=0.3):
    if backbone_name == 'efficientnet':
        base = tf.keras.applications.EfficientNetB0(
            weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    elif backbone_name == 'resnet50':
        base = tf.keras.applications.ResNet50(
            weights='imagenet', include_top=False, input_shape=(224, 224, 3))

    base.trainable = False  # Feature extraction d'abord

    inputs = tf.keras.Input(shape=(224, 224, 3))
    x = base(inputs, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(dropout)(x)
    outputs = tf.keras.layers.Dense(num_classes, activation='softmax')(x)

    return tf.keras.Model(inputs, outputs)

model = build_model('efficientnet', num_classes=NUM_CLASSES)
model.summary()
\`\`\`

### Étape 3 — Phase 1 : Feature extraction

\`\`\`python
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau

model.compile(optimizer=tf.keras.optimizers.Adam(1e-3),
              loss='sparse_categorical_crossentropy', metrics=['accuracy'])

callbacks = [
    EarlyStopping(patience=10, restore_best_weights=True),
    ReduceLROnPlateau(factor=0.5, patience=5),
]
model.fit(train_ds, validation_data=val_ds, epochs=30, callbacks=callbacks)
\`\`\`

### Étape 4 — Phase 2 : Fine-tuning

\`\`\`python
# Dégeler les 50 dernières couches
base_model = model.layers[1]
base_model.trainable = True
for layer in base_model.layers[:-50]:
    layer.trainable = False

model.compile(optimizer=tf.keras.optimizers.Adam(1e-5),  # LR ×100 plus faible
              loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.fit(train_ds, validation_data=val_ds, epochs=20, callbacks=callbacks)
print(f"Accuracy finale : {model.evaluate(val_ds)[1]:.3f}")
\`\`\``,
        links: [
          { label: 'Keras — Transfer Learning tutorial', url: 'https://keras.io/guides/transfer_learning/' },
          { label: 'EfficientNet paper', url: 'https://arxiv.org/abs/1905.11946' },
        ],
      },
    ],
  },

  // ── 407 ────────────────────────────────────────────────────────────────
  {
    id: 407, level: 'Intermédiaire', icon: '🔃', color: 'blue', colorHex: '#3FA7D6',
    title: 'RNN & LSTM — Données séquentielles',
    desc: "Modéliser des séquences (texte, séries temporelles) avec les réseaux récurrents : RNN, LSTM, GRU et leurs limites.",
    lessons: [
      {
        title: 'Réseaux récurrents (RNN)',
        content: `## Le problème des séquences

Un MLP ou CNN standard traite chaque exemple **indépendamment**. Pour une phrase ou une série temporelle, l'**ordre et le contexte** sont essentiels.

### Le RNN — Mémoire entre les timesteps

\`\`\`
Texte : "Le chat mange la souris"
         ↓     ↓     ↓   ↓   ↓
RNN :   h1 →  h2 →  h3 → h4 → h5 → sortie
        (le)  (chat) (mange) (la)  (souris)

h_t = f(W_hh · h_{t-1} + W_xh · x_t + b)
\`\`\`

L'état caché **h_t** capture le "contexte" accumulé jusqu'au timestep t.

### Le problème du Vanishing Gradient

Pour des séquences longues, le gradient s'évanouit en remontant dans le temps.

\`\`\`
"Le chat que j'ai vu hier dans le jardin mange"
  ↑                                         ↑
  Ce mot                    est lié à ce verbe
  mais le gradient ne remonte plus assez loin
\`\`\`

### LSTM — Long Short-Term Memory

Le LSTM ajoute une **cellule mémoire** et des **portes** qui contrôlent le flux d'information :

\`\`\`
Forget gate  : oublier les infos passées
Input gate   : quoi stocker dans la mémoire
Output gate  : quoi sortir de la mémoire
\`\`\`

\`\`\`python
from tensorflow.keras import layers, models

# LSTM pour classification de séquences
model = models.Sequential([
    layers.Embedding(vocab_size, 64, input_length=max_len),  # texte
    layers.LSTM(128, return_sequences=True),
    layers.LSTM(64),
    layers.Dropout(0.3),
    layers.Dense(1, activation='sigmoid'),
])

# GRU — version simplifiée du LSTM, souvent équivalent
model2 = models.Sequential([
    layers.Embedding(vocab_size, 64, input_length=max_len),
    layers.GRU(128, return_sequences=True),
    layers.GRU(64),
    layers.Dense(1, activation='sigmoid'),
])
\`\`\`

### return_sequences=True vs False

\`\`\`
return_sequences=False (défaut) : retourne seulement le dernier état h_T
                                  → classification

return_sequences=True           : retourne h_t pour chaque timestep
                                  → sequence-to-sequence (traduction, étiquetage)
                                  → requis quand il y a un LSTM après
\`\`\``,
        links: [
          { label: 'Understanding LSTM — Colah blog', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/' },
        ],
      },
      {
        title: 'LSTM pour séries temporelles',
        content: `## Appliquer les LSTM aux séries temporelles

### Fenêtrage — transformer une série en dataset supervisé

\`\`\`python
import numpy as np

def create_sequences(data, seq_len=30, horizon=1):
    """
    Transforme une série 1D en (X, y) pour apprentissage supervisé.
    Utilise les 'seq_len' derniers pas pour prédire les 'horizon' prochains.
    """
    X, y = [], []
    for i in range(len(data) - seq_len - horizon + 1):
        X.append(data[i : i + seq_len])
        y.append(data[i + seq_len : i + seq_len + horizon])
    return np.array(X), np.array(y)

# Exemple : prédire la conso énergie T+1 depuis les 30 derniers jours
data = np.random.randn(1000)  # remplacer par vos données
X, y = create_sequences(data, seq_len=30, horizon=1)

print(f"X shape : {X.shape}")  # (970, 30) → 970 séquences de 30 pas
print(f"y shape : {y.shape}")  # (970, 1)
\`\`\`

### Modèle LSTM pour séries temporelles multivariées

\`\`\`python
from tensorflow.keras import layers, models

SEQ_LEN = 30
N_FEATURES = 5  # 5 séries en entrée (température, heure, jour...)

model = models.Sequential([
    layers.LSTM(128, return_sequences=True,
                input_shape=(SEQ_LEN, N_FEATURES)),
    layers.Dropout(0.2),
    layers.LSTM(64, return_sequences=False),
    layers.Dropout(0.2),
    layers.Dense(32, activation='relu'),
    layers.Dense(1),  # prédire 1 valeur (régression)
])

model.compile(optimizer='adam', loss='mse',
              metrics=['mae'])

model.fit(X_train, y_train,
          validation_data=(X_val, y_val),
          epochs=100, batch_size=32,
          callbacks=[tf.keras.callbacks.EarlyStopping(patience=15,
                                                       restore_best_weights=True)])
\`\`\`

### Normalisation — critique pour les séries temporelles

\`\`\`python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()

# FIT UNIQUEMENT sur train (évite le data leakage temporel)
X_train_scaled = scaler.fit_transform(X_train.reshape(-1, N_FEATURES))
X_val_scaled   = scaler.transform(X_val.reshape(-1, N_FEATURES))
X_test_scaled  = scaler.transform(X_test.reshape(-1, N_FEATURES))

X_train_s = X_train_scaled.reshape(-1, SEQ_LEN, N_FEATURES)
X_val_s   = X_val_scaled.reshape(-1, SEQ_LEN, N_FEATURES)
\`\`\`

### Évaluation — métriques temporelles

\`\`\`python
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

y_pred = model.predict(X_test_s)
# Inverser la normalisation
y_pred_real = scaler_y.inverse_transform(y_pred)
y_test_real = scaler_y.inverse_transform(y_test)

mae  = mean_absolute_error(y_test_real, y_pred_real)
rmse = np.sqrt(mean_squared_error(y_test_real, y_pred_real))
mape = np.mean(np.abs((y_test_real - y_pred_real) / y_test_real)) * 100

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"MAPE : {mape:.1f}%")
\`\`\``,
        links: [
          { label: 'Keras LSTM — Time Series tutorial', url: 'https://keras.io/examples/timeseries/timeseries_classification_from_scratch/' },
        ],
      },
    ],
  },

  // ── 408 ────────────────────────────────────────────────────────────────
  {
    id: 408, level: 'Intermédiaire', icon: '🎯', color: 'blue', colorHex: '#3FA7D6',
    title: 'Attention & Transformers',
    desc: "Le mécanisme d'attention, l'architecture Transformer et pourquoi elle a révolutionné le NLP — et maintenant la vision.",
    lessons: [
      {
        title: "Le mécanisme d'attention",
        content: `## Pourquoi l'attention ?

### Le problème des RNN longs

Dans un LSTM, toute l'information d'une longue séquence est compressée dans un **vecteur de taille fixe**. Pour une phrase de 500 mots, le modèle doit tout encoder dans 128 nombres → perte d'information.

### L'intuition de l'attention

> "Pour traduire le mot 'chat' dans cette phrase, le modèle peut se concentrer directement sur les mots pertinents — peu importe leur position dans la séquence."

\`\`\`
Query (ce qu'on cherche) × Key (ce qui est disponible) → Score d'attention
Score (softmax normalisé) × Value (le contenu) → Contexte
\`\`\`

\`\`\`python
import numpy as np

def attention_simple(Q, K, V, d_k):
    """
    Q : Query  (batch, seq, d_k)
    K : Key    (batch, seq, d_k)
    V : Value  (batch, seq, d_v)
    """
    scores = Q @ K.transpose(-2, -1) / np.sqrt(d_k)  # similitude
    weights = softmax(scores, axis=-1)                 # normalisation
    return weights @ V                                  # contexte pondéré

# Chaque mot "vote" pour sa propre importance dans le contexte
\`\`\`

### Self-Attention — chaque mot s'attente à tous les autres

\`\`\`python
import tensorflow as tf

# Keras MultiHeadAttention
mha = tf.keras.layers.MultiHeadAttention(
    num_heads=8,    # 8 têtes d'attention en parallèle
    key_dim=64      # dimension par tête
)

# Exemple : séquence de 10 tokens de dim 512
x = tf.random.normal((1, 10, 512))
out = mha(x, x)  # query=x, key=x, value=x → self-attention
print(out.shape)  # (1, 10, 512)
\`\`\`

### Multi-Head Attention — pourquoi plusieurs têtes ?

Chaque tête peut se concentrer sur **différents types de relations** :
- Tête 1 : relations syntaxiques (sujet-verbe)
- Tête 2 : relations sémantiques (synonymes)
- Tête 3 : coréférences (pronoms)
- ...`,
        links: [
          { label: '"Attention is All You Need" (Vaswani et al., 2017)', url: 'https://arxiv.org/abs/1706.03762' },
          { label: 'The Illustrated Transformer (Jay Alammar)', url: 'http://jalammar.github.io/illustrated-transformer/' },
        ],
      },
      {
        title: "Architecture Transformer",
        content: `## L'architecture Transformer complète

### Vue d'ensemble

\`\`\`
Encoder (comprend le contexte) :
  Input → Embedding + Positional Encoding
        → [Multi-Head Self-Attention → Add & Norm
           Feed-Forward → Add & Norm] × N couches
        → Représentation contextuelle

Decoder (génère la sortie) :
  Target → Embedding + Positional Encoding
          → [Masked Self-Attention → Add & Norm
             Cross-Attention (sur encoder) → Add & Norm
             Feed-Forward → Add & Norm] × N couches
          → Linear + Softmax → Tokens de sortie
\`\`\`

### Positional Encoding — l'ordre dans l'attention

L'attention est invariante à l'ordre → on ajoute un encodage de position.

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def positional_encoding(max_len, d_model):
    PE = np.zeros((max_len, d_model))
    positions = np.arange(max_len)[:, np.newaxis]
    div_term = np.exp(np.arange(0, d_model, 2) * -(np.log(10000) / d_model))

    PE[:, 0::2] = np.sin(positions * div_term)
    PE[:, 1::2] = np.cos(positions * div_term)
    return PE

pe = positional_encoding(50, 128)
plt.figure(figsize=(10, 5))
plt.imshow(pe.T, cmap='RdBu', aspect='auto')
plt.xlabel('Position dans la séquence')
plt.ylabel('Dimension')
plt.colorbar()
plt.title('Positional Encoding')
plt.show()
\`\`\`

### Encoder-only vs Decoder-only vs Encoder-Decoder

| Architecture | Exemples | Tâche |
|---|---|---|
| **Encoder only** | BERT, RoBERTa | Classification, NER, extraction |
| **Decoder only** | GPT, LLaMA, Mistral | Génération de texte |
| **Encoder-Decoder** | T5, BART, mBART | Traduction, résumé |

### Implémenter un Transformer simple avec PyTorch

\`\`\`python
import torch
import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, ff_dim, dropout=0.1):
        super().__init__()
        self.attention = nn.MultiheadAttention(d_model, n_heads, dropout=dropout,
                                               batch_first=True)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.ff = nn.Sequential(
            nn.Linear(d_model, ff_dim), nn.ReLU(),
            nn.Linear(ff_dim, d_model), nn.Dropout(dropout)
        )

    def forward(self, x):
        attn_out, _ = self.attention(x, x, x)
        x = self.norm1(x + attn_out)         # Add & Norm
        x = self.norm2(x + self.ff(x))       # Add & Norm
        return x

# Transformer classifier
class TextClassifier(nn.Module):
    def __init__(self, vocab_size, d_model=128, n_heads=4, n_layers=3, n_classes=2):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.blocks = nn.ModuleList([TransformerBlock(d_model, n_heads, d_model*4)
                                      for _ in range(n_layers)])
        self.pool = lambda x: x.mean(dim=1)  # global average pooling
        self.head = nn.Linear(d_model, n_classes)

    def forward(self, x):
        x = self.embedding(x)
        for block in self.blocks:
            x = block(x)
        return self.head(self.pool(x))
\`\`\``,
        links: [
          { label: 'Andrej Karpathy — Let\'s build GPT (YouTube)', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY' },
        ],
      },
    ],
  },

  // ── 409 ────────────────────────────────────────────────────────────────
  {
    id: 409, level: 'Intermédiaire', icon: '🤗', color: 'blue', colorHex: '#3FA7D6',
    title: 'NLP avec HuggingFace & BERT',
    desc: "HuggingFace Transformers : pipeline, tokenization, fine-tuning de BERT pour la classification, la NER et la génération de texte.",
    lessons: [
      {
        title: 'HuggingFace Transformers — les bases',
        content: `## HuggingFace — Le GitHub des modèles IA

### Pourquoi HuggingFace ?

Entraîner BERT from scratch : **des semaines sur 64 TPUs et 100 000 € de calcul**.

HuggingFace permet de **télécharger et utiliser des modèles pré-entraînés** en 3 lignes :

\`\`\`python
# pip install transformers datasets
from transformers import pipeline

# Analyse de sentiment (zero-shot)
sentiment = pipeline('sentiment-analysis',
                      model='nlptown/bert-base-multilingual-uncased-sentiment')
print(sentiment("Ce produit est excellent, je suis ravi !"))
# [{'label': '5 stars', 'score': 0.91}]

# Résumé automatique
summarizer = pipeline('summarization', model='facebook/bart-large-cnn')

# Classification zero-shot
classifier = pipeline('zero-shot-classification',
                       model='facebook/bart-large-mnli')
print(classifier("Ce film m'a beaucoup ému",
                  candidate_labels=['cinéma', 'sport', 'politique']))
\`\`\`

### La tokenisation

Avant d'entrer dans BERT, le texte est découpé en **tokens** (sous-mots).

\`\`\`python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained('camembert-base')  # BERT français

text = "Le machine learning transforme l'industrie"
tokens = tokenizer(text, return_tensors='pt', padding=True, truncation=True, max_length=128)

print("Tokens IDs :", tokens['input_ids'])
print("Attention mask :", tokens['attention_mask'])
print("Décodé :", tokenizer.decode(tokens['input_ids'][0]))
# [CLS] Le machine learning transforme l'industrie [SEP]
\`\`\`

### Les modèles BERT francophones

\`\`\`python
# CamemBERT — BERT entraîné sur du français (corpus Oscar)
# inria-paris/roberta-large — RoBERTa français
# dbmdz/bert-base-french-europeana-cased — BERT sur corpus historique

from transformers import AutoModel, AutoTokenizer

model_name = 'camembert-base'
tokenizer  = AutoTokenizer.from_pretrained(model_name)
model      = AutoModel.from_pretrained(model_name)

# Obtenir les embeddings contextuels
import torch
inputs = tokenizer("Bonjour, comment ça va ?", return_tensors='pt')
with torch.no_grad():
    outputs = model(**inputs)

embeddings = outputs.last_hidden_state  # (1, seq_len, 768)
cls_embedding = embeddings[:, 0, :]    # [CLS] token = représentation de la phrase
print(f"Embedding shape : {cls_embedding.shape}")  # (1, 768)
\`\`\``,
        links: [
          { label: 'HuggingFace — course NLP gratuit', url: 'https://huggingface.co/learn/nlp-course/' },
          { label: 'CamemBERT — modèle BERT français', url: 'https://huggingface.co/camembert-base' },
        ],
      },
      {
        title: 'Fine-tuning BERT pour la classification',
        content: `## Fine-tuner BERT sur tes données

### Pourquoi fine-tuner ?

BERT pré-entraîné prédit des tokens masqués. Pour la classification, il faut l'adapter à ta tâche en continuant l'entraînement sur tes données étiquetées.

### Pipeline complet de fine-tuning

\`\`\`python
from transformers import (AutoTokenizer, AutoModelForSequenceClassification,
                           Trainer, TrainingArguments)
from datasets import Dataset, DatasetDict
import pandas as pd, numpy as np

# 1. Charger les données
df = pd.read_csv('avis.csv')  # colonnes : 'text', 'label'
df_train, df_val = df[:800], df[800:]

# 2. Créer le dataset HuggingFace
dataset = DatasetDict({
    'train': Dataset.from_pandas(df_train),
    'validation': Dataset.from_pandas(df_val),
})

# 3. Tokeniser
model_name = 'camembert-base'
tokenizer  = AutoTokenizer.from_pretrained(model_name)

def tokenize(batch):
    return tokenizer(batch['text'], truncation=True, max_length=128, padding='max_length')

dataset = dataset.map(tokenize, batched=True)
dataset = dataset.rename_column('label', 'labels')
dataset.set_format('torch', columns=['input_ids', 'attention_mask', 'labels'])
\`\`\`

\`\`\`python
# 4. Charger le modèle pour classification
NUM_LABELS = 2
model = AutoModelForSequenceClassification.from_pretrained(
    model_name, num_labels=NUM_LABELS)

# 5. Configurer l'entraînement
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    learning_rate=2e-5,         # LR très faible pour fine-tuning
    warmup_steps=100,
    weight_decay=0.01,
    evaluation_strategy='epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    metric_for_best_model='f1',
    logging_dir='./logs',
)

# 6. Métriques
from sklearn.metrics import accuracy_score, f1_score

def compute_metrics(pred):
    labels = pred.label_ids
    preds  = pred.predictions.argmax(-1)
    return {
        'accuracy': accuracy_score(labels, preds),
        'f1':       f1_score(labels, preds, average='macro'),
    }

# 7. Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset['train'],
    eval_dataset=dataset['validation'],
    compute_metrics=compute_metrics,
)

trainer.train()
print(trainer.evaluate())
\`\`\`

### Inférence sur de nouvelles données

\`\`\`python
from transformers import pipeline

classifier = pipeline('text-classification',
                       model='./results/best_model',
                       tokenizer=tokenizer)

textes = [
    "Ce service est vraiment exceptionnel !",
    "Je suis très déçu par la qualité.",
]
for t, result in zip(textes, classifier(textes)):
    print(f"{'POSITIF' if result['label']=='LABEL_1' else 'NEGATIF'} ({result['score']:.2%}) — {t}")
\`\`\``,
        links: [
          { label: 'HuggingFace Trainer API', url: 'https://huggingface.co/docs/transformers/main_classes/trainer' },
          { label: 'HuggingFace — Fine-tuning guide', url: 'https://huggingface.co/docs/transformers/training' },
        ],
      },
    ],
  },

  // ── 410 ────────────────────────────────────────────────────────────────
  {
    id: 410, level: 'Avancé', icon: '📈', color: 'purple', colorHex: '#AA7DCE',
    title: 'Séries temporelles avec DL',
    desc: "LSTM, Temporal Convolutional Networks et Transformers temporels pour la prévision de séries univariées et multivariées.",
    lessons: [
      {
        title: 'Prévision multivariée avec LSTM',
        content: `## Séries temporelles multivariées

### Le problème de la prévision

\`\`\`
Entrées (passé) :  T-29, T-28, ..., T-1, T
                    ↓ fenêtre de 30 jours
Sortie (futur)  :  T+1, T+2, ..., T+H
\`\`\`

### Encoder les features temporelles

\`\`\`python
import pandas as pd
import numpy as np

def add_temporal_features(df, date_col='date'):
    df = df.copy()
    df[date_col] = pd.to_datetime(df[date_col])

    # Features cycliques (sin/cos pour capturer la périodicité)
    df['heure_sin'] = np.sin(2 * np.pi * df[date_col].dt.hour / 24)
    df['heure_cos'] = np.cos(2 * np.pi * df[date_col].dt.hour / 24)
    df['mois_sin']  = np.sin(2 * np.pi * df[date_col].dt.month / 12)
    df['mois_cos']  = np.cos(2 * np.pi * df[date_col].dt.month / 12)
    df['dow_sin']   = np.sin(2 * np.pi * df[date_col].dt.dayofweek / 7)
    df['dow_cos']   = np.cos(2 * np.pi * df[date_col].dt.dayofweek / 7)
    df['est_weekend'] = (df[date_col].dt.dayofweek >= 5).astype(float)
    df['est_ferie']   = 0  # à compléter avec un calendrier

    return df
\`\`\`

### Architecture LSTM multivariée

\`\`\`python
import tensorflow as tf
from tensorflow.keras import layers, models

SEQ_LEN    = 48   # fenêtre 48h
HORIZON    = 24   # prédire 24h
N_FEATURES = 8    # conso + features temporelles

def build_lstm_forecaster(seq_len, n_features, horizon):
    inputs = tf.keras.Input(shape=(seq_len, n_features))

    x = layers.LSTM(256, return_sequences=True)(inputs)
    x = layers.Dropout(0.2)(x)
    x = layers.LSTM(128, return_sequences=True)(x)
    x = layers.Dropout(0.2)(x)
    x = layers.LSTM(64, return_sequences=False)(x)
    x = layers.Dense(128, activation='relu')(x)
    x = layers.Dropout(0.2)(x)
    outputs = layers.Dense(horizon)(x)  # prédire plusieurs pas

    return models.Model(inputs, outputs)

model = build_lstm_forecaster(SEQ_LEN, N_FEATURES, HORIZON)
model.compile(optimizer=tf.keras.optimizers.Adam(1e-3), loss='mse', metrics=['mae'])
model.summary()
\`\`\`

### Temporal Convolutional Network (TCN)

Alternative aux LSTM : plus rapide à entraîner, parallélisable.

\`\`\`python
# pip install keras-tcn
from tcn import TCN

model_tcn = models.Sequential([
    TCN(input_shape=(SEQ_LEN, N_FEATURES),
        nb_filters=64,
        kernel_size=3,
        nb_stacks=2,
        dilations=[1, 2, 4, 8, 16],  # champ récepteur exponentiel
        return_sequences=False),
    layers.Dense(64, activation='relu'),
    layers.Dense(HORIZON),
])
\`\`\``,
        links: [
          { label: 'Darts — librairie prévision séries temporelles', url: 'https://unit8co.github.io/darts/' },
        ],
      },
      {
        title: 'Évaluation et backtesting des modèles temporels',
        content: `## Évaluer correctement un modèle temporel

### ⚠️ Ne jamais faire un split aléatoire sur du temporel

\`\`\`python
# ❌ INTERDIT — data leakage temporel
from sklearn.model_selection import train_test_split
X_train, X_test = train_test_split(X)  # mélange passé et futur

# ✅ Toujours respecter l'ordre temporel
split = int(len(X) * 0.8)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]
\`\`\`

### Walk-Forward Validation (backtesting réaliste)

\`\`\`python
import numpy as np
from sklearn.metrics import mean_absolute_error

def walk_forward_validation(X, y, model_builder, n_splits=5):
    """
    Simule l'entraînement et la prédiction dans le temps :
    train sur 1..k, prédire k+1..k+h, puis train sur 1..k+1, etc.
    """
    fold_size = len(X) // (n_splits + 1)
    scores = []

    for i in range(1, n_splits + 1):
        train_end = fold_size * i
        test_end  = min(train_end + fold_size, len(X))

        X_tr, y_tr = X[:train_end], y[:train_end]
        X_te, y_te = X[train_end:test_end], y[train_end:test_end]

        model = model_builder()
        model.fit(X_tr, y_tr, epochs=50, verbose=0,
                  callbacks=[tf.keras.callbacks.EarlyStopping(patience=10)])

        y_pred = model.predict(X_te)
        mae = mean_absolute_error(y_te, y_pred)
        scores.append(mae)
        print(f"  Fold {i}/{n_splits}  MAE={mae:.4f}")

    print(f"\\nMAE moyen : {np.mean(scores):.4f} ± {np.std(scores):.4f}")
    return scores
\`\`\`

### Métriques de prévision

\`\`\`python
import numpy as np

def forecast_metrics(y_true, y_pred):
    mae  = np.mean(np.abs(y_true - y_pred))
    rmse = np.sqrt(np.mean((y_true - y_pred) ** 2))
    # MAPE : éviter division par zéro
    mask = y_true != 0
    mape = np.mean(np.abs((y_true[mask] - y_pred[mask]) / y_true[mask])) * 100
    # sMAPE : plus symétrique
    smape = np.mean(2 * np.abs(y_true - y_pred) / (np.abs(y_true) + np.abs(y_pred))) * 100

    print(f"MAE   : {mae:.4f}")
    print(f"RMSE  : {rmse:.4f}")
    print(f"MAPE  : {mape:.1f}%")
    print(f"sMAPE : {smape:.1f}%")

    return {'mae': mae, 'rmse': rmse, 'mape': mape, 'smape': smape}
\`\`\``,
        links: [
          { label: 'TimeGPT — Forecasting foundation model', url: 'https://nixtlaverse.nixtla.io/nixtla/index.html' },
        ],
      },
    ],
  },

  // ── 411 ────────────────────────────────────────────────────────────────
  {
    id: 411, level: 'Avancé', icon: '🔍', color: 'purple', colorHex: '#AA7DCE',
    title: 'Détection d\'objets',
    desc: "YOLO, bounding boxes, mAP — détecter et localiser des objets dans des images avec les approches modernes.",
    lessons: [
      {
        title: 'Classification vs Détection vs Segmentation',
        content: `## Les tâches de vision par ordinateur

\`\`\`
Classification  : "il y a un chat" → 1 label par image
Détection      : "chat à (x, y, w, h)" → bounding boxes + labels
Segmentation   : "chaque pixel appartient à : chat / fond / voiture..."
\`\`\`

### YOLO — You Only Look Once

YOLO divise l'image en grille et prédit en **un seul passage** (donc très rapide) :

\`\`\`python
# pip install ultralytics
from ultralytics import YOLO

# Charger YOLOv8 pré-entraîné
model = YOLO('yolov8n.pt')  # n=nano, s=small, m=medium, l=large, x=extra

# Inférence sur une image
results = model('image.jpg', conf=0.5)  # confidence threshold

# Afficher les résultats
for r in results:
    print(r.boxes.xyxy)   # bounding boxes [x1, y1, x2, y2]
    print(r.boxes.conf)   # confiances
    print(r.boxes.cls)    # classes
    r.show()              # visualisation
    r.save('output.jpg')  # sauvegarder
\`\`\`

### Les métriques de détection

\`\`\`
IoU (Intersection over Union) :
  IoU = Aire(prédiction ∩ vérité) / Aire(prédiction ∪ vérité)
  IoU > 0.5 → détection correcte (standard)

Precision@IoU : fraction des détections correctes
Recall@IoU    : fraction des vrais objets détectés
mAP (mean Average Precision) : AUC de la courbe Precision-Recall, moyennée sur les classes
  mAP@0.5       : IoU threshold = 0.5
  mAP@0.5:0.95  : moyenne sur IoU de 0.5 à 0.95 (plus exigeant)
\`\`\`

\`\`\`python
# Évaluer un modèle YOLO sur un dataset
model = YOLO('yolov8n.pt')
metrics = model.val(data='coco128.yaml')  # dataset YAML

print(f"mAP@50   : {metrics.box.map50:.3f}")
print(f"mAP@50-95: {metrics.box.map:.3f}")
print(f"Precision: {metrics.box.p:.3f}")
print(f"Recall   : {metrics.box.r:.3f}")
\`\`\``,
        links: [
          { label: 'Ultralytics YOLO — documentation', url: 'https://docs.ultralytics.com/' },
        ],
      },
      {
        title: "Fine-tuner YOLO sur un dataset personnalisé",
        content: `## Entraîner YOLO sur ses propres données

### Format des données YOLO

Chaque image a un fichier .txt associé avec une ligne par objet :

\`\`\`
# format : class_id cx cy w h (normalisés entre 0 et 1)
0 0.5 0.3 0.2 0.4    # objet de classe 0, centré en (50%, 30%), taille 20%×40%
1 0.8 0.7 0.1 0.15   # objet de classe 1
\`\`\`

### Créer le fichier de configuration

\`\`\`yaml
# dataset.yaml
path: /data/mon_dataset
train: images/train
val:   images/val

nc: 3  # nombre de classes
names: ['personne', 'voiture', 'velo']
\`\`\`

### Annoter avec Label Studio

\`\`\`bash
pip install label-studio
label-studio  # ouvre http://localhost:8080
# Exporter en format YOLO
\`\`\`

### Entraîner

\`\`\`python
from ultralytics import YOLO

# Partir d'un modèle pré-entraîné
model = YOLO('yolov8s.pt')  # small model = bon compromis

results = model.train(
    data='dataset.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    lr0=0.01,
    lrf=0.01,
    momentum=0.937,
    weight_decay=5e-4,
    warmup_epochs=3,
    augment=True,      # data augmentation automatique
    device='cuda',     # GPU si disponible, sinon 'cpu'
    project='runs',
    name='exp1',
    patience=20,       # early stopping
)

print(f"mAP@50 : {results.results_dict['metrics/mAP50(B)']:.3f}")

# Inférence
trained_model = YOLO('runs/exp1/weights/best.pt')
trained_model('test_images/', save=True)
\`\`\`

### Évaluer et interpréter

\`\`\`python
# Valider sur le test set
metrics = trained_model.val()
metrics.box.maps  # mAP par classe
\`\`\``,
        links: [
          { label: 'Label Studio — annotation tool', url: 'https://labelstud.io/' },
          { label: 'Roboflow — datasets YOLO annotés', url: 'https://roboflow.com/datasets' },
        ],
      },
    ],
  },

  // ── 412 ────────────────────────────────────────────────────────────────
  {
    id: 412, level: 'Avancé', icon: '🎨', color: 'purple', colorHex: '#AA7DCE',
    title: 'GANs & Modèles génératifs',
    desc: "Generative Adversarial Networks, Variational Autoencoders et diffusion models — comment les réseaux apprennent à générer de nouvelles données.",
    lessons: [
      {
        title: "Architecture des GANs",
        content: `## Les GANs — Deux réseaux en compétition

### L'intuition : faussaire vs expert

\`\`\`
Générateur (G) :  crée des données fausses à partir de bruit
Discriminateur (D) : distingue vraies données de fausses données

Entraînement :
  G veut tromper D → améliore ses faux
  D veut détecter G → améliore sa discrimination
  → équilibre de Nash : G génère des données indiscernables du réel
\`\`\`

### Formule mathématique

\`\`\`
min_G max_D V(D, G) = E[log D(x)] + E[log(1 - D(G(z)))]
\`\`\`

- D(x) = probabilité que x soit réel (on veut → 1 pour les vrais)
- D(G(z)) = probabilité que la génération soit réelle (on veut → 0)
- G(z) = image générée depuis le bruit z

### DCGAN — Deep Convolutional GAN

\`\`\`python
import torch
import torch.nn as nn

# Générateur : bruit → image
class Generator(nn.Module):
    def __init__(self, z_dim=100, channels=3, features=64):
        super().__init__()
        self.net = nn.Sequential(
            # (z_dim, 1, 1) → (features*8, 4, 4)
            self._block(z_dim,      features*8, 4, 1, 0),
            self._block(features*8, features*4, 4, 2, 1),
            self._block(features*4, features*2, 4, 2, 1),
            self._block(features*2, features,   4, 2, 1),
            # → image finale 64×64
            nn.ConvTranspose2d(features, channels, 4, 2, 1),
            nn.Tanh(),  # sortie [-1, 1]
        )

    def _block(self, in_c, out_c, k, s, p):
        return nn.Sequential(
            nn.ConvTranspose2d(in_c, out_c, k, s, p, bias=False),
            nn.BatchNorm2d(out_c),
            nn.ReLU(),
        )

    def forward(self, z):
        return self.net(z)

# Discriminateur : image → proba réelle/fausse
class Discriminator(nn.Module):
    def __init__(self, channels=3, features=64):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(channels, features, 4, 2, 1),
            nn.LeakyReLU(0.2),
            self._block(features,   features*2, 4, 2, 1),
            self._block(features*2, features*4, 4, 2, 1),
            self._block(features*4, features*8, 4, 2, 1),
            nn.Conv2d(features*8, 1, 4, 1, 0),
            nn.Sigmoid(),
        )

    def _block(self, in_c, out_c, k, s, p):
        return nn.Sequential(
            nn.Conv2d(in_c, out_c, k, s, p, bias=False),
            nn.BatchNorm2d(out_c), nn.LeakyReLU(0.2)
        )

    def forward(self, x):
        return self.net(x)
\`\`\``,
        links: [
          { label: 'GAN — Original paper (Goodfellow, 2014)', url: 'https://arxiv.org/abs/1406.2661' },
          { label: 'DCGAN paper', url: 'https://arxiv.org/abs/1511.06434' },
        ],
      },
      {
        title: 'Entraîner un GAN et Stable Diffusion',
        content: `## Entraînement d'un GAN

### Boucle d'entraînement GAN

\`\`\`python
import torch
import torch.optim as optim

DEVICE  = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
Z_DIM   = 100
LR      = 2e-4

gen   = Generator(z_dim=Z_DIM).to(DEVICE)
disc  = Discriminator().to(DEVICE)
opt_g = optim.Adam(gen.parameters(),  lr=LR, betas=(0.5, 0.999))
opt_d = optim.Adam(disc.parameters(), lr=LR, betas=(0.5, 0.999))
criterion = nn.BCELoss()

for epoch in range(NUM_EPOCHS):
    for real, _ in dataloader:
        real = real.to(DEVICE)
        B    = real.size(0)

        # ── Entraîner le Discriminateur ──
        noise  = torch.randn(B, Z_DIM, 1, 1).to(DEVICE)
        fake   = gen(noise).detach()  # pas de gradient pour G

        d_real = disc(real)
        d_fake = disc(fake)
        loss_d = (criterion(d_real, torch.ones_like(d_real)) +
                  criterion(d_fake, torch.zeros_like(d_fake))) / 2

        opt_d.zero_grad()
        loss_d.backward()
        opt_d.step()

        # ── Entraîner le Générateur ──
        noise = torch.randn(B, Z_DIM, 1, 1).to(DEVICE)
        fake  = gen(noise)
        g_out = disc(fake)
        loss_g = criterion(g_out, torch.ones_like(g_out))  # tromper D

        opt_g.zero_grad()
        loss_g.backward()
        opt_g.step()

    print(f"Epoch {epoch} | Loss D: {loss_d:.4f} | Loss G: {loss_g:.4f}")
\`\`\`

### Stable Diffusion — la révolution

Les diffusion models (DALL-E, Stable Diffusion, Midjourney) ont supplanté les GANs pour la génération d'images.

\`\`\`python
# pip install diffusers
from diffusers import StableDiffusionPipeline
import torch

# Utiliser Stable Diffusion (requiert ~5 GB GPU)
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

image = pipe(
    "A photorealistic French Riviera sunset, professional photography",
    num_inference_steps=50,
    guidance_scale=7.5,
).images[0]

image.save("generation.png")
\`\`\`

### Le principe des diffusion models

\`\`\`
Entraînement : image → ajouter bruit progressivement → apprendre à débruiter
Génération   : bruit pur → débruitage itératif guidé par un prompt → image
\`\`\``,
        links: [
          { label: 'HuggingFace Diffusers — documentation', url: 'https://huggingface.co/docs/diffusers/' },
          { label: 'Stable Diffusion — CompVis (paper)', url: 'https://arxiv.org/abs/2112.10752' },
        ],
      },
    ],
  },

  // ── 413 ────────────────────────────────────────────────────────────────
  {
    id: 413, level: 'Avancé', icon: '🚀', color: 'purple', colorHex: '#AA7DCE',
    title: 'Déployer un modèle Deep Learning',
    desc: "ONNX, TorchScript, FastAPI, TFLite — exporter et servir un modèle DL en production sur CPU, GPU ou mobile.",
    lessons: [
      {
        title: 'ONNX et export de modèle',
        content: `## Déployer sans dépendance au framework

### Le problème

Entraîné en PyTorch → serveur de production utilise TensorFlow → impossible sans conversion.

**ONNX (Open Neural Network Exchange)** : format universel pour exporter un modèle entre frameworks.

### Exporter en ONNX depuis PyTorch

\`\`\`python
import torch
import torch.onnx

# Modèle entraîné
model.eval()

# Exemple d'entrée (même shape que les vraies données)
dummy_input = torch.randn(1, 3, 224, 224)  # batch=1, RGB, 224×224

# Export
torch.onnx.export(
    model,
    dummy_input,
    'model.onnx',
    input_names=['image'],
    output_names=['logits'],
    dynamic_axes={'image': {0: 'batch_size'}},  # batch dynamique
    opset_version=17,
)
print("Modèle exporté : model.onnx")
\`\`\`

### Inférence avec ONNX Runtime

\`\`\`python
# pip install onnxruntime  (CPU)
# pip install onnxruntime-gpu  (GPU)
import onnxruntime as ort
import numpy as np

# Charger et créer la session (optimise le graphe automatiquement)
session = ort.InferenceSession('model.onnx',
                                providers=['CUDAExecutionProvider',
                                           'CPUExecutionProvider'])

# Inférence
input_name = session.get_inputs()[0].name
image_np   = np.random.randn(1, 3, 224, 224).astype(np.float32)
outputs    = session.run(None, {input_name: image_np})

print("Prédiction :", outputs[0].argmax(axis=1))
\`\`\`

**Pourquoi ONNX Runtime ?**
- **2-5× plus rapide** que PyTorch en inférence CPU
- Optimise automatiquement le graphe (fusion d'opérations, quantization)
- Compatible TensorRT pour GPU NVIDIA

### TorchScript — alternative tout-PyTorch

\`\`\`python
# TorchScript : compiler le modèle en bytecode indépendant de Python
scripted = torch.jit.script(model)
scripted.save('model_scripted.pt')

# Charger sans le code Python du modèle
loaded = torch.jit.load('model_scripted.pt')
output = loaded(input_tensor)
\`\`\``,
        links: [
          { label: 'ONNX Runtime — documentation', url: 'https://onnxruntime.ai/' },
          { label: 'TorchScript — PyTorch guide', url: 'https://pytorch.org/docs/stable/jit.html' },
        ],
      },
      {
        title: 'API FastAPI + Docker pour DL',
        content: `## Servir un modèle DL avec FastAPI

### Structure du projet

\`\`\`
dl_api/
  ├── Dockerfile
  ├── requirements.txt
  ├── model.onnx          ← modèle exporté
  └── main.py             ← API FastAPI
\`\`\`

### main.py — API de prédiction image

\`\`\`python
from fastapi import FastAPI, File, UploadFile, HTTPException
from PIL import Image
import onnxruntime as ort
import numpy as np, io

app = FastAPI(title="Image Classification API", version="1.0")
session = ort.InferenceSession("model.onnx")
CLASSES = ['cat', 'dog', 'bird']  # adapter à ton problème

def preprocess(image: Image.Image) -> np.ndarray:
    image = image.resize((224, 224)).convert('RGB')
    img   = np.array(image, dtype=np.float32) / 255.0
    # Normalisation ImageNet
    mean  = np.array([0.485, 0.456, 0.406])
    std   = np.array([0.229, 0.224, 0.225])
    img   = (img - mean) / std
    return img.transpose(2, 0, 1)[np.newaxis]  # (1, 3, H, W)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "Fichier image requis (jpg/png)")

    contents = await file.read()
    image    = Image.open(io.BytesIO(contents))
    tensor   = preprocess(image)

    input_name = session.get_inputs()[0].name
    logits     = session.run(None, {input_name: tensor})[0]
    probs      = np.exp(logits) / np.exp(logits).sum(axis=1, keepdims=True)
    pred_idx   = probs.argmax(axis=1)[0]

    return {
        "label": CLASSES[pred_idx],
        "confidence": float(probs[0, pred_idx]),
        "all_classes": {c: float(p) for c, p in zip(CLASSES, probs[0])}
    }
\`\`\`

### Dockerfile

\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY model.onnx .
COPY main.py .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

### requirements.txt

\`\`\`
fastapi
uvicorn[standard]
onnxruntime
pillow
numpy
\`\`\`

### Lancer et tester

\`\`\`bash
# Lancer l'API
uvicorn main:app --reload --port 8000

# Ou avec Docker
docker build -t dl-api .
docker run -p 8000:8000 dl-api

# Tester
curl -X POST http://localhost:8000/predict \\
     -F "file=@photo_chat.jpg"
\`\`\``,
        links: [
          { label: 'FastAPI — documentation officielle', url: 'https://fastapi.tiangolo.com/' },
          { label: 'ONNX Runtime — FastAPI example', url: 'https://onnxruntime.ai/docs/tutorials/web/deploy-on-web.html' },
        ],
      },
    ],
  },

  // ── 414 ────────────────────────────────────────────────────────────────
  {
    id: 414, level: 'Expert', icon: '⚡', color: 'orange', colorHex: '#F3752B',
    title: 'Optimiser l\'inférence',
    desc: "Quantization, pruning, distillation de connaissances, mixed precision — rendre les modèles DL plus rapides et légers sans perdre de précision.",
    lessons: [
      {
        title: 'Quantization et Pruning',
        content: `## Rendre les modèles plus rapides et légers

### Pourquoi optimiser ?

Un ResNet-50 :
- Poids : **97 MB** (float32)
- Après quantization int8 : **24 MB** (4× moins)
- Latence CPU : **120 ms** → après quantization : **35 ms** (3× plus rapide)

### Quantization — Réduire la précision des poids

\`\`\`python
import torch
from torch.quantization import quantize_dynamic

# Quantization dynamique (int8) — post-training, pas de données requises
model_int8 = quantize_dynamic(
    model,
    {torch.nn.Linear, torch.nn.LSTM},  # couches à quantiser
    dtype=torch.qint8
)

# Comparer la taille
import os
torch.save(model.state_dict(), 'model_fp32.pt')
torch.save(model_int8.state_dict(), 'model_int8.pt')
print(f"FP32 : {os.path.getsize('model_fp32.pt') / 1e6:.1f} MB")
print(f"INT8 : {os.path.getsize('model_int8.pt') / 1e6:.1f} MB")

# Quantization statique (meilleure performance, nécessite un dataset de calibration)
from torch.quantization import prepare, convert

model.eval()
model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
model_prepared = prepare(model)

# Calibration sur quelques batches
for data, _ in calibration_loader:
    model_prepared(data)

model_quantized = convert(model_prepared)
\`\`\`

### Pruning — Supprimer les poids peu importants

\`\`\`python
import torch.nn.utils.prune as prune

# Pruning global (retire 50% des connexions les moins importantes)
parameters_to_prune = [
    (module, 'weight')
    for module in model.modules()
    if isinstance(module, torch.nn.Linear)
]

prune.global_unstructured(
    parameters_to_prune,
    pruning_method=prune.L1Unstructured,
    amount=0.5,  # retirer 50% des poids
)

# Rendre le pruning permanent
for module, _ in parameters_to_prune:
    prune.remove(module, 'weight')

# Vérifier la sparsité
total  = sum(p.numel() for p in model.parameters())
zeros  = sum((p == 0).sum() for p in model.parameters())
print(f"Sparsité : {100 * zeros / total:.1f}%")
\`\`\``,
        links: [
          { label: 'PyTorch — Quantization tutorial', url: 'https://pytorch.org/docs/stable/quantization.html' },
          { label: 'PyTorch — Pruning tutorial', url: 'https://pytorch.org/tutorials/intermediate/pruning_tutorial.html' },
        ],
      },
      {
        title: 'Mixed Precision et Knowledge Distillation',
        content: `## Mixed Precision Training — fp16 sur GPU

Utiliser **float16 au lieu de float32** pour les calculs intermédiaires :
- 2× moins de VRAM
- 1.5–3× plus rapide sur GPU NVIDIA (Tensor Cores)

\`\`\`python
import torch
from torch.cuda.amp import autocast, GradScaler

model     = MyModel().cuda()
optimizer = torch.optim.Adam(model.parameters())
scaler    = GradScaler()  # évite les underflows fp16

for batch, labels in dataloader:
    batch, labels = batch.cuda(), labels.cuda()

    with autocast():  # calculs en fp16 automatiquement
        output = model(batch)
        loss   = criterion(output, labels)

    scaler.scale(loss).backward()  # gradient en fp32
    scaler.step(optimizer)
    scaler.update()
    optimizer.zero_grad()
\`\`\`

### Knowledge Distillation — un grand modèle enseigne un petit

\`\`\`
Teacher (grand modèle précis) → enseigne → Student (petit modèle rapide)

Au lieu d'apprendre sur les labels durs (0/1),
le student apprend sur les "soft labels" du teacher (probabilités).

Soft labels = beaucoup plus d'info : "90% chat, 8% renard, 2% loup"
vs Hard label = "chat"
\`\`\`

\`\`\`python
import torch.nn.functional as F

def distillation_loss(student_logits, teacher_logits, labels,
                       temperature=4.0, alpha=0.7):
    """
    alpha     : poids de la distillation (vs cross-entropy classique)
    temperature : "adoucit" les prédictions du teacher (T > 1 = plus mou)
    """
    # Loss de distillation (KL divergence avec soft labels)
    soft_student = F.log_softmax(student_logits / temperature, dim=-1)
    soft_teacher = F.softmax(teacher_logits    / temperature, dim=-1)
    distill_loss = F.kl_div(soft_student, soft_teacher, reduction='batchmean')
    distill_loss *= temperature ** 2  # gradient scaling

    # Loss classique
    ce_loss = F.cross_entropy(student_logits, labels)

    return alpha * distill_loss + (1 - alpha) * ce_loss

# Boucle d'entraînement avec distillation
teacher.eval()
for batch, labels in dataloader:
    with torch.no_grad():
        teacher_logits = teacher(batch)  # predictions du grand modèle

    student_logits = student(batch)
    loss = distillation_loss(student_logits, teacher_logits, labels)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
\`\`\``,
        links: [
          { label: 'Knowledge Distillation (Hinton et al.)', url: 'https://arxiv.org/abs/1503.02531' },
          { label: 'PyTorch AMP — documentation', url: 'https://pytorch.org/docs/stable/amp.html' },
        ],
      },
    ],
  },

  // ── 415 ────────────────────────────────────────────────────────────────
  {
    id: 415, level: 'Expert', icon: '📊', color: 'orange', colorHex: '#F3752B',
    title: 'MLOps DL — W&B & Reproductibilité',
    desc: "Weights & Biases, DVC, gestion des expériences GPU, model registry — industrialiser ses projets Deep Learning.",
    lessons: [
      {
        title: 'Weights & Biases (W&B)',
        content: `## W&B — Le tracker d'expériences pour le DL

W&B est à PyTorch ce que MLflow est à scikit-learn — mais avec des capacités bien plus riches pour le DL (visualisation des gradients, sample des prédictions, sweeps d'hyperparamètres).

### Installation et setup

\`\`\`bash
pip install wandb
wandb login  # se connecter avec son compte wandb.ai (gratuit)
\`\`\`

### Logger un run d'entraînement

\`\`\`python
import wandb
import torch

# Démarrer un run
wandb.init(
    project="classification-radiologie",
    name="resnet50-aug-v2",
    config={
        "architecture":  "resnet50",
        "learning_rate": 1e-4,
        "epochs":        50,
        "batch_size":    32,
        "augmentation":  True,
        "dropout":       0.3,
    }
)

model     = build_model('resnet50', num_classes=5)
optimizer = torch.optim.Adam(model.parameters(), lr=wandb.config.learning_rate)

for epoch in range(wandb.config.epochs):
    train_loss, train_acc = train_one_epoch(model, train_loader, optimizer)
    val_loss,   val_acc   = evaluate(model, val_loader)

    # Logger les métriques
    wandb.log({
        "epoch":      epoch,
        "train/loss": train_loss,
        "train/acc":  train_acc,
        "val/loss":   val_loss,
        "val/acc":    val_acc,
        "lr":         optimizer.param_groups[0]['lr'],
    })

    # Sauvegarder le meilleur modèle
    if val_acc > best_val_acc:
        torch.save(model.state_dict(), "best_model.pt")
        wandb.save("best_model.pt")

wandb.finish()
\`\`\`

### Visualiser les prédictions

\`\`\`python
# Logger des exemples de prédictions (images + labels)
def log_predictions(model, loader, n=16):
    model.eval()
    images, preds, labels = [], [], []

    with torch.no_grad():
        for x, y in loader:
            out = model(x[:n])
            preds.extend(out.argmax(1).cpu().numpy())
            labels.extend(y[:n].numpy())
            images.extend([wandb.Image(img) for img in x[:n]])
            break

    wandb.log({"predictions": [
        wandb.Image(img, caption=f"Pred: {CLASS_NAMES[p]} | True: {CLASS_NAMES[l]}")
        for img, p, l in zip(images, preds, labels)
    ]})

log_predictions(model, val_loader)
\`\`\``,
        links: [
          { label: 'Weights & Biases — documentation', url: 'https://docs.wandb.ai/' },
          { label: 'W&B — PyTorch tutorial', url: 'https://docs.wandb.ai/tutorials/pytorch' },
        ],
      },
      {
        title: 'Hyperparameter Sweeps et Model Registry',
        content: `## W&B Sweeps — Optimisation automatique des hyperparamètres

### Définir l'espace de recherche

\`\`\`python
import wandb

sweep_config = {
    'method': 'bayes',  # 'grid', 'random', ou 'bayes' (recommandé)
    'metric': {'name': 'val/acc', 'goal': 'maximize'},
    'parameters': {
        'learning_rate': {'distribution': 'log_uniform_values', 'min': 1e-5, 'max': 1e-2},
        'batch_size':    {'values': [16, 32, 64]},
        'dropout':       {'distribution': 'uniform', 'min': 0.1, 'max': 0.5},
        'architecture':  {'values': ['resnet50', 'efficientnet_b0', 'vit_b16']},
        'augmentation':  {'values': [True, False]},
    }
}

sweep_id = wandb.sweep(sweep_config, project="classification-radiologie")

def train_with_sweep():
    wandb.init()
    config = wandb.config

    model = build_model(config.architecture, num_classes=5, dropout=config.dropout)
    opt   = torch.optim.Adam(model.parameters(), lr=config.learning_rate)

    for epoch in range(30):
        loss, acc = train_one_epoch(model, train_loader, opt, config.batch_size)
        val_loss, val_acc = evaluate(model, val_loader)
        wandb.log({"val/acc": val_acc, "val/loss": val_loss})

# Lancer 20 trials d'optimisation bayésienne
wandb.agent(sweep_id, function=train_with_sweep, count=20)
\`\`\`

### Model Registry — Versionner ses modèles

\`\`\`python
# Enregistrer un modèle dans le registry W&B
with wandb.init(project="classification-radiologie") as run:
    artifact = wandb.Artifact(
        name='radiologie-classifier',
        type='model',
        description='EfficientNetB0 fine-tuné, val_acc=0.94',
        metadata={'val_acc': 0.94, 'architecture': 'efficientnet_b0'},
    )
    artifact.add_file('best_model.pt')
    artifact.add_file('model.onnx')
    run.log_artifact(artifact)

# Télécharger un modèle du registry en production
artifact = run.use_artifact('radiologie-classifier:latest', type='model')
artifact_dir = artifact.download()
model = torch.load(f"{artifact_dir}/best_model.pt")
\`\`\`

### DVC — Versionner les datasets

\`\`\`bash
pip install dvc dvc-gdrive  # ou dvc-s3, dvc-azure

# Initialiser DVC dans le projet
dvc init

# Tracker un dataset volumineux
dvc add data/images/  # ajoute data/images.dvc
git add data/images.dvc .dvcignore
git commit -m "feat: track dataset v1"

# Pousser sur un remote (GDrive, S3, Azure...)
dvc remote add myremote gdrive://XXXXX
dvc push

# Revenir à une version précédente du dataset
git checkout v0.1
dvc pull
\`\`\``,
        links: [
          { label: 'W&B Sweeps — guide', url: 'https://docs.wandb.ai/guides/sweeps' },
          { label: 'DVC — documentation', url: 'https://dvc.org/doc' },
        ],
      },
    ],
  },
];

export default DL_MODULES;
