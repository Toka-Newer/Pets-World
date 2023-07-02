import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/core/services/environment/environment';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vet-schedule',
  templateUrl: './vet-schedule.component.html',
  styleUrls: ['./vet-schedule.component.css'],
})
export class VetScheduleComponent {
  currentDate = new Date();
  vetBookingData: any;

  constructor(private vetBookingService: VetBookingService) {}

  ngOnInit(): void {
    this.getVetBookingData('64a0edae7a580e6a4453903f');
  }

  getVetBookingData(id: string) {
    const filter = {
      vet_id: id,
      day: this.currentDate.toISOString().substring(0, 10),
    };
    this.vetBookingService.getVetSchedule(filter).subscribe(
      (data: any) => {
        console.log(data);
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
    this.getVetBookingData('64a0edae7a580e6a4453903f');
  }

  nextDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.getVetBookingData('64a0edae7a580e6a4453903f');
  }

  // deleteBooking(id: any) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this._VetBooking.deleteVetBooking(id).subscribe((data: any) => {
  //         this.vetSchedule = this.vetSchedule.filter((element: any) => element._id != id);
  //         console.log(data)
  //       }, (error: any) => {
  //         console.log(error)
  //       })
  //       Swal.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     }
  //   })
  // }
}
