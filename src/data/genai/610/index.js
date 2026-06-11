import lesson1 from './lesson1.md?raw';

const mod = {
  id: 610,
  title: 'Multi-Agent avec LangGraph',
  icon: '🕸️',
  level: 'Avancé',
  colorHex: '#AA7DCE',
  desc: 'Graphes d\'agents, LangGraph, CrewAI, état partagé, supervision humaine.',
  lessons: [
    {
      title: 'LangGraph — agents avec état',
      content: lesson1,
      links: [
        { url: 'https://langchain-ai.github.io/langgraph/', label: 'LangGraph — documentation' },
        { url: 'https://docs.crewai.com/', label: 'CrewAI — documentation' },
      ],
    }
  ],
};

export default mod;
