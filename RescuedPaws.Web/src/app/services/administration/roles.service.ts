import { Observable } from "rxjs";
import { BaseService } from "../common/base.service";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";
import { Injectable } from "@angular/core";
import { RoleProjection } from "../response-models/administration/roles/roleProjection";
import { RoleFormModel } from "../response-models/administration/roles/roleFormModel";
import { Nomenclature } from "../response-models/common/nomenclature";
import { UserRoleRequest } from "../response-models/administration/roles/userRoleRequest";

/**
 * A service for interacting with roles.
 */
@Injectable({
    providedIn: 'root'
})
export class RolesService extends BaseService {

    /**
     * Retrieves the list of roles from the server.
     * @returns An Observable that emits an array of RoleProjection objects.
     */
    public getRoles(): Observable<RoleProjection[]> {
        const result = this.http.get<RoleProjection[]>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.getRoles}`
        );

        return result;
    }

    /**
     * Retrieves a role from the server.
     * @param roleId The ID of the role to retrieve.
     * @returns An Observable that emits a RoleFormModel object.
     */
    public getRole(roleId: string): Observable<RoleFormModel> {
        const paramsObj = {
            roleId: roleId
        };

        const params = this.toHttpParams(paramsObj);

        const result = this.http.get<RoleFormModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.getRole}`,
            { params }
        );

        return result;
    }

    /**
     * Adds or updates a role on the server.
     * @param role The role to add or update.
     * @returns An Observable that emits a RoleProjection object.
     */
    public addOrUpdateRole(role: RoleFormModel): Observable<RoleProjection> {
        const result = this.http.post<RoleProjection>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.addOrUpdateRole}`,
            role
        );

        return result;
    }

    /**
     * Deletes a role from the server.
     * @param roleId The ID of the role to delete.
     * @returns An Observable that emits void.
     */
    public deleteRole(roleId: string): Observable<void> {
        const paramsObj = {
            roleId: roleId
        };

        const params = this.toHttpParams(paramsObj);

        return this.http.delete<void>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.deleteRole}`,
            { params }
        );
    }

    /**
    * Assigns a specific role to a user in the system.
    * 
    * @param roleId The unique identifier of the role to be assigned.
    * @param userId The unique identifier of the user who will receive the role.
    * @returns An `Observable` that emits a `Nomenclature<string>` containing the outcome of the role assignment.
    */
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

    /**
    * Unassigns a specific role to a user in the system.
    * 
    * @param roleId The unique identifier of the role to be unassigned.
    * @param userId The unique identifier of the user who will be removed from the role.
    * @returns An `Observable` that emits a `Nomenclature<string>` containing the outcome of the role unassignment.
    */
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