import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {Product} from "../../models/product/product";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";

export function getAllProducts(http: HttpClient, rootUrl: string, context?: HttpContext): Observable<StrictHttpResponse<Product[]>> {
  const rb = new RequestBuilder(rootUrl, getAllProducts.PATH, 'get');
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Product[]>;
    })
  );
}
getAllProducts.PATH = '/products'
