import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FileUpload } from 'src/app/models/file-upload.model'
import { FileUploadService } from 'src/app/services/file-upload.service'
import { MatSnackBar } from '@angular/material/snack-bar'

export interface DialogData {
  title: string
  name: string
  thumbnail: string
  message: string
  isAdd: boolean
  isEdit: boolean
  type: string
}
@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'],
})
export class EditBrandComponent implements OnInit {
  public brandForm!: FormGroup

  selectedFiles?: FileList
  currentFileUpload?: FileUpload
  percentage: number = 0

  photo: string = '../../../assets/icons/no-image-icon.svg'

  constructor(
    public dialogRef: MatDialogRef<EditBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fileUploadService: FileUploadService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  onClick() {
    this.data.isEdit = true
    this.data.name = this.brandForm.value.name
    this.data.thumbnail = this.brandForm.value.thumbnail
    const newData = {
      brandName: this.data.name,
      brandThumbnail: this.data.thumbnail,
    }
    this.dialogRef.close({ newData, isEdit: this.data.isEdit })
  }

  ngOnInit(): void {
    this.brandForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      thumbnail: new FormControl(this.data.thumbnail),
    })
  }

  // upload image with firebase

  uploadImage(event: any) {
    this.selectedFiles = event.target.files

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0)

      this.selectedFiles = undefined

      if (file) {
        this.currentFileUpload = new FileUpload(file)

        this.fileUploadService.uploadImage(this.currentFileUpload.file).subscribe(
          (data) => {
            this.data.thumbnail = data.imagePath
            this.brandForm.patchValue({
              thumbnail: data.imagePath,
            })
          },
          (error) => {
            this.snackBar.open('Thêm thương hiệu không thành công', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    }
  }
}
