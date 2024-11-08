import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'students', component: StudentComponent, canActivate: [AuthGuard], },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], }
];
