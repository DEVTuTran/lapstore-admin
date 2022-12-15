import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { routes } from 'src/app/consts'
import { AuthService } from '../../services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthComponent {
  token?: string | null
  userId?: string | null
  isAuthenticated = false

  public routers: typeof routes = routes

  constructor(
    private service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  public sendLoginForm(eventdata: { email: string; password: string }): void {
    this.service.login(eventdata).subscribe(
      (response) => {
        const token = response.data.token
        const role = response.data.user.role
        this.token = token
        if (token && role == 'Admin') {
          this.isAuthenticated = true
          const id = response.data.user._id
          this.userId = id
          this.service.authStatusListener.next(true)
          this.service.saveAuthData(token, id)
          this.router.navigate([this.routers.DASHBOARD])
        }
        if (role != 'Admin') {
          this.snackBar.open('Bạn không phải là quản trị viên.', '', {
            duration: 3000,
          })
        }
      },
      (error) => {
        this.service.authStatusListener.next(false)
      }
    )
  }
}
