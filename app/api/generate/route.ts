import { callGemini } from '@/lib/gemini'
import { type ProblemType } from '@/lib/constants'
import { PROBLEM_LABELS_I18N } from '@/lib/i18n-content'

export const maxDuration = 60

type GenerateRequest = {
  fullName?: string
  phone?: string
  email?: string
  address?: string
  country?: string
  marketplace?: string
  orderNumber?: string
  orderDate?: string
  receiveDate?: string
  productName?: string
  productPrice?: string
  problemType?: ProblemType
  description?: string
  lang?: 'ru' | 'kk' | 'en'
}

const LANG_INSTRUCTIONS: Record<NonNullable<GenerateRequest['lang']>, string> = {
  ru: 'ВАЖНО: сформируй весь документ и все пояснения только на русском языке.',
  kk: 'МАҢЫЗДЫ: құжат пен барлық түсіндірмелерді тек қазақ тілінде қалыптастыр.',
  en: 'IMPORTANT: generate the entire document and all explanations only in English.',
}

const SYSTEM_PROMPT = `You are a specialized legal assistant for consumer protection in marketplace purchases.
Always write the complete document, including every heading and placeholder, in the language explicitly requested below. Do not mix languages.
Твоя задача — сформировать ПОЛНОСТЬЮ ГОТОВУЮ официальную претензию на основе фактов, введённых пользователем.

ПРАВИЛА:
1. ОПРЕДЕЛЯЙ применимое законодательство на основе выбранной страны пользователя.
   - Казахстан: Закон РК «О защите прав потребителей», ГК РК, Правила электронной торговли РК.
   - Россия: Закон РФ «О защите прав потребителей» (ст. 18, 22, 23, 25, 26.1), ГК РФ.
   - Узбекистан: Закон РУз «О защите прав потребителей».
   - Кыргызстан: Закон КР «О защите прав потребителей».
   - Беларусь: Закон РБ «О защите прав потребителей».
   - Армения: Закон РА «О защите прав потребителей».
   - Азербайджан: Закон АР «О защите прав потребителей».
   - Молдова: Закон РМ о защите прав потребителей.
   - Таджикистан: Закон РТ «О защите прав потребителей».
   - Туркменистан: Закон ТМ о защите прав потребителей.
2. Не смешивай нормы разных государств. Используй только законодательство выбранной страны.
3. Если достоверно определить какую-либо юридическую информацию невозможно — НЕ придумывай её. Вместо этого оставь конкретный элемент как [поле для проверки: ...] и поясни, что требует уточнения.
4. Если маркетплейс/продавец находится за пределами страны пользователя — укажи статус трансграничного спора и объясни ограничения.
5. Претензия должна быть ПОЛНОСТЬЮ ГОТОВЫМ документом, который пользователь может сразу скачать и отправить.

СТРУКТУРА ПРЕТЕНЗИИ (строго соблюдай):

1. ШАПКА (кому адресована):
   - Полное наименование маркетплейса/продавца
   - Юридическое лицо (если достоверно известно, иначе [поле для проверки: юридическое лицо])
   - БИН/ИНН/ОГРН или соответствующий реквизит (если достоверно известен, иначе [поле для проверки: БИН/ИНН/ОГРН])
   - Юридический адрес (если достоверно известен, иначе [поле для проверки: юридический адрес])

2. ОТ КОГО:
   - ФИО: [из данных пользователя]
   - Адрес: [из данных пользователя]
   - Телефон: [из данных пользователя]
   - Email: [из данных пользователя]

3. ЗАГОЛОВОК: ПРЕТЕНЗИЯ

4. ОПИСАНИЕ СИТУАЦИИ:
   - Дата заказа: [из данных]
   - Дата получения: [из данных]
   - Маркетплейс: [из данных]
   - Номер заказа: [из данных]
   - Наименование товара: [из данных]
   - Стоимость товара: [из данных]
   - Категория проблемы: [из данных]
   - Описание пользователя: [из данных]
   - Обстоятельства ситуации (сформулируй на основе описания пользователя)

5. ПРАВОВОЕ ОБОСНОВАНИЕ:
   - Применимое законодательство
   - Конкретные статьи/нормы со ссылкой на закон
   - Юридическое обоснование (почему требования правомерны)

6. ТРЕБОВАНИЯ:
   - Конкретные требования (вернуть деньги / заменить товар / устранить недостатки и т.д.)
   - Срок исполнения требования согласно закону

7. ПЕРЕЧЕНЬ ПРИЛОЖЕНИЙ:
   - Копия чека/заказа
   - Фотографии товара
   - Видео (при наличии)
   - Переписка с продавцом
   - Другие доказательства

8. ДАТА И ПОДПИСЬ:
   Дата: [автоматически текущая дата в формате ДД.ММ.ГГГГ]
   Подпись: ____________________ / ФИО пользователя /

ВАЖНО:
- Вставляй реальные данные пользователя в соответствующие поля.
- Не оставляй пустых полей для данных, которые пользователь уже предоставил.
- Если какой-либо реквизит маркетплейса невозможно достоверно определить — оставь ТОЛЬКО этот элемент как [поле для проверки: ...], но не заставляй пользователя составлять юридический текст.
- Дата должна быть автоматически текущей датой.
- Подпись должна содержать линию для подписи и ФИО пользователя.`

