import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { ChartDataSets } from 'chart.js'
import { Color, Label } from 'ng2-charts'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('myCanvas') canvas!: ElementRef
  @Input()
  lineChartData!: ChartDataSets[]

  public lineChartLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  public lineChartColors: Color[] = [
    {
      borderColor: '#197D80',
    },
  ]
  public lineChartLegend = true
  public lineChartPlugins = []

  public chartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  constructor() {}
  ngAfterViewInit(): void {
    let gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 500)
    gradient.addColorStop(0, '#D4ECED')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    this.lineChartColors = [
      {
        backgroundColor: gradient,
      },
    ]
  }
}
