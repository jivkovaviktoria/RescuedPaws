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
  protected usersNomenclatures: Nomenclature<string>[] = [];

  protected dialog: MatDialog;
  protected translateService: RpTranslateService;
  protected dialogService: DialogService;
  protected rolesService: RolesService;
  protected nomenclaturesService: NomenclaturesService;

  /**
   * Creates an instance of RolesComponent.
   * @param rolesService Service for role operations.
   * @param dialogService Service for dialog operations.
   * @param languageService Service for language operations.
   * @param nomenclaturesService Service for nomenclature operations.
   * @param dialog Material Dialog service.
   * @param translateService Service for translations.
   */
  constructor(
    rolesService: RolesService,
    dialogService: DialogService,
    languageService: LanguageService,
    nomenclaturesService: NomenclaturesService,
    dialog: MatDialog,
    translateService: RpTranslateService
  ) {
    super(languageService);
    this.dialogService = dialogService;
    this.rolesService = rolesService;
    this.nomenclaturesService = nomenclaturesService;
    this.dialog = dialog;
    this.translateService = translateService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadRoles();
    this.loadUsersNomenclatures();
  }

  /**
   * Opens a dialog to view role details.
   * @param event Event data.
   */
  public openViewDialog(event: any): void {
    this.dialogService.setData(event);
    this.dialog.open(RpDialogComponent, {
      height: '60%',
      width: '30%',
      panelClass: 'view-dialog',
      data: {
        component: ViewRoleComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.view')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.role')}`,
        isReadonly: true,
        usersNomenclatures: this.usersNomenclatures
      }
    });
  }

  /**
   * Opens a dialog to edit role details.
   * @param event Event data.
   */
  public openEditDialog(event: any): void {
    this.dialogService.setData(event);
    this.dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'edit-dialog',
      data: {
        component: ViewRoleComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.edit')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.role')}`,
        isReadonly: false,
        usersNomenclatures: this.usersNomenclatures
      }
    });
  }

  /**
   * Opens a dialog to add a new role.
   * @param event Event data.
   */
  public openAddDialog(): void {
    this.dialog.open(RpDialogComponent, {
      height: '77%',
      width: '50%',
      panelClass: 'add-dialog',
      data: {
        component: ViewRoleComponent,
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.add')} ${this.translateService.getTranslation('common', this.selectedLanguage, 'entities.role')}`,
        isReadonly: false,
        usersNomenclatures: this.usersNomenclatures
      }
    });
  }

  /**
   * Opens a dialog to confirm deletion of a role.
   * @param event Event data.
   */
  public openDeleteConfirmationDialog(event: any): void {
    const dialogRef = this.dialog.open(RpDialogComponent, {
      height: '15%',
      width: '35%',
      panelClass: 'delete-dialog',
      data: {
        title: `${this.translateService.getTranslation('common', this.selectedLanguage, 'messages.delete-confirmation').replace("{0}", event.name)}`,
        isReadonly: false,
        saveButtonText: `${this.translateService.getTranslation('common', this.selectedLanguage, 'actions.delete')}`
      }
    });

    dialogRef.componentInstance.onSave.subscribe(() => {
      this.rolesService.deleteRole(event.id).subscribe({
        next: () => {
          const indexOfRole = this.rowsData.findIndex(r => r['id'] === event.id);
          if (indexOfRole !== -1) {
            this.rowsData.splice(indexOfRole, 1);
          }
        },
        error: (error: any) => {
          console.error('Error deleting role:', error);
          // Handle error, e.g., display an error message
        }
      });
    });
  }

  /**
   * Loads the roles from the service.
   */
  public loadRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (result: RoleProjection[]) => {
        this.roles = result;
        this.rowsData = result.map(role => this.transformToTableRow(role));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      },
      error: (error: any) => {
        console.error('Error loading roles:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Loads the users nomenclatures from the service.
   */
  private loadUsersNomenclatures(): void {
    this.nomenclaturesService.getUsers().subscribe({
      next: (result: Nomenclature<string>[]) => {
        this.usersNomenclatures = result;
      },
      error: (error: any) => {
        console.error('Error loading users nomenclatures:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Creates table columns based on the data keys.
   * @param data An example data object to derive columns from.
   * @returns An array of table columns.
   */
  private createColumnsBasedOnData(data: RoleProjection): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  /**
   * Transforms a role object to a table row format.
   * @param role The role object.
   * @returns A table row object.
   */
  private transformToTableRow(role: RoleProjection): Record<string, any> {
    return {
      id: role.id,
      name: role.name,
      usersCount: role.usersCount
    };
  }

  /**
   * Formats a header string.
   * @param key The key to format.
   * @returns A formatted header string.
   */
  private formatHeader(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
