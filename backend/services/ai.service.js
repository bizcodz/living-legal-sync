// ... at the top with other exports

// ... your existing processDocument function

// ADD THIS NEW FUNCTION
async function getAnswer(question, context) {
  const prompt = `
    You are a helpful assistant answering questions about a legal document.
    Based ONLY on the provided "Contract Context", answer the user's "Question".
    If the answer cannot be found in the context, respond with "I'm sorry, but the answer to that question cannot be found in the provided document."

    Question:
    ---
    ${question}

    Contract Context:
    ---
    ${context}
  `;
  // We use the gemini-pro model here as it's a text-only task
  const textOnlyModel = vertex_ai.getGenerativeModel({ model: 'gemini-1.0-pro-001' });
  const result = await textOnlyModel.generateContent(prompt);
  return result.response.candidates[0].content.parts[0].text;
}

module.exports = { processDocument, getAnswer };