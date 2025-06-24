import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.css']
})
export class ManageClientsComponent {
  clientForm: FormGroup;
  updateForm: FormGroup;
  deleteForm: FormGroup;
  clients: any[] = [];
  sortDirection: { [key: string]: boolean } = { rfc: true, business_name: true };

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      rfc: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{12,13}$')]],
      business_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contact_first_name: ['', Validators.required],
      contact_last_name: ['', Validators.required],
      email_2: ['', [Validators.email]],
      phone_number_2: ['', [Validators.pattern('^[0-9]{10}$')]],
      contact_first_name_2: [''],
      contact_last_name_2: ['']
    });

    this.updateForm = this.fb.group({
      rfc: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{12,13}$')]],
      business_name: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      phone_number: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      contact_first_name: [{ value: '', disabled: false }, Validators.required],
      contact_last_name: [{ value: '', disabled: false }, Validators.required],
      email_2: [{ value: '', disabled: false }, [Validators.email]],
      phone_number_2: [{ value: '', disabled: false }, [Validators.pattern('^[0-9]{10}$')]],
      contact_first_name_2: [{ value: '', disabled: false }],
      contact_last_name_2: [{ value: '', disabled: false }]
    });

    this.deleteForm = this.fb.group({
      rfc: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{12,13}$')]]
    });
  }

  ngOnInit() {
    this.loadClients();
  }

  registerClient() {
    if (this.clientForm.valid) {
      Swal.fire({
        title: 'Registrando cliente...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.clientService.registerClient(this.clientForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente registrado',
            text: 'El cliente ha sido registrado exitosamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.clientForm.reset();
            }
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ocurrió un error al intentar registrar al cliente. Por favor, inténtalo nuevamente.',
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

  buscarCliente() {
    const rfc = (document.getElementById('rfcClienteBuscar') as HTMLInputElement).value;

    if (rfc) {
      this.clientService.getClientByRFC(rfc).subscribe({
        next: (response) => {
          this.updateForm.patchValue({
            rfc: response.rfc,
            business_name: response.business_name,
            email: response.email,
            phone_number: response.phone_number,
            contact_first_name: response.contact_first_name,
            contact_last_name: response.contact_last_name,
            email_2: response.email_2,
            phone_number_2: response.phone_number_2,
            contact_first_name_2: response.contact_first_name_2,
            contact_last_name_2: response.contact_last_name_2
          });

          Swal.fire({
            icon: 'success',
            title: 'Cliente encontrado',
            text: 'El cliente fue encontrado y los datos se han cargado.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
          (document.getElementById('actualizarDatos') as HTMLButtonElement).disabled = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al buscar cliente',
            text: 'No se encontró un cliente con el RFC proporcionado.',
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

  actualizarCliente() {
    if (this.updateForm.valid) {
      Swal.fire({
        title: 'Actualizando informacion del cliente...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const rfc = this.updateForm.get('rfc')?.value;
      const updatedClientData = this.updateForm.getRawValue();

      this.clientService.updateClient(rfc, updatedClientData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente actualizado',
            text: 'Los datos del cliente han sido actualizados exitosamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al intentar actualizar los datos del cliente. Por favor, inténtalo nuevamente.',
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

  eliminarCliente() {
    const rfc = this.deleteForm.get('rfc')?.value;

    if (rfc) {
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
          this.clientService.deleteClient(rfc).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Cliente eliminado',
                text: 'El cliente ha sido eliminado exitosamente.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
              });
              this.deleteForm.reset();
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: 'Ocurrió un error al intentar eliminar el cliente. Por favor, inténtalo nuevamente.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
              });
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelado',
            text: 'El cliente no fue eliminado',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'RFC vacío',
        text: 'Por favor, ingresa un RFC para eliminar.',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
      });
    }
  }

  loadClients() {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        this.clients = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar clientes',
          text: 'No se pudieron cargar los clientes. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      }
    });
  }

  sortClients(column: string) {
    this.sortDirection[column] = !this.sortDirection[column];
    const direction = this.sortDirection[column] ? 1 : -1;

    this.clients.sort((a, b) => {
      if (a[column] < b[column]) return -1 * direction;
      if (a[column] > b[column]) return 1 * direction;
      return 0;
    });
  }
}
