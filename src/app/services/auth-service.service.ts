import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Return true if the token exists
  }
}
