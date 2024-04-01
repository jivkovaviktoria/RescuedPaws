import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { LanguageService } from 'src/app/services/language.service';
import { RolesService } from 'src/app/services/administration/roles.service';
import { RoleViewModel } from 'src/app/services/response-models/administration/roles/roleViewModel';

@Component({
  selector: 'roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends BaseComponent implements OnInit {
  public roles: RoleViewModel[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private readonly _rolesService: RolesService;

  constructor(
    rolesService: RolesService,
    languageService: LanguageService
  ) {
    super(languageService);
    this._rolesService = rolesService;
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
