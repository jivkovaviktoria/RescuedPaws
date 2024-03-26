import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    protected http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http
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