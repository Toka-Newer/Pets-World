import { Component } from '@angular/core';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import { API_URL } from 'src/app/core/services/environment/environment';

@Component({
  selector: 'app-vet-booking',
  templateUrl: './vet-booking.component.html',
  styleUrls: ['./vet-booking.component.css']
})
export class VetBookingComponent {
  currentDate = new Date();
  vetBookingData: any;

  constructor(private vetBookingService: VetBookingService) { }

  ngOnInit(): void {
    this.getVetBookingData("648dd6c55a2fb5c9b45df45b");
  }

  getVetBookingData(id: string) {
    const filter = {
      vet_id: id,
      day: this.currentDate.toISOString().substring(0, 10)
    }
    this.vetBookingService.getVetSchedule(filter).subscribe(
      (data: any) => {
        this.vetBookingData = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.owner_id.user_id.image}`;
          return booking;
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getFormattedDate(): string {
    return this.currentDate.toISOString().substring(0, 10);
  }

  previousDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.getVetBookingData("648dd6c55a2fb5c9b45df45b");
  }

  nextDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.getVetBookingData("648dd6c55a2fb5c9b45df45b");

  }

}
