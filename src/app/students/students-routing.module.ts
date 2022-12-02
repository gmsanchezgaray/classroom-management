import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from './components/students/students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: StudentsListComponent },
      { path: 'view/:id', component: NewStudentComponent },
      {
        path: 'new',
        component: NewStudentComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'edit/:id',
        component: NewStudentComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
