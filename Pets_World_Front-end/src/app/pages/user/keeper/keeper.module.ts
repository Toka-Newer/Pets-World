import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeeperRoutingModule } from './keeper-routing.module';
import { HomeComponent } from './home/home.component';
import { KeeperDetailsComponent } from './keeper-details/keeper-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    HomeComponent,
    KeeperDetailsComponent
  ],
  imports: [
    CommonModule,
    KeeperRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
  ],
})
export class KeeperModule { }
