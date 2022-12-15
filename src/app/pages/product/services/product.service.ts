import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IBrand } from 'src/app/models/brand.model'
import { ICategory } from 'src/app/models/category.model'
import { IProduct } from 'src/app/models/product.model'
import { ISubCategory } from 'src/app/models/subCategory.model'

import { environment } from 'src/environments/environment'

type categoriesByCT = {
  categoryName: string
  data: ISubCategory[]
}

type params = {
  page: number
  limit: number
  search?: any
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private router: Router) {}

  getProducts(event: any, filter: any) {
    let params: params = {
      page: Number(event.pageIndex) + 1,
      limit: event.pageSize,
      search: filter && filter.search ? filter.search : '',
    }
    if (!filter.search) {
      delete params.search
    }
    return this.http.get<IProduct[]>(environment.api_url + 'products', {
      params,
    })
  }
  getProductList() {
    return this.http.get<IProduct[]>(environment.api_url + 'products')
  }

  getCategories() {
    const params = {
      active: 1,
    }
    return this.http.get<ICategory[]>(environment.api_url + 'category', {
      params,
    })
  }

  getCategoryDetail(id?: string) {
    return this.http.get<ICategory>(environment.api_url + 'category/' + id)
  }

  async getSubCategoriesByCT(id: string | null) {
    return await this.http
      .get<categoriesByCT>(environment.api_url + 'subcategory/CT/' + id)
      .toPromise()
  }

  getSubCategoryDetail(id?: string) {
    return this.http.get<ISubCategory>(environment.api_url + 'subcategory/' + id)
  }

  getBrands() {
    const params = {
      active: 1,
    }
    return this.http.get<IBrand[]>(environment.api_url + 'brands', { params })
  }

  getBrandDetail(id?: string) {
    return this.http.get<IBrand>(environment.api_url + 'brands/' + id)
  }

  createProduct(data: IProduct) {
    return this.http.post<any>(environment.api_url + 'products', data)
  }

  deleteProduct(id: string | null) {
    return this.http.delete<any>(environment.api_url + 'products/' + id)
  }

  getProductDetail(id?: string | null) {
    return this.http.get<any>(environment.api_url + 'products/' + id)
  }

  editProduct(id?: string | null, data?: IProduct) {
    return this.http.put<any>(environment.api_url + 'products/' + id, data)
  }

  addToInventory(data: any) {
    return this.http.post<any>(environment.api_url + 'inventory', data)
  }
}
