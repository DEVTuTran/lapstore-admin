import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddInventoryComponent } from 'src/app/components/popup-modal/add-inventory/add-inventory.component';
import { DeleteModalComponent } from 'src/app/components/popup-modal/delete-modal/delete-modal.component';
import { InventoryService } from '../../services/inventory.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {
  pageEvent?: PageEvent;
  pageIndex?: number;
  pageSize?: number;
  length?: number;

  listInventory = [];
  tableColums: string[] = [
    'productId',
    'productName',
    'quantity',
    'userNumber',
    'createAt',
    'action',
  ];
  isAdd: boolean = false;
  isDelete: boolean = false;
  isLoading: boolean = false;

  editIcon: string = '../../../assets/icons/edit-icon.svg';
  deleteIcon: string = '../../../assets/icons/trash-icon.svg';
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  private subjectKeyUp = new Subject<any>();

  eventDefault = {
    pageIndex: 0,
    pageSize: 10,
    length: 100,
  };

  public filter = {
    search: '',
  };

  constructor(
    private inventoryService: InventoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getInventoryList(this.eventDefault, this.filter);
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.subjectKeyUp
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((d) => {
        this.filter.search = d;
        this.getInventoryList(this.eventDefault, this.filter);
      });
  }

  // search
  onSearch($event: any) {
    const value = $event.target.value;
    this.subjectKeyUp.next(value);
  }

  getInventoryList(event?: PageEvent, filter?: any) {
    this.isLoading = true;
    this.inventoryService
      .getInventory(event, filter)
      .subscribe((response: any) => {
        if (response.error) {
        } else {
          this.listInventory = response.data;
          this.pageIndex = Number(response.pagination.page) - 1;
          this.pageSize = response.pagination.totalRows;
          this.length = response.pagination.totals;
        }
      });
    this.isLoading = false;
    return event;
  }
  openDialogUpdate(id: string, name: string, quantity: number) {
    const dialogRef = this.dialog.open(AddInventoryComponent, {
      data: {
        title: 'Edit product quantity in inventory?',
        message: `Would you like to change quantity for product`,
        name: name,
        quantity: quantity,
        isAdd: this.isAdd,
        type: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isAdd == true) {
        if (result.quantity <= 0) {
          this.snackBar.open('Value must be greater than 1', '', {
            duration: 3000,
            panelClass: 'snackbar-notification__not-success',
          });
          return;
        }
        this.updateInventory(id, result);
      }
    });
  }

  updateInventory(id: string, data: any) {
    this.isLoading = true;
    const value = {
      quantity: data.quantity,
    };

    this.inventoryService.updateInventory(id, value).subscribe(
      (response) => {
        this.isLoading = false;
        this.snackBar.open('Add product to inventory success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getInventoryList(this.eventDefault, this.filter);
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Add product to inventory not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }

  openDialogDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        title: 'Delete inventory?',
        name: name,
        message:
          'The product will be taken out of stock without being deleted.',
        type: 'inventory',
        isDelete: this.isDelete,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteInventory(id);
      }
    });
  }

  deleteInventory(id: string) {
    this.isLoading = true;
    this.inventoryService.deleteInventory(id).subscribe(
      (response) => {
        this.isLoading = false;
        this.snackBar.open('Add product to inventory success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__success',
        });
        this.getInventoryList();
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open('Add product to inventory not success', '', {
          duration: 3000,
          panelClass: 'snackbar-notification__not-success',
        });
      }
    );
  }
}
