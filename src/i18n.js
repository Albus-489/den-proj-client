import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import fiTranslations from './locales/fi.json';

// Инициализация i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations
    },
    fi: {
      translation: fiTranslations
    }
  },
  lng: 'en', // Язык по умолчанию
  fallbackLng: 'en', // Язык, используемый при отсутствии перевода
  interpolation: {
    escapeValue: false // React уже экранирует значения
  }
});

export default i18n;
