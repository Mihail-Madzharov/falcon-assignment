import { ActionReducer } from "@ngrx/store";

export interface ActionsMap<T> {
  [actionType: string]: ActionReducer<T>;
}
