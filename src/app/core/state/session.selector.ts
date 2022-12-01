import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Session } from 'src/app/models/session';
import * as fromSession from './session.reducer';

export const selectSessionState = createFeatureSelector<Session>(
  fromSession.sessionFeatureKey
);

export const selectSessionActive = createSelector(
  selectSessionState,
  (state) => state
);
