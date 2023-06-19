import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VetRoutingModule } from './vet-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    VetRoutingModule
  ]
})
export class VetModule { }
