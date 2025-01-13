import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['role'] as string;
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (role !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
