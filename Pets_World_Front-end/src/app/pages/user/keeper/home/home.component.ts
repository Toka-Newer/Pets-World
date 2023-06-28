import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IKeeper } from '../models/IKeerper';
import { KeeperService } from '../../../../core/services/user/keeper/keeperService/keeper.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  KeeperArray: IKeeper[] = [];
  constructor(private titleService: Title, public keeperApis: KeeperService) {
    this.titleService.setTitle('Keeper Home');
  }
  ngOnInit(): void {}
  getAllKeeper(): void {
    this.keeperApis.geAlltKeepers().subscribe((data) => {
      console.log(data);
    });
  }
}
