import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {AdminComponent} from './modules/admin/admin.component';
import {ManagerComponent} from './modules/manager/manager.component';
import {SidebarComponent} from './modules/manager/sidebar/sidebar.component';
import {OrdersComponent} from './modules/manager/pages/orders/orders.component';
import {ProductsComponent} from './modules/manager/pages/products/products.component';
import {ProfileComponent} from './modules/manager/pages/profile/profile.component';
import {HttpTokenInterceptor} from "./services/interceptors/http-token.interceptor";
import {CreateProductComponent} from './modules/manager/pages/products/create.product/create.product.component';
import {UpdateProductComponent} from './modules/manager/pages/products/update.product/update.product.component';
import {DashboardsComponent} from './modules/manager/pages/dashboards/dashboards.component';
import {
  ProductsQuantityDashboardComponent
} from './modules/manager/pages/dashboards/products.quantity.dashboard/products.quantity.dashboard.component';
import { CreateOrderComponent } from './modules/manager/pages/orders/create.order/create.order.component';
import { ProductsPriceDashboardComponent } from './modules/manager/pages/dashboards/products.price.dashboard/products.price.dashboard.component';
import { OrdersEarningsDashboardComponent } from './modules/manager/pages/dashboards/orders.earnings.dashboard/orders.earnings.dashboard.component';
import { SoldProductsDashboardComponent } from './modules/manager/pages/dashboards/sold.products.dashboard/sold.products.dashboard.component';
import { PredictionsComponent } from './modules/manager/pages/predictions/predictions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    ManagerComponent,
    SidebarComponent,
    OrdersComponent,
    ProductsComponent,
    ProfileComponent,
    CreateProductComponent,
    UpdateProductComponent,
    DashboardsComponent,
    ProductsQuantityDashboardComponent,
    CreateOrderComponent,
    ProductsPriceDashboardComponent,
    OrdersEarningsDashboardComponent,
    SoldProductsDashboardComponent,
    PredictionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
