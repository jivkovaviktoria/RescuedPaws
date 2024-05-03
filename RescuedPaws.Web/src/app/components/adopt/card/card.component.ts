import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  public title: string = '';

  @Input()
  public buttonText: string = '';

  @Input()
  public hasReadBtn: boolean = true;

  @Input()
  public hasFavouriteBtn: boolean = true;

  @Input()
  public hasLikeBtn: boolean = true;

  @Input()
  public likesCount: number = 0;

  public hasLike: boolean = false;
  public hasFavourite: boolean = false;

  public like(): void {
    if (!this.hasLike) {
      this.likesCount++;
      this.hasLike = true;
    }
    else{
      this.removeLike();
    }
  }

  public removeLike(): void {
    this.likesCount--;
    this.hasLike = false;
  }

  public favourite(): void {
    if(!this.hasFavourite){
      this.hasFavourite = true;
    }
    else{
      this.hasFavourite = false;
    }
  }
}
