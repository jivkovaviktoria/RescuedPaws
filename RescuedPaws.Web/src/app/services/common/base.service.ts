import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RpTableService } from "./rp-table.service";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected http: HttpClient;
    protected _rpTableService: RpTableService;

    /**
     * Creates an instance of BaseService.
     * @param http The HttpClient for making HTTP requests.
     * @param rpTableService The RpTableService for table operations.
     */
    constructor(http: HttpClient, rpTableService: RpTableService) {
        this.http = http;
        this._rpTableService = rpTableService;
    }

    /**
     * Converts an object to HttpParams.
     * @param obj The object to convert.
     * @returns The HttpParams created from the object.
     */
    protected toHttpParams(obj: any): HttpParams {
        let params = new HttpParams();

        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
                const value = obj[key];

                // Check if the value is a Date object
                if (value instanceof Date) {
                    params = params.append(key, value.toISOString());
                } else {
                    params = params.append(key, value.toString());
                }
            }
        }

        return params;
    }
}
