import { Action } from "@ngrx/store";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { BoardCell } from "../game-board/board-cell";
import { GlobalAction } from "src/app/shared/global-action";

export const GameActionTypes = {
  StartGame: "[GAME] This will start the game",
  UpdateGameBoard: "[GAME] This will update the game board matrix",
  SelectCell: "[GAME] This will select a cell",
  UpdateCurrentUserId: "[GAME] This will update current user Id",
  UpdateSecondUserId: "[GAME] This will update the second user Id"
};

export class StartGameAction implements Action {
  readonly type: string = GameActionTypes.StartGame;
}

export class SelectCellAction implements Action {
  readonly type: string = GameActionTypes.SelectCell;
  constructor(public payload: BoardCell) {}
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

export class UpdateSecondUserId implements Action {
  readonly type: string = GameActionTypes.UpdateSecondUserId;
  constructor(public payload: number) {}
}
