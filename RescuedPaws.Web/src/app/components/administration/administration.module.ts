import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { UsersComponent } from './users/users.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { RolesComponent } from './roles/roles.component';
import { ViewRoleComponent } from './roles/view-role/view-role.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UsersComponent,
        ViewUserComponent,
        OrganizationsComponent,
        RolesComponent,
        ViewRoleComponent
    ],
    imports: [
        RpPipesModule,
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatIconModule,
        SharedModule
    ],
    exports: [
        DashboardComponent,
        UsersComponent,
        OrganizationsComponent,
        ViewRoleComponent
    ]
  })
  export class AdministrationModule { }