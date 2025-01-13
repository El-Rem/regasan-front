import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  pwdForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeService: EmployeService
  ) {
    this.pwdForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('email', 'confirmEmail')
    });
  }

  ngOnInit(): void {}

  get f() { return this.pwdForm.controls; }

  mustMatch(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.controls[email];
      const confirmEmailControl = formGroup.controls[confirmEmail];

      if (confirmEmailControl.errors && !confirmEmailControl.errors['mustMatch']) {
        return;
      }

      if (emailControl.value !== confirmEmailControl.value) {
        confirmEmailControl.setErrors({ mustMatch: true });
        this.errorMessage = 'Los correos no coinciden';
      } else {
        confirmEmailControl.setErrors(null);
        this.errorMessage = 'Los correos coinciden';
      }
    };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.pwdForm.invalid) {
      return;
    }

    const req = {
      email: this.f['email'].value
    };

    Swal.fire({
      title: 'Enviando correo de confirmacion...',
      text: 'Por favor, espera mientras se completa la actualizacion.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.employeService.recoveryPassword(req).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message,
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message || 'Ocurrió un error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  onReset(): void {
    this.router.navigate(['/login']);
  }
}
