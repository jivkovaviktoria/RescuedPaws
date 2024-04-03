import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { LanguageService } from 'src/app/services/language.service';
import { RolesService } from 'src/app/services/administration/roles.service';
import { RoleViewModel } from 'src/app/services/response-models/administration/roles/roleViewModel';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewRoleComponent } from './view-role/view-role.component';
import { DialogService } from 'src/app/services/common/dialog.service';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends BaseComponent implements OnInit {
  public roles: RoleViewModel[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private readonly _dialog;
  private readonly _dialogService: DialogService;
  private readonly _rolesService: RolesService;

  constructor(
    rolesService: RolesService,
    dialogService: DialogService,
    languageService: LanguageService,
    dialog: MatDialog
  ) {
    super(languageService);

    this._dialogService = dialogService;
    this._rolesService = rolesService;
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

  openViewDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '75%',
      width: '50%',
      panelClass: 'view-dialog',
      data: {component: ViewRoleComponent, title: 'View role'}
    });
  }

  private createColumnsBasedOnData(data: RoleViewModel): TableColumn[] {
    // Dynamically create columns based on the keys of the data object
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private transformToTableRow(role: RoleViewModel): Record<string, any> {
    return {
      name: role.name,
      usersCount: role.usersCount
    };
  }

  private formatHeader(key: string): string {
    // Convert key to a more readable format for headers if necessary
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
