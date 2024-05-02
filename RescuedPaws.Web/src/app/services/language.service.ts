import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageConstants } from '../utilities/constants/common/language.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languageSource = new BehaviorSubject<string>(LanguageConstants.default);
  public currentLanguage = this.languageSource.asObservable();
  
  constructor() { }

  changeLanguage(language: string) {
    this.languageSource.next(language);
  }
}
