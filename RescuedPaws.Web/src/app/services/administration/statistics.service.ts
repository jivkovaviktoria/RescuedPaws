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

/**
 * A service for interacting with statistics.
 */
@Injectable({
    providedIn: 'root'
})
export class StatisticsService extends BaseService {

    /**
     * Retrieves the count of users from the server.
     * @param dateRequestFilter The date filter to apply to the request.
     * @returns An Observable that emits a UserCountResponseModel object.
     */
    public getUsersCount(dateRequestFilter: DateRequestFilter): Observable<UserCountResponseModel> {
        const params = this.toHttpParams(dateRequestFilter);

        const result = this.http.get<UserCountResponseModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.usersCount}`,
            { params }
        );

        return result;
    }

    /**
     * Retrieves the count of posts from the server.
     * @param dateRequestFilter The date filter to apply to the request.
     * @returns An Observable that emits a PostCountResponseModel object.
     */
    public getPostsCount(dateRequestFilter: DateRequestFilter): Observable<PostCountResponseModel> {
        const params = this.toHttpParams(dateRequestFilter);

        const result = this.http.get<PostCountResponseModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.postsCount}`,
            { params }
        );

        return result;
    }

    /**
     * Retrieves the count of events from the server.
     * @param dateRequestFilter The date filter to apply to the request.
     * @returns An Observable that emits an EventCountResponseModel object.
     */
    public getEventsCount(dateRequestFilter: DateRequestFilter): Observable<EventCountResponseModel> {
        const params = this.toHttpParams(dateRequestFilter);

        const result = this.http.get<EventCountResponseModel>(
            `${ApiEndpoints.base}${ApiEndpoints.administration.eventsCount}`,
            { params }
        );

        return result;
    }
}