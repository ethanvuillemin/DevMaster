import lesson1 from './lesson1.md?raw';

const mod = {
  id: 615,
  title: 'LLMs en Production',
  icon: '⚙️',
  level: 'Expert',
  colorHex: '#F3752B',
  desc: 'vLLM, Ollama, LangFuse, optimisation des coûts, guardrails, CI/CD GenAI.',
  lessons: [
    {
      title: 'Déployer des LLMs',
      content: lesson1,
      links: [
        { url: 'https://docs.vllm.ai/', label: 'vLLM — documentation' },
        { url: 'https://langfuse.com/docs', label: 'LangFuse — documentation' },
        { url: 'https://www.guardrailsai.com/', label: 'Guardrails AI' },
      ],
    }
  ],
};

export default mod;
