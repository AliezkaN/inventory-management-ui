import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {OrderStatsRequest} from "../../models/orders/order-stats-request";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {OrderStats} from "../../models/orders/order-stats";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";

export interface OrderStatsRequest$Params {
  body: OrderStatsRequest
}

export function getOrdersStats(http: HttpClient, rootUrl: string, params: OrderStatsRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderStats>> {
  const rb = new RequestBuilder(rootUrl, getOrdersStats.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrderStats>;
    })
  );
}

getOrdersStats.PATH = '/orders/stats'
