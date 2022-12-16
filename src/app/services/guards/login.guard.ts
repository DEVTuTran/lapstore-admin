import { Injectable } from '@angular/core'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/pages/auth/services/auth.service'

// project import

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private userService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.getToken()) {
      return true
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: {} })
    return false
  }
}
