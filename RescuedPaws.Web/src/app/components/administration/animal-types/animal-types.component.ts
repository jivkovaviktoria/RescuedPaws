import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { TableColumn } from '../../shared/rp-controls/rp-table/interfaces/table-column.interface';
import { TableRow } from '../../shared/rp-controls/rp-table/interfaces/table-row.interface';
import { AnimalTypeProjection } from 'src/app/services/response-models/administration/animal-types/animalTypeProjection';
import { DialogService } from 'src/app/services/common/dialog.service';
import { LanguageService } from 'src/app/services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { AnimalTypesService } from 'src/app/services/administration/animal-types.service';
import { RpDialogComponent } from '../../shared/rp-controls/rp-dialog/rp-dialog.component';
import { ViewAnimalTypeComponent } from './view-animal-type/view-animal-type.component';

@Component({
  selector: 'animal-types',
  templateUrl: './animal-types.component.html',
  styleUrls: ['./animal-types.component.css']
})
export class AnimalTypesComponent extends BaseComponent implements OnInit {
  public animalTypes: AnimalTypeProjection[] = [];
  public columnsData!: TableColumn[];
  public rowsData!: TableRow[];

  private readonly _dialog;
  private readonly _dialogService: DialogService;
  private readonly _animalTypesService: AnimalTypesService;

  constructor(
    animalTypesService: AnimalTypesService,
    dialogService: DialogService,
    languageService: LanguageService,
    dialog: MatDialog
  ) {
    super(languageService);

    this._dialogService = dialogService;
    this._animalTypesService = animalTypesService;
    this._dialog = dialog;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this._animalTypesService.getAnimalTypes().subscribe({
      next: (result: AnimalTypeProjection[]) => {
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
      data: { component: ViewAnimalTypeComponent, title: 'View animal type', isReadonly: true }
    });
  }

  private transformToTableRow(animalType: AnimalTypeProjection): Record<string, any> {
    return {
      id: animalType.id,
      name: animalType.name,
    };
  }

  private createColumnsBasedOnData(data: AnimalTypeProjection): TableColumn[] {
    return Object.keys(data).map(key => ({
      header: this.formatHeader(key),
      field: key
    }));
  }

  private formatHeader(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}
