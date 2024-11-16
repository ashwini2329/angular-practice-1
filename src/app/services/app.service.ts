import { HttpClient,  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080';

  handleUserSignup(body: { userId: string; email: string; password: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, body)
  }

  handleUserSignIn(body: { email: any; password: any; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signin`, body)
  }
}
