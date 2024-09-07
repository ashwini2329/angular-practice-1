import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'students', component: StudentComponent},
  {path: 'employees', component: EmployeesComponent}
];
