import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  students$: Observable<Student[]>;

  constructor(private http: HttpClient) {
    this.students$ = this.GetAllStudents();
  }

  GetAllStudents(): Observable<Student[]> {
    const url = 'api/students';
    return this.http.get<Student[]>(url);
  }

  AddStudent(course: Student) {
    const url = 'api/students';
    return new Promise((resolve, reject) => {
      this.http.post<Student>(url, course).subscribe(
        (resp) => {
          resolve(resp);
          this.GetAllStudents();
          this.students$ = this.GetAllStudents();
          console.log(this.students$);
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }
}
