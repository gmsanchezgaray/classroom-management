import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialLetersPipe } from './initialLeters.pipe';
import { FullnamePipe } from './fullname.pipe';
import { IsAdminPipe } from './is-admin.pipe';
import { JoinPipe } from './join.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [InitialLetersPipe, FullnamePipe, IsAdminPipe, JoinPipe],
  declarations: [InitialLetersPipe, FullnamePipe, IsAdminPipe, JoinPipe],
})
export class PipesModule {}
