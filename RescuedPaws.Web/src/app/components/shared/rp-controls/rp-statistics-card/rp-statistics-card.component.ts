import { Component, Input } from '@angular/core';

@Component({
  selector: 'rp-statistics-card',
  templateUrl: './rp-statistics-card.component.html',
  styleUrls: ['./rp-statistics-card.component.css']
})
export class RpStatisticsCardComponent {
  @Input()
  public title: string = '';

  @Input()
  public titleColor: string = 'black';

  @Input()
  public color: string = 'gray';

  @Input()
  public width: string = '300px';

  @Input()
  public height: string = '150px';
}
