import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rp-dialog',
  templateUrl: './rp-dialog.component.html',
  styleUrls: ['./rp-dialog.component.css']
})
export class RpDialogComponent {
  protected title!: string;

  constructor(
    public dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
