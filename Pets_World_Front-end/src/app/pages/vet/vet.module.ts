import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VetRoutingModule } from './vet-routing.module';
import { HomeComponent } from './home/home.component';
import { VetDetailsComponent } from './vet-details/vet-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    VetDetailsComponent
  ],
  imports: [
    CommonModule,
    VetRoutingModule
  ]
})
export class VetModule { }
