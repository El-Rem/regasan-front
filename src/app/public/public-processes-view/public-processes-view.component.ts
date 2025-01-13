import { Component, OnInit } from '@angular/core';
import { ProcessesService } from 'src/app/services/processes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-public-processes-view',
  templateUrl: './public-processes-view.component.html',
  styleUrls: ['./public-processes-view.component.css']
})
export class PublicProcessesViewComponent implements OnInit {
  rfc: string = '';
  tramites: any[] = [];
  isRfcValid: boolean = false;
  rfcTouched: boolean = false;
  searchAttempted: boolean = false;

  constructor(private processesService: ProcessesService) {}

  ngOnInit(): void {}

  validateRfc(): void {
    this.rfcTouched = true;
    const rfcRegex = /^([A-ZÑ&]{3,4})?(?:-)?(\d{2})(\d{2})(\d{2})((\D|\d){3})?$/;
    this.isRfcValid = rfcRegex.test(this.rfc) && (this.rfc.length === 12 || this.rfc.length === 13);
  }

  loadTramites(): void {
    this.searchAttempted = true;
    if (!this.isRfcValid) {
      return;
    }

    this.processesService.getTramitesByRfc(this.rfc).subscribe({
      next: (response) => {
        this.tramites = response;
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
