import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarsService {
    constructor(private snackBar: MatSnackBar) { }

    /**
     * Opens a success snackbar with a custom message.
     * @param message The message to display in the snackbar.
     */
    public openSuccess(message: string): void {
        this.snackBar.open(message, 'OK', {
            duration: 3000,
            panelClass: ['snackbar-success']
        });
    }

    /**
     * Opens an error snackbar with a custom message.
     * @param message The message to display in the snackbar.
     * @param duration The duration for which the snackbar is displayed. Default is 3000 ms.
     */
    public showError(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'Close', {
            duration: duration,
            panelClass: ['snackbar-error']
        });
    }
}
