import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { ViewEditProcessesComponent } from './view-edit-processes/view-edit-processes.component';
import { ViewEditTechnicalDataComponent } from './view-edit-technical-data/view-edit-technical-data.component';
import { RoleGuardService } from '../core/services/role-guard.service';
import { ViewAllProcessesComponent } from './view-all-processes/view-all-processes.component';

const routes: Routes = [
  { path: 'dashboard', component: SalesDashboardComponent, canActivate: [RoleGuardService], data: { role: 'Ventas' } },
  { path: 'processes', component: ViewEditProcessesComponent, canActivate: [RoleGuardService], data: { role: 'Ventas' } },
  { path: 'all-processes', component: ViewAllProcessesComponent, canActivate: [RoleGuardService], data: { role: 'Ventas' } },
  { path: 'technical-data', component: ViewEditTechnicalDataComponent, canActivate: [RoleGuardService], data: { role: 'Ventas' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
