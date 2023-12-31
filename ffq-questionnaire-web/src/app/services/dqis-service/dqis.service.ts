import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FFQItemResponse} from '../../models/ffqitem-response';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FFQItemCalcRequest} from '../../models/ffqitem-calc-request';
import {FFQFoodNutrientsResponse} from 'src/app/models/ffqfoodnutrients-response';
import {FFQFoodItem} from 'src/app/models/ffqfooditem';
import {ɵangular_packages_forms_forms_q} from '@angular/forms';
import {Http, Headers, Response, RequestOptions, RequestMethod} from '@angular/http';
import {FFQNutrientlist} from 'src/app/models/ffqnutrientlist';
import {FFQNutrientsRecommendations} from 'src/app/models/ffqnutrients-recommendations';
import {FFQDQIS} from 'src/app/models/ffqdqis';
import {environment} from 'src/environments/environment';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class DQISService {

  endpoint = environment.foodServiceUrl + '/ffq';

  constructor(private http: HttpClient) {
  }

  /* Return the nutrients recommendations given a questionnaire id*/
  getDQISByQuestionnaireId(questionnaireId: string): Observable<FFQDQIS> {
    return this.http.get(this.endpoint + '/DQIS/calculate/' + questionnaireId).pipe(
      map(((item: FFQDQIS) => {
        return new FFQDQIS(
          item.questionnaireId,
          item.patientAge,
          item.foodCategoryRecList,
        );
      }))
    );
  }
}
