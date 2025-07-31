import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})

export class DashboardPage{
constructor(private auth: AuthService, private router: Router) {}
onLogout() {
this.auth.logout()
}
}