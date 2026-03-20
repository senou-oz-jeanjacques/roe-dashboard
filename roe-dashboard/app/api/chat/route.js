export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "AI Query is not configured. ANTHROPIC_API_KEY environment variable is missing." },
      { status: 500 }
    );
  }

  try {
    const { question, context } = await request.json();

    if (!question || !question.trim()) {
      return Response.json({ error: "No question provided." }, { status: 400 });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are an AfDB ROE portfolio intelligence analyst. Data:\n${context}\nBe concise, analytical, use numbers. Format with line breaks.`,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return Response.json(
        { error: `Anthropic API error: ${res.status} ${errData?.error?.message || res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "No response received.";

    return Response.json({ text });
  } catch (e) {
    return Response.json(
      { error: `Server error: ${e.message}` },
      { status: 500 }
    );
  }
}
