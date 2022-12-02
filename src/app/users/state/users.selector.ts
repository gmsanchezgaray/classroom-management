import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/models/user.state copy';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<UserState>(
  fromUsers.usersFeatureKey
);

export const selectUsers = createSelector(
  selectUsersState,
  (state: UserState) => state.users
);

export const selectStateLoading = createSelector(
  selectUsersState,
  (state: UserState) => state.loading
);
