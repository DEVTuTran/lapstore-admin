import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DeleteModalComponent } from 'src/app/components/popup-modal/delete-modal/delete-modal.component';
import { routes } from 'src/app/consts';
import { formatVND } from 'src/utils/helper';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit, AfterViewInit {
  name!: string;
  isDelete: boolean = false;
  isLoading: boolean = false;

  editIcon: string = '../../../assets/icons/edit-icon.svg';
  deleteIcon: string = '../../../assets/icons/trash-icon.svg';
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  tableColums: string[] = [
    'thumbnail',
    'name',
    'price',
    'discount',
    'status',
    'createAt',
    'action',
  ];
  routeName?: string;
  products = [];
  pageEvent?: PageEvent;
  datasource?: null;
  pageIndex?: number;
  pageSize?: number;
  length?: number;
  formatVND = formatVND;

  eventDefault = {
    pageIndex: 0,
    pageSize: 10,
    length: 100,
  };

  public filter = {
    search: '',
  };

  public routers: typeof routes = routes;
  private subjectKeyUp = new Subject<any>();

  constructor(
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    this.isLoading = true;
    this.routeName = this.router.url;

    this.getProductList(this.eventDefault, this.filter);
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.subjectKeyUp
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((d) => {
        this.filter.search = d;
        this.getProductList(this.eventDefault, this.filter);
      });
  }

  // search
  onSearch($event: any) {
    const value = $event.target.value;
    this.subjectKeyUp.next(value);
  }

  // get list products

  getProductList(event?: PageEvent, filter?: any) {
    this.isLoading = true;
    this.productService.getProducts(event, filter).subscribe(
      (response: any) => {
        if (response.error) {
        } else {
          this.products = response.data;
          this.pageIndex = Number(response.pagination.page) - 1;
          this.pageSize = response.pagination.totalRows;
          this.length = response.pagination.totals;
        }
      },
      (error) => {}
    );
    this.isLoading = false;
    return event;
  }

  // create product
  createProduct() {
    this.router.navigate([routes.CREATE_PRODUCT]);
  }

  // edit product

  editProduct(id: string | null) {
    this.router.navigate([routes.EDIT_PRODUCT + id]);
  }

  // delete product

  openDialog(id: string, name: string): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        title: 'Delete product?',
        name: name,
        type: 'product',
        isDelete: this.isDelete,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: string | null) {
    this.isLoading = true;
    this.productService.deleteProduct(id).subscribe((data) => {
      this.products = [];
      this.getProductList(this.eventDefault);
      this.isLoading = false;
    });
  }
}
