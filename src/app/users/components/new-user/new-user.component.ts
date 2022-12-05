import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { UserState } from 'src/app/models/user.state copy';
import { User } from 'src/app/models/users';
import { UtilsService } from 'src/app/services/utils.service';
import { UsersService } from '../../services/users.service';
import { addUser, updateUser } from '../../state/users.actions';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  public userForm!: FormGroup;
  tittle!: string;
  textButton!: string;
  buttonDisable: boolean = false;
  private _idUser: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private _snackbar: MatSnackBar,
    private utilsService: UtilsService,
    private storeUsers: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.max(100)]],
      surname: ['', [Validators.required, Validators.max(100)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: ['', [Validators.required]],
      gender: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.loadView();
  }

  back() {
    this.router.navigateByUrl('/users');
  }

  loadView() {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.usersService.GetUserById(id)))
        .subscribe(
          (user) => (
            this.userForm.patchValue(user),
            (this.tittle = 'Edit'),
            (this.textButton = 'Edit'),
            (this._idUser = user.id)
          )
        );
      return;
    }

    if (this.router.url.includes('view')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.usersService.GetUserById(id)))
        .subscribe((user) => {
          this.userForm.patchValue(user),
            (this.tittle = 'Consult'),
            this.userForm.disable(),
            (this.buttonDisable = true);
        });
      return;
    }
    if (this.router.url.includes('new')) {
      this.tittle = 'New';
      this.textButton = 'Save';
      return;
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this._snackbar.open('You must complete the required fields', '  ', {
        panelClass: ['snackbar--warning'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      return;
    }

    if (this._idUser !== '') {
      const user: User = {
        id: this._idUser,
        ...this.userForm.value,
      };

      this.storeUsers.dispatch(updateUser({ user }));
      this._snackbar.open('User updated successfully', '  ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      this.router.navigateByUrl('/users');
      return;
    }

    const user: User = {
      id: this.utilsService.guid(),
      ...this.userForm.value,
    };

    this.storeUsers.dispatch(addUser({ user }));
    this._snackbar.open('User created successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
    this.router.navigateByUrl('users');
  }
}
