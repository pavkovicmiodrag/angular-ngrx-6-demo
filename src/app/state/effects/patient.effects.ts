import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/operator/do';
import { empty } from 'rxjs/observable/empty';
import * as PatientActions from '../actions/patient.actions';
import {PatientService} from '../../components/patient/patient.service';
import { of } from 'rxjs/observable/of';
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {DeleteConfirmDialogComponent} from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import {
  CreateFailureAction, CreateSuccessAction, DELETE_PATIENT_CONFIRMATION, DeleteAction, DeleteConfirmationAction,
  DeleteSuccessAction, LoadSuccessAction
} from '../actions/patient.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpError} from '../shared/actions/error';
import * as diagnoseActions from '../actions/diagnose.actions';

@Injectable()
export class PatientEffects {
  constructor(
    private patientService: PatientService,
    private actions$: Actions,
    private mdDialog: MatDialog,
  ) {console.log('PatientEffects');}


  @Effect()
  loadPatients$: Observable<Action> = this.actions$.ofType<PatientActions.LoadAction>(PatientActions.LOAD)

    .pipe(
      switchMap(() => this.patientService.findPatients()),
      map(Patients => new LoadSuccessAction(Patients))
    );

   @Effect()
   createPatient$ =  this.actions$
     .ofType<PatientActions.CreateAction>(PatientActions.CREATE)
     .map(action => action.payload)
     .mergeMap(Patient =>
         this.patientService.createPatient(Patient)
           .map(res => new CreateSuccessAction(res))
           .pipe(catchError((error: any) => of(new CreateFailureAction(error))))
     );


  @Effect()
  deletePatient$: Observable<Action> = this.actions$.ofType<DeleteAction>(PatientActions.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(Patient => this.patientService.deletePatient(Patient).pipe(retry(3))),
      map(Patient => new DeleteSuccessAction(Patient)),
      catchError((e: HttpErrorResponse) => Observable.of(new HttpError(e)))
    );
  @Effect()
  public removePatientConfirmDialogOpen$: Observable<Action> = this.actions$
    .ofType<DeleteConfirmationAction>(DELETE_PATIENT_CONFIRMATION)
    // .map(toPayload)
    .switchMap(payload => {
      console.log('removePatientConfirmDialogOpen$');
      this.mdDialog.open( DeleteConfirmDialogComponent, {
        data: payload
      });
      return empty();
    });

}
