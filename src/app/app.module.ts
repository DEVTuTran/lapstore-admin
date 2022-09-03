import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CustomerModule } from './pages/customer/customer.module';
import { ProductModule } from './pages/product/product.module';
import { AuthModule } from './pages/auth/auth.module';
import { OrderModule } from './pages/order/order.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { AuthInterceptor } from './pages/auth/auth-interceptor';
import { SettingModule } from './pages/setting/setting.module';
import { environment } from 'src/environments/environment';
import { InventoryModule } from './pages/inventory/inventory.module';
import { PopupModule } from './components/popup-modal/popup-modal.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    SharedModule,
    AuthModule,
    PopupModule,
    DashboardModule,
    CustomerModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    SettingModule,
    InventoryModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
