import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer/containers/customer-list/customer-list.component';
import {
  CustomerComponent,
  CustomerEditComponent,
} from './pages/customer/containers/index';
import { DashboardPageComponent } from './pages/dashboard/containers/index';
import {
  InventoryListComponent,
  InventoryPageComponent,
} from './pages/inventory/containers';
import { InventoryDetailComponent } from './pages/inventory/containers/index';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderComponent } from './pages/order/containers';
import {
  ProductComponent,
  ProductCreateComponent,
  ProductEditComponent,
  ProductViewComponent,
  ProductDetailComponent,
} from './pages/product/containers/index';
import { SettingComponent } from './pages/setting/containers';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardPageComponent,
  },
  {
    path: 'customers',
    component: CustomerComponent,
    children: [
      { path: '', pathMatch: 'full', component: CustomerListComponent },
      { path: 'view', component: CustomerListComponent },
      { path: 'edit/:id', component: CustomerEditComponent },
    ],
  },
  {
    path: 'orders',
    pathMatch: 'full',
    component: OrderComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
    children: [
      { path: '', pathMatch: 'full', component: ProductViewComponent },
      { path: 'view', component: ProductViewComponent },
      { path: 'create', component: ProductCreateComponent },
      { path: 'detail/:id', component: ProductDetailComponent },
      { path: 'edit/:id', component: ProductEditComponent },
    ],
  },
  {
    path: 'inventory',
    component: InventoryPageComponent,
    children: [
      { path: '', pathMatch: 'full', component: InventoryListComponent },
      { path: 'view', component: InventoryListComponent },
      { path: 'detail/:id', component: InventoryDetailComponent },
    ],
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
