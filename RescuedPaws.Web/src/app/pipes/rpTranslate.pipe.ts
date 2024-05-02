import { Pipe, PipeTransform } from "@angular/core";
import { RpTranslateService } from "../services/rp-translate.service";

@Pipe({
  name: 'rpTranslate'
})
export class RpTranslatePipe implements PipeTransform {

  constructor(private translateService: RpTranslateService) { }

  transform(value: string, context: string = 'authentication', lang: string = 'bg'): string {
    return this.translateService.getTranslation(context, lang, value);
  }
}