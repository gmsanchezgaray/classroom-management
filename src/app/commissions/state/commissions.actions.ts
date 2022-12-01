import { createAction, props } from '@ngrx/store';
import { Commission } from 'src/app/models/commission';

export const loadCommissions = createAction('[Commissions] Load Commissions');

export const loadCommissionsSuccess = createAction(
  '[Commissions] Load Commissions Success',
  props<{ commissions: Commission[] }>()
);

export const loadCommissionsFailure = createAction(
  '[Commissions] Load Commissions Failure',
  props<{ error: any }>()
);

export const deleteCommission = createAction(
  '[Commissions] Delete Commission',
  props<{ commission: Commission }>()
);

export const addCommission = createAction(
  '[Commissions] Add Commission',
  props<{ commission: Commission }>()
);

export const updateCommission = createAction(
  '[Commissions] Update Commission',
  props<{ commission: Commission }>()
);
