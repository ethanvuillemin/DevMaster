import lesson1 from './lesson1.md?raw';

const mod = {
  id: 611,
  title: 'Fine-tuning — LoRA & QLoRA',
  icon: '🎯',
  level: 'Expert',
  colorHex: '#F3752B',
  desc: 'Adapter des LLMs à vos données : LoRA, QLoRA avec PEFT, datasets, évaluation.',
  lessons: [
    {
      title: 'Fine-tuning efficace',
      content: lesson1,
      links: [
        { url: 'https://arxiv.org/abs/2106.09685', label: 'LoRA Paper (Hu et al., 2021)' },
        { url: 'https://huggingface.co/docs/peft/', label: 'PEFT — documentation' },
      ],
    }
  ],
};

export default mod;
