import { Action } from "@ngrx/store";

import { ActionsMap } from "src/app/shared/reducer.model";
import {
  UpdateGameBoardAction,
  GameActionTypes,
  StartGameAction,
  UpdateCurrentUserIdAction,
  UpdateSecondUserId
} from "./game.actions";
import { GameState } from "./game.state";

const initialState: GameState = {
  gameBoard: [],
  currentUserId: -1,
  secondUserId: -1
};

function updateGameBoard(state: GameState, action: UpdateGameBoardAction) {
  const newState = Object.assign({}, state);
  newState.gameBoard = action.payload;
  return newState;
}

function updateCurrentUserId(
  state: GameState,
  action: UpdateCurrentUserIdAction
) {
  const newState = Object.assign({}, state);
  newState.currentUserId = action.payload;
  return newState;
}

function updateSecondUserId(state: GameState, action: UpdateSecondUserId) {
  const newState = Object.assign({}, state);
  newState.secondUserId = action.payload;
  return newState;
}

const mapGameReducers: ActionsMap<GameState> = {
  [GameActionTypes.UpdateGameBoard]: updateGameBoard,
  [GameActionTypes.UpdateCurrentUserId]: updateCurrentUserId,
  [GameActionTypes.UpdateSecondUserId]: updateSecondUserId
};

export function gameReducer(state: GameState = initialState, action: Action) {
  return mapGameReducers[action.type] != null
    ? mapGameReducers[action.type](state, action)
    : state;
}
