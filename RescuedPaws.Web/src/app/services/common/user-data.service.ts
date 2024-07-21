import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";

@Injectable({
    providedIn: 'root'
})
export class UserDataService extends BaseService {
    private userRoutePermissions: string[] = [];

    /**
     * Retrieves user route permissions from local storage.
     * @returns An array of user route permissions.
     */
    public getUserRoutePermissions(): string[] {
        const permissions = localStorage.getItem('userRoutePermissions');
        return permissions ? JSON.parse(permissions) : [];
    }

    /**
     * Fetches user route permissions from the server and stores them in local storage.
     */
    public setUserRoutePermissions(): void {
        this.http.get<string[]>(`${ApiEndpoints.base}${ApiEndpoints.auth.getUserRoutePermissions}`).subscribe({
            next: (result: string[]) => {
                this.userRoutePermissions = result;
                localStorage.setItem('userRoutePermissions', JSON.stringify(result));
            },
            error: (error: any) => {
                console.error('Error fetching user route permissions:', error);
                // Handle error, e.g., display an error message
            }
        });
    }
}
