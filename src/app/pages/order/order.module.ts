import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { SpinnerModule } from 'src/app/components/spinner/spinner.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { OrderComponent, OrderViewComponent } from './containers'
import { CommonModule } from '@angular/common'
import { OrderEditComponent } from './containers/order-edit/order-edit.component'

@NgModule({
  declarations: [OrderComponent, OrderViewComponent, OrderEditComponent],
  imports: [
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
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
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  exports: [],
})
export class OrderModule {}
