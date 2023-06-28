import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vet-schedule',
  templateUrl: './vet-schedule.component.html',
  styleUrls: ['./vet-schedule.component.css'],
})
export class VetScheduleComponent {
  picker:any;
  vetSchedule:any;
  selectedDate:any;
  filter:any=
  {
    // Change with the vet_id from the token
    vet_id:'649083094a2f463c76c5153b',
    day:this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }
  constructor(private _VetBooking: VetBookingService,private datePipe: DatePipe) {

  }
  ngOnInit() {
    this.getVetData();
  }


  getVetData() {
    this._VetBooking.getVetSchedule(this.filter).subscribe(
      (data: any) => {
        this.vetSchedule = data;
      },
      (error: any) => {
        console.error(error);
      }
      );
    }

    pickDay($event:any)
    {
      let date=this.datePipe.transform($event.target.value, 'yyyy-MM-dd');
      this.filter={
        vet_id:'649083094a2f463c76c5153b',
        day:date,
      }
      this.getVetData();
    }

    deleteBooking(id:any)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this._VetBooking.deleteVetBooking(id).subscribe((data:any)=>
          {
            this.vetSchedule=this.vetSchedule.filter((element:any)=>element._id != id);
            console.log(data)
          },(error:any)=>
          {
            console.log(error)
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
}
