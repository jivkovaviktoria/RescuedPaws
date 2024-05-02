import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
export class ViewAnimalTypeComponent extends RpDialogComponent implements OnInit {
  public model!: TableRow;
  public role!: AnimalTypeFormModel;
  public isReadonly: boolean = false;

  private readonly _animalTypesService: AnimalTypesService;

  constructor(
    dialogService: DialogService,
    animalTypesService: AnimalTypesService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ) {
    super(dialogRef, dialogService, data);
    this._dialogService = dialogService;
    this._animalTypesService = animalTypesService;
  }

  public ngOnInit(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    this._animalTypesService.getAnimalType(this.model['id']).subscribe({
      next: (result: AnimalTypeFormModel) => {
        this.role = result;
      },
      error: (error: Error) => {
        console.error(error);
      }
    });
  }
}
