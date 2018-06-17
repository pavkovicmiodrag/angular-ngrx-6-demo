import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PatientComponent } from './patient.component';
import { FilterTextboxComponent } from './filterTextbox.component';
import {PatientRoutingModule} from './patient-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {PatientListComponent} from './patient-list-view/patient-list-view.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {PatientFormComponent} from './patient-form/patient-form.component';
import {DataTableModule} from '../data-table';
import {PatientPageComponent} from './patient-page/patient-page.component';
import {PatientListOrCardComponent} from './patient-list-or-card/patient-list-or-card.component';
import {PatientCardComponent} from './patient-card-view/patient-card-view.component';
@NgModule({
    imports: [ SharedModule.forRoot(), PatientRoutingModule, DataTableModule],
    declarations: [
        PatientComponent,
        PatientListComponent,
        PatientCardComponent,
        PatientListOrCardComponent,
        PatientDetailComponent,
        PatientFormComponent,
        FilterTextboxComponent,
        PatientPageComponent,
    ],
  exports: [
    // PatientComponent,
    // PatientListComponent,
    // PatientDetailComponent,
    // PatientFormComponent,
    // PatientPageComponent,
    // PatientListOrCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientModule {
}
