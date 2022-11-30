import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CourseState } from 'src/app/models/course.state';
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
    private storeCourses: Store<CourseState>
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
        console.warn('An error was ocurred');
        this.storeCourses.dispatch(loadCoursesFailure(error));
      },
    });
    this.courses$ = this.storeCourses.select(selectCourses);
  }

  ngOnDestroy(): void {
    this.suscriptionCourses.unsubscribe();
  }

  deleteCourse(course: Course) {
    this.storeCourses.dispatch(deleteCourse({ course }));
    this._snackbar.open('Course deleted successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
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
