import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, Observer, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [AppService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  alreadyUser = true;
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private appService: AppService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
    })

    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
    })
  }

  ngOnInit(): void {}

  handleUserLogin() {
    console.log(this.loginForm.value);
    const observer: Observer<any> = {
      next: (value: any) => {
        console.log(`User Logged in succcessfully - ${value}`)
        if(value.token) {
          localStorage.setItem('token', value.token);
          this.router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        console.error('Error logging in User:', err);
      },
      complete: () => {
        console.log('User login completed succcessfully -');
        this.loginForm.reset();
      }
    };
    this.appService.handleUserSignIn({email: this.loginForm.value.email, password: this.loginForm.value.password})
      .pipe(
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      )
      .subscribe(observer)
  }

  handleUserSignup() {
    console.log(this.signupForm.value);
    const signupFormData = {
      userId: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value
    }
    console.log(`Signup form data - ${signupFormData}`);
    const observer: Observer<any> = {
      next: (value: any) => {
        console.log(`User registered succcessfully - ${value}`)
      },
      error: (err: any) => {
        console.error('Error registering User:', err);
      },
      complete: () => {
        console.log('User registered succcessfully -');
        this.signupForm.reset();
      }
    };

    this.appService.handleUserSignup(signupFormData)
      .pipe(
        catchError((err) => {
          console.error('Error signing up user:', err);
          return of([]);
        })
      )
      .subscribe(observer);
  }

  toggleForm() {
    this.alreadyUser = !this.alreadyUser;
  }
}
