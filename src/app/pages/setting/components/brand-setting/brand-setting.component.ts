import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from 'src/app/components/popup-modal/confirm-modal/confirm-modal.component';
import { EditBrandComponent } from 'src/app/components/popup-modal/edit-brand/edit-brand.component';
import { IBrand } from 'src/app/models/brand.model';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-brand-setting',
  templateUrl: './brand-setting.component.html',
  styleUrls: ['./brand-setting.component.scss'],
})
export class BrandSettingComponent implements OnInit {
  listBrands = [];
  tableColums: string[] = [
    'thumbnail',
    'brandId',
    'brandName',
    'createAt',
    'status',
    'action',
  ];

  isAdd: boolean = false;
  isDelete: boolean = false;
  isEdit: boolean = false;
  isConfirm: boolean = false;
  isLoading: boolean = false;

  photo: string = '../../../assets/icons/no-image-icon.svg';
  addIcon: string = '../../../assets/icons/plus.svg';
  editIcon: string = '../../../assets/icons/pencil-icon.svg';
  deleteIcon: string = '../../../assets/icons/trash-icon-sku.svg';

  constructor(
    private settingService: SettingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getBrands();
    this.isLoading = false;
  }

  getBrands() {
    this.settingService.getBrands().subscribe((response) => {
      this.listBrands = response;
    });
  }

  // edit brand

  openDialogEdit(
    id: string,
    name: string | null,
    brandThumbnail: string
  ): void {
    const dialogRef = this.dialog.open(EditBrandComponent, {
      data: {
        title: 'Edit brand',
        message: 'Would you like to edit brand ',
        name: name,
        type: 'edit',
        thumbnail: brandThumbnail,
        isEdit: this.isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isEdit) {
        this.editBrand(id, result.newData);
      }
    });
  }

  editBrand(id: string, data: any) {
    this.isLoading = true;
    this.settingService.editBrand(id, data).subscribe(
      (response) => {
        this.isLoading = false;
        this.snackBar.open('Edit brand success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getBrands();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Edit brand not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }

  // add new brand

  openDialogAdd() {
    const dialogRef = this.dialog.open(EditBrandComponent, {
      data: {
        title: 'Add new brand',
        message: 'Are you sure you want to add new brand',
        type: 'add',
        isAdd: this.isAdd,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isEdit) {
        this.addNewBrand(result.newData);
      }
    });
  }

  addNewBrand(data: IBrand) {
    this.isLoading = true;

    this.settingService.addBrand(data).subscribe(
      (response) => {
        this.isLoading = false;
        this.snackBar.open('Add new brand success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getBrands();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Add new brand not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }

  // confirm dialog

  openDialogConfirm(id: string, active: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Change status for brand?',
        message: 'Are you sure you want to change status for brand',
        active: active,
        name: name,
        type: 'brand',
        isConfirm: this.isConfirm,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data = {
          active: !active,
        };
        this.isLoading = true;

        this.settingService.changeActiveBrand(id, data).subscribe(
          (response) => {
            this.isLoading = false;
            this.snackBar.open('Change status for brand success', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__success',
            });
            this.getBrands();
          },
          (error) => {
            this.isLoading = false;
            this.snackBar.open('Change status for brand not success', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            });
          }
        );
      }
    });
  }
}
