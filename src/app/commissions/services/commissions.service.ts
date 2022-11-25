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
    this.commissions$ = this.GetAllCommissions();
  }

  GetAllCommissions(): Observable<Commission[]> {
    const url = 'api/commissions';
    return this.http.get<Commission[]>(url);
  }

  AddCommission(course: Commission) {
    const url = 'api/commissions';
    return new Promise((resolve, reject) => {
      this.http.post<Commission>(url, course).subscribe(
        (resp) => {
          resolve(resp);
          this.GetAllCommissions();
          this.commissions$ = this.GetAllCommissions();
          console.log(this.commissions$);
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }

  GetCommissionById(id: string): Observable<Commission> {
    const url = `api/commissions/${id}`;
    return this.http.get<Commission>(url);
  }

  UpdateCommission(idCommission: string, object: Commission) {
    const url = `api/commissions/${idCommission}`;
    let data = { ...object, idTema: idCommission };

    return new Promise((resolve, reject) => {
      this.http.patch<Commission>(url, data).subscribe(
        (resp) => {
          resolve(resp);
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }

  DeleteCommission(id: string) {
    const url = `api/commissions/${id}`;
    return new Promise((resolve, reject) => {
      this.http.delete<Commission>(url).subscribe(
        (resp) => {
          resolve(resp);
          this.GetAllCommissions();
          this.commissions$ = this.GetAllCommissions();
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }
}
