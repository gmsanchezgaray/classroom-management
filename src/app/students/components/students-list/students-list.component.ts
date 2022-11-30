import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../../models/students';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { StudentState } from 'src/app/models/student.state';
import { deleteStudent, loadStudents } from '../../state/students.actions';
import {
  selectStateLoading,
  selectStudents,
} from '../../state/students.selector';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  displayedColumns: string[] = [
    'fullname',
    'email',
    'gender',
    'birthdate',
    'admin',
    'actions',
  ];

  students$!: Observable<Student[]>;
  loading$!: Observable<boolean>;
  teachers$!: Observable<Student[]>;

  constructor(
    private router: Router,
    private _snackbar: MatSnackBar,
    private storeStudents: Store<StudentState>
  ) {
    this.storeStudents.dispatch(loadStudents());
  }

  ngOnInit(): void {
    this.loading$ = this.storeStudents.select(selectStateLoading);
    this.students$ = this.storeStudents.select(selectStudents);
  }
  deleteStudent(student: Student) {
    this.storeStudents.dispatch(deleteStudent({ student }));

    this._snackbar.open('Student deleted successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
  }
  viewStudent(index: string) {
    this.router.navigateByUrl(`/students/view/${index}`, {
      skipLocationChange: true,
    });
  }
  editStudent(index: string) {
    this.router.navigateByUrl(`/students/edit/${index}`, {
      skipLocationChange: true,
    });
  }
  addStudent() {
    this.router.navigateByUrl('/students/new');
  }
}
