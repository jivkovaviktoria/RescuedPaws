import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarsService {
    private _snackBar!: MatSnackBar;

    constructor(
        snackBar: MatSnackBar
    ) {
        this._snackBar = snackBar;
    }

    public openSuccess(message: string): void {
        this._snackBar.open(message, 'OK', {
            duration: 3000,
            panelClass: ['snackbar-success']
        });
    }
}