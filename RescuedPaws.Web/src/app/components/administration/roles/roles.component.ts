import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { LanguageService } from 'src/app/services/language.service';
import { RolesService } from 'src/app/services/administration/roles.service';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewRoleComponent } from './view-role/view-role.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { Nomenclature } from 'src/app/services/response-models/common/nomenclature';
import { NomenclaturesService } from 'src/app/services/common/nomenclatures.service';
import { RoleProjection } from 'src/app/services/response-models/administration/roles/roleProjection';
import { RpTranslateService } from 'src/app/services/rp-translate.service';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends BaseComponent implements OnInit {
  public roles: RoleProjection[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private usersNomenclatures: Nomenclature<string>[] = [];

  private readonly _dialog: MatDialog;
  private readonly _translateService: RpTranslateService;
  private readonly _dialogService: DialogService;
  private readonly _rolesService: RolesService;
  private readonly _nomenclaturesService: NomenclaturesService;

  constructor(
    rolesService: RolesService,
    dialogService: DialogService,
    languageService: LanguageService,
    nomenclaturesService: NomenclaturesService,
    dialog: MatDialog,
    translateService: RpTranslateService
  ) {
    super(languageService);

    this._dialogService = dialogService;
    this._rolesService = rolesService;
    this._nomenclaturesService = nomenclaturesService;
    this._dialog = dialog;
    this._translateService = translateService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.loadRoles();
    this.loadUsersNomenclatures();
  }

  public openViewDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '60%',
      width: '30%',
      panelClass: 'view-dialog',
      data: {
        component: ViewRoleComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.view')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.role')}`,
        isReadonly: true,
        usersNomenclatures: this.usersNomenclatures
      }
    });
  }

  public openEditDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'edit-dialog',
      data: {
        component: ViewRoleComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.edit')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.role')}`,
        isReadonly: false,
        usersNomenclatures: this.usersNomenclatures
      }
    });
  }

  public openAddDialog(event: any): void {
    this._dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'add-dialog',
      data: {
        component: ViewRoleComponent,
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.add')} ${this._translateService.getTranslation('common', this.selectedLanguage, 'entities.role')}`,
        isReadonly: false,
        usersNomenclatures: this.usersNomenclatures
      }
    });
  }

  public openDeleteConfirmationDialog(event: any): void {
    const dialogRef = this._dialog.open(RpDialogComponent, {
      height: '15%',
      width: '35%',
      panelClass: 'delete-dialog',
      data: {
        title: `${this._translateService.getTranslation('common', this.selectedLanguage, 'messages.delete-confirmation').replace("{0}", event.name)}`,
        isReadonly: false,
        saveButtonText: `${this._translateService.getTranslation('common', this.selectedLanguage, 'actions.delete')}`,
      }
    });

    dialogRef.componentInstance.onSave.subscribe(() => {
      this._rolesService.deleteRole(event.id).subscribe({
        next: () => {
          const indexOfRole = this.rowsData.findIndex(r => r['id'] === event.id);
          this.rowsData.splice(indexOfRole, 1);
        }
      });
    });
  }

  private loadRoles(): void {
    this._rolesService.getRoles().subscribe({
      next: (result: RoleProjection[]) => {
        this.roles = result;

        this.rowsData = result.map(role => this.transformToTableRow(role));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      }
    });
  }

  private loadUsersNomenclatures(): void {
    this._nomenclaturesService.getUsers().subscribe({
      next: (result: Nomenclature<string>[]) => {
        this.usersNomenclatures = result;
      }
    });
  }

  private createColumnsBasedOnData(data: RoleProjection): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private transformToTableRow(role: RoleProjection): Record<string, any> {
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
