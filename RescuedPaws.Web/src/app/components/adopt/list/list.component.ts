import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/language.service';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { RpTranslateService } from 'src/app/services/rp-translate.service';
import { FiltersComponent } from './filters/filters.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent {
  public cards: any[] = [1, 2, 4, 5, 6, 7, 8, 9, 10]

  private _dialog: MatDialog;
  private readonly _translateService: RpTranslateService;

  constructor(
    dialog: MatDialog,
    languageService: LanguageService,
    translateService: RpTranslateService
  ) {
    super(languageService);

    this._dialog = dialog;
    this._translateService = translateService;
  }

  public sort(something: any): void {
  }

  public openFilterDialog(): void {
    this._dialog.open(RpDialogComponent, {
      height: '50%',
      width: '75%',
      panelClass: 'add-dialog',
      data: {
        component: FiltersComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.filter')}`,
        isReadonly: false,
      }
    });
  }
}
