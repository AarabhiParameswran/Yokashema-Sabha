import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: '', 
    loadChildren: () => import('./state/state.module').then(m => m.StateModule)
  },
  {
    path: 'about', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'user-mgmt', 
    loadChildren: () => import('./individual/individual.module').then(m => m.IndividualModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
