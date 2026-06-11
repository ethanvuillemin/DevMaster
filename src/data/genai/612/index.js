import lesson1 from './lesson1.md?raw';

const mod = {
  id: 612,
  title: 'RLHF, DPO & Alignment',
  icon: '⚖️',
  level: 'Expert',
  colorHex: '#F3752B',
  desc: 'Comment les LLMs sont alignés : RLHF, DPO, Constitutional AI, red-teaming.',
  lessons: [
    {
      title: 'Alignement des LLMs',
      content: lesson1,
      links: [
        { url: 'https://arxiv.org/abs/2203.02155', label: 'InstructGPT — RLHF (Ouyang et al., 2022)' },
        { url: 'https://arxiv.org/abs/2305.18290', label: 'DPO Paper (Rafailov et al., 2023)' },
      ],
    }
  ],
};

export default mod;
