import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Course } from 'src/app/courses/interfaces/course';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Student } from 'src/app/students/interfaces/students';
import { StudentsService } from 'src/app/students/services/students.service';
import { CommissionsService } from '../../services/commissions.service';

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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commissionsService: CommissionsService,
    private coursesService: CoursesService,
    private studentsServices: StudentsService,
    private _snackbar: MatSnackBar,
    private utilsService: UtilsService
  ) {}

  //TODO Obtener el valor de la session para poder asignar el registration_manager de la session activa
  ngOnInit(): void {
    this.commissionForm = this.fb.group({
      registration_manager: ['dasdasdasdsd', [Validators.required]],
      enrollment_date: ['', [Validators.required]],
      enrolled_course_id: ['', [Validators.required]],
    });
    this.loadView();
    this.coursesService
      .GetAllCourses()
      .subscribe((courses: Course[]) => (this.courses$ = courses));
    this.studentsServices
      .GetAllStudents()
      .subscribe((students: Student[]) => (this.students$ = students));
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
    if (this._idCommission) {
      let data = {
        ...this.commissionForm.value,
        students_id: this.studentsEnrrolled,
      };
      this.commissionsService.UpdateCommission(this._idCommission, data).then(
        (resp: any) => {
          this._snackbar.open('Commission updated successfully', '  ', {
            panelClass: ['snackbar--success'],
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000,
          });
          this.router.navigateByUrl('commissions');
        },
        (err) => {
          this._snackbar.open(`Could not update commission: ${err}`, '  ', {
            panelClass: ['snackbar--error'],
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000,
          });
        }
      );
      return;
    }

    let data = {
      id: this.utilsService.guid(),
      ...this.commissionForm.value,
      students_id: this.studentsEnrrolled,
    };

    this.commissionsService
      .AddCommission(data)
      .then((resp) => {
        this._snackbar.open('Commission created successfully', '  ', {
          panelClass: ['snackbar--success'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000,
        });
        this.router.navigateByUrl('commissions');
      })
      .catch((err) => {
        this._snackbar.open(`Could not create commission: ${err}`, '  ', {
          panelClass: ['snackbar--error'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000,
        });
      });
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
