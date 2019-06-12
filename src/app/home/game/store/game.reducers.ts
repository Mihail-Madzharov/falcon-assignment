import { Action } from "@ngrx/store";

import { ActionsMap } from "src/app/shared/reducer.model";
import {
  UpdateGameBoardAction,
  GameActionTypes,
  UpdateCurrentUserIdAction,
  UpdateSecondUserId,
  ToggleGameStartAction,
  UpdateLastPlayingPlayer
} from "./game.actions";
import { GameState } from "./game.state";
import { PlayersEnum } from "../players/players.enum";

const initialState: GameState = {
  gameBoard: [],
  currentUserId: PlayersEnum.NoPlayerSelectedId,
  secondUserId: PlayersEnum.NoPlayerSelectedId,
  gameStarted: false,
  lastPlayingPlayer: PlayersEnum.NoPlayerSelectedId
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

function toggleGameStart(state: GameState, action: ToggleGameStartAction) {
  const newState = Object.assign({}, state);
  newState.gameStarted = action.payload;
  return newState;
}

function updateNextPlayerIdTurn(
  state: GameState,
  action: UpdateLastPlayingPlayer
) {
  const newState = Object.assign({}, state);
  newState.lastPlayingPlayer = action.payload;
  return newState;
}

const mapGameReducers: ActionsMap<GameState> = {
  [GameActionTypes.UpdateGameBoard]: updateGameBoard,
  [GameActionTypes.UpdateCurrentUserId]: updateCurrentUserId,
  [GameActionTypes.UpdateSecondUserId]: updateSecondUserId,
  [GameActionTypes.ToggleStartGame]: toggleGameStart,
  [GameActionTypes.UpdateLastPlayingPlayer]: updateNextPlayerIdTurn
};

export function gameReducer(state: GameState = initialState, action: Action) {
  return mapGameReducers[action.type] != null
    ? mapGameReducers[action.type](state, action)
    : state;
}
