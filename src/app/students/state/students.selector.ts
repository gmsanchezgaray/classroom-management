import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from 'src/app/models/student.state';
import * as fromStudents from './students.reducer';

export const selectStudentsState = createFeatureSelector<StudentState>(
  fromStudents.studentsFeatureKey
);

export const selectStudents = createSelector(
  selectStudentsState,
  (state: StudentState) => state.students
);

export const selectStateLoading = createSelector(
  selectStudentsState,
  (state: StudentState) => state.loading
);
