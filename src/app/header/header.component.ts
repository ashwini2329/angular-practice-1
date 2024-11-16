import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../services/auth-service.service';
import { DialogComponent } from "../shared/dialog/dialog.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, DialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  showDialog = false;
  constructor(private router: Router, private authService: AuthServiceService) {}

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Check login status
  }

  login() {
    this.router.navigate(['/user'])
  }

  logout() {
    this.authService.logout();
  }

  confirmLogout() {
    this.showDialog = true;
  }

  handleLogout(choice: boolean) {
    if (choice) {
      this.logout();
      this.showDialog = false;
    } else {
      this.showDialog = false;
    }
  }
}
