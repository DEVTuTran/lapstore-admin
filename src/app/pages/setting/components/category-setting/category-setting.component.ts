import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CategoryModalComponent } from 'src/app/components/popup-modal/category-modal/category-modal.component'
import { ConfirmModalComponent } from 'src/app/components/popup-modal/confirm-modal/confirm-modal.component'
import { SubCategoryModalComponent } from 'src/app/components/popup-modal/subcategory-modal/subcategory-modal.component'
import { SettingService } from '../../services/setting.service'

@Component({
  selector: 'app-category-setting',
  templateUrl: './category-setting.component.html',
  styleUrls: ['./category-setting.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none', opacity: '0' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CategorySettingComponent implements OnInit {
  listCategories: any = []
  listSubCategories = []
  tableColums: string[] = [
    'categoryId',
    'categoryName',
    'subCategory',
    'createAt',
    'status',
    'action',
  ]
  categoryId?: string

  isAdd: boolean = false
  isDelete: boolean = false
  isEdit: boolean = false
  isConfirm: boolean = false
  isLoading: boolean = false

  photo: string = '../../../assets/icons/no-image-icon.svg'
  addIcon: string = '../../../assets/icons/plus.svg'
  editIcon: string = '../../../assets/icons/pencil-icon.svg'
  deleteIcon: string = '../../../assets/icons/trash-icon-sku.svg'
  chervonDown: string = '../../../assets/icons/chervon-down.svg'
  chervonUp: string = '../../../assets/icons/chervon-up.svg'

  constructor(
    private settingService: SettingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.getCategories()
    this.isLoading = false
  }

  getCategories() {
    this.settingService.getCategories().subscribe((response) => {
      this.listCategories = response.map((e: any) => {
        const data = {
          _id: e._id,
          categoryName: e.categoryName,
          createdAt: e.createdAt,
          active: e.active,
          isExpanded: false,
          subCategory: [],
        }

        return data
      })
    })
  }

  getSubCategories(id: string) {
    this.categoryId = id
    this.listCategories.find((i: any) => i._id == id).isExpanded =
      !this.listCategories.find((i: any) => i._id == id).isExpanded
    if (this.listCategories.find((i: any) => i._id == id).isExpanded) {
      this.settingService.getSubCategories(id).subscribe((response) => {
        this.listSubCategories = response
        this.listCategories.find((i: any) => i._id == id).subCategory = response.data
      })
    }
  }

  openEditStatusSub(id: string, name: string) {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: {
        title: 'C???p nh???t th??ng tin danh m???c con',
        message: 'B???n ch???c ch???n mu???n c???p nh???t th??ng tin danh m???c n??y?',
        name: name,
        type: 'sub',
        isAdd: this.isAdd,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isAdd) {
        this.settingService.updateStatusSubCategory(id, result.newData).subscribe(
          (response) => {
            this.isLoading = false
            this.snackBar.open('C???p nh???t th??ng tin danh m???c con th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__success',
            })
            this.getCategories()
          },
          (error) => {
            this.isLoading = false
            this.snackBar.open(
              'C???p nh???t th??ng tin danh m???c con kh??ng th??nh c??ng',
              '',
              {
                duration: 3000,
                panelClass: 'snackbar-notification__not-success',
              }
            )
          }
        )
      }
    })
  }
  // add category

  openDialogAdd() {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: {
        title: 'Th??m m???i danh m???c?',
        message: 'B???n ch???c ch???n mu???n th??m m???i danh m???c?',
        type: 'add',
        isAdd: this.isAdd,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isAdd) {
        this.settingService.addCategory(result.newData).subscribe(
          (response) => {
            this.isLoading = false
            this.snackBar.open('Th??m m???i danh m???c th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__success',
            })
            this.getCategories()
          },
          (error) => {
            this.isLoading = false
            this.snackBar.open('Th??m m???i danh m???c kh??ng th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    })
  }

  // add new subcategorys
  openDialogAddSub() {
    const dialogRef = this.dialog.open(SubCategoryModalComponent, {
      data: {
        title: 'Th??m m???i danh m???c con',
        message: 'B???n ch???c ch???n mu???n th??m m???i danh m???c con?',
        type: 'add',
        category: this.categoryId,
        isAdd: this.isAdd,
      },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isAdd) {
        this.settingService.addSubCategory(result.newData).subscribe(
          (response) => {
            this.isLoading = false
            this.snackBar.open('Th??m m???i danh m???c con th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__success',
            })
            this.getCategories()
          },
          (error) => {
            this.isLoading = false
            this.snackBar.open('Th??m m???i danh m???c con kh??ng th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    })
  }

  // edit category

  openDialogEdit(id: string, name: string) {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      data: {
        title: 'C???p nh???t th??ng tin danh m???c?',
        message: 'B???n ch???c ch???n mu???n c???p nh???t th??ng tin danh m???c n??y',
        name: name,
        type: 'edit',
        isAdd: this.isAdd,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isAdd) {
        this.settingService.editCategory(id, result.newData).subscribe(
          (response) => {
            this.isLoading = false
            this.snackBar.open('C???p nh???t th??ng tin danh m???c th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__success',
            })
            this.getCategories()
          },
          (error) => {
            this.isLoading = false
            this.snackBar.open('C???p nh???t th??ng tin danh m???c kh??ng th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    })
  }

  // change status

  openDialogConfirm(id: string, active: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'C???p nh???t tr???ng th??i danh m???c',
        message: 'B???n ch???c ch???n mu???n c???p nh???t tr???ng th??i cho danh m???c n??y',
        active: active,
        name: name,
        type: 'category',
        isConfirm: this.isConfirm,
      },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data = {
          active: !active,
        }
        this.settingService.editStatusCategory(id, data).subscribe(
          (response) => {
            this.isLoading = false
            this.snackBar.open('C???p nh???t tr???ng th??i th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__success',
            })
            this.getCategories()
          },
          (error) => {
            this.isLoading = false
            this.snackBar.open('C???p nh???t tr???ng th??i kh??ng th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    })
  }

  // change subcategory status

  openDialogSubConfirm(id: string, active: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'C???p nh???t tr???ng th??i danh m???c con',
        message: 'B???n ch???c ch???n mu???n c???p nh???t tr???ng th??i cho danh m???c con n??y?',
        active: active,
        type: 'category',
        isConfirm: this.isConfirm,
      },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data = {
          active: !active,
        }
        this.settingService.updateStatusSubCategory(id, data).subscribe(
          (response) => {
            this.isLoading = false
            this.snackBar.open('C???p nh???t tr???ng th??i th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__success',
            })
            this.getCategories()
          },
          (error) => {
            this.isLoading = false
            this.snackBar.open('C???p nh???t tr???ng th??i kh??ng th??nh c??ng', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    })
  }
}
