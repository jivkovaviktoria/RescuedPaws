import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BaseComponent } from "./base/base.component";
import { RpLayoutComponent } from "./rp-layout/rp-layout.component";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { RpSidebarComponent } from './rp-controls/rp-sidebar/rp-sidebar.component';
import { RpStatisticsCardComponent } from './rp-controls/rp-statistics-card/rp-statistics-card.component';

@NgModule({
    declarations: [
        HomeComponent,
        BaseComponent,
        RpLayoutComponent,
        RpSidebarComponent,
        RpStatisticsCardComponent,
    ],
    imports: [
        RpPipesModule,
        CommonModule,
        RouterModule,
        MatSidenavModule,
        RouterModule,
        MatIconModule
    ],
    exports: [
        HomeComponent,
        BaseComponent,
        RpLayoutComponent,
        RpSidebarComponent,
        RpStatisticsCardComponent
    ]
  })
  export class SharedModule { }