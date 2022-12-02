import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { UsersService } from '../services/users.service';
import { User } from 'src/app/models/users';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      concatMap(() =>
        this.usersService
          .GetAllUsers()
          .pipe(
            map((data: User[]) =>
              UsersActions.loadUsersSuccess({ users: data })
            )
          )
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUser),
      concatMap(({ user }) =>
        this.usersService
          .AddUser(user)
          .pipe(map((data: User) => UsersActions.loadUsers()))
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      concatMap(({ user }) =>
        this.usersService
          .UpdatedUser(user)
          .pipe(map((data: User) => UsersActions.loadUsers()))
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      concatMap(({ user }) =>
        this.usersService
          .DeletedUser(user)
          .pipe(map((data: User) => UsersActions.loadUsers()))
      )
    );
  });

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
