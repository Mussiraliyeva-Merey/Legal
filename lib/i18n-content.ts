import type { Lang } from './lang'
import type { ProblemType } from './constants'

export const PROBLEM_LABELS_I18N: Record<ProblemType, Record<Lang, string>> = {
  counterfeit: { ru: 'Контрафакт / подделка', kk: 'Контрафакт / жалған', en: 'Counterfeit / fake' },
  defective_product: { ru: 'Брак товара', kk: 'Тауар ақауы', en: 'Product defect' },
  wrong_description: { ru: 'Товар не соответствует описанию', kk: 'Тауар сипаттамасына сай келмейді', en: 'Product does not match description' },
  wrong_item: { ru: 'Получен другой товар', kk: 'Басқа тауар келді', en: 'Received wrong item' },
  damaged: { ru: 'Повреждённый товар', kk: 'Зақымдалған тауар', en: 'Damaged product' },
  incomplete: { ru: 'Неполный комплект', kk: 'Толық емес жиынтық', en: 'Incomplete set' },
  not_delivered: { ru: 'Товар не доставлен', kk: 'Тауар жеткізілмеді', en: 'Product not delivered' },
  return_refused: { ru: 'Отказ в возврате', kk: 'Қайтарудан бас тарту', en: 'Return refused' },
  refund_refused: { ru: 'Отказ в возврате денег', kk: 'Ақшаны қайтарудан бас тарту', en: 'Refund refused' },
  warranty: { ru: 'Проблема с гарантией', kk: 'Кепілдік мәселесі', en: 'Warranty issue' },
  seller_issue: { ru: 'Проблема с продавцом', kk: 'Сатушы мәселесі', en: 'Seller issue' },
  delivery_issue: { ru: 'Проблема с доставкой', kk: 'Жеткізу мәселесі', en: 'Delivery issue' },
  other: { ru: 'Другое', kk: 'Басқа', en: 'Other' },
}

