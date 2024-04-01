import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { HomeComponent } from './components/shared/home/home.component';
import { ListComponent } from './components/adopt/list/list.component';
import { AuthGuard } from './guards/permission.guard';
import { DashboardComponent } from './components/administration/dashboard/dashboard.component';
import { UsersComponent } from './components/administration/users/users.component';
import { OrganizationsComponent } from './components/administration/organizations/organizations.component';
import { RolesComponent } from './components/administration/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'adopt',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: []
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'administration/users',
    component: UsersComponent,
    pathMatch: 'full'
  },
  {
    path: 'administration/organizations',
    component: OrganizationsComponent,
    pathMatch: 'full'
  },
  {
    path: 'administration/roles',
    component: RolesComponent,
    pathMatch: 'full'
  },
  {
    path: 'administration',
    component: DashboardComponent,
    pathMatch: 'full'
    //canActivate: [AuthGuard], // Assuming you have a guard for admin routes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
