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
  public columnsData: TableColumn[] = [];
  public rowsData: TableRow[] = [];

  /**
   * Service for dialog operations.
   */
  protected dialogService: DialogService;

  /**
   * Service for animal size operations.
   */
  protected animalSizesService: AnimalSizesService;

  /**
   * Service for translations.
   */
  protected translateService: RpTranslateService;

  /**
   * Material Dialog service.
   */
  protected dialog: MatDialog;

  /**
   * Creates an instance of AnimalSizesComponent.
   * @param animalSizesService Service for animal size operations.
   * @param dialogService Service for dialog operations.
   * @param translateService Service for translations.
   * @param languageService Service for language operations.
   * @param dialog Material Dialog service.
   */
  constructor(
    animalSizesService: AnimalSizesService,
    dialogService: DialogService,
    translateService: RpTranslateService,
    languageService: LanguageService,
    dialog: MatDialog
  ) {
    super(languageService);
    this.dialogService = dialogService;
    this.animalSizesService = animalSizesService;
    this.dialog = dialog;
    this.translateService = translateService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadAnimalSizes();
  }

  /**
   * Opens a dialog to view animal size details.
   * @param event Event data.
   */
  public openViewDialog(event: TableRow): void {
    this.dialogService.setData(event);
    this.dialog.open(RpDialogComponent, {
      height: '30%',
      width: '25%',
      panelClass: 'view-dialog',
      data: {
        component: ViewAnimalSizeComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.view')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.animalSize')}`,
        isReadonly: true
      }
    });
  }

  /**
   * Opens a dialog to edit animal size details.
   * @param event Event data.
   */
  public openEditDialog(event: TableRow): void {
    this.dialogService.setData(event);
    this.dialog.open(RpDialogComponent, {
      height: '30%',
      width: '25%',
      panelClass: 'edit-dialog',
      data: {
        component: ViewAnimalSizeComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.edit')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.animalSize')}`,
        isReadonly: false,
      }
    });
  }

  /**
   * Opens a dialog to add a new animal size.
   * @param event Event data.
   */
  public openAddDialog(): void {
    this.dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'add-dialog',
      data: {
        component: ViewAnimalSizeComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.add')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.animalSize')}`,
        isReadonly: false,
      }
    });
  }

  /**
   * Opens a dialog to confirm deletion of an animal size.
   * @param event Event data.
   */
  public openDeleteConfirmationDialog(event: TableRow): void {
    const dialogRef = this.dialog.open(RpDialogComponent, {
      height: '15%',
      width: '35%',
      panelClass: 'delete-dialog',
      data: {
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'messages.delete-confirmation').replace("{0}", event['name'])}`,
        isReadonly: false,
        saveButtonText: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.delete')}`,
      }
    });

    dialogRef.componentInstance.onSave.subscribe(() => {
      this.animalSizesService.delete(event['id']).subscribe({
        next: () => {
          const indexOfAnimalSize = this.rowsData.findIndex(as => as['id'] === event['id']);
          if (indexOfAnimalSize !== -1) {
            this.rowsData.splice(indexOfAnimalSize, 1);
          }
        },
        error: (error: any) => {
          console.error('Error deleting animal size:', error);
        }
      });
    });
  }

  /**
   * Loads the animal sizes from the service.
   */
  public loadAnimalSizes(): void {
    this.animalSizesService.getAnimalSizes().subscribe({
      next: (result: AnimalSizeProjection[]) => {
        this.rowsData = result.map(animalSize => this.transformToTableRow(animalSize));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      },
      error: (error: any) => {
        console.error('Error loading animal sizes:', error);
      }
    });
  }

  /**
   * Transforms an animal size object to a table row format.
   * @param animalSize The animal size object.
   * @returns A table row object.
   */
  private transformToTableRow(animalSize: AnimalSizeProjection): Record<string, any> {
    return {
      id: animalSize.id,
      name: animalSize.name,
    };
  }

  /**
   * Creates table columns based on the data keys.
   * @param data An example data object to derive columns from.
   * @returns An array of table columns.
   */
  private createColumnsBasedOnData(data: AnimalSizeProjection): TableColumn[] {
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
