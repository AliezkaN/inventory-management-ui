import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserResponse} from "../models/user/user-response";
import {whoAmI} from "../fn/user/whoami";
import {map} from "rxjs/operators";
import {StrictHttpResponse} from "../strict-http-response";
import {updateUser, UserUpdateRequest$Params} from "../fn/user/update-user";

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  whoAmI$Response(context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return whoAmI(this.http, this.rootUrl, context);
  }

  whoAmI(context?: HttpContext): Observable<UserResponse> {
    return this.whoAmI$Response(context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    )
  }

  updateUser$Response(params: UserUpdateRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<UserResponse>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  updateUser(params: UserUpdateRequest$Params, context?: HttpContext): Observable<UserResponse> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserResponse>): UserResponse => r.body)
    )
  }

}
