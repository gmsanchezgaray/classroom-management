import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  GetAllUsers(): Observable<[User]> {
    const url = 'api/students';
    return this.http.get<[User]>(url);
  }
}
