## RAG (Retrieval-Augmented Generation)

### Le problème que RAG résout

Un LLM :
- ❌ Ne connaît pas vos documents internes
- ❌ Peut halluciner des faits
- ❌ Contexte limité (ne peut pas "avaler" 10 000 documents)

RAG résout ça en **récupérant les documents pertinents** avant de générer.

### Architecture RAG

![Pipeline RAG complet — Indexation et Requête (LangChain)](https://python.langchain.com/assets/images/rag_indexing-8160f90a90a33253d0154659cf7d453f.png) _Phase 1 (offline) : ingestion → chunking → embedding → vectorstore. Phase 2 (online) : question → retrieval → prompt augmenté → LLM → réponse_

### 1. Ingestion & Chunking

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader

# Charger les PDFs
loader = DirectoryLoader("docs/", glob="**/*.pdf", loader_cls=PyPDFLoader)
documents = loader.load()

# Découper en chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,       # ~200 tokens
    chunk_overlap=100,    # chevauchement pour éviter de couper des idées
    separators=["\n\n", "\n", ". ", " "],
)
chunks = splitter.split_documents(documents)
print(f"{len(documents)} docs → {len(chunks)} chunks")
```

### 2. Indexation

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = Chroma.from_documents(chunks, embedding_model, persist_directory="./db")
```

### 3. Pipeline RAG complet

```python
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

prompt = PromptTemplate.from_template("""
Tu es DocuMind, un assistant qui répond aux questions sur les documents de l'entreprise.
Utilise UNIQUEMENT le contexte fourni. Si la réponse n'est pas dans le contexte, dis-le.

Contexte:
{context}

Question: {question}

Réponse (avec citations [source: fichier, page]):
""")

chain = RetrievalQA.from_chain_type(
    llm=llm, retriever=retriever,
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True
)

result = chain.invoke({"query": "Comment se faire rembourser ses frais ?"})
print(result["result"])
for doc in result["source_documents"]:
    print(f"  ↳ {doc.metadata['source']}, p.{doc.metadata.get('page')}")
```
