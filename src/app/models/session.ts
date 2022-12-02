import { LoginForm } from './login-form';

export interface Session {
  sessionActive: boolean;
  userInfo?: LoginForm | null;
}
