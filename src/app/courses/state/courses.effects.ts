import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '../services/courses.service';
import { Course } from 'src/app/models/course';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        this.coursesService
          .GetAllCourses()
          .pipe(
            map((data: Course[]) =>
              CoursesActions.loadCoursesSuccess({ courses: data })
            )
          )
      )
    );
  });

  addCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.addCourse),
      concatMap(({ course }) =>
        this.coursesService
          .AddCourse(course)
          .pipe(map((data: Course) => CoursesActions.loadCourses()))
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      concatMap(({ course }) =>
        this.coursesService
          .UpdateCourse(course)
          .pipe(map((data: Course) => CoursesActions.loadCourses()))
      )
    );
  });

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap(({ course }) =>
        this.coursesService
          .DeleteCourse(course)
          .pipe(map((data: Course) => CoursesActions.loadCourses()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
