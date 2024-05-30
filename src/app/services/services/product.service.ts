import {Injectable} from "@angular/core";
import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product/product";
import {getAllProducts} from "../fn/products/get-all-products";
import {map} from "rxjs/operators";
import {StrictHttpResponse} from "../strict-http-response";
import {deleteProduct} from "../fn/products/delete-product";
import {createProduct, CreateProduct$Params} from "../fn/products/create-product";
import {getProductById} from "../fn/products/get-product-by-id";
import {updateProduct, UpdateProduct$Params} from "../fn/products/update-product";

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  getProducts$Response(context?: HttpContext): Observable<StrictHttpResponse<Product[]>> {
    return getAllProducts(this.http, this.rootUrl, context);
  }

  getProducts(context?: HttpContext): Observable<Product[]> {
    return this.getProducts$Response(context).pipe(
      map(response => response.body as Product[])
    )
  }

  getProductById(productId: number, context?: HttpContext): Observable<Product> {
    return getProductById(this.http, this.rootUrl, productId, context).pipe(
      map(resp => resp.body)
    );
  }

  createProduct(params: CreateProduct$Params, context?: HttpContext): Observable<{}> {
    return createProduct(this.http, this.rootUrl, params, context).pipe(
      map(resp => resp.body)
    )
  }

  updateProduct(params: UpdateProduct$Params, context?: HttpContext): Observable<Product> {
    return updateProduct(this.http, this.rootUrl, params, context).pipe(
      map(resp => resp.body)
    )
  }

  deleteProduct(productId: number, context?: HttpContext): Observable<void> {
    return deleteProduct(this.http, this.rootUrl, productId, context);
  }

}
