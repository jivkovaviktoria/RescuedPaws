import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RescuedPaws';

  public selectedLanguage: string = 'bg';
  public signUpSelected: boolean = true;
  public signInSelected: boolean = false;

  public selectLanguage(lang: string): void {
    this.selectedLanguage = lang;
  }

  public changeForm(): void {
    this.signUpSelected = !this.signUpSelected;
    this.signInSelected = !this.signInSelected;
  }

  public selectSignUp(): void {
    this.signUpSelected = true;
    this.signInSelected = false;
  }
}
