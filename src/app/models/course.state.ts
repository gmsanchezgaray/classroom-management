import { Course } from './course';

export interface CourseState {
  courses: Course[];
  loading: boolean;
}
