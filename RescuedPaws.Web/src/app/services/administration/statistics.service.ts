import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateRequestFilter } from "../request-models/dateRequestFilter";
import { Observable } from "rxjs";
import { UserCountResponseModel } from "../response-models/administration/statistics/userCountResponseModel";
import { ApiEndpoints } from "src/app/utilities/constants/common/api-endpoints.constants";
import { BaseService } from "../common/base.service";
import { PostCountResponseModel } from "../response-models/administration/statistics/postCountResponseModel";
import { observableToBeFn } from "rxjs/internal/testing/TestScheduler";
import { EventCountResponseModel } from "../response-models/administration/statistics/eventCountResponseModel";

@Injectable({
    providedIn: 'root'
})
export class StatisticsService extends BaseService {

    public getUsersCount(dateRequestFilter: DateRequestFilter): Observable<UserCountResponseModel> {
        const params = this.toHttpParams(dateRequestFilter);

        const result = this.http.get<UserCountResponseModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.usersCount}`,
            { params }
        );

        return result;
    }

    public getPostsCount(dateRequestFilter: DateRequestFilter): Observable<PostCountResponseModel> {
        const params = this.toHttpParams(dateRequestFilter);

        const result = this.http.get<PostCountResponseModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.postsCount}`,
            { params }
        );

        return result;
    }

    public getEventsCount(dateRequestFilter: DateRequestFilter): Observable<EventCountResponseModel> {
        const params = this.toHttpParams(dateRequestFilter);

        const result = this.http.get<EventCountResponseModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.eventsCount}`,
            { params }
        );

        return result;
    }
}