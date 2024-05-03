import { Component } from '@angular/core';
import { RpDialogComponent } from 'src/app/components/shared/rp-controls/rp-dialog/rp-dialog.component';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent extends RpDialogComponent{
  public animalGenders: any[] = ['Male', 'Female'];
  public animalTypes: [] = [];
  public animalSizes: [] = [];
  public animalAges: [] = [];
  public towns: [] = [];
}
