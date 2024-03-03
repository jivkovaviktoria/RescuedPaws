import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { RpTranslatePipe } from './pipes/rpTranslate.pipe';
import { RpLayoutComponent } from './components/shared/rp-layout/rp-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    RpTranslatePipe,
    RpLayoutComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
