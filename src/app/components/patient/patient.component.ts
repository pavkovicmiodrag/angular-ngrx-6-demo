import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IPatient} from './patient.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as fromPatientActions from '../../state/actions/patient.actions';
import * as fromStore from '../../state/reducers';
import {Store} from '@ngrx/store';
import {PatientService} from './patient.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-patients',
  templateUrl: 'patient.component.html',
  styleUrls: ['patient.component.scss']
})

export class PatientComponent {
  isLoading$: Observable<boolean>;
  selected: IPatient;
  selectedPatient: IPatient;
  mode = 'detail';
  view = 'list';
  subscription:Subscription;
  constructor(private store: Store<fromStore.IState>, private patientService: PatientService) {}
  ngOnInit() {
    console.log('PatientComponent ngOnInit');
    this.subscription =  this.patientService.selectedPatient$.subscribe(selected => this.selectedPatient = selected);
  }
  onSelectItem($event) {
    this.selected = $event;
    // this.subscription =  this.patientService.selectedPatient$.subscribe(selected => this.selectedPatient = selected);
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
  changeView(view) {
    this.view = view;
  }
}


