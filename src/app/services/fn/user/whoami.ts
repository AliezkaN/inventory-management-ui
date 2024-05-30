import {HttpClient, HttpContext, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {StrictHttpResponse} from "../../strict-http-response";
import {UserResponse} from "../../models/user/user-response";
import {RequestBuilder} from "../../request-builder";
import {filter, map} from "rxjs/operators";


export function whoAmI(http: HttpClient, rootUrl: string, context?: HttpContext) : Observable<StrictHttpResponse<UserResponse>> {
  const rb = new RequestBuilder(rootUrl, whoAmI.PATH, 'get');
  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserResponse>;
    })
  );
}

whoAmI.PATH = '/users/whoami'
