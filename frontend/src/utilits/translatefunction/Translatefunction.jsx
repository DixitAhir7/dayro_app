import { useTranslation } from 'react-i18next';

export default function useSmartTranslate() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language

  const translate = (key, fallback) => {
    return lang === 'en' ? fallback : t(key || {});
  };

  return translate;
};