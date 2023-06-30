import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { API_URL } from 'src/app/core/services/environment/environment';
import { KeeperAppointmentService } from 'src/app/core/services/user/keeper/keeperAppointment/keeper-appointment.service';
import { KeeperBookingService } from 'src/app/core/services/user/keeper/keeperBooking/keeper-booking.service';

@Component({
  selector: 'app-keeper-schedule',
  templateUrl: './keeper-schedule.component.html',
  styleUrls: ['./keeper-schedule.component.css']
})
export class KeeperScheduleComponent {
  form!: FormGroup;
  currentDate = new Date();
  keeperAppointments: any;
  appointment: any;
  keeperBookingData: any;

  constructor(private _formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private keeperAppointmentService: KeeperAppointmentService,
    private keeperBookingService: KeeperBookingService) { }

  ngOnInit(): void {
    this.getKeeperAppointments("649794f8999ea0fe2cd3d9ef");
    this.form = this._formBuilder.group({
      appointment: [this.appointment?._id]
    });
  }

  getKeeperAppointments(id: string) {
    this.keeperAppointmentService.getKeeperAppointment(id).subscribe(
      (data: any) => {
        console.log(data)
        this.keeperAppointments = data;
        this.setSelectedAppointment();
        this.form?.get('appointment')?.setValue(this.appointment?._id);
        this.getKeeperBookingData();
      }, (error: any) => {
        console.error(error);
      }
    )
  }

  setSelectedAppointment() {
    const formattedCurrentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.appointment = this.keeperAppointments?.find((appointment: any) => {
      const start = this.datePipe.transform(appointment.start_time, 'yyyy-MM-dd');
      const end = this.datePipe.transform(appointment.end_time, 'yyyy-MM-dd');
      if (start !== null && end !== null && formattedCurrentDate !== null && start <= formattedCurrentDate && end >= formattedCurrentDate)
        return appointment
    })
  }

  onAppointmentChange(): void {
    this.getKeeperBookingData();
  }

  getKeeperBookingData() {
    const filter = {
      keeper_id: "649794f8999ea0fe2cd3d9ef",
      appointment_id: this.form?.get('appointment')?.value
    }
    console.log(filter)
    this.keeperBookingService.getKeeperSchedule(filter).subscribe(
      (data: any) => {
        console.log(data)
        this.keeperBookingData = data.map((booking: any) => {
          booking.userImage = `${API_URL}/${booking.owner_id.user_id.image}`;
          return booking;
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
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
