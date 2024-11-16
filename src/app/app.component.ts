import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { EmployeesComponent } from './employees/employees.component';
import { UserComponent } from './user/user.component';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    StudentComponent,
    EmployeesComponent,
    UserComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-practice-1';

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    const isLoggedIn = this.authService.autoLoginLogout();
    if(isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/user']);
    }
  }
}
