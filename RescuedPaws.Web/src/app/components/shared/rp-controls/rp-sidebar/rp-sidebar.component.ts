import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'rp-sidebar',
  templateUrl: './rp-sidebar.component.html',
  styleUrls: ['./rp-sidebar.component.css']
})
export class RpSidebarComponent {
  @ViewChild('drawer')
  public drawerElement!: MatDrawer;

  @Output()
  public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor()
  {}

  public selectLanguage(lang: string): void {
    this.onLanguageSelect.emit(lang);
  }

  public toggleSidebar(): void {
    this.drawerElement.toggle();
  }
}