export const COUNTRIES_I18N: Record<Lang, { code: string; name: string; flag: string }[]> = {
  ru: [
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
  ],
  kk: [
    { code: 'kz', name: 'Қазақстан', flag: '🇰🇿' },
    { code: 'ru', name: 'Ресей', flag: '🇷🇺' },
    { code: 'uz', name: 'Өзбекстан', flag: '🇺🇿' },
    { code: 'kg', name: 'Қырғызстан', flag: '🇰🇬' },
    { code: 'by', name: 'Беларусь', flag: '🇧🇾' },
    { code: 'am', name: 'Армения', flag: '🇦🇲' },
    { code: 'az', name: 'Әзірбайжан', flag: '🇦🇿' },
    { code: 'md', name: 'Молдова', flag: '🇲🇩' },
    { code: 'tj', name: 'Тәжікстан', flag: '🇹🇯' },
    { code: 'tm', name: 'Түрікменстан', flag: '🇹🇲' },
  ],
  en: [
    { code: 'kz', name: 'Kazakhstan', flag: '🇰🇿' },
    { code: 'ru', name: 'Russia', flag: '🇷🇺' },
    { code: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
    { code: 'kg', name: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: 'by', name: 'Belarus', flag: '🇧🇾' },
    { code: 'am', name: 'Armenia', flag: '🇦🇲' },
    { code: 'az', name: 'Azerbaijan', flag: '🇦🇿' },
    { code: 'md', name: 'Moldova', flag: '🇲🇩' },
    { code: 'tj', name: 'Tajikistan', flag: '🇹🇯' },
    { code: 'tm', name: 'Turkmenistan', flag: '🇹🇲' },
  ],
}

export const MARKETPLACE_OTHER_I18N: Record<Lang, string> = {
  ru: 'Другой маркетплейс',
  kk: 'Басқа маркетплейс',
  en: 'Other marketplace',
}

export const MARKETPLACE_COUNTRIES_I18N: Record<Lang, Record<string, string>> = {
  ru: {
    'Kaspi.kz': '🇰🇿 Казахстан', 'Halyk Market': '🇰🇿 Казахстан', ForteMarket: '🇰🇿 Казахстан',
    Wildberries: '🇷🇺 Россия', Ozon: '🇷🇺 Россия', 'Yandex Market': '🇷🇺 Россия',
    AliExpress: '🇨🇳 Китай', ZoodMall: '🇰🇿 Казахстан', 'Uzum Market': '🇺🇿 Узбекистан',
    Мегамаркет: '🇷🇺 Россия', 'Магнит Маркет': '🇷🇺 Россия', Avito: '🇷🇺 Россия',
    Pinduoduo: '🇨🇳 Китай', Temu: '🇨🇳 Китай', Taobao: '🇨🇳 Китай',
    '1688': '🇨🇳 Китай', SHEIN: '🇨🇳 Китай', Amazon: '🇺🇸 США',
    eBay: '🇺🇸 США', Alibaba: '🇨🇳 Китай', 'JD.com': '🇨🇳 Китай', DHgate: '🇨🇳 Китай',
  },
  kk: {
    'Kaspi.kz': '🇰🇿 Қазақстан', 'Halyk Market': '🇰🇿 Қазақстан', ForteMarket: '🇰🇿 Қазақстан',
    Wildberries: '🇷🇺 Ресей', Ozon: '🇷🇺 Ресей', 'Yandex Market': '🇷🇺 Ресей',
    AliExpress: '🇨🇳 Қытай', ZoodMall: '🇰🇿 Қазақстан', 'Uzum Market': '🇺🇿 Өзбекстан',
    Мегамаркет: '🇷🇺 Ресей', 'Магнит Маркет': '🇷🇺 Ресей', Avito: '🇷🇺 Ресей',
    Pinduoduo: '🇨🇳 Қытай', Temu: '🇨🇳 Қытай', Taobao: '🇨🇳 Қытай',
    '1688': '🇨🇳 Қытай', SHEIN: '🇨🇳 Қытай', Amazon: '🇺🇸 АҚШ',
    eBay: '🇺🇸 АҚШ', Alibaba: '🇨🇳 Қытай', 'JD.com': '🇨🇳 Қытай', DHgate: '🇨🇳 Қытай',
  },
  en: {
    'Kaspi.kz': '🇰🇿 Kazakhstan', 'Halyk Market': '🇰🇿 Kazakhstan', ForteMarket: '🇰🇿 Kazakhstan',
    Wildberries: '🇷🇺 Russia', Ozon: '🇷🇺 Russia', 'Yandex Market': '🇷🇺 Russia',
    AliExpress: '🇨🇳 China', ZoodMall: '🇰🇿 Kazakhstan', 'Uzum Market': '🇺🇿 Uzbekistan',
    Мегамаркет: '🇷🇺 Russia', 'Магнит Маркет': '🇷🇺 Russia', Avito: '🇷🇺 Russia',
    Pinduoduo: '🇨🇳 China', Temu: '🇨🇳 China', Taobao: '🇨🇳 China',
    '1688': '🇨🇳 China', SHEIN: '🇨🇳 China', Amazon: '🇺🇸 USA',
    eBay: '🇺🇸 USA', Alibaba: '🇨🇳 China', 'JD.com': '🇨🇳 China', DHgate: '🇨🇳 China',
  },
}

export type WhatToDoStep = {
  title: string
  description: string
  details: string[]
}

export const WHAT_TO_DO_STEPS: Record<Lang, WhatToDoStep[]> = {
  ru: [
    {
      title: '1. Соберите доказательства',
      description: 'Соберите все документы и материалы, подтверждающие вашу проблему.',
      details: [
        'Чек или подтверждение заказа (скриншот из личного кабинета маркетплейса)',
        'Фотографии товара — общий вид, дефекты, упаковка, бирки',
        'Видео распаковки (если есть) — особенно при повреждении или подделке',
        'Скриншоты переписки с продавцом и службой поддержки маркетплейса',
        'Трек-номер и информацию о доставке',
        'Заключение эксперта или сервисного центра (если есть)',
      ],
    },
    {
      title: '2. Сформируйте претензию',
      description: 'Используйте вкладку «Создать претензию» — система сама определит законы и статьи.',
      details: [
        'Заполните данные о себе, заказе и опишите проблему',
        'AI определит применимое законодательство вашей страны',
        'Готовую претензию можно скачать в PDF или DOCX',
        'Проверьте все данные перед отправкой — особенно ФИО, адрес и реквизиты',
      ],
    },
    {
      title: '3. Отправьте претензию',
      description: 'Направьте претензию продавцу и/или маркетплейсу одним из способов:',
      details: [
        'Через форму обращений в личном кабинете маркетплейса (скриншот подтверждения)',
        'Заказным письмом с уведомлением о вручении на юридический адрес продавца',
        'Электронным письмом на официальную почту маркетплейса',
        'Через чат с продавцом в приложении маркетплейса (с сохранением переписки)',
        'Обязательно сохраните подтверждение отправки — номер заказа письма, скриншот, квитанцию',
      ],
    },
    {
      title: '4. Дождитесь ответа',
      description: 'По закону у продавца есть срок на ответ. Сроки зависят от страны:',
      details: [
        'Казахстан — 10 дней (Закон РК «О защите прав потребителей»)',
        'Россия — 10 дней (Закон РФ «О защите прав потребителей», ст. 22)',
        'Узбекистан — 10 дней (Закон РУз «О защите прав потребителей»)',
        'Кыргызстан — 10 дней (Закон КР «О защите прав потребителей»)',
        'Беларусь — 14 дней (Закон РБ «О защите прав потребителей»)',
        'Армения — 10 дней (Закон РА «О защите прав потребителей»)',
        'Азербайджан — 10 дней (Закон АР «О защите прав потребителей»)',
        'Молдова — 14 дней (Закон РМ о защите прав потребителей)',
        'Таджикистан — 10 дней (Закон РТ «О защите прав потребителей»)',
        'Туркменистан — 10 дней (Закон ТМ о защите прав потребителей)',
      ],
    },
    {
      title: '5. Обратитесь в госорганы',
      description: 'Если продавец не ответил или отказал — подайте жалобу в государственный орган вашей страны.',
      details: [
        'Казахстан — Комитет по защите прав потребителей МНЭ РК, eGov.kz, eOtinish, звонок на 1506',
        'Россия — Роспотребнадзор (rospotrebnadzor.ru), суд по месту жительства',
        'Узбекистан — Комитет по защите прав потребителей при Минэкономики РУз',
        'Кыргызстан — Департамент защиты прав потребителей при Минэкономики КР',
        'Беларусь — Министерство антимонопольного регулирования и торговли РБ',
        'Армения — Комитет по защите прав потребителей Минэкономики РА',
        'Азербайджан — Министерство экономики АР, Департамент защиты прав потребителей',
        'Молдова — Национальный центр защиты прав потребителей',
        'Таджикистан — Антимонопольная служба при Правительстве РТ',
        'Туркменистан — Министерство торговли и внешнеэкономических связей ТМ',
      ],
    },
    {
      title: '6. Обратитесь в суд',
      description: 'Если госорганы не решили проблему — последний шаг это обращение в суд.',
      details: [
        'Иск подаётся по месту жительства истца или по месту нахождения ответчика',
        'Госпошлина по делам о защите прав потребителей часто не взимается или минимальна',
        'Можно требовать не только возврат денег, но и компенсацию морального вреда',
        'Срок исковой давности — обычно 3 года с момента нарушения прав',
        'Рекомендуется приложить все доказательства: претензию, ответы, экспертизы',
      ],
    },
  ],
  kk: [
    {
      title: '1. Дәлелдерді жинаңыз',
      description: 'Мәселеңізді растайтын барлық құжаттар мен материалдарды жинаңыз.',
      details: [
        'Чек немесе тапсырыс растамасы (маркетплейс жеке кабинетінен скриншот)',
        'Тауар фотолары — жалпы көрініс, ақаулар, қаптама, белгілер',
        'Қаптаманы ашудың бейнежазбасы (болса) — әсіресе зақымдалғанда немесе жалған болғанда',
        'Сатушымен және маркетплейс қолдау қызметімен хат-хабар скриншоттары',
        'Трек-нөмір және жеткізу туралы ақпарат',
        'Сарапшы немесе сервис орталығының қорытындысы (болса)',
      ],
    },
    {
      title: '2. Шағым қалыптастырыңыз',
      description: '«Шағым жасау» бетін пайдаланыңыз — жүйе заңдар мен баптарды өздігінен анықтайды.',
      details: [
        'Өзіңіз туралы, тапсырыс туралы деректерді толтырып, мәселені сипаттаңыз',
        'AI еліңіздің қолданылатын заңнамасын анықтайды',
        'Дайын шағымды PDF немесе DOCX форматта жүктеп алуға болады',
        'Жібермес бұрын барлық деректерді тексеріңіз — әсіресе Т.А.Ә., мекенжай және реквизиттер',
      ],
    },
    {
      title: '3. Шағымды жіберіңіз',
      description: 'Шағымды сатушыға және/немесе маркетплейсқа мына тәсілдердің бірімен жіберіңіз:',
      details: [
        'Маркетплейс жеке кабинетіндегі өтініш нысаны арқылы (растау скриншоты)',
        'Сатушының заңды мекенжайына хабарлама арқылы тіркелген хатпен',
        'Маркетплейстің ресми поштасына электронды хатпен',
        'Маркетплейс қосымшасындағы сатушымен чат арқылы (хат-хабарды сақтаумен)',
        'Жіберу растамасын міндетті түрде сақтаңыз — хат нөмірі, скриншот, квитанция',
      ],
    },
    {
      title: '4. Жауапты күтіңіз',
      description: 'Заң бойынша сатушының жауап беру мерзімі бар. Мерзімдер елге байланысты:',
      details: [
        'Қазақстан — 10 күн (ҚР «Тұтынушылар құқықтарын қорғау туралы» заңы)',
        'Ресей — 10 күн (РФ «Тұтынушылар құқықтарын қорғау туралы» заңы, 22-бап)',
        'Өзбекстан — 10 күн (ӨР «Тұтынушылар құқықтарын қорғау туралы» заңы)',
        'Қырғызстан — 10 күн (ҚР «Тұтынушылар құқықтарын қорғау туралы» заңы)',
        'Беларусь — 14 күн (РБ «Тұтынушылар құқықтарын қорғау туралы» заңы)',
        'Армения — 10 күн (РА «Тұтынушылар құқықтарын қорғау туралы» заңы)',
        'Әзірбайжан — 10 күн (АР «Тұтынушылар құқықтарын қорғау туралы» заңы)',
        'Молдова — 14 күн (РМ тұтынушылар құқықтарын қорғау туралы заңы)',
        'Тәжікстан — 10 күн (РТ «Тұтынушылар құқықтарын қорғау туралы» заңы)',
        'Түрікменстан — 10 күн (ТМ тұтынушылар құқықтарын қорғау туралы заңы)',
      ],
    },
    {
      title: '5. Мемлекеттік органдарға жүгініңіз',
      description: 'Сатушы жауап бермесе немесе бас тартса — еліңіздің мемлекеттік органына шағым беріңіз.',
      details: [
        'Қазақстан — Тұтынушылар құқықтарын қорғау комитеті, eGov.kz, eOtinish, 1506 қоңырауы',
        'Ресей — Роспотребнадзор (rospotrebnadzor.ru), тұрғылықты жері бойынша сот',
        'Өзбекстан — ӨР Экономика министрлігі жанындағы Тұтынушылар құқықтарын қорғау комитеті',
        'Қырғызстан — ҚР Экономика министрлігі жанындағы Тұтынушылар құқықтарын қорғау департаменті',
        'Беларусь — РБ Монополияға қарсы реттеу және сауда министрлігі',
        'Армения — РА Экономика министрлігінің Тұтынушылар құқықтарын қорғау комитеті',
        'Әзірбайжан — АР Экономика министрлігі, Тұтынушылар құқықтарын қорғау департаменті',
        'Молдова — Тұтынушылар құқықтарын қорғау ұлттық орталығы',
        'Тәжікстан — РТ Үкіметі жанындағы Монополияға қарсы қызмет',
        'Түрікменстан — ТМ Сауда және сыртқы экономикалық байланыс министрлігі',
      ],
    },
    {
      title: '6. Сотқа жүгініңіз',
      description: 'Мемлекеттік органдар мәселені шешпесе — соңғы қадам сотқа жүгіну.',
      details: [
        'Дауыс іздеушінің тұрғылықты жері немесе жауаптың орналасқан жері бойынша беріледі',
        'Тұтынушылар құқықтарын қорғау істері бойынша мемлекеттік баж алынбайды немесе минималды',
        'Ақшаны қайтаруды ғана емес, моральдық зиянды өтеуді де талап етуге болады',
        'Даулы талап ету мерзімі — әдетте құқықтар бұзылған сәттен 3 жыл',
        'Барлық дәлелдерді тіркеу ұсынылады: шағым, жауаптар, сараптамалар',
      ],
    },
  ],
  en: [
    {
      title: '1. Gather evidence',
      description: 'Collect all documents and materials that confirm your problem.',
      details: [
        'Receipt or order confirmation (screenshot from marketplace account)',
        'Photos of the product — overall view, defects, packaging, tags',
        'Unboxing video (if available) — especially for damage or counterfeit',
        'Screenshots of correspondence with seller and marketplace support',
        'Tracking number and delivery information',
        'Expert or service center report (if available)',
      ],
    },
    {
      title: '2. Generate a claim',
      description: 'Use the "Create claim" tab — the system will determine the laws and articles.',
      details: [
        'Fill in your details, order info, and describe the problem',
        'AI will determine the applicable legislation for your country',
        'The finished claim can be downloaded as PDF or DOCX',
        'Check all details before sending — especially name, address, and credentials',
      ],
    },
    {
      title: '3. Send the claim',
      description: 'Send the claim to the seller and/or marketplace using one of these methods:',
      details: [
        'Through the complaints form in your marketplace account (screenshot confirmation)',
        'By registered mail with delivery confirmation to the seller\'s legal address',
        'By email to the marketplace\'s official email',
        'Through the seller chat in the marketplace app (saving the conversation)',
        'Be sure to save proof of sending — mail tracking number, screenshot, receipt',
      ],
    },
    {
      title: '4. Wait for a response',
      description: 'By law, the seller has a deadline to respond. Deadlines depend on the country:',
      details: [
        'Kazakhstan — 10 days (Law of RK "On Consumer Rights Protection")',
        'Russia — 10 days (Law of RF "On Consumer Rights Protection", Art. 22)',
        'Uzbekistan — 10 days (Law of RUz "On Consumer Rights Protection")',
        'Kyrgyzstan — 10 days (Law of KR "On Consumer Rights Protection")',
        'Belarus — 14 days (Law of RB "On Consumer Rights Protection")',
        'Armenia — 10 days (Law of RA "On Consumer Rights Protection")',
        'Azerbaijan — 10 days (Law of AR "On Consumer Rights Protection")',
        'Moldova — 14 days (Law of RM on Consumer Rights Protection)',
        'Tajikistan — 10 days (Law of RT "On Consumer Rights Protection")',
        'Turkmenistan — 10 days (Law of TM on Consumer Rights Protection)',
      ],
    },
    {
      title: '5. Contact government authorities',
      description: 'If the seller did not respond or refused — file a complaint with your country\'s government body.',
      details: [
        'Kazakhstan — Committee for Consumer Rights Protection, eGov.kz, eOtinish, call 1506',
        'Russia — Rospotrebnadzor (rospotrebnadzor.ru), court at place of residence',
        'Uzbekistan — Committee for Consumer Rights Protection under Ministry of Economy',
        'Kyrgyzstan — Department of Consumer Rights Protection under Ministry of Economy',
        'Belarus — Ministry of Antimonopoly Regulation and Trade',
        'Armenia — Committee for Consumer Rights Protection of Ministry of Economy',
        'Azerbaijan — Ministry of Economy, Department of Consumer Rights Protection',
        'Moldova — National Center for Consumer Rights Protection',
        'Tajikistan — Antimonopoly Service under the Government',
        'Turkmenistan — Ministry of Trade and Foreign Economic Relations',
      ],
    },
    {
      title: '6. Go to court',
      description: 'If government bodies did not solve the problem — the last step is going to court.',
      details: [
        'The lawsuit is filed at the plaintiff\'s place of residence or the defendant\'s location',
        'Court fees for consumer protection cases are often waived or minimal',
        'You can demand not only a refund but also compensation for moral damage',
        'The statute of limitations is usually 3 years from the violation date',
        'It is recommended to attach all evidence: claim, responses, expert reports',
      ],
    },
  ],
}

export const TRANSBORDER_TIPS_I18N: Record<Lang, string[]> = {
  ru: [
    'Если маркетплейс зарегистрирован в другой стране — спор считается трансграничным',
    'В этом случае претензия направляется в представительство маркетплейса в вашей стране',
    'Если представительства нет — жалоба подаётся в госорган вашей страны с указанием иностранного продавца',
    'Для AliExpress, Temu, SHEIN и других зарубежных площадок — открывайте спор внутри платформы и параллельно пишите в госорган',
    'Возврат денег через банк: если платили картой — можно инициировать chargeback (возврат платежа) через банк',
  ],
  kk: [
    'Маркетплейс басқа елде тіркелген болса — дау трансшекаралық деп саналады',
    'Бұл жағдайда шағым еліңіздегі маркетплейстің өкілдігіне жіберіледі',
    'Өкілдік болмаса — шағым еліңіздің мемлекеттік органына шетелдік сатушыны көрсете отырып беріледі',
    'AliExpress, Temu, SHEIN және басқа шетелдік платформалар үшін — платформа ішінде дау ашыңыз және параллель мемлекеттік органға жазыңыз',
    'Банк арқылы ақшаны қайтару: картамен төлеген болсаңыз — банк арқылы chargeback (төлемді қайтару) бастауға болады',
  ],
  en: [
    'If the marketplace is registered in another country — the dispute is considered cross-border',
    'In this case, the claim is sent to the marketplace\'s representative office in your country',
    'If there is no representative office — the complaint is filed with your country\'s government body, indicating the foreign seller',
    'For AliExpress, Temu, SHEIN and other foreign platforms — open a dispute within the platform and simultaneously write to the government body',
    'Bank refund: if you paid by card — you can initiate a chargeback through your bank',
  ],
}

export type KzService = { title: string; description: string; url: string; category: string }

export const KZ_SERVICES_I18N: Record<Lang, KzService[]> = {
  ru: [
    { title: 'eGov.kz', description: 'Портал государственных услуг Республики Казахстан — справки, обращения, жалобы.', url: 'https://www.egov.kz/', category: 'general' },
    { title: 'eOtinish', description: 'Мобильное приложение для подачи обращений в государственные органы РК.', url: 'https://eotinish.kz/', category: 'general' },
    { title: 'Комитет по защите прав потребителей МНЭ РК', description: 'Государственный орган по защите прав потребителей Казахстана. Приём обращений и жалоб.', url: 'https://www.gov.kz/memleket/entities/mne', category: 'consumer' },
    { title: 'QazTrade — Комитет торгов РК', description: 'Регулирование внутренней торговли и защита прав потребителей в Казахстане.', url: 'https://qaztrade.gov.kz/', category: 'consumer' },
    { title: 'Антимонопольный комитет РК', description: 'Защита конкуренции и противодействие недобросовестной конкуренции, включая контрафакт.', url: 'https://qaztrade.gov.kz/', category: 'counterfeit' },
    { title: 'Портал полиции РК', description: 'Заявления о мошенничестве, контрафакте и других правонарушениях со стороны продавцов.', url: 'https://police.kz/', category: 'counterfeit' },
    { title: '1506 — Колл-центр по защите прав потребителей', description: 'Единый номер для обращений по вопросам защиты прав потребителей в Казахстане.', url: 'tel:1506', category: 'consumer' },
  ],
  kk: [
    { title: 'eGov.kz', description: 'Қазақстан Республикасының мемлекеттік қызметтер портылы — анықтамалар, өтініштер, шағымдар.', url: 'https://www.egov.kz/', category: 'general' },
    { title: 'eOtinish', description: 'РК мемлекеттік органдарына өтініш беру үшін мобильді қосымша.', url: 'https://eotinish.kz/', category: 'general' },
    { title: 'Тұтынушылар құқықтарын қорғау комитеті', description: 'Қазақстанның тұтынушы құқықтарын қорғау жөніндегі мемлекеттік орган. Өтініштер мен шағымдар қабылдау.', url: 'https://www.gov.kz/memleket/entities/mne', category: 'consumer' },
    { title: 'QazTrade — РК Сауда комитеті', description: 'Ішкі сауданы реттеу және Қазақстанда тұтынушы құқықтарын қорғау.', url: 'https://qaztrade.gov.kz/', category: 'consumer' },
    { title: 'РК Антимонополиялық комитеті', description: 'Бәсекелестікті қорғау және контрафактты қоса, жаман ниетті бәсекеге қарсы күрес.', url: 'https://qaztrade.gov.kz/', category: 'counterfeit' },
    { title: 'РК Полиция портылы', description: 'Сатушылардың құқықбұзушылықтары, контрафакт және құқықбұзушылық туралы өтініштер.', url: 'https://police.kz/', category: 'counterfeit' },
    { title: '1506 — Тұтынушы құқықтарын қорғау қоңырау орталығы', description: 'Қазақстанда тұтынушы құқықтарын қорғау мәселелері бойынша өтініштер үшін бірыңғай нөмір.', url: 'tel:1506', category: 'consumer' },
  ],
  en: [
    { title: 'eGov.kz', description: 'Portal of government services of the Republic of Kazakhstan — references, submissions, complaints.', url: 'https://www.egov.kz/', category: 'general' },
    { title: 'eOtinish', description: 'Mobile app for submitting appeals to government bodies of the RK.', url: 'https://eotinish.kz/', category: 'general' },
    { title: 'Committee for Consumer Rights Protection', description: 'Government body for consumer rights protection in Kazakhstan. Accepts submissions and complaints.', url: 'https://www.gov.kz/memleket/entities/mne', category: 'consumer' },
    { title: 'QazTrade — Trade Committee of RK', description: 'Regulation of domestic trade and consumer rights protection in Kazakhstan.', url: 'https://qaztrade.gov.kz/', category: 'consumer' },
    { title: 'Antimonopoly Committee of RK', description: 'Protection of competition and countering unfair competition, including counterfeit.', url: 'https://qaztrade.gov.kz/', category: 'counterfeit' },
    { title: 'Police Portal of RK', description: 'Reports of fraud, counterfeit, and other offenses by sellers.', url: 'https://police.kz/', category: 'counterfeit' },
    { title: '1506 — Consumer Rights Protection Hotline', description: 'Unified number for consumer rights protection inquiries in Kazakhstan.', url: 'tel:1506', category: 'consumer' },
  ],
}

export type KzTimelineItem = { step: number; title: string; description: string }

export const KZ_TIMELINE_I18N: Record<Lang, KzTimelineItem[]> = {
  ru: [
    { step: 1, title: 'Скачать готовую претензию', description: 'Сформируйте и скачайте претензию во вкладке «Создать претензию».' },
    { step: 2, title: 'Приложить доказательства', description: 'Соберите чек, фото товара, видео, переписку с продавцом и другие доказательства.' },
    { step: 3, title: 'Направить претензию', description: 'Отправьте претензию продавцу и/или маркетплейсу (заказным письмом, через личный кабинет или курьером).' },
    { step: 4, title: 'Обратиться в официальный орган', description: 'Если вопрос не решён — подайте обращение через eGov, eOtinish или Комитет по защите прав потребителей.' },
    { step: 5, title: 'Сохранить подтверждение', description: 'Сохраните все подтверждения обращения: уведомления о вручении, номера обращений, ответы.' },
  ],
  kk: [
    { step: 1, title: 'Дайын шағымды жүктеп алу', description: '«Шағым жасау» бетінде шағым қалыптастырып, жүктеп алыңыз.' },
    { step: 2, title: 'Дәлелдерді тіркеу', description: 'Чек, тауар фотолары, видео, сатушымен хат-хабарды және басқа дәлелдерді жинаңыз.' },
    { step: 3, title: 'Шағымды жіберу', description: 'Шағымды сатушыға және/немесе маркетплейсқа жіберіңіз (тіркелген хатпен, жеке кабинет арқылы немесе курьермен).' },
    { step: 4, title: 'Ресми органға жүгіну', description: 'Мәселе шешілмесе — eGov, eOtinish немесе Тұтынушы құқықтарын қорғау комитеті арқылы өтініш беріңіз.' },
    { step: 5, title: 'Растаманы сақтау', description: 'Барлық өтініш растамаларын сақтаңыз: хабарламалар, өтініш нөмірлері, жауаптар.' },
  ],
  en: [
    { step: 1, title: 'Download the finished claim', description: 'Generate and download the claim in the "Create claim" tab.' },
    { step: 2, title: 'Attach evidence', description: 'Gather the receipt, product photos, video, correspondence with the seller, and other evidence.' },
    { step: 3, title: 'Send the claim', description: 'Send the claim to the seller and/or marketplace (by registered mail, through your account, or by courier).' },
    { step: 4, title: 'Contact the official body', description: 'If the issue is not resolved — submit an appeal through eGov, eOtinish, or the Committee for Consumer Rights Protection.' },
    { step: 5, title: 'Save confirmation', description: 'Save all confirmation of submission: delivery notifications, submission numbers, responses.' },
  ],
}

export type HowToStep = { title: string; text: string }

export const HOW_TO_STEPS_I18N: Record<Lang, HowToStep[]> = {
  ru: [
    { title: 'Опишите проблему', text: 'Расскажите, что произошло с вашим заказом — своими словами.' },
    { title: 'Укажите данные', text: 'Введите информацию о себе, заказе и маркетплейсе.' },
    { title: 'Получите анализ', text: 'AI проанализирует ситуацию и объяснит возможные действия.' },
    { title: 'Получите претензию', text: 'Система автоматически подготовит готовую претензию со ссылками на закон.' },
    { title: 'Скачайте и отправьте', text: 'Скачайте PDF/DOCX или используйте готовый текст для отправки продавцу, маркетплейсу или официальному сервису.' },
  ],
  kk: [
    { title: 'Мәселені сипаттаңыз', text: 'Тапсырысыңызбен не болғанын өз сөзіңізбен айтыңыз.' },
    { title: 'Деректерді көрсетіңіз', text: 'Өзіңіз, тапсырыс және маркетплейс туралы ақпаратты енгізіңіз.' },
    { title: 'Талдау алыңыз', text: 'AI жағдайды талдап, мүмкін болатын әрекеттерді түсіндіреді.' },
    { title: 'Шағым алыңыз', text: 'Жүйе заңға сілтемелермен дайын шағымды автоматты түрде дайындайды.' },
    { title: 'Жүктеп алып, жіберіңіз', text: 'PDF/DOCX жүктеп алыңыз немесе дайын мәтінді сатушыға, маркетплейсқа немесе ресми қызметке жіберіңіз.' },
  ],
  en: [
    { title: 'Describe the problem', text: 'Tell us what happened with your order — in your own words.' },
    { title: 'Provide details', text: 'Enter information about yourself, your order, and the marketplace.' },
    { title: 'Get analysis', text: 'AI will analyze the situation and explain possible actions.' },
    { title: 'Get your claim', text: 'The system will automatically prepare a finished claim with legal references.' },
    { title: 'Download and send', text: 'Download PDF/DOCX or use the ready text to send to the seller, marketplace, or official service.' },
  ],
}

export const QUICK_BUTTONS_I18N: Record<Lang, string[]> = {
  ru: ['Вернуть товар', 'Мне отказали в возврате', 'Товар оказался бракованным', 'Похоже на подделку', 'Получил другой товар', 'Товар не пришёл', 'Продавец не отвечает', 'Не знаю, что делать'],
  kk: ['Тауарды қайтару', 'Қайтаруға бас тартты', 'Тауар ақаулы болды', 'Жалған сияқты', 'Басқа тауар келді', 'Тауар келмеді', 'Сатушы жауап бермейді', 'Не істеуімді білмеймін'],
  en: ['Return product', 'Return was refused', 'Product was defective', 'Looks like a fake', 'Got wrong item', 'Product did not arrive', 'Seller not responding', "I don't know what to do"],
}

export const HINT_BUTTONS_I18N: Record<Lang, string[]> = {
  ru: ['Что это означает?', 'Что делать дальше?', 'Какие доказательства нужны?', 'Куда обратиться?'],
  kk: ['Бұл нені білдіреді?', 'Одан әрі не істеу?', 'Қандай дәлелдер керек?', 'Қайда жүгіну?'],
  en: ['What does this mean?', 'What to do next?', 'What evidence is needed?', 'Where to go?'],
}

export function getProblemLabel(type: ProblemType, lang: Lang): string {
  return PROBLEM_LABELS_I18N[type]?.[lang] ?? PROBLEM_LABELS_I18N[type]?.ru ?? type
}
