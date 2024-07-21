import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
import { LanguageConstants } from 'src/app/utilities/constants/common/language.constants';
import { RpSidebarComponent } from '../rp-controls/rp-sidebar/rp-sidebar.component';
import { MatDialog } from '@angular/material/dialog';
import { RpDialogComponent } from '../rp-controls/rp-dialog/rp-dialog.component';
import { RpTranslateService } from 'src/app/services/rp-translate.service';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'rp-layout',
  templateUrl: './rp-layout.component.html',
  styleUrls: ['./rp-layout.component.css']
})
export class RpLayoutComponent implements OnInit {
  public selectedLanguage: string = LanguageConstants.default;

  @Output() public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onSidebarToggle: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(RpSidebarComponent) public sidebar!: RpSidebarComponent;

  protected languageService: LanguageService;
  protected authService: AuthenticationService;
  protected translateService: RpTranslateService;
  protected dialog: MatDialog;

  /**
   * Creates an instance of RpLayoutComponent.
   * @param languageService Service for language operations.
   * @param authService Service for authentication operations.
   * @param translateService Service for translations.
   * @param dialog Service for opening dialogs.
   */
  constructor(
    languageService: LanguageService,
    authService: AuthenticationService,
    translateService: RpTranslateService,
    dialog: MatDialog
  ) {
    this.languageService = languageService;
    this.authService = authService;
    this.translateService = translateService;
    this.dialog = dialog;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public ngOnInit(): void {
    this.selectedLanguage = LanguageConstants.default;
  }

  /**
   * Changes the language and emits an event.
   */
  public changeLanguage(): void {
    this.selectedLanguage =
      this.selectedLanguage === LanguageConstants.default
        ? LanguageConstants.english
        : LanguageConstants.default;

    this.languageService.changeLanguage(this.selectedLanguage);
    this.onLanguageSelect.emit(this.selectedLanguage);
  }

  /**
   * Checks if the user is logged in.
   * @returns True if the user is logged in, otherwise false.
   */
  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Logs out the user.
   */
  public logout(): void {
    this.authService.logout();
  }

  /**
   * Toggles the sidebar and emits an event.
   * @param event The toggle event.
   */
  public toggleSidebar(event: any): void {
    this.onSidebarToggle.emit();
  }

  /**
   * Opens the user info dialog.
   */
  public openUserInfoDialog(): void {
    const dialogRef = this.dialog.open(RpDialogComponent, {
      height: '50%',
      width: '35%',
      panelClass: 'delete-dialog',
      data: {
        component: UserInfoComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'user-info.title')}`,
        isReadonly: false
      }
    });
  }
}
