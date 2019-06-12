import { Action } from "@ngrx/store";
import { SweetAlertOptions } from "sweetalert2";

export interface SweetAlertModel {
  confirmCallback?: () => void;
  cancelCallback?: () => void;
  options: SweetAlertOptions;
}
