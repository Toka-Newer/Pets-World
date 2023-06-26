import { PetsService } from './../../../../core/services/pet/pets.service';
import { Component, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { API_URL } from '../../../../core/services/environment/environment'
import { KeeperService } from 'src/app/core/services/user/keeper/keeperService/keeper.service';
import { KeeperAppointmentService } from 'src/app/core/services/user/keeper/keeperAppointment/keeper-appointment.service';
import { KeeperBookingService } from 'src/app/core/services/user/keeper/keeperBooking/keeper-booking.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-keeper-details',
  templateUrl: './keeper-details.component.html',
  styleUrls: ['./keeper-details.component.css']
})
export class KeeperDetailsComponent {
  isSticky = false;

  keeperData: any;
  keeperAppointments: any;
  pets: any;
  keeperBookingData: any;
  keeperImage: any;
  bookingFormGroup!: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private keeperService: KeeperService,
    private keeperAppointmentService: KeeperAppointmentService,
    private datePipe: DatePipe,
    private petsService: PetsService,
    private keeperBookingService: KeeperBookingService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getkeeperData("649794f8999ea0fe2cd3d9ef");
    this.getKeeperAppointments("649794f8999ea0fe2cd3d9ef");
    this.getPetsByOwnerId("648f9646bd39fe8c0527ee4f");
    // this.getKeeperBookingData("648f98130dcac62b73ca2f62");

    this.bookingFormGroup = this._formBuilder.group({
      pet: ['', Validators.required],
      appointment: ['', Validators.required],
    });
  }

  getkeeperData(id: string) {
    this.keeperService.getKeeperById(id).subscribe(
      (data: any) => {
        console.log(data)
        this.keeperData = data;
        this.keeperImage = `${API_URL}/${this.keeperData.owner_id.user_id.image}`;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getKeeperAppointments(id: string) {
    this.keeperAppointmentService.getKeeperAppointment(id).subscribe(
      (data: any) => {
        // this.keeperAppointments = data.map((appointment: any) => {
        //   appointment.day = this.datePipe.transform(appointment.day, 'EEEE');
        //   appointment.start_time = this.datePipe.transform(appointment.start_time, 'h:mm a');
        //   appointment.end_time = this.datePipe.transform(appointment.end_time, 'h:mm a');
        //   return appointment;
        // });
        // console.log(this.keeperAppointments);
        this.keeperAppointments = data;
        console.log(data)
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

  // getKeeperBookingData(id: string) {
  //   this.keeperBookingService.getBookingByVetId(id).subscribe(
  //     (data: any) => {
  //       this.keeperBookingData = data;
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
