import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegulatoryDashboardComponent } from './regulatory-dashboard/regulatory-dashboard.component';
import { SearchProcessesComponent } from './search-processes/search-processes.component';
import { TechnicalDataComponent } from './technical-data/technical-data.component';
import { OneProcessComponent } from './one-process/one-process.component';
import { RoleGuardService } from '../core/services/role-guard.service';

const routes: Routes = [
  { path: 'manage-processes', component: RegulatoryDashboardComponent, canActivate: [RoleGuardService], data: { role: 'Regulatorio' } },
  { path: 'search-processes', component: SearchProcessesComponent, canActivate: [RoleGuardService], data: { role: 'Regulatorio' } },
  { path: 'technical-data', component: TechnicalDataComponent, canActivate: [RoleGuardService], data: { role: 'Regulatorio' } },
  { path: 'tramite-detalle/:id', component: OneProcessComponent, canActivate: [RoleGuardService], data: { role: 'Regulatorio' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegulatoryRoutingModule { }
