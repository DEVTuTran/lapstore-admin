import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('myCanvas') canvas!: ElementRef;

  public lineChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Sales order',
      lineTension: 0,
    },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartColors: Color[] = [
    {
      borderColor: '#197D80',
    },
  ];
  public lineChartLegend = true;
  public lineChartPlugins = [];

  public chartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor() {}

  ngAfterViewInit(): void {
    let gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, '#D4ECED');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    this.lineChartColors = [
      {
        backgroundColor: gradient,
      },
    ];
  }
}
