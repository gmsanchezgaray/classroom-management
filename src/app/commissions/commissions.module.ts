import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionsService } from './services/commissions.service';
import { CommissionRoutingModule } from './commission-routing.module';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { CommissionsListComponent } from './components/commissions-list/commissions-list.component';
import { NewCommissionComponent } from './components/new-commission/new-commission.component';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    CommissionsComponent,
    CommissionsListComponent,
    NewCommissionComponent,
  ],
  imports: [
    CommonModule,
    CommissionRoutingModule,
    MaterialModule,
    DirectivesModule,
  ],
  providers: [CommissionsService],
})
export class CommissionsModule {}
