import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PagesComponent, DashboardComponent],
  exports: [PagesComponent],
})
export class PagesModule {}
