import { createReducer, on } from '@ngrx/store';
import { StudentState } from 'src/app/models/student.state';
import * as StudentsActions from './students.actions';

export const studentsFeatureKey = 'students';

export const initialState: StudentState = {
  loading: false,
  students: [],
};

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => {
    return { ...state, loading: true };
  }),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) => {
    return { ...state, loading: false, students };
  }),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => {
    return state;
  }),
  on(StudentsActions.deleteStudent, (state, { student }) => {
    return state;
  }),
  on(StudentsActions.addStudent, (state, { student }) => {
    return state;
  }),
  on(StudentsActions.updateStudent, (state, { student }) => {
    return state;
  })
);
