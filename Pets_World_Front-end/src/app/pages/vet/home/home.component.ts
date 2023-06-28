import { Component, OnInit } from '@angular/core';
import { VetService } from 'src/app/core/services/vet/vetService/vet.service';
import { Title } from '@angular/platform-browser';
import { IVET } from '../models/IVET';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  vetsArray: IVET[]=[];
  constructor(public vetAPis: VetService, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle('Vets Home');
    this.getAllData()
  }
  //function for get all data
  getAllData(): void {
    this.vetAPis.getAllVets().subscribe((data)=>{
      console.log(data);
    })  }
}
