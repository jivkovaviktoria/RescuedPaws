import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/administration/statistics.service';
import { DateRequestFilter } from 'src/app/services/request-models/dateRequestFilter';
import { EventCountResponseModel } from 'src/app/services/response-models/administration/statistics/eventCountResponseModel';
import { PostCountResponseModel } from 'src/app/services/response-models/administration/statistics/postCountResponseModel';
import { UserCountResponseModel } from 'src/app/services/response-models/administration/statistics/userCountResponseModel';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public usersCount: number = 0;
  public organizationsCount: number = 0;
  public postsCount: number = 0;
  public eventsCount: number = 0;

  private readonly _statisticsService: StatisticsService;

  constructor(statisticsService: StatisticsService){
    this._statisticsService = statisticsService;
  }

  public ngOnInit(): void {
    const dateFilter: DateRequestFilter = {
      startDate: new Date(),
      endDate: new Date()
    };

    this._statisticsService.getUsersCount(dateFilter).subscribe({
      next: (result: UserCountResponseModel) => {
        this.usersCount = result.usersCount;
        this.organizationsCount = result.organizationsCount;
      }
    });

    this._statisticsService.getPostsCount(dateFilter).subscribe({
      next: (result: PostCountResponseModel) => {
        this.postsCount = result.value;
      }
    });

    this._statisticsService.getEventsCount(dateFilter).subscribe({
      next: (result: EventCountResponseModel) => {
        this.eventsCount = result.value;
      }
    });
  }

}
