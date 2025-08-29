import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { environment } from './environments/environment';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AuthInterceptor } from './Core/interceptor/addingToken.interceptor';
import { provideQuillConfig, QuillModule } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimations(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'fr', 'de', 'guj'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      },
      loader: TranslocoHttpLoader,
    }),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // text style
          [{ header: 1 }, { header: 2 }], // headers
          [{ list: 'ordered' }, { list: 'bullet' }], // lists
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // indent
          [{ direction: 'rtl' }], // text direction

          [{ size: ['small', false, 'large', 'huge'] }], // font sizes
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // heading levels
          [{ color: [] }, { background: [] }], // text & background color
          [{ font: [] }], // font family
          [{ align: [] }], // alignment

          ['link', 'image'], // media
          ['clean'], // remove formatting
        ],
      },
    }),
  ],
};
