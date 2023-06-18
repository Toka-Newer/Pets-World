import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
