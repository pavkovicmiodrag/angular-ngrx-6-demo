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
import * as diagnoseActions from '../actions/diagnose.actions';
import {DiagnoseService} from '../../components/diagnose/diagnose.service';
import { of } from 'rxjs/observable/of';
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {DeleteConfirmDialogComponent} from '../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
import {
  CreateFailureAction, CreateSuccessAction, DELETE_DIAGNOSE_CONFIRMATION, DeleteAction, DeleteConfirmationAction,
  DeleteSuccessAction, LoadSuccessAction
} from '../actions/diagnose.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpError} from '../shared/actions/error';

@Injectable()
export class DiagnoseEffects {
  constructor(
    private diagnoseService: DiagnoseService,
    private actions$: Actions,
    private mdDialog: MatDialog,
  ) {console.log('DiagnoseEffects');}


  @Effect()
  loadDiagnoses$: Observable<Action> = this.actions$.ofType<diagnoseActions.LoadAction>(diagnoseActions.LOAD)

    .pipe(
      switchMap(() => this.diagnoseService.findDiagnoses()),
      map(diagnoses => new LoadSuccessAction(diagnoses))
    );

    // .ofType(diagnoseActions.LOAD)
    // .switchMap(() => {
    //   return this.diagnoseService.findDiagnoses()
    //     .mergeMap(diagnoses => [
    //       new diagnoseActions.LoadSuccessAction(diagnoses)
    //     ])
    //    // .catch(error => of(new providerActions.LoadFailureAction()));
    // });

   @Effect()
   createDiagnose$ =  this.actions$
     .ofType<diagnoseActions.CreateAction>(diagnoseActions.CREATE)
     .map(action => action.payload)
     .mergeMap(diagnose =>
         this.diagnoseService.createDiagnose(diagnose)
           .map(res => new CreateSuccessAction(res))
           .pipe(catchError((error: any) => of(new CreateFailureAction(error))))
     );


  @Effect()
  deleteDiagnose$: Observable<Action> = this.actions$.ofType<DeleteAction>(diagnoseActions.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(diagnose => this.diagnoseService.deleteDiagnose(diagnose).pipe(retry(3))),
      map(diagnose => new DeleteSuccessAction(diagnose)),
      catchError((e: HttpErrorResponse) => Observable.of(new HttpError(e)))
    );
  @Effect()
  public removeDiagnoseConfirmDialogOpen$: Observable<Action> = this.actions$
    .ofType<DeleteConfirmationAction>(DELETE_DIAGNOSE_CONFIRMATION)
    // .map(toPayload)
    .switchMap(payload => {
      console.log('removeDiagnoseConfirmDialogOpen$');
      this.mdDialog.open( DeleteConfirmDialogComponent, {
        data: payload
      });
      return empty();
    });

}
