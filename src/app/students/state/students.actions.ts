import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/students';

export const loadStudents = createAction('[Students] Load Students');

export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: Student[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: any }>()
);

export const deleteStudent = createAction(
  '[Students] Delete Student',
  props<{ student: Student }>()
);

export const addStudent = createAction(
  '[Students] Add Student',
  props<{ student: Student }>()
);

export const updateStudent = createAction(
  '[Students] Update Student',
  props<{ student: Student }>()
);
