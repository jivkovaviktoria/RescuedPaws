import { Observable } from "rxjs";
import { BaseService } from "../common/base.service";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";
import { Injectable } from "@angular/core";
import { RoleViewModel } from "../response-models/administration/roles/roleViewModel";

@Injectable({
    providedIn: 'root'
})
export class RolesService extends BaseService {

    public getRoles(): Observable<RoleViewModel[]> {
        const result = this.http.get<RoleViewModel[]>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.getRoles}`
        );

        return result;
    }
}