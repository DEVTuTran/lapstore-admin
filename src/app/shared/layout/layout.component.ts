import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isShowSidebar: boolean = true;

  public ngOnDestroy(): void {
    this.sidenav.close();
  }
}
