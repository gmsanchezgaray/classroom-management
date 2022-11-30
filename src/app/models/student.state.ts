import { Student } from './students';

export interface StudentState {
  students: Student[];
  loading: boolean;
}
