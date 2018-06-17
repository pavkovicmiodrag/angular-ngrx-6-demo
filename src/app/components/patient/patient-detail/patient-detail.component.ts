import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from '../patient.model';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromStore from '../../../state/reducers';
@Component({
    selector: 'app-patient-detail',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

    /* presentation component */
  @Input() patient: any;
  @Input() mode: any;
  @Output() modeChanged: EventEmitter<number> =   new EventEmitter();
  patient$: Observable<Patient>;

  constructor(
    private store: Store<fromStore.IState>,
    route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('PatientDetailComponent ngOnInit patient selected', this.patient);
  }

  addpatient() {
    console.log('add patient');
    this.mode = 'form';
    this.modeChanged.emit(this.mode);
  }
}
