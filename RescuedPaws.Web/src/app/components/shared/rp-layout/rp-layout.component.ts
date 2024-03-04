import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LanguageConstants } from 'src/app/utilities/constants/common/language.constants';

@Component({
  selector: 'rp-layout',
  templateUrl: './rp-layout.component.html',
  styleUrls: ['./rp-layout.component.css']
})
export class RpLayoutComponent implements OnInit{

  public selectedLanguage: string = LanguageConstants.default;

  @Output()
  public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();

  private languageService: LanguageService;

  constructor(languageService: LanguageService) {
    this.languageService = languageService;
  }

  ngOnInit(): void {
    this.selectedLanguage = LanguageConstants.default;
  }

  public changeLanguage(): void {
    if(this.selectedLanguage === LanguageConstants.default) {
      this.selectedLanguage = LanguageConstants.english;
    }
    else{
      this.selectedLanguage = LanguageConstants.default;
    } 

    this.languageService.changeLanguage(this.selectedLanguage);
    this.onLanguageSelect.emit(this.selectedLanguage);
  }
}
