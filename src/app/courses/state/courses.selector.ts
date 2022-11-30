import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from 'src/app/models/course.state';
import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CourseState>(
  fromCourses.coursesFeatureKey
);

export const selectCourses = createSelector(
  selectCoursesState,
  (state: CourseState) => state.courses
);

export const selectStateLoading = createSelector(
  selectCoursesState,
  (state: CourseState) => state.loading
);
