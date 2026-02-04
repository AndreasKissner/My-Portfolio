import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAppTranslate } from './app.translate.config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
provideHttpClient(),
    provideHttpClient(),

    provideRouter(routes, withInMemoryScrolling({
        anchorScrolling: 'enabled', // Das aktiviert die #id Links
        scrollPositionRestoration: 'disabled' // Merkt sich die Scroll-Position
      })),
    ...provideAppTranslate,
  ]
};
