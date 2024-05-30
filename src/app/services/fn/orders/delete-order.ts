import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";

export function deleteOrder(http: HttpClient, rootUrl: string, orderId: number, context?: HttpContext): Observable<void> {
  return http.delete<void>(`${rootUrl}/orders/${orderId}`)
}
