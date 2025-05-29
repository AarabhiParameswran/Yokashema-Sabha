import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateComponent } from './state/state.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [{
    path: "",
    component: StateComponent,
    canActivate: [AuthGuard],
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
