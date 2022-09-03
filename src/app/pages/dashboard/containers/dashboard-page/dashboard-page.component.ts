import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IIventory } from 'src/app/models/inventory.model';
import { CustomerService } from 'src/app/pages/customer/services/customer.service';
import { InventoryService } from 'src/app/pages/inventory/services/inventory.service';
import { ProductService } from 'src/app/pages/product/services/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  numberProduct!: number;
  numberCustomer!: number;

  isLoading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getProductNumber();
    this.getCustomerNumber();
    this.isLoading = false;
  }

  getProductNumber() {
    this.inventoryService.getInventory().subscribe((response) => {
      let quantity = 0;
      response.forEach((i: IIventory) => {
        quantity += i.quantity;
      });
      this.numberProduct = quantity;
    });
  }
  getCustomerNumber() {
    this.customerService.getCustomers().subscribe((response) => {
      this.numberCustomer = response.length;
    });
  }
}
