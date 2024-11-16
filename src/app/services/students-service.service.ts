import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteStudent } from '../shared/interfaces/deleteStudentInterface';
import { addStudent } from '../shared/interfaces/addStudentInterface';

@Injectable({
  providedIn: 'root'
})
export class StudentsServiceService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/getAllStudents`);
  }

  handleAddStudent(body: addStudent): Observable<any> {
    return this.http.post(`${this.apiUrl}/students/addStudent`, body)
  }

  handleDeleteStudent(body: deleteStudent): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/deleteStudent`, {body: body})
  }
}
