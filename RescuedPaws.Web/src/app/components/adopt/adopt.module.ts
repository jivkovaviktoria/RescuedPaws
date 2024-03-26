import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { CardComponent } from "./card/card.component";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ListComponent,
        CardComponent
    ],
    imports: [
        RpPipesModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        ListComponent,
        CardComponent
    ]
  })
  export class AdoptModule { }