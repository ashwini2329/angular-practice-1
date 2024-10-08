import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class AppServie {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080';

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students/getAllStudents`);
  }

  handleAddStudent(body: { roll_no: any; name: any; classCurrent: any; fees: any; age: any; address: any; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/students//addStudent`, body)
  }
}
