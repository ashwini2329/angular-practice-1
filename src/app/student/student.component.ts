import { Component, OnInit } from '@angular/core';
import { AppServie } from '../app.service';
import { Observer, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { features } from 'process';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
  studentsData: any[] = [];
  studentForm: FormGroup;

  constructor(private appService: AppServie) {
    this.studentForm = new FormGroup({
      roll_no: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      class: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      fees: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getAllStudentsData();
  }

  getAllStudentsData() {
    const observer: Observer<any> = {
      next: (value: any) => {
        this.studentsData = value.students;
        console.log(this.studentsData)
      },
      error: (err: any) => {
        console.error('Error fetching student data:', err);
      },
      complete: () => {
        console.log('Student data fetched successfully');
      }
    };

    this.appService.getAllStudents()
      .pipe(
        catchError((err) => {
          console.error('Error fetching student data:', err);
          return of([]);
        })
      )
      .subscribe(observer);
  }
}
