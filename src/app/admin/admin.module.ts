import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { ManageProcessesComponent } from './manage-processes/manage-processes.component';
import { SearchProcessesComponent } from './search-processes/search-processes.component';
import { TechnicalDataComponent } from './technical-data/technical-data.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageEmployesComponent } from './manage-employes/manage-employes.component';
import { OneProcessComponent } from './one-process/one-process.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageClientsComponent,
    ManageProcessesComponent,
    SearchProcessesComponent,
    TechnicalDataComponent,
    NavbarComponent,
    ManageEmployesComponent,
    OneProcessComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class AdminModule { }
