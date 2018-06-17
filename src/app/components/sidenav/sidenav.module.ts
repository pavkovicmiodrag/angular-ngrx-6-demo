import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {SidenavComponent} from './sidenav.component';

@NgModule({
  imports: [SharedModule.forRoot()],
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent
  ],
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SideNavModule {
}

