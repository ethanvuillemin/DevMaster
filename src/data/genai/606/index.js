import lesson1 from './lesson1.md?raw';

const mod = {
  id: 606,
  title: 'RAG — Pipeline Complet',
  icon: '🔍',
  level: 'Intermédiaire',
  colorHex: '#3FA7D6',
  desc: 'Ingestion, chunking, retrieval, génération augmentée — pipeline de bout en bout.',
  lessons: [
    {
      title: 'RAG de bout en bout',
      content: lesson1,
      links: [
        { url: 'https://python.langchain.com/docs/use_cases/question_answering/', label: 'LangChain — Q&A with RAG' },
      ],
    }
  ],
};

export default mod;
