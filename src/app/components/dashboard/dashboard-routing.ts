import {RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DashboardComponent }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
