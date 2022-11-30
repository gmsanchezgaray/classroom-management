import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { StudentState } from 'src/app/models/student.state';
import { Student } from 'src/app/models/students';
import { UtilsService } from 'src/app/services/utils.service';
import { StudentsService } from '../../services/students.service';
import { addStudent, updateStudent } from '../../state/students.actions';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  public studentForm!: FormGroup;
  tittle!: string;
  textButton!: string;
  buttonDisable: boolean = false;
  private _idStudent: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private _snackbar: MatSnackBar,
    private utilsService: UtilsService,
    private storeStudents: Store<StudentState>
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.max(100)]],
      surname: ['', [Validators.required, Validators.max(100)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: ['', [Validators.required]],
      gender: ['', Validators.required],
      type: ['', Validators.required],
      isAdmin: [false],
    });
    this.loadView();
  }

  back() {
    this.router.navigateByUrl('/students');
  }

  loadView() {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.studentsService.GetStudentById(id)))
        .subscribe(
          (student) => (
            this.studentForm.patchValue(student),
            (this.tittle = 'Edit'),
            (this.textButton = 'Edit'),
            (this._idStudent = student.id)
          )
        );
      return;
    }

    if (this.router.url.includes('view')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.studentsService.GetStudentById(id)))
        .subscribe((student) => {
          this.studentForm.patchValue(student),
            (this.tittle = 'Consult'),
            this.studentForm.disable(),
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
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this._snackbar.open('You must complete the required fields', '  ', {
        panelClass: ['snackbar--warning'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      return;
    }

    if (this._idStudent !== '') {
      const student: Student = {
        id: this._idStudent,
        ...this.studentForm.value,
      };

      this.storeStudents.dispatch(updateStudent({ student }));
      this._snackbar.open('Student updated successfully', '  ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      this.router.navigateByUrl('students');
      return;
    }

    const student: Student = {
      id: this.utilsService.guid(),
      ...this.studentForm.value,
    };

    this.storeStudents.dispatch(addStudent({ student }));
    this._snackbar.open('Student created successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
    this.router.navigateByUrl('students');
  }
}
