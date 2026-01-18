import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

// Wir prüfen erst den Speicher, ansonsten nehmen wir 'en' als Standard
const lang = localStorage.getItem('lang') || 'en';

export const provideAppTranslate = [
  provideTranslateService({
    fallbackLang: 'en', // Englisch als Rückfall-Ebene
    defaultLanguage: lang,
  }),
  provideTranslateHttpLoader({
    prefix: './i18n/', // Pfad bleibt wie von dir gewünscht
    suffix: '.json'
  })
];