import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() {
    const sesion: Sesion = {
      sessionActive: false,
    };
    this.sesionSubject = new BehaviorSubject(sesion);
  }

  login(formGroup: LoginForm) {
    const sesion: Sesion = {
      sessionActive: true,
      userInfo: formGroup,
    };
    this.sesionSubject.next(sesion);
  }

  obtenerSesion(): Observable<Sesion> {
    return this.sesionSubject.asObservable();
  }
}
