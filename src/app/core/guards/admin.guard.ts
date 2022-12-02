import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Session } from 'src/app/models/session';
import { selectSessionActive } from '../state/session.selector';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private storeSession: Store<Session>,
    private _snackbar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.storeSession.select(selectSessionActive).pipe(
      map((session: Session) => {
        if (
          session.userInfo?.type === 'admin' ||
          session.userInfo?.type === 'develolper'
        ) {
          return true;
        } else {
          this._snackbar.open(
            'You do not have permissions to access this site',
            '  ',
            {
              panelClass: ['snackbar--warning'],
              verticalPosition: 'top',
              horizontalPosition: 'right',
              duration: 3000,
            }
          );
          return false;
        }
      })
    );
  }
}
