import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private modelData: any;

  @Output() public onSave: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onDelete: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Sets the model data.
   * @param data The data to set.
   */
  public setData(data: any): void {
    this.modelData = data;
  }

  /**
   * Gets the model data.
   * @returns The model data.
   */
  public getData(): any {
    return this.modelData;
  }

  /**
   * Emits the onSave event.
   */
  public save(): void {
    this.onSave.emit();
  }

  public delete(): void {
    this.onDelete.emit();
  }

  /**
   * Clears the model data.
   */
  public clearData(): void {
    this.modelData = null;
  }
}
