import type { Lang } from './lang'

export type Term = {
  word: Record<Lang, string>
  definition: Record<Lang, string>
  category: Record<Lang, string>
}

export const TERMS: Term[] = [
  {
    word: { ru: 'Потребитель', kk: 'Тұтынушы', en: 'Consumer' },
    definition: {
      ru: 'Человек, который покупает товар или услугу для личных нужд.',
      kk: 'Жеке қажеттері үшін тауар немесе қызмет сатып алатын адам.',
      en: 'A person who buys goods or services for personal use.',
    },
    category: { ru: 'Основные понятия', kk: 'Негізгі ұғымдар', en: 'Basic concepts' },
  },
  {
    word: { ru: 'Маркетплейс', kk: 'Маркетплейс', en: 'Marketplace' },
    definition: {
      ru: 'Онлайн-платформа, где разные продавцы размещают и продают свои товары.',
      kk: 'Әртүрлі сатушылар өз тауарларын орналастыратын және сататын онлайн-платформа.',
      en: 'An online platform where different sellers list and sell their goods.',
    },
    category: { ru: 'Основные понятия', kk: 'Негізгі ұғымдар', en: 'Basic concepts' },
  },
  {
    word: { ru: 'Продавец', kk: 'Сатушы', en: 'Seller' },
    definition: {
      ru: 'Человек или компания, которые продают товар.',
      kk: 'Тауар сататын адам немесе компания.',
      en: 'A person or company that sells goods.',
    },
    category: { ru: 'Продавцы', kk: 'Сатушылар', en: 'Sellers' },
  },
  {
    word: { ru: 'Брак', kk: 'Ақау', en: 'Defect' },
    definition: {
      ru: 'Товар, который имеет недостаток, неисправность или не соответствует установленным требованиям.',
      kk: 'Кемшілігі, ақаулығы бар немесе белгіленген талаптарға сай келмейтін тауар.',
      en: 'A product that has a flaw, malfunction, or does not meet established requirements.',
    },
    category: { ru: 'Товары', kk: 'Тауарлар', en: 'Products' },
  },
  {
    word: { ru: 'Контрафакт', kk: 'Контрафакт', en: 'Counterfeit' },
    definition: {
      ru: 'Поддельный товар, который незаконно использует чужой бренд, знак или другую защищённую информацию.',
      kk: 'Бөгде брендті, белгіні немесе басқа қорғалған ақпаратты заңсыз пайдаланатын жалған тауар.',
      en: 'A fake product that illegally uses someone else\'s brand, mark, or other protected information.',
    },
    category: { ru: 'Товары', kk: 'Тауарлар', en: 'Products' },
  },
  {
    word: { ru: 'Возврат', kk: 'Қайтару', en: 'Return' },
    definition: {
      ru: 'Процесс, при котором покупатель возвращает товар продавцу.',
      kk: 'Сатып алушы тауарды сатушыға қайтаратын процесс.',
      en: 'The process where a buyer returns goods to the seller.',
    },
    category: { ru: 'Возврат', kk: 'Қайтару', en: 'Returns' },
  },
  {
    word: { ru: 'Претензия', kk: 'Шағым', en: 'Claim' },
    definition: {
      ru: 'Официальное обращение к продавцу или другой стороне с описанием проблемы и требованием её решить.',
      kk: 'Мәселені сипаттап, оны шешуді талап ететін сатушыға немесе басқа тарапқа ресми өтініш.',
      en: 'A formal request to a seller or other party describing a problem and demanding its resolution.',
    },
    category: { ru: 'Документы', kk: 'Құжаттар', en: 'Documents' },
  },
  {
    word: { ru: 'Гарантия', kk: 'Кепілдік', en: 'Warranty' },
    definition: {
      ru: 'Обязательство продавца или производителя устранить определённые недостатки товара или выполнить другие предусмотренные условия в течение установленного периода.',
      kk: 'Сатушының немесе өндірушінің тауардың белгілі бір кемшіліктерін жоюға немесе басқа көзделген шарттарды орындауға міндеттемесі.',
      en: 'A seller\'s or manufacturer\'s obligation to fix certain product defects or fulfill other conditions within a set period.',
    },
    category: { ru: 'Товары', kk: 'Тауарлар', en: 'Products' },
  },
  {
    word: { ru: 'Доказательства', kk: 'Дәлелдер', en: 'Evidence' },
    definition: {
      ru: 'Материалы, подтверждающие ситуацию: чек, фотографии, видео, переписка, документы, скриншоты и т.д.',
      kk: 'Жағдайды растайтын материалдар: чек, фотолар, видео, хат-хабар, құжаттар, скриншоттар және т.б.',
      en: 'Materials confirming the situation: receipt, photos, video, correspondence, documents, screenshots, etc.',
    },
    category: { ru: 'Документы', kk: 'Құжаттар', en: 'Documents' },
  },
  {
    word: { ru: 'Продавец-нерезидент', kk: 'Бейрезидент сатушы', en: 'Non-resident seller' },
    definition: {
      ru: 'Продавец, зарегистрированный в другой стране.',
      kk: 'Басқа елде тіркелген сатушы.',
      en: 'A seller registered in another country.',
    },
    category: { ru: 'Продавцы', kk: 'Сатушылар', en: 'Sellers' },
  },
  {
    word: { ru: 'Трансграничный спор', kk: 'Трансшекаралық дау', en: 'Cross-border dispute' },
    definition: {
      ru: 'Ситуация, когда покупатель и продавец находятся в разных странах или сделка связана с несколькими странами.',
      kk: 'Сатып алушы мен сатушы әртүрлі елдерде болатын немесе мәміле бірнеше елдерді қамтитын жағдай.',
      en: 'A situation where the buyer and seller are in different countries or the transaction involves several countries.',
    },
    category: { ru: 'Основные понятия', kk: 'Негізгі ұғымдар', en: 'Basic concepts' },
  },
  {
    word: { ru: 'Возврат денег', kk: 'Ақшаны қайтару', en: 'Refund' },
    definition: {
      ru: 'Получение покупателем уплаченной за товар суммы обратно при наличии соответствующих оснований.',
      kk: 'Сатып алушының тауар үшін төлеген сомасын тиісті негіздер болған кезде қайтарып алуы.',
      en: 'The buyer receiving back the amount paid for a product when there are valid grounds.',
    },
    category: { ru: 'Возврат', kk: 'Қайтару', en: 'Returns' },
  },
  {
    word: { ru: 'Претензионный срок', kk: 'Шағым мерзімі', en: 'Claim period' },
    definition: {
      ru: 'Срок, в течение которого определённое требование или обращение должно быть предъявлено либо рассмотрено.',
      kk: 'Белгілі бір талап немесе өтініш ұсынылуы немесе қаралуы тиіс мерзім.',
      en: 'The period within which a certain demand or request must be submitted or reviewed.',
    },
    category: { ru: 'Законодательство', kk: 'Заңнама', en: 'Legislation' },
  },
  {
    word: { ru: 'Жалоба', kk: 'Шағымдану', en: 'Complaint' },
    definition: {
      ru: 'Обращение в государственный орган или другую инстанцию с сообщением о нарушении ваших прав.',
      kk: 'Құқықтарыңыздың бұзылуы туралы мемлекеттік органға немесе басқа инстанцияға жүгіну.',
      en: 'An appeal to a government body or other authority reporting a violation of your rights.',
    },
    category: { ru: 'Жалобы', kk: 'Шағымдар', en: 'Complaints' },
  },
  {
    word: { ru: 'Срок ответа', kk: 'Жауап мерзімі', en: 'Response period' },
    definition: {
      ru: 'Время, в течение которого продавец обязан ответить на претензию. Зависит от страны — обычно 10–14 дней.',
      kk: 'Сатушының шағымға жауап беруі тиіс уақыт. Елге байланысты — әдетте 10–14 күн.',
      en: 'The time within which the seller must respond to a claim. Depends on the country — usually 10–14 days.',
    },
    category: { ru: 'Законодательство', kk: 'Заңнама', en: 'Legislation' },
  },
  {
    word: { ru: 'Чек', kk: 'Чек', en: 'Receipt' },
    definition: {
      ru: 'Документ или электронное подтверждение, доказывающее факт покупки и оплаты товара.',
      kk: 'Сатып алуды және тауарды төлеуді дәлелдейтін құжат немесе электронды растау.',
      en: 'A document or electronic confirmation proving the fact of purchase and payment for goods.',
    },
    category: { ru: 'Документы', kk: 'Құжаттар', en: 'Documents' },
  },
  {
    word: { ru: 'Экспертиза', kk: 'Сараптама', en: 'Expert examination' },
    definition: {
      ru: 'Проверка товара специалистом для определения причины недостатка — брак это или повреждение по вине покупателя.',
      kk: 'Кемшіліктің себебін анықтау үшін маманның тауарды тексеруі — ақау ма әлде сатып алушының кінәсінен бе.',
      en: 'A specialist\'s inspection of a product to determine the cause of a defect — whether it is a flaw or buyer-caused damage.',
    },
    category: { ru: 'Товары', kk: 'Тауарлар', en: 'Products' },
  },
]

export const TERM_CATEGORIES: Record<Lang, string[]> = {
  ru: ['Все', 'Основные понятия', 'Возврат', 'Товары', 'Продавцы', 'Документы', 'Жалобы', 'Законодательство'],
  kk: ['Барлығы', 'Негізгі ұғымдар', 'Қайтару', 'Тауарлар', 'Сатушылар', 'Құжаттар', 'Шағымдар', 'Заңнама'],
  en: ['All', 'Basic concepts', 'Returns', 'Products', 'Sellers', 'Documents', 'Complaints', 'Legislation'],
}
