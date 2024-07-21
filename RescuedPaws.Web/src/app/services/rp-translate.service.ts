import { Injectable } from '@angular/core';
import { translations } from '../i18n/translations.bg';

@Injectable({
  providedIn: 'root'
})
export class RpTranslateService {
  private translations = translations;

  /**
   * Retrieves the translation for the specified key.
   * @param context The context of the translation.
   * @param lang The language of the translation.
   * @param key The key of the translation.
   * @returns The translated string if found, otherwise the key.
   */
  public getTranslation(context: string, lang: string, key: string): string {
    let result: any = this.translations[context]?.[lang];

    key.split('.').forEach(k => {
      result = result && result[k] ? result[k] : null;
    });

    return result || key;
  }
}
