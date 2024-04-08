import { Observable } from "rxjs";
import { BaseService } from "../common/base.service";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";
import { Injectable } from "@angular/core";
import { RoleViewModel } from "../response-models/administration/roles/roleViewModel";
import { RoleFormModel } from "../response-models/administration/roles/roleFormModel";
import { Nomenclature } from "../response-models/common/nomenclature";
import { UserRoleRequest } from "../response-models/administration/roles/userRoleRequest";

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

    public getRole(roleId: string): Observable<RoleFormModel> {
        const paramsObj = {
            roleId: roleId
        };

        const params = this.toHttpParams(paramsObj);

        const result = this.http.get<RoleFormModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.getRole}`,
            {params}
        );

        return result;
    }

    public assignToUser(roleId: string, userId: string): Observable<Nomenclature<string>> {
        const body: UserRoleRequest = {
            roleId: roleId,
            userId: userId
        };

        const result = this.http.post<Nomenclature<string>>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.assignToUser}`,
            body
        );

        return result;
    }
}