import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { AnimalTypesService } from 'src/app/services/administration/animal-types.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AnimalTypeFormModel } from 'src/app/services/response-models/administration/animal-types/animalTypeFormModel';

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

  private readonly _animalTypesService: AnimalTypesService;
  private _onSaveSubscription!: Subscription;

  constructor(
    dialogService: DialogService,
    animalTypesService: AnimalTypesService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ) {
    super(dialogRef, dialogService, data);
    this._animalTypesService = animalTypesService;
  }

  public ngOnInit(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    if (this.model != null) this.getAnimalTypeAndBuildForm(this.model['id']);
    else {
      this.buildForm();
      if(this.data.isReadonly) this.form.disable();
    }

    this._onSaveSubscription = this._dialogService.onSave.subscribe(() => {
      if (this.form.valid) this.addOrUpdateAnimalType();
    });
  }

  public ngOnDestroy(): void {
    this._onSaveSubscription.unsubscribe();
    this._dialogService.clearData();
  }

  private addOrUpdateAnimalType(): void {
    if (this.animalType == null) this.animalType = new AnimalTypeFormModel();

    this.animalType.name = this.form.get('nameControl')?.value;

    if(this.model != null){
      this.animalType.id = this.model['id'];
    }

    this._animalTypesService.addOrUpdate(this.animalType).subscribe({
      next: (result: AnimalTypeFormModel) => {
        this.animalType = result;
        //this._snackBarsService.openSuccess('The animal type was added successfully');
      }
    });
  }

  private getAnimalTypeAndBuildForm(animalTypeId: string): void {
    this._animalTypesService.getAnimalType(animalTypeId).subscribe({
      next: (result: AnimalTypeFormModel) => {
        this.animalType = result;

        this.buildForm();
        if (this.data.isReadonly) this.form.disable();
      },
    })
  };

  private buildForm(): void {
    this.form = new FormGroup({
      nameControl: new FormControl(this.animalType?.name, Validators.required)
    });
  }
}
