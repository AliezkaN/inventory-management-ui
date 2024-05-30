import {Injectable} from "@angular/core";
import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShopResponse} from "../models/shop/shop-response";
import {StrictHttpResponse} from "../strict-http-response";
import {map} from "rxjs/operators";
import {UserResponse} from "../models/user/user-response";
import {findShopByConnectedUser} from "../fn/shop/find-shop-by-connected-user";
import {ShopUpdate$Params, updateShop} from "../fn/shop/update-shop";

@Injectable({ providedIn: 'root' })
export class ShopService extends BaseService {

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  findShopByConnectedUser$Response(context?: HttpContext) : Observable<StrictHttpResponse<ShopResponse>> {
    return findShopByConnectedUser(this.http, this.rootUrl, context);
  }

  findShopByConnectedUser(context?: HttpContext): Observable<ShopResponse> {
    return this.findShopByConnectedUser$Response(context).pipe(
      map((r: StrictHttpResponse<UserResponse>): ShopResponse => r.body)
    )
  }

  updateShop$Response(params: ShopUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<ShopResponse>> {
    return updateShop(this.http, this.rootUrl, params, context);
  }

  updateShop(params: ShopUpdate$Params, context?: HttpContext): Observable<ShopResponse> {
    return this.updateShop$Response(params, context).pipe(
      map((r: StrictHttpResponse<ShopResponse>): ShopResponse => r.body)
    )
  }
}
