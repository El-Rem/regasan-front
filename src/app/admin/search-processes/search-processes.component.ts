import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-processes',
  templateUrl: './search-processes.component.html',
  styleUrls: ['./search-processes.component.css']
})
export class SearchProcessesComponent implements OnInit {
  clients: any[] = [];
  tramites: any[] = [];
  allTramites: any[] = [];
  selectedCliente: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['Todos', 'Pendiente', 'En Proceso', 'Finalizado', 'Cancelado'];

  columns: { [key: string]: boolean } = {
    number: true,
    id: true,
    client_rfc: true,
    email: true,
    phone_number: true,
    distinctive_denomination: true,
    generic_name: true,
    product_manufacturer: true,
    service_name: true,
    input_value: true,
    type_description: true,
    class_name: true,
    start_date: true,
    end_date: true,
    status: true,
    technical_data: true,
    completion_percentage: true,
    cofepris_entry_date: true,
    cofepris_status: true,
    cofepris_entry_number: true,
    cofepris_status_health_registration_number: true,
    cofepris_status_registrer_number: true,
    cofepris_status_prevention_response: true,
    assigned_consultant: true,
    additional_information: true,
  };

  columnNames: { [key: string]: string } = {
    number: 'No.',
    id: 'Id Trámite',
    client_rfc: 'RFC Cliente',
    email: 'Email',
    phone_number: 'Teléfono',
    distinctive_denomination: 'Denominación Distintiva',
    generic_name: 'Nombre Genérico',
    product_manufacturer: 'Fabricante',
    service_name: 'Servicio',
    input_value: 'Insumo',
    type_description: 'Descripción Tipo',
    class_name: 'Clase',
    start_date: 'Fecha Inicio',
    end_date: 'Fecha Fin',
    status: 'Estatus',
    technical_data: 'Datos Técnicos',
    completion_percentage: '% Completado',
    cofepris_entry_date: 'Fecha Entrada COFEPRIS',
    cofepris_status: 'Estatus COFEPRIS',
    cofepris_entry_number: 'Número de Entrada COFEPRIS',
    cofepris_status_health_registration_number: 'Registro Sanitario COFEPRIS',
    cofepris_status_registrer_number: 'Numero de respuesta COFEPRIS',
    cofepris_status_prevention_response: 'Fecha Respuesta Prevención COFEPRIS',
    assigned_consultant: 'Consultor Asignado',
    additional_information: 'Información Adicional',
  };

  constructor(private clientService: ClientService, private processesService: ProcessesService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        this.clients = response.map((client: any) => client.business_name);
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

  loadProcesses(): void {
    if (this.selectedCliente) {
      this.processesService.getProcesses(`search?businessName=${this.selectedCliente}`).subscribe({
        next: (response) => {
          this.allTramites = response;  // Guardar todos los trámites sin filtro
          this.tramites = response;     // Mostrar todos los trámites inicialmente
          this.filterByStatus();        // Aplicar el filtro de estatus inmediatamente si ya hay uno seleccionado
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar trámites',
            text: 'No se pudieron cargar los trámites. Por favor, inténtalo nuevamente.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        }
      });
    }
  }

  getAllProcesses(): void {
    this.processesService.getAllProcesses().subscribe({
      next: (response) => {
        this.allTramites = response;  // Guardar todos los trámites sin filtro
        this.tramites = response;     // Mostrar todos los trámites inicialmente
        this.filterByStatus();        // Aplicar el filtro de estatus si es necesario
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámites',
          text: 'No se pudieron cargar los trámites. Por favor, inténtalo nuevamente.',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        });
      }
    });
  }

  filterByStatus(): void {
    if (this.selectedStatus === 'Todos') {
      this.tramites = [...this.allTramites];
    } else {
      this.tramites = this.allTramites.filter((tramite: any) => tramite.status === this.selectedStatus);
    }
  }


  getColumnKeys() {
    return Object.keys(this.columns);
  }

  viewDetails(id: string): void {
    this.router.navigate(['/admin/tramite-detalle', id]);
  }
}
