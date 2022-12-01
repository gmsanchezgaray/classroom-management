import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionsService } from './services/commissions.service';
import { CommissionRoutingModule } from './commission-routing.module';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { CommissionsListComponent } from './components/commissions-list/commissions-list.component';
import { NewCommissionComponent } from './components/new-commission/new-commission.component';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { commissionsFeatureKey, reducer } from './state/commissions.reducer';
import { CommissionsEffects } from './state/commissions.effects';
import { CoreModule } from '../core/core.module';

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
    CoreModule,
    DirectivesModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(commissionsFeatureKey, reducer),
    EffectsModule.forFeature([CommissionsEffects]),
  ],
  providers: [CommissionsService],
})
export class CommissionsModule {}
