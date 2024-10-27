import { Component, OnInit } from '@angular/core';
import { AppServie } from '../services/app.service';
import { Observer, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'

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

  /**
   * get All students
   */
  getAllStudentsData() {
    const observer: Observer<any> = {
      next: (value: any) => {
        this.studentsData = value.data;
        console.log(`studentsData - ${this.studentsData}`)
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

  /**
   * add new student
   */
  addStudent() {
    console.log(`add data successful ! ${this.studentForm.value}`)
    console.log(`form data received`);
    const studentFomData = {
      roll_no: this.studentForm.value.roll_no,
      name: this.studentForm.value.name,
      classCurrent: this.studentForm.value.class,
      fees: this.studentForm.value.fees,
      age: this.studentForm.value.age,
      address: this.studentForm.value.address
    }

    const observer: Observer<any> = {
      next: (value: any) => {
        console.log(`student added succcessfully - ${value}`)
      },
      error: (err: any) => {
        console.error('Error adding student data:', err);
      },
      complete: () => {
        console.log('Student data added successfully');
        this.studentForm.reset();
      }
    };

    this.appService.handleAddStudent(studentFomData)
      .pipe(
        catchError((err) => {
          console.error('Error fetching student data:', err);
          return of([]);
        })
      )
      .subscribe(observer);
  }
}
