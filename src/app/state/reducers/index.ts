import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from '../app.interfaces';
import * as fromDiagnoses from './diagnose.reducer';
import * as fromPatients from './patient.reducer';
export interface IDiagnosesState {
  diagnoses: fromDiagnoses.State;
}
export interface IPatientsState {
  patients: fromPatients.State;
}

export interface IState extends AppState {
  patients: IPatientsState;
  diagnoses: IDiagnosesState;
}

export const reducers = {
  patients: fromPatients.reducer,
  diagnoses: fromDiagnoses.reducer
};

export const getPatientsState = createFeatureSelector<IPatientsState>('patients');
export const getDiagnosesState = createFeatureSelector<IDiagnosesState>('diagnoses');

export const getPatientsEntityState = createSelector(
  getPatientsState,
  (state) => state.patients
);

export const getDiagnosesEntityState = createSelector(
  getDiagnosesState,
  (state) => state.diagnoses
);

export const {
  selectAll: getAllDiagnoses,
  selectEntities: getDiagnoseEntities,
  selectIds: getDiagnoseIds,
  selectTotal: getDiagnosesTotal
} = fromDiagnoses.adapter.getSelectors(getDiagnosesEntityState);

export const {
  selectAll: getAllPatients,
  selectEntities: getPatientEntities,
  selectIds: getPatientsIds,
  selectTotal: getPatientsTotal
} = fromPatients.adapter.getSelectors(getPatientsEntityState);

export const getSelectedDiagnoseId = createSelector(
  getDiagnosesEntityState,
  fromDiagnoses.getSelectedDiagnoseId
);

export const getSelectedDiagnose = createSelector(
  getDiagnoseEntities,
  getSelectedDiagnoseId,
  (entities, selectedPowerId) => selectedPowerId && entities[selectedPowerId]
);
export const isDiagnoseLoading = createSelector(
  getDiagnosesEntityState,
  fromDiagnoses.isLoading
);
export const isPatientsLoading = createSelector(
  getPatientsEntityState,
  fromPatients.isLoading
);
