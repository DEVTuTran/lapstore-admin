import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { routes } from 'src/app/consts'
import { FileUpload } from 'src/app/models/file-upload.model'
import { IProduct } from 'src/app/models/product.model'
import { ProductService } from '../../services/product.service'
import { FileUploadService } from 'src/app/services/file-upload.service'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  public formDataProduct!: FormGroup

  isLoading: boolean = false
  isDisnable: boolean = true
  selectedFiles?: FileList
  currentFileUpload?: FileUpload
  percentage: number = 0
  url: string = ''

  photo: string = '../../../assets/icons/upload.svg'
  homeIcon: string = '../../../assets/icons/home-icon.svg'
  slashIcon: string = '../../../assets/icons/slash-icon.svg'
  categories: any = []
  categoryId!: string | null
  subCategories: any = []
  arraySubcategory: any[] = [[]]
  subCategoryId!: string | null
  brands: any = []
  brandId!: string | null
  price: number = 0

  dataUpload?: FileUpload

  initForm!: IProduct

  hideButton = false

  ram: String = '8GB'
  cpu: String = 'Core I3'
  screen: String = '13.3'
  detailsProduct = [
    {
      key: 'Part-number',
      value: '',
    },
    {
      key: 'Thế hệ CPU',
      value: '',
    },
    {
      key: 'CPU',
      value: '',
    },
    {
      key: 'Chip đồ họa',
      value: '',
    },
    {
      key: 'RAM',
      value: '',
    },
    {
      key: 'Màn hình',
      value: '',
    },
    {
      key: 'Lưu trữ',
      value: '',
    },
    {
      key: 'Lưu trữ',
      value: '',
    },
    {
      key: 'Số cổng lưu trữ tối đa',
      value: '',
    },
    {
      key: 'Kiểu khe M.2 hỗ trợ',
      value: '',
    },
    {
      key: 'Cổng xuất hình',
      value: '',
    },
    {
      key: 'Cổng kết nối',
      value: '',
    },
    {
      key: 'Kết nối không dây',
      value: '',
    },
    {
      key: 'Bàn phím',
      value: '',
    },
    {
      key: 'Hệ điều hành',
      value: '',
    },
    {
      key: 'Kích thước',
      value: '',
    },
    {
      key: 'Pin',
      value: '',
    },
    {
      key: 'Khối lượng',
      value: '',
    },
  ]

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
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private fileUploadService: FileUploadService,
    private router: Router,
    private fbd: FormBuilder
  ) {}

  initFormValue() {
    this.formDataProduct = new FormGroup({
      productName: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      category: new FormArray([this.createCategoryArray()]),
      productThumbnail: new FormControl(this.url, [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      price: new FormControl(this.price, [
        Validators.required,
        Validators.min(1000000),
      ]),
      ram: new FormControl(this.ram, [Validators.required]),
      cpu: new FormControl(this.cpu, [Validators.required]),
      screen: new FormControl(this.screen, [Validators.required]),
      rating: new FormControl(0),
      discount: new FormControl(0, [Validators.required, Validators.min(0)]),
      subCategory: new FormArray([this.createSubCategoryArray()]),
      brand: new FormControl('', [Validators.required]),
      specs: new FormArray([this.createFormArray()]),
    })
  }
  // Init function

  ngOnInit(): void {
    this.isLoading = true
    this.getCategory()
    this.getBrand()

    this.initFormValue()

    const arr = this.formDataProduct.get('specs') as FormArray
    this.detailsProduct.slice(0, 7).forEach((i) => {
      arr.push(this.fbd.group(i))
    })
    this.isLoading = false
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
      key: new FormControl('Series laptop'),
      value: new FormControl(),
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
    this.detailsProduct.slice(8, this.detailsProduct.length).forEach((i) => {
      arr.push(this.fbd.group(i))
    })
  }

  // Category select

  getCategory() {
    this.productService.getCategories().subscribe((response) => {
      this.categories = response
      console.log('categories', this.categories)

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

  // SubCategory select

  getSubCategory(id: string) {
    this.productService.getSubCategoriesByCT(id).subscribe((response) => {
      this.subCategories = response.data
      this.arraySubcategory.push(this.subCategories)
      let subCategoryArr = this.formDataProduct.get('subCategory') as FormArray

      const newsubcategories = {
        id: this.subCategories[0]?._id,
      }
      subCategoryArr.push(this.fbd.group(newsubcategories))
    })
  }

  // Brand select

  getBrand() {
    this.productService.getBrands().subscribe((response) => {
      this.brands = response
      this.formDataProduct.patchValue({
        brand: this.brands[0]?._id,
      })
    })
  }

  selectRam(data: any) {
    this.ram = data.value
  }
  selectCpu(data: any) {
    this.cpu = data.value
  }
  selectScreen(data: any) {
    this.screen = data.value
  }
  selectBrands(data: any) {
    this.brandId = data.value
  }

  // increment decrement value

  // price action change value
  incrementPrice() {
    let currentVlue = this.formDataProduct.value.price

    this.formDataProduct.patchValue({
      price: (currentVlue += 1000000),
    })
  }
  decrementPrice() {
    let currentVlue = this.formDataProduct.value.price

    this.formDataProduct.patchValue({
      price: (currentVlue -= 1000000),
    })
  }

  // discount action change value
  incrementDiscount() {
    let currentVlue = this.formDataProduct.value.discount

    this.formDataProduct.patchValue({
      discount: (currentVlue += 1),
    })
  }
  decrementDiscount() {
    let currentVlue = this.formDataProduct.value.discount

    this.formDataProduct.patchValue({
      discount: (currentVlue -= 1),
    })
  }

  // upload image

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
            this.url = data.imagePath
            this.formDataProduct.patchValue({
              productThumbnail: this.url,
            })
          },
          (error) => {
            this.snackBar.open('Create product not success', '', {
              duration: 3000,
              panelClass: 'snackbar-notification__not-success',
            })
          }
        )
      }
    }
    this.isLoading = false
  }

  // Create product

  onCreateProduct() {
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
    console.log(data)

    if (this.formDataProduct.valid) {
      this.productService.createProduct(data).subscribe(
        (data) => {
          this.snackBar.open('Create product success', '', {
            duration: 3000,
            panelClass: 'snackbar-notification__success',
          })
          this.router.navigate([routes.VIEW_PRODUCT])
        },
        (error) => {
          this.snackBar.open('Create product not success', '', {
            duration: 3000,
            panelClass: 'snackbar-notification__not-success',
          })
        }
      )
    }
  }

  onGoBack() {
    this.router.navigate([routes.VIEW_PRODUCT])
  }
}
