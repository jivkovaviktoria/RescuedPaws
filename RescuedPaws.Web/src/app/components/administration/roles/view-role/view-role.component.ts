import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { RolesService } from 'src/app/services/administration/roles.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { NomenclaturesService } from 'src/app/services/common/nomenclatures.service';
import { RoleFormModel } from 'src/app/services/response-models/administration/roles/roleFormModel';
import { Nomenclature } from 'src/app/services/response-models/common/nomenclature';

@Component({
  selector: 'view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent extends RpDialogComponent implements OnInit{
  public model!: TableRow;
  public role!: RoleFormModel;
  public isReadonly: boolean = false;

  public usersNomenclatures: Nomenclature<string>[] = [];

  private readonly _dialogService: DialogService;
  private readonly _rolesService: RolesService;

  @Output()
  public onUserAssign: EventEmitter<number> = new EventEmitter<number>();

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
        this.usersNomenclatures = (this.data.usersNomenclatures as []).map(x => x as Nomenclature<string>).filter(u => this.role.assignedUsers?.find(x => x.id === u.id) == null);
      },
      error: (error: Error) => {
        console.error(error);
      }
    });
  }

  public assignUser(userId: string): void{
    this._rolesService.assignToUser(this.role.id, userId).subscribe({
      next: (result: Nomenclature<string>) => {
        this.role.assignedUsers?.push(result);

        const indexOfUser = this.usersNomenclatures.findIndex(u => u.id === result.id);
        this.usersNomenclatures.splice(indexOfUser, 1);

        this.onUserAssign.emit(1);
      }
    })
  }
}
