import lesson1 from './lesson1.md?raw';

const mod = {
  id: 604,
  title: 'Embeddings & Recherche Sémantique',
  icon: '🔢',
  level: 'Intermédiaire',
  colorHex: '#3FA7D6',
  desc: 'Modèles d\'embedding, cosine similarity, dense vs sparse retrieval.',
  lessons: [
    {
      title: 'Embeddings de texte',
      content: lesson1,
      links: [
        { url: 'https://huggingface.co/BAAI/bge-m3', label: 'BGE-M3 — modèle multilingue state-of-the-art' },
        { url: 'https://platform.openai.com/docs/guides/embeddings', label: 'OpenAI Embeddings Guide' },
      ],
    }
  ],
};

export default mod;
