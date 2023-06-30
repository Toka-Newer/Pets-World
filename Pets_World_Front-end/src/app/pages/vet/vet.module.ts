import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VetRoutingModule } from './vet-routing.module';
import { HomeComponent } from './home/home.component';
import { VetDetailsComponent } from './vet-details/vet-details.component';
import { VetScheduleComponent } from './vet-schedule/vet-schedule.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditVetComponent } from './edit-vet/edit-vet/edit-vet.component';
import { VetBookingComponent } from './vet-booking/vet-booking.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    HomeComponent,
    VetDetailsComponent,
    VetScheduleComponent,
    VetAppointmentsComponent,
<<<<<<< HEAD
    EditVetComponent,
=======
    VetBookingComponent,
>>>>>>> 780ca8cb1b70ffe7623d9b18b2832893a138d42c
  ],
  imports: [
    CommonModule,
    VetRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    MatCardModule,
  ],
})
export class VetModule { }
