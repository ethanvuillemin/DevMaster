import lesson1 from './lesson1.md?raw';

const mod = {
  id: 608,
  title: 'LangChain & LlamaIndex',
  icon: '⛓️',
  level: 'Avancé',
  colorHex: '#AA7DCE',
  desc: 'Chaînes, mémoire, abstraction de composants, LlamaIndex pour les documents.',
  lessons: [
    {
      title: 'LangChain — building blocks',
      content: lesson1,
      links: [
        { url: 'https://python.langchain.com/docs/', label: 'LangChain — documentation' },
        { url: 'https://docs.llamaindex.ai/', label: 'LlamaIndex — documentation' },
      ],
    }
  ],
};

export default mod;
