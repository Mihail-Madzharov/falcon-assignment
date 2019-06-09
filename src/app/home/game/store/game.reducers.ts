import { Action } from "@ngrx/store";

import { ActionsMap } from "src/app/shared/reducer.model";
import { UpdateGameBoardAction, GameActionTypes } from "./game.actions";
import { GameState } from "./game.state";

const initialState: GameState = {
  gameBoard: []
};

function updateGameBoard(state: GameState, action: UpdateGameBoardAction) {
  state.gameBoard = action.payload;
  return state;
}

const mapGameReducers: ActionsMap<GameState> = {
  [GameActionTypes.UpdateGameBoard]: updateGameBoard
};

export function gameReducer(state: GameState = initialState, action: Action) {
  return mapGameReducers[action.type] != null
    ? mapGameReducers[action.type](state, action)
    : state;
}
