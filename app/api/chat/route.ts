export const maxDuration = 60

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatRequest = {
  messages: ChatMessage[]
  context: {
    country?: string
    marketplace?: string
    orderNumber?: string
    productName?: string
    problemType?: string
    claim?: string
  }
}

const LANG_INSTRUCTION = 'ВАЖНО: отвечай ТОЛЬКО на русском языке.'

const SYSTEM_PROMPT = `Ты — юридический AI-ассистент по защите прав потребителей на маркетплейсах.
Пользователь уже составил претензию и теперь задаёт тебе вопросы по своей ситуации.

ПРАВИЛА:
1. Отвечай ПРОСТО И ПОНЯТНО, без сложных юридических терминов. Объясняй как человеку без юридического образования.
2. Помни контекст текущей ситуации пользователя (страна, маркетплейс, заказ, товар, проблема, созданная претензия).
3. Если пользователь просит изменить претензию — создай обновлённую версию с учётом новых обстоятельств.
4. Если пользователь спрашивает «что делать если продавец не отвечает» — объясни порядок действий.
5. Если пользователь спрашивает «куда обратиться» — укажи конкретные органы для его страны.
6. Если срок уже прошёл — объясни последствия и возможные варианты.
7. Если спор трансграничный — объясни ограничения и доступные альтернативные действия.
8. Не пиши категорично «ничего нельзя сделать», если есть другие варианты.
9. Если достоверно не знаешь — так и скажи, не придумывай.`

function buildContext(ctx: ChatRequest['context']): string {
  const parts: string[] = []
  if (ctx.country) parts.push(`Страна: ${ctx.country}`)
  if (ctx.marketplace) parts.push(`Маркетплейс: ${ctx.marketplace}`)
  if (ctx.orderNumber) parts.push(`Номер заказа: ${ctx.orderNumber}`)
  if (ctx.productName) parts.push(`Товар: ${ctx.productName}`)
  if (ctx.problemType) parts.push(`Проблема: ${ctx.problemType}`)
  if (ctx.claim) parts.push(`Созданная претензия:\n${ctx.claim}`)
  return parts.length > 0 ? `КОНТЕКСТ СИТУАЦИИ ПОЛЬЗОВАТЕЛЯ:\n${parts.join('\n')}` : ''
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json(
        { error: 'Сервис временно недоступен. Попробуйте позже.' },
        { status: 503 },
      )
    }

    const { messages, context }: ChatRequest = await req.json()
    const contextBlock = buildContext(context)

    const contents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }))

    const systemContent = `${SYSTEM_PROMPT}\n\n${LANG_INSTRUCTION}\n\n${contextBlock}`

    contents.unshift({
      role: 'user',
      parts: [{ text: systemContent }],
    })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 55000)

    let geminiResponse: Response
    try {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 4096,
            },
          }),
          signal: controller.signal,
        },
      )
    } catch (fetchErr) {
      clearTimeout(timeout)
      if ((fetchErr as Error).name === 'AbortError') {
        return Response.json(
          { error: 'Время ожидания истекло. Попробуйте ещё раз.' },
          { status: 504 },
        )
      }
      throw fetchErr
    }
    clearTimeout(timeout)

    if (!geminiResponse.ok) {
      if (geminiResponse.status === 429) {
        return Response.json(
          { error: 'Сервис перегружен. Попробуйте через минуту.' },
          { status: 429 },
        )
      }
      return Response.json(
        { error: 'Не удалось получить ответ. Попробуйте ещё раз.' },
        { status: 502 },
      )
    }

    const geminiData = await geminiResponse.json()
    const text =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ??
      geminiData?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') ??
      ''

    if (!text || text.trim().length === 0) {
      return Response.json(
        { error: 'Получен пустый ответ. Попробуйте переформулировать вопрос.' },
        { status: 502 },
      )
    }

    return Response.json({ reply: text })
  } catch (err) {
    console.error('[chat] error:', (err as Error).message)
    return Response.json(
      { error: 'Произошла ошибка. Попробуйте ещё раз.' },
      { status: 500 },
    )
  }
}
