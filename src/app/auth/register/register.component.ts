import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SessionService } from 'src/app/core/services/session.service';
import { UserState } from 'src/app/models/user.state copy';
import { User } from 'src/app/models/users';
import { UtilsService } from 'src/app/services/utils.service';
import { addUser } from 'src/app/users/state/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.max(100)]],
    surname: ['', [Validators.required, Validators.max(100)]],
    email: ['', Validators.required],
    password: ['', Validators.required],
    birthdate: ['', [Validators.required]],
    gender: ['', Validators.required],
  });

  userSession: any;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private utilsService: UtilsService,
    private storeUsers: Store<UserState>
  ) {}
  ngOnInit(): void {}
  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this._snackbar.open('You must complete the required fields', '  ', {
        panelClass: ['snackbar--warning'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      return;
    }

    const user: User = {
      id: this.utilsService.guid(),
      ...this.registerForm.value,
    };

    this.storeUsers.dispatch(addUser({ user }));
    this._snackbar.open('Usert created successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
    this.router.navigateByUrl('auth/login');
  }
}
