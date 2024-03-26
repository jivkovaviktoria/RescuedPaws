import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  public onSignUpClick: EventEmitter<void> = new EventEmitter<void>();

  private authService: AuthenticationService;

  constructor(languageService: LanguageService, authService: AuthenticationService) {
    super(languageService);

    this.authService = authService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.buildForm();
  }
  
  public signUp(): void {
    this.onSignUpClick.emit();
  }

  public async login(): Promise<void> {
    const authRequest = {
      email: this.form.get('emailControl')?.value,
      password: this.form.get('passwordControl')?.value
    }

    await this.authService.login(authRequest);
  }

  private buildForm(): void {
    this.form = new FormGroup({
      emailControl: new FormControl(undefined, Validators.required),
      passwordControl: new FormControl(undefined, Validators.required)
    })
  }
}
