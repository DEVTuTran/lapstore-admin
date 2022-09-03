import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, Observable } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

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
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'],
})
export class EditBrandComponent implements OnInit {
  public brandForm!: FormGroup;
  private basePath = '/uploads';

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage: number = 0;

  photo: string = '../../../assets/icons/no-image-icon.svg';

  constructor(
    private fileUploadService: FileUploadService,
    private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<EditBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.data.isEdit = true;
    this.data.name = this.brandForm.value.name;
    this.data.thumbnail = this.brandForm.value.thumbnail;
    const newData = {
      brandName: this.data.name,
      brandThumbnail: this.data.thumbnail,
    };
    this.dialogRef.close({ newData, isEdit: this.data.isEdit });
  }

  ngOnInit(): void {
    this.brandForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      thumbnail: new FormControl(this.data.thumbnail),
    });
  }

  // upload image
  uploadImage(event: any) {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);

        this.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            this.data.thumbnail = downloadURL;
            this.brandForm.patchValue({
              thumbnail: downloadURL,
            });

            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.fileUploadService.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }
}
