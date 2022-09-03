import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingComponent } from './containers';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrandSettingComponent } from './components/brand-setting/brand-setting.component';
import { CategorySettingComponent } from './components/category-setting/category-setting.component';
import { InformationSettingComponent } from './components/information-setting/information-setting.component';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
@NgModule({
  declarations: [
    SettingComponent,
    BrandSettingComponent,
    CategorySettingComponent,
    InformationSettingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    SpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatSlideToggleModule,
  ],
  exports: [],
  bootstrap: [MatDatepickerModule, MatNativeDateModule],
})
export class SettingModule {}
