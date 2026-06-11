import lesson1 from './lesson1.md?raw';
import lesson2 from './lesson2.md?raw';

const mod = {
  id: 601,
  title: 'Architecture des LLMs',
  icon: '🧠',
  level: 'Débutant',
  colorHex: '#59CD90',
  desc: 'Du Transformer au GPT-4 — anatomie, tokenisation, scaling laws.',
  lessons: [
    {
      title: 'Du Transformer au LLM',
      content: lesson1,
      links: [
        { url: 'https://jalammar.github.io/illustrated-gpt2/', label: 'The Illustrated GPT-2' },
        { url: 'https://arxiv.org/abs/2203.15556', label: 'Chinchilla Scaling Laws (Hoffman et al.)' },
      ],
    },
    {
      title: 'Inférence & Sampling',
      content: lesson2,
      links: [
        { url: 'https://huggingface.co/docs/transformers/generation_strategies', label: 'HuggingFace — Generation Strategies' },
      ],
    }
  ],
};

export default mod;
