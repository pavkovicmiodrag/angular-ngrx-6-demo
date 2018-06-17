import { Action } from '@ngrx/store';
import { IPatient } from '../../components/Patient/Patient.model';
export const LOAD = '[Patient] load';
export const LOAD_SUCCESS = '[Patient] load success';
export const LOAD_FAILURE = '[Patient] load failure';
export const GET_BY_COUNTRY_ID = '[Patient] Get by Id';
export const GET_BY_COUNTRY_ID_SUCCESS = '[Patient] Get by Id Success';
export const CREATE = '[Patient] Create';
export const CREATE_SUCCESS = '[Patient] Create Success';
export const CREATE_FAILURE = '[Patient] Create Failure';
export const DELETE = '[Patient] Delete';
export const DELETE_SUCCESS = '[Patient] Delete Success';
export const DELETE_FAILURE = '[Patient] Delete Failure';
export const DELETE_PATIENT_CONFIRMATION = '[Patient] Delete Comfirmation';
export const DELETE_PATIENT_CONFIRMATION_RESPONSE = '[Patient] Delete Comfirmation Response';
export class LoadAction implements Action {
  readonly type = LOAD;
}
export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: IPatient[]) {console.log('Patient LoadSuccessAction', payload);}
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
  constructor(public payload: IPatient[]) {console.log('payload', payload);}
}
export class CreateAction implements Action {
  readonly type = CREATE;
  constructor(public payload: IPatient) {}
}
export class CreateSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: IPatient) {}
}
export class CreateFailureAction implements Action {
  readonly type = CREATE_FAILURE;

  constructor(public payload: any) {
    console.log('CreateFailureAction', payload);
  }
}

export class DeleteAction implements Action {
  readonly type = DELETE;
  constructor(public payload: IPatient) {}
}
export class DeleteSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public  payload: IPatient) {console.log('DeleteSuccessAction', payload);}
}

export class DeleteFailureAction implements Action {
  readonly type = DELETE_FAILURE;

  constructor(public payload: { error: Error }) {console.log('DeleteFailureAction', payload.error);}
}

export class DeleteConfirmationAction implements Action {
  readonly type = DELETE_PATIENT_CONFIRMATION;
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
//   readonly type = DELETE_Patient_CONFIRMATION_RESPONSE;
//
//   constructor(public payload: { id: string }) {}
// }



export type PatientActions = LoadAction
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
