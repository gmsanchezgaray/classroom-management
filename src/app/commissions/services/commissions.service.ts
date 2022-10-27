import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commission } from '../interfaces/commission';

@Injectable({
  providedIn: 'root',
})
export class CommissionsService {
  commissions$: Observable<Commission[]>;

  constructor(private http: HttpClient) {
    this.commissions$ = this.GetAllCourses();
  }

  GetAllCourses(): Observable<Commission[]> {
    const url = 'api/commissions';
    return this.http.get<Commission[]>(url);
  }

  AddCourse(course: Commission) {
    const url = 'api/commissions';
    return new Promise((resolve, reject) => {
      this.http.post<Commission>(url, course).subscribe(
        (resp) => {
          resolve(resp);
          this.GetAllCourses();
          this.commissions$ = this.GetAllCourses();
          console.log(this.commissions$);
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }
}
