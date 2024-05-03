import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimalSizeProjection } from '../response-models/administration/animal-sizes/animalSizeProjection';
import { ApiEndpoints } from 'src/app/utilities/constants/common/api-endpoints.constants';
import { BaseService } from '../common/base.service';
import { AnimalSizeFormModel } from '../response-models/administration/animal-sizes/animalSizeFormModel';
import { RpTableService } from '../common/rp-table.service';
import { HttpClient } from '@angular/common/http';

/**
 * A service for interacting with animal sizes.
 */
@Injectable({
  providedIn: 'root'
})
export class AnimalSizesService extends BaseService {

  constructor(http: HttpClient, rpTableService: RpTableService) {
    super(http, rpTableService);
  }
  
  /**
   * Retrieves the list of animal sizes from the server.
   * @returns An Observable that emits an array of AnimalSizeProjection objects.
   */
  public getAnimalSizes(): Observable<AnimalSizeProjection[]> {
    const params = {showOnlyActive: this._rpTableService.showOnlyActive};

    const result = this.http.get<AnimalSizeProjection[]>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.getAnimalSizes}`, {params}
    );

    return result;
  }

  /**
   * Retrieves an animal size from the server.
   * @param animalSizeId The ID of the animal size to retrieve.
   * @returns An Observable that emits an AnimalSizeFormModel object.
   */
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

  /**
   * Adds or updates an animal size on the server.
   * @param animalSize The animal size to add or update.
   * @returns An Observable that emits an AnimalSizeProjection object.
   */
  public addOrUpdate(animalSize: AnimalSizeFormModel): Observable<AnimalSizeProjection> {
    const result = this.http.post<AnimalSizeProjection>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.addOrUpdateAnimalSize}`,
      animalSize
    );

    return result;
  }

  /**
   * Deletes an animal size from the server.
   * @param animalSizeId The ID of the animal size to delete.
   * @returns An Observable that emits void.
   */
  public delete(animalSizeId: string): Observable<void> {
    const paramsObj = {
      id: animalSizeId
    };

    const params = this.toHttpParams(paramsObj);

    const result = this.http.delete<void>(
      `${ApiEndpoints.base}${ApiEndpoints.administration.deleteAnimalSize}`,
      { params }
    );

    return result;
  }
}
