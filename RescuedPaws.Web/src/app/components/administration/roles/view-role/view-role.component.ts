import { Component, EventEmitter, HostListener, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { RolesService } from 'src/app/services/administration/roles.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SnackbarsService } from 'src/app/services/common/snackbars.service';
import { LanguageService } from 'src/app/services/language.service';
import { RoleFormModel } from 'src/app/services/response-models/administration/roles/roleFormModel';
import { Nomenclature } from 'src/app/services/response-models/common/nomenclature';
import { RpTranslateService } from 'src/app/services/rp-translate.service';

@Component({
  selector: 'view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent extends RpDialogComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public model!: TableRow;
  public role!: RoleFormModel;
  public isReadonly: boolean = false;
  public screenWidth: number = window.innerWidth;
  public usersNomenclatures: Nomenclature<string>[] = [];

  @Output() public onUserAssign: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onUserUnassign: EventEmitter<number> = new EventEmitter<number>();

  private rolesService!: RolesService;
  private snackBarsService!: SnackbarsService;
  private saveSubscription!: Subscription;

  /**
   * HostListener for window resize event.
   * @param event The resize event.
   */
  @HostListener("window:resize", ['$event'])
  public onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }

  /**
   * Creates an instance of ViewRoleComponent.
   * @param dialogService Service for dialog operations.
   * @param rolesService Service for role operations.
   * @param translateService Service for translations.
   * @param languageService Service for language operations.
   * @param snackBarsService Service for snack bar notifications.
   * @param dialogRef Reference to the dialog containing this component.
   * @param data Data passed into the dialog.
   */
  constructor(
    dialogService: DialogService,
    rolesService: RolesService,
    translateService: RpTranslateService,
    languageService: LanguageService,
    snackBarsService: SnackbarsService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ) {
    super(dialogRef, dialogService, translateService, languageService, data);
    this.rolesService = rolesService;
    this.snackBarsService = snackBarsService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    if (this.model != null) {
      this.getRoleAndBuildForm(this.model['id']);
    } else {
      this.usersNomenclatures = this.data.usersNomenclatures;
      this.buildForm();
      if (this.isReadonly) {
        this.form.disable();
      }
    }

    this.saveSubscription = this._dialogService.onSave.subscribe(() => {
      if (this.form.valid) {
        this.addOrUpdateRole();
      }
    });
  }

  /**
   * Angular lifecycle hook that is called when a directive, pipe, or service is destroyed.
   */
  public override ngOnDestroy(): void {
    this.saveSubscription.unsubscribe();
    this._dialogService.clearData();
  }

  /**
   * Assigns a user to the role.
   * @param userId The ID of the user to assign.
   */
  public assignUser(userId: string): void {
    this.rolesService.assignToUser(this.role.id, userId).subscribe({
      next: (result: Nomenclature<string>) => {
        this.role.assignedUsers?.push(result);
        const indexOfUser = this.usersNomenclatures.findIndex(u => u.id === result.id);
        if (indexOfUser !== -1) {
          this.usersNomenclatures.splice(indexOfUser, 1);
        }
        this.onUserAssign.emit(1);
      },
      error: (error: any) => {
        console.error('Error assigning user:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Unassigns a user from the role.
   * @param userId The ID of the user to unassign.
   */
  public unassignUser(userId: string): void {
    this.rolesService.unassignToUser(this.role.id, userId).subscribe({
      next: (result: Nomenclature<string>) => {
        this.usersNomenclatures.push(result);
        const indexOfUser = this.role?.assignedUsers?.findIndex(u => u.id === result.id);
        if (indexOfUser && indexOfUser !== -1) {
          this.role.assignedUsers?.splice(indexOfUser, 1);
        }
        this.onUserUnassign.emit(1);
      },
      error: (error: any) => {
        console.error('Error unassigning user:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Adds or updates a role.
   */
  private addOrUpdateRole(): void {
    if (this.role == null) {
      this.role = new RoleFormModel();
    }

    this.role.name = this.form.get('nameControl')?.value;

    if (this.model != null) {
      this.role.id = this.model['id'];
    }

    this.rolesService.addOrUpdateRole(this.role).subscribe({
      next: (result: RoleFormModel) => {
        this.role = result;
        this.snackBarsService.openSuccess('The role was added successfully');
      },
      error: (error: any) => {
        console.error('Error adding or updating role:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Fetches the role and builds the form with the retrieved data.
   * @param roleId The ID of the role to fetch.
   */
  private getRoleAndBuildForm(roleId: string): void {
    this.rolesService.getRole(roleId).subscribe({
      next: (result: RoleFormModel) => {
        this.role = result;
        this.usersNomenclatures = (this.data.usersNomenclatures as Nomenclature<string>[]).filter(u => !this.role.assignedUsers?.some(x => x.id === u.id));
        this.buildForm();
        if (this.isReadonly) {
          this.form.disable();
        }
      },
      error: (error: any) => {
        console.error('Error fetching role:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Builds the reactive form.
   */
  private buildForm(): void {
    this.form = new FormGroup({
      nameControl: new FormControl(this.role?.name, Validators.required)
    });
  }
}
