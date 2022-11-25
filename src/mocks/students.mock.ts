import { Student } from 'src/app/students/interfaces/students';

const mockStudents: Student[] = [
  {
    name: 'Gonzalo',
    surname: 'Sanchez',
    email: 'gonzaa.sanchezz@gmail.com',
    gender: 'Male',
    birthdate: new Date('1994-10-01'),
    type: 'student',
    id: '97393df6-89a7-b951-3a606379',
  },
  {
    name: 'Abner',
    surname: 'Garcia',
    email: 'agarcia@gmail.com',
    gender: 'Male',
    birthdate: new Date('1987-10-21'),
    type: 'student',
    id: 'b8a8e948-1915-3471-f644c0ce',
  },
  {
    name: 'Jose',
    surname: 'Hernandez',
    email: 'jhernandez@gmail.com',
    gender: 'Male',
    birthdate: new Date('1992-07-23'),
    type: 'student',
    id: '3639e7c8-16f9-ef7e-0a4da372',
  },
  {
    name: 'Melina',
    surname: 'Rosell',
    email: 'mrosell@gmail.com',
    gender: 'Female',
    birthdate: new Date('1990-04-13'),
    type: 'student',
    id: '8eb30fa9-2a5e-465a-b2f41ea4',
  },
  {
    name: 'Leona',
    surname: 'Hunt',
    email: 'lhunt@gmail.com',
    gender: 'Female',
    birthdate: new Date('1991-10-16'),
    type: 'student',
    id: '4c98aff2-72f2-a178-6a542cac',
  },
  {
    name: 'Laura',
    surname: 'Lynn',
    email: 'llynn@gmail.com',
    gender: 'Female',
    birthdate: new Date('1949-09-03'),
    type: 'student',
    id: '46ceca4a-227d-01ec-97eac9cc',
  },
  {
    name: 'Carlos',
    surname: 'Villarreal',
    email: 'cvillarreal@gmail.com',
    gender: 'Male',
    birthdate: new Date('1978-03-29'),
    type: 'student',
    id: '47c554be-42b1-7cbf-154a8828',
  },
  {
    name: 'Zachary',
    surname: 'Gomez',
    email: 'zgomez@gmail.com',
    gender: 'Other',
    birthdate: new Date('1999-07-01'),
    type: 'student',
    id: 'e48cab97-f04a-ef7c-64f47b6a',
  },
];

export { mockStudents };