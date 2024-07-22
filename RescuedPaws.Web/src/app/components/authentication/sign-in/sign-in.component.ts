import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { BaseComponent } from '../../shared/base/base.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends BaseComponent implements OnInit {
  public form!: FormGroup;

  @Output() public onSignUpClick: EventEmitter<void> = new EventEmitter<void>();

  protected authService: AuthenticationService;

  /**
   * Creates an instance of SignInComponent.
   * @param languageService Service for language operations.
   * @param authService Service for authentication operations.
   */
  constructor(
    languageService: LanguageService,
    authService: AuthenticationService
  ) {
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
   * Emits an event to signal sign-up click.
   */
  public signUp(): void {
    this.onSignUpClick.emit();
  }

  /**
   * Performs login operation using the authentication service.
   */
  public async login(): Promise<void> {
    const authRequest = {
      email: this.form.get('emailControl')?.value,
      password: this.form.get('passwordControl')?.value
    };

    try {
      await this.authService.login(authRequest);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, e.g., display an error message
    }
  }

  /**
   * Builds the reactive form.
   */
  private buildForm(): void {
    this.form = new FormGroup({
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passwordControl: new FormControl('', Validators.required)
    });
  }
}
