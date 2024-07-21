import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BaseComponent } from '../../base/base.component';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'rp-sidebar',
  templateUrl: './rp-sidebar.component.html',
  styleUrls: ['./rp-sidebar.component.css']
})
export class RpSidebarComponent extends BaseComponent {
  @ViewChild('drawer') public drawerElement!: MatDrawer;
  @Output() public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Creates an instance of RpSidebarComponent.
   * @param languageService Service for language operations.
   */
  constructor(languageService: LanguageService) {
    super(languageService);
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
}
