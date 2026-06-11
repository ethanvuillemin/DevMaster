import lesson1 from './lesson1.md?raw';

const mod = {
  id: 603,
  title: 'APIs LLM & OpenAI SDK',
  icon: '🔌',
  level: 'Débutant',
  colorHex: '#59CD90',
  desc: 'openai SDK, streaming, gestion des coûts, fallback multi-providers.',
  lessons: [
    {
      title: 'Consommer les APIs LLM',
      content: lesson1,
      links: [
        { url: 'https://platform.openai.com/docs/api-reference', label: 'OpenAI API Reference' },
        { url: 'https://docs.litellm.ai/', label: 'LiteLLM — docs' },
        { url: 'https://ollama.com/', label: 'Ollama — modèles locaux' },
      ],
    }
  ],
};

export default mod;
