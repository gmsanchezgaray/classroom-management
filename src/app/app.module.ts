import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { CommissionsModule } from './commissions/commissions.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StudentsModule,
    CoursesModule,
    CommissionsModule,
    PipesModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [PipesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
