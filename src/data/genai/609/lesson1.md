## Agents LLM

Un agent LLM peut **décider**, appeler des **outils**, observer les résultats et **itérer** — contrairement à une simple chaîne linéaire.

### Function Calling (OpenAI / Anthropic)

```python
from openai import OpenAI

client = OpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "rechercher_documents",
            "description": "Cherche dans la base de documents de l'entreprise",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "La question à rechercher"},
                    "top_k": {"type": "integer", "default": 3}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "envoyer_email",
            "description": "Envoie un email à un employé",
            "parameters": {
                "type": "object",
                "properties": {
                    "destinataire": {"type": "string"},
                    "sujet": {"type": "string"},
                    "corps": {"type": "string"}
                },
                "required": ["destinataire", "sujet", "corps"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Envoie à alice@co.fr un résumé de la politique RGPD"}],
    tools=tools,
    tool_choice="auto"
)

# L'agent a décidé d'appeler rechercher_documents PUIS envoyer_email
tool_call = response.choices[0].message.tool_calls[0]
print(tool_call.function.name)        # "rechercher_documents"
print(tool_call.function.arguments)   # '{"query": "politique RGPD"}'
```

### ReAct pattern — Reason + Act

```python
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool

def rechercher(query: str) -> str:
    docs = retriever.get_relevant_documents(query)
    return "\n".join(d.page_content for d in docs[:3])

tools = [
    Tool(name="RechercheDocuments", func=rechercher,
         description="Cherche dans les documents internes. Input: question en français."),
    Tool(name="CalculerDate", func=lambda q: "Aujourd'hui: 2025-06-11",
         description="Retourne la date actuelle.")
]

agent = create_react_agent(llm, tools, prompt_react)
executor = AgentExecutor(agent=agent, tools=tools, max_iterations=5, verbose=True)

result = executor.invoke({"input": "Quelle est la date limite pour soumettre les notes de frais ?"})
# Trace ReAct :
# Thought: Je dois chercher la politique de remboursement
# Action: RechercheDocuments
# Observation: "Les frais doivent être soumis dans les 30 jours..."
# Thought: J'ai l'information. La date limite est...
# Final Answer: ...
```
