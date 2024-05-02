import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private modelData: any;

  @Output()
  public onSave: EventEmitter<void> = new EventEmitter<void>();

  public setData(data: any) {
    this.modelData = data;
  }

  public getData(): any {
    return this.modelData;
  }

  public save(): void {
    this.onSave.emit();
  }

  public clearData(): void {
    this.modelData = null;
  }
}