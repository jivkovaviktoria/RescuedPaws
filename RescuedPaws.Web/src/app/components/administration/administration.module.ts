import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        RpPipesModule,
        CommonModule,
        RouterModule,
        MatSidenavModule,
        RouterModule,
        MatIconModule,
        SharedModule
    ],
    exports: [
        DashboardComponent
    ]
  })
  export class AdministrationModule { }