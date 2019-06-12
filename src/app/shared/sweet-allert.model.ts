import { Action } from "@ngrx/store";
import { SweetAlertOptions } from "sweetalert2";

export interface SweetAlertModel {
  confirmAction: Action;
  cancelAction: Action;
  options: SweetAlertOptions;
}
