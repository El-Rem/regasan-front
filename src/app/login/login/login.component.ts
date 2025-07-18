import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.authService.getProfile().subscribe({
          next: (profile) => this.handleRedirection(profile.role),
          error: () => this.error = 'Failed to fetch user profile'
        });
      },
      error: () => this.error = 'Error al iniciar sesión: las credenciales ingresadas no son válidas.'
    });
  }

  private handleRedirection(role: string): void {
    console.log('Redirecting user with role:', role);
    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'Ventas':
        this.router.navigate(['/sales/dashboard']);
        break;
      case 'Facturacion':
        this.router.navigate(['/billing/dashboard']);
        break;
      case 'Regulatorio':
        this.router.navigate(['/regulatory/manage-processes']);
        break;
      default:
        this.router.navigate(['/public']);
    }
  }
}
