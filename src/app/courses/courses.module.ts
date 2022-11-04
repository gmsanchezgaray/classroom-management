import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesService } from './services/courses.service';

import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, NewCourseComponent, CoursesListComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    SharedModule,
    DirectivesModule,
  ],
  providers: [CoursesService],
})
export class CoursesModule {}
