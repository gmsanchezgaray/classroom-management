import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionsListComponent } from './components/commissions-list/commissions-list.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { NewCommissionComponent } from './components/new-commission/new-commission.component';

const routes: Routes = [
  {
    path: '',
    component: CommissionsComponent,
    children: [
      { path: '', component: CommissionsListComponent },
      { path: 'new', component: NewCommissionComponent },
      { path: 'view/:id', component: NewCommissionComponent },
      { path: 'edit/:id', component: NewCommissionComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommissionRoutingModule {}
