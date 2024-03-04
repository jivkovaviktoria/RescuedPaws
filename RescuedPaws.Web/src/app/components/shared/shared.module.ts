import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BaseComponent } from "./base/base.component";
import { RpLayoutComponent } from "./rp-layout/rp-layout.component";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        HomeComponent,
        BaseComponent,
        RpLayoutComponent
    ],
    imports: [
        RpPipesModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        HomeComponent,
        BaseComponent,
        RpLayoutComponent
    ]
  })
  export class SharedModule { }