import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { Session } from 'src/app/models/session';
import { Store } from '@ngrx/store';
import { deleteSession } from '../../state/session.actions';
import { Router } from '@angular/router';
import { selectSessionActive } from '../../state/session.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  currentUser!: Session;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storeSession: Store<Session>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeSession
      .select(selectSessionActive)
      .subscribe((data) => (this.currentUser = data));
  }

  logout() {
    this.storeSession.dispatch(deleteSession({ sessionActive: false }));
    this.router.navigateByUrl('/login');
  }
}
