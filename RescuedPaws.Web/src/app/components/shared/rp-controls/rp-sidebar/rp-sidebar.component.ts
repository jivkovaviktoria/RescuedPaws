import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BaseComponent } from '../../base/base.component';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'rp-sidebar',
  templateUrl: './rp-sidebar.component.html',
  styleUrls: ['./rp-sidebar.component.css']
})
export class RpSidebarComponent extends BaseComponent {
  
  public authenticationService: AuthenticationService;

  @ViewChild('drawer') public drawerElement!: MatDrawer;

  @Output() public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Creates an instance of RpSidebarComponent.
   * @param languageService Service for language operations.
   */
  constructor(
    languageService: LanguageService,
    authenticationService: AuthenticationService
  ) {
    super(languageService);

    this.authenticationService = authenticationService;
  }

  /**
   * Emits an event to signal language selection.
   * @param lang The selected language.
   */
  public selectLanguage(lang: string): void {
    this.onLanguageSelect.emit(lang);
  }

  /**
   * Toggles the sidebar open or closed.
   */
  public toggleSidebar(): void {
    this.drawerElement.toggle();
  }

  /**
   * Checks if the user is authenticated.
   * @returns True if the user is authenticated, otherwise false.
   */
  public isAuthenticated(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
