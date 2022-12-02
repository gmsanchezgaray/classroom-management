import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from './services/users.service';

import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './components/users/users.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { reducer, usersFeatureKey } from './state/users.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/users.effects';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [UsersComponent, NewUserComponent, UsersListComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    PipesModule,
    CoreModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usersFeatureKey, reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
