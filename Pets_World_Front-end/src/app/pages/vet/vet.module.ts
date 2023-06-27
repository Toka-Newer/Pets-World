import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VetRoutingModule } from './vet-routing.module';
import { HomeComponent } from './home/home.component';
import { VetDetailsComponent } from './vet-details/vet-details.component';
import { VetScheduleComponent } from './vet-schedule/vet-schedule.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';

@NgModule({
  declarations: [
    HomeComponent,
    VetDetailsComponent,
    VetScheduleComponent,
    VetAppointmentsComponent
  ],
  imports: [
    CommonModule,
    VetRoutingModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ]
})
export class VetModule { }
