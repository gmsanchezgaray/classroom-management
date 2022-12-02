import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/users';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { deleteUser, loadUsers } from '../../state/users.actions';
import { selectStateLoading, selectUsers } from '../../state/users.selector';
import { UserState } from 'src/app/models/user.state copy';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = [
    'fullname',
    'email',
    'gender',
    'birthdate',
    'admin',
    'actions',
  ];

  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  teachers$!: Observable<User[]>;

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private storeUsers: Store<UserState>
  ) {
    this.storeUsers.dispatch(loadUsers());
  }

  ngOnInit(): void {
    this.loading$ = this.storeUsers.select(selectStateLoading);
    this.users$ = this.storeUsers.select(selectUsers);
  }
  deleteUser(user: User) {
    this.storeUsers.dispatch(deleteUser({ user }));

    this._snackbar.open('User deleted successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }
  viewUser(index: string) {
    this.router.navigateByUrl(`/users/view/${index}`, {
      skipLocationChange: true,
    });
  }
  editUser(index: string) {
    this.router.navigateByUrl(`/users/edit/${index}`, {
      skipLocationChange: true,
    });
  }
  addUser() {
    this.router.navigateByUrl('/users/new');
  }
}
