    // language.service.ts
    import { Injectable, signal } from '@angular/core';

    @Injectable({
      providedIn: 'root'
    })
    export class LanguageService {
      private _currentLanguage = signal<string>('en');

      get currentLanguage() {
        return this._currentLanguage.asReadonly();
      }

      setLanguage(lang: string) {
        this._currentLanguage.set(lang);
      }
    }