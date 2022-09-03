import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductComponent, ProductCreateComponent } from './containers/index';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { ProductEditComponent } from './containers/product-edit/product-edit.component';
import { ProductViewComponent } from './containers/product-view/product-view.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCreateComponent,
    ProductViewComponent,
    ProductEditComponent,
    ProductDetailComponent,
  ],
  imports: [
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    SpinnerModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    CommonModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  exports: [],
  providers: [CurrencyPipe],
})
export class ProductModule {}
