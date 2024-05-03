import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { AnimalTypeProjection } from 'src/app/services/response-models/administration/animal-types/animalTypeProjection';
import { DialogService } from 'src/app/services/common/dialog.service';
import { LanguageService } from 'src/app/services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { AnimalTypesService } from 'src/app/services/administration/animal-types.service';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { ViewAnimalTypeComponent } from './view-animal-type/view-animal-type.component';
import { RpTranslateService } from 'src/app/services/rp-translate.service';

@Component({
  selector: 'animal-types',
  templateUrl: './animal-types.component.html',
  styleUrls: ['./animal-types.component.css']
})
export class AnimalTypesComponent extends BaseComponent implements OnInit {
  public animalTypes: AnimalTypeProjection[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private readonly _dialog;
  private readonly _dialogService: DialogService;
  private readonly _animalTypesService: AnimalTypesService;
  private readonly _translateService: RpTranslateService;

  constructor(
    animalTypesService: AnimalTypesService,
    dialogService: DialogService,
    languageService: LanguageService,
    translateService: RpTranslateService,
    dialog: MatDialog
  ) {
    super(languageService);

    this._dialogService = dialogService;
    this._animalTypesService = animalTypesService;
    this._translateService = translateService;
    this._dialog = dialog;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadAnimalTypes();
  }

  public openViewDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '30%',
      width: '25%',
      panelClass: 'view-dialog',
      data: { 
        component: ViewAnimalTypeComponent, 
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.view')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.animalType')}`,
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
        component: ViewAnimalTypeComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.edit')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.animalType')}`,
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
        component: ViewAnimalTypeComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.add')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.animalType')}`,
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
      this._animalTypesService.delete(event.id).subscribe({
        next: () => {
          const indexOfAnimalType = this.rowsData.findIndex(at => at['id'] === event.id);
          this.rowsData.splice(indexOfAnimalType, 1);
        }
      });
    });
  }

  public loadAnimalTypes(): void {
    this._animalTypesService.getAnimalTypes().subscribe({
      next: (result: AnimalTypeProjection[]) => {
        this.rowsData = result.map(role => this.transformToTableRow(role));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      }
    });
  }

  private transformToTableRow(animalType: AnimalTypeProjection): Record<string, any> {
    return {
      id: animalType.id,
      name: animalType.name,
    };
  }

  private createColumnsBasedOnData(data: AnimalTypeProjection): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private formatHeader(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
