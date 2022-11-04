import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { NotPageFoundComponent } from './pages/not-page-found/not-page-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'commissions',
    loadChildren: () =>
      import('./commissions/commissions.module').then(
        (m) => m.CommissionsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
