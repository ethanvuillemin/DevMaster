## LLMs en Production

### vLLM — serving haute performance

```bash
pip install vllm
# Lancer un serveur compatible OpenAI
python -m vllm.entrypoints.openai.api_server \
  --model mistralai/Mistral-7B-Instruct-v0.3 \
  --port 8000 \
  --gpu-memory-utilization 0.9 \
  --max-model-len 8192
```

```python
# Utilisation avec le client OpenAI standard
client = OpenAI(base_url="http://localhost:8000/v1", api_key="token")
response = client.chat.completions.create(model="mistral", messages=[...])
```

**Paged Attention** (innovation vLLM) : gestion dynamique du KV-Cache → 24× meilleur débit vs HuggingFace naïf.

### LangFuse — observabilité et tracing

```python
from langfuse import Langfuse
from langfuse.openai import openai  # wrapper tracé automatiquement

langfuse = Langfuse(public_key="pk-...", secret_key="sk-...", host="https://cloud.langfuse.com")

# Toutes les requêtes OpenAI sont tracées automatiquement
response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "..."}],
    name="documind-query",          # nom du span dans LangFuse
    metadata={"user_id": "alice", "session": "sess_123"}
)
# → visible dans le dashboard LangFuse : latence, tokens, coût, conversations
```

### Guardrails — contrôle des entrées/sorties

```python
from guardrails import Guard
from guardrails.hub import ToxicLanguage, DetectPII

guard = Guard().use(ToxicLanguage(threshold=0.5)).use(DetectPII(["EMAIL", "PHONE"]))

def reponse_securisee(question: str) -> str:
    # Valider l'input
    try:
        guard.validate(question)
    except Exception:
        return "Je ne peux pas répondre à ce type de question."

    reponse = chain.invoke({"question": question})

    # Valider l'output (pas de données PII dans la réponse)
    try:
        guard.validate(reponse)
    except Exception:
        reponse = anonymiser(reponse)

    return reponse
```

### Optimisation des coûts

```python
# 1. Semantic cache — éviter les appels redondants
from gptcache import cache
cache.init(embedding_func=embedding_model.encode, similarity_threshold=0.85)
# Questions similaires → réponse en cache, 0 token facturé

# 2. Prompt compression — réduire le contexte
from llmlingua import PromptCompressor
compressor = PromptCompressor(model_name="microsoft/llmlingua-2-xlm-roberta-large-meetingbank")
compressed = compressor.compress_prompt(long_context, rate=0.5)  # -50% tokens

# 3. Routing intelligent — modèle adapté à la complexité
def router(question: str) -> str:
    complexite = classifier.predict(question)
    if complexite == "simple":
        return "gpt-4o-mini"    # 0.15$/M tokens
    elif complexite == "moyen":
        return "claude-3-5-haiku-20241022"  # rapport qualité/prix
    else:
        return "gpt-4o"          # 5$/M tokens — seulement si nécessaire
```

### CI/CD pour les systèmes GenAI

```yaml
# .github/workflows/genai-ci.yml
name: GenAI CI
on: [push]
jobs:
  eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run RAGAS evaluation
        run: python eval/run_ragas.py --dataset eval/golden_dataset.jsonl
      - name: Check thresholds
        run: |
          python -c "
          import json; r = json.load(open('eval/results.json'))
          assert r['faithfulness'] > 0.85, f'Faithfulness too low: {r["faithfulness"]}'
          assert r['answer_relevancy'] > 0.80
          "
```
