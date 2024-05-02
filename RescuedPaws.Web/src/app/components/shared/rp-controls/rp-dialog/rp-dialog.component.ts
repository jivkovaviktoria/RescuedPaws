import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/common/dialog.service';

@Component({
  selector: 'rp-dialog',
  templateUrl: './rp-dialog.component.html',
  styleUrls: ['./rp-dialog.component.css']
})
export class RpDialogComponent {
  protected title!: string;

  @Input()
  public cancelButtonText: string = 'Cancel';

  @Input()
  public saveButtonText: string = 'Save';

  @Output()
  public onSave: EventEmitter<any> = new EventEmitter<any>();

  protected _dialogService: DialogService;

  constructor(
    public dialogRef: MatDialogRef<RpDialogComponent>,
    dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;

    if(data.saveButtonText) this.saveButtonText = data.saveButtonText;
    if(data.cancelButtonText) this.cancelButtonText = data.cancelButtonText;

    this._dialogService = dialogService;
  }

  protected onNoClick(): void {
    this.dialogRef.close();
  }

  protected onSaveClick(): void {
    this.onSave.emit();

    this._dialogService.save();
    this.dialogRef.close();
  }
}
