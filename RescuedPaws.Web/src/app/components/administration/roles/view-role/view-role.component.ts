import { Component, EventEmitter, HostListener, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { RolesService } from 'src/app/services/administration/roles.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SnackbarsService } from 'src/app/services/common/snackbars.service';
import { RoleFormModel } from 'src/app/services/response-models/administration/roles/roleFormModel';
import { Nomenclature } from 'src/app/services/response-models/common/nomenclature';

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

  private readonly _rolesService!: RolesService;
  private readonly _snackBarsService!: SnackbarsService;

  @Output()
  public onUserAssign: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public onUserUnassign: EventEmitter<number> = new EventEmitter<number>();

  private _onSaveSubscription!: Subscription;

  @HostListener("window:resize", ['$event'])
  public onResize(event: any): void {
    this.screenWidth = event.target.innerWidth;
  }

  constructor(
    dialogService: DialogService,
    rolesService: RolesService,
    snackBarsService: SnackbarsService,
    public override dialogRef: MatDialogRef<RpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  ) {
    super(dialogRef, dialogService, data);

    this._rolesService = rolesService;
    this._snackBarsService = snackBarsService;
  }

  public ngOnInit(): void {
    this.model = this._dialogService.getData();
    this.isReadonly = this.data.isReadonly;

    if (this.model != null) this.getRoleAndBuildForm(this.model['id']);
    else {
      this.usersNomenclatures = this.data.usersNomenclatures;
      this.buildForm();
      if(this.data.isReadonly) this.form.disable();
    }

    this._onSaveSubscription = this._dialogService.onSave.subscribe(() => {
      if (this.form.valid) this.addOrUpdateRole();
    });
  }

  public ngOnDestroy(): void {
    this._onSaveSubscription.unsubscribe();
    this._dialogService.clearData();
  }

  public assignUser(userId: string): void {
    this._rolesService.assignToUser(this.role.id, userId).subscribe({
      next: (result: Nomenclature<string>) => {
        this.role.assignedUsers?.push(result);

        const indexOfUser = this.usersNomenclatures.findIndex(u => u.id === result.id);
        this.usersNomenclatures.splice(indexOfUser, 1);

        this.onUserAssign.emit(1);
      }
    });
  }

  public unassignUser(userId: string): void {
    this._rolesService.unassignToUser(this.role.id, userId).subscribe({
      next: (result: Nomenclature<string>) => {
        this.usersNomenclatures.push(result);

        const indexOfUser = this.role?.assignedUsers?.findIndex(u => u.id === result.id);

        if (indexOfUser) {
          this.usersNomenclatures.splice(indexOfUser, 1);
          this.onUserUnassign.emit(1);
        }
      }
    });
  }

  private addOrUpdateRole(): void {
    if (this.role == null) this.role = new RoleFormModel();

    this.role.name = this.form.get('nameControl')?.value;

    if(this.model != null){
      this.role.id = this.model['id'];
    }

    this._rolesService.addOrUpdateRole(this.role).subscribe({
      next: (result: RoleFormModel) => {
        this.role = result;
        this._snackBarsService.openSuccess('The role was added successfully');
      }
    });
  }

  private getRoleAndBuildForm(roleId: string): void {
    this._rolesService.getRole(roleId).subscribe({
      next: (result: RoleFormModel) => {
        this.role = result;
        this.usersNomenclatures = (this.data.usersNomenclatures as []).map(x => x as Nomenclature<string>).filter(u => this.role.assignedUsers?.find(x => x.id === u.id) == null);
      
        this.buildForm();
        if(this.data.isReadonly) this.form.disable();
      },
    })
  };


  private buildForm(): void {
    this.form = new FormGroup({
      nameControl: new FormControl(this.role?.name, Validators.required)
    });
  }
}
