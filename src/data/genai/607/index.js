import lesson1 from './lesson1.md?raw';

const mod = {
  id: 607,
  title: 'RAG Avancé',
  icon: '🚀',
  level: 'Intermédiaire',
  colorHex: '#3FA7D6',
  desc: 'Reranking, HyDE, hybrid search, parent-child chunking, évaluation.',
  lessons: [
    {
      title: 'Techniques RAG avancées',
      content: lesson1,
      links: [
        { url: 'https://arxiv.org/abs/2212.10496', label: 'HyDE Paper (Gao et al., 2022)' },
        { url: 'https://docs.cohere.com/docs/reranking', label: 'Reranking with Cohere' },
      ],
    }
  ],
};

export default mod;
