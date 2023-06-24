import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeeperRoutingModule } from './keeper-routing.module';
import { HomeComponent } from './home/home.component';
import { KeeperDetailsComponent } from './keeper-details/keeper-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    KeeperDetailsComponent
  ],
  imports: [
    CommonModule,
    KeeperRoutingModule
  ]
})
export class KeeperModule { }
