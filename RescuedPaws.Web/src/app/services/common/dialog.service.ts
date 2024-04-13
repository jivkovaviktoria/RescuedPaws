import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private modelData: any;

  setData(data: any) {
    this.modelData = data;
  }

  getData(): any {
    return this.modelData;
  }
}