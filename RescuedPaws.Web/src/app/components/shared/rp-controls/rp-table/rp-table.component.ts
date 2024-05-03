import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableRow } from './interfaces/table-row.interface';
import { TableColumn } from './interfaces/table-column.interface'
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
  public show: string = '';

  @Input()
  columns: TableColumn[] = [];

  @Input()
  data: TableRow[] = [];

  @Input()
  public showAddButton: boolean = true;

  @Input()
  public showEditButton: boolean = true;

  @Input()
  public showDeleteButton: boolean = true;

  @Input()
  public showViewButton: boolean = true;

  @Output()
  public onViewClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();

  @Output()
  public onEditClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();

  @Output()
  public onDeleteClick: EventEmitter<TableRow> = new EventEmitter<TableRow>();

  @Output()
  public onAddClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onShowOnlyActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showActiveChecked: boolean = true;
  public showText: string = '';

  private readonly _rpTableService: RpTableService;
  private readonly _rpTranslateService: RpTranslateService;

  constructor(
    rpTableService: RpTableService,
    languageService: LanguageService,
    rptranslateService: RpTranslateService
  ) {
    super(languageService);

    this._rpTableService = rpTableService;
    this._rpTranslateService = rptranslateService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.getShowText();
  }

  public ngAfterViewChecked(): void {
    this.columns = this.columns?.filter(x => x.field !== 'id');
  }

  public openViewDialog(data: TableRow): void {
    this.onViewClick.emit(data);
  }

  public openEditDialog(data: TableRow): void {
    this.onEditClick.emit(data);
  }

  public openDeleteConfirmationDialog(data: TableRow): void {
    this.onDeleteClick.emit(data);
  }

  public getPropertyValue(row: any, propertyName: string): any {
    return row[propertyName];
  }

  public reloadData(event: any): void {
    if (event.checked === false) this._rpTableService.enableShowOnlyActive();
    else this._rpTableService.disableShowOnlyActive();

    this.showActiveChecked = event.checked;
    this.getShowText();

    this.onShowOnlyActiveChange.emit();
  }

  public getShowText(): string {
    if(this.showActiveChecked) this.showText = this._rpTranslateService.getTranslation('common', this.selectedLanguage, 'rp-table.show-inactive');
    else this.showText = this._rpTranslateService.getTranslation('common', this.selectedLanguage, 'rp-table.show-active');
  
    return this.showText;
  }
}
