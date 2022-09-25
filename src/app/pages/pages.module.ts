import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PagesComponent, DashboardComponent],
  imports: [CommonModule, PipesModule, FormsModule],
  exports: [PagesComponent],
})
export class PagesModule {}
