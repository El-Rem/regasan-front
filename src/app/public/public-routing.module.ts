import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicProcessesViewComponent } from './public-processes-view/public-processes-view.component';

const routes: Routes = [
  { path: 'mis-tramites', component: PublicProcessesViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
