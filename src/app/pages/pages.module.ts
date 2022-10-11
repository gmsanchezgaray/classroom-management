import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { PagesRoutingModule } from './pages-module.routing';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ManagementComponent } from './management/management.component';
import { CoursesComponent } from './courses/courses.component';
import { PagesComponent } from './pages.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementComponent,
    UsersComponent,
    CoursesComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    PagesRoutingModule,
    RouterModule,
    MaterialModule,
    DirectivesModule,
  ],
  exports: [DashboardComponent],
})
export class PagesModule {}
