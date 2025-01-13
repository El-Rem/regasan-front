import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegulatoryRoutingModule } from './regulatory-routing.module';
import { RegulatoryDashboardComponent } from './regulatory-dashboard/regulatory-dashboard.component';


@NgModule({
  declarations: [
    RegulatoryDashboardComponent
  ],
  imports: [
    CommonModule,
    RegulatoryRoutingModule
  ]
})
export class RegulatoryModule { }
