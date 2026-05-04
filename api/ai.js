export default async function handler(req, res) {
  try {
    const { chatHistory } = req.body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: chatHistory,
      }),
    });

    const data = await response.json();
    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || 'No response',
    });

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}