import lesson1 from './lesson1.md?raw';

const mod = {
  id: 614,
  title: 'Évaluation des LLMs',
  icon: '📊',
  level: 'Expert',
  colorHex: '#F3752B',
  desc: 'RAGAS, LLM-as-judge, benchmarks, détection d\'hallucinations, métriques RAG.',
  lessons: [
    {
      title: 'Évaluer un système RAG',
      content: lesson1,
      links: [
        { url: 'https://docs.ragas.io/', label: 'RAGAS — documentation' },
        { url: 'https://arxiv.org/abs/2306.05685', label: 'Judging LLM-as-a-Judge (Zheng et al.)' },
      ],
    }
  ],
};

export default mod;
