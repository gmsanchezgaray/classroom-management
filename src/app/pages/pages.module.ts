import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { PagesRoutingModule } from './pages-module.routing';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';
import { PagesComponent } from './pages.component';
import { DirectivesModule } from '../directives/directives.module';
import { DialogUserComponent } from './users/dialog-user/dialog-user.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    CoursesComponent,
    PagesComponent,
    DialogUserComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    PagesRoutingModule,
    RouterModule,
    MaterialModule,
    DirectivesModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  exports: [DashboardComponent],
})
export class PagesModule {}
