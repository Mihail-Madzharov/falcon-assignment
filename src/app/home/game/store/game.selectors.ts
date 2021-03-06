import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "./game.state";

const featureSelector = createFeatureSelector<GameState>(GameState.stateName);

export const gameBoardSelector = createSelector(
  featureSelector,
  state => state.gameBoard
);

export const currentUserIdSelector = createSelector(
  featureSelector,
  state => state.currentUserId
);

export const secondUserId = createSelector(
  featureSelector,
  state => state.secondUserId
);

export const gameStarted = createSelector(
  featureSelector,
  state => state.gameStarted
);

export const lastPlayingPlayerId = createSelector(
  featureSelector,
  state => state.lastPlayingPlayer
);

export const winnerId = createSelector(
  featureSelector,
  state => state.winnerId
);
