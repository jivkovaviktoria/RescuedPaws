import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageConstants } from '../utilities/constants/common/language.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSource = new BehaviorSubject<string>(LanguageConstants.default);
  public currentLanguage = this.languageSource.asObservable();

  /**
   * Creates an instance of LanguageService.
   */
  constructor() { }

  /**
   * Changes the current language.
   * @param language The new language to set.
   */
  public changeLanguage(language: string): void {
    this.languageSource.next(language);
  }
}
