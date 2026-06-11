## Vector Databases

### Pourquoi une DB vectorielle ?

![HNSW — Hierarchical Navigable Small World index (Qdrant)](https://qdrant.tech/articles_data/filtrable-hnsw/hnsw-graph.png) _HNSW : graphe hiérarchique permettant une recherche approximative en O(log n) au lieu de O(n) pour la recherche exacte_

### Chroma — local, simple, idéal pour le dev

```python
import chromadb
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

ef = SentenceTransformerEmbeddingFunction("BAAI/bge-m3")
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection("documind", embedding_function=ef)

# Indexer des documents
collection.add(
    ids=["doc1", "doc2", "doc3"],
    documents=[
        "La politique RGPD de l'entreprise...",
        "Le guide d'onboarding des nouveaux employés...",
        "Les procédures de remboursement de frais...",
    ],
    metadatas=[
        {"source": "rgpd.pdf", "page": 1},
        {"source": "onboarding.pdf", "page": 3},
        {"source": "rh_frais.pdf", "page": 1},
    ]
)

# Requête sémantique
results = collection.query(
    query_texts=["Comment se faire rembourser mes frais de déplacement ?"],
    n_results=3,
    where={"source": {"$in": ["rh_frais.pdf", "onboarding.pdf"]}}  # filtre metadata
)
for doc, dist in zip(results["documents"][0], results["distances"][0]):
    print(f"Score: {1-dist:.3f} | {doc[:80]}...")
```

### Qdrant — production, filtres avancés

```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(url="http://localhost:6333")

# Créer la collection
client.create_collection("documind", vectors_config=VectorParams(size=1024, distance=Distance.COSINE))

# Upsert des vecteurs
client.upsert("documind", points=[
    PointStruct(id=1, vector=vecteur.tolist(), payload={"texte": "...", "source": "doc.pdf"})
])

# Recherche avec filtre
results = client.search("documind", query_vector=vecteur_requete.tolist(),
                        limit=5, with_payload=True)
```

### pgvector — PostgreSQL avec support vecteur

```sql
-- Extension
CREATE EXTENSION vector;

-- Table
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  contenu TEXT,
  source VARCHAR(255),
  embedding vector(1024)
);

-- Index HNSW pour les recherches rapides
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Recherche des 5 plus similaires
SELECT contenu, source, 1 - (embedding <=> '[0.1, 0.2, ...]'::vector) AS score
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```
