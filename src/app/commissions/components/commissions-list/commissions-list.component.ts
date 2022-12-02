import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Commission } from '../../../models/commission';
import { CommissionState } from 'src/app/models/commission.state';
import { Store } from '@ngrx/store';
import {
  deleteCommission,
  loadCommissions,
} from '../../state/commissions.actions';
import {
  selectCommissions,
  selectStateLoading,
} from '../../state/commissions.selector';
import { CourseState } from 'src/app/models/course.state';
import { selectCourses } from 'src/app/courses/state/courses.selector';
import { loadCourses } from 'src/app/courses/state/courses.actions';
import { Session } from 'src/app/models/session';
import { selectSessionActive } from 'src/app/core/state/session.selector';

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
  courses!: Course[];
  loading$!: Observable<boolean>;
  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private storeCommissions: Store<CommissionState>,
    private storeCourse: Store<CourseState>,
    private storeSession: Store<Session>
  ) {
    this.storeCommissions.dispatch(loadCommissions());
    this.storeCourse.dispatch(loadCourses());
  }

  ngOnInit(): void {
    this.commissions$ = this.storeCommissions.select(selectCommissions);
    this.storeCourse
      .select(selectCourses)
      .subscribe((data) => (this.courses = data));

    this.loading$ = this.storeCommissions.select(selectStateLoading);
  }

  deleteCommission(commission: Commission) {
    this.storeSession.select(selectSessionActive).subscribe((data: Session) => {
      if (
        data.userInfo?.type === 'admin' ||
        data.userInfo?.type === 'developer'
      ) {
        this.storeCommissions.dispatch(deleteCommission({ commission }));
        this._snackbar.open('Commision deleted successfully', '  ', {
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
    let result = this.courses.find((element) => element.id === index);
    return result?.name;
  }
}
