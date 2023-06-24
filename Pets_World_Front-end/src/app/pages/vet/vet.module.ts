import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VetRoutingModule } from './vet-routing.module';
import { HomeComponent } from './home/home.component';
import { VetDetailsComponent } from './vet-details/vet-details.component';
import { VetScheduleComponent } from './vet-schedule/vet-schedule.component';


@NgModule({
  declarations: [
    HomeComponent,
    VetDetailsComponent,
    VetScheduleComponent
  ],
  imports: [
    CommonModule,
    VetRoutingModule
  ]
})
export class VetModule { }
