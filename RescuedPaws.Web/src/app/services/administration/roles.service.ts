import { Observable } from "rxjs";
import { BaseService } from "../common/base.service";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";
import { Injectable } from "@angular/core";
import { RoleProjection } from "../response-models/administration/roles/roleProjection";
import { RoleFormModel } from "../response-models/administration/roles/roleFormModel";
import { Nomenclature } from "../response-models/common/nomenclature";
import { UserRoleRequest } from "../response-models/administration/roles/userRoleRequest";

@Injectable({
    providedIn: 'root'
})
export class RolesService extends BaseService {

    public getRoles(): Observable<RoleProjection[]> {
        const result = this.http.get<RoleProjection[]>(
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

    public addOrUpdateRole(role: RoleFormModel): Observable<RoleProjection> {
        const result = this.http.post<RoleProjection>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.addOrUpdateRole}`,
            role
        );

        return result;
    }

    public deleteRole(roleId: string): Observable<void> {
        const paramsObj = {
            roleId: roleId
        };

        const params = this.toHttpParams(paramsObj);

        return this.http.delete<void>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.deleteRole}`,
            {params}
        );
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

    public unassignToUser(roleId: string, userId: string): Observable<Nomenclature<string>> {
        const body: UserRoleRequest = {
            roleId: roleId,
            userId: userId
        };

        const result = this.http.post<Nomenclature<string>>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.unassignToUser}`,
            body
        );

        return result;
    }
}