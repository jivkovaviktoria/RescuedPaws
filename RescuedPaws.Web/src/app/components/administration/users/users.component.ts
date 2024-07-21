import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { UsersService } from 'src/app/services/administration/users.service';
import { UserViewModel } from 'src/app/services/response-models/administration/users/userViewModel';
import { LanguageService } from 'src/app/services/language.service';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent implements OnInit {
  public users: UserViewModel[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  protected usersService: UsersService;

  /**
   * Creates an instance of UsersComponent.
   * @param usersService Service for user operations.
   * @param languageService Service for language operations.
   */
  constructor(
    usersService: UsersService,
    languageService: LanguageService
  ) {
    super(languageService);
    this.usersService = usersService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadUsers();
  }

  /**
   * Loads the users from the service.
   */
  private loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (result: UserViewModel[]) => {
        this.rowsData = result.map(user => this.transformToTableRow(user));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Creates table columns based on the data keys.
   * @param data An example data object to derive columns from.
   * @returns An array of table columns.
   */
  private createColumnsBasedOnData(data: UserViewModel): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  /**
   * Transforms a user object to a table row format.
   * @param user The user object.
   * @returns A table row object.
   */
  private transformToTableRow(user: UserViewModel): Record<string, any> {
    return {
      username: user.username,
      email: user.email
      // Add more fields as necessary
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
