import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as StudentsActions from './students.actions';
import { StudentsService } from '../services/students.service';
import { Student } from 'src/app/models/students';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      concatMap(() =>
        this.studentsService
          .GetAllStudents()
          .pipe(
            map((data: Student[]) =>
              StudentsActions.loadStudentsSuccess({ students: data })
            )
          )
      )
    );
  });

  addCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.addStudent),
      concatMap(({ student }) =>
        this.studentsService
          .AddStudent(student)
          .pipe(map((data: Student) => StudentsActions.loadStudents()))
      )
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      concatMap(({ student }) =>
        this.studentsService
          .UpdateStudent(student)
          .pipe(map((data: Student) => StudentsActions.loadStudents()))
      )
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      concatMap(({ student }) =>
        this.studentsService
          .DeleteStudent(student)
          .pipe(map((data: Student) => StudentsActions.loadStudents()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
  ) {}
}
