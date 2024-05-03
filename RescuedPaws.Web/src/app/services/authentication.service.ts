import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../utilities/constants/common/api-endpoints.constants';
import { AuthResponse } from './response-models/authentication/authResponse';
import { BaseService } from './common/base.service';
import { UserDataService } from './common/user-data.service';
import { RpTableService } from './common/rp-table.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  private router: Router;
  private userDataService: UserDataService;

  constructor(http: HttpClient,
              router: Router,
              userDataService: UserDataService,
              rpTableService: RpTableService) {
    super(http, rpTableService);
    
    this.router = router;
    this.userDataService = userDataService;
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem('bearer-token') != undefined;
  }

  public logout(): void {
    sessionStorage.removeItem('bearer-token');
    this.router.navigate(['/home']);
  }

  public async login(authRequest: { email: string, password: string }): Promise<void> {
    const body = {
      email: authRequest.email,
      password: authRequest.password
    }

    await this.http.post<AuthResponse>(`${ApiEndpoints.base}${ApiEndpoints.auth.login}`, body).subscribe({
      next: (result: AuthResponse) => {
        sessionStorage.setItem('bearer-token', result.accessToken);
        this.userDataService.setUserRoutePermissions();

        this.router.navigate(['/home']);
      }
    });
  }

  public async register(authRequest: { username: string, email: string, password: string }): Promise<void> {
    const body = {
      email: authRequest.email,
      password: authRequest.password
    }

    await this.http.post<void>(`${ApiEndpoints.base}${ApiEndpoints.auth.register}`, body).subscribe({
      next: () => {
        this.login(body);
        this.router.navigate(['/home']);
      }
    });
  }
}

