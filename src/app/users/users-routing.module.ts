import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: UsersListComponent },
      { path: 'view/:id', component: NewUserComponent },
      {
        path: 'new',
        component: NewUserComponent,
        canActivate: [AdminGuard],
      },
      { path: 'edit/:id', component: NewUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
