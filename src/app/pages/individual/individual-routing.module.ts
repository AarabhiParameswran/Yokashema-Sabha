import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualComponent } from './individual/individual.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
      path: "",
      component: IndividualComponent,
      canActivate: [AuthGuard],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualRoutingModule { }
