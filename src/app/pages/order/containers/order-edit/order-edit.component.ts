import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { EditOrderComponent } from 'src/app/components/popup-modal/edit-order-status/edit-order.component'
import { routes } from 'src/app/consts'
import { formatVND } from 'src/utils/helper'
import { OrderService } from '../../services/order.service'

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss'],
})
export class OrderEditComponent implements OnInit {
  public routers: typeof routes = routes

  photo: string = '../../../assets/icons/upload.svg'
  editIcon: string = '../../../assets/icons/edit-2.svg'

  homeIcon: string = '../../../assets/icons/home-icon.svg'
  slashIcon: string = '../../../assets/icons/slash-icon.svg'
  isLoading: boolean = false
  orderId?: string | null
  orderInfor: any
  formatVND = formatVND
  isEdit: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    public dialog: MatDialog,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.orderId = this.route.snapshot.paramMap.get('id')
    this.getOrderDetail(this.orderId)

    this.isLoading = false
  }

  getOrderDetail(id?: string | null) {
    this.orderService.getOrderDetail(id).subscribe((data) => {
      this.orderInfor = data
    })
  }

  // edit brand

  openDialogEdit(id: string, status: any): void {
    const dialogRef = this.dialog.open(EditOrderComponent, {
      data: {
        title: 'Cập nhật trạng thái đơn hàng',
        message: 'Bạn muốn cập nhật trạng thái đơn hàng ',
        type: 'edit',
        status: status,
        isEdit: this.isEdit,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isEdit) {
        this.editOrderStatus(id, result.newData)
      }
    })
  }

  editOrderStatus(id: string, data: any) {
    this.isLoading = true
    this.orderService.updateOrderStatus(id, data).subscribe(
      (response) => {
        this.isLoading = false
        this.getOrderDetail(this.orderId)

        this.snackBar.open('Cập nhật trạng thái đơn hàng thành công', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        })
      },
      (error) => {
        this.isLoading = false
        this.snackBar.open('Cập nhật trạng thái đơn hàng không thành công', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        })
      }
    )
  }
}
