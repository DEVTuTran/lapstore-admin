import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerListComponent } from './pages/customer/containers/customer-list/customer-list.component'
import {
  CustomerComponent,
  CustomerEditComponent,
} from './pages/customer/containers/index'
import { DashboardPageComponent } from './pages/dashboard/containers/index'
import {
  InventoryListComponent,
  InventoryPageComponent,
} from './pages/inventory/containers'
import { InventoryDetailComponent } from './pages/inventory/containers/index'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { OrderComponent, OrderViewComponent } from './pages/order/containers'
import { OrderEditComponent } from './pages/order/containers/order-edit/order-edit.component'
import {
  ProductComponent,
  ProductCreateComponent,
  ProductEditComponent,
  ProductViewComponent,
  ProductDetailComponent,
} from './pages/product/containers/index'
import { SettingComponent } from './pages/setting/containers'
import { LoginGuard } from './services/guards/login.guard'

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'customers',
    component: CustomerComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', pathMatch: 'full', component: CustomerListComponent },
      { path: 'view', component: CustomerListComponent },
      { path: 'edit/:id', component: CustomerEditComponent },
    ],
  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', pathMatch: 'full', component: OrderViewComponent },
      { path: 'view', component: OrderViewComponent },
      { path: 'edit/:id', component: OrderEditComponent },
    ],
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [LoginGuard],
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
    canActivate: [LoginGuard],
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
    canActivate: [LoginGuard],
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
