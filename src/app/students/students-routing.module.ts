import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from './components/students/students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { NewStudentComponent } from './components/new-student/new-student.component';

const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    children: [
      { path: '', component: StudentsListComponent },
      { path: 'view/:id', component: NewStudentComponent },
      {
        path: 'new',
        component: NewStudentComponent,
      },
      { path: 'edit/:id', component: NewStudentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
