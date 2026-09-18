export type Lang = 'ru' | 'kk' | 'en'
export type Jurisdiction = 'kz' | 'cis'
export type ProblemType = 'defect' | 'counterfeit' | 'delay' | 'refusal'

export const LANGS: { id: Lang; label: string }[] = [
  { id: 'ru', label: 'RU' },
  { id: 'kk', label: 'KZ' },
  { id: 'en', label: 'EN' },
]

// Marker the API uses to signal a streamed error to the client.
export const ERROR_SENTINEL = '\u0000__V0_ERROR__\u0000'

export const MARKETPLACES: Record<Jurisdiction, string[]> = {
  kz: ['Kaspi', 'Halyk Market', 'Wildberries', 'Ozon', 'AliExpress'],
  cis: ['Wildberries', 'Ozon', 'Yandex Market', 'AliExpress', 'Kaspi', 'Uzum'],
}

type ProblemCopy = { label: string; description: string }

type Dict = {
  langName: string
  header: { title: string; subtitle: string }
  jurisdiction: {
    legend: string
    kz: { label: string; description: string }
    cis: { label: string; description: string }
  }
  step1: { title: string; marketplace: string; problemLegend: string }
  problems: Record<ProblemType, ProblemCopy>
  step2: { title: string; placeholder: string; srLabel: string }
  countryLabel: string
  countryPlaceholder: string
  buttons: { claim: string; consult: string }
  result: {
    title: string
    copy: string
    copied: string
    download: string
    emptyTitle: string
    empty: string
    loadingKz: string
    loadingCis: string
  }
  error: string
  billingError: string
  footerKz: string
  footerCis: string
}

