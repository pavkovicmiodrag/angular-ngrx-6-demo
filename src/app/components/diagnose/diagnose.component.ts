import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {IDiagnose} from "./diagnose.model";
import * as  fromStore  from '../../state/reducers';
import * as fromActions from '../../state/actions/diagnose.actions';
import {DeleteConfirmDialogComponent} from "../../shared/delete-confirm-dialog/delete-confirm-dialog.component";
import {MatDialog} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-diagnoses',
  templateUrl: 'diagnose.component.html',
  styleUrls: ['diagnose.component.scss']
})
export class DiagnoseComponent {
  isLoading$: Observable<boolean>;
  diagnoses$: Observable<IDiagnose[]>;
  diagnoseForm: FormGroup;
  constructor(private store: Store<fromStore.IState>) {
    console.log("DiagnoseComponent *****************************************");
  };

  ngOnInit() {
    this.isLoading$ = this.store.select(fromStore.isDiagnoseLoading);
    console.log('Diagnoses :', this.isLoading$);
    this.diagnoses$ = this.store.select(fromStore.getAllDiagnoses);
    this.diagnoses$.subscribe(res =>
      console.log('Diagnoses************ :', res))
    this.store.dispatch(new fromActions.LoadAction());
    this.diagnoseForm = new FormGroup({
      diagnoseName: new FormControl('', Validators.required),
      diagnoseDescription: new FormControl()
    })
  }
  addDiagnose() {
    const formValues =  this.diagnoseForm.value;
    const json =  { id: 0, name: formValues.diagnoseName,
          description: formValues.diagnoseDescription
        };
    this.store.dispatch(new fromActions.CreateAction(json));
 }
  deleteDiagnose(diagnose: IDiagnose) {
    this.store.dispatch(new fromActions.DeleteConfirmationAction({ delete: new fromActions.DeleteAction( diagnose ),
          text: `Are you sure you want to remove the hero <em>${diagnose.name}</em> from the tour of diagnoses?`,
          title: "Remove Diagnose"}));
    console.log('deleteDiagnose');
    this.store.dispatch(new fromActions.LoadAction());
  }
}
