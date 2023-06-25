import { PetsService } from './../../../core/services/pet/pets.service';
import { VetAppointmentService } from './../../../core/services/vet/vetAppointment/vet-appointment.service';
import { VetService } from './../../../core/services/vet/vetService/vet.service';
import { Component, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import { API_URL } from '../../../core/services/environment/environment'

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
  constructor(private vetService: VetService,
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
          appointment.day = this.datePipe.transform(appointment.day, 'EEEE');
          appointment.start_time = this.datePipe.transform(appointment.start_time, 'h:mm a');
          appointment.end_time = this.datePipe.transform(appointment.end_time, 'h:mm a');
          return appointment;
        });
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

}
