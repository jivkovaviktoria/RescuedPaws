import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() public title: string = '';
  @Input() public buttonText: string = '';
  @Input() public hasReadBtn: boolean = true;
  @Input() public hasFavouriteBtn: boolean = true;
  @Input() public hasLikeBtn: boolean = true;
  @Input() public likesCount: number = 0;

  public hasLike: boolean = false;
  public hasFavourite: boolean = false;

  /**
   * Toggles the like status and updates the likes count.
   */
  public like(): void {
    if (!this.hasLike) {
      this.likesCount++;
      this.hasLike = true;
    } else {
      this.removeLike();
    }
  }

  /**
   * Removes a like and updates the likes count.
   */
  public removeLike(): void {
    this.likesCount--;
    this.hasLike = false;
  }

  /**
   * Toggles the favourite status.
   */
  public favourite(): void {
    this.hasFavourite = !this.hasFavourite;
  }
}
