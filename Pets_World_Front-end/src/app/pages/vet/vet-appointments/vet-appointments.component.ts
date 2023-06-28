import { Component } from '@angular/core';
import { VetAppointmentService } from 'src/app/core/services/vet/vetAppointment/vet-appointment.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vet-appointments',
  templateUrl: './vet-appointments.component.html',
  styleUrls: ['./vet-appointments.component.css']
})
export class VetAppointmentsComponent {
  Appointments:any;
  id="649083094a2f463c76c5153b";
  constructor(private _VetAppointments:VetAppointmentService,private datePipe:DatePipe)
  {}

  ngOnInit()
  {
    this.getVetAppointments();
  }

  getVetAppointments()
  {
    this._VetAppointments.getVetAppointments(this.id).subscribe((data:any)=>
    {
      this.Appointments = data.map((appointment: any) => {
        appointment.day = this.datePipe.transform(appointment.day, 'EEEE');
        appointment.start_time = this.datePipe.transform(appointment.start_time, 'h:mm a');
        appointment.end_time = this.datePipe.transform(appointment.end_time, 'h:mm a');
        return appointment;
    })},(error)=>
    {
      console.log(error);
    })
  }


  deleteVetAppointment(id:any)
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
        this._VetAppointments.deleteVetAppointment(id).subscribe((data:any)=>
        {
          this.Appointments=this.Appointments.filter((element:any)=>element._id != id);
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
