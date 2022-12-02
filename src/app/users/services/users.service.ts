import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$: Observable<User[]>;

  constructor(private http: HttpClient) {
    this.users$ = this.GetAllUsers();
  }

  GetAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('api/users');
  }

  AddUser(user: User): Observable<User> {
    return this.http.post<User>('api/users', user);
  }

  GetUserById(id: string): Observable<User> {
    const url = `api/users/${id}`;
    return this.http.get<User>(url);
  }

  UpdatedUser(user: User): Observable<User> {
    return this.http.patch<User>(`api/users/${user.id}`, user);
  }

  DeletedUser(user: User): Observable<User> {
    return this.http.delete<User>(`api/users/${user.id}`);
  }
}
