import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../interfaces/students';
import { StudentsService } from '../../services/students.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.students$ = this.studentsService.students$;
  }

  ngOnInit(): void {}
  deleteStudent(index: string) {
    console.log(index);
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
