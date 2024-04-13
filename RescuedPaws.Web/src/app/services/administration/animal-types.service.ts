import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';
import { Observable } from 'rxjs';
import { AnimalTypeProjection } from '../response-models/administration/animal-types/animalTypeProjection';
import { ApiEndpoints } from 'src/app/utilities/constants/common/api-endpoints.constants';
import { AnimalTypeFormModel } from '../response-models/administration/animal-types/animalTypeFormModel';

@Injectable({
  providedIn: 'root'
})
export class AnimalTypesService extends BaseService {

  public getAnimalTypes(): Observable<AnimalTypeProjection[]> {
    const result = this.http.get<AnimalTypeProjection[]>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.getAnimalTypes}`
    );

    return result;
  }

  public getAnimalType(animalTypeId: string): Observable<AnimalTypeFormModel> {
    const paramsObj = {
      id: animalTypeId
    };

    const params = this.toHttpParams(paramsObj);

    const result = this.http.get<AnimalTypeFormModel>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.getAnimalType}`,
      { params }
    );

    return result;
  }
}
