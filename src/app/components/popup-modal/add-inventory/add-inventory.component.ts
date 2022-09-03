import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  name: string;
  message: string;
  quantity: number;
  isAdd: boolean;
  type: string;
}
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit {
  public quantityForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.data.isAdd = true;
    this.data.quantity = this.quantityForm.value.quantity;
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
    this.quantityForm = new FormGroup({
      quantity: new FormControl(this.data.quantity, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }
}
