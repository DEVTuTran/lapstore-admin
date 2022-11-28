import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

type params = {
  page: number
  limit: number
  search?: any
}
interface IOrder {
  _id?: string
  userId: string
  cartId: string
  shipping: any
  payment: any
  status: number
  createdAt: Date
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient, private router: Router) {}

  getOrders(event: any, filter: any) {
    let params: params = {
      page: Number(event.pageIndex) + 1,
      limit: event.pageSize,
      search: filter && filter.search ? filter.search : '',
    }
    if (!filter.search) {
      delete params.search
    }

    return this.http.get<any>(environment.api_url + 'order/list', {
      params,
    })
  }

  getOrderDetail(id?: String | null) {
    return this.http.get<any>(environment.api_url + 'order/' + id)
  }

  updateOrderStatus(id?: String | null, status?: any) {
    return this.http.put<any>(environment.api_url + 'order/update/' + id, status)
  }
}
