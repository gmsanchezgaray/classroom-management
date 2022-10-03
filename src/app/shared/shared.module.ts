import { NgModule } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [NavbarComponent, SidebarComponent, TableComponent, FormComponent],
})
export class SharedModule {}
