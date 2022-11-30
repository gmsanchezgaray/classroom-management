import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { Commission } from '../../../models/commission';
import { CommissionsService } from '../../services/commissions.service';

@Component({
  selector: 'app-commissions-list',
  templateUrl: './commissions-list.component.html',
  styleUrls: ['./commissions-list.component.scss'],
})
export class CommissionsListComponent implements OnInit {
  displayedColumns: string[] = [
    'students',
    'enrolled course id',
    'course name',
    'enrollment date',
    'registration manager id',
    'actions',
  ];

  commissions$!: Observable<Commission[]>;
  courses$: Course[] = [];
  constructor(
    private commissionsService: CommissionsService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.commissions$ = this.commissionsService.commissions$;
    this.coursesService
      .GetAllCourses()
      .subscribe((courses: Course[]) => (this.courses$ = courses));
  }

  deleteCommission(index: string) {
    this.commissionsService.DeleteCommission(index).then((resp) => {
      this._snackbar.open('Commision deleted successfully', '  ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      this.ngOnInit();
    });
  }
  viewCommission(index: string) {
    this.router.navigateByUrl(`/commissions/view/${index}`, {
      skipLocationChange: true,
    });
  }
  editCommission(index: string) {
    this.router.navigateByUrl(`/commissions/edit/${index}`, {
      skipLocationChange: true,
    });
  }
  addCommission() {
    this.router.navigateByUrl('/commissions/new');
  }

  showCourseName(index: string) {
    let result = this.courses$.find((element) => element.id === index);
    return result?.name;
  }
}
