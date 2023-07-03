import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AuthGuard } from '../core/guards/auth/auth.guard';

@NgModule({
  declarations: [LandingComponent],
  providers: [AuthGuard],
  imports: [CommonModule, PagesRoutingModule, CarouselModule],
})
export class PagesModule {}
