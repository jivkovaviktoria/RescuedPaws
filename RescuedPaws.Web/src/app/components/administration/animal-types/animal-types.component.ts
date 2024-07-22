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
import { Action } from 'src/app/utilities/enums/actions.enum';

@Component({
  selector: 'animal-types',
  templateUrl: './animal-types.component.html',
  styleUrls: ['./animal-types.component.css']
})
export class AnimalTypesComponent extends BaseComponent implements OnInit {
  public animalTypes: AnimalTypeProjection[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  protected dialogService: DialogService;
  protected animalTypesService: AnimalTypesService;
  protected translateService: RpTranslateService;
  protected dialog: MatDialog;

  /**
   * Creates an instance of AnimalTypesComponent.
   * @param animalTypesService Service for animal type operations.
   * @param dialogService Service for dialog operations.
   * @param languageService Service for language operations.
   * @param translateService Service for translations.
   * @param dialog Material Dialog service.
   */
  constructor(
    animalTypesService: AnimalTypesService,
    dialogService: DialogService,
    languageService: LanguageService,
    translateService: RpTranslateService,
    dialog: MatDialog
  ) {
    super(languageService);
    this.dialogService = dialogService;
    this.animalTypesService = animalTypesService;
    this.translateService = translateService;
    this.dialog = dialog;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadAnimalTypes();
  }

  /**
   * Opens a dialog to view animal type details.
   * @param event Event data.
   */
  public openViewDialog(event: TableRow): void {
    this.dialogService.setData(event);
    this.dialog.open(RpDialogComponent, {
      height: '30%',
      width: '25%',
      panelClass: 'view-dialog',
      data: {
        component: ViewAnimalTypeComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.view')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.animalType')}`,
        mode: Action.View
      }
    });
  }

  /**
   * Opens a dialog to edit animal type details.
   * @param event Event data.
   */
  public openEditDialog(event: TableRow): void {
    this.dialogService.setData(event);
    const dialogRef = this.dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'edit-dialog',
      data: {
        component: ViewAnimalTypeComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.edit')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.animalType')}`,
        mode: Action.Edit,
      }
    });
  }

  /**
   * Opens a dialog to add a new animal type.
   * @param event Event data.
   */
  public openAddDialog(): void {
    this.dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'add-dialog',
      data: {
        component: ViewAnimalTypeComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.add')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.animalType')}`,
        mode: Action.Add,
      }
    });
  }

  /**
   * Opens a dialog to confirm deletion of an animal type.
   * @param event Event data.
   */
  public openDeleteConfirmationDialog(event: TableRow): void {
    const dialogRef = this.dialog.open(RpDialogComponent, {
      height: '15%',
      width: '35%',
      panelClass: 'delete-dialog',
      data: {
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'messages.delete-confirmation').replace("{0}", event['name'])}`,
        mode: Action.Delete,
        saveButtonText: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.delete')}`,
      }
    });

    dialogRef.componentInstance.onSave.subscribe(() => {
      this.animalTypesService.delete(event['id']).subscribe({
        next: () => {
          const indexOfAnimalType = this.rowsData.findIndex(at => at['id'] === event['id']);
          if (indexOfAnimalType !== -1) {
            this.rowsData.splice(indexOfAnimalType, 1);
          }
        },
        error: (error: any) => {
          console.error('Error deleting animal type:', error);
          // Handle error, e.g., display an error message
        }
      });
    });
  }

  /**
   * Loads the animal types from the service.
   */
  public loadAnimalTypes(): void {
    this.animalTypesService.getAnimalTypes().subscribe({
      next: (result: AnimalTypeProjection[]) => {
        this.rowsData = result.map(type => this.transformToTableRow(type));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      },
      error: (error: any) => {
        console.error('Error loading animal types:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Transforms an animal type object to a table row format.
   * @param animalType The animal type object.
   * @returns A table row object.
   */
  private transformToTableRow(animalType: AnimalTypeProjection): Record<string, any> {
    return {
      id: animalType.id,
      name: animalType.name,
    };
  }

  /**
   * Creates table columns based on the data keys.
   * @param data An example data object to derive columns from.
   * @returns An array of table columns.
   */
  private createColumnsBasedOnData(data: AnimalTypeProjection): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  /**
   * Formats a header string.
   * @param key The key to format.
   * @returns A formatted header string.
   */
  private formatHeader(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
