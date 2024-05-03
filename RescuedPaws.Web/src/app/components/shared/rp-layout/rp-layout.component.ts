import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
import { LanguageConstants } from 'src/app/utilities/constants/common/language.constants';
import { RpSidebarComponent } from '../rp-controls/rp-sidebar/rp-sidebar.component';
import { Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RpDialogComponent } from '../rp-controls/rp-dialog/rp-dialog.component';
import { RpTranslateService } from 'src/app/services/rp-translate.service';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'rp-layout',
  templateUrl: './rp-layout.component.html',
  styleUrls: ['./rp-layout.component.css']
})
export class RpLayoutComponent implements OnInit{

  public selectedLanguage: string = LanguageConstants.default;

  @Output()
  public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onSidebarToggle: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(RpSidebarComponent)
  public sidebar!: RpSidebarComponent;

  private readonly languageService: LanguageService;
  private readonly authService: AuthenticationService;
  private readonly _translateService: RpTranslateService;
  private readonly _dialog: MatDialog;

  constructor(
    languageService: LanguageService,
    authService: AuthenticationService,
    translateService: RpTranslateService,
    dialog: MatDialog
  ) {
    this.languageService = languageService;
    this.authService = authService;
    this._translateService = translateService;
    this._dialog = dialog;
  }

  ngOnInit(): void {
    this.selectedLanguage = LanguageConstants.default;
  }

  public changeLanguage(): void {
    if(this.selectedLanguage === LanguageConstants.default) {
      this.selectedLanguage = LanguageConstants.english;
    }
    else{
      this.selectedLanguage = LanguageConstants.default;
    } 

    this.languageService.changeLanguage(this.selectedLanguage);
    this.onLanguageSelect.emit(this.selectedLanguage);
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleSidebar(event: any): void {
    this.onSidebarToggle.emit();
  }

  public openUserInfoDialog(): void {
    const dialogRef = this._dialog.open(RpDialogComponent, {
      height: '50%',
      width: '35%',
      panelClass: 'delete-dialog',
      data: {
        component: UserInfoComponent, 
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'user-info.title')}`,
        isReadonly: false
      }
    });
  }
}
