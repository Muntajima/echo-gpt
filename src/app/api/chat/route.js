import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the incoming JSON request body
    const { message, history } = await request.json();

    // Retrieve your API key from environment variables
    const apiKey = process.env.ECHOGPT_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    // Call the EchoGPT API endpoint with the appropriate headers
    const response = await fetch('https://api.echogpt.live/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "EchoGPT",
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...(history || []).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
          { role: 'user', content: message }
        ],
      }),
    });

    // Check for authorization errors or other issues
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error from EchoGPT:', errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content || 'No response' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

