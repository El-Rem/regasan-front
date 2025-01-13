import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
