import { createReducer, on } from '@ngrx/store';
import { CommissionState } from 'src/app/models/commission.state';
import * as CommissionsActions from './commissions.actions';

export const commissionsFeatureKey = 'commissions';

export const initialState: CommissionState = {
  loading: false,
  commissions: [],
};

export const reducer = createReducer(
  initialState,
  on(CommissionsActions.loadCommissions, (state) => {
    return { ...state, loading: true };
  }),
  on(CommissionsActions.loadCommissionsSuccess, (state, { commissions }) => {
    return { ...state, loading: false, commissions };
  }),
  on(CommissionsActions.loadCommissionsFailure, (state, { error }) => {
    return state;
  }),
  on(CommissionsActions.deleteCommission, (state, { commission }) => {
    return state;
  }),
  on(CommissionsActions.addCommission, (state, { commission }) => {
    return state;
  }),
  on(CommissionsActions.updateCommission, (state, { commission }) => {
    return state;
  })
);
