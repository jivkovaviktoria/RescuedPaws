import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { RolesService } from 'src/app/services/administration/roles.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleFormModel } from 'src/app/services/response-models/administration/roles/roleFormModel';

@Component({
  selector: 'view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent extends RpDialogComponent implements OnInit{
  public model!: TableRow;
  public role!: RoleFormModel;
  public isReadonly: boolean = false;

  private readonly _dialogService: DialogService;
  private readonly _rolesService: RolesService;

  constructor(
    dialogService: DialogService,
    rolesService: RolesService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ){
    super(dialogRef, data);
    this._dialogService = dialogService;
    this._rolesService = rolesService;
  }

  public ngOnInit(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    this._rolesService.getRole(this.model['id']).subscribe({
      next: (result: RoleFormModel) => {
        this.role = result;
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }
}
