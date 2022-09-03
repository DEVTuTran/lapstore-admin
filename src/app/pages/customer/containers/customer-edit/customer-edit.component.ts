import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUpload } from 'src/app/models/file-upload.model';
import { User, userInfor } from 'src/app/models/user.model';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SettingService } from 'src/app/pages/setting/services/setting.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
  public formUserInfor!: FormGroup;
  private basePath = '/uploads';

  isLoading: boolean = false;
  userId!: string | null;
  user!: User;
  userInfor!: userInfor;
  initData!: userInfor | null;
  photo: string = '../../../assets/imgs/avatar.jpg';

  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  provinces: any = [];
  districts: any = [];
  wards: any = [];

  constructor(
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public settingService: SettingService,
    private route: ActivatedRoute,
    public fileUploadService: FileUploadService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  formatData(data: any) {
    const date = data.profile?.dateOfBirth
      ? new Date(data.profile.dateOfBirth).toISOString()
      : new Date().toISOString();

    const userdata = {
      userName: data.username,
      email: data.email,
      dateOfBirth: date,
      phoneNumber: data.profile?.phoneNumber,
      photo: data.profile?.photo,
      address: data.profile?.address,
      province: data.profile?.province,
      district: data.profile?.district,
      wards: data.profile?.wards,
    };
    this.userInfor = userdata;
    this.initData = { ...this.userInfor };

    this.initFormValue();
  }

  // init user infor value

  initFormValue() {
    this.formUserInfor = new FormGroup({
      userName: new FormControl(
        { value: this.userInfor.userName, disabled: true },
        [Validators.required, Validators.minLength(6)]
      ),
      email: new FormControl({ value: this.userInfor.email, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      dateOfBirth: new FormControl(this.userInfor.dateOfBirth),
      phoneNumber: new FormControl(this.userInfor.phoneNumber),
      photo: new FormControl(this.userInfor.photo),
      address: new FormControl(this.userInfor.address),
      province: new FormControl(this.userInfor.province),
      district: new FormControl(this.userInfor.district),
      wards: new FormControl(this.userInfor.wards),
    });
  }

  // select province, district, wards

  selectProvince(dataSelect: any) {
    if (!dataSelect.value) {
      return;
    }
    let province = this.provinces.find(
      (item: any) => item.name == dataSelect.value
    );
    if (province) {
      this.districts = province.districts;
      this.userInfor.province = province.name;
    }
  }

  selectDistrict(dataSelect: any) {
    let district = this.districts.find(
      (item: any) => item.name == dataSelect.value
    );
    if (district) {
      this.wards = district.wards;
      this.userInfor.district = district.name;
    }
  }

  selectWard(dataSelect: any) {
    let ward = this.wards.find((item: any) => item.name == dataSelect.value);
    if (ward) {
      this.userInfor.wards = ward.name;
    }
  }

  // innit function

  public ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.route.snapshot.paramMap.get('id');

    this.getUser();

    this.settingService.getLocation().subscribe({
      next: (result) => {
        this.provinces = result;
        if (this.userInfor.province) {
          let province = this.provinces.find(
            (item: any) => item.name == this.userInfor.province
          );
          if (province) {
            this.districts = province.districts;
          }
        }
        if (this.userInfor.district) {
          let district = this.districts.find(
            (item: any) => item.name == this.userInfor.district
          );
          if (district) {
            this.wards = district.wards;
          }
        }
      },
      complete: () => {},
    });
    this.isLoading = false;
  }

  getUser() {
    this.settingService.getUser(this.userId).subscribe((data: any) => {
      this.formatData(data.user);
      this.isLoading = false;
    });
  }

  // upload image with firebase

  uploadImage(event: any) {
    this.isLoading = true;
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
    this.isLoading = false;
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
            this.userInfor.photo = downloadURL;
            this.formUserInfor.controls['photo'].markAsDirty();

            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  // edit user infor

  onEdit(data = this.formUserInfor.value) {
    this.isLoading = true;
    const dataFormat = {
      email: data.email,
      username: data.userName,
      profile: {
        phoneNumber: data.phoneNumber,
        photo: this.userInfor.photo,
        dateOfBirth: data.dateOfBirth,
        province: this.userInfor.province,
        district: this.userInfor.district,
        wards: this.userInfor.wards,
        address: data.address,
      },
    };

    if (!this.formUserInfor.dirty || this.formUserInfor.invalid) {
      this.isLoading = false;
      return;
    }

    this.settingService.editUserInfor(this.userId, dataFormat).subscribe(
      (response) => {
        this.snackBar.open('Edit user infor success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getUser();
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Edit user infor not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
    this.isLoading = false;
  }
}
