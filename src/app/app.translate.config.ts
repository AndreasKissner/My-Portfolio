import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';


const lang = localStorage.getItem('lang') || 'en';

export const provideAppTranslate = [
/**
 * Provides the translation service configuration using a local storage language fallback.
 */
provideTranslateService({
  fallbackLang: 'en', 
  defaultLanguage: lang,
}),

/**
 * Configures the translation loader to fetch JSON files from the specified path.
 */
provideTranslateHttpLoader({
  prefix: './i18n/', 
  suffix: '.json'
})
];