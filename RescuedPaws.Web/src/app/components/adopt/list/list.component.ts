import { Component } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public cards: any[] = [1, 2, 4, 5, 6, 7, 8, 9, 10]
}
