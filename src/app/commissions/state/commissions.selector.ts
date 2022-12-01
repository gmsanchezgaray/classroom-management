import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommissionState } from 'src/app/models/commission.state';
import * as fromCommissions from './commissions.reducer';

export const selectCommissionsState = createFeatureSelector<CommissionState>(
  fromCommissions.commissionsFeatureKey
);

export const selectCommissions = createSelector(
  selectCommissionsState,
  (state: CommissionState) => state.commissions
);

export const selectStateLoading = createSelector(
  selectCommissionsState,
  (state: CommissionState) => state.loading
);
