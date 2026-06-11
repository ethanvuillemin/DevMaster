## LangChain

LangChain fournit des abstractions pour composer des LLMs avec des outils, de la mémoire et des sources de données.

### LCEL — LangChain Expression Language

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser

llm = ChatOpenAI(model="gpt-4o-mini")

# Chaîne simple avec pipe |
prompt = ChatPromptTemplate.from_messages([
    ("system", "Tu es un assistant expert."),
    ("user", "{question}")
])

chain = prompt | llm | StrOutputParser()
result = chain.invoke({"question": "Qu'est-ce que RAG ?"})
```

### Mémoire conversationnelle

```python
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain

memory = ConversationBufferWindowMemory(k=5)  # garde les 5 derniers tours

conversation = ConversationChain(llm=llm, memory=memory, verbose=True)
conversation.predict(input="Bonjour, je suis Alice.")
conversation.predict(input="Comment je m'appelle ?")  # Se souvient !
```

### LlamaIndex — optimisé pour les documents

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# Charger et indexer en une ligne
documents = SimpleDirectoryReader("docs/").load_data()
index = VectorStoreIndex.from_documents(documents)

# Query engine avec citations automatiques
query_engine = index.as_query_engine(similarity_top_k=4)
response = query_engine.query("Quelle est la politique de congés ?")

print(response.response)
for node in response.source_nodes:
    print(f"  ↳ {node.metadata['file_name']} — score: {node.score:.3f}")
```

### Callbacks — logging & observabilité

```python
from langchain.callbacks import LangChainTracer

# Trace automatique vers LangSmith
with LangChainTracer(project_name="documind-prod"):
    result = chain.invoke({"question": "..."})
```
