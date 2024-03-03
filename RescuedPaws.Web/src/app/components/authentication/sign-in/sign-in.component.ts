import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @Input()
  public selectedLanguage: string = 'bg';

  @Output()
  public onSignUpClick: EventEmitter<void> = new EventEmitter<void>();

  public signUp(): void {
    this.onSignUpClick.emit();
  }
}
