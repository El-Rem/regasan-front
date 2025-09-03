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
  selectedCliente: string = 'Todos';
  selectedStatus: string = 'Todos';
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
    sub_service_name: true,
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
    sub_service_name: 'Servicio',
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
    cofepris_status_registrer_number: 'Número de respuesta COFEPRIS',
    cofepris_status_prevention_response: 'Fecha Respuesta Prevención COFEPRIS',
    assigned_consultant: 'Consultor Asignado',
    additional_information: 'Información Adicional',
  };

  constructor(private clientService: ClientService, private processesService: ProcessesService, private router: Router) {}

  ngOnInit(): void {
    const filtroCliente = localStorage.getItem('tramites-filtro-cliente');
    const filtroStatus = localStorage.getItem('tramites-filtro-status');

    if (filtroCliente) this.selectedCliente = filtroCliente;
    if (filtroStatus) this.selectedStatus = filtroStatus;

    this.loadClients();
    this.loadProcesses();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        const nombres = response.map((client: any) => client.business_name);
        this.clients = ['Todos', ...nombres]; // Agrega 'Todos' al inicio
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
    if (this.selectedCliente === 'Todos') {
      this.processesService.getAllProcesses().subscribe({
        next: (response) => {
          this.allTramites = this.sortByNumberDesc(response);
          this.filterByStatus();

          setTimeout(() => this.restoreScroll(), 0);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar trámites',
            text: 'No se pudieron cargar los trámites.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else if (this.selectedCliente) {
      this.processesService.getProcesses(`search?businessName=${this.selectedCliente}`).subscribe({
        next: (response) => {
          this.allTramites = this.sortByNumberDesc(response);
          this.filterByStatus();

          setTimeout(() => this.restoreScroll(), 0);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar trámites',
            text: 'No se pudieron cargar los trámites.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }

  private sortByNumberDesc(data: any[]): any[] {
    return [...data].sort((a, b) => b.number - a.number);
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
    const scrollContainer = document.documentElement || document.body;
    localStorage.setItem('tramites-scroll', scrollContainer.scrollTop.toString());

    localStorage.setItem('tramites-filtro-cliente', this.selectedCliente);
    localStorage.setItem('tramites-filtro-status', this.selectedStatus);

    this.router.navigate(['/admin/tramite-detalle', id]);
  }


  resetFilters(): void {
    this.selectedCliente = 'Todos';
    this.selectedStatus = 'Todos';
    localStorage.removeItem('tramites-filtro-cliente');
    localStorage.removeItem('tramites-filtro-status');
    this.loadProcesses();
  }

  private restoreScroll(): void {
    const scrollValue = localStorage.getItem('tramites-scroll');
    if (scrollValue) {
      window.scrollTo({ top: parseInt(scrollValue, 10), behavior: 'auto' });
      localStorage.removeItem('tramites-scroll'); // Limpia para evitar que se aplique al navegar normal
    }
  }
}
