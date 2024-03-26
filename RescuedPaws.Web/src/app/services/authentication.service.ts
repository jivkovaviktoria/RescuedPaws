import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../utilities/constants/common/api-endpoints.constants';
import { AuthResponse } from './response-models/authentication/authResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private http: HttpClient;
  private router: Router;

  constructor(http: HttpClient, router: Router) {
    this.http = http
    this.router = router;
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem('bearer-token') != undefined;
  }

  public logout(): void {
    sessionStorage.removeItem('bearer-token');
    this.router.navigate(['/home']);
  }

  public async login(authRequest: {email: string, password: string}): Promise<void> {
    const body = {
      email: authRequest.email,
      password: authRequest.password
    }

    const result = this.http.post<AuthResponse>(`${ApiEndpoints.base}${ApiEndpoints.auth.login}`, body).subscribe({
      next: (result: AuthResponse) => {
        sessionStorage.setItem('bearer-token', result.accessToken);
        this.router.navigate(['/home']);
      }
    });
  }

  public async register(authRequest: {username: string, email: string, password: string}): Promise<void> {
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

