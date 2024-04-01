import { Injectable } from "@angular/core";
import { BaseService } from "../common/base.service";
import { Observable } from "rxjs";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";
import { UserViewModel } from "../response-models/administration/users/userViewModel";

@Injectable({
    providedIn: 'root'
})
export class UsersService extends BaseService {
    public getUsers(): Observable<UserViewModel[]> {
        const result = this.http.get<UserViewModel[]>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.getUsers}`
        );

        return result;
    }
}