import { VetService } from './../../../core/services/vet/vetService/vet.service';
import { Component } from '@angular/core';
import { VetBookingService } from 'src/app/core/services/vet/vetBooking/vet-booking.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { API_URL } from '../../../core/services/environment/environment'

@Component({
  selector: 'app-vet-details',
  templateUrl: './vet-details.component.html',
  styleUrls: ['./vet-details.component.css'],
})
export class VetDetailsComponent {
  vetData: any;
  vetBookingData: any;
  vetImageData!: SafeUrl;
  constructor(private vetService: VetService, private vetBookingService: VetBookingService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getVetData("648dd6c55a2fb5c9b45df45b");
    this.getVetBookingData("648f98130dcac62b73ca2f62");

    // Sanitize and set the vetImageData with the updated image path
    this.vetImageData = this.sanitizer.bypassSecurityTrustUrl(this.convertImagePath(this.vetData.image));
  }

  convertImagePath(path: string): string {
    return path.replace(/\\/g, '/');
  }

  getVetData(id: string) {
    this.vetService.getVetById(id).subscribe(
      (data: any) => {
        this.vetData = data;
        console.log(data)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getVetBookingData(id: string) {
    this.vetBookingService.getBookingByVetId(id).subscribe(
      (data: any) => {
        this.vetBookingData = data;
        console.log(data)
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
