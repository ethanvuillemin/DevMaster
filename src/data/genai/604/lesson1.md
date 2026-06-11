## Embeddings

> **Note** : Le module DL 408 a introduit l'attention. Ici on va plus loin : les embeddings produits par des encodeurs comme BERT servent de représentation sémantique dense pour la recherche.

### Qu'est-ce qu'un embedding ?

Un embedding transforme du texte (phrase, paragraph, document) en un vecteur de haute dimension (768D, 1536D…) tel que des textes **sémantiquement proches** ont des vecteurs **proches** dans l'espace.

```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("BAAI/bge-m3")  # multilingue, très bon

phrases = [
    "Le chat dort sur le canapé.",
    "Un félin est allongé sur le sofa.",
    "La voiture roule sur l'autoroute.",
]

embeddings = model.encode(phrases)
print(embeddings.shape)   # (3, 1024)
```

### Similarité cosinus

```python
from sklearn.metrics.pairwise import cosine_similarity

sim = cosine_similarity(embeddings)
print(sim[0, 1])   # ~0.92 (chat/félin — très similaires)
print(sim[0, 2])   # ~0.35 (chat/voiture — peu similaires)
```

### API Embeddings OpenAI

```python
from openai import OpenAI
import numpy as np

client = OpenAI()

def embed(textes: list[str]) -> np.ndarray:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=textes
    )
    return np.array([d.embedding for d in response.data])

vecteurs = embed(["Document important sur la RGPD"])
print(vecteurs.shape)   # (1, 1536)
```

### Dense vs Sparse retrieval

| | Dense (embeddings) | Sparse (BM25, TF-IDF) |
|---|---|---|
| Représentation | vecteur continu | sac de mots pondérés |
| Force | similarité sémantique | correspondance exacte de termes |
| Faiblesse | peut rater termes exacts | pas de synonymes |
| Meilleur pour | questions ouvertes | codes produit, noms propres |

→ **Hybrid search** = combiner les deux (score final = α×dense + (1-α)×sparse)
