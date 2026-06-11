## Fine-tuning avec LoRA

> **Note** : Le module DL 406 (Transfer Learning) a introduit le fine-tuning classique de CNNs. Ici on applique la même idée aux LLMs, mais avec des contraintes de VRAM très différentes. LoRA résout ça élégamment.

### Pourquoi LoRA (Low-Rank Adaptation) ?

Fine-tuner GPT-3 (175B params) classiquement = mettre à jour 175B poids → impossible sur du matériel standard.

**Idée LoRA** : au lieu de modifier W (grosse matrice), apprendre deux petites matrices A et B telles que ΔW = A×B.
- r=8 (rang) sur une couche 768×768 → 768×8 + 8×768 = 12 288 params au lieu de 589 824
- **Réduction ~98%** du nombre de paramètres entraînés

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer
from datasets import load_dataset

# Modèle de base (quantifié en 4-bit pour tenir sur GPU modeste)
model = AutoModelForCausalLM.from_pretrained(
    "mistralai/Mistral-7B-v0.1",
    load_in_4bit=True,     # QLoRA : quantification 4-bit + LoRA
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-v0.1")

# Config LoRA
lora_config = LoraConfig(
    r=16,                    # rang — plus grand = plus expressif, plus de params
    lora_alpha=32,           # scaling factor (souvent 2×r)
    target_modules=["q_proj", "v_proj"],  # couches à adapter
    lora_dropout=0.05,
    task_type=TaskType.CAUSAL_LM
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 2,621,440 || all params: 3,754,422,272 || trainable%: 0.0699

# Dataset au format instruction
dataset = load_dataset("json", data_files="mes_donnees.jsonl")
# Format attendu :
# {"instruction": "Résume ce document...", "input": "...", "output": "..."}

# Entraînement
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset["train"],
    dataset_text_field="text",
    tokenizer=tokenizer,
    args=TrainingArguments(
        output_dir="./lora-output",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        learning_rate=2e-4,
        fp16=True,
    ),
)
trainer.train()

# Sauvegarder seulement les poids LoRA (~10 MB au lieu de 14 GB)
model.save_pretrained("./lora-weights")
```

### Quand fine-tuner vs RAG ?

| Critère | RAG | Fine-tuning |
|---------|-----|------------|
| Connaissance changeante | ✅ Idéal | ❌ Réentraîner |
| Style/format spécifique | ❌ Difficile | ✅ Idéal |
| Confidentialité données | ✅ Données restent dans DB | ⚠️ Données dans les poids |
| Coût | Faible (embeddings) | Élevé (GPU heures) |
| Latence | + (retrieval + génération) | = (génération seule) |

→ **Recommandation** : commencer par RAG, fine-tuner uniquement si le style/comportement doit changer.
