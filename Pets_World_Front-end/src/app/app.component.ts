import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Pets_World_Front-end';
  roleObservable: Observable<string> = this.authService.roleSubject.asObservable();
  role: any = '';

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.authService.getTokenData();
    this.role = this.authService.role
    this.roleObservable.subscribe(role => {
      this.role = role;
    })
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.role = changes['role'];
  //   console.log(this.role);
  // }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }
}
