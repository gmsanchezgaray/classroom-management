import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginForm } from 'src/app/models/login-form';
import { Session } from 'src/app/models/session';
import { Student } from 'src/app/models/students';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sesionSubject!: BehaviorSubject<Session>;

  constructor(private http: HttpClient, private router: Router) {
    const session: Session = {
      sessionActive: false,
    };
    this.sesionSubject = new BehaviorSubject(session);
  }

  login(formGroup: LoginForm) {
    return this.http.get<Student[]>('api/students').pipe(
      map((usuarios: Student[]) => {
        return usuarios.filter(
          (user: Student) =>
            user.email === formGroup.email &&
            user.password === formGroup.password
        )[0];
      })
    );
  }

  obtenerSesion(): Observable<Session> {
    return this.sesionSubject.asObservable();
  }
}
