import {UpdateProduct} from "../../models/product/update-product";
import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {Product} from "../../models/product/product";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";

export interface UpdateProduct$Params {
  productId: number,
  body: UpdateProduct;
}

export function updateProduct(http: HttpClient, rootUrl: string, params: UpdateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<Product>> {
  const rb = new RequestBuilder(rootUrl, updateProduct.PATH + params.productId, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Product>;
    })
  );
}

updateProduct.PATH = '/products/'
