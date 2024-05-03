import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserFormModel } from 'src/app/services/response-models/authentication/userFormModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent extends BaseComponent implements OnInit, OnDestroy {

  public userData!: UserFormModel;

  private readonly _authService: AuthenticationService;

  private _getUserDataSubscription!: Subscription;

  constructor(
    langugageService: LanguageService,
    authService: AuthenticationService
  ) {
    super(langugageService);
    this._authService = authService;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this._getUserDataSubscription = this._authService.getUserData().subscribe({
      next: (result: UserFormModel) => {
        this.userData = result;
      }
    })
  }

  public override ngOnDestroy(): void {
    this._getUserDataSubscription.unsubscribe();
  }

  public onFileSelected(event: any): void {
    console.log(event);
  }
}
