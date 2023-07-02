import { Component, OnInit } from '@angular/core';
import { VetService } from 'src/app/core/services/vet/vetService/vet.service';
import { Title } from '@angular/platform-browser';
import { IVET } from '../models/IVET';
@Component({
  selector: 'app-home',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css'],
})

export class VetListComponent implements OnInit {

  vetsArray: IVET[]=[];

  constructor(public vetAPis: VetService,
              private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Vets Home');
    this.getAllData()
  }

  getAllData(): void {
    this.vetAPis.getAllVets().subscribe((data: any)=>{
      this.vetsArray = data;
      console.log(data)
    })
  }
}
