import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DashboardService } from 'src/app/pages/dashboard/services/dashboard.service'
import { formatVND } from 'src/utils/helper'
import { routes } from 'src/app/consts'
import { ChartDataSets } from 'chart.js'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  homeIcon: string = '../../../assets/icons/home-icon.svg'
  slashIcon: string = '../../../assets/icons/slash-icon.svg'
  formatVND = formatVND

  numberProduct!: number
  numberCustomer!: number
  dashboardInfo: any
  isLoading: boolean = false
  chart: any

  public lineChartData: ChartDataSets[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      label: 'Sales order',
      lineTension: 0,
    },
  ]

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true
    this.getDashboardInfo()
    this.isLoading = false
  }

  getDashboardInfo() {
    this.dashboardService.dashboardInfo().subscribe((response) => {
      this.dashboardInfo = response
      this.chart = response.chart.map((v: any) => v.value)
      this.lineChartData = [
        {
          data: this.chart,
          label: 'Sales order',
          lineTension: 0,
        },
      ]
    })
  }

  editOrder(id: string | null) {
    this.router.navigate([routes.EDIT_ORDER + id])
  }
}
