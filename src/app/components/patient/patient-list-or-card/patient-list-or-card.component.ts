import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {FormTemplateDirective, DetailTemplateDirective, CardTemplateDirective, ListTemplateDirective} from '../../../directives/form';
import {PatientService} from '../patient.service';
// import { DetailTemplateDirective } from '../../../directives/form';


@Component({
  selector: 'app-list-or-card-view',
  templateUrl: './patient-list-or-card.component.html'
})
export class PatientListOrCardComponent {
  selected: any;
  @Input() patient: any;
  @Input() items: any[] = [];
  @Input() view: 'list' | 'card' = 'list';
  // @Output() onSelectItemEvent = new EventEmitter<string>();
  // Read in our structural directives as TemplateRefs
  @ContentChild(CardTemplateDirective, {read: TemplateRef}) appCardTemplate;
  @ContentChild(ListTemplateDirective, {read: TemplateRef}) appListTemplate;

  constructor(private patientService: PatientService) { }

  changeView(view) {
    this.view = view;
  }
  onSelectItem($event) {
    console.log('On select item PatientListOrCardComponent', $event);
    this.selected = $event;
    // this.onSelectItemEvent.emit($event);
    this.patientService.selectPatient($event);
  }

}
