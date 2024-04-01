import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { LanguageService } from 'src/app/services/language.service';
import { LanguageConstants } from 'src/app/utilities/constants/common/language.constants';
import { BaseComponent } from '../../base/base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'rp-sidebar',
  templateUrl: './rp-sidebar.component.html',
  styleUrls: ['./rp-sidebar.component.css']
})
export class RpSidebarComponent extends BaseComponent{

  @ViewChild('drawer')
  public drawerElement!: MatDrawer;

  @Output()
  public onLanguageSelect: EventEmitter<string> = new EventEmitter<string>();

  public selectLanguage(lang: string): void {
    this.onLanguageSelect.emit(lang);
  }

  public toggleSidebar(): void {
    this.drawerElement.toggle();
  }
}
