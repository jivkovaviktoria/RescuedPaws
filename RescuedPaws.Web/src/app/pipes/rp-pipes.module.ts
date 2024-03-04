import { NgModule } from "@angular/core";
import { RpTranslatePipe } from "./rpTranslate.pipe";

@NgModule({
    declarations: [
      RpTranslatePipe,
    ],
    imports: [
    ],
    exports: [
        RpTranslatePipe
    ]
  })
  export class RpPipesModule { }