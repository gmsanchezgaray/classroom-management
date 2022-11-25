import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Student } from 'src/app/students/interfaces/students';

export interface LoginForm {
  email: string;
  password: string;
}

export interface Sesion {
  sessionActive: boolean;
  userInfo?: LoginForm;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $users: any;
  sesionSubject!: BehaviorSubject<Sesion>;

  constructor(private http: HttpClient) {
    const sesion: Sesion = {
      sessionActive: false,
    };
    this.sesionSubject = new BehaviorSubject(sesion);
  }

  login(formGroup: LoginForm) {
    // login(formGroup: LoginForm): Observable<Student> {
    const sesion: Sesion = {
      sessionActive: true,
      userInfo: formGroup,
    };
    this.sesionSubject.next(sesion);
    // return this.http.get<Student[]>('.api/students').pipe(
    //   map((usuarios: Student[]) => {
    //     //TODO Agregar password a los usuarios
    //     return usuarios.filter((user: Student) => user.email === formGroup.email && user.password===formGroup.password)[0]
    // }));
  }

  obtenerSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }
}
