import knowledge from "./knowledge.json";

export async function askAI(userInput: string): Promise<string> {
  const systemPrompt = `
You are an AI assistant for Utkarsh's portfolio terminal.
Use only the following knowledge base to answer questions about Utkarsh:

${JSON.stringify(knowledge, null, 2)}

If you don't know the answer, say "Sorry, I don't know that."
`;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + import.meta.env.VITE_GEMINI_API_KEY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n" + userInput }] }
      ]
    }),
  });
  const data = await response.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I couldn't help with that."
  );
}