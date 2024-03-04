import { NgModule } from "@angular/core";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RpPipesModule } from "src/app/pipes/rp-pipes.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
      SignUpComponent,
      SignInComponent,
    ],
    imports: [
        ReactiveFormsModule,
        RpPipesModule,
        RouterModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        SignUpComponent,
        SignInComponent
    ]
  })
  export class AuthenticationModule { }