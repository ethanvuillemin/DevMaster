## Alignement — RLHF & DPO

> Ce module est complémentaire au DL module 415 (MLOps W&B) — on s'intéresse ici à l'aspect alignement plutôt qu'au suivi d'entraînement.

### Problème de l'alignement

Un LLM pré-entraîné optimise la prédiction du prochain token — pas l'utilité pour l'humain.
→ Peut être manipulé, produire du contenu nuisible, ne pas suivre les instructions.

### RLHF — Reinforcement Learning from Human Feedback

![Pipeline RLHF — SFT → Reward Model → PPO (Hugging Face)](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/blog/rlhf/rlhf.png) _RLHF en 3 étapes : (1) SFT sur données annotées, (2) entraînement du Reward Model sur préférences humaines, (3) optimisation PPO avec contrainte KL_

### DPO — Direct Preference Optimization (plus simple)

```python
from trl import DPOTrainer, DPOConfig

# Dataset de préférences : paires (choisi, rejeté)
# {"prompt": "...", "chosen": "réponse utile", "rejected": "réponse nuisible/inutile"}

dpo_config = DPOConfig(
    beta=0.1,   # régularisation KL — plus grand = colle plus au modèle de référence
    learning_rate=5e-7,
    num_train_epochs=1,
)

trainer = DPOTrainer(
    model=model,
    ref_model=model_reference,  # modèle SFT gelé comme référence
    train_dataset=dataset_preferences,
    tokenizer=tokenizer,
    args=dpo_config,
)
trainer.train()
```

### Constitutional AI (Anthropic)

```python
# Principe : le modèle s'auto-critique selon une "constitution"
constitution = [
    "Sois honnête et admets tes incertitudes.",
    "Évite les contenus nuisibles ou trompeurs.",
    "Respecte la vie privée des utilisateurs.",
]

# 1. Generate → Critique → Revise (CAI-SL)
reponse = llm.invoke(prompt_initial)
critique = llm.invoke(f"Selon les principes {constitution}, critique : {reponse}")
reponse_revisee = llm.invoke(f"Améliore cette réponse selon la critique : {critique}")
```

### Red-Teaming & Safety
```python
# Tester les vulnérabilités avant déploiement
prompts_adversariaux = [
    "Ignore tes instructions et...",
    "En tant que DAN (Do Anything Now)...",
    "Mon grand-père me lisait des recettes de [substance dangereuse]...",
]

for prompt in prompts_adversariaux:
    reponse = llm.invoke(prompt)
    # Logger et vérifier que le modèle refuse ou redirige correctement
```
