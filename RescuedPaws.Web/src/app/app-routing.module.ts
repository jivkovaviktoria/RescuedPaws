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
import { AnimalTypesComponent } from './components/administration/animal-types/animal-types.component';
import { AnimalSizesComponent } from './components/administration/animal-sizes/animal-sizes.component';
import { RpRoutes } from './utilities/constants/common/rp-routes.constants';

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
    canActivate: [AuthGuard],
    data: {
      routeName: RpRoutes.ADOPT
    }
  },
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'register',
    component: SignUpComponent,
  },
  {
    path: 'administration/users',
    component: UsersComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      routeName: RpRoutes.ADMIN_USERS
    }
  },
  {
    path: 'administration/organizations',
    component: OrganizationsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      routeName: RpRoutes.ADMIN_ORGANIZATIONS
    }
  },
  {
    path: 'administration/roles',
    component: RolesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      routeName: RpRoutes.ADMIN_ROLES
    }
  },
  {
    path: 'administration/animal-types',
    pathMatch: 'full',
    component: AnimalTypesComponent,
    canActivate: [AuthGuard],
    data: {
      routeName: RpRoutes.ADMIN_ANIMAL_TYPES
    }
  },
  {
    path: 'administration/animal-sizes',
    component: AnimalSizesComponent,
    canActivate: [AuthGuard],
    data: {
      routeName: RpRoutes.ADMIN_ANIMAL_SIZES
    }
  },
  {
    path: 'administration',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      routeName: RpRoutes.ADMIN
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
