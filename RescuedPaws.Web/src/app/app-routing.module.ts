import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { HomeComponent } from './components/shared/home/home.component';
import { ListComponent } from './components/adopt/list/list.component';
import { AuthGuard } from './guards/permission.guard';
import { DashboardComponent } from './components/administration/dashboard/dashboard.component';

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
    path: 'administration',
    component: DashboardComponent, // This component would be the layout for admin section
    //canActivate: [AuthGuard], // Assuming you have a guard for admin routes
    // children: [
    //   {
    //     path: 'users', // Becomes 'administration/users'
    //     component: 
    //   },
    //   // Other admin routes can go here...
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
