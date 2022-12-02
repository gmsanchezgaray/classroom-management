import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/users';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ user: User }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);
