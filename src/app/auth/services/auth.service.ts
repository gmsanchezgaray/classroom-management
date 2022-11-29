import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Student } from 'src/app/students/interfaces/students';
import { LoginForm } from '../interfaces/login-form';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $users: any;
  sesionSubject!: BehaviorSubject<Session>;

  constructor(private http: HttpClient) {
    const sesion: Session = {
      sessionActive: false,
    };
    this.sesionSubject = new BehaviorSubject(sesion);
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
