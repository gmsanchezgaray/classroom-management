import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses$: Observable<Course[]>;

  constructor(private http: HttpClient) {
    this.courses$ = this.GetAllCourses();
  }

  GetAllCourses(): Observable<Course[]> {
    const url = 'api/courses';
    return this.http.get<Course[]>(url);
  }

  AddCourse(course: Course) {
    const url = 'api/courses';
    return new Promise((resolve, reject) => {
      this.http.post<Course>(url, course).subscribe(
        (resp) => {
          resolve(resp);
          this.GetAllCourses();
          this.courses$ = this.GetAllCourses();
          console.log(this.courses$);
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }

  GetCourseById(id: string): Observable<Course> {
    const url = `api/courses/${id}`;
    return this.http.get<Course>(url);
  }
}
