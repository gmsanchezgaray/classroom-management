import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as CommissionsActions from './commissions.actions';
import { CommissionsService } from '../services/commissions.service';
import { Commission } from 'src/app/models/commission';

@Injectable()
export class CommissionsEffects {
  loadCommissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionsActions.loadCommissions),
      concatMap(() =>
        this.commissionsService
          .GetAllCommissions()
          .pipe(
            map((data: Commission[]) =>
              CommissionsActions.loadCommissionsSuccess({ commissions: data })
            )
          )
      )
    );
  });

  addCommission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionsActions.addCommission),
      concatMap(({ commission }) =>
        this.commissionsService
          .AddCommission(commission)
          .pipe(map((data: Commission) => CommissionsActions.loadCommissions()))
      )
    );
  });

  updateCommission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionsActions.updateCommission),
      concatMap(({ commission }) =>
        this.commissionsService
          .UpdateCommission(commission)
          .pipe(map((data: Commission) => CommissionsActions.loadCommissions()))
      )
    );
  });

  deleteCommission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommissionsActions.deleteCommission),
      concatMap(({ commission }) =>
        this.commissionsService
          .DeleteCommission(commission)
          .pipe(map((data: Commission) => CommissionsActions.loadCommissions()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private commissionsService: CommissionsService
  ) {}
}
