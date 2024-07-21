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
export class DashboardComponent extends BaseComponent implements OnInit {
  public usersCount: number = 0;
  public organizationsCount: number = 0;
  public postsCount: number = 0;
  public eventsCount: number = 0;

  protected statisticsService: StatisticsService;

  /**
   * Creates an instance of DashboardComponent.
   * @param statisticsService Service for fetching statistics.
   * @param languageService Service for language operations.
   */
  constructor(
    statisticsService: StatisticsService,
    languageService: LanguageService
  ) {
    super(languageService);
    this.statisticsService = statisticsService;
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.loadStatistics();
  }

  /**
   * Loads all the statistics required for the dashboard.
   */
  private loadStatistics(): void {
    const dateFilter: DateRequestFilter = {
      startDate: new Date(),
      endDate: new Date()
    };

    this.loadUserStatistics(dateFilter);
    this.loadPostStatistics(dateFilter);
    this.loadEventStatistics(dateFilter);
  }

  /**
   * Loads user statistics from the statistics service.
   * @param dateFilter The date filter for the request.
   */
  private loadUserStatistics(dateFilter: DateRequestFilter): void {
    this.statisticsService.getUsersCount(dateFilter).subscribe({
      next: (result: UserCountResponseModel) => {
        this.usersCount = result.usersCount;
        this.organizationsCount = result.organizationsCount;
      },
      error: (error: any) => {
        console.error('Error fetching user statistics:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Loads post statistics from the statistics service.
   * @param dateFilter The date filter for the request.
   */
  private loadPostStatistics(dateFilter: DateRequestFilter): void {
    this.statisticsService.getPostsCount(dateFilter).subscribe({
      next: (result: PostCountResponseModel) => {
        this.postsCount = result.value;
      },
      error: (error: any) => {
        console.error('Error fetching post statistics:', error);
        // Handle error, e.g., display an error message
      }
    });
  }

  /**
   * Loads event statistics from the statistics service.
   * @param dateFilter The date filter for the request.
   */
  private loadEventStatistics(dateFilter: DateRequestFilter): void {
    this.statisticsService.getEventsCount(dateFilter).subscribe({
      next: (result: EventCountResponseModel) => {
        this.eventsCount = result.value;
      },
      error: (error: any) => {
        console.error('Error fetching event statistics:', error);
        // Handle error, e.g., display an error message
      }
    });
  }
}
