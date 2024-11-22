import { HttpClient,  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SignUp } from "../shared/interfaces/signUpUser.interface";
import { SignIn } from "../shared/interfaces/signin.interface";
@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080';

  handleUserSignup(body: SignUp): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, body)
  }

  handleUserSignIn(body: SignIn): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signin`, body)
  }
}
