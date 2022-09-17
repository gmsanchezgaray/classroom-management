import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, SidebarComponent],
})
export class SharedModule {}
