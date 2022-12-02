import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoginForm } from 'src/app/models/login-form';
import { Session } from 'src/app/models/session';
import { User } from 'src/app/models/users';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sesionSubject!: BehaviorSubject<Session>;

  constructor(private http: HttpClient) {
    const session: Session = {
      sessionActive: false,
    };
    this.sesionSubject = new BehaviorSubject(session);
  }

  login(formGroup: LoginForm) {
    return this.http.get<User[]>('api/users').pipe(
      map((usuarios: User[]) => {
        return usuarios.filter(
          (user: User) =>
            user.email === formGroup.email &&
            user.password === formGroup.password
        )[0];
      })
    );
  }
}
