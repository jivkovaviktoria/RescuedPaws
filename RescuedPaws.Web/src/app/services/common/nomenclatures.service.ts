import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { Nomenclature } from "../response-models/common/nomenclature";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";

@Injectable({
    providedIn: 'root'
})
export class NomenclaturesService extends BaseService {

    /**
     * Retrieves a list of users from the nomenclatures endpoint.
     * @returns An observable of Nomenclature array containing user data.
     */
    public getUsers(): Observable<Nomenclature<string>[]> {
        return this.http.get<Nomenclature<string>[]>(
            `${ApiEndpoints.base}${ApiEndpoints.nomenclatures.users}`
        );
    }
}
