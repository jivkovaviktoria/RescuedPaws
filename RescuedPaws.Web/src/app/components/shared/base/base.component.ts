import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit, OnDestroy{
  public selectedLanguage: string = 'bg';
  private languageSubscription!: Subscription;

  private languageService: LanguageService;

  constructor(languageService: LanguageService) {
    this.languageService = languageService;
  }

  ngOnInit(): void {
    this.languageSubscription = this.languageService.currentLanguage.subscribe(
      language => this.selectedLanguage = language
    );
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
