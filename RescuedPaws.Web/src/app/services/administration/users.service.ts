import { Injectable } from "@angular/core";
import { BaseService } from "../common/base.service";
import { Observable } from "rxjs";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";
import { UserViewModel } from "../response-models/administration/users/userViewModel";

/**
 * A service for interacting with users.
 */
@Injectable({
    providedIn: 'root'
})
export class UsersService extends BaseService {

    /**
     * Retrieves the list of users from the server.
     * @returns An Observable that emits an array of UserViewModel objects.
     */
    public getUsers(): Observable<UserViewModel[]> {
        const result = this.http.get<UserViewModel[]>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.getUsers}`
        );

        return result;
    }
}