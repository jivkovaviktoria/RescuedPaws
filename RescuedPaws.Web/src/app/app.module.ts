import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { RpTranslatePipe } from './pipes/rpTranslate.pipe';
import { RpLayoutComponent } from './components/shared/rp-layout/rp-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { HomeComponent } from './components/shared/home/home.component';
import { RouterModule } from '@angular/router';
import { BaseComponent } from './components/shared/base/base.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { RpPipesModule } from './pipes/rp-pipes.module';
import { SharedModule } from './components/shared/shared.module';

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
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
