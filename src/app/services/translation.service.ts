import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Inject } from "@angular/core";
import { catchError, map, Observable, of, shareReplay } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

interface LiteralElement {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly LOCAL_STORAGE_LANG_KEY = 'langForms';
  private _currentLanguage$ = new BehaviorSubject<string>(this.getInitialLang());
  private _loadedFileCache: {[key: string]: Observable<LiteralElement>}={};

  private http = inject(HttpClient);



  private getInitialLang(): string {
    return localStorage.getItem(this.LOCAL_STORAGE_LANG_KEY) || 'es';
  }

  setLang(lang: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_LANG_KEY, lang);
    this._currentLanguage$.next(lang);
  }

  getLang(){
    return this._currentLanguage$.value;
  }

  getValue(key: string): Observable<string | undefined> {
    return this._loadTranslations(this._currentLanguage$.value).pipe(
      map(translations => translations?.[key])
    );
  }

  private _loadTranslations(lang: string): Observable<LiteralElement> {
    if (!this._loadedFileCache[lang]) {
      this._loadedFileCache[lang] = this.http.get<LiteralElement>(`assets/i18n/${lang}.json`).pipe(
        catchError(error => {
          console.error(`Error loading translations in ${lang}:`, error);
          return of({});
        }),
        shareReplay(1)
      );
    }
    return this._loadedFileCache[lang];
  }
}