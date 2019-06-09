import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "./game.state";

const featureSelector = createFeatureSelector<GameState>(GameState.stateName);

export const gameBoardSelector = createSelector(
  featureSelector,
  state => state.gameBoard
);
