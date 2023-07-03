import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  role: any = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getTokenData();
    this.role = this.authService.role;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.role = changes['role'];
    console.log(this.role);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    window.location.reload();
  }
}
