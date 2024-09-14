import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'any'
})

export class UserService {
  allowLinks = true;
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllowLinks() {
    return this.allowLinks;
  }

  handleUserSignup(body: any) {
    return this.http.post(`${this.apiUrl}/students//addStudent`, body)
  }
}
