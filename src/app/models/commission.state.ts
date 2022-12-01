import { Commission } from './commission';

export interface CommissionState {
  commissions: Commission[];
  loading: boolean;
}
