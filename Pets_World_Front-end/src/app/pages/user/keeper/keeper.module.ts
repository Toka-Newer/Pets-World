import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeeperRoutingModule } from './keeper-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    KeeperRoutingModule
  ]
})
export class KeeperModule { }
