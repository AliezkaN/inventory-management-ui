import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {CreateOrder} from "../../models/orders/create-order";
import {Observable} from "rxjs";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";
import {StrictHttpResponse} from "../../strict-http-response";

export interface CreateOrder$Params {
  body: CreateOrder
}

export function createOrder(http: HttpClient, rootUrl: string, params: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<{}>> {
  const rb = new RequestBuilder(rootUrl, createOrder.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}
createOrder.PATH = '/orders'
