import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VetDetailsComponent } from './vet-details/vet-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'details', component: VetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetRoutingModule { }
