import { Action } from "@ngrx/store";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { BoardCell } from "../game-board/board-cell";
import { GlobalAction } from "src/app/shared/global-action";

export const GameActionTypes = {
  StartGame: "[GAME] This will start the game",
  UpdateGameBoard: "[GAME] This will update the game board matrix",
  SelectCell: "[GAME] This will select a cell",
  UpdateCurrentUserId: "[GAME] This will update current user Id",
  UpdateSecondUserId: "[GAME] This will update the second user Id",
  ToggleStartGame: "[Game] This will toggle the start game state",
  UpdateLastPlayingPlayer: "[Game] This will update the next player id"
};

export class StartGameAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.StartGame;
  constructor() {
    super();
  }
}

export class ToggleGameStartAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.ToggleStartGame;
  constructor(public payload: boolean) {
    super();
  }
}
export class SelectCellAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.SelectCell;
  constructor(public payload: BoardCell) {
    super();
  }
}

export class UpdateGameBoardAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateGameBoard;
  constructor(public payload: Matrix) {
    super();
  }
}

export class UpdateCurrentUserIdAction implements Action {
  readonly type: string = GameActionTypes.UpdateCurrentUserId;
  constructor(public payload: number) {}
}

export class UpdateSecondUserId extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateSecondUserId;
  constructor(public payload: number) {
    super();
  }
}

export class UpdateLastPlayingPlayer extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateLastPlayingPlayer;
  constructor(public payload: number) {
    super();
  }
}