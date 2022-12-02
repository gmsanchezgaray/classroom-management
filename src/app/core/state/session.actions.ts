import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/students';

export const loadSession = createAction('[Session] Load Session');

export const loadSessionActive = createAction(
  '[Session] Load Session Active',
  props<{ currentUser: Student }>()
);

export const deleteSession = createAction(
  '[Session] Delete Session Active',
  props<{ sessionActive: boolean }>()
);
