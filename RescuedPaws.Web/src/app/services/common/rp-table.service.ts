import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RpTableService {
    private _showOnlyActive: boolean = true;

    public get showOnlyActive(): boolean {
        return this._showOnlyActive;
    }

    public disableShowOnlyActive(): void {
        this._showOnlyActive = false;
    }

    public enableShowOnlyActive(): void {
        this._showOnlyActive = true;
    }
}