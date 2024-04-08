import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableRow } from './interfaces/table-row.interface';
import { TableColumn } from './interfaces/table-column.interface'

@Component({
  selector: 'rp-table',
  templateUrl: './rp-table.component.html',
  styleUrls: ['./rp-table.component.css']
})
export class RpTableComponent implements AfterViewChecked{
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];

  @Input() public showAddButton: boolean = true;
  @Input() public showEditButton: boolean = true;
  @Input() public showDeleteButton: boolean = true;
  @Input() public showViewButton: boolean = true;

  @Output() public onViewClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();
  @Output() public onEditClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();
  @Output() public onDeleteClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();
  @Output() public onAddClick: EventEmitter<void> = new EventEmitter<void>();

  public ngAfterViewChecked(): void {
    this.columns = this.columns?.filter(x => x.field !== 'id');
  }

  public openViewDialog(data: TableRow): void {
    this.onViewClick.emit(data);
  }

  public openEditDialog(data: TableRow): void {
    this.onEditClick.emit(data);
  }

  public openDeleteConfirmationDialog(data: TableRow): void{
    this.onDeleteClick.emit(data);
  }

  public getPropertyValue(row: any, propertyName: string): any {
    return row[propertyName];
  }
}
