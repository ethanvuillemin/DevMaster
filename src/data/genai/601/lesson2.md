## Stratégies d'inférence

### Génération autoregressive

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="gpt2")
out = pipe("The future of AI is", max_new_tokens=50, do_sample=True, temperature=0.7)
print(out[0]["generated_text"])
```

### Paramètres de sampling

| Paramètre | Rôle | Valeurs typiques |
|-----------|------|-----------------|
| `temperature` | Créativité (0=déterministe, ∞=aléatoire) | 0.1–1.5 |
| `top_p` (nucleus) | Garder les tokens couvrant p% de proba | 0.9–0.95 |
| `top_k` | Garder les k tokens les plus probables | 20–50 |
| `repetition_penalty` | Pénalise les répétitions | 1.1–1.3 |
| `max_new_tokens` | Longueur max générée | selon tâche |

```python
out = pipe(
    "Résume ce texte :",
    max_new_tokens=200,
    temperature=0.3,     # plus déterministe pour les tâches factuelles
    top_p=0.9,
    do_sample=True
)
```

### KV Cache — pourquoi l'inférence accélère

Au premier token : calcul de K, V pour tous les tokens d'entrée.
Aux tokens suivants : **réutilisation** du cache, seulement le nouveau token est calculé.
→ Passage de O(n²) à O(n) par token généré.

### Quantification pour l'inférence locale

```python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_compute_dtype="float16")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B-Instruct",
                                              quantization_config=bnb_config,
                                              device_map="auto")
```
