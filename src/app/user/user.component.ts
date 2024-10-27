import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, Observer, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  alreadyUser = true;
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required])
    })

    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
    })
  }

  ngOnInit(): void {}

  handleUserLogin() {
    console.log(this.loginForm.value);
    console.log('Login form data received');
    this.loginForm.reset();
  }

  handleUserSignup() {
    console.log(this.signupForm.value);
    const signupFormData = {
      name: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value
    }
    console.log(`Signup form data - ${signupFormData}`);
    // const observer: Observer<any> = {
    //   next: (value: any) => {
    //     console.log(`User registered succcessfully - ${value}`)
    //   },
    //   error: (err: any) => {
    //     console.error('Error registering User:', err);
    //   },
    //   complete: () => {
    //     console.log('User registered succcessfully -');
    //     this.signupForm.reset();
    //   }
    // };

    // this.userService.handleUserSignup(signupFormData)
    //   .pipe(
    //     catchError((err) => {
    //       console.error('Error fetching student data:', err);
    //       return of([]);
    //     })
    //   )
    //   .subscribe(observer);
  }

  toggleForm() {
    this.alreadyUser = !this.alreadyUser; // Toggles between login and signup
  }
}
