import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderDirective } from './header.directive';

@NgModule({
  declarations: [HeaderDirective],
  imports: [CommonModule],
  exports: [HeaderDirective],
})
export class DirectivesModule {}
