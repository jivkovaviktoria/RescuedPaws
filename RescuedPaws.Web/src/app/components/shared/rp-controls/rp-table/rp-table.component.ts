import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableRow } from './interfaces/table-row.interface';
import { TableColumn } from './interfaces/table-column.interface'

@Component({
  selector: 'rp-table',
  templateUrl: './rp-table.component.html',
  styleUrls: ['./rp-table.component.css']
})
export class RpTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];

  @Input() public showEditButton: boolean = true;
  @Input() public showDeleteButton: boolean = true;
  @Input() public showViewButton: boolean = true;

  @Output() public onViewClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();
  
  public openDialog(data: TableRow): void {
    this.onViewClick.emit(data);
  }

  public getPropertyValue(row: any, propertyName: string): any {
    return row[propertyName];
  }
}
