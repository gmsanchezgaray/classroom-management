import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    return this.http.get<Student[]>(url).pipe(
      map((users: Student[]) => {
        return users.filter((user) => user.type === 'student');
      })
    );
  }

  AddStudent(student: Student) {
    const url = 'api/students';
    return new Promise((resolve, reject) => {
      this.http.post<Student>(url, student).subscribe(
        (resp) => {
          resolve(resp);
          this.GetAllStudents();
          this.students$ = this.GetAllStudents();
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }

  GetStudentById(id: string): Observable<Student> {
    const url = `api/students/${id}`;
    return this.http.get<Student>(url);
  }

  UpdateStudent(idStudent: string, object: Student) {
    const url = `api/students/${idStudent}`;
    let data = { ...object, idTema: idStudent };

    return new Promise((resolve, reject) => {
      this.http.patch<Student>(url, data).subscribe(
        (resp) => {
          resolve(resp);
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }

  DeleteStudent(id: string) {
    const url = `api/students/${id}`;
    return new Promise((resolve, reject) => {
      this.http.delete<Student>(url).subscribe(
        (resp) => {
          resolve(resp);
          this.GetAllStudents();
          this.students$ = this.GetAllStudents();
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }

  GetAllTeachers(): Observable<Student[]> {
    const url = 'api/students';
    return this.http.get<Student[]>(url).pipe(
      map((users: Student[]) => {
        return users.filter((user) => user.type === 'teacher');
      })
    );
  }
}
