import { Component, OnInit } from '@angular/core';
import { AnimalSizeProjection } from 'src/app/services/response-models/administration/animal-sizes/animalSizeProjection';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AnimalSizesService } from 'src/app/services/administration/animal-sizes.service';
import { LanguageService } from 'src/app/services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../shared/base/base.component';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { ViewAnimalSizeComponent } from './view-animal-size/view-animal-size.component';

@Component({
  selector: 'animal-sizes',
  templateUrl: './animal-sizes.component.html',
  styleUrls: ['./animal-sizes.component.css']
})
export class AnimalSizesComponent extends BaseComponent implements OnInit {
  public animalSizes: AnimalSizeProjection[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private readonly _dialog;
  private readonly _dialogService: DialogService;
  private readonly _animalSizesService: AnimalSizesService;

  constructor(
    animalSizesService: AnimalSizesService,
    dialogService: DialogService,
    languageService: LanguageService,
    dialog: MatDialog
  ) {
    super(languageService);

    this._dialogService = dialogService;
    this._animalSizesService = animalSizesService;
    this._dialog = dialog;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this._animalSizesService.getAnimalSizes().subscribe({
      next: (result: AnimalSizeProjection[]) => {
        this.rowsData = result.map(role => this.transformToTableRow(role));
        this.columnsData = this.createColumnsBasedOnData(result[0]);
      }
    });
  }

  public openViewDialog(event: any): void {
    this._dialogService.setData(event);

    this._dialog.open(RpDialogComponent, {
      height: '30%',
      width: '25%',
      panelClass: 'view-dialog',
      data: { component: ViewAnimalSizeComponent, title: 'View animal size', isReadonly: true }
    });
  }

  private transformToTableRow(animalSize: AnimalSizeProjection): Record<string, any> {
    return {
      id: animalSize.id,
      name: animalSize.name,
    };
  }

  private createColumnsBasedOnData(data: AnimalSizeProjection): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private formatHeader(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
