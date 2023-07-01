import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { API_URL } from 'src/app/core/services/environment/environment';
import { KeeperBookingService } from 'src/app/core/services/user/keeper/keeperBooking/keeper-booking.service';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';

@Component({
  selector: 'app-user-schedule',
  templateUrl: './user-schedule.component.html',
  styleUrls: ['./user-schedule.component.css']
})
export class UserScheduleComponent {
  form!: FormGroup;
  currentDate = new Date();
  currentDateKeeper = new Date();
  ownerBookingData: any;
  ownerBookingKeeper: any;
  ownerBookingKeeperDay: any;

  constructor(private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private vetBookingService: VetBookingService,
    private keeperBookingService: KeeperBookingService) { }

  ngOnInit(): void {
    this.getVetBookingData("648f9646bd39fe8c0527ee4f");
    this.form = this._formBuilder.group({
      day: [this.currentDate],
    });
    this.form.get('day')?.valueChanges.subscribe(value => {
      // Perform actions when the value changes
      this.currentDate = value
      this.getVetBookingData("648f9646bd39fe8c0527ee4f");
      this.getBookingKeeper(value);
    });

    this.getKeeperBookingData();
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
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getKeeperBookingData() {
    const filter = {
      owner_id: "648f9646bd39fe8c0527ee4f",
    }
    this.keeperBookingService.getKeeperSchedule(filter).subscribe(
      (data: any) => {
        console.log(data)
        this.ownerBookingKeeper = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.keeper_id.owner_id.user_id.image}`;
          return booking;
        });
        this.getBookingKeeper(this.currentDateKeeper);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getBookingKeeper(day: any) {
    day = this.datePipe.transform(day, 'yyyy-MM-dd');
    this.ownerBookingKeeperDay = this.ownerBookingKeeper.filter((booking: any) => {
      const start = this.datePipe.transform(booking.appointment_id.start_time, 'yyyy-MM-dd');
      const end = this.datePipe.transform(booking.appointment_id.end_time, 'yyyy-MM-dd');
      if (start != null && end != null && day != null && start <= day && end >= day)
        return booking
    })
  }

}
