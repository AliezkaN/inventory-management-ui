import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {PredictionResponse} from "../../models/predictions/prediction-response";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";


export function predict(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<PredictionResponse>> {
  const rb = new RequestBuilder(rootUrl, predict.PATH, 'get');
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PredictionResponse>;
    })
  );
}

predict.PATH = '/predictions/predict'
