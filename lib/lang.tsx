'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'ru' | 'kk' | 'en'

export const LANG_NAMES: Record<Lang, string> = {
  ru: 'Русский',
  kk: 'Қазақша',
  en: 'English',
}

export const LANG_FLAGS: Record<Lang, string> = {
  ru: '🇷🇺',
  kk: '🇰🇿',
  en: '🇬🇧',
}

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  ru: {
    'app.title': 'Jardem AI',
    'nav.home': 'Главная',
    'nav.create': 'Создать претензию',
    'nav.ai': 'AI-помощник',
    'nav.whatToDo': 'Что делать?',
    'nav.kazakhstan': '🇰🇿 Казахстан',
    'nav.marketplaces': 'Маркетплейсы',
    'nav.statistics': 'Статистика',
    'nav.feedback': 'Отзывы',
    'nav.howToUse': 'Как пользоваться?',
    'home.title': 'Поможем составить претензию к маркетплейсу',
    'home.subtitle': 'Введите только факты о себе, заказе и проблеме. Система сама сформирует полную готовую претензию со ссылками на закон — вам останется только скачать и отправить.',
    'home.cta': 'Составить претензию',
    'ai.title': 'AI-помощник по маркетплейсам',
    'ai.subtitle': 'Опишите проблему своими словами — я объясню, что делать дальше.',
    'ai.placeholder': 'Напишите, что произошло...',
    'ai.send': 'Получить помощь',
    'dict.title': 'Юридический словарь',
    'dict.search': 'Найти термин...',
    'dict.empty': 'Ничего не найдено',
    'dict.subtitle': 'Сложные термины — простыми словами. Найдите нужный термин или выберите категорию.',
  },
  kk: {
    'app.title': 'Jardem AI',
    'nav.home': 'Басты бет',
    'nav.create': 'Шағым жасау',
    'nav.ai': 'AI-көмекші',
    'nav.whatToDo': 'Не істеу керек?',
    'nav.kazakhstan': '🇰🇿 Қазақстан',
    'nav.marketplaces': 'Маркетплейстар',
    'nav.statistics': 'Статистика',
    'nav.feedback': 'Пікірлер',
    'nav.howToUse': 'Сайтты қалай пайдалану?',
    'home.title': 'Маркетплейсқа шағым жасауға көмектесеміз',
    'home.subtitle': 'Өзіңіз туралы, тапсырыс туралы және мәселе туралы фактілерді ғана енгізіңіз. Жүйе заңға сілтемелермен дайын шағымды өздігінен жасайды — сізге тек жүктеп алып, жіберіу қалады.',
    'home.cta': 'Шағым жасау',
    'ai.title': 'Маркетплейстер бойынша AI-көмекші',
    'ai.subtitle': 'Мәселеңізді өз сөзіңізбен сипаттаңыз — мен не істеу керектігін түсіндіремін.',
    'ai.placeholder': 'Не болғанын жазыңыз...',
    'ai.send': 'Көмек алу',
    'dict.title': 'Құқықтық сөздік',
    'dict.search': 'Терминді табу...',
    'dict.empty': 'Ештеңе табылмады',
    'dict.subtitle': 'Күрделі терминдерді — қарапайым сөздермен. Қажет терминді табыңыз немесе санатты таңдаңыз.',
  },
  en: {
    'app.title': 'Jardem AI',
    'nav.home': 'Home',
    'nav.create': 'Create claim',
    'nav.ai': 'AI assistant',
    'nav.whatToDo': 'What to do?',
    'nav.kazakhstan': '🇰🇿 Kazakhstan',
    'nav.marketplaces': 'Marketplaces',
    'nav.statistics': 'Statistics',
    'nav.feedback': 'Reviews',
    'nav.howToUse': 'How to use?',
    'home.title': 'We help you draft a marketplace claim',
    'home.subtitle': 'Enter only the facts about yourself, your order, and the problem. The system will generate a complete claim with legal references — you just download and send it.',
    'home.cta': 'Create a claim',
    'ai.title': 'AI marketplace assistant',
    'ai.subtitle': 'Describe your problem in your own words — I will explain what to do next.',
    'ai.placeholder': 'Write what happened...',
    'ai.send': 'Get help',
    'dict.title': 'Legal dictionary',
    'dict.search': 'Find a term...',
    'dict.empty': 'Nothing found',
    'dict.subtitle': 'Complex terms — in simple words. Find a term or choose a category.',
  },
}

const LangContext = createContext<Ctx>({
  lang: 'ru',
  setLang: () => {},
  t: (key) => key,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')

  function t(key: string) {
    return TRANSLATIONS[lang][key] ?? TRANSLATIONS.ru[key] ?? key
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
