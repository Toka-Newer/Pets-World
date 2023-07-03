import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Keeper } from '../../keeper/models/Keeper';
import { KeeperService } from '../../../../core/services/user/keeper/keeperService/keeper.service';
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";
@Component({
  selector: 'app-home',
  templateUrl: './keeper-list.component.html',
  styleUrls: ['./keeper-list.component.css'],
})
export class KeeperListComponent implements OnInit {

  keepers: Keeper[] = [];
  pagedKeepers: Keeper[] = [];
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(private titleService: Title,
    private router: Router,
    public keeperApis: KeeperService) {
    this.titleService.setTitle('Keeper Home');
  }

  ngOnInit(): void {
    this.getAllKeeper();
  }

  getAllKeeper(): void {
    this.keeperApis.geAlltKeepers().subscribe((data) => {
      this.keepers = data as Keeper[];
      this.updatePagedVets();
    });
  }

  viewKeeper(keeper: any) {
    this.router.navigate(['user', 'keepers', 'details', keeper._id]);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagedVets();
  }

  updatePagedVets() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedKeepers = this.keepers?.slice(startIndex, endIndex);
  }
}
