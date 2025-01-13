import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicProcessesViewComponent } from './public-processes-view/public-processes-view.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicProcessesViewComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule
  ]
})
export class PublicModule { }
