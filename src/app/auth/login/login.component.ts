import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SessionService } from 'src/app/core/services/session.service';
import { loadSessionActive } from 'src/app/core/state/session.actions';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/users';

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
    private sessionService: SessionService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private storeSession: Store<Session>
  ) {}
  ngOnInit(): void {}
  loginUser() {
    this.loading = true;

    this.sessionService
      .login(this.loginForm.value)
      .subscribe((usuario: User) => {
        if (usuario) {
          this.storeSession.dispatch(
            loadSessionActive({ currentUser: usuario })
          );
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
