import * as actions from '../actions/patient.actions';
import {IPatient} from "../../components/Patient/Patient.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import {
  CREATE_SUCCESS, PatientActions, GET_BY_COUNTRY_ID_SUCCESS, LOAD,
  LOAD_SUCCESS, DELETE_SUCCESS
} from "../actions/patient.actions";


export interface State extends EntityState<IPatient> {
  // addDialogShow: boolean;
  loading: boolean;
  failed: boolean,
  // Patients: [],
  message: string,
  selectedPatientId: number;
}

export const adapter: EntityAdapter<IPatient> = createEntityAdapter();
const initialState: State = adapter.getInitialState({
  // addDialogShow: false,
  loading: false,
  failed: false,
  message: 'Initial state',
  selectedPatientId: null
});

export function reducer(state = initialState, action: PatientActions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log('Patients LOAD_SUCCESS', {...state});
      state = {
        ...state,
        // Patients: action.payload,
        loading: false,
        failed: false,
      };
      return adapter.addAll(action.payload, state);

    case actions.LOAD_FAILURE:
      return {
        ...state,
        // Patients: [],
        loading: false,
        failed: true
      };
    case GET_BY_COUNTRY_ID_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        // Patients: action.payload,
        loading: false,
        failed: false
      };
    case CREATE_SUCCESS: {
      return adapter.addOne(action.payload, state);
      // return {
      //   // Patients: [action.payload],
      //   loading: false,
      //   failed: false,
      //   message: 'Patient create success'
      // };
    }
    case actions.CREATE_FAILURE: {
      return {
        ...state,
        // Patients: [],
        loading: false,
        failed: false,
        message: 'Patient create failure'
      };
    }
    // case actions.DELETE: {
    //   return adapter.removeOne(action.payload.id, state);
    //   // return {
    //   //   ...state, ...{
    //   //     Patient: action.payload.Patient},
    //   //   Patients: state.Patients.filter(item => item.id!== action.payload.id),
    //   //   loading: false,
    //   //   failed: false,
    //   //   confirmed: false,
    //   // };
    // }
    case DELETE_SUCCESS: {
      return adapter.removeOne(action.payload.id, state);
      // return {
      //   ...state,
      //   Patients: state.Patients.filter(item => item.id.toString() !== action.payload.id),
      //   loading: false,
      //   failed: false,
      //   confirmed: false,
      // };
    }

    default:
      return state;
  }
}
export const getSelectedPatientId = (state: State) => state.selectedPatientId;
export const isLoading = (state: State) => state.loading;
// export const getPatients = (state: State) => state.Patients;
// export const getLoading = (state: State) => state.loading;
// export const getFailed = (state: State) => state.failed;
// export const getDeleteConfirmation = (state: State) => state.confirmed;
