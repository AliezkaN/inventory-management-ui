import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {ShopResponse} from "../../models/shop/shop-response";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";
import {ShopUpdateRequest} from "../../models/shop/shop-update-request";

export interface ShopUpdate$Params {
  body: ShopUpdateRequest
}

export function updateShop(http: HttpClient, rootUrl: string, params: ShopUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<ShopResponse>> {
  const rb = new RequestBuilder(rootUrl, updateShop.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ShopResponse>;
    })
  );
}

updateShop.PATH = '/shops'
