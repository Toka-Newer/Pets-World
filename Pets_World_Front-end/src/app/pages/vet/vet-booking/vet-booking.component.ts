import { Component } from '@angular/core';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';

@Component({
  selector: 'app-vet-booking',
  templateUrl: './vet-booking.component.html',
  styleUrls: ['./vet-booking.component.css']
})
export class VetBookingComponent {
  tableData = [
    { time: '09:00 AM', event: 'Meeting' },
    { time: '10:00 AM', event: 'Presentation' },
    { time: '11:00 AM', event: 'Lunch' },
    // Add more rows as needed
  ];
  vetBookingData: any;
  constructor(private vetBookingService: VetBookingService) { }
  ngOnInit(): void {
    this.getVetBookingData("648dd6c55a2fb5c9b45df45b");
  }
  getVetBookingData(id: string) {
    this.vetBookingService.getBookingByVetId(id).subscribe(
      (data: any) => {
        this.vetBookingData = data;
        console.log(data)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
