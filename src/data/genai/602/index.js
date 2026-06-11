import lesson1 from './lesson1.md?raw';

const mod = {
  id: 602,
  title: 'Prompt Engineering',
  icon: '✍️',
  level: 'Débutant',
  colorHex: '#59CD90',
  desc: 'Zero-shot, few-shot, CoT, structured output, system prompts.',
  lessons: [
    {
      title: 'Techniques de prompting',
      content: lesson1,
      links: [
        { url: 'https://www.promptingguide.ai/fr', label: 'Prompt Engineering Guide' },
        { url: 'https://docs.anthropic.com/fr/docs/build-with-claude/prompt-engineering/overview', label: 'Anthropic — Prompt Engineering' },
      ],
    }
  ],
};

export default mod;
