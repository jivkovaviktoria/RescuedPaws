import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableRow } from './interfaces/table-row.interface';
import { TableColumn } from './interfaces/table-column.interface';
import { RpTableService } from 'src/app/services/common/rp-table.service';
import { BaseComponent } from '../../base/base.component';
import { LanguageService } from 'src/app/services/language.service';
import { RpTranslateService } from 'src/app/services/rp-translate.service';

@Component({
  selector: 'rp-table',
  templateUrl: './rp-table.component.html',
  styleUrls: ['./rp-table.component.css']
})
export class RpTableComponent extends BaseComponent implements OnInit, AfterViewChecked {
  @Input() public columns: TableColumn[] = [];
  @Input() public data: TableRow[] = [];
  @Input() public showAddButton: boolean = true;
  @Input() public showEditButton: boolean = true;
  @Input() public showDeleteButton: boolean = true;
  @Input() public showViewButton: boolean = true;

  @Output() public onViewClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();
  @Output() public onEditClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();
  @Output() public onDeleteClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();
  @Output() public onAddClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onShowOnlyActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showActiveChecked: boolean = true;
  public showText: string = '';

  protected rpTableService: RpTableService;
  protected rpTranslateService: RpTranslateService;

  /**
   * Creates an instance of RpTableComponent.
   * @param rpTableService Service for table operations.
   * @param languageService Service for language operations.
   * @param rpTranslateService Service for translations.
   */
  constructor(
    rpTableService: RpTableService,
    languageService: LanguageService,
    rpTranslateService: RpTranslateService
  ) {
    super(languageService);
    this.rpTableService = rpTableService;
    this.rpTranslateService = rpTranslateService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.updateShowText();
  }

  /**
   * Angular lifecycle hook that is called after the default change detector has completed checking a component's view.
   */
  public ngAfterViewChecked(): void {
    this.columns = this.columns.filter(column => column.field !== 'id');
  }

  /**
   * Opens the view dialog for the given row.
   * @param row The table row data.
   */
  public openViewDialog(row: TableRow): void {
    this.onViewClick.emit(row);
  }

  /**
   * Opens the edit dialog for the given row.
   * @param row The table row data.
   */
  public openEditDialog(row: TableRow): void {
    this.onEditClick.emit(row);
  }

  /**
   * Opens the delete confirmation dialog for the given row.
   * @param row The table row data.
   */
  public openDeleteConfirmationDialog(row: TableRow): void {
    this.onDeleteClick.emit(row);
  }

  /**
   * Retrieves the property value from a row based on the given property name.
   * @param row The table row data.
   * @param propertyName The property name to retrieve the value for.
   * @returns The property value.
   */
  public getPropertyValue(row: any, propertyName: string): any {
    return row[propertyName];
  }

  /**
   * Reloads the table data based on the active/inactive toggle.
   * @param event The event data.
   */
  public reloadData(event: any): void {
    if (!event.checked) {
      this.rpTableService.enableShowOnlyActive();
    } else {
      this.rpTableService.disableShowOnlyActive();
    }

    this.showActiveChecked = event.checked;
    this.updateShowText();
    this.onShowOnlyActiveChange.emit(this.showActiveChecked);
  }

  /**
   * Gets the text to display for the active/inactive toggle.
   * @returns The text to display.
   */
  public getShowText(): string {
    return this.showText;
  }

  /**
   * Updates the text displayed for the active/inactive toggle.
   */
  private updateShowText(): void {
    if (this.showActiveChecked) {
      this.showText = this.rpTranslateService.getTranslation('common', this.selectedLanguage, 'rp-table.show-inactive');
    } else {
      this.showText = this.rpTranslateService.getTranslation('common', this.selectedLanguage, 'rp-table.show-active');
    }
  }
}
