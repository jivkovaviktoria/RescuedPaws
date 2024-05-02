import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { RpPipesModule } from './pipes/rp-pipes.module';
import { SharedModule } from './components/shared/shared.module';
import { AdoptModule } from './components/adopt/adopt.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdministrationModule } from './components/administration/administration.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    RpPipesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSidenavModule,
    MatSnackBarModule,
    HttpClientModule,
    SharedModule,
    AdoptModule,
    AdministrationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
