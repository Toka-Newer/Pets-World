import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  roleObservable: Observable<string> =
    this.authService.roleSubject.asObservable();
  role: any = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getTokenData();
    this.role = this.authService.role;
    this.roleObservable.subscribe((role) => {
      this.role = role;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }
}