export const T: Record<Lang, Dict> = {
  ru: {
    langName: 'Русский',
    header: {
      title: 'Защита прав потребителей на маркетплейсах',
      subtitle:
        'Конструктор юридических претензий к Kaspi, Wildberries, Ozon и другим площадкам. Выберите юрисдикцию и язык.',
    },
    jurisdiction: {
      legend: 'Юрисдикция',
      kz: {
        label: 'Казахстан (РК)',
        description:
          'Строго Закон РК «О защите прав потребителей», ГК РК и Правила электронной торговли РК.',
      },
      cis: {
        label: 'СНГ и трансграничные покупки',
        description:
          'Для жителей РФ и соседних стран: законы о защите прав потребителей РФ, стран ЕАЭС/СНГ и правила трансграничной торговли.',
      },
    },
    step1: {
      title: 'Выберите площадку и проблему',
      marketplace: 'Маркетплейс',
      problemLegend: 'Тип проблемы',
    },
    problems: {
      defect: {
        label: 'Возврат брака',
        description: 'Товар оказался некачественным или сломанным',
      },
      counterfeit: {
        label: 'Контрафакт',
        description: 'Подделка вместо оригинального товара',
      },
      delay: {
        label: 'Просрочка доставки',
        description: 'Товар не доставлен в оговорённый срок',
      },
      refusal: {
        label: 'Отказ в возврате',
        description: 'Не принимают качественный товар в установленный срок',
      },
    },
    step2: {
      title: 'Опишите ситуацию',
      placeholder:
        'Например: 5 марта заказал телефон за 250 000 тг. При получении экран оказался с трещиной. Продавец отказывается принимать возврат…',
      srLabel: 'Описание ситуации',
    },
    countryLabel: 'Ваша страна',
    countryPlaceholder: 'Например: Россия, Кыргызстан, Узбекистан…',
    buttons: { claim: 'Сформировать претензию', consult: 'Проконсультироваться' },
    result: {
      title: 'Результат',
      copy: 'Копировать текст',
      copied: 'Скопировано',
      download: 'Скачать (TXT)',
      emptyTitle: '',
      empty:
        'Здесь появится готовая претензия или консультация. Опишите ситуацию и нажмите кнопку ниже.',
      loadingKz: 'Формируем документ на основе законодательства РК…',
      loadingCis: 'Формируем документ с учётом трансграничного законодательства…',
    },
    error: 'Произошла ошибка при генерации. Проверьте подключение и попробуйте ещё раз.',
    billingError:
      'Генерация недоступна: в аккаунте Vercel не привязана банковская карта для AI Gateway. Владельцу проекта нужно добавить карту в разделе Vercel → AI (при этом активируются бесплатные кредиты), после чего сервис заработает.',
    footerKz:
      'Сервис формирует шаблон документа на основе законодательства РК и не заменяет консультацию квалифицированного юриста.',
    footerCis:
      'Сервис формирует шаблон с учётом законодательства РФ и стран СНГ и не заменяет консультацию квалифицированного юриста.',
  },
  kk: {
    langName: 'Қазақша',
    header: {
      title: 'Маркетплейстердегі тұтынушылар құқығын қорғау',
      subtitle:
        'Kaspi, Wildberries, Ozon және басқа алаңдарға заңдық талап-арыз құрастырғыш. Юрисдикция мен тілді таңдаңыз.',
    },
    jurisdiction: {
      legend: 'Юрисдикция',
      kz: {
        label: 'Қазақстан (ҚР)',
        description:
          'Тек ҚР «Тұтынушылардың құқықтарын қорғау туралы» Заңы, ҚР АК және электрондық сауда қағидалары.',
      },
      cis: {
        label: 'ТМД және трансшекаралық сатып алулар',
        description:
          'РФ мен көрші елдердің тұрғындарына арналған: РФ, ЕАЭО/ТМД елдерінің тұтынушы құқықтары туралы заңдары.',
      },
    },
    step1: {
      title: 'Алаң мен мәселені таңдаңыз',
      marketplace: 'Маркетплейс',
      problemLegend: 'Мәселе түрі',
    },
    problems: {
      defect: {
        label: 'Ақаулы тауарды қайтару',
        description: 'Тауар сапасыз немесе бұзылған болып шықты',
      },
      counterfeit: {
        label: 'Контрафакт',
        description: 'Түпнұсқа орнына жалған тауар',
      },
      delay: {
        label: 'Жеткізу мерзімінің бұзылуы',
        description: 'Тауар келісілген мерзімде жеткізілмеді',
      },
      refusal: {
        label: 'Қайтарудан бас тарту',
        description: 'Сапалы тауарды белгіленген мерзімде қабылдамайды',
      },
    },
    step2: {
      title: 'Жағдайды сипаттаңыз',
      placeholder:
        'Мысалы: 5 наурызда 250 000 тг телефон тапсырыс бердім. Алған кезде экран жарылған болып шықты. Сатушы қайтаруды қабылдаудан бас тартады…',
      srLabel: 'Жағдай сипаттамасы',
    },
    countryLabel: 'Сіздің еліңіз',
    countryPlaceholder: 'Мысалы: Ресей, Қырғызстан, Өзбекстан…',
    buttons: { claim: 'Талап-арыз құру', consult: 'Кеңес алу' },
    result: {
      title: 'Нәтиже',
      copy: 'Мәтінді көшіру',
      copied: 'Көшірілді',
      download: 'Жүктеу (TXT)',
      emptyTitle: '',
      empty:
        'Мұнда дайын талап-арыз немесе кеңес пайда болады. Жағдайды сипаттап, төмендегі батырманы басыңыз.',
      loadingKz: 'ҚР заңнамасы негізінде құжат дайындалуда…',
      loadingCis: 'Трансшекаралық заңнаманы ескере отырып құжат дайындалуда…',
    },
    error: 'Құру кезінде қате пайда болды. Байланысты тексеріп, қайталап көріңіз.',
    billingError:
      'Генерация қолжетімсіз: Vercel аккаунтында AI Gateway үшін банк картасы тіркелмеген. Жоба иесі Vercel → AI бөлімінде карта қосуы қажет (сол кезде тегін кредиттер іске қосылады), содан кейін қызмет жұмыс істейді.',
    footerKz:
      'Қызмет ҚР заңнамасы негізінде құжат үлгісін жасайды және білікті заңгердің кеңесін алмастырмайды.',
    footerCis:
      'Қызмет РФ мен ТМД елдерінің заңнамасын ескере отырып үлгі жасайды және білікті заңгердің кеңесін алмастырмайды.',
  },
  en: {
    langName: 'English',
    header: {
      title: 'Consumer Rights Protection on Marketplaces',
      subtitle:
        'A generator of legal claims against Kaspi, Wildberries, Ozon and other platforms. Choose your jurisdiction and language.',
    },
    jurisdiction: {
      legend: 'Jurisdiction',
      kz: {
        label: 'Kazakhstan (RK)',
        description:
          'Strictly the RK Law "On Consumer Protection", the RK Civil Code and RK e-commerce rules.',
      },
      cis: {
        label: 'CIS & cross-border purchases',
        description:
          'For residents of Russia and neighboring countries: consumer protection laws of the RF, EAEU/CIS states and cross-border trade rules.',
      },
    },
    step1: {
      title: 'Choose a platform and a problem',
      marketplace: 'Marketplace',
      problemLegend: 'Problem type',
    },
    problems: {
      defect: {
        label: 'Return a defective item',
        description: 'The item arrived faulty or broken',
      },
      counterfeit: {
        label: 'Counterfeit',
        description: 'A fake was sent instead of the original',
      },
      delay: {
        label: 'Delivery delay',
        description: 'The item was not delivered within the agreed period',
      },
      refusal: {
        label: 'Refusal to accept a return',
        description: 'They refuse to take back a quality item within the term',
      },
    },
    step2: {
      title: 'Describe your situation',
      placeholder:
        'For example: On March 5 I ordered a phone for 250,000 KZT. On delivery the screen was cracked. The seller refuses to accept a return…',
      srLabel: 'Situation description',
    },
    countryLabel: 'Your country',
    countryPlaceholder: 'e.g. Russia, Kyrgyzstan, Uzbekistan…',
    buttons: { claim: 'Generate claim', consult: 'Get advice' },
    result: {
      title: 'Result',
      copy: 'Copy text',
      copied: 'Copied',
      download: 'Download (TXT)',
      emptyTitle: '',
      empty:
        'Your ready claim or consultation will appear here. Describe your situation and press a button below.',
      loadingKz: 'Building the document based on RK legislation…',
      loadingCis: 'Building the document with cross-border legislation in mind…',
    },
    error: 'An error occurred during generation. Check your connection and try again.',
    billingError:
      'Generation is unavailable: the Vercel account has no credit card on file for the AI Gateway. The project owner needs to add a card under Vercel → AI (this also unlocks free credits), after which the service will work.',
    footerKz:
      'The service generates a document template based on RK legislation and does not replace advice from a qualified lawyer.',
    footerCis:
      'The service generates a template with RF and CIS legislation in mind and does not replace advice from a qualified lawyer.',
  },
}
