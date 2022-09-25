import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesComponent } from './pipes.component';
import { InitialLetersPipe } from './initialLeters.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [InitialLetersPipe],
  declarations: [PipesComponent, InitialLetersPipe],
})
export class PipesModule {}
