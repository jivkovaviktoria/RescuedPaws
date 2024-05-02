import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserDataService } from "../services/common/user-data.service";

@Injectable({
  providedIn: 'root'
})
class PermissionGuard {
  private userDataService: UserDataService;
  private router: Router;

  constructor(router: Router, userDataService: UserDataService) {
    this.router = router;
    this.userDataService = userDataService;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('bearer-token') != undefined 
    && localStorage['userRoutePermissions'].includes(next.data['routeName'])) {
      return true;
    }
    else {
      this.router.navigate(['/register']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionGuard).canActivate(next, state);
}