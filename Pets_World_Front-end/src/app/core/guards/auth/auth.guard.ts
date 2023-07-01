import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.getTokenData();
      // Check if the user's role is allowed for the current route
      if (route.data['roles'].includes(this.authService.role)) {
        return true; // User is authorized to access the route
      } else {
        // Redirect to unauthorized page or a different route
        console.log("Redirect to unauthorized page or a different route")
        this.router.navigate(['/unauthorized']);
        return false; // User is not authorized to access the route
      }
    }

    // User is not logged in, redirect to login page
    this.router.navigate(['/login']);
    return false; // User is not authorized to access the route
  }

  private checkAccess(userRole: string, allowedRoles: string[]): boolean {
    return allowedRoles.includes(userRole);
  }
}
