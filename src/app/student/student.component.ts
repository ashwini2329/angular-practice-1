import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { StudentsServiceService } from '../services/students-service.service';
import { DialogComponent } from "../shared/dialog/dialog.component";
import { deleteStudent } from '../shared/interfaces/deleteStudentInterface';
import { LoaderComponent } from "../shared/loader/loader.component";
@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogComponent, LoaderComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
  studentsData: any[] = [];
  studentForm: FormGroup;
  toggleStudent: any;
  isLoading = false;
  showDialog = false;
  selectedStudent: deleteStudent = { roll_no: 0, name: '' };
  deleteStudentsArray = [];

  constructor(private studentsService: StudentsServiceService) {
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
    this.toggleStudent = false;
    this.getAllStudentsData();
  }

  toggleStudentPage() {
    this.toggleStudent = !this.toggleStudent;
    this.studentForm.reset();
  }

  getAllStudentsData() {
    this.isLoading = true;
    const observer: Observer<any> = {
      next: (value: any) => {
        this.studentsData = value.data;
      },
      error: (err: any) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    };
    this.studentsService.getAllStudents()
      .subscribe(observer);
  }

  addStudent() {
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
      },
      error: (err: any) => {
      },
      complete: () => {
        this.studentForm.reset();
        this.getAllStudentsData();
        this.toggleStudent = !this.toggleStudent;
      }
    };
    this.studentsService.handleAddStudent(studentFomData)
      .subscribe(observer);
  }

  confirmDeleteStudent(student: deleteStudent): void {
    this.showDialog = !this.showDialog;
    this.selectedStudent.name = student.name;
    this.selectedStudent.roll_no = student.roll_no
  }

  handleDeleteStudent(choice: boolean) {
    if (choice) {
      this.showDialog = false;
      this.isLoading = true;
      const observer: Observer<any> = {
        next: (value: any) => {

        },
        error: (err: any) => {
          this.getAllStudentsData
        },
        complete: () => {
          this.getAllStudentsData()
        }
      };
      this.studentsService.handleDeleteStudent(this.selectedStudent)
        .subscribe(observer)
    } else {
      this.selectedStudent = {roll_no: 0, name: ''};
      this.showDialog = false;
    }
  }

}
