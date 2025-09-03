import { Component } from '@angular/core';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-processes',
  templateUrl: './view-all-processes.component.html',
  styleUrls: ['./view-all-processes.component.css']
})
export class ViewAllProcessesComponent {
  tramites: any[] = [];

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
    assigned_consultant: true,
    additional_information: true
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
    sub_service_name: 'Sub Servicio',
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
    assigned_consultant: 'Consultor Asignado',
    additional_information: 'Información Adicional',
  };

  constructor(private processesService: ProcessesService) {}

  ngOnInit(): void {
    this.getProcesses();
  }
  getProcesses() {
    this.processesService.getAllProcesses().subscribe({
          next: (response) => {
            this.tramites = response;
          },
          error: () => {
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

  getColumnKeys() {
    return Object.keys(this.columns);
  }
}
