import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BaseComponent } from "./base/base.component";
import { RpLayoutComponent } from "./rp-layout/rp-layout.component";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RpSidebarComponent } from './rp-controls/rp-sidebar/rp-sidebar.component';
import { RpStatisticsCardComponent } from './rp-controls/rp-statistics-card/rp-statistics-card.component';
import { RpTableComponent } from './rp-controls/rp-table/rp-table.component';
import { RpDialogComponent } from './rp-controls/rp-dialog/rp-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
} from '@angular/material/dialog';
import { RpConfirmDeleteComponent } from './rp-controls/rp-dialog/rp-confirm-delete/rp-confirm-delete.component';
import { UserInfoComponent } from './rp-layout/user-info/user-info.component';

@NgModule({
    declarations: [
        HomeComponent,
        BaseComponent,
        RpLayoutComponent,
        RpSidebarComponent,
        RpStatisticsCardComponent,
        RpTableComponent,
        RpDialogComponent,
        RpConfirmDeleteComponent,
        UserInfoComponent,
    ],
    imports: [
        RpPipesModule,
        CommonModule,
        RouterModule,
        MatSidenavModule,
        RouterModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatSlideToggleModule
    ],
    exports: [
        HomeComponent,
        BaseComponent,
        RpLayoutComponent,
        RpSidebarComponent,
        RpStatisticsCardComponent,
        RpTableComponent
    ]
})
export class SharedModule { }