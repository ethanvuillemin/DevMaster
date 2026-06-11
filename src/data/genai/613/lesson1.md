## Modèles Multimodaux

> **Pont avec DL** : les modules 405 (CNN) et 411 (YOLO) ont travaillé sur la vision. Ici on combine vision + langage dans des modèles unifiés.

### Vision-Language Models (VLM)

```python
from openai import OpenAI
import base64

client = OpenAI()

# Encoder l'image en base64
def encoder_image(chemin: str) -> str:
    with open(chemin, "rb") as f:
        return base64.b64encode(f.read()).decode()

# GPT-4o — analyse d'image
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Qu'est-ce que tu vois dans ce document ? Extrais les données clés."},
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{encoder_image('facture.jpg')}"}}
        ]
    }],
    max_tokens=500
)
print(response.choices[0].message.content)
```

### Génération d'images — DALL-E 3

```python
response = client.images.generate(
    model="dall-e-3",
    prompt="Un assistant IA professionnel analysant des documents, style illustration corporate",
    size="1024x1024",
    quality="hd",
    n=1
)
print(response.data[0].url)
```

### Stable Diffusion — local

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16
).to("cuda")

image = pipe(
    prompt="professional AI document analysis interface, clean UI design",
    negative_prompt="blurry, low quality, distorted",
    num_inference_steps=30,
    guidance_scale=7.5
).images[0]
image.save("output.png")
```

### Whisper — transcription audio

```python
import whisper

model = whisper.load_model("large-v3")
result = model.transcribe("reunion.mp3", language="fr")

print(result["text"])
# Segments avec timestamps
for seg in result["segments"]:
    print(f"[{seg['start']:.1f}s - {seg['end']:.1f}s] {seg['text']}")
```

### RAG multimodal — DocuMind avec images

```python
# Extraire le texte ET les images d'un PDF
from unstructured.partition.pdf import partition_pdf

elements = partition_pdf("rapport_annuel.pdf", extract_images_in_pdf=True,
                         strategy="hi_res")

# Décrire chaque image avec GPT-4o
for el in elements:
    if el.category == "Image":
        description = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": [
                {"type": "text", "text": "Décris ce graphique/schéma."},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{el.metadata.image_base64}"}}
            ]}]
        ).choices[0].message.content
        # Indexer la description dans le vectorstore
        vectorstore.add_texts([description], metadatas=[{"source": "rapport_annuel.pdf", "type": "image"}])
```
