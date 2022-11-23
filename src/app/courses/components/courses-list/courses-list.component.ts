import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../interfaces/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    "quantity's hours",
    "quantity's classes",
    "teacher's name",
    'actions',
  ];
  courses$!: Observable<Course[]>;
  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.courses$ = this.coursesService.courses$;
  }

  deleteCourse(index: string) {
    this.coursesService.DeleteCourse(index).then((resp) => {
      this._snackbar.open('Course deleted successfully', '  ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      this.ngOnInit();
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
