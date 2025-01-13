import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-edit-technical-data',
  templateUrl: './view-edit-technical-data.component.html',
  styleUrls: ['./view-edit-technical-data.component.css']
})
export class ViewEditTechnicalDataComponent implements OnInit {
  clients: any[] = [];
  tramites: any[] = [];
  facturaForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private processesService: ProcessesService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario reactivo
    this.facturaForm = this.fb.group({
      client_rfc: ['', Validators.required],
      tramite_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  // Cargar clientes al inicializar el componente
  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        this.clients = response;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar clientes',
          text: 'No se pudieron cargar los clientes. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  // Cambiar el método onClientChange
  onClientChange(event: any): void {
    const selectedClientName = event.target.options[event.target.selectedIndex].text;
    this.processesService.searchProcessByBusinessName(selectedClientName).subscribe({
      next: (response) => {
        this.tramites = response;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámites',
          text: 'No se pudieron cargar los trámites para el cliente seleccionado.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }


  // Confirmar la factura, haciendo una solicitud PUT
  confirmFactura(): void {
    if (this.facturaForm.valid) {
      const tramiteId = this.facturaForm.get('tramite_id')?.value;

      Swal.fire({
        title: 'Confirmando factura...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.processesService.confirmVenta(tramiteId).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Factura Confirmada',
            text: 'La factura del trámite ha sido confirmada exitosamente.',
            confirmButtonText: 'Aceptar'
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al confirmar factura',
            text: 'Ocurrió un error al confirmar la factura. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, selecciona un cliente y un trámite antes de confirmar la factura.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
