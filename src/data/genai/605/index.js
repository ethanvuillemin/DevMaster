import lesson1 from './lesson1.md?raw';

const mod = {
  id: 605,
  title: 'Vector Databases',
  icon: '🗄️',
  level: 'Intermédiaire',
  colorHex: '#3FA7D6',
  desc: 'Chroma, Qdrant, pgvector — indexer, stocker et interroger des embeddings.',
  lessons: [
    {
      title: 'Bases de données vectorielles',
      content: lesson1,
      links: [
        { url: 'https://docs.trychroma.com/', label: 'Chroma — documentation' },
        { url: 'https://qdrant.tech/documentation/', label: 'Qdrant — documentation' },
        { url: 'https://github.com/pgvector/pgvector', label: 'pgvector — GitHub' },
      ],
    }
  ],
};

export default mod;
