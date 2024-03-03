import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rp-layout',
  templateUrl: './rp-layout.component.html',
  styleUrls: ['./rp-layout.component.css']
})
export class RpLayoutComponent implements OnInit{

  public selectedLanguage: string = 'bg';

  @Output()
  public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.selectedLanguage = 'bg';
  }

  public changeLanguage(): void {
    if(this.selectedLanguage === 'bg') {
      this.selectedLanguage = 'en';
    }
    else{
      this.selectedLanguage = 'bg';
    } 

    this.onLanguageSelect.emit(this.selectedLanguage);
  }
}
