import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { ManageProcessesComponent } from './manage-processes/manage-processes.component';
import { SearchProcessesComponent } from './search-processes/search-processes.component';
import { TechnicalDataComponent } from './technical-data/technical-data.component';
import { RoleGuardService } from '../core/services/role-guard.service';
import { ManageEmployesComponent } from './manage-employes/manage-employes.component';
import { OneProcessComponent } from './one-process/one-process.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [RoleGuardService], data: { role: 'Admin' } },
  { path: 'manage-clients', component: ManageClientsComponent, canActivate: [RoleGuardService], data: { role: 'Admin' } },
  { path: 'manage-processes', component: ManageProcessesComponent, canActivate: [RoleGuardService], data: { role: 'Admin' } },
  { path: 'search-processes', component: SearchProcessesComponent, canActivate: [RoleGuardService], data: { role: 'Admin' } },
  { path: 'technical-data', component: TechnicalDataComponent, canActivate: [RoleGuardService], data: { role: 'Admin' } },
  { path: 'manage-employes', component: ManageEmployesComponent, canActivate: [RoleGuardService], data: { role: 'Admin' } },
  { path: 'tramite-detalle/:id', component: OneProcessComponent, canActivate: [RoleGuardService], data: { role: 'Admin' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
