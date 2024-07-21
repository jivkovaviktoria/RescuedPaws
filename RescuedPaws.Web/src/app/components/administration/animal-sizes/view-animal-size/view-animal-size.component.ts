import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { AnimalSizesService } from 'src/app/services/administration/animal-sizes.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SnackbarsService } from 'src/app/services/common/snackbars.service';
import { LanguageService } from 'src/app/services/language.service';
import { AnimalSizeFormModel } from 'src/app/services/response-models/administration/animal-sizes/animalSizeFormModel';
import { RpTranslateService } from 'src/app/services/rp-translate.service';

@Component({
  selector: 'view-animal-size',
  templateUrl: './view-animal-size.component.html',
  styleUrls: ['./view-animal-size.component.css']
})
export class ViewAnimalSizeComponent extends RpDialogComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public model!: TableRow;
  public animalSize!: AnimalSizeFormModel;
  public isReadonly: boolean = false;

  /**
   * Service for animal size operations.
   */
  protected animalSizesService: AnimalSizesService;

  /**
   * Service for displaying snack bar notifications.
   */
  protected snackBarsService: SnackbarsService;

  /**
   * Subscription for save events.
   */
  private _onSaveSubscription!: Subscription;

  /**
   * Creates an instance of ViewAnimalSizeComponent.
   * @param dialogService Service for dialog operations
   * @param animalSizesService Service for animal size operations
   * @param snackBarsService Service for displaying snack bar notifications
   * @param dialogRef Reference to the dialog containing this component
   * @param data Data passed into the dialog
   */
  constructor(
    private dialogService: DialogService,
    private translateService: RpTranslateService,
    languageService: LanguageService,
    animalSizesService: AnimalSizesService,
    snackBarsService: SnackbarsService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ) {
    super(dialogRef, dialogService, translateService, languageService, data);
    this.animalSizesService = animalSizesService;
    this.snackBarsService = snackBarsService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  override ngOnInit(): void {
    this.initializeForm();
    this.subscribeToSave();
  }

  /**
   * Angular lifecycle hook that is called when a directive, pipe, or service is destroyed.
   */
  override ngOnDestroy(): void {
    this._onSaveSubscription.unsubscribe();
    this.dialogService.clearData();
  }

  /**
   * Initializes the form and loads the animal size if a model is present.
   */
  private initializeForm(): void {
    this.model = this.dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    if (this.model) {
      this.getAnimalSizeAndBuildForm(this.model['id']);
    } else if (this.isReadonly) {
      this.buildForm();
      this.form.disable();
    }
  }

  /**
   * Subscribes to the save event from the dialog service.
   */
  private subscribeToSave(): void {
    this._onSaveSubscription = this.dialogService.onSave.subscribe(() => {
      if (this.form.valid) {
        this.addOrUpdateAnimalSize();
      }
    });
  }

  /**
   * Adds or updates an animal size.
   */
  private addOrUpdateAnimalSize(): void {
    if (!this.animalSize) {
      this.animalSize = new AnimalSizeFormModel();
    }

    this.animalSize.name = this.form.get('nameControl')?.value;

    if (this.model) {
      this.animalSize.id = this.model['id'];
    }

    this.animalSizesService.addOrUpdate(this.animalSize).subscribe({
      next: (result: AnimalSizeFormModel) => {
        this.animalSize = result;
        this.snackBarsService.openSuccess('The animal size was added successfully');
      },
      error: (error: any) => {
        this.snackBarsService.showError(this.translateService.getTranslation('error-messages', this.selectedLanguage, 'error-saving-data'));
        console.error(error);
      }
    });
  }

  /**
   * Fetches the animal size and builds the form with the retrieved data.
   * @param id The ID of the animal size to fetch
   */
  private getAnimalSizeAndBuildForm(id: string): void {
    this.animalSizesService.getAnimalSize(id).subscribe({
      next: (result: AnimalSizeFormModel) => {
        this.animalSize = result;
        this.buildForm();
      },
      error: (error: any) => {
        this.snackBarsService.showError(this.translateService.getTranslation('error-messages', this.selectedLanguage, 'error-fetching-data'));
        console.error(error);
      }
    });
  }

  /**
   * Builds the reactive form.
   */
  private buildForm(): void {
    this.form = new FormGroup({
      nameControl: new FormControl(this.animalSize?.name, Validators.required)
    });
  }
}
