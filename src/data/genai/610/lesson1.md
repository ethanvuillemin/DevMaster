## Multi-Agent Systems

### Pourquoi des systèmes multi-agents ?

Un seul agent peut être dépassé par des tâches complexes → les décomposer en agents spécialisés :
- **Orchestrateur** : reçoit la tâche, la décompose, délègue
- **Chercheur** : fait le retrieval
- **Analyste** : analyse les résultats
- **Rédacteur** : génère la réponse finale

### LangGraph — stateful agent graphs

```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

class EtatDocuMind(TypedDict):
    question: str
    documents: list[str]
    analyse: str
    reponse_finale: str
    iterations: int

def noeud_retrieval(etat: EtatDocuMind) -> dict:
    docs = retriever.get_relevant_documents(etat["question"])
    return {"documents": [d.page_content for d in docs]}

def noeud_analyse(etat: EtatDocuMind) -> dict:
    prompt = f"Question: {etat['question']}\nDocs: {etat['documents']}\nAnalyse:"
    analyse = llm.invoke(prompt).content
    return {"analyse": analyse}

def noeud_generation(etat: EtatDocuMind) -> dict:
    prompt = f"Génère une réponse finale basée sur : {etat['analyse']}"
    return {"reponse_finale": llm.invoke(prompt).content}

def verifier_qualite(etat: EtatDocuMind) -> str:
    """Router : refaire si réponse insuffisante"""
    if "je ne sais pas" in etat["reponse_finale"].lower() and etat["iterations"] < 3:
        return "retrieval"  # reboucler
    return END

# Construire le graphe
workflow = StateGraph(EtatDocuMind)
workflow.add_node("retrieval", noeud_retrieval)
workflow.add_node("analyse", noeud_analyse)
workflow.add_node("generation", noeud_generation)

workflow.set_entry_point("retrieval")
workflow.add_edge("retrieval", "analyse")
workflow.add_edge("analyse", "generation")
workflow.add_conditional_edges("generation", verifier_qualite)

app = workflow.compile()
result = app.invoke({"question": "Comment fonctionne le télétravail ?", "iterations": 0})
```

### Human-in-the-loop

```python
from langgraph.checkpoint.memory import MemorySaver

# Pause avant les actions irréversibles (envoi d'email, modifications)
workflow.add_node("validation_humaine", lambda s: s)  # noeud d'attente
workflow.add_edge("generation", "validation_humaine")
workflow.add_conditional_edges("validation_humaine",
    lambda s: "executer" if s.get("approuve") else END)

# Avec checkpointing — reprendre après validation
app = workflow.compile(checkpointer=MemorySaver(), interrupt_before=["validation_humaine"])
```
