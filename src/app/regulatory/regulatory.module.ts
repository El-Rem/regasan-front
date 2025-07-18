import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegulatoryRoutingModule } from './regulatory-routing.module';
import { RegulatoryDashboardComponent } from './regulatory-dashboard/regulatory-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchProcessesComponent } from './search-processes/search-processes.component';
import { TechnicalDataComponent } from './technical-data/technical-data.component';
import { OneProcessComponent } from './one-process/one-process.component';


@NgModule({
  declarations: [
    RegulatoryDashboardComponent,
    NavbarComponent,
    SearchProcessesComponent,
    TechnicalDataComponent,
    OneProcessComponent
  ],
  imports: [
    CommonModule,
    RegulatoryRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class RegulatoryModule { }
