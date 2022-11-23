import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../interfaces/students';
import { StudentsService } from '../../services/students.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {
    // this.students$ = this.studentsService.students$;
  }

  ngOnInit(): void {
    this.students$ = this.studentsService.students$;
  }
  deleteStudent(index: string) {
    this.studentsService.DeleteStudent(index).then((resp) => {
      this._snackbar.open('Student deleted successfully', '  ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      this.ngOnInit();
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
