import { Component, OnInit } from '@angular/core';
import { AnimalSizeProjection } from 'src/app/services/response-models/administration/animal-sizes/animalSizeProjection';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AnimalSizesService } from 'src/app/services/administration/animal-sizes.service';
import { LanguageService } from 'src/app/services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../shared/base/base.component';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { ViewAnimalSizeComponent } from './view-animal-size/view-animal-size.component';
import { RpTranslateService } from 'src/app/services/rp-translate.service';

@Component({
  selector: 'animal-sizes',
  templateUrl: './animal-sizes.component.html',
  styleUrls: ['./animal-sizes.component.css']
})
export class AnimalSizesComponent extends BaseComponent implements OnInit {
  public animalSizes: AnimalSizeProjection[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private readonly _dialog;
  private readonly _dialogService: DialogService;
  private readonly _translateService: RpTranslateService;
  private readonly _animalSizesService: AnimalSizesService;

  constructor(
    animalSizesService: AnimalSizesService,
    dialogService: DialogService,
    translateService: RpTranslateService,
    languageService: LanguageService,
    dialog: MatDialog
  ) {
    super(languageService);

    this._dialogService = dialogService;
    this._animalSizesService = animalSizesService;
    this._dialog = dialog;
    this._translateService = translateService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadAnimalSizes();
  }

  public openViewDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '30%',
      width: '25%',
      panelClass: 'view-dialog',
      data: {
        component: ViewAnimalSizeComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.view')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.animalSize')}`,
        isReadonly: true
      }
    });
  }

  public openEditDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'edit-dialog',
      data: {
        component: ViewAnimalSizeComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.edit')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.animalSize')}`,
        isReadonly: false,
      }
    });
  }

  public openAddDialog(event: any): void {
    this._dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'add-dialog',
      data: {
        component: ViewAnimalSizeComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.add')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.animalSize')}`,
        isReadonly: false,
      }
    });
  }

  public openDeleteConfirmationDialog(event: any): void {
    const dialogRef = this._dialog.open(RpDialogComponent, {
      height: '15%',
      width: '35%',
      panelClass: 'delete-dialog',
      data: {
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'messages.delete-confirmation').replace("{0}", event.name)}`,
        isReadonly: false,
        saveButtonText: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.delete')}`,
      }
    });

    dialogRef.componentInstance.onSave.subscribe(() => {
      this._animalSizesService.delete(event.id).subscribe({
        next: () => {
          const indexOfAnimalSize = this.rowsData.findIndex(as => as['id'] === event.id);
          this.rowsData.splice(indexOfAnimalSize, 1);
        }
      });
    });
  }

  public loadAnimalSizes(): void {
    this._animalSizesService.getAnimalSizes().subscribe({
      next: (result: AnimalSizeProjection[]) => {
        this.rowsData = result.map(role => this.transformToTableRow(role));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      }
    });
  }

  private transformToTableRow(animalSize: AnimalSizeProjection): Record<string, any> {
    return {
      id: animalSize.id,
      name: animalSize.name,
    };
  }

  private createColumnsBasedOnData(data: AnimalSizeProjection): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private formatHeader(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
