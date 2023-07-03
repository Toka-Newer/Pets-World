import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import{OwnerPetsComponent} from './user/owner-pets/owner-pets.component';

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
  },
  {
    path: 'vet',
    loadChildren: () => import('./vet/vet.module').then((vet) => vet.VetModule),
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
