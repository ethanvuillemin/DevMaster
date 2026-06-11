import lesson1 from './lesson1.md?raw';

const mod = {
  id: 613,
  title: 'Modèles Multimodaux',
  icon: '🖼️',
  level: 'Expert',
  colorHex: '#F3752B',
  desc: 'Vision-Language Models, DALL-E/SD, Whisper, GPT-4V — texte + image + audio.',
  lessons: [
    {
      title: 'Au-delà du texte',
      content: lesson1,
      links: [
        { url: 'https://openai.com/dall-e-3', label: 'DALL-E 3' },
        { url: 'https://github.com/openai/whisper', label: 'Whisper — GitHub' },
        { url: 'https://huggingface.co/docs/diffusers', label: 'Diffusers — documentation' },
      ],
    }
  ],
};

export default mod;
