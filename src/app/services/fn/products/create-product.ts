import {CreateProduct} from "../../models/product/create-product";
import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";

export interface CreateProduct$Params {
  body: CreateProduct
}

export function createProduct(http: HttpClient, rootUrl: string, params: CreateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>>{
  const rb = new RequestBuilder(rootUrl, createProduct.PATH, 'post');
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

createProduct.PATH = '/products'
