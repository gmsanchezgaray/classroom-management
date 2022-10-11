import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        pathMatch: 'full',
      },
      {
        path: 'courses',
        component: CoursesComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
