import * as actions from '../actions/diagnose.actions';
import {IDiagnose} from "../../components/diagnose/diagnose.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import {
  CREATE_SUCCESS, DiagnoseActions, GET_BY_COUNTRY_ID_SUCCESS, LOAD,
  LOAD_SUCCESS
} from "../actions/diagnose.actions";
// import {DELETE_DIAGNOSE_CONFIRMATION} from "../actions/diagnose.actions";
import {DELETE_SUCCESS} from "../actions/diagnose.actions";

// export interface State {
//   loading: boolean;
//   failed: boolean;
//   diagnoses: IDiagnose[];
//   diagnose?: IDiagnose;
//   message: string;
//   confirmed: boolean;
// }

export interface State extends EntityState<IDiagnose> {
  // addDialogShow: boolean;
  loading: boolean;
  failed: boolean,
  // diagnoses: [],
  message: string,
  selectedDiagnoseId: number;
}

export const adapter: EntityAdapter<IDiagnose> = createEntityAdapter();
const initialState: State = adapter.getInitialState({
  // addDialogShow: false,
  loading: false,
  failed: false,
  message: 'Initial state',
  selectedDiagnoseId: null
});
// const initialState: State = {
//   loading: false,
//   failed: false,
//   diagnoses: [],
//   message: 'Initial state',
//   confirmed: false,
// };



export function reducer(state = initialState, action: DiagnoseActions): State {
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
      console.log('LOAD_SUCCESS', {...state});
      state = {
        ...state,
        // diagnoses: action.payload,
        loading: false,
        failed: false,
      };
      return adapter.addAll(action.payload, state);

    case actions.LOAD_FAILURE:
      return {
        ...state,
        // diagnoses: [],
        loading: false,
        failed: true
      };
    case GET_BY_COUNTRY_ID_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        // diagnoses: action.payload,
        loading: false,
        failed: false
      };
    case CREATE_SUCCESS: {
      return adapter.addOne(action.payload, state);
      // return {
      //   // diagnoses: [action.payload],
      //   loading: false,
      //   failed: false,
      //   message: 'Diagnose create success'
      // };
    }
    case actions.CREATE_FAILURE: {
      return {
        ...state,
        // diagnoses: [],
        loading: false,
        failed: false,
        message: 'Diagnose create failure'
      };
    }
    // case actions.DELETE: {
    //   return adapter.removeOne(action.payload.id, state);
    //   // return {
    //   //   ...state, ...{
    //   //     diagnose: action.payload.diagnose},
    //   //   diagnoses: state.diagnoses.filter(item => item.id!== action.payload.id),
    //   //   loading: false,
    //   //   failed: false,
    //   //   confirmed: false,
    //   // };
    // }
    case DELETE_SUCCESS: {
      return adapter.removeOne(action.payload.id, state);
      // return {
      //   ...state,
      //   diagnoses: state.diagnoses.filter(item => item.id.toString() !== action.payload.id),
      //   loading: false,
      //   failed: false,
      //   confirmed: false,
      // };
    }

    default:
      return state;
  }
}
export const getSelectedDiagnoseId = (state: State) => state.selectedDiagnoseId;
export const isLoading = (state: State) => state.loading;
// export const getDiagnoses = (state: State) => state.diagnoses;
// export const getLoading = (state: State) => state.loading;
// export const getFailed = (state: State) => state.failed;
// export const getDeleteConfirmation = (state: State) => state.confirmed;
