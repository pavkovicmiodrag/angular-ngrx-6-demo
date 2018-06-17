import {
  NgModule,
  Component,
  Pipe,
  OnInit, Input, Output, EventEmitter
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import * as fromStore from '../../../state/reducers';
import * as fromActions from '../../../state/actions/patient.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  @Input() mode: any;
  @Output() modeChanged: EventEmitter<number> =   new EventEmitter();
  selectedValue: any;
  myform: FormGroup;
  constructor(private store: Store<fromStore.IState>) { }

  ngOnInit() {
    this.myform = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      middlename: new FormControl(),
      birthdate: new FormControl(),
      gender: new FormControl(),
      place: new FormControl(),
      address: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      mobilephone: new FormControl(),
      allergies: new FormControl(),
      notes: new FormControl()
    });
  }
  onSubmit() {
    console.log('Form Submitted!', this.myform.value);
    const item =  this.myform.value;
    const json =  { id: 0, firstname: item.firstname,
        lastname: item.lastname,
        middlename: item.middlename,
        birthdate: new Date(),
        place: item.place,
        address: item.address,
        gender: item.gender,
        email: item.email,
        phone: item.phone,
        mobilephone: item.mobilephone,
        allergies: item.allergies,
        notes: item.notes,
        photo: ''
      };
    console.log('Form Submitted!', json);
    if (this.myform.valid) {
      this.store.dispatch(new fromActions.CreateAction(json));
    }
  }

  cancel() {
    console.log('Cancel');
    this.mode = 'detail';
    this.modeChanged.emit(this.mode);
  }
}


