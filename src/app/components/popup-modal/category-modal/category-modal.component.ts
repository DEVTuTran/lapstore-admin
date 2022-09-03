import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  name: string;
  thumbnail: string;
  message: string;
  isAdd: boolean;
  isEdit: boolean;
  type: string;
}

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  public categoryForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.data.isAdd = true;
    this.data.name = this.categoryForm.value.name;
    this.data.thumbnail = this.categoryForm.value.thumbnail;
    const newData = {
      categoryName: this.data.name,
    };
    this.dialogRef.close({ newData, isAdd: this.data.isAdd });
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }
}
