import { Action, createReducer, on } from '@ngrx/store';
import { Session } from 'src/app/models/session';
import * as SessionActions from './session.actions';

export const sessionFeatureKey = 'session';

export const initialState: Session = {
  sessionActive: false,
};

export const reducer = createReducer(
  initialState,

  on(SessionActions.loadSession, (state) => state),
  on(SessionActions.loadSessionActive, (state, { currentUser }) => {
    return { ...state, sessionActive: true, userInfo: currentUser };
  }),
  on(SessionActions.deleteSession, (state, { sessionActive }) => {
    return { ...state, sessionActive, userInfo: null };
  })
);
