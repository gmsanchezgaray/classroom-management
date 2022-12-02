export interface User {
  id: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  gender: string;
  birthdate: Date;
  type: string;
  isAdmin: boolean;
}
