import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { AnimalSizesService } from 'src/app/services/administration/animal-sizes.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AnimalSizeFormModel } from 'src/app/services/response-models/administration/animal-sizes/animalSizeFormModel';

@Component({
  selector: 'view-animal-size',
  templateUrl: './view-animal-size.component.html',
  styleUrls: ['./view-animal-size.component.css']
})
export class ViewAnimalSizeComponent extends RpDialogComponent implements OnInit{
  public model!: TableRow;
  public role!: AnimalSizeFormModel;
  public isReadonly: boolean = false;

  private readonly _dialogService: DialogService;
  private readonly _animalSizesService: AnimalSizesService;

  constructor(
    dialogService: DialogService,
    animalSizesService: AnimalSizesService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ) {
    super(dialogRef, data);
    this._dialogService = dialogService;
    this._animalSizesService = animalSizesService;
  }

  public ngOnInit(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    this._animalSizesService.getAnimalSize(this.model['id']).subscribe({
      next: (result: AnimalSizeFormModel) => {
        this.role = result;
      },
      error: (error: Error) => {
        console.error(error);
      }
    });
  }
}
