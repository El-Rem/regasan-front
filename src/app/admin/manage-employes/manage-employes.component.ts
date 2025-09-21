import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-employes',
  templateUrl: './manage-employes.component.html',
  styleUrls: ['./manage-employes.component.css']
})
export class ManageEmployesComponent {
  employeForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;
  employes: any[] = [];
  sortDirection: { [key: string]: boolean } = { phone_number: true, email: true };

  constructor(private employeService: EmployeService, private fb: FormBuilder) {
    this.employeForm = this.fb.group({
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.updateForm = this.fb.group({
      phone_number: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      first_name: [{ value: '', disabled: false }, Validators.required],
      last_name: [{ value: '', disabled: false }, Validators.required],
      role: [{ value: '', disabled: false }, Validators.required],
      password: [{ value: '', disabled: false }, Validators.required],
    });

    this.deleteForm = this.fb.group({
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit() {
    this.loadEmployes();
  }

  registerEmploye() {
    if (this.employeForm.valid) {
      Swal.fire({
        title: 'Creando informacion del empleado...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.employeService.registerEmploye(this.employeForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Empleado registrado',
            text: 'El empleado ha sido registrado exitosamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.employeForm.reset();
            }
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ocurrió un error al intentar registrar al empleado. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto o incorrecto',
        text: 'Por favor, completa todos los campos correctamente antes de enviar.',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }

  buscarEmpleado() {
      const id = (document.getElementById('numeroEmpleadoBuscar') as HTMLInputElement).value;

      if (id) {
        this.employeService.getEmployeById(id).subscribe({
          next: (response) => {
            this.updateForm.patchValue({
              phone_number: response.phone_number,
              email: response.email,
              first_name: response.first_name,
              last_name: response.last_name,
              role: response.password,
            });

            Swal.fire({
              icon: 'success',
              title: 'Empleado encontrado',
              text: 'El empleado fue encontrado y los datos se han cargado.',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false
            });
            (document.getElementById('actualizarDatos') as HTMLButtonElement).disabled = false;
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al buscar empleado',
              text: 'No se encontró un empleado con el RFC proporcionado.',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'RFC vacío',
          text: 'Por favor, ingresa un RFC para buscar.',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      }
    }

  actualizarEmpleado() {
    if (this.updateForm.valid) {
      const phone_number = this.updateForm.get('phone_number')?.value;
      const updatedClientData = this.updateForm.getRawValue();

      Swal.fire({
        title: 'Actualizando informacion del empleado...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.employeService.updateEmploye(phone_number, updatedClientData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Empleado actualizado',
            text: 'Los datos del empleado han sido actualizados exitosamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al intentar actualizar los datos del empleado. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de actualizar.',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }

  eliminarEmpleado() {
    const phone_number = this.deleteForm.get('phone_number')?.value;

    if (phone_number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.employeService.deleteEmploye(phone_number).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Empleado eliminado',
                text: 'El empleado ha sido eliminado exitosamente.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
              });
              this.deleteForm.reset();
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: 'Ocurrió un error al intentar eliminar el empleado. Por favor, inténtalo nuevamente.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
              });
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelado',
            text: 'El empleado no fue eliminado',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Número telefónico vacío',
        text: 'Por favor, ingresa un Número telefónico para eliminar.',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }

  loadEmployes() {
    this.employeService.getAllEmployes().subscribe({
      next: (response) => {
        this.employes = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar usuarios',
          text: 'No se pudieron cargar los usuarios. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      }
    });
  }

  sortEmployes(column: string) {
    this.sortDirection[column] = !this.sortDirection[column];
    const direction = this.sortDirection[column] ? 1 : -1;

    this.employes.sort((a, b) => {
      if (a[column] < b[column]) return -1 * direction;
      if (a[column] > b[column]) return 1 * direction;
      return 0;
    });
  }
}
