import { Component, OnInit, AfterViewInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import { Router } from '@angular/router'
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs'
import { routes } from 'src/app/consts'
import { formatVND } from 'src/utils/helper'
import { OrderService } from '../../services/order.service'
@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit, AfterViewInit {
  name!: string
  isDelete: boolean = false
  isLoading: boolean = false

  editIcon: string = '../../../assets/icons/edit-icon.svg'
  deleteIcon: string = '../../../assets/icons/trash-icon.svg'
  homeIcon: string = '../../../assets/icons/home-icon.svg'
  slashIcon: string = '../../../assets/icons/slash-icon.svg'

  tableColums: string[] = [
    'id',
    'product',
    'price',
    'status',
    'userId',
    'createAt',
    'action',
  ]
  routeName?: string
  orders = []
  pageEvent?: PageEvent
  datasource?: null
  pageIndex?: number
  pageSize?: number
  length?: number
  formatVND = formatVND

  eventDefault = {
    pageIndex: 0,
    pageSize: 10,
    length: 100,
  }

  public filter = {
    search: '',
  }

  public routers: typeof routes = routes
  private subjectKeyUp = new Subject<any>()

  constructor(
    private router: Router,
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.isLoading = true
    this.routeName = this.router.url
    this.getOrderList(this.eventDefault, this.filter)

    this.isLoading = false
  }

  ngAfterViewInit() {
    this.subjectKeyUp
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((d) => {
        this.filter.search = d
        this.getOrderList(this.eventDefault, this.filter)
      })
  }

  // edit product

  editOrder(id: string | null) {
    this.router.navigate([routes.EDIT_ORDER + id])
  }

  // search
  onSearch($event: any) {
    const value = $event.target.value
    this.subjectKeyUp.next(value)
  }

  getOrderList(event?: PageEvent, filter?: any) {
    this.isLoading = true
    this.orderService.getOrders(event, filter).subscribe(
      (response: any) => {
        if (response.error) {
        } else {
          this.orders = response.orders.data

          this.pageIndex = Number(response.orders.pagination.page) - 1
          this.pageSize = response.orders.pagination.totalRows
          this.length = response.orders.pagination.totals
        }
      },
      (error) => {}
    )
    this.isLoading = false
    return event
  }

  formatPrice(v: any) {
    return formatVND(
      v.reduce(
        (pre: number, cur: any) => pre + cur.quantity * cur.productDetail.price,
        0
      )
    )
  }
}
