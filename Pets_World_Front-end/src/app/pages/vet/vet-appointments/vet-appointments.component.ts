import { Component, ViewChild,ElementRef } from '@angular/core';
import { VetAppointmentService } from 'src/app/core/services/vet/vetAppointment/vet-appointment.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vet-appointments',
  templateUrl: './vet-appointments.component.html',
  styleUrls: ['./vet-appointments.component.css']
})
export class VetAppointmentsComponent {
  appointmentFormGroup!: FormGroup;
  appointments:any;
  addAppointment:any;
  editAppointment:any;
  id="649c9deeae3f8709e1837942";
  clicked:boolean=false;
  modelStatus:any="Add";
  constructor(private _VetAppointments:VetAppointmentService,private datePipe:DatePipe,private _formBuilder: FormBuilder)
  {}

  ngOnInit()
  {
    this.getVetAppointments();
    this.appointmentFormGroup = this._formBuilder.group({
      id: [''],
      start_date: [''],
      end_date: [''],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      number_of_clients: [, [Validators.required, Validators.min(1),Validators.pattern('^[0-9]+')]],
    });
  }

  getVetAppointments()
  {
    this._VetAppointments.getVetAppointments(this.id).subscribe((data:any)=>
    {
      this.appointments = data.map((appointment: any) => {
        appointment.day = this.datePipe.transform(appointment.day, 'EEEE');
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
          this.appointments=this.appointments.filter((element:any)=>element._id != id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )},(error:any)=>
        {
          Swal.fire({
            title: 'Error!',
            text: `${error.error.message}`,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })

      }
    })
  }

  resetForm()
  {
    this.modelStatus="Add"
    // this.appointmentFormGroup.reset();
  }

  fillForm(appointment:any){
    this.modelStatus="Edit";
    this.appointmentFormGroup.patchValue({
      id:appointment._id,
      start_time: appointment.start_time,
      end_time: appointment.end_time,
      number_of_clients: appointment.number_of_clients,
      start_date: "2023-06-20",
      end_date: "2023-06-20",
    });
  }


  submitForm() {
    if(this.modelStatus== "Add")
    {
      this.submitAdd();
    }
    else
    {
      this.submitEdit();
    }
}

submitAdd()
{
  let start=this.datePipe.transform(this.appointmentFormGroup.value.start_date, 'yyyy-MM-dd');
      let end=this.datePipe.transform(this.appointmentFormGroup.value.end_date, 'yyyy-MM-dd');
        this.addAppointment = {
          number_of_clients:this.appointmentFormGroup.value.number_of_clients,
          start_date:start,
          end_date:end,
          start_time:this.appointmentFormGroup.value.start_time,
          end_time:this.appointmentFormGroup.value.end_time
        }
        this.clicked=true;
        console.log(this.addAppointment);
        this._VetAppointments.addVetAppointments(this.addAppointment,this.id).subscribe(
          (data: any) => {
            if(data.status == "201")
            {
              Swal.fire({
                title: 'Success!',
                text: 'Appointment done successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              }
              )
            }
            else
            {
              Swal.fire({
                title: 'Error!',
                text: `${data.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
              })
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
              confirmButtonText: 'OK'
            })
          }
        );
}

submitEdit()
{
  this.editAppointment = {
    id:this.appointmentFormGroup.value.id,
    number_of_clients:this.appointmentFormGroup.value.number_of_clients,
    start_time:this.appointmentFormGroup.value.start_time,
    end_time:this.appointmentFormGroup.value.end_time
  }
  this._VetAppointments.updateVetAppointment(this.editAppointment).subscribe(
    (data: any) => {
      if(data.status == "201")
      {
        Swal.fire({
          title: 'Success!',
          text: 'Appointment updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }
        )
        const model=document.getElementById("exampleModal");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      else
      {
        Swal.fire({
          title: 'Error!',
          text: `${data.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    },
    (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: `${error.error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  );
}
}

