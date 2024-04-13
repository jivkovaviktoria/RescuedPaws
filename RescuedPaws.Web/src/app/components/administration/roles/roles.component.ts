import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { LanguageService } from 'src/app/services/language.service';
import { RolesService } from 'src/app/services/administration/roles.service';
import { RoleViewModel } from 'src/app/services/response-models/administration/roles/roleProjection';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewRoleComponent } from './view-role/view-role.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { Nomenclature } from 'src/app/services/response-models/common/nomenclature';
import { NomenclaturesService } from 'src/app/services/common/nomenclatures.service';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends BaseComponent implements OnInit {
  public roles: RoleViewModel[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private usersNomenclatures: Nomenclature<string>[] = [];

  private readonly _dialog;
  private readonly _dialogService: DialogService;
  private readonly _rolesService: RolesService;
  private readonly _nomenclaturesService: NomenclaturesService;

  constructor(
    rolesService: RolesService,
    dialogService: DialogService,
    languageService: LanguageService,
    nomenclaturesService: NomenclaturesService,
    dialog: MatDialog
  ) {
    super(languageService);

    this._dialogService = dialogService;
    this._rolesService = rolesService;
    this._nomenclaturesService = nomenclaturesService;
    this._dialog = dialog;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this._rolesService.getRoles().subscribe({
      next: (result: RoleViewModel[]) => {
        this.rowsData = result.map(role => this.transformToTableRow(role));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      }
    });
  }

  public openViewDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '60%',
      width: '30%',
      panelClass: 'view-dialog',
      data: { component: ViewRoleComponent, title: 'View role', isReadonly: true }
    });
  }

  public openEditDialog(event: any): void {
    this._dialogService.setData(event);

    this._nomenclaturesService.getUsers().subscribe({
      next: (result: Nomenclature<string>[]) => {
        this.usersNomenclatures = result;

        const dialogRef = this._dialog.open(RpDialogComponent, {
          height: '77%',
          width: '50%',
          panelClass: 'view-dialog',
          data: {
            component: ViewRoleComponent,
            title: 'View role',
            isReadonly: false,
            usersNomenclatures: this.usersNomenclatures
          }
        });

        // const ViewRoleComponentInstance  = dialogRef.componentInstance;

        // (ViewRoleComponentInstance.data.component.onUserAssign).subscribe((event) => {
        //   const roleId = event.roleId;
        //   const count = event.count;

        //   const role = this.roles.find(r => r.id === roleId);

        //   if(role != null){
        //     role.usersCount += count;

        //   }
        // });
      } 
    });
  }

  public openAddDialog(): void {
    this._dialog.open(RpDialogComponent, {
      height: '50%',
      width: '30%',
      panelClass: 'view-dialog',
      data: { component: ViewRoleComponent, title: 'View role', isReadonly: false }
    });
  }

  public openDeleteConfirmationDialog(): void {
    this._dialog.open(RpDialogComponent, {
      height: '15%',
      width: '30%',
      panelClass: 'view-dialog',
      data: { title: 'Are you sure you want to delete this role?', isReadonly: false }
    });
  }

  private createColumnsBasedOnData(data: RoleViewModel): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private transformToTableRow(role: RoleViewModel): Record<string, any> {
    return {
      id: role.id,
      name: role.name,
      usersCount: role.usersCount
    };
  }

  private formatHeader(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
