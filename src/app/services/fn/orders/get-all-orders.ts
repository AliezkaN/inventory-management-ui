import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {Order} from "../../models/orders/order";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";

export function getAllOrders(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<Order[]>> {
  const rb = new RequestBuilder(rootUrl, getAllOrders.PATH, 'get');
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Order[]>;
    })
  );
}

getAllOrders.PATH = '/orders'
