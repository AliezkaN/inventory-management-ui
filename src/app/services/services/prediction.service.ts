import {Injectable} from "@angular/core";
import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {PredictionResponse} from "../models/predictions/prediction-response";
import {predict} from "../fn/predictions/predict";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class PredictionService extends BaseService {

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  predict(context?: HttpContext) :Observable<PredictionResponse> {
    return predict(this.http, this.rootUrl, context).pipe(
      map(resp => resp.body)
    )
  }
}
