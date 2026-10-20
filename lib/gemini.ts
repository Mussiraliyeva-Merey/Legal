export async function callGemini(apiKey: string, payload: unknown, signal: AbortSignal): Promise<Response> {
  const models = ['gemini-3.5-flash-lite', 'gemini-3.6-flash']
  let response: Response | undefined

  for (const model of models) {
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(payload),
      signal,
    })
    if (response.ok || ![429, 503, 404].includes(response.status)) return response
    console.warn('[gemini] model temporarily unavailable:', model, response.status)
  }

  return response!
}
