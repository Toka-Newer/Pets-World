import { PetsService } from './../../../core/services/pet/pets.service';
import { VetAppointmentService } from './../../../core/services/vet/vetAppointment/vet-appointment.service';
import { VetService } from './../../../core/services/vet/vetService/vet.service';
import { Component, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import { API_URL } from '../../../core/services/environment/environment';
import { FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {ActivatedRoute} from "@angular/router";
import {Appointment} from "../models/Appointment";
import {AddAppointment} from "../models/AddAppointment";

@Component({
  selector: 'app-vet-details',
  templateUrl: './vet-details.component.html',
  styleUrls: ['./vet-details.component.css'],
})
export class VetDetailsComponent {
  vetId: string ='';
  isSticky = false;
  rating: number | null = null;
  hoveredStar: number | null = null;

  vetData: any;
  vetImage: any;
  vetRating: number | null = null;
  vetAppointments: any;
  pets: any;
  vetBookingData: any;
  bookingFormGroup!: FormGroup;
  addAppointment: AddAppointment = {
    appointment_id: '',
    vet_id: '',
    owner_id: '',
    pet_id: '',
    day: '',
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private vetService: VetService,
    private vetAppointmentService: VetAppointmentService,
    private datePipe: DatePipe,
    private petsService: PetsService,
    private vetBookingService: VetBookingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.vetId = params["id"];
      this.getVetData();
      // this.getPetsByOwnerId();
      // this.getVetAppointments();
      // this.getVetBookingData();
    });

    // this.bookingFormGroup = this._formBuilder.group({
    //   pet: ['', Validators.required],
    //   appointment: ['', Validators.required],
    // });
  }

  getVetData() {
    this.vetService.getVetById(this.vetId).subscribe(
      (data: any) => {
        this.vetData = data;
        this.vetImage = `${API_URL}/${this.vetData.user_id.image}`;
        this.staticRate();
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getVetAppointments() {
    this.vetAppointmentService.getVetAppointment(this.vetId).subscribe(
      (data: any) => {
        this.vetAppointments = data
          .map((appointment: any) => {
            // Extracting date portion from the day value
            appointment.day = appointment.day.split('T')[0];
            return appointment;
          })
          .filter((appointment: any) => appointment.number_of_clients > 0); // Filter appointments with number_of_clients > 0
        console.log(this.vetAppointments);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getPetsByOwnerId() {
    this.petsService.getPetsByOwnerId(this.vetId).subscribe(
      (data: any) => {
        this.pets = data;
        console.log(data);
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

  submitForm() {
    if (this.bookingFormGroup.valid) {
      const dayFilter = this.vetAppointments.find(
        (obj: Appointment) =>
          obj._id === this.bookingFormGroup.value.appointment
      ).day;

      if (dayFilter) {
        this.addAppointment = {
          appointment_id: this.bookingFormGroup.value.appointment,
          vet_id: '648dd6c55a2fb5c9b45df45b',
          owner_id: '648f9646bd39fe8c0527ee4f',
          pet_id: this.bookingFormGroup.value.pet,
          day: dayFilter,
        };

        this.vetBookingService.addVetBooking(this.addAppointment).subscribe(
          (data: any) => {
            console.log(data);
            Swal.fire({
              title: 'Success!',
              text: 'Booking done successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              // Handle the result or perform additional actions
            });
          },
          (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: `${error.error.message}`,
              icon: 'error',
              confirmButtonText: 'OK',
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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset > 100) {
      // Adjust the scroll threshold as needed
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  getStarClass(index: number): string {
    if (this.rating !== null && index <= this.rating) {
      return 'active';
    } else if (this.hoveredStar !== null && index <= this.hoveredStar) {
      return 'hover';
    } else {
      return '';
    }
  }

  hoverStar(index: number): void {
    this.hoveredStar = index;
  }

  unhoverStar(): void {
    this.hoveredStar = null;
  }

  rateStar(index: number): void {
    if (this.rating === index) {
      this.rating = null; // Unrate the star if it was already selected
    } else {
      this.rating = index; // Set the rating to the selected star index
    }
    const data = {
      owner_id: '648f9646bd39fe8c0527ee4f',
      rate: index,
    };
    this.vetService.updateVetRating('648dd6c55a2fb5c9b45df45b', data).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  staticRate(): void {
    this.vetRating = this.vetData.totalOfReviews / this.vetData.numberOfReviews;
  }

  getStaticStarClass(index: number): string {
    if (this.vetRating !== null && index <= this.vetRating) {
      return 'active';
    } else {
      return '';
    }
  }
}
