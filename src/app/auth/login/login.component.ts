import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/session';
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
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  loginUser() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe((result) => {
      if (typeof result !== 'undefined') {
        const sesion: Session = {
          sessionActive: true,
          userInfo: result,
        };
        this.authService.sesionSubject.next(sesion);
        this.router.navigateByUrl('/students');
      } else {
        this._snackbar.open('Username or password is invalid', '  ', {
          panelClass: ['snackbar--error'],
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          duration: 3000,
        });
      }
      this.loading = false;
    });
  }
}
