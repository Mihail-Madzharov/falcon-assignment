import { Action } from "@ngrx/store";
import { GlobalAction } from "src/app/shared/global-action";
import { SweetAlertModel } from "../shared/sweet-allert.model";

export const AppStateActions = {
  UpdateSweetAlertOptions: "[AppState] This will update the sweet alert Options"
};

export class UpdateSweetAlertOptions extends GlobalAction implements Action {
  readonly type: string = AppStateActions.UpdateSweetAlertOptions;
  constructor(public payload: SweetAlertModel) {
    super();
  }
}
