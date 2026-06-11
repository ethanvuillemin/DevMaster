## RAG Avancé

### Problèmes du RAG naïf

1. **Pertinence imparfaite** — les embeddings ne capturent pas tout
2. **Chunks trop petits** — perdent le contexte
3. **Mots-clés manqués** — "SKU-4829" ne se retrouve pas par similarité

### Reranking — 2ème passe plus précise

```python
from sentence_transformers import CrossEncoder

# Cross-encoder : compare (requête, document) paire par paire
# Plus lent que bi-encoder (embeddings) mais plus précis
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

query = "procédures de remboursement de frais"
candidats = retriever.get_relevant_documents(query, k=20)  # large pool

# Scorer chaque candidat
scores = reranker.predict([(query, doc.page_content) for doc in candidats])
ranked = sorted(zip(scores, candidats), reverse=True)[:5]  # top 5
```

### HyDE (Hypothetical Document Embedding)

```python
# Principe : générer une réponse hypothétique, l'encoder, chercher des docs similaires

hyde_prompt = f"Écris un document qui répondrait parfaitement à : '{query}'"
hypothetical_doc = llm.invoke(hyde_prompt).content

# Encoder le document hypothétique et chercher
hyde_vecteur = embed(hypothetical_doc)
resultats = vectorstore.similarity_search_by_vector(hyde_vecteur, k=4)
```

### Hybrid Search (Dense + Sparse)

```python
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

# BM25 — retrieval par mots-clés (sparse)
bm25_retriever = BM25Retriever.from_documents(chunks)
bm25_retriever.k = 4

# Dense retriever
dense_retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# Fusion (Reciprocal Rank Fusion par défaut)
ensemble = EnsembleRetriever(
    retrievers=[bm25_retriever, dense_retriever],
    weights=[0.4, 0.6]  # pondération sparse / dense
)
```

### Parent-Child Chunking

```python
# Problème : petits chunks → bon retrieval, mauvais contexte
# Solution : indexer des petits chunks, retourner le parent (grand chunk)

from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore

child_splitter = RecursiveCharacterTextSplitter(chunk_size=200)
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)

retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=InMemoryStore(),
    child_splitter=child_splitter,
    parent_splitter=parent_splitter,
)
retriever.add_documents(documents)
# → indexe des petits chunks, mais retourne les gros parents
```
