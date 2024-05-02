import { Injectable } from '@angular/core';
import { translations } from '../i18n/translations.bg';

@Injectable({
  providedIn: 'root'
})
export class RpTranslateService {

  private _translations = translations;

  public getTranslation(context: string, lang: string, key: string): string {
    let result: any = this._translations[context]?.[lang];

    key.split('.').forEach(k => {
      result = result && result[k] ? result[k] : null;
    });

    return result || key;
  }
}
