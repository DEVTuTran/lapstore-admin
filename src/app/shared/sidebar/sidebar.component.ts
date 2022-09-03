import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { SettingService } from 'src/app/pages/setting/services/setting.service';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public routes: typeof routes = routes;
  isLoading = false;
  userId!: string | null;
  user!: User;
  photo: string = '../../../assets/imgs/avatar.jpg';
  constructor(
    private authService: AuthService,
    private settingService: SettingService,
    private router: Router
  ) {}
  public onSignOut(): void {
    this.authService.logOut();
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.settingService.getUser(this.userId).subscribe(
      (data: any) => {
        this.user = data.user;
        this.isLoading = false;
      },
      (error) => {
        if (error.status == '401') {
          this.router.navigate([this.routes.LOGIN]);
        }
      }
    );
  }
}
