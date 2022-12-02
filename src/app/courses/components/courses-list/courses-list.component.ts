import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectSessionActive } from 'src/app/core/state/session.selector';
import { CourseState } from 'src/app/models/course.state';
import { Session } from 'src/app/models/session';
import { Course } from '../../../models/course';
import { CoursesService } from '../../services/courses.service';
import {
  deleteCourse,
  loadCourses,
  loadCoursesFailure,
  loadCoursesSuccess,
} from '../../state/courses.actions';
import {
  selectCourses,
  selectStateLoading,
} from '../../state/courses.selector';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    "quantity's hours",
    "quantity's classes",
    "teacher's name",
    'actions',
  ];

  courses$!: Observable<Course[]>;
  loading$!: Observable<boolean>;
  suscriptionCourses!: Subscription;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private storeCourses: Store<CourseState>,
    private storeSession: Store<Session>
  ) {
    this.storeCourses.dispatch(loadCourses());
  }

  ngOnInit(): void {
    this.loading$ = this.storeCourses.select(selectStateLoading);
    this.suscriptionCourses = this.coursesService.GetAllCourses().subscribe({
      next: (courses: Course[]) => {
        this.storeCourses.dispatch(loadCoursesSuccess({ courses }));
      },
      error: (error: any) => {
        this.storeCourses.dispatch(loadCoursesFailure(error));
        throw new Error(`An error was ocurred ${error}`);
      },
    });
    this.courses$ = this.storeCourses.select(selectCourses);
  }

  ngOnDestroy(): void {
    this.suscriptionCourses.unsubscribe();
  }

  deleteCourse(course: Course) {
    this.storeSession.select(selectSessionActive).subscribe((data: Session) => {
      if (
        data.userInfo?.type === 'admin' ||
        data.userInfo?.type === 'developer'
      ) {
        this.storeCourses.dispatch(deleteCourse({ course }));
        this._snackbar.open('Course deleted successfully', '  ', {
          panelClass: ['snackbar--success'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000,
        });
      } else {
        this._snackbar.open(
          'You do not have permissions to access this site',
          '  ',
          {
            panelClass: ['snackbar--warning'],
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 3000,
          }
        );
      }
    });
  }

  viewCourse(index: string) {
    this.router.navigateByUrl(`/courses/view/${index}`, {
      skipLocationChange: true,
    });
  }

  editCourse(index: string) {
    this.router.navigateByUrl(`/courses/edit/${index}`, {
      skipLocationChange: true,
    });
  }

  addCourse() {
    this.router.navigateByUrl('/courses/new');
  }
}
