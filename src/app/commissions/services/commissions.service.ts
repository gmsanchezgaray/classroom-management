import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commission } from '../../models/commission';

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

  AddCommission(commission: Commission): Observable<Commission> {
    return this.http.post<Commission>('api/commissions', commission);
  }

  GetCommissionById(id: string): Observable<Commission> {
    const url = `api/commissions/${id}`;
    return this.http.get<Commission>(url);
  }

  UpdateCommission(commission: Commission): Observable<Commission> {
    return this.http.patch<Commission>(
      `api/commissions/${commission.id}`,
      commission
    );
  }

  DeleteCommission(commission: Commission): Observable<Commission> {
    return this.http.delete<Commission>(`api/commissions/${commission.id}`);
  }
}
