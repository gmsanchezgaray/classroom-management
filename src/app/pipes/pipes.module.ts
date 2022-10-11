import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialLetersPipe } from './initialLeters.pipe';
import { FullnamePipe } from './fullname.pipe';
import { IsAdminPipe } from './is-admin.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [InitialLetersPipe, FullnamePipe, IsAdminPipe],
  declarations: [InitialLetersPipe, FullnamePipe, IsAdminPipe],
})
export class PipesModule {}
