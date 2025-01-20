import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.css']
})
export class BillingDashboardComponent implements OnInit {
  tramites: any[] = [];
  filteredTramites: any[] = [];
  facturacionForm: FormGroup;
  selectedPaymentStatus: string = ''; // Estado de pago seleccionado

  // Columnas para la tabla
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
    billing: true,
    payment_status: true,
    payment_date: true,
    collection_notes: true
  };

  constructor(
    private processesService: ProcessesService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario reactivo
    this.facturacionForm = this.fb.group({
      tramite_id: [{ value: '', disabled: false }, Validators.required],
      billing: [{ value: '', disabled: false }],
      payment_status: [{ value: '', disabled: false }, Validators.required],
      payment_date: [{ value: '', disabled: false }, Validators.required],
      collection_notes: [{ value: '', disabled: false }]
    });
  }

  ngOnInit(): void {
    this.loadTramites();
  }

  // Actualizar la facturación
  updateFacturacion(): void {
    if (this.facturacionForm.valid) {
      const tramiteId = this.facturacionForm.get('tramite_id')?.value;
      const facturacionData = this.facturacionForm.value;

      Swal.fire({
        title: 'Actualizando informacion de facturación...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.processesService.updateFacturacion(tramiteId, facturacionData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Facturación Actualizada',
            text: 'Los datos de facturación han sido actualizados exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.facturacionForm.reset();
          this.loadTramites();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar facturación',
            text: 'Ocurrió un error al actualizar la facturación. Inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de enviar.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Cargar trámites desde el servicio
  loadTramites(): void {
    this.processesService.getAllProcesses().subscribe({
      next: (response) => {
        // Filtrar los trámites con sales_flag = true y payment_status distinto de 'pagado'
        this.tramites = response
          .filter((tramite: any) => tramite.sales_flag === true && tramite.payment_status !== 'paid')
          .map((tramite: any) => {
            // Evaluar el color de la fila según la fecha de pago
          tramite.rowColor = this.getRowColor(tramite.payment_date);
          return tramite;
        });
        this.filteredTramites = [...this.tramites]; // Inicialmente, mostrar todos los trámites
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámites',
          text: 'No se pudieron cargar los trámites pendientes de facturación.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  // Obtener el color de la fila según la fecha de pago
  getRowColor(paymentDate: string): string {
    const currentDate = new Date();
    const dueDate = new Date(paymentDate);
    const twoMonthsBeforeDueDate = new Date(dueDate);
    twoMonthsBeforeDueDate.setMonth(dueDate.getMonth() - 2);

    if (currentDate > dueDate) {
      return 'table-danger'; // Rojo: vencido
    } else if (currentDate >= twoMonthsBeforeDueDate && currentDate <= dueDate) {
      return 'table-success'; // Verde: a vencerse
    }
    return ''; // Sin color si no cumple ninguna condición
  }

  // Filtrar trámites por el estatus de pago
  filterByPaymentStatus(): void {
    if (this.selectedPaymentStatus) {
      this.filteredTramites = this.tramites.filter(
        tramite => tramite.payment_status === this.selectedPaymentStatus
      );
    } else {
      this.filteredTramites = [...this.tramites]; // Mostrar todos si no hay filtro seleccionado
    }
  }

  buscarTramite() {
        const id = (document.getElementById('tramiteIdBuscar') as HTMLInputElement).value;

        if (id) {
          this.processesService.getProcesses(id).subscribe({
            next: (response) => {
              this.facturacionForm.patchValue({
                tramite_id: response.tramite_id,
                billing: response.billing,
                payment_status: response.payment_status,
                payment_date: response.payment_date,
                collection_notes: response.collection_notes,
              });

              Swal.fire({
                icon: 'success',
                title: 'Tramite encontrado',
                text: 'El tramite fue encontrado y los datos se han cargado.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
              });
              (document.getElementById('actualizarDatos') as HTMLButtonElement).disabled = false;
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error al buscar tramite',
                text: 'No se encontró un tramite con el RFC proporcionado.',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'ID del Trámite  vacío',
            text: 'Por favor, ingresa un id de tramite para buscar.',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          });
        }
      }
}
