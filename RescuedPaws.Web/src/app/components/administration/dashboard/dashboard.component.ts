import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/administration/statistics.service';
import { DateRequestFilter } from 'src/app/services/request-models/dateRequestFilter';
import { EventCountResponseModel } from 'src/app/services/response-models/administration/statistics/eventCountResponseModel';
import { PostCountResponseModel } from 'src/app/services/response-models/administration/statistics/postCountResponseModel';
import { UserCountResponseModel } from 'src/app/services/response-models/administration/statistics/userCountResponseModel';
import { BaseComponent } from '../../shared/base/base.component';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit{
  public usersCount: number = 0;
  public organizationsCount: number = 0;
  public postsCount: number = 0;
  public eventsCount: number = 0;

  private readonly _statisticsService: StatisticsService;

  constructor(
    statisticsService: StatisticsService,
    languageService: LanguageService
  ){
    super(languageService);
    this._statisticsService = statisticsService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

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
