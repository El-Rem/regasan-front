import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa los módulos necesarios para los formularios
import { SalesRoutingModule } from './sales-routing.module';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { ViewEditProcessesComponent } from './view-edit-processes/view-edit-processes.component';
import { ViewEditTechnicalDataComponent } from './view-edit-technical-data/view-edit-technical-data.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    SalesDashboardComponent,
    ViewEditProcessesComponent,
    ViewEditTechnicalDataComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,           // Asegúrate de importar FormsModule
    ReactiveFormsModule    // Asegúrate de importar ReactiveFormsModule
  ]
})
export class SalesModule { }
