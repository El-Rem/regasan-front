import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessesService } from 'src/app/services/processes.service';
@Component({
  selector: 'app-one-process',
  templateUrl: './one-process.component.html',
  styleUrls: ['./one-process.component.css']
})
export class OneProcessComponent implements OnInit {
  tramite: any = {}; // Objeto para almacenar los datos del trámite.
  loading: boolean = true; // Indicador de carga.
  error: string | null = null; // Para manejar errores.

  constructor(
    private route: ActivatedRoute,
    private processesService: ProcessesService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del trámite desde los parámetros de la ruta.
    const tramiteId = this.route.snapshot.paramMap.get('id');
    if (tramiteId) {
      this.loadTramite(tramiteId);
    } else {
      this.error = 'ID de trámite no proporcionado';
      this.loading = false;
    }
  }

  // Método para cargar los datos del trámite.
  loadTramite(id: string): void {
    this.processesService.getProcesses(id).subscribe({
      next: (data) => {
        this.tramite = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos del trámite.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  goBack(): void {
    history.back();
  }
}
