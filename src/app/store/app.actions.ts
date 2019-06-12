import { Action } from "@ngrx/store";
import { GlobalAction } from "src/app/shared/global-action";
import { SweetAlertModel } from "../shared/sweet-allert.model";

export const AppStateActions = {
  ShowNotificationAction: "[AppState] This will update the sweet alert Options"
};

export class ShowNotificationAction extends GlobalAction implements Action {
  readonly type: string = AppStateActions.ShowNotificationAction;
  constructor(public payload: SweetAlertModel) {
    super();
  }
}
