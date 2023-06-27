import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, PagesRoutingModule, CarouselModule],
})
export class PagesModule {}
