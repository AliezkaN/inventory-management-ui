import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {authGuard} from "./services/guard/auth.guard";
import {AdminComponent} from "./modules/admin/admin.component";
import {roleGuard} from "./services/guard/role.guard";
import {ManagerComponent} from "./modules/manager/manager.component";
import {ProductsComponent} from "./modules/manager/pages/products/products.component";
import {ProfileComponent} from "./modules/manager/pages/profile/profile.component";
import {CreateProductComponent} from "./modules/manager/pages/products/create.product/create.product.component";
import {UpdateProductComponent} from "./modules/manager/pages/products/update.product/update.product.component";
import {OrdersComponent} from "./modules/manager/pages/orders/orders.component";
import {DashboardsComponent} from "./modules/manager/pages/dashboards/dashboards.component";
import {CreateOrderComponent} from "./modules/manager/pages/orders/create.order/create.order.component";
import {PredictionsComponent} from "./modules/manager/pages/predictions/predictions.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard],
    data: {roles: ['ADMIN']}
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [authGuard, roleGuard],
    data: {roles: ['MANAGER']},
    children: [
      { path: 'profile', component: ProfileComponent },

      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: CreateProductComponent },
      { path: 'products/:id', component: UpdateProductComponent },

      { path: 'orders', component: OrdersComponent },
      { path: 'orders/add', component: CreateOrderComponent },

      { path: 'dashboards', component: DashboardsComponent },

      { path: 'predictions', component: PredictionsComponent },

      { path: '', redirectTo: 'profile', pathMatch: "full" }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
