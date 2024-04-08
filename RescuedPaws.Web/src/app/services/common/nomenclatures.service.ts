import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { Nomenclature } from "../response-models/common/nomenclature";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";

@Injectable({
    providedIn: 'root'
})
export class NomenclaturesService extends BaseService {
    
    public getUsers(): Observable<Nomenclature<string>[]> {
        const result = this.http.get<Nomenclature<string>[]>(
            `${ApiEndpoints.base}${ApiEndpoints.nomenclatures.users}`
        );

        return result;
    }
}