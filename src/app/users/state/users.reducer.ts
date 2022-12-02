import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/models/user.state copy';
import * as UsersActions from './users.actions';

export const usersFeatureKey = 'users';

export const initialState: UserState = {
  loading: false,
  users: [],
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(UsersActions.loadUsersSuccess, (state, { users }) => {
    return { ...state, loading: false, users };
  }),
  on(UsersActions.loadUsersFailure, (state, { error }) => {
    return state;
  }),
  on(UsersActions.deleteUser, (state, { user }) => {
    return state;
  }),
  on(UsersActions.addUser, (state, { user }) => {
    return state;
  }),
  on(UsersActions.updateUser, (state, { user }) => {
    return state;
  })
);
