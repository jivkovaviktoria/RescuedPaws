import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';
import { Observable } from 'rxjs';
import { AnimalTypeProjection } from '../response-models/administration/animal-types/animalTypeProjection';
import { ApiEndpoints } from 'src/app/utilities/constants/common/api-endpoints.constants';
import { AnimalTypeFormModel } from '../response-models/administration/animal-types/animalTypeFormModel';

/**
 * A service for interacting with animal types.
 */
@Injectable({
  providedIn: 'root'
})
export class AnimalTypesService extends BaseService {

  /**
   * Retrieves the list of animal types from the server.
   * @returns An Observable that emits an array of AnimalTypeProjection objects.
   */
  public getAnimalTypes(): Observable<AnimalTypeProjection[]> {
    const result = this.http.get<AnimalTypeProjection[]>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.getAnimalTypes}`
    );

    return result;
  }

  /**
   * Retrieves an animal type from the server.
   * @param animalTypeId The ID of the animal type to retrieve.
   * @returns An Observable that emits an AnimalTypeFormModel object.
   */
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

  /**
   * Adds or updates an animal type on the server.
   * @param animalType The animal type to add or update.
   * @returns An Observable that emits an AnimalTypeProjection object.
   */
  public addOrUpdate(animalType: AnimalTypeFormModel): Observable<AnimalTypeProjection> {
    const result = this.http.post<AnimalTypeProjection>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.addOrUpdateAnimalType}`,
      animalType
    );

    return result;
  }

  /**
   * Deletes an animal type from the server.
   * @param animalTypeId The ID of the animal type to delete.
   * @returns An Observable that emits void.
   */
  public delete(animalTypeId: string): Observable<void> {
    const paramsObj = {
      animalTypeId: animalTypeId
    };

    const params = this.toHttpParams(paramsObj);

    return this.http.delete<void>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.deleteAnimalType}`,
      { params }
    );
  }
}
