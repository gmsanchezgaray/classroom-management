import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course';

export const loadCourses = createAction('[Courses] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ course: Course }>()
);

export const addCourse = createAction(
  '[Courses] Add Course',
  props<{ course: Course }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ course: Course }>()
);
