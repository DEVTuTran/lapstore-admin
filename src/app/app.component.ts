import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from './consts';
import { AuthService } from './pages/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lapstore-admin';

  accessId?: string | null;
  isTokenExpired = true;

  public routers: typeof routes = routes;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.accessId = this.service.getUserId();

    this.accessId &&
      this.service.tokenExpired(this.accessId).subscribe((data: any) => {
        if (data.token) {
          this.isTokenExpired = false;
        }
        if (!this.accessId || this.isTokenExpired) {
          this.router.navigate([routes.LOGIN]);
        }
      });
  }
}