function buildPrompt(data: GenerateRequest): string {
  const language = data.lang || 'ru'
  const problemLabel = data.problemType ? PROBLEM_LABELS_I18N[data.problemType][language] : ({ ru: 'не указана', kk: 'көрсетілмеген', en: 'not specified' }[language])
  const locale = data.lang === 'kk' ? 'kk-KZ' : data.lang === 'en' ? 'en-US' : 'ru-RU'
  const today = new Date().toLocaleDateString(locale)

  const labels = language === 'en'
    ? { country: 'COUNTRY', marketplace: 'MARKETPLACE', user: 'USER DETAILS', order: 'ORDER DETAILS', problem: 'PROBLEM', category: 'Category', description: 'User description' }
    : language === 'kk'
      ? { country: 'ЕЛ', marketplace: 'МАРКЕТПЛЕЙС', user: 'ПАЙДАЛАНУШЫ ДЕРЕКТЕРІ', order: 'ТАПСЫРЫС ДЕРЕКТЕРІ', problem: 'МӘСЕЛЕ', category: 'Санат', description: 'Пайдаланушы сипаттамасы' }
      : { country: 'СТРАНА', marketplace: 'МАРКЕТПЛЕЙС', user: 'ДАННЫЕ ПОЛЬЗОВАТЕЛЯ', order: 'ДАННЫЕ ЗАКАЗА', problem: 'ПРОБЛЕМА', category: 'Категория', description: 'Описание пользователя' }

  return `OUTPUT LANGUAGE: ${language === 'ru' ? 'Russian (русский)' : language === 'kk' ? 'Kazakh (қазақ тілі)' : 'English'}
${labels.country}: ${data.country || 'not specified'}
${labels.marketplace}: ${data.marketplace || 'not specified'}

${labels.user}:
- Full name: ${data.fullName || '[not provided]'}
- Phone: ${data.phone || '[not provided]'}
- Email: ${data.email || '[not provided]'}
- Address: ${data.address || '[not provided]'}

${labels.order}:
- Order number: ${data.orderNumber || '[not provided]'}
- Order date: ${data.orderDate || '[not provided]'}
- Receipt date: ${data.receiveDate || '[not provided]'}
- Product: ${data.productName || '[not provided]'}
- Price: ${data.productPrice || '[not provided]'}

${labels.problem}:
- ${labels.category}: ${problemLabel}
- ${labels.description}: ${data.description || '[not provided]'}

Current date: ${today}

TASK: Generate a complete official complaint in the selected language (${language}). Use the structure from the system instructions and include all supplied user and order data.`
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

    const body: GenerateRequest = await req.json()
    const prompt = buildPrompt(body)
    const langInstruction = LANG_INSTRUCTIONS[body.lang || 'ru']

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 55000)

    let geminiResponse: Response
    try {
      geminiResponse = await callGemini(apiKey, {
            contents: [
              {
                parts: [
                  { text: `${SYSTEM_PROMPT}\n\n${langInstruction}\n\n${prompt}` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 16384,
              thinkingConfig: { thinkingLevel: 'low' },
            },
          }, controller.signal)
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
      console.error('[gemini] request failed:', geminiResponse.status)
      if ([429, 503].includes(geminiResponse.status)) {
        return Response.json({ error: 'AI-сервис временно перегружен. Попробуйте через минуту.' }, { status: 503 })
      }
      return Response.json({ error: 'Не удалось сформировать претензию. Обратитесь к администратору сайта.' }, { status: 502 })
    }

    const geminiData = await geminiResponse.json()
    const text =
      (geminiData?.candidates?.[0]?.content?.parts ?? [])
        .filter((p: { text?: string; thought?: boolean }) => !p.thought && typeof p.text === 'string')
        .map((p: { text: string }) => p.text)
        .join('')

    if (geminiData?.candidates?.[0]?.finishReason && geminiData.candidates[0].finishReason !== 'STOP') {
      console.error('[generate] incomplete response:', geminiData.candidates[0].finishReason)
      return Response.json({ error: 'Претензия сформировалась не полностью. Попробуйте ещё раз.' }, { status: 502 })
    }

    if (!text || text.trim().length === 0) {
      return Response.json(
        { error: 'Получен пустой ответ. Попробуйте переформулировать описание.' },
        { status: 502 },
      )
    }

    if (text.trim().length < 200) {
      console.error('[generate] response is too short')
      return Response.json({ error: 'Претензия сформировалась не полностью. Попробуйте ещё раз.' }, { status: 502 })
    }

    return Response.json({ claim: text })
  } catch (err) {
    console.error('[generate] error:', (err as Error).message)
    return Response.json(
      { error: 'Произошла ошибка при генерации. Попробуйте ещё раз.' },
      { status: 500 },
    )
  }
}
