import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserVetScheduleComponent } from './user-vet-schedule/user-vet-schedule.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vet/schedule', component: UserVetScheduleComponent },
  {
    path: 'keeper',
    loadChildren: () =>
      import('./keeper/keeper.module').then((keeper) => keeper.KeeperModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
