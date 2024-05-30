import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {UserUpdateRequest} from "../../models/user/user-update-request";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {UserResponse} from "../../models/user/user-response";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";

export interface UserUpdateRequest$Params {
  body: UserUpdateRequest
}

export function updateUser(http: HttpClient, rootUrl: string, params: UserUpdateRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
  const rb = new RequestBuilder(rootUrl, updateUser.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserResponse>;
    })
  );
}

updateUser.PATH = '/users'
