import { Component, OnInit } from '@angular/core';
import { TableRow } from 'src/app/components/shared/rp-controls/rp-table/interfaces/table-row.interface';
import { DialogService } from 'src/app/services/common/dialog.service';

@Component({
  selector: 'view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit{
  public model!: TableRow;

  private readonly _dialogService: DialogService;

  constructor(dialogService: DialogService){
    this._dialogService = dialogService;
  }

  public ngOnInit(): void {
    this.model = this._dialogService.getData();
  }
}
