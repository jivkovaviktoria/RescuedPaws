import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { AnimalSizesService } from 'src/app/services/administration/animal-sizes.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SnackbarsService } from 'src/app/services/common/snackbars.service';
import { AnimalSizeFormModel } from 'src/app/services/response-models/administration/animal-sizes/animalSizeFormModel';

@Component({
  selector: 'view-animal-size',
  templateUrl: './view-animal-size.component.html',
  styleUrls: ['./view-animal-size.component.css']
})
export class ViewAnimalSizeComponent extends RpDialogComponent implements OnInit {
  public form!: FormGroup;
  public model!: TableRow;
  public animalSize!: AnimalSizeFormModel;
  public isReadonly: boolean = false;

  private readonly _animalSizesService: AnimalSizesService;
  private readonly _snackBarsService!: SnackbarsService;

  private _onSaveSubscription!: Subscription;

  constructor(
    dialogService: DialogService,
    animalSizesService: AnimalSizesService,
    snackBarsService: SnackbarsService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ) {
    super(dialogRef, dialogService, data);
    this._animalSizesService = animalSizesService;
    this._snackBarsService = snackBarsService;
  }

  public ngOnInit(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    if (this.model != null) this.getAnimalSizeAndBuildForm(this.model['id']);
    else {
      this.buildForm();
      if (this.data.isReadonly) this.form.disable();
    }

    this._onSaveSubscription = this._dialogService.onSave.subscribe(() => {
      if (this.form.valid) this.addOrUpdateRole();
    });
  }

  public ngOnDestroy(): void {
    this._onSaveSubscription.unsubscribe();
    this._dialogService.clearData();
  }

  private addOrUpdateRole(): void {
    if (this.animalSize == null) this.animalSize = new AnimalSizeFormModel();

    this.animalSize.name = this.form.get('nameControl')?.value;

    if (this.model != null) {
      this.animalSize.id = this.model['id'];
    }

    this._animalSizesService.addOrUpdate(this.animalSize).subscribe({
      next: (result: AnimalSizeFormModel) => {
        this.animalSize = result;
        this._snackBarsService.openSuccess('The role was added successfully');
      }
    });
  }

  private getAnimalSizeAndBuildForm(id: number): void {
    this._animalSizesService.getAnimalSize(this.model['id']).subscribe({
      next: (result: AnimalSizeFormModel) => {
        this.animalSize = result;
      },
      error: (error: Error) => {
        console.error(error);
      }
    });
  }

  private buildForm(): void {
    this.form = new FormGroup({
      nameControl: new FormControl(this.animalSize?.name, Validators.required)
    });
  }
}
