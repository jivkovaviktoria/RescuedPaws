import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { CardComponent } from "./card/card.component";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from "@angular/material/dialog";
import {MatTooltipModule} from '@angular/material/tooltip';
import { FiltersComponent } from './list/filters/filters.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
    declarations: [
        ListComponent,
        CardComponent,
        FiltersComponent
    ],
    imports: [
        RpPipesModule,
        CommonModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatMenuModule,
        MatDialogModule,
        MatTooltipModule,
        MatAutocompleteModule
    ],
    exports: [
        ListComponent,
        CardComponent
    ]
  })
  export class AdoptModule { }