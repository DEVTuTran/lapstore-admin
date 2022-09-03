import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardPageComponent } from './containers/index';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/index';
import 'chartjs-adapter-date-fns';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';

@NgModule({
  declarations: [DashboardPageComponent, LineChartComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    SpinnerModule,
    MatButtonModule,
    ChartsModule,
  ],
  exports: [],
})
export class DashboardModule {}
