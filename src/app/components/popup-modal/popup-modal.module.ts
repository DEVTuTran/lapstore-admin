import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { AddInventoryComponent } from './add-inventory/add-inventory.component'
import { DeleteModalComponent } from './delete-modal/delete-modal.component'
import { EditBrandComponent } from './edit-brand/edit-brand.component'
import { EditModalComponent } from './edit-modal/edit-modal.component'
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component'
import { CategoryModalComponent } from './category-modal/category-modal.component'
import { EditOrderComponent } from './edit-order-status/edit-order.component'

@NgModule({
  declarations: [
    EditModalComponent,
    DeleteModalComponent,
    AddInventoryComponent,
    EditBrandComponent,
    ConfirmModalComponent,
    CategoryModalComponent,
    EditOrderComponent,
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
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    CommonModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  exports: [],
  providers: [],
})
export class PopupModule {}
