import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserScheduleComponent } from './user-schedule/user-schedule.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'schedule',
    component: UserScheduleComponent,
  },
  {
    path: 'keeper',
    loadChildren: () =>
      import('./keeper/keeper.module').then((keeper) => keeper.KeeperModule),
    canActivate: [AuthGuard],
    data: { roles: ['keeper'] }
  },
  {
    path: 'edit',
    component: EditOwnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
