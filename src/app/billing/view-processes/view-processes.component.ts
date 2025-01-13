import { Component, OnInit } from '@angular/core';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-processes',
  templateUrl: './view-processes.component.html',
  styleUrls: ['./view-processes.component.css']
})
export class ViewProcessesComponent implements OnInit {
  tramites: any[] = [];
  sortedColumn: string = '';
  ascending: boolean = true;

  columns: { [key: string]: boolean } = {
    number: true,
    id: true,
    business_name: true,
    client_rfc: true,
    email: true,
    phone_number: true,
    distinctive_denomination: true,
    payment_status: true,
    generic_name: true,
    payment_date: true,
    end_date: true,
  };

  constructor(private processesService: ProcessesService) {}

  ngOnInit(): void {
    this.loadAllProcesses();
  }

  loadAllProcesses(): void {
    this.processesService.getAllProcesses().subscribe({
      next: (response) => {
        this.tramites = response.map((tramite: any) => {
          tramite.rowColor = this.getRowColor(tramite.payment_date);
          return tramite;
        });
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

  getRowColor(paymentDate: string): string {
    const currentDate = new Date();
    const dueDate = new Date(paymentDate);
    const twoMonthsBeforeDue = new Date(dueDate);
    twoMonthsBeforeDue.setMonth(dueDate.getMonth() - 2);

    if (currentDate > dueDate) return 'table-danger'; // Rojo: vencido
    if (currentDate >= twoMonthsBeforeDue && currentDate <= dueDate) return 'table-success'; // Verde: a vencerse
    return ''; // Sin color
  }

  sortBy(column: string): void {
    if (this.sortedColumn === column) {
      this.ascending = !this.ascending;
    } else {
      this.sortedColumn = column;
      this.ascending = true;
    }

    this.tramites.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.ascending ? -1 : 1;
      if (valueA > valueB) return this.ascending ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortedColumn !== column) return 'bi bi-arrow-down-up';
    return this.ascending ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
  }

  downloadCSV(): void {
    const headers = [
      'No.',
      'ID Trámite',
      'Nombre del Cliente',
      'RFC Cliente',
      'Email',
      'Teléfono',
      'Denominación Distintiva',
      'Nombre Genérico',
      'Estatus de Pago',
      'Fecha de Pago',
      'Fecha de Vencimiento'
    ];

    // Construir el contenido del CSV
    const rows = this.tramites.map((tramite, index) => [
      index + 1, // No.
      tramite.id || '', // ID Trámite
      tramite.client?.business_name || '', // Nombre Comercial
      tramite.client_rfc || '', // RFC Cliente
      tramite.client?.email || '', // Email
      tramite.client?.phone_number || '', // Teléfono
      tramite.distinctive_denomination || '', // Denominación Distintiva
      tramite.generic_name || '', // Nombre Genérico
      tramite.payment_status || '', // Estatus de Pago
      tramite.payment_date ? new Date(tramite.payment_date).toLocaleDateString('es-ES') : '', // Fecha de Pago
      tramite.end_date ? new Date(tramite.end_date).toLocaleDateString('es-ES') : '' // Fecha de Vencimiento
    ]);

    const csvContent = [
      headers.join(','), // Encabezados
      ...rows.map(row => row.map(value => `"${value}"`).join(',')) // Filas de datos
    ].join('\n');

    // Crear el archivo Blob con codificación UTF-8
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tramites.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
