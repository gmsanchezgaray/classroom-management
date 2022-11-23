import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { StudentsService } from '../../services/students.service';

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
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.max(100)]],
      surname: ['', [Validators.required, Validators.max(100)]],
      email: ['', Validators.max(100)],
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
          console.log(student);
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
      this.studentsService
        .UpdateStudent(this._idStudent, this.studentForm.value)
        .then(
          (resp: any) => {
            this._snackbar.open('Student updated successfully', '  ', {
              panelClass: ['snackbar--success'],
              verticalPosition: 'top',
              horizontalPosition: 'end',
              duration: 3000,
            });
            this.router.navigateByUrl('students');
          },
          (err) => {
            this._snackbar.open(`Could not update student: ${err}`, '  ', {
              panelClass: ['snackbar--error'],
              verticalPosition: 'top',
              horizontalPosition: 'end',
              duration: 3000,
            });
          }
        );
      return;
    }

    let data = { id: this.utilsService.guid(), ...this.studentForm.value };
    this.studentsService
      .AddStudent(data)
      .then((resp) => {
        this._snackbar.open('Student created successfully', '  ', {
          panelClass: ['snackbar--success'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000,
        });
        this.router.navigateByUrl('students');
      })
      .catch((err) => {
        this._snackbar.open(`Could not create student: ${err}`, '  ', {
          panelClass: ['snackbar--error'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
          duration: 3000,
        });
      });
  }
}
