import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

const featureSelector = createFeatureSelector<AppState>(AppState.stateName);

export const sweetAlertOptions = createSelector(
  featureSelector,
  state => state.sweetAlertModel
);
