import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PagesComponent, DashboardComponent],
  imports: [CommonModule, PipesModule, FormsModule, SharedModule],
  exports: [PagesComponent],
})
export class PagesModule {}
