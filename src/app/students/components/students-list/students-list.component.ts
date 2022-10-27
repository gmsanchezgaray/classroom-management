import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Student } from '../../interfaces/students';
import { StudentsService } from '../../services/students.service';
import { UtilsService } from 'src/app/services/utils.service';
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

  students$: Observable<Student[]>;
  constructor(
    private studentsService: StudentsService,
    private utilsService: UtilsService,
    private _snackBar: MatSnackBar
  ) {
    this.students$ = this.studentsService.students$;
  }

  ngOnInit(): void {}
  deleteStudent(index: string) {
    console.log(index);
  }
  viewStudent(index: string) {
    console.log(index);
  }
  editStudent(index: string) {
    console.log(index);
  }
  addStudent() {
    console.log('first');
  }
}
