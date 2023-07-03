import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { API_URL } from 'src/app/core/services/environment/environment';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vet-schedule',
  templateUrl: './vet-schedule.component.html',
  styleUrls: ['./vet-schedule.component.css'],
})
export class VetScheduleComponent {
  form!: FormGroup;
  currentDate = new Date();
  vetBookingData: any;
  vetId!: string;

  constructor(
    private authService: AuthService,
    private vetBookingService: VetBookingService,
    private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.vetId = authService.getVetId();
  }

  ngOnInit(): void {
    this.getVetBookingData(this.vetId);
    this.form = this._formBuilder.group({
      day: [this.currentDate],
    });
    this.form.get('day')?.valueChanges.subscribe(value => {
      // Perform actions when the value changes
      this.currentDate = value
      this.getVetBookingData(this.vetId);
    });
  }

  getVetBookingData(id: string) {
    const filter = {
      vet_id: id,
      day: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
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
    this.getVetBookingData(this.vetId);
  }

  nextDate(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.getVetBookingData(this.vetId);
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
