import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentComponent },
  { path: 'employees', component: EmployeesComponent }
];
