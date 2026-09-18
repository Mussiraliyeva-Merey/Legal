import { streamText } from 'ai'
import { ERROR_SENTINEL } from '@/lib/i18n'

export const maxDuration = 60

const LANG_INSTRUCTION: Record<string, string> = {
  ru: 'ВАЖНО: отвечай ТОЛЬКО на русском языке.',
  kk: 'МАҢЫЗДЫ: ТЕК қазақ тілінде жауап бер.',
  en: 'IMPORTANT: answer ONLY in English.',
}

const KZ_PROMPT = `Ты — специализированный юридический ассистент по защите прав потребителей на маркетплейсах в Республике Казахстан.

ПРАВИЛА:
1. ЮРИСДИКЦИЯ: строго Закон РК «О защите прав потребителей», Гражданский кодекс РК и Правила осуществления электронной торговли РК. Не используй законы других стран.
2. СФЕРА: только покупки на маркетплейсах (Kaspi, Halyk Market, Wildberries, Ozon и др.): возврат товаров, контрафакт, некачественный товар, просрочка доставки, разграничение ответственности площадки и продавца.
3. ОТКЛОНЕНИЕ ЧУЖИХ ТЕМ: если вопрос не по теме защиты прав потребителей на маркетплейсах, вежливо откажи и напомни свою специализацию.
4. При запросе претензии генерируй строгий юридический документ с реквизитами, ссылками на конкретные статьи Закона РК «О защите прав потребителей» (ст. 14, 15, 30 и др.) и требованием возврата денег/замены товара в установленный срок.`

const CIS_PROMPT = `Ты — специализированный юридический ассистент по защите прав потребителей при трансграничных и внутренних покупках на маркетплейсах в странах СНГ/ЕАЭС.

ПРАВИЛА:
1. ЮРИСДИКЦИЯ: ориентируйся на страну пользователя. Для России используй Закон РФ «О защите прав потребителей» (в т.ч. ст. 18, 22, 23, 25, 26.1 о дистанционной торговле). Для стран ЕАЭС/СНГ (Кыргызстан, Узбекистан, Беларусь, Армения и др.) используй их национальные законы о защите прав потребителей и, где применимо, право ЕАЭС. Если страна не указана — используй общие принципы защиты прав потребителей и обозначь, что нормы уточняются по стране.
2. ТРАНСГРАНИЧНОСТЬ: учитывай особенности покупок у иностранного продавца (в т.ч. на AliExpress, Wildberries, Ozon, Kaspi), вопросы применимого права, возврата и таможни.
3. СФЕРА: только споры по онлайн-покупкам: возврат, контрафакт, брак, просрочка доставки, ответственность площадки и продавца. Иные темы вежливо отклоняй.
4. При запросе претензии генерируй строгий юридический документ с реквизитами, ссылками на конкретные статьи применимого закона указанной страны и чёткими требованиями и сроком.`

const PROBLEM_LABELS: Record<string, string> = {
  defect: 'возврат брака (некачественный товар)',
  counterfeit: 'контрафакт / подделка',
  delay: 'просрочка доставки',
  refusal: 'отказ в возврате товара в установленный срок',
}

export async function POST(req: Request) {
  try {
    const { marketplace, problemType, situation, mode, lang, jurisdiction, country } =
      await req.json()

    const langKey = LANG_INSTRUCTION[lang] ? lang : 'ru'
    const base = jurisdiction === 'cis' ? CIS_PROMPT : KZ_PROMPT
    const system = `${base}\n\n${LANG_INSTRUCTION[langKey]}`

    const problemLabel = PROBLEM_LABELS[problemType] ?? problemType ?? 'не указана'

    const task =
      mode === 'consult'
        ? 'Дай развёрнутую юридическую консультацию по описанной ситуации со ссылками на конкретные статьи применимого законодательства. Объясни права потребителя и порядок действий.'
        : 'Составь официальную письменную претензию (юридический документ) от имени потребителя: блок реквизитов (Кому / От кого), описание обстоятельств, правовое обоснование со ссылками на конкретные статьи, чёткие требования и срок их удовлетворения, место для даты и подписи.'

    const prompt = `Юрисдикция: ${jurisdiction === 'cis' ? 'СНГ/трансграничная' : 'Республика Казахстан'}
${jurisdiction === 'cis' ? `Страна потребителя: ${country || 'не указана'}` : ''}
Маркетплейс: ${marketplace || 'не указан'}
Тип проблемы: ${problemLabel}
Описание ситуации от покупателя:
"""
${situation || '(детали не описаны — используй общие формулировки и обозначь места для заполнения в квадратных скобках)'}
"""

Задача: ${task}`

    let capturedError: unknown = null
    const result = streamText({
      model: 'google/gemini-2.5-flash',
      system,
      prompt,
      onError: ({ error }) => {
        capturedError = error
        console.log('[v0] stream error:', (error as Error)?.message)
      },
    })

    const encoder = new TextEncoder()
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const delta of result.textStream) {
            controller.enqueue(encoder.encode(delta))
          }
        } catch (streamErr) {
          capturedError = capturedError ?? streamErr
        }

        if (capturedError) {
          const message = (capturedError as Error)?.message ?? ''
          const kind = /credit card|customer_verification|valid credit/i.test(message)
            ? 'billing'
            : 'generic'
          controller.enqueue(encoder.encode(`${ERROR_SENTINEL}${kind}`))
        }

        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.log('[v0] generate error:', (err as Error).message)
    return new Response(
      JSON.stringify({ error: (err as Error).message || 'generation_failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
