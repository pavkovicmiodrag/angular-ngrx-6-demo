import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DiagnoseComponent } from './diagnose.component';
import { FilterTextboxComponent } from './filterTextbox.component';
import { SharedModule } from '../../shared/shared.module';
import { DiagnoseRoutingModule } from './diagnose-routing.module';
@NgModule({
    imports: [SharedModule.forRoot(), DiagnoseRoutingModule],
    declarations: [
        DiagnoseComponent,
        FilterTextboxComponent,
    ],
    // providers: [DiagnoseBackendService],
    exports: [
        DiagnoseComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiagnoseModule {
}
