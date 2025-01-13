import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegulatoryDashboardComponent } from './regulatory-dashboard/regulatory-dashboard.component';
import { RoleGuardService } from '../core/services/role-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: RegulatoryDashboardComponent, canActivate: [RoleGuardService], data: { role: 'Regulatorio' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegulatoryRoutingModule { }
