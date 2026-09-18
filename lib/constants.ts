export type ProblemType =
  | 'counterfeit'
  | 'defective_product'
  | 'wrong_description'
  | 'wrong_item'
  | 'damaged'
  | 'incomplete'
  | 'not_delivered'
  | 'return_refused'
  | 'refund_refused'
  | 'warranty'
  | 'seller_issue'
  | 'delivery_issue'
  | 'other'

export type Country = {
  code: string
  name: string
  flag: string
}

export type Marketplace = {
  name: string
  country: string
}

export const COUNTRIES: Country[] = [
  { code: 'kz', name: 'Казахстан', flag: '🇰🇿' },
  { code: 'ru', name: 'Россия', flag: '🇷🇺' },
  { code: 'uz', name: 'Узбекистан', flag: '🇺🇿' },
  { code: 'kg', name: 'Кыргызстан', flag: '🇰🇬' },
  { code: 'by', name: 'Беларусь', flag: '🇧🇾' },
  { code: 'am', name: 'Армения', flag: '🇦🇲' },
  { code: 'az', name: 'Азербайджан', flag: '🇦🇿' },
  { code: 'md', name: 'Молдова', flag: '🇲🇩' },
  { code: 'tj', name: 'Таджикистан', flag: '🇹🇯' },
  { code: 'tm', name: 'Туркменистан', flag: '🇹🇲' },
]

export const MARKETPLACES: string[] = [
  'Kaspi.kz',
  'Halyk Market',
  'ForteMarket',
  'Wildberries',
  'Ozon',
  'Yandex Market',
  'AliExpress',
  'ZoodMall',
  'Uzum Market',
  'Мегамаркет',
  'Магнит Маркет',
  'Avito',
  'Pinduoduo',
  'Temu',
  'Taobao',
  '1688',
  'SHEIN',
  'Amazon',
  'eBay',
  'Alibaba',
  'JD.com',
  'DHgate',
  'Другой маркетплейс',
]

export const PROBLEM_CARDS: { id: ProblemType; label: string; icon: string }[] = [
  { id: 'counterfeit', label: 'Контрафакт / подделка', icon: 'shield' },
  { id: 'defective_product', label: 'Брак товара', icon: 'bug' },
  { id: 'wrong_description', label: 'Товар не соответствует описанию', icon: 'file-warning' },
  { id: 'wrong_item', label: 'Получен другой товар', icon: 'package-x' },
  { id: 'damaged', label: 'Повреждённый товар', icon: 'alert-triangle' },
  { id: 'incomplete', label: 'Неполный комплект', icon: 'list-checks' },
  { id: 'not_delivered', label: 'Товар не доставлен', icon: 'truck-x' },
  { id: 'return_refused', label: 'Отказ в возврате', icon: 'undo' },
  { id: 'refund_refused', label: 'Отказ в возврате денег', icon: 'ban' },
  { id: 'warranty', label: 'Проблема с гарантией', icon: 'shield-check' },
  { id: 'seller_issue', label: 'Проблема с продавцом', icon: 'user-x' },
  { id: 'delivery_issue', label: 'Проблема с доставкой', icon: 'truck' },
  { id: 'other', label: 'Другое', icon: 'help-circle' },
]

export const PROBLEM_LABELS: Record<ProblemType, string> = {
  counterfeit: 'Контрафакт / подделка',
  defective_product: 'Брак товара',
  wrong_description: 'Товар не соответствует описанию',
  wrong_item: 'Получен другой товар',
  damaged: 'Повреждённый товар',
  incomplete: 'Неполный комплект',
  not_delivered: 'Товар не доставлен',
  return_refused: 'Отказ в возврате',
  refund_refused: 'Отказ в возврате денег',
  warranty: 'Проблема с гарантией',
  seller_issue: 'Проблема с продавцом',
  delivery_issue: 'Проблема с доставкой',
  other: 'Другое',
}

export const STATS_PROBLEM_TYPES: ProblemType[] = [
  'counterfeit',
  'defective_product',
  'wrong_description',
  'refund_refused',
  'delivery_issue',
  'warranty',
  'other',
]

export const KZ_OFFICIAL_SERVICES: { title: string; description: string; url: string; category: string }[] = [
  {
    title: 'eGov.kz',
    description: 'Портал государственных услуг Республики Казахстан — справки, обращения, жалобы.',
    url: 'https://www.egov.kz/',
    category: 'general',
  },
  {
    title: 'eOtinish',
    description: 'Мобильное приложение для подачи обращений в государственные органы РК.',
    url: 'https://eotinish.kz/',
    category: 'general',
  },
  {
    title: 'Комитет по защите прав потребителей МНЭ РК',
    description: 'Государственный орган по защите прав потребителей Казахстана. Приём обращений и жалоб.',
    url: 'https://www.gov.kz/memleket/entities/mne/activities/20',
    category: 'consumer',
  },
  {
    title: 'QazTrade — Комитет торгов РК',
    description: 'Регулирование внутренней торговли и защита прав потребителей в Казахстане.',
    url: 'https://qaztrade.gov.kz/',
    category: 'consumer',
  },
  {
    title: 'Антимонопольный комитет РК',
    description: 'Защита конкуренции и противодействие недобросовестной конкуренции, включая контрафакт.',
    url: 'https://www.gov.kz/memleket/entities/qaztrade',
    category: 'counterfeit',
  },
  {
    title: 'Департамент внутренних дел РК',
    description: 'Заявления о мошенничестве, контрафакте и других правонарушениях со стороны продавцов.',
    url: 'https://www.gov.kz/memleket/entities/mvd',
    category: 'counterfeit',
  },
  {
    title: '1506 — Колл-центр по защите прав потребителей',
    description: 'Единый номер для обращений по вопросам защиты прав потребителей в Казахстане.',
    url: 'tel:1506',
    category: 'consumer',
  },
]

export const KZ_TIMELINE: { step: number; title: string; description: string }[] = [
  {
    step: 1,
    title: 'Скачать готовую претензию',
    description: 'Сформируйте и скачайте претензию во вкладке «Создать претензию».',
  },
  {
    step: 2,
    title: 'Приложить доказательства',
    description: 'Соберите чек, фото товара, видео, переписку с продавцом и другие доказательства.',
  },
  {
    step: 3,
    title: 'Направить претензию',
    description: 'Отправьте претензию продавцу и/или маркетплейсу (заказным письмом, через личный кабинет или курьером).',
  },
  {
    step: 4,
    title: 'Обратиться в официальный орган',
    description: 'Если вопрос не решён — подайте обращение через eGov, eOtinish или Комитет по защите прав потребителей.',
  },
  {
    step: 5,
    title: 'Сохранить подтверждение',
    description: 'Сохраните все подтверждения обращения: уведомления о вручении, номера обращений, ответы.',
  },
]
