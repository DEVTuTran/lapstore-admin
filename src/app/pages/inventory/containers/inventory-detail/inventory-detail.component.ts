import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IIventory } from 'src/app/models/inventory.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
})
export class InventoryDetailComponent implements OnInit {
  noImage: string = '../../../assets/icons/no-image-icon.svg';
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  inventoryDetail!: IIventory;
  isLoading: boolean = false;

  displayedColumns: string[] = ['userName', 'quantity', 'status'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id') || '';

    this.getInventoryDetail(id);
    this.isLoading = false;
  }

  getInventoryDetail(id: string) {
    this.inventoryService.getInventoryById(id).subscribe((response) => {
      console.log(response);
      this.inventoryDetail = response;
    });
  }
}
