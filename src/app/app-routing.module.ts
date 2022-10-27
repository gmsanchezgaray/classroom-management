import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsRoutingModule } from './students/students-routing.module';

import { NotPageFoundComponent } from './pages/not-page-found/not-page-found.component';
import { CoursesRoutingModule } from './courses/courses-routing.module';
import { CommissionRoutingModule } from './commissions/commission-routing.module';

const routes: Routes = [
  {
    path: '**',
    component: NotPageFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StudentsRoutingModule,
    CoursesRoutingModule,
    CommissionRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
