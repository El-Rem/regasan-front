import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessesService } from 'src/app/services/processes.service';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technical-data',
  templateUrl: './technical-data.component.html',
  styleUrls: ['./technical-data.component.css']
})
export class TechnicalDataComponent implements OnInit {
  clients: any[] = [];
  tramites: any[] = [];
  technicalDataForm: FormGroup;
  selectedClientName: string = '';

  constructor(
    private clientService: ClientService,
    private processesService: ProcessesService,
    private fb: FormBuilder
  ) {
    this.technicalDataForm = this.fb.group({
      client_rfc: ['', Validators.required],
      tramite_id: ['', Validators.required],
      technical_data: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

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

  onClientChange(event: any): void {
    this.selectedClientName = event.target.options[event.target.selectedIndex].text;
    this.searchTramites();
  }

  searchTramites(): void {
    if (this.selectedClientName) {
      this.processesService.searchProcessByBusinessName(this.selectedClientName).subscribe({
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
  }

  onTramiteChange(event: any): void {
    const tramiteId = event.target.value;
    if (tramiteId) {
      this.processesService.getTechnicalDataById(tramiteId).subscribe({
        next: (response) => {
          this.technicalDataForm.patchValue({
            technical_data: response.technical_data
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar datos técnicos',
            text: 'No se pudo cargar la información de los datos técnicos.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

  updateTechnicalData(): void {
    if (this.technicalDataForm.valid) {
      const tramiteId = this.technicalDataForm.get('tramite_id')?.value;
      const technicalData = { technical_data: this.technicalDataForm.get('technical_data')?.value };

      Swal.fire({
        title: 'Actualizando informacion de los datos tecnicos...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.processesService.updateTechnicalData(tramiteId, technicalData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Datos técnicos actualizados',
            text: 'Los datos técnicos del trámite han sido actualizados exitosamente.',
            confirmButtonText: 'Aceptar'
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al actualizar los datos técnicos.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de actualizar los datos técnicos.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
