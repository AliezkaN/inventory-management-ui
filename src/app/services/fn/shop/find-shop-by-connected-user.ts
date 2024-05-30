import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {ShopResponse} from "../../models/shop/shop-response";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";

export function findShopByConnectedUser(http: HttpClient, rootUrl: string, context?: HttpContext) : Observable<StrictHttpResponse<ShopResponse>> {

  const rb = new RequestBuilder(rootUrl, findShopByConnectedUser.PATH, 'get');
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ShopResponse>;
    })
  );
}

findShopByConnectedUser.PATH = '/shops'
