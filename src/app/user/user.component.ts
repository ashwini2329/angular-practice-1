import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
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
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
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
  }

  handleUserSignup() {
    console.log(this.signupForm.value);
    console.log('Signup form data received');
  }

  toggleForm() {
    this.alreadyUser = !this.alreadyUser; // Toggles between login and signup
  }
}
