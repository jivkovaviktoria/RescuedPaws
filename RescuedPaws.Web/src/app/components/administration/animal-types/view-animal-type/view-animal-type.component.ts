import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { AnimalTypesService } from 'src/app/services/administration/animal-types.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { LanguageService } from 'src/app/services/language.service';
import { AnimalTypeFormModel } from 'src/app/services/response-models/administration/animal-types/animalTypeFormModel';
import { RpTranslateService } from 'src/app/services/rp-translate.service';

@Component({
  selector: 'view-animal-type',
  templateUrl: './view-animal-type.component.html',
  styleUrls: ['./view-animal-type.component.css']
})
export class ViewAnimalTypeComponent extends RpDialogComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public model!: TableRow;
  public animalType!: AnimalTypeFormModel;
  public isReadonly: boolean = false;

  private readonly animalTypesService: AnimalTypesService;
  private saveSubscription!: Subscription;

  /**
   * Creates an instance of ViewAnimalTypeComponent.
   * @param dialogService Service for dialog operations.
   * @param translateService Service for translations.
   * @param languageService Service for language operations.
   * @param animalTypesService Service for animal type operations.
   * @param dialogRef Reference to the dialog containing this component.
   * @param data Data passed into the dialog.
   */
  constructor(
    dialogService: DialogService,
    translateService: RpTranslateService,
    languageService: LanguageService,
    animalTypesService: AnimalTypesService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any
  ) {
    super(dialogRef, dialogService, translateService, languageService, data);
    this.animalTypesService = animalTypesService;
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
    this.saveSubscription.unsubscribe();
    this._dialogService.clearData();
  }

  /**
   * Initializes the form and loads the animal type if a model is present.
   */
  private initializeForm(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    if (this.model) {
      this.getAnimalTypeAndBuildForm(this.model['id']);
    } else {
      this.buildForm();
      if (this.isReadonly) {
        this.form.disable();
      }
    }
  }

  /**
   * Subscribes to the save event from the dialog service.
   */
  private subscribeToSave(): void {
    this.saveSubscription = this._dialogService.onSave.subscribe(() => {
      if (this.form.valid) {
        this.addOrUpdateAnimalType();
      }
    });
  }

  /**
   * Adds or updates an animal type.
   */
  private addOrUpdateAnimalType(): void {
    if (!this.animalType) {
      this.animalType = new AnimalTypeFormModel();
    }

    this.animalType.name = this.form.get('nameControl')?.value;

    if (this.model) {
      this.animalType.id = this.model['id'];
    }

    this.animalTypesService.addOrUpdate(this.animalType).subscribe({
      next: (result: AnimalTypeFormModel) => {
        this.animalType = result;
        // Display success message here, e.g., using snackBar service
      },
      error: (error: any) => {
        console.error('Error saving animal type:', error);
        // Display error message here, e.g., using snackBar service
      }
    });
  }

  /**
   * Fetches the animal type and builds the form with the retrieved data.
   * @param animalTypeId The ID of the animal type to fetch.
   */
  private getAnimalTypeAndBuildForm(animalTypeId: string): void {
    this.animalTypesService.getAnimalType(animalTypeId).subscribe({
      next: (result: AnimalTypeFormModel) => {
        this.animalType = result;
        this.buildForm();
        if (this.isReadonly) {
          this.form.disable();
        }
      },
      error: (error: any) => {
        console.error('Error fetching animal type:', error);
        // Display error message here, e.g., using snackBar service
      }
    });
  }

  /**
   * Builds the reactive form.
   */
  private buildForm(): void {
    this.form = new FormGroup({
      nameControl: new FormControl(this.animalType?.name, Validators.required)
    });
  }
}
