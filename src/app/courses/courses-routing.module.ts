import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NewCourseComponent } from './components/new-course/new-course.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', component: CoursesListComponent },
      { path: 'view/:id', component: NewCourseComponent },
      {
        path: 'new',
        component: NewCourseComponent,
      },
      { path: 'edit/:id', component: NewCourseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
