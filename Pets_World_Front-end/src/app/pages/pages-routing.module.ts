import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from '../core/guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },

  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((register) => register.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((user) => user.UserModule),
    canActivate: [AuthGuard],
    data: { roles: ['owner', 'keeper'] },
  },
  {
    path: 'vet',
    loadChildren: () => import('./vet/vet.module').then((vet) => vet.VetModule),
    canActivate: [AuthGuard],
    data: { roles: ['vet'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
