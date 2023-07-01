import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VetDetailsComponent } from './vet-details/vet-details.component';
import { VetScheduleComponent } from './vet-schedule/vet-schedule.component';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { EditVetComponent } from './edit-vet/edit-vet/edit-vet.component';
import { VetBookingComponent } from './vet-booking/vet-booking.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details',
    component: VetDetailsComponent,
  },
  {
    path: 'schedule',
    component: VetScheduleComponent,
  },
  {
    path: 'appointments',
    component: VetAppointmentsComponent,
  },
  {
    path: 'edit',
    component: EditVetComponent,
  },
  {
    path: 'appointments',
    component: VetAppointmentsComponent,
  },
  {
    path: 'booking',
    component: VetBookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetRoutingModule {}
