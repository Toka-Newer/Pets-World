import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KeeperDetailsComponent } from './keeper-details/keeper-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'details', component: KeeperDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeeperRoutingModule { }
