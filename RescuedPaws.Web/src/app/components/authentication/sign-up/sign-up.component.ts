import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @Input()
  public selectedLanguage: string = 'bg';

  @Output()
  public onSignInClick: EventEmitter<void> = new EventEmitter<void>();

  public signIn(): void {
    this.onSignInClick.emit();
  }
}
