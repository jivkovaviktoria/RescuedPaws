import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { BaseComponent } from '../../shared/base/base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/utilities/validators/password-match.validator';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit  {
  public form!: FormGroup;

  @Output()
  public onSignInClick: EventEmitter<void> = new EventEmitter<void>();

  private authService: AuthenticationService;

  constructor(languageService: LanguageService, authService: AuthenticationService) {
    super(languageService);

    this.authService = authService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.buildForm();
  }

  public signIn(): void {
    this.onSignInClick.emit();
  }

  public register(): void {
    const authRequest = {
      username: this.form.get('usernameControl')?.value,
      email: this.form.get('emailControl')?.value,
      password: this.form.get('passwordControl')?.value
    }

    this.authService.register(authRequest);
  }

  private buildForm(): void {
    this.form = new FormGroup({
      usernameControl: new FormControl(undefined, Validators.required),
      emailControl: new FormControl(undefined, Validators.required),
      passwordControl: new FormControl(undefined, Validators.required),
      confirmPasswordControl: new FormControl(undefined, Validators.required)
    }, {validators: passwordMatchValidator()});
  }
}
