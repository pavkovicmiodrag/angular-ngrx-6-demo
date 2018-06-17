import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing';
@NgModule({
  imports: [SharedModule.forRoot(), DashboardRoutingModule],
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {
}
