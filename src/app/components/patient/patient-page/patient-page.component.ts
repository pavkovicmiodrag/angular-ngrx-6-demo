import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import { FormTemplateDirective, DetailTemplateDirective } from '../../../directives/form';
// import { DetailTemplateDirective } from '../../../directives/form';


@Component({
  selector: 'app-form-or-detail-view',
  templateUrl: './form-or-detail-view.component.html'
})
export class PatientPageComponent {

  @Input() patient: any;
  @Input() items: any[] = [];
  @Input() mode: 'detail' | 'form' = 'detail';
  // Read in our structural directives as TemplateRefs
  @ContentChild(FormTemplateDirective, {read: TemplateRef}) appFormTemplate;
  @ContentChild(DetailTemplateDirective, {read: TemplateRef}) appDetailTemplate;
  modeChanged(event) {
    this.mode = event;
  }
}
