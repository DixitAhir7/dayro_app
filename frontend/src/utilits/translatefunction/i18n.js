import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '/public/langs/en.json';
import gu from '/public/langs/gu.json';

// use trans for links and html tags

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gu: { translation: gu }
    },
    Suspense: 'false',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;