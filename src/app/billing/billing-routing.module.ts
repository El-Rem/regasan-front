import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { RoleGuardService } from '../core/services/role-guard.service';
import { ViewProcessesComponent } from './view-processes/view-processes.component';

const routes: Routes = [
  { path: 'all-processes', component: ViewProcessesComponent , canActivate: [RoleGuardService], data: { role: 'Facturacion' } },
  { path: 'dashboard', component: BillingDashboardComponent, canActivate: [RoleGuardService], data: { role: 'Facturacion' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
