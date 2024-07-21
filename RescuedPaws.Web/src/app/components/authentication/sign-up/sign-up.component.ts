import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { BaseComponent } from '../../shared/base/base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/utilities/validators/password-match.validator';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends BaseComponent implements OnInit {
  public form!: FormGroup;

  @Output() public onSignInClick: EventEmitter<void> = new EventEmitter<void>();

  protected authService: AuthenticationService;

  /**
   * Creates an instance of SignUpComponent.
   * @param languageService Service for language operations.
   * @param authService Service for authentication operations.
   */
  constructor(languageService: LanguageService, authService: AuthenticationService) {
    super(languageService);
    this.authService = authService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
  }

  /**
   * Emits an event to signal sign-in click.
   */
  public signIn(): void {
    this.onSignInClick.emit();
  }

  /**
   * Registers a new user using the authentication service.
   */
  public register(): void {
    const authRequest = {
      username: this.form.get('usernameControl')?.value,
      email: this.form.get('emailControl')?.value,
      password: this.form.get('passwordControl')?.value
    };

    this.authService.register(authRequest);
  }

  /**
   * Builds the reactive form.
   */
  private buildForm(): void {
    this.form = new FormGroup({
      usernameControl: new FormControl('', Validators.required),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passwordControl: new FormControl('', Validators.required),
      confirmPasswordControl: new FormControl('', Validators.required)
    }, { validators: passwordMatchValidator() });
  }
}
