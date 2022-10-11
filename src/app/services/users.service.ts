import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private utils: UtilsService) {}

  GetAllUsers(): Observable<[User]> {
    const url = 'api/students';
    return this.http.get<[User]>(url);
  }

  AddUser(user: User) {
    const id = this.utils.guid();
    const url = 'api/students';
    return new Promise((resolve, reject) => {
      this.http.post(url, { ...user, id }).subscribe(
        (resp) => {
          resolve(resp);
        },
        (error) => {
          reject(error.status);
        }
      );
    });
  }
}
