import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData {
  title: string
  name: string
  category: string
  message: string
  isAdd: boolean
  isEdit: boolean
  type: string
}

@Component({
  selector: 'app-subcategory-modal',
  templateUrl: './subcategory-modal.component.html',
  styleUrls: ['./subcategory-modal.component.scss'],
})
export class SubCategoryModalComponent implements OnInit {
  public categoryForm!: FormGroup
  constructor(
    public dialogRef: MatDialogRef<SubCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  onClick() {
    this.data.isAdd = true
    this.data.name = this.categoryForm.value.name
    const newData = {
      subCategoryName: this.data.name,
      category: this.data.category,
    }
    this.dialogRef.close({ newData, isAdd: this.data.isAdd })
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(5),
      ]),
      category: new FormControl(this.data.category, [Validators.required]),
    })
  }
}
