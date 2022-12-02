import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NewCourseComponent } from './components/new-course/new-course.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: CoursesListComponent },
      { path: 'view/:id', component: NewCourseComponent },
      {
        path: 'new',
        component: NewCourseComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'edit/:id',
        component: NewCourseComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
