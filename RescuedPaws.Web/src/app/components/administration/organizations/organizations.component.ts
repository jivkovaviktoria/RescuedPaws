import { Component, OnInit } from '@angular/core';
import { UserViewModel } from 'src/app/services/response-models/administration/users/userViewModel';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { UsersService } from 'src/app/services/administration/users.service';
import { LanguageService } from 'src/app/services/language.service';
import { BaseComponent } from '../../shared/base/base.component';

@Component({
  selector: 'organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent extends BaseComponent implements OnInit{
  public users: UserViewModel[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private readonly _usersService: UsersService;

  constructor(
    usersService: UsersService,
    languageService: LanguageService
  ) {
    super(languageService);
    this._usersService = usersService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this._usersService.getUsers().subscribe({
      next: (result: UserViewModel[]) => {
        this.rowsData = result.map(user => this.transformToTableRow(user));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      }
    });
  }

  private createColumnsBasedOnData(data: UserViewModel): TableColumn[] {
    // Dynamically create columns based on the keys of the data object
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private transformToTableRow(user: UserViewModel): Record<string, any> {
    return {
      username: user.username,
      email: user.email
    };
  }

  private formatHeader(key: string): string {
    // Convert key to a more readable format for headers if necessary
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
