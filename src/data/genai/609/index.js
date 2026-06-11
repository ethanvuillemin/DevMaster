import lesson1 from './lesson1.md?raw';

const mod = {
  id: 609,
  title: 'Agents & Function Calling',
  icon: '🤖',
  level: 'Avancé',
  colorHex: '#AA7DCE',
  desc: 'ReAct, function calling, tool use, planification, boucle observation-action.',
  lessons: [
    {
      title: 'Agents LLM',
      content: lesson1,
      links: [
        { url: 'https://arxiv.org/abs/2210.03629', label: 'ReAct Paper (Yao et al., 2022)' },
        { url: 'https://platform.openai.com/docs/guides/function-calling', label: 'OpenAI — Function Calling' },
      ],
    }
  ],
};

export default mod;
