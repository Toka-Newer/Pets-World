import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeeperListComponent } from '../keepers/keeper-list/keeper-list.component';
import { KeeperDetailsComponent } from '../keepers/keeper-details/keeper-details.component';
import { KeeperScheduleComponent } from './keeper-schedule/keeper-schedule.component';
import { KeeperAppointmentsComponent } from './keeper-appointments/keeper-appointments.component';

const routes: Routes = [
  // {
  //   path: '', component: KeeperListComponent
  // },
  // {
  //   path: 'details', component: KeeperDetailsComponent
  // },
  {
    path: 'schedule', component: KeeperScheduleComponent
  },
  {
    path: 'appointments', component: KeeperAppointmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeeperRoutingModule { }
