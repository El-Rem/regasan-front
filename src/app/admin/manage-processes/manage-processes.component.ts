import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { EmployeService } from 'src/app/services/employe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-processes',
  templateUrl: './manage-processes.component.html',
  styleUrls: ['./manage-processes.component.css']
})
export class ManageProcessesComponent implements OnInit {
  clients: any[] = [];
  tramites: any[] = [];
  employees: any[] = [];
  processForm: FormGroup;
  updateProcessForm: FormGroup;
  deleteProcessForm: FormGroup;
  serviceIsOther: boolean = false;
  selectedClientName: string = '';

  private readonly dossierOptions: string[] = [
    'FDA',
    'INDRE',
    'Respuesta a prevención',
    'Respuesta de dossier',
    'Dispositivos médicos',
    'Medicamento genérico',
    'Molécula nueva',
    'Plaguicida',
    'Remedio herbolario',
    'Tecnovigilancia',
    'Licencia Sanitaria',
    'NA'
  ];

  private readonly consultoriaOptions: string[] = [
    'Aviso de Funcionamiento',
    'Escrito libre',
    'Revisión de etiqueta',
    'Permiso de Importación',
    'GMP',
    'Sometimiento a Cofepris',
    'Horas de consultoría',
    'Permiso de construcción',
    'Publicidad',
    'Suplemento Alimenticio',
    'Consultoría',
    'NA'
  ];

  serviceIsOtherCreate = false;
  showSubServiceCreate = false;
  subServiceOptionsCreate: string[] = [];

  serviceIsOtherUpdate = false;
  showSubServiceUpdate = false;
  subServiceOptionsUpdate: string[] = [];

