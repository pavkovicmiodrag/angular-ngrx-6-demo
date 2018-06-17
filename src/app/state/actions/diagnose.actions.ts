import { Action } from '@ngrx/store';
import { IDiagnose } from "../../components/diagnose/diagnose.model";
export const LOAD = '[Diagnose] load';
export const LOAD_SUCCESS = '[Diagnose] load success';
export const LOAD_FAILURE = '[Diagnose] load failure';
export const GET_BY_COUNTRY_ID = '[Diagnose] Get by Id';
export const GET_BY_COUNTRY_ID_SUCCESS = '[Diagnose] Get by Id Success';
export const CREATE = '[Diagnose] Create';
export const CREATE_SUCCESS = '[Diagnose] Create Success';
export const CREATE_FAILURE = '[Diagnose] Create Failure';
export const DELETE = '[Diagnose] Delete';
export const DELETE_SUCCESS = '[Diagnose] Delete Success';
export const DELETE_FAILURE = '[Diagnose] Delete Failure';
export const DELETE_DIAGNOSE_CONFIRMATION = '[Diagnose] Delete Comfirmation';
export const DELETE_DIAGNOSE_CONFIRMATION_RESPONSE = '[Diagnose] Delete Comfirmation Response';
export class LoadAction implements Action {
  readonly type = LOAD;
}
export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: IDiagnose[]) {console.log('Diagnose LoadSuccessAction', payload)}
}
export class LoadFailureAction implements Action {
  readonly type = LOAD_FAILURE;
}
export class GetByCountryIdAction implements Action {
  readonly type = GET_BY_COUNTRY_ID;
  constructor(public payload: string) {}
}
export class GetByCountryIdSuccessAction implements Action {
  readonly type = GET_BY_COUNTRY_ID_SUCCESS;
  constructor(public payload: IDiagnose[]) {console.log('payload', payload)}
}
export class CreateAction implements Action {
  readonly type = CREATE;
  constructor(public payload: IDiagnose) {}
}
export class CreateSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: IDiagnose) {}
}
export class CreateFailureAction implements Action {
  readonly type = CREATE_FAILURE;

  constructor(public payload: any) {
    console.log('CreateFailureAction', payload)
  }
}

export class DeleteAction implements Action {
  readonly type = DELETE;
  constructor(public payload: IDiagnose) {}
}
export class DeleteSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public  payload: IDiagnose) {console.log('DeleteSuccessAction', payload)}
}

export class DeleteFailureAction implements Action {
  readonly type = DELETE_FAILURE;

  constructor(public payload: { error: Error }) {console.log('DeleteFailureAction', payload.error)}
}

export class DeleteConfirmationAction implements Action {
  readonly type = DELETE_DIAGNOSE_CONFIRMATION;
  constructor(public payload: {
    cancel?: Action,
    delete: Action,
    text: string,
    title: string
  }) {}
  // constructor(public payload: { id: number }) {}
}

//
// export class DeleteConfirmationResponseAction implements Action {
//   readonly type = DELETE_DIAGNOSE_CONFIRMATION_RESPONSE;
//
//   constructor(public payload: { id: string }) {}
// }



export type DiagnoseActions = LoadAction
  | LoadSuccessAction
  | LoadFailureAction
  | GetByCountryIdAction
  | GetByCountryIdSuccessAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  | DeleteConfirmationAction;
  // | DeleteConfirmationResponseAction;
