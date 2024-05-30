import {Injectable} from "@angular/core";
import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/orders/order";
import {getAllOrders} from "../fn/orders/get-all-orders";
import {map} from "rxjs/operators";
import {createOrder, CreateOrder$Params} from "../fn/orders/create-order";
import {deleteOrder} from "../fn/orders/delete-order";
import {getOrdersStats, OrderStatsRequest$Params} from "../fn/orders/get-orders-stats";
import {OrderStats} from "../models/orders/order-stats";

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getOrders(context?: HttpContext): Observable<Order[]> {
    return getAllOrders(this.http, this.rootUrl, context).pipe(
      map(resp => resp.body)
    )
  }

  getStats(params: OrderStatsRequest$Params, context?: HttpContext): Observable<OrderStats> {
    return getOrdersStats(this.http, this.rootUrl, params, context).pipe(
      map(resp => resp.body)
    )
  }

  create(params: CreateOrder$Params, context?: HttpContext): Observable<{}> {
    return createOrder(this.http, this.rootUrl, params, context).pipe(
      map(resp => resp.body)
    )
  }

  deleteOrder(orderId: number, context?: HttpContext): Observable<void> {
    return deleteOrder(this.http, this.rootUrl, orderId, context);
  }

}
