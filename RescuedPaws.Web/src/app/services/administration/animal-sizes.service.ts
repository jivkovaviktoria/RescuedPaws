import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalSizeProjection } from '../response-models/administration/animal-sizes/animalSizeProjection';
import { ApiEndpoints } from 'src/app/utilities/constants/common/api-endpoints.constants';
import { BaseService } from '../common/base.service';
import { AnimalSizeFormModel } from '../response-models/administration/animal-sizes/animalSizeFormModel';

@Injectable({
  providedIn: 'root'
})
export class AnimalSizesService extends BaseService{
  
  public getAnimalSizes(): Observable<AnimalSizeProjection[]> {
    const result = this.http.get<AnimalSizeProjection[]>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.getAnimalSizes}`
    );

    return result;
  }

  public getAnimalSize(animalSizeId: string): Observable<AnimalSizeFormModel> {
    const paramsObj = {
      id: animalSizeId
    };

    const params = this.toHttpParams(paramsObj);

    const result = this.http.get<AnimalSizeFormModel>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.getAnimalSize}`,
      { params }
    );

    return result;
  }
}
