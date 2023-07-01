import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeeperAppointmentService } from 'src/app/core/services/user/keeper/keeperAppointment/keeper-appointment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-keeper-appointments',
  templateUrl: './keeper-appointments.component.html',
  styleUrls: ['./keeper-appointments.component.css'],
})
export class KeeperAppointmentsComponent {
  appointmentFormGroup!: FormGroup;
  appointments: any;
  addAppointment: any;
  editAppointment: any;
  id = '648d7df968534eb332418a8d';
  clicked: boolean = false;
  modelStatus: any = 'Add';
  constructor(
    private _keeperAppointments: KeeperAppointmentService,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getkeeperAppointments();
    this.appointmentFormGroup = this._formBuilder.group({
      id: [''],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      number_of_pets: [
        ,
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+')],
      ],
    });
  }

  getkeeperAppointments() {
    this._keeperAppointments.getKeeperAppointment(this.id).subscribe(
      (data: any) => {
        this.appointments=data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteKeeperAppointment(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._keeperAppointments.deleteKeeperAppointment(id).subscribe(
          (data: any) => {
            this.appointments = this.appointments.filter(
              (element: any) => element._id != id
            );
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          },
          (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: `${error.error.message}`,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      }
    });
  }

  resetForm() {
    this.modelStatus = 'Add';
    // this.appointmentFormGroup.reset();
  }

  formatDate(date:any)
  {
    const dateString = date; // Replace with your date string
    const datePipe = new DatePipe('en-US');
    const dateObj = new Date(dateString);
    const formattedDate = datePipe.transform(dateObj, 'MMMM d');
    return formattedDate;
  }

  fillForm(appointment: any) {
    this.modelStatus = 'Edit';
    this.appointmentFormGroup.patchValue({
      id: appointment._id,
      start_time: appointment.start_time,
      end_time: appointment.end_time,
      number_of_pets: appointment.number_of_pets,
    });
  }

  submitForm() {
    if (this.modelStatus == 'Add') {
      this.submitAdd();
    } else {
      this.submitEdit();
    }
  }

  submitAdd() {
    let start = this.datePipe.transform(
      this.appointmentFormGroup.value.start_time,
      'yyyy-MM-dd'
    );
    let end = this.datePipe.transform(
      this.appointmentFormGroup.value.end_time,
      'yyyy-MM-dd'
    );
    this.addAppointment = {
      number_of_pets: this.appointmentFormGroup.value.number_of_pets,
      start_time: start,
      end_time: end,
    };
    this.clicked = true;
    this._keeperAppointments
      .addKeeperAppointments(this.addAppointment, this.id)
      .subscribe(
        (data: any) => {
          if (data.status == '201') {
            Swal.fire({
              title: 'Success!',
              text: 'Appointment done successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: `${data.message}`,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error: any) => {
          Swal.fire({
            title: 'Error!',
            text: `${error.error.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
  }

  submitEdit() {
    this.editAppointment = {
      id: this.appointmentFormGroup.value.id,
      number_of_pets: this.appointmentFormGroup.value.number_of_pets,
      start_time: this.appointmentFormGroup.value.start_time,
      end_time: this.appointmentFormGroup.value.end_time,
    };
    this._keeperAppointments
      .updateKeeperAppointment(this.editAppointment)
      .subscribe(
        (data: any) => {
          if (data.status == '201') {
            Swal.fire({
              title: 'Success!',
              text: 'Appointment updated successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            Swal.fire({
              title: 'Error!',
              text: `${data.message}`,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        },
        (error: any) => {
          Swal.fire({
            title: 'Error!',
            text: `${error.error.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
  }
}