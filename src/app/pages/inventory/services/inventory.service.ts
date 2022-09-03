import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IIventory } from 'src/app/models/inventory.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

type params = {
  page?: number;
  limit?: number;
  search?: any;
};

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private http: HttpClient, private router: Router) {}

  getInventory(event?: any, filter?: any) {
    let params: params = {
      page: Number(event?.pageIndex) + 1,
      limit: event?.pageSize,
      search: filter && filter.search ? filter.search : '',
    };
    if (!filter?.search) {
      delete params.search;
    }
    if (!event) {
      delete params.page;
      delete params.limit;
    }
    return this.http.get<any>(environment.api_url + 'inventory', { params });
  }

  updateInventory(id: string, data: any) {
    return this.http.put<any>(environment.api_url + 'inventory/' + id, data);
  }

  deleteInventory(id: string) {
    return this.http.delete<any>(environment.api_url + 'inventory/' + id);
  }

  getInventoryById(id: string) {
    return this.http.get<IIventory>(environment.api_url + 'inventory/' + id);
  }

  getUser(id: string | null) {
    return this.http.get<{ user: User }>(
      environment.api_url + 'auth/users/' + id
    );
  }
}
