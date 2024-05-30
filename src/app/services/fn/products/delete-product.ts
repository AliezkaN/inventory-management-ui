import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";

export function deleteProduct(http: HttpClient, rootUrl: string, productId: number,  context?: HttpContext): Observable<void> {
  const path = '/products/' + productId
  return http.delete<void>(rootUrl+path)
}
