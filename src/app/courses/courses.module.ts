import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesService } from './services/courses.service';

import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { coursesFeatureKey, reducer } from './state/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './state/courses.effects';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [CoursesComponent, NewCourseComponent, CoursesListComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    DirectivesModule,
    StoreModule.forFeature(coursesFeatureKey, reducer),
    EffectsModule.forFeature([CoursesEffects]),
  ],
  providers: [CoursesService],
})
export class CoursesModule {}
