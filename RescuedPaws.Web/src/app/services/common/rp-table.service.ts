import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RpTableService {
    public showOnlyActive: boolean = true;

    /**
     * Gets the value indicating whether only active items are shown.
     * @returns True if only active items are shown, otherwise false.
     */
    public getShowOnlyActive(): boolean {
        return this.showOnlyActive;
    }

    /**
     * Disables the "show only active" filter.
     */
    public disableShowOnlyActive(): void {
        this.showOnlyActive = false;
    }

    /**
     * Enables the "show only active" filter.
     */
    public enableShowOnlyActive(): void {
        this.showOnlyActive = true;
    }
}
