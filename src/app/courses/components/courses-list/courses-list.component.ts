import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
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
  courses$: Observable<Course[]>;
  constructor(
    private coursesService: CoursesService,
    private utilsService: UtilsService,
    private _snackBar: MatSnackBar
  ) {
    this.courses$ = this.coursesService.courses$;
    console.log(this.coursesService.courses$);
  }

  ngOnInit(): void {}

  // agregarUsuario() {
  //   let course: any = {
  //     id: this.utilsService.guid(),
  //     name: 'Bootstrap',
  //     days: ['Jueves', 'Viernes'],
  //     schedule: '16:30 a 18:30hs',
  //     status: true,
  //     commission: new Date().getTime(),
  //   };

  //   this.coursesService
  //     .AddCourse(course)
  //     .then((resp) => {
  //       if (resp) {
  //         this.courses$ = this.coursesService.GetAllCourses();
  //         this._snackBar.open('User added successfully', ' ', {
  //           panelClass: ['snackbar--success'],
  //           verticalPosition: 'top',
  //           horizontalPosition: 'end',
  //           duration: 3000,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       this._snackBar.open(`Something is wrong. ErrorCode: ${err}`, '  ', {
  //         panelClass: ['snackbar--error'],
  //         verticalPosition: 'top',
  //         horizontalPosition: 'end',
  //         duration: 3000,
  //       });
  //     });
  // }

  deleteCourse(index: string) {
    console.log(index);
  }
  viewCourse(index: string) {
    console.log(index);
  }
  editCourse(index: string) {
    console.log(index);
  }
  addCourse() {
    console.log('first');
  }
}
