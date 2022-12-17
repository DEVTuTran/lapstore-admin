import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData {
  title: string
  message: string
  status: any
  isEdit: boolean
  type: string
}
@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  public order!: FormGroup

  public listStatus = [
    {
      label: 'Chờ xác nhận',
      value: 0,
    },
    {
      label: 'Đang giao hàng',
      value: 1,
    },
    {
      label: 'Đã giao hàng',
      value: 2,
    },
    {
      label: 'Hủy đơn hàng',
      value: 3,
    },
  ]
  constructor(
    public dialogRef: MatDialogRef<EditOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  onClick() {
    this.data.isEdit = true
    const newData = {
      status: this.order.value.status,
    }
    this.dialogRef.close({ newData, isEdit: this.data.isEdit })
  }

  ngOnInit(): void {
    this.order = new FormGroup({
      status: new FormControl(this.data.status, [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
    })
  }
}
