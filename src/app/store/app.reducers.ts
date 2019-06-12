import { Action } from "@ngrx/store";

import { ActionsMap } from "src/app/shared/reducer.model";
import { UpdateSweetAlertOptions, AppStateActions } from "./app.actions";
import { AppState } from "./app.state";

const initialState: AppState = {
  sweetAlertModel: undefined
};

function updateSweetAlertOptions(
  state: AppState,
  action: UpdateSweetAlertOptions
) {
  const newState = Object.assign({}, state);
  newState.sweetAlertModel = action.payload;
  return newState;
}

const mapAppReducers: ActionsMap<AppState> = {
  [AppStateActions.UpdateSweetAlertOptions]: updateSweetAlertOptions
};

export function appReducers(state: AppState = initialState, action: Action) {
  return mapAppReducers[action.type] != null
    ? mapAppReducers[action.type](state, action)
    : state;
}
