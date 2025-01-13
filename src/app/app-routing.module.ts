import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
  { path: 'billing', loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule) },
  { path: 'regulatory', loadChildren: () => import('./regulatory/regulatory.module').then(m => m.RegulatoryModule) },
  { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
