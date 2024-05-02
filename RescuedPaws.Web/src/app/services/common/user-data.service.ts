import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";

@Injectable({
    providedIn: 'root'
})
export class UserDataService extends BaseService {
    private userRoutePermissions: string[] = [];

    public getUserRoutePermissions(): string[] {
        const permissions = localStorage.getItem('userRoutePermissions');
        return permissions ? JSON.parse(permissions) : [];
    }

    public setUserRoutePermissions(): void {
        this.http.get<string[]>(`${ApiEndpoints.base}${ApiEndpoints.auth.getUserRoutePermissions}`).subscribe({
            next: (result: string[]) => {
                this.userRoutePermissions = result;
                localStorage.setItem('userRoutePermissions', JSON.stringify(result));
            }
        });
    }
}