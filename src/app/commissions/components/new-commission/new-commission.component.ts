import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Course } from 'src/app/models/course';
import { UtilsService } from 'src/app/services/utils.service';
import { Student } from 'src/app/models/students';
import { CommissionsService } from '../../services/commissions.service';
import {
  addCommission,
  updateCommission,
} from '../../state/commissions.actions';
import { Store } from '@ngrx/store';
import { CommissionState } from 'src/app/models/commission.state';
import { Commission } from 'src/app/models/commission';
import { CourseState } from 'src/app/models/course.state';
import { Session } from 'src/app/models/session';
import { selectCourses } from 'src/app/courses/state/courses.selector';
import { selectSessionActive } from 'src/app/core/state/session.selector';
import { StudentState } from 'src/app/models/student.state';
import { selectStudents } from 'src/app/students/state/students.selector';

@Component({
  selector: 'app-new-commission',
  templateUrl: './new-commission.component.html',
  styleUrls: ['./new-commission.component.scss'],
})
export class NewCommissionComponent implements OnInit {
  public commissionForm!: FormGroup;
  public tittle!: string;
  public textButton!: string;
  public buttonDisable: boolean = false;
  public studentsEnrrolled: string[] = [];
  public indexSelected: string = '';

  students$: Student[] = [];
  courses$: Course[] = [];
  private _idCommission: string = '';
  currentUser!: Session;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commissionsService: CommissionsService,
    private _snackbar: MatSnackBar,
    private utilsService: UtilsService,
    private storeCommissions: Store<CommissionState>,
    private storeCourses: Store<CourseState>,
    private storeSession: Store<Session>,
    private storeStudents: Store<StudentState>
  ) {}

  ngOnInit(): void {
    this.commissionForm = this.fb.group({
      registration_manager: ['', []],
      enrollment_date: ['', [Validators.required]],
      enrolled_course_id: ['', [Validators.required]],
    });

    this.loadView();

    this.storeCourses
      .select(selectCourses)
      .subscribe((data) => (this.courses$ = data));
    this.storeStudents
      .select(selectStudents)
      .subscribe((data) => (this.students$ = data));
    this.storeSession
      .select(selectSessionActive)
      .subscribe((data) => (this.currentUser = data));
  }

  back() {
    this.router.navigateByUrl('/commissions');
  }

  transformValueName(id: string) {
    let result = this.students$.find((element) => element.id === id);
    return `${result?.name} ${result?.surname}`;
  }

  loadView() {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.commissionsService.GetCommissionById(id))
        )
        .subscribe(
          (commission) => (
            this.commissionForm.patchValue(commission),
            (this.studentsEnrrolled = commission.students_id),
            (this.tittle = 'Edit'),
            (this.textButton = 'Edit'),
            (this._idCommission = commission.id)
          )
        );
      return;
    }

    if (this.router.url.includes('view')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.commissionsService.GetCommissionById(id))
        )
        .subscribe((commission) => {
          this.commissionForm.patchValue(commission),
            (this.studentsEnrrolled = commission.students_id),
            (this.tittle = 'Consult'),
            this.commissionForm.disable(),
            (this.buttonDisable = true);
        });
      return;
    }
    if (this.router.url.includes('new')) {
      this.tittle = 'New';
      this.textButton = 'Save';
      return;
    }
  }

  onSubmit() {
    if (this.commissionForm.invalid) {
      this.commissionForm.markAllAsTouched();
      this._snackbar.open('You must complete the required fields', '  ', {
        panelClass: ['snackbar--warning'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      return;
    }
    if (this.studentsEnrrolled.length === 0) {
      this._snackbar.open('The commission must have students', '  ', {
        panelClass: ['snackbar--warning'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      return;
    }
    if (this._idCommission !== '') {
      const commission: Commission = {
        id: this._idCommission,
        ...this.commissionForm.value,
        students_id: this.studentsEnrrolled,
        registration_manager: this.currentUser.userInfo?.id,
      };

      this.storeCommissions.dispatch(updateCommission({ commission }));
      this._snackbar.open('Commission updated successfully', '  ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      this.router.navigateByUrl('commissions');

      return;
    }

    const commission: Commission = {
      id: this.utilsService.guid(),
      ...this.commissionForm.value,
      students_id: this.studentsEnrrolled,
      registration_manager: this.currentUser.userInfo?.id,
    };

    this.storeCommissions.dispatch(addCommission({ commission }));

    this._snackbar.open('Commission created successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
    this.router.navigateByUrl('commissions');
  }

  // Actions for students enrrolled
  deleteStudentEnrrolled(index: string) {
    let result = this.studentsEnrrolled.filter((element) => element !== index);
    this.studentsEnrrolled = result;
  }

  addStudentEnrolled(index: string) {
    if (!this.studentsEnrrolled.includes(index))
      this.studentsEnrrolled.push(index);
    this.indexSelected = '';
  }
}
