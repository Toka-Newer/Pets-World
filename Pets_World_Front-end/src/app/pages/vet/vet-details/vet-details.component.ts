import { PetsService } from './../../../core/services/pet/pets.service';
import { VetAppointmentService } from './../../../core/services/vet/vetAppointment/vet-appointment.service';
import { VetService } from './../../../core/services/vet/vetService/vet.service';
import { Component, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import { API_URL } from '../../../core/services/environment/environment'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

interface Appointment {
  _id: String,
  vet_id: String,
  day: String,
  start_time: String,
  end_time: String,
  number_of_clients: Number,
}

interface AddAppointment {
  appointment_id: String,
  vet_id: String,
  owner_id: String,
  pet_id: String,
  day: String,
}

@Component({
  selector: 'app-vet-details',
  templateUrl: './vet-details.component.html',
  styleUrls: ['./vet-details.component.css'],
})
export class VetDetailsComponent {
  isSticky = false;

  vetData: any;
  vetAppointments: any;
  pets: any;
  vetBookingData: any;
  vetImage: any;
  bookingFormGroup!: FormGroup;
  addAppointment: AddAppointment = {
    appointment_id: '',
    vet_id: '',
    owner_id: '',
    pet_id: '',
    day: ''
  };
  constructor(private _formBuilder: FormBuilder,
    private vetService: VetService,
    private vetAppointmentService: VetAppointmentService,
    private datePipe: DatePipe,
    private petsService: PetsService,
    private vetBookingService: VetBookingService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getVetData("648dd6c55a2fb5c9b45df45b");
    this.getVetAppointments("648dd6c55a2fb5c9b45df45b");
    this.getPetsByOwnerId("648f9646bd39fe8c0527ee4f");
    // this.getVetBookingData("648f98130dcac62b73ca2f62");

    this.bookingFormGroup = this._formBuilder.group({
      pet: ['', Validators.required],
      appointment: ['', Validators.required],
    });
  }

  getVetData(id: string) {
    this.vetService.getVetById(id).subscribe(
      (data: any) => {
        this.vetData = data;
        this.vetImage = `${API_URL}/${this.vetData.user_id.image}`;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getVetAppointments(id: string) {
    this.vetAppointmentService.getVetAppointment(id).subscribe(
      (data: any) => {
        this.vetAppointments = data.map((appointment: any) => {
          // Extracting date portion from the day value
          appointment.day = appointment.day.split('T')[0];
          return appointment;
        }).filter((appointment: any) => appointment.number_of_clients > 0); // Filter appointments with number_of_clients > 0
        console.log(this.vetAppointments);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getPetsByOwnerId(id: string) {
    this.petsService.getPetsByOwnerId(id).subscribe(
      (data: any) => {
        this.pets = data;
        console.log(data)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // getVetBookingData(id: string) {
  //   this.vetBookingService.getBookingByVetId(id).subscribe(
  //     (data: any) => {
  //       this.vetBookingData = data;
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset > 100) { // Adjust the scroll threshold as needed
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  submitForm() {
    if (this.bookingFormGroup.valid) {
      const dayFilter = this.vetAppointments.find((obj: Appointment) => obj._id === this.bookingFormGroup.value.appointment).day;

      if (dayFilter) {

        this.addAppointment = {
          appointment_id: this.bookingFormGroup.value.appointment,
          vet_id: "648dd6c55a2fb5c9b45df45b",
          owner_id: "648f9646bd39fe8c0527ee4f",
          pet_id: this.bookingFormGroup.value.pet,
          day: dayFilter
        }

        this.vetBookingService.addVetBooking(this.addAppointment).subscribe(
          (data: any) => {
            console.log(data)
            Swal.fire({
              title: 'Success!',
              text: 'Booking done successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              // Handle the result or perform additional actions
            });
          },
          (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: `${error.error.message}`,
              icon: 'error',
              confirmButtonText: 'OK'
            }).then((result) => {
              // Handle the result or perform additional actions
            });
          }
        );

      }
    } else {
      console.log('Please fill in all required fields.');
    }
  }

}
