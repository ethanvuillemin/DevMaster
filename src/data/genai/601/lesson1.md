## Du Transformer au LLM

> **Prérequis DL (module 408)** : tu connais déjà l'attention multi-tête et l'encodeur-décodeur. Ici on se concentre sur **decoder-only** (GPT family) et les nouveautés qui font les LLMs modernes.

### Architecture GPT (decoder-only)

![Architecture GPT — decoder-only Transformer (Jay Alammar)](https://jalammar.github.io/images/gpt2/gpt2-transformer-xl-autoregressive-model.png) _Architecture GPT : le modèle génère un token à la fois en s'appuyant sur tous les tokens précédents (attention causale)_

Différences clés vs BERT (encodeur) :
| | GPT (decoder) | BERT (encoder) |
|---|---|---|
| Attention | **causale** (masquée) | bidirectionnelle |
| Tâche | génération (next token) | classification, NER |
| Fine-tuning | instruction tuning, RLHF | task-specific head |

### Tokenisation

```python
from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("gpt2")
tokens = tok.encode("Hello, world!")
# [15496, 11, 995, 0]  ← pas des chars, des sous-mots (BPE)

print(tok.decode(tokens))  # "Hello, world!"
print(tok.vocab_size)       # 50257
```

**BPE (Byte-Pair Encoding)** : algorithme qui fusionne les paires de caractères les plus fréquentes jusqu'à atteindre la taille de vocabulaire cible.

### Scaling Laws (Chinchilla)
- Plus de paramètres **ET** plus de données améliorent la performance
- Règle Chinchilla : `tokens ≈ 20 × paramètres` pour l'entraînement optimal
- GPT-3 : 175B params — entraîné sur ~300B tokens (sous-optimal)
- Llama 3 : 8B params — entraîné sur 15T tokens (sur-entraîné, meilleur pour inférence)

### Familles de modèles en 2025
| Modèle | Params | Contexte | Points forts |
|--------|--------|---------|-------------|
| GPT-4o | ~200B | 128K | Multimodal, raisonnement |
| Claude 3.5 Sonnet | — | 200K | Code, suivre instructions |
| Llama 3.3 70B | 70B | 128K | Open-source, local |
| Mistral Large | ~123B | 128K | Efficacité, multilingual |
| Gemini 2.0 Flash | — | 1M | Long context, vitesse |
