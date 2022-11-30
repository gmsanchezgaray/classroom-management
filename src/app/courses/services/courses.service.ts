import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses$: Observable<Course[]>;

  constructor(private http: HttpClient) {
    this.courses$ = this.GetAllCourses();
  }

  GetAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('api/courses');
  }

  AddCourse(course: Course): Observable<Course> {
    return this.http.post<Course>('api/courses', course);
  }

  GetCourseById(id: string): Observable<Course> {
    const url = `api/courses/${id}`;
    return this.http.get<Course>(url);
  }

  UpdateCourse(course: Course): Observable<Course> {
    return this.http.patch<Course>(`api/courses/${course.id}`, course);
  }

  DeleteCourse(course: Course) {
    return this.http.delete<Course>(`api/courses/${course.id}`);
  }
}
