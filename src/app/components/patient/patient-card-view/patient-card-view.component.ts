import {IPatient, Patient} from '../patient.model';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../../state/reducers';
import * as fromPatientActions from '../../../state/actions/patient.actions';
import {DataTableResource} from '../../data-table/tools/data-table-resource';
@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card-view.component.html',
  // styleUrls: ['./patient.component.css']
})
export class PatientCardComponent implements OnInit {
  isLoading$: Observable<boolean>;
  patients$: Observable<IPatient[]>;
  itemResource = new DataTableResource([]);
  items = [];
  itemCount = 0;
  @Output() onSelectItemEvent = new EventEmitter<string>();

  constructor(private store: Store<fromStore.IState>) {

  }

  reloadItems(params) {
   this.itemResource.query(params).then(items => this.items = items);
  }

  // special properties:

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.fullName);
    this.onSelectItemEvent.emit(rowEvent.row.item);
  }

  static rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }

  static rowTooltip(item) { return item.jobTitle; }


  ngOnInit() {
    this.isLoading$ = this.store.select(fromStore.isPatientsLoading);
    this.patients$ = this.store.select(fromStore.getAllPatients);
    // this.patients$.subscribe(result => {
    //   console.log('Log patients', result);
    //   this.itemResource = new DataTableResource(result as Patient[]);
    //   this.itemResource.count().then(count => this.itemCount = count);
    // });
    this.store.dispatch(new fromPatientActions.LoadAction());
    // console.log('patientComponent ngOnInit', this.itemResource);
  }

}
