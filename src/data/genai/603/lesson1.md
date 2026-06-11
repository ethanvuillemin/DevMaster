## APIs LLM

### OpenAI SDK (compatible Anthropic, Mistral, Ollama…)

```bash
pip install openai anthropic
```

```python
from openai import OpenAI

client = OpenAI(api_key="sk-...")  # ou env var OPENAI_API_KEY

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Tu es un assistant utile."},
        {"role": "user",   "content": "Explique le RAG en 3 points."},
    ],
    temperature=0.7,
    max_tokens=500,
)
print(response.choices[0].message.content)
print(f"Tokens: {response.usage.total_tokens}")
```

### Streaming — affichage en temps réel

```python
with client.chat.completions.stream(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Écris un poème sur l'IA."}],
) as stream:
    for chunk in stream:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)
```

### Gestion des coûts

```python
# Estimateur de coût avant l'appel
import tiktoken

def estimer_cout(messages: list, model="gpt-4o-mini") -> dict:
    enc = tiktoken.encoding_for_model(model)
    tokens_in = sum(len(enc.encode(m["content"])) for m in messages)
    # Prix approximatifs (vérifier sur platform.openai.com)
    prix = {"gpt-4o-mini": (0.15, 0.60), "gpt-4o": (5.00, 15.00)}
    p_in, p_out = prix.get(model, (1, 2))
    return {
        "tokens_entree": tokens_in,
        "cout_entree_usd": tokens_in * p_in / 1_000_000,
        "cout_sortie_estime_usd": 500 * p_out / 1_000_000
    }
```

### LiteLLM — abstraction multi-provider

```python
import litellm

# Bascule transparente entre providers
response = litellm.completion(
    model="gpt-4o-mini",          # ou "claude-3-5-haiku-20241022"
    messages=[{"role": "user", "content": "Hello!"}]
)

# Fallback automatique
response = litellm.completion(
    model="gpt-4o",
    messages=[...],
    fallbacks=["claude-3-5-sonnet-20241022", "gpt-4o-mini"]
)
```

### Ollama — modèles locaux (0€)

```bash
ollama pull llama3.2:3b
ollama serve  # API compatible OpenAI sur localhost:11434
```

```python
client_local = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client_local.chat.completions.create(
    model="llama3.2:3b",
    messages=[{"role": "user", "content": "Bonjour !"}]
)
```
