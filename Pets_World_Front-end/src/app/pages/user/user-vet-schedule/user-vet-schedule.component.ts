import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { API_URL } from 'src/app/core/services/environment/environment';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';

@Component({
  selector: 'app-user-vet-schedule',
  templateUrl: './user-vet-schedule.component.html',
  styleUrls: ['./user-vet-schedule.component.css']
})
export class UserVetScheduleComponent {
  form!: FormGroup;
  currentDate = new Date();
  ownerBookingData: any;

  constructor(private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private vetBookingService: VetBookingService) { }

  ngOnInit(): void {
    // this.currentDate = this.currentDate.toISOString().substring(0, 10);
    this.getVetBookingData("6496abf1299191941c468dda");
    this.form = this._formBuilder.group({
      day: [this.currentDate]
    });

    this.form.get('day')?.valueChanges.subscribe(value => {
      // Perform actions when the value changes
      this.currentDate = value
      this.getVetBookingData("6496abf1299191941c468dda");
    });
  }

  getVetBookingData(id: string) {
    const filter = {
      owner_id: id,
      day: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
    }
    this.vetBookingService.getVetSchedule(filter).subscribe(
      (data: any) => {
        this.ownerBookingData = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.owner_id.user_id.image}`;
          return booking;
        });
        console.log(this.ownerBookingData)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
