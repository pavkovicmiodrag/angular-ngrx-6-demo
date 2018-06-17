import { RouterReducerState } from '@ngrx/router-store';
import * as fromSnackbar from './shared/reducers/snackbar';
import { RouterStateUrl } from "./shared/utils";
import * as fromDiagnoses from "./reducers/diagnose.reducer";

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  snackbar: fromSnackbar.State;
}
