import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user'])
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return payload.exp * 1000 < Date.now(); // Compare expiry with current time
    } catch (e) {
      return true;
    }
  }

  autoLoginLogout(): boolean {
    const token = localStorage.getItem('token')
    if (token === null || this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }
}
