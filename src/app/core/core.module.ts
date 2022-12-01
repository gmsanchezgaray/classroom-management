import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { reducer, sessionFeatureKey } from './state/session.reducer';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    StoreModule.forFeature(sessionFeatureKey, reducer),
  ],
  providers: [SessionService],
  exports: [ToolbarComponent],
})
export class CoreModule {}
