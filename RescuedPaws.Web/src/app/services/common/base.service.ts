import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RpTableService } from "./rp-table.service";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected http: HttpClient;
    protected readonly _rpTableService: RpTableService;

    constructor(http: HttpClient, rpTableService: RpTableService) {
        this.http = http
        this._rpTableService = rpTableService;
    }

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