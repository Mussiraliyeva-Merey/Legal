export const maxDuration = 60

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatContext = {
  country?: string
  marketplace?: string
  orderNumber?: string
  productName?: string
  problemType?: string
  claim?: string
}

type ChatRequest = {
  messages: ChatMessage[]
  context?: ChatContext
  lang?: string
}

const LANG_INSTRUCTIONS: Record<string, string> = {
  ru: 'ВАЖНО: отвечай ТОЛЬКО на русском языке.',
  kk: 'МАҢЫЗДЫ: тек қазақ тілінде жауап бер.',
  en: 'IMPORTANT: respond ONLY in English.',
}

const SYSTEM_PROMPT = `Ты — специализированный AI-помощник по защите прав потребителей на маркетплейсах.
Твоя задача — помогать людям решать проблемы с покупками, возвратами, продавцами и маркетплейсами.

### ТЕМА — отвечай ТОЛЬКО на вопросы, связанные с:
- покупками, маркетплейсами, защитой прав потребителей
- возвратом товаров, возвратом денег
- браком, контрафактом, гарантией, доставкой
- продавцами, спорами с продавцами, спорами с маркетплейсами
- претензиями, жалобами, обращениями в государственные органы
- правилами маркетплейсов, действиями при проблеме с заказом
- подготовкой доказательств, юридическими аспектами потребительских споров

### ЕСЛИ ВОПРОС НЕ ПО ТЕМЕ — не отвечай по существу. Ответь коротко:
«Я специализируюсь на вопросах о маркетплейсах, покупках и защите прав потребителей. Я могу помочь разобраться с возвратом товара, браком, контрафактом, продавцом или претензией.»

Не продолжай обсуждать постороннюю тему. Не пытайся помочь с вопросами не по теме.

### ЯЗЫК — объясняй ПРОСТЫМИ словами. Без сложных юридических терминов.
Если термин необходим — объясни его простым языком.
Ответ должен быть понятен обычному человеку без юридического образования.

### СТРУКТУРА ОТВЕТА — по возможности используй:
### Что произошло
Коротко объясни проблему пользователя.
### Что это означает
Простое объяснение ситуации.
### Что делать
Пошаговый план (1, 2, 3...).
### Какие доказательства нужны
Перечисли: чек, фото, видео, переписка, скриншоты, номер заказа и т.д.
### Куда обратиться
Если можно решить через маркетплейс — предложи это.
Если нужен госорган — объясни куда.
### Что делать дальше
Следующий шаг, если продавец не отвечает или отказывает.

### МАРКЕТПЛЕЙСЫ — если пользователь назвал маркетплейс, учитывай его.
Если не назвал — можешь спросить: «На каком маркетплейсе вы совершили покупку?»
Если проблему можно решить через маркетплейс — предложи перейти на официальный сайт.
Используй ТОЛЬКО реальные официальные сайты. Не придумывай ссылки.

### СТРАНА — учитывай страну пользователя. Не смешивай законодательство разных стран.

### БЕЗОПАСНОСТЬ — НЕ придумывай:
- законы, статьи, юридические лица, БИН/ИНН/ОГРН
- адреса, официальные сайты, контакты, функции маркетплейсов
- государственные органы, сроки
Если информация неизвестна — скажи: «Я не могу достоверно подтвердить эту информацию. Проверьте её на официальном сайте.»

### ПАМЯТЬ — помни контекст диалога: страну, маркетплейс, товар, проблему, созданную претензию.
Не заставляй пользователя повторять информацию.`

function detectProblemType(text: string): string | null {
  const value = text.toLowerCase()
  const rules: [string, RegExp][] = [
    ['counterfeit', /поддел|контрафакт|fake/],
    ['defective_product', /брак|не работает|сломал|дефект/],
    ['wrong_item', /другой товар|не тот товар/],
    ['refund_refused', /не вернул.*деньг|отказ.*возврат.*денег|refund/],
    ['return_refused', /отказ.*возврат|не принима.*обратно/],
    ['delivery_issue', /не достав|доставк|не приш[её]л/],
    ['warranty', /гаранти/],
    ['seller_issue', /продавец.*не отвеч|seller.*not respond/],
    ['wrong_description', /не соответств.*описан/],
    ['damaged', /поврежд|разбит|трещин/],
  ]
  return rules.find(([, pattern]) => pattern.test(value))?.[0] || null
}

function buildContext(ctx?: ChatContext): string {
  if (!ctx) return ''
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

    const { messages, context, lang }: ChatRequest = await req.json()
    const contextBlock = buildContext(context)
    const langInstruction = LANG_INSTRUCTIONS[lang || 'ru'] || LANG_INSTRUCTIONS.ru

    const contents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }))

    const systemContent = `${SYSTEM_PROMPT}\n\n${langInstruction}\n\n${contextBlock}`

    contents.unshift({
      role: 'user',
      parts: [{ text: systemContent }],
    })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 55000)

    let geminiResponse: Response
    try {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 4096,
              thinkingConfig: { thinkingLevel: 'low' },
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
      (geminiData?.candidates?.[0]?.content?.parts ?? []).filter((p: { text?: string; thought?: boolean }) => !p.thought && typeof p.text === 'string').map((p: { text: string }) => p.text).join('') ??
      
      ''

    if (!text || text.trim().length === 0) {
      return Response.json(
        { error: 'Получен пустой ответ. Попробуйте переформулировать вопрос.' },
        { status: 502 },
      )
    }

    const firstUserMessage = messages.find((message) => message.role === 'user')?.content || ''
    return Response.json({ reply: text, problemType: detectProblemType(firstUserMessage) })
  } catch (err) {
    console.error('[chat] error:', (err as Error).message)
    return Response.json(
      { error: 'Произошла ошибка. Попробуйте ещё раз.' },
      { status: 500 },
    )
  }
}
