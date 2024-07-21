import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { ApiEndpoints } from '../utilities/constants/common/api-endpoints.constants';
import { AuthResponse } from './response-models/authentication/authResponse';
import { BaseService } from './common/base.service';
import { UserDataService } from './common/user-data.service';
import { RpTableService } from './common/rp-table.service';
import { UserFormModel } from './response-models/authentication/userFormModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  /**
   * Creates an instance of AuthenticationService.
   * @param http The HttpClient for making HTTP requests.
   * @param router The Router for navigation.
   * @param userDataService Service for managing user data.
   * @param rpTableService Service for table operations.
   */
  constructor(
    http: HttpClient,
    private router: Router,
    private userDataService: UserDataService,
    rpTableService: RpTableService
  ) {
    super(http, rpTableService);
  }

  /**
   * Checks if the user is logged in.
   * @returns True if the user is logged in, otherwise false.
   */
  public isLoggedIn(): boolean {
    return sessionStorage.getItem('bearer-token') !== null;
  }

  /**
   * Logs out the user and navigates to the home page.
   */
  public logout(): void {
    sessionStorage.removeItem('bearer-token');
    this.router.navigate(['/home']);
  }

  /**
   * Logs in the user with the provided authentication request.
   * @param authRequest The authentication request containing email and password.
   */
  public async login(authRequest: { email: string, password: string }): Promise<void> {
    const body = {
      email: authRequest.email,
      password: authRequest.password
    };

    const response$ = this.http.post<AuthResponse>(`${ApiEndpoints.base}${ApiEndpoints.auth.login}`, body);
    const result = await firstValueFrom(response$);

    sessionStorage.setItem('bearer-token', result.accessToken);
    this.userDataService.setUserRoutePermissions();
    this.router.navigate(['/home']);
  }

  /**
   * Registers a new user with the provided authentication request.
   * @param authRequest The authentication request containing username, email, and password.
   */
  public async register(authRequest: { username: string, email: string, password: string }): Promise<void> {
    const body = {
      email: authRequest.email,
      password: authRequest.password
    };

    const response$ = this.http.post<void>(`${ApiEndpoints.base}${ApiEndpoints.auth.register}`, body);
    await firstValueFrom(response$);

    await this.login(body);
    this.router.navigate(['/home']);
  }

  /**
   * Retrieves user data.
   * @returns An observable containing user form data.
   */
  public getUserData(): Observable<UserFormModel> {
    return this.http.get<UserFormModel>(`${ApiEndpoints.base}${ApiEndpoints.auth.getUserData}`);
  }
}