  constructor(
    private clientService: ClientService,
    private processesService: ProcessesService,
    private employeService: EmployeService,
    private fb: FormBuilder
  ) {
    this.processForm = this.fb.group({
      client_rfc: ['', Validators.required],
      id: ['', Validators.required],
      distinctive_denomination: ['', Validators.required],
      generic_name: ['', Validators.required],
      product_manufacturer: ['', Validators.required],
      service_name: ['', Validators.required],
      sub_service_name: [''],
      other_service: [''],
      input_value: ['', Validators.required],
      type_description: ['', Validators.required],
      class_name: ['', Validators.required],
      technical_data: ['', Validators.required],
      start_date: ['', Validators.required],
      status: ['', Validators.required],
      completion_percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      assigned_consultant: ['', Validators.required],
      additional_information: ['']
    });

    this.updateProcessForm = this.fb.group({
      client_rfc: ['', Validators.required],
      tramite_id: ['', Validators.required],
      distinctive_denomination: ['', Validators.required],
      generic_name: ['', Validators.required],
      product_manufacturer: ['', Validators.required],
      service_name: ['', Validators.required],
      sub_service_name: [''],
      other_service: [''],
      input_value: ['', Validators.required],
      type_description: ['', Validators.required],
      class_name: ['', Validators.required],
      technical_data: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      status: ['', Validators.required],
      completion_percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      cofepris_entry_date: [''],
      cofepris_status: [''],
      cofepris_status_health_registration_number: [''],
      cofepris_status_registrer_number: [''],
      cofepris_status_prevention_response: [''],
      cofepris_entry_number: [''],
      cofepris_link: [''],
      assigned_consultant: ['', Validators.required],
      additional_information: ['']
    });

    this.deleteProcessForm = this.fb.group({
      client_rfc: ['', Validators.required],
      tramite_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadClients();
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeService.getAllEmployes().subscribe({
      next: (response) => {
        // Combinar first_name y last_name
        this.employees = response.map((emp: any) => ({
          fullName: `${emp.first_name} ${emp.last_name}`,
          email: emp.email // Guardar cualquier identificador necesario
        }));
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar empleados',
          text: 'No se pudieron cargar los empleados.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
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
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  onServiceChange(event: any, formType: 'create' | 'update') {
    const value: string = event.target.value;

    const form = formType === 'create' ? this.processForm : this.updateProcessForm;

    form.patchValue({
      sub_service_name: null,
      other_service: ''
    });

    const setState = (isOther: boolean, showSub: boolean, options: string[]) => {
      if (formType === 'create') {
        this.serviceIsOtherCreate = isOther;
        this.showSubServiceCreate = showSub;
        this.subServiceOptionsCreate = options;
      } else {
        this.serviceIsOtherUpdate = isOther;
        this.showSubServiceUpdate = showSub;
        this.subServiceOptionsUpdate = options;
      }
    };

    if (value === 'Armado de Dossier') {
      setState(false, true, this.dossierOptions);
      form.get('other_service')?.setValue('');
    } else if (value === 'Consultoría') {
      setState(false, true, this.consultoriaOptions);
      form.get('other_service')?.setValue('');
    } else if (value === 'Otro') {
      setState(true, false, []);
      form.get('sub_service_name')?.setValue(null);
    } else {
      setState(false, false, []);
    }
  }

  onClientChange(event: any) {
    this.selectedClientName = event.target.options[event.target.selectedIndex].text; // Obtenemos el nombre del cliente
  }

  // Método para buscar los trámites de un cliente seleccionado
  searchTramites() {
    if (this.selectedClientName) {
      this.processesService.searchProcessByBusinessName(this.selectedClientName).subscribe({
        next: (response) => {
          this.tramites = response;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar trámites',
            text: 'No se pudieron cargar los trámites para el cliente seleccionado.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cliente no seleccionado',
        text: 'Por favor, selecciona un cliente primero.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Método para eliminar un trámite por ID
  deleteProcess() {
    const tramiteId = this.deleteProcessForm.get('tramite_id')?.value;

    if (tramiteId) {
      this.processesService.deleteProcess(tramiteId).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Trámite eliminado',
            text: 'El trámite ha sido eliminado exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.deleteProcessForm.reset();
        },
        error: (error) => {
          if (error.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se puede eliminar el trámite porque tiene datos técnicos asociados.',
              confirmButtonText: 'Aceptar'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'Ocurrió un error al eliminar el trámite. Inténtalo nuevamente.',
              confirmButtonText: 'Aceptar'
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, selecciona un trámite para eliminar.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  registerProcess() {
    if (this.processForm.valid) {
      const processData = this.processForm.value;
      Swal.fire({
        title: 'Cargando informacion del tramite...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.processesService.createProcess(processData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Trámite registrado',
            text: 'El trámite ha sido registrado exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.processForm.reset();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: 'Ocurrió un error al registrar el trámite. Inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      const invalidFields = [];
      const controls = this.processForm.controls;

      if (controls['client_rfc'].invalid) invalidFields.push('Cliente');
      if (controls['id'].invalid) invalidFields.push('Id REGSAN');
      if (controls['distinctive_denomination'].invalid) invalidFields.push('Denominación Distintiva');
      if (controls['generic_name'].invalid) invalidFields.push('Denominación Genérica');
      if (controls['product_manufacturer'].invalid) invalidFields.push('Fabricante del Producto');
      if (controls['service_name'].invalid) invalidFields.push('Servicio');
      if (controls['input_value'].invalid) invalidFields.push('Insumo');
      if (controls['type_description'].invalid) invalidFields.push('Tipo');
      if (controls['class_name'].invalid) invalidFields.push('Clase');
      if (controls['technical_data'].invalid) invalidFields.push('Datos Técnicos');
      if (controls['start_date'].invalid) invalidFields.push('Fecha de Inicio');
      if (controls['status'].invalid) invalidFields.push('Estatus');
      if (controls['completion_percentage'].invalid) invalidFields.push('Porcentaje de Avance');
      if (controls['assigned_consultant'].invalid) invalidFields.push('Consultor Asignado');

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        html: `Los siguientes campos están vacíos o incorrectos:<br><ul>${invalidFields.map(f => `<li>${f}</li>`).join('')}</ul>`,
        confirmButtonText: 'Aceptar'
      });
    }
  }

  updateProcess() {
    if (this.updateProcessForm.valid) {
      const tramiteId = this.updateProcessForm.get('tramite_id')?.value;
      const updatedProcessData = this.updateProcessForm.value;

      Swal.fire({
        title: 'Actualizando informacion del tramite...',
        text: 'Por favor, espera mientras se completa el registro.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.processesService.updateProcess(tramiteId, updatedProcessData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Trámite actualizado',
            text: 'Los datos del trámite han sido actualizados exitosamente.',
            confirmButtonText: 'Aceptar'
          });
          this.updateProcessForm.reset();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al actualizar el trámite. Inténtalo nuevamente.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      const invalidFields = [];
      const controls = this.updateProcessForm.controls;

      if (controls['distinctive_denomination'].invalid) invalidFields.push('Denominación Distintiva');
      if (controls['generic_name'].invalid) invalidFields.push('Denominación Genérica');
      if (controls['product_manufacturer'].invalid) invalidFields.push('Fabricante del Producto');
      if (controls['service_name'].invalid) invalidFields.push('Servicio');
      if (controls['input_value'].invalid) invalidFields.push('Insumo');
      if (controls['type_description'].invalid) invalidFields.push('Tipo');
      if (controls['class_name'].invalid) invalidFields.push('Clase');
      if (controls['technical_data'].invalid) invalidFields.push('Datos Técnicos');
      if (controls['start_date'].invalid) invalidFields.push('Fecha de Inicio');
      if (controls['status'].invalid) invalidFields.push('Estatus');
      if (controls['completion_percentage'].invalid) invalidFields.push('Porcentaje de Avance');
      if (controls['assigned_consultant'].invalid) invalidFields.push('Consultor Asignado');
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos antes de actualizar el trámite.',
        html: `Los siguientes campos están vacíos o incorrectos:<br><ul>${invalidFields.map(f => `<li>${f}</li>`).join('')}</ul>`,
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Método para cargar los detalles del trámite seleccionado
onTramiteChange(event: any) {
  const tramiteId = event.target.value;
  if (tramiteId) {
    this.processesService.getProcesses(tramiteId).subscribe({
      next: (response) => {
        this.updateProcessForm.patchValue({
          distinctive_denomination: response.distinctive_denomination,
          generic_name: response.generic_name,
          product_manufacturer: response.product_manufacturer,
          service_name: response.service_name,
          sub_service_name: response.sub_service_name,
          other_service: response.other_service,
          input_value: response.input_value,
          type_description: response.type_description,
          class_name: response.class_name,
          technical_data: response.technical_data,
          start_date: response.start_date,
          end_date: response.end_date,
          status: response.status,
          completion_percentage: response.completion_percentage,
          cofepris_entry_date: response.cofepris_entry_date,
          cofepris_status: response.cofepris_status,
          cofepris_entry_number: response.cofepris_entry_number,
          cofepris_link: response.cofepris_link,
          cofepris_status_health_registration_number: response.cofepris_status_health_registration_number,
          cofepris_status_registrer_number: response.cofepris_status_registrer_number,
          cofepris_status_prevention_response: response.cofepris_status_prevention_response,
          assigned_consultant: response.assigned_consultant,
          additional_information: response.additional_information
        });

        // Ajusta visibilidad/opciones del sub-servicio según el valor cargado
        const svc = response.service_name;
        const fakeEvent = { target: { value: svc } };
        this.onServiceChange(fakeEvent, 'update');
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar trámite',
          text: 'No se pudo cargar la información del trámite seleccionado.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}


}
