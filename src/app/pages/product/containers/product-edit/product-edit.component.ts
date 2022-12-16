import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { AddInventoryComponent } from 'src/app/components/popup-modal/add-inventory/add-inventory.component'
import { EditModalComponent } from 'src/app/components/popup-modal/edit-modal/edit-modal.component'
import { routes } from 'src/app/consts'
import { IBrand } from 'src/app/models/brand.model'
import { ICategory } from 'src/app/models/category.model'
import { FileUpload } from 'src/app/models/file-upload.model'
import { IProduct } from 'src/app/models/product.model'
import { ISubCategory } from 'src/app/models/subCategory.model'
import { ProductService } from '../../services/product.service'
import { FileUploadService } from 'src/app/services/file-upload.service'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  public routers: typeof routes = routes
  public formDataProduct!: FormGroup
  isEdit: boolean = false
  isAdd: boolean = false
  productId?: string | null
  productInfor!: IProduct

  name!: string
  isDelete: boolean = false
  isLoading: boolean = false

  categoryId: string[] = []
  subCategoryId: string[] = []
  brandId?: string

  categories!: ICategory[]
  brands!: IBrand[]
  subCategories!: ISubCategory[]
  arraySubcategory: any[] = [[]]

  selectedFiles?: FileList
  currentFileUpload?: FileUpload
  percentage: number = 0

  photo: string = '../../../assets/icons/upload.svg'

  homeIcon: string = '../../../assets/icons/home-icon.svg'
  slashIcon: string = '../../../assets/icons/slash-icon.svg'

  hideButton = false

  rams: string[] = ['8GB', '16GB', '32GB']
  cpus: string[] = [
    'M1',
    'M2',
    'Core I3',
    'Core I5',
    'Core I7',
    'Ryzen 3',
    'Ryzen 5',
    'Ryzen 7',
  ]
  screens: string[] = ['13.3', '13.6', '14', '16']

  constructor(
    private productService: ProductService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    public dialog: MatDialog,
    private fbd: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.productId = this.route.snapshot.paramMap.get('id')
    this.getProductDetail(this.productId)
    this.isLoading = false
  }

  initFormValue() {
    this.formDataProduct = new FormGroup({
      brand: new FormControl(this.productInfor.brand, [Validators.required]),
      category: new FormArray([this.createCategoryArray()]),
      description: new FormControl(this.productInfor.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
      discount: new FormControl(this.productInfor.discount, [
        Validators.required,
        Validators.min(0),
      ]),
      price: new FormControl(this.productInfor.price, [
        Validators.required,
        Validators.min(1000000),
      ]),
      productName: new FormControl(this.productInfor.productName, [
        Validators.required,
        Validators.minLength(10),
      ]),
      productThumbnail: new FormControl(this.productInfor.productThumbnail, [
        Validators.required,
      ]),
      ram: new FormControl(this.productInfor.ram, [Validators.required]),
      cpu: new FormControl(this.productInfor.cpu, [Validators.required]),
      screen: new FormControl(this.productInfor.screen, [Validators.required]),
      specs: new FormArray([this.createFormArray()]),
      rating: new FormControl(this.productInfor.rating),
      subCategory: new FormArray([this.createSubCategoryArray()]),
    })
  }

  createCategoryArray() {
    return new FormGroup({
      id: new FormControl(),
    })
  }

  createSubCategoryArray() {
    return new FormGroup({
      id: new FormControl(),
    })
  }

  createFormArray() {
    return new FormGroup({
      key: new FormControl(this.productInfor.specs[0]?.key),
      value: new FormControl(this.productInfor.specs[0]?.value),
    })
  }

  get formCategory() {
    return this.formDataProduct.get('category') as FormArray
  }

  get formSubCategory() {
    return this.formDataProduct.get('subCategory') as FormArray
  }

  get formArr() {
    return this.formDataProduct.get('specs') as FormArray
  }

  changeItem() {
    this.hideButton = !this.hideButton
    const arr = this.formDataProduct.get('specs') as FormArray
    this.productInfor?.specs
      .slice(8, this.productInfor?.specs.length)
      .forEach((i) => {
        arr.push(this.fbd.group(i))
      })
  }

  // get data

  getProductDetail(id?: string | null) {
    this.productService.getProductDetail(id).subscribe((data) => {
      this.productInfor = data
      this.categoryId = data.category
      this.subCategoryId = data.subCategory
      this.brandId = data.brand
      if (!this.brandId || !this.categoryId || !this.subCategoryId) {
        return
      }
      this.getBrands()

      this.getCategories()

      //this.getSubCategories(this.categoryId[0]);

      this.initFormValue()

      const arr = this.formDataProduct.get('specs') as FormArray
      this.productInfor?.specs.slice(1, 7).forEach((i) => {
        arr.push(this.fbd.group(i))
      })
    })
  }

  // get brands

  getBrands() {
    this.productService.getBrands().subscribe((response) => {
      this.brands = response
    })
  }

  getCategories() {
    this.productService.getCategories().subscribe((response) => {
      this.categories = response

      let categoryArr = this.formDataProduct.get('category') as FormArray

      const newcategories = this.categories.map((i: any) => {
        this.getSubCategory(i._id)
        const data = {
          id: i._id,
        }
        return data
      })

      newcategories.forEach((i: any) => {
        categoryArr.push(this.fbd.group(i))
      })
    })
  }

  // get subcategory

  getSubCategory(id: string) {
    this.productService.getSubCategoriesByCT(id).then((response: any) => {
      this.subCategories = response.data
      this.arraySubcategory.push(this.subCategories)
      let subCategoryArr = this.formDataProduct.get('subCategory') as FormArray

      const arrayCheck = this.subCategoryId.map((i) => {
        const check = this.subCategories.filter((e) => e._id == i)

        return check
      })
      const test = arrayCheck.find((i) => {
        return i.length > 0
      })

      let newsubcategories
      if (test && test.length > 0) {
        newsubcategories = {
          id: test[0]._id,
        }
      } else {
        newsubcategories = {
          id: this.subCategories[0]?._id,
        }
      }
      subCategoryArr.push(this.fbd.group(newsubcategories))
    })
  }

  // upload image with firebase

  uploadImage(event: any) {
    this.isLoading = true
    this.selectedFiles = event.target.files

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0)

      this.selectedFiles = undefined

      if (file) {
        this.currentFileUpload = new FileUpload(file)

        this.fileUploadService.uploadImage(this.currentFileUpload.file).subscribe(
          (data) => {
            this.productInfor.productThumbnail = data.imagePath

            this.formDataProduct.controls['productThumbnail'].markAsDirty()
            this.formDataProduct.patchValue({
              productThumbnail: data.imagePath,
            })
          },
          (error) => {
            this.snackBar.open('Upload image not success', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    }
    this.isLoading = false
  }

  selectRam(data: any) {
    this.productInfor.ram = data.value
  }
  selectCpu(data: any) {
    this.productInfor.cpu = data.value
  }
  selectScreen(data: any) {
    this.productInfor.screen = data.value
  }
  // select category
  selectCategory(data: any) {
    this.categoryId = data.value
    this.productInfor.category = data.value
    if (this.categoryId) {
      //this.getSubCategories(this.categoryId);
    }
  }

  // select brands
  selectBrands(data: any) {
    this.productInfor.brand = data.value
  }

  // select subcategory
  selectSubCategory(data: any) {
    this.productInfor.subCategory = data.any
  }

  // increment decrement value

  // price action change value
  incrementPrice() {
    let currentVlue = this.formDataProduct.value.price
    this.formDataProduct.patchValue({
      price: (currentVlue += 1000000),
    })
    this.formDataProduct.controls['price'].markAsDirty()
  }
  decrementPrice() {
    // this.formDataProduct.controls['quantity'].markAsDirty();
    let currentVlue = this.formDataProduct.value.price

    this.formDataProduct.patchValue({
      price: (currentVlue -= 1000000),
    })
    this.formDataProduct.controls['price'].markAsDirty()
  }

  // quantity action change value
  incrementQuantity() {
    let currentVlue = this.formDataProduct.value.quantity

    this.formDataProduct.patchValue({
      quantity: (currentVlue += 1),
    })
    this.formDataProduct.controls['quantity'].markAsDirty()
  }
  decrementQuantity() {
    let currentVlue = this.formDataProduct.value.quantity

    this.formDataProduct.patchValue({
      quantity: (currentVlue -= 1),
    })
    this.formDataProduct.controls['quantity'].markAsDirty()
  }

  // discount action change value
  incrementDiscount() {
    let currentVlue = this.formDataProduct.value.discount

    this.formDataProduct.patchValue({
      discount: (currentVlue += 1),
    })
    this.formDataProduct.controls['discount'].markAsDirty()
  }
  decrementDiscount() {
    let currentVlue = this.formDataProduct.value.discount

    this.formDataProduct.patchValue({
      discount: (currentVlue -= 1),
    })
    this.formDataProduct.controls['discount'].markAsDirty()
  }

  // open dialog add inventory

  openDialogAdd(name: string | null) {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      data: {
        title: 'Thêm sản phẩm vào kho?',
        message: 'Bạn muốn thêm sản phẩm',
        name: name,
        isAdd: this.isAdd,
        type: 'add',
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isAdd == true) {
        this.addToInventory(result)
      }
    })
  }

  addToInventory(data: any) {
    const value = {
      productId: this.productInfor._id,
      productName: this.productInfor.productName,
      quantity: data.quantity,
    }
    this.productService.addToInventory(value).subscribe(
      (response) => {
        this.snackBar.open('Thêm sản phẩm vào kho thành công', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        })
        this.router.navigate([routes.INVENTORY])
      },
      (error) => {
        this.snackBar.open('Thêm sản phẩm vào kho không thành công', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        })
      }
    )
  }

  // onEdit product

  openDialog(name: string | null): void {
    if (!this.formDataProduct.dirty || this.formDataProduct.invalid) return

    const dialogRef = this.dialog.open(EditModalComponent, {
      data: {
        title: 'Cập nhật sản phẩm?',
        name: name,
        isEdit: this.isEdit,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.onEditProduct()
      }
    })
  }

  onEditProduct() {
    const newcategory = this.formDataProduct.value.category.filter((i: any) => {
      return i.id != null
    })

    const category = newcategory.map((i: any) => {
      return i.id
    })

    const newsubCategory = this.formDataProduct.value.subCategory.filter(
      (i: any) => {
        return i.id != null
      }
    )
    const subCategory = newsubCategory.map((i: any) => {
      return i.id
    })
    const data = {
      ...this.formDataProduct.value,
      category: category,
      subCategory: subCategory,
    }

    this.productService.editProduct(this.productId, data).subscribe(
      (response) => {
        this.snackBar.open('Cập nhật thông tin sản phẩm thành công', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        })
        this.router.navigate([routes.DETAIL_PRODUCT + this.productId])
      },
      (error) => {
        this.snackBar.open('Cập nhật sản phẩm không thành công', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        })
      }
    )
  }

  // onGoBack

  onGoBack() {
    this.location.back()
  }
}
