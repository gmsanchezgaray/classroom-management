import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../../models/students';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  students$: Observable<Student[]>;

  constructor(private http: HttpClient) {
    this.students$ = this.GetAllStudents();
  }

  GetAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('api/users').pipe(
      map((users: Student[]) => {
        return users.filter((user) => user.type === 'student');
      })
    );
  }

  AddStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('api/users', student);
  }

  GetStudentById(id: string): Observable<Student> {
    const url = `api/users/${id}`;
    return this.http.get<Student>(url);
  }

  UpdateStudent(student: Student): Observable<Student> {
    return this.http.patch<Student>(`api/users/${student.id}`, student);
  }

  DeleteStudent(student: Student): Observable<Student> {
    return this.http.delete<Student>(`api/students/${student.id}`);
  }

  GetAllTeachers(): Observable<Student[]> {
    return this.http.get<Student[]>('api/users').pipe(
      map((users: Student[]) => {
        return users.filter((user) => user.type === 'teacher');
      })
    );
  }
}
