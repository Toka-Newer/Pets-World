import { Component, OnInit } from '@angular/core';
import { VetService } from 'src/app/core/services/vet/vetService/vet.service';
import { Title } from '@angular/platform-browser';
import {Router} from "@angular/router";
import {Vet} from "../models/Vet";
@Component({
  selector: 'app-home',
  templateUrl: './vet-list.component.html',
  styleUrls: ['./vet-list.component.css'],
})

export class VetListComponent implements OnInit {

  vetsArray: any = [];

  constructor(public vetAPis: VetService,
              private router: Router,
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

  viewVet(vet: Vet) {
    console.log(vet)
    this.router.navigate(['vet', 'details', vet._id]);
  }
}
