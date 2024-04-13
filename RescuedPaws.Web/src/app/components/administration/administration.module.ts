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
import { AnimalTypesComponent } from './animal-types/animal-types.component';
import { ViewAnimalTypeComponent } from './animal-types/view-animal-type/view-animal-type.component';
import { AnimalSizesComponent } from './animal-sizes/animal-sizes.component';
import { ViewAnimalSizeComponent } from './animal-sizes/view-animal-size/view-animal-size.component';

@NgModule({
    declarations: [
        DashboardComponent,
        UsersComponent,
        ViewUserComponent,
        OrganizationsComponent,
        RolesComponent,
        ViewRoleComponent,
        AnimalTypesComponent,
        ViewAnimalTypeComponent,
        AnimalSizesComponent,
        ViewAnimalSizeComponent
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