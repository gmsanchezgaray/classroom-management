import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  //spiner
  loading: boolean = false;
  userSession: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  loginUser() {
    this.loading = true;
    this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/students');
  }
}
