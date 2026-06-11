## Évaluation LLM & RAG

> **Pont avec ML/DL** : en ML (module 307), on évaluait avec accuracy/F1 sur des labels. En GenAI, pas de label unique → on utilise des LLMs comme juges ou des métriques spécialisées.

### Métriques RAG — RAGAS

```python
from ragas import evaluate
from ragas.metrics import (
    faithfulness,          # réponse fidèle aux documents récupérés ?
    answer_relevancy,      # réponse pertinente par rapport à la question ?
    context_recall,        # les docs pertinents ont-ils été récupérés ?
    context_precision,     # les docs récupérés sont-ils pertinents ?
)
from datasets import Dataset

# Dataset d'évaluation
data = {
    "question": ["Quelle est la politique de remboursement ?"],
    "answer": ["Les frais doivent être soumis dans les 30 jours..."],
    "contexts": [["Document RH : les remboursements se font..."]],
    "ground_truth": ["Les employés ont 30 jours pour soumettre leurs notes de frais."]
}
dataset = Dataset.from_dict(data)

result = evaluate(dataset, metrics=[faithfulness, answer_relevancy, context_recall, context_precision])
print(result)
# {'faithfulness': 0.92, 'answer_relevancy': 0.88, 'context_recall': 0.75, 'context_precision': 0.83}
```

### LLM-as-judge

```python
def evaluer_reponse(question: str, reponse: str, reference: str) -> dict:
    prompt = f"""Évalue cette réponse d'assistant IA.

Question : {question}
Réponse : {reponse}
Réponse de référence : {reference}

Évalue sur :
1. Exactitude factuelle (0-10)
2. Complétude (0-10)
3. Clarté (0-10)

Réponds en JSON : {{"exactitude": X, "completude": X, "clarte": X, "justification": "..."}}"""

    result = client.chat.completions.create(
        model="gpt-4o",  # utiliser un modèle plus fort comme juge
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    return json.loads(result.choices[0].message.content)
```

### Détection d'hallucinations

```python
def detecter_hallucination(reponse: str, contexte: str) -> float:
    """Retourne un score de confiance (0=hallucination, 1=fidèle)"""
    prompt = f"""Est-ce que chaque affirmation de cette réponse est supportée par le contexte ?

Contexte : {contexte}
Réponse : {reponse}

Pour chaque affirmation, indique si elle est [SUPPORTÉE] ou [HALLUCINÉE].
Score final de fidélité entre 0 et 1."""

    result = llm.invoke(prompt)
    # Parser le score...
    return score

# Seuil d'alerte
if detecter_hallucination(reponse, contexte) < 0.7:
    reponse = "Je ne dispose pas d'informations suffisantes pour répondre avec certitude."
```

### Benchmarks standards

| Benchmark | Mesure | Exemple |
|-----------|--------|---------|
| MMLU | Connaissances académiques | 57 matières |
| HumanEval | Code (pass@k) | 164 problèmes Python |
| HellaSwag | Complétion de phrases | bon sens |
| TruthfulQA | Résistance aux fausses croyances | — |
| MT-Bench | Conversations multi-tours | — |
