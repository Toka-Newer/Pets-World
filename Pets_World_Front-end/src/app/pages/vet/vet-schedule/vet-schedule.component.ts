import { Component, OnInit } from '@angular/core';
import { VetScheduleService } from 'src/app/core/services/vet/vetSchedule/vet-schedule.service';

@Component({
  selector: 'app-vet-schedule',
  templateUrl: './vet-schedule.component.html',
  styleUrls: ['./vet-schedule.component.css'],
})
export class VetScheduleComponent {
  vetSchedule:any;
  filter:any=
  {
    vet_id:'649083094a2f463c76c5153b',
    day:'2023-06-25'
  }
  constructor(private _vetSchedule: VetScheduleService) {

  }
  ngOnInit()
  {
    this.getVetData();
  }

  getVetData() {
    this._vetSchedule.getVetSchedule(this.filter).subscribe(
      (data: any) => {
        this.vetSchedule = data;
        console.log(this.vetSchedule);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
